export class TodoEntity {
    constructor(public id: number,
        public text: string,
        public createdAt: Date
    ) {

    }

    public static fromObject(obj: {[key:string]: any}): TodoEntity{
        const {id, name, createdAt} = obj
        return new TodoEntity(id, name, new Date(createdAt))
    }
    
}