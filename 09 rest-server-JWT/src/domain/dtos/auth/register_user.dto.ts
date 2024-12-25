import { regularExps } from "../../../config/regular-exp";
import { CustomError } from "../../errors/custom.error";

export class RegisterUserDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string) {
    }

    static create(object: { [key: string]: any }): [CustomError?, RegisterUserDto?] {
        const { name, email, password } = object
        if (!name) {
            return [CustomError.badRequest("Missing name"), undefined]
        }
        if (!regularExps.email.test(email)) {
            return [CustomError.badRequest("Missing email"), undefined]
        }
        if (!password) {
            return [CustomError.badRequest("Missing password"), undefined]
        }
        else {
            return [undefined, new RegisterUserDto(name, email, password)]
        }
    }
}