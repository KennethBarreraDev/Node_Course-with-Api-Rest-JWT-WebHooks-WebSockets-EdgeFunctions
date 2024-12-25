import { CustomError } from "../../errors/custom.error";

export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean) {
    }

    static create(object: {[key:string]: any}): [CustomError?, CreateCategoryDto?] {
        const {name, available = false} = object
        let availableBoolean = available
        if(!name)  return [CustomError.badRequest('Name is required'), undefined]
        if(typeof availableBoolean != 'boolean'){
            availableBoolean = (availableBoolean==='true')
        }

        return [undefined, new CreateCategoryDto(name, availableBoolean)] 

    }
}