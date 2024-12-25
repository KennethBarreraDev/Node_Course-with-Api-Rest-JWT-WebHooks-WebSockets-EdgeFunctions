export class UpdateTodoDto{
    private constructor(public readonly name: string){

    }

    static create(obj:{[key:string]:any}):[string?, UpdateTodoDto?]{
        const {name} = obj
        if(!name){
            return ['Name is required', undefined]
        }
        else{
            return [undefined,  new UpdateTodoDto(name)]
        }
    }
}