import { CustomError } from "../../errors/custom.error";

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {

    }

    static execute(object: {[key:string]: any}): [CustomError?, LoginUserDto?]{
        const {email, password} = object
        if(!email){
            return [CustomError.badRequest('Missing email'), undefined]
        }
        if(!password){
            return [CustomError.badRequest('Missing password'), undefined]
        }
        else{
            return [undefined, new LoginUserDto(email, password)]
        }
    }
}