import { CustomError } from "../../errors/custom.error";

export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
    ) {

    }

    static create(object: { [key: string]: any }): [CustomError?, CreateProductDto?] {
        const { name, available, price, description, user, category } = object
        if (!name) {
            return [CustomError.badRequest('Missing name'), undefined]
        }
        if (!available) {
            return [CustomError.badRequest('Missing available'), undefined]
        }
        if (!price) {
            return [CustomError.badRequest('Missing price'), undefined]
        }
        if (!description) {
            return [CustomError.badRequest('Missing description'), undefined]
        }
        if (!user) {
            return [CustomError.badRequest('Missing user'), undefined]
        }
        if (!category) {
            return [CustomError.badRequest('Missing category'), undefined]
        }

        return [undefined, new CreateProductDto(name, available, price, description, user, category)]

    }
}