import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register_user.dto";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/auth/login_user.dto";

export class AuthController {
    constructor(public readonly authService: AuthService) {

    }
    
    register = async (req: Request, res: Response) => {
        try {
            const [error, userDto] = RegisterUserDto.create(req.body);
            if (error) {
                res.status(error.statusCode).json(error.message);
                return;
            }
            else {
                console.log('Retornando usuario');
                const user = await this.authService.registerUser(userDto!);
                res.status(201).json(user);
            }
        } catch (error) {
            console.log('Entro al error');
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    };


    login = async (req: Request, res: Response) => {
        const [error, userDto] = LoginUserDto.execute(req.body)
        try {
            if (error) {
                res.status(error.statusCode).json(error.message);
                return;
            }
            else {
                const user = await this.authService.loginUser(userDto!);
                res.status(200).json(user);
                return
            }
        } catch(error) {
            console.log('Entro al error');
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    }

    verifyEmail = async (req: Request, res: Response) => {
        try {
            const {token} = req.params;
            const emailValidated = await this.authService.validateEmail(token)
            res.json('Email validted successfully')
        } catch(error) {
            console.log('Entro al error');
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    }
}