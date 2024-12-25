import { MongoCategoryModel } from "../../data/mongo/models/category.model";
import { MongoProductModel } from "../../data/mongo/models/product.model";
import { CreateCategoryDto } from "../../domain/dtos/category/create_category.dto";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { ProductEntity } from "../../domain/entities/product.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class ProductService {
    constructor() {

    }
    async getProduct(paginationDto: PaginationDto): Promise<CustomError | ProductEntity[]>{
        try {
            const {page, limit} = paginationDto
            let parsedProducts = []
            const products = await MongoProductModel.find().populate(['user', 'category']).limit(limit).skip(limit*(page-1))
            console.log(products);
            
            parsedProducts = products.map((product)=>ProductEntity.fromObject(product))
            return parsedProducts
        } catch (error) {
            console.log(error);
            throw CustomError.serverError('Error while iteratin products')
        }
    }

    async createProduct(createProductDto: CreateProductDto, user: UserEntity): Promise<CustomError | ProductEntity> {
        try {
            const category = await MongoProductModel.findOne({ name: createProductDto.name })
            if (category) throw CustomError.badRequest('Product already exist')
            const newProduct = await MongoProductModel.create({
                name: createProductDto.name,
                available: createProductDto.available,
                description: createProductDto.description,
                price: createProductDto.price,
                user: user.id,
                category: createProductDto.category
            })

            await newProduct.save()

            return ProductEntity.fromObject(newProduct)

        } catch (error) {
            throw error
        }
    }
}