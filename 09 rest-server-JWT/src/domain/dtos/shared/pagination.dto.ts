import { CustomError } from "../../errors/custom.error";

export class PaginationDto{
    private constructor(
        public readonly page: number,
        public readonly limit: number
    ){}

    static create(page: number = 1, limit: number = 2): [CustomError?, PaginationDto?]{
        if(isNaN(page) || isNaN(limit)){
            return [CustomError.badRequest('Page or limit are not numbers'), undefined];
        }

        if(page<0){
            return [CustomError.badRequest('Page must be greater than cero'), undefined];
        }

        if(limit<0){
            return [CustomError.badRequest('Limit must be greater than cero'), undefined];
        }

        return [undefined, new PaginationDto(page, limit)]
    }
}