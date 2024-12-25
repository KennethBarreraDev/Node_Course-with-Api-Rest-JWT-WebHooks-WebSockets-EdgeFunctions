import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain/dtos/category/create_category.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { CategoryService } from "../services/category.service";
import { UserEntity } from "../../domain/entities/user.entity";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { ProductService } from "../services/product.service";

export class ProductController {
    constructor(
    private readonly productService: ProductService
    ) {
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const {page=1, limit=2} = req.query
            const [error, paginationDto] = PaginationDto.create(+page, +limit)
            if(error){
                res.status(error.statusCode).json(error.message)
            }
            else{
                const products = await this.productService.getProduct(paginationDto!)
                res.status(200).json(products)
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

    createProduct = async (req: Request, res: Response) => {
        try {
            const [error, createProductDto] = CreateProductDto.create(req.body)
            if (error) {
                res.status(error.statusCode).json(error.message);
                return;
            }
            else {
                console.log('User is');
                console.log(req.body.user);
             
                const user = UserEntity.fromObject(req.body.user)
                const newProduct = await this.productService.createProduct(createProductDto!, user)
                res.status(200).json(newProduct)
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