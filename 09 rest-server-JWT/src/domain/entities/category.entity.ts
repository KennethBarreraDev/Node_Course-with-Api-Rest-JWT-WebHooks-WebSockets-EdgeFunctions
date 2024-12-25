export class CategoryEntity {
    constructor(public readonly id: String, public readonly name: string, public readonly available: boolean) {

    }

    static fromObject(obj: { [key: string]: any }): CategoryEntity {
        const { id, _id, name, available } = obj
      
        return new CategoryEntity(id, name, available);
    }
}