import { Router } from "express";

import { CategoryService } from "../services/category.service";
import { ProductController } from "./product_controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {


  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService)
    
    router.get('/', productController.getProducts)
    router.post('/', productController.createProduct)

    return router;
  }


}