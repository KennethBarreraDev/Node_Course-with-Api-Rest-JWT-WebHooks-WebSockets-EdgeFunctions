export class ProductEntity{
    constructor(
        public readonly id: string, 
        public readonly name: string, 
        public readonly available: boolean, 
        public readonly price: number, 
        public readonly description: string, 
        public readonly user: string,  
        public readonly category: string,  
    ){

    }

    static fromObject(obj: { [key: string]: any }): ProductEntity {
        const { id, _id, name, available, price, description, user, category } = obj
      
        return new ProductEntity(id, name, available, price, description, user, category);
    }
}