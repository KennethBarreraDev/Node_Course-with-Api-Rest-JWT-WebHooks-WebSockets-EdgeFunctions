import { MongoCategoryModel } from "../../data/mongo/models/category.model";
import { CreateCategoryDto } from "../../domain/dtos/category/create_category.dto";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class CategoryService {
    constructor() {

    }
    async getCategories(paginationDto: PaginationDto): Promise<CustomError | CategoryEntity[]>{
        try {
            const {page, limit} = paginationDto
            let parsedCategories = []
            const categories = await MongoCategoryModel.find().limit(limit).skip(limit*(page-1))
            parsedCategories = categories.map((category)=>CategoryEntity.fromObject(category))
            return parsedCategories
        } catch (error) {
            console.log(error);
            throw CustomError.serverError('Error while iteratin categories')
        }
    }

    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CustomError | CategoryEntity> {
        try {
            const category = await MongoCategoryModel.findOne({ name: createCategoryDto.name })
            if (category) throw CustomError.badRequest('Category already exist')
            const newCategory = await MongoCategoryModel.create({
                name: createCategoryDto.name,
                available: createCategoryDto.available,
                user: user.id
            })

            await newCategory.save()

            return CategoryEntity.fromObject(newCategory)

        } catch (error) {
            throw error
        }
    }
}