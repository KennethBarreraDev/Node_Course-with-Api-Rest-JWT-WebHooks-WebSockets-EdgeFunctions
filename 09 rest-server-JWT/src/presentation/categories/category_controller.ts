import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain/dtos/category/create_category.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { CategoryService } from "../services/category.service";
import { UserEntity } from "../../domain/entities/user.entity";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    getCategory = async (req: Request, res: Response) => {
        try {
            const {page=1, limit=2} = req.query
            const [error, paginationDto] = PaginationDto.create(+page, +limit)
            if(error){
                res.status(error.statusCode).json(error.message)
            }
            else{
                const categories = await this.categoryService.getCategories(paginationDto!)
                res.status(200).json(categories)
            }
        } catch (error) {
            console.log('Entro al error');
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    };

    createCategory = async (req: Request, res: Response) => {
        try {
            const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
            if (error) {
                res.status(error.statusCode).json(error.message);
                return;
            }
            else {
                console.log('User is');
                console.log(req.body.user);
             
                const user = UserEntity.fromObject(req.body.user)
                const newCategory = await this.categoryService.createCategory(createCategoryDto!, user)
                res.status(200).json(newCategory)
                return
            }
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    }

}