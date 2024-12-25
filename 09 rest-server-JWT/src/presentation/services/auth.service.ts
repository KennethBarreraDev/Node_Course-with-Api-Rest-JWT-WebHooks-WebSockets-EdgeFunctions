import { log } from "console";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { MongoUserModel } from "../../data/mongo/models/user.model";
import { LoginUserDto } from "../../domain/dtos/auth/login_user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register_user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { JwtAdapter } from "../../config/jwt.adapater";
import { envs } from "../../config/envs";
import { EmailService } from "../../config/mailer.service";
import { Request, Response } from "express";

export class AuthService {
    constructor(private readonly emailService: EmailService) {

    }

    public async registerUser(registerUserDto: RegisterUserDto): Promise<CustomError | unknown> {
        const exitsUser = await MongoUserModel.findOne({ email: registerUserDto.email })
        if (exitsUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = await MongoUserModel.create(
                {
                    name: registerUserDto.name,
                    email: registerUserDto.email,
                    password: registerUserDto.password,

                }
            )
            user.password = bcryptAdapter.hash(registerUserDto.password)
            await user.save()
            this.sendEmailValidationLink(user.email)
            const { password, ...rest } = new UserEntity('123', registerUserDto.name, registerUserDto.email, false, registerUserDto.password, [], undefined)
            return rest
        } catch (error) {
            throw error
        }
    }

    async loginUser(userDto: LoginUserDto): Promise<CustomError | unknown> {
        try {
            console.log(userDto.email);

            const user = await MongoUserModel.findOne({ email: userDto.email })

            if (!user) throw CustomError.badRequest("Wrong user or password")

            const equalsPasswords = bcryptAdapter.compare(userDto.password, user.password)

            if (!equalsPasswords) throw CustomError.badRequest("Wrong user or password")

            const foundUser = UserEntity.fromObject(user)
            const { password, ...rest } = foundUser

            const token = await JwtAdapter.generateToken(foundUser.id, envs.JWT_SEED)
            console.log('Token is');
            console.log(token);



            if (!token) throw CustomError.serverError('Error while creating token')

            return {
                ...rest,
                token
            }


        } catch (error) {
            throw error
        }
    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken(email, envs.JWT_SEED)
        if (!token) throw CustomError.serverError('Could not generate token')
        const link = `${envs.WEBSERVICE_URL}api/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href='${link}'>Validate your email</a>
    `

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options)

        if (!isSent) throw CustomError.serverError('Error sending email')
    }


    public validateEmail = async (token: string) => {
        try {
            const payload = await JwtAdapter.validateToken(token, envs.JWT_SEED)
            console.log('Payload is');
            console.log(payload);

            if (!payload) throw CustomError.serverError('Invalid token')
            const { data } = payload as { data: string }
            if (!data) throw CustomError.serverError('Email not in token')
            const user = await MongoUserModel.findOne({ email: data })
            if (!user) throw CustomError.badRequest('Email not found')

            user.emailValidated = true;
            await user.save()
            return true
        } catch (error) {
            throw error
        }
    }
}