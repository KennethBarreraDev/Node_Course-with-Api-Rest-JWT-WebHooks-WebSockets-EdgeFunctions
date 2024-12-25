import { Router } from "express";
import { CategoryController } from "./category_controller";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {


  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService()
    const categoryController = new CategoryController(categoryService)
    router.get('/', categoryController.getCategory)
    router.post('/',categoryController.createCategory )

    return router;
  }


}