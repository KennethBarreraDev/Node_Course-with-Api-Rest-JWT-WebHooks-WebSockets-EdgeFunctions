import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './categories/category_routes';
import { AuthMidddleWare } from './middlewares/auth.middleware';
import { ProductRoutes } from './products/product_routes';
import { FileUploadRoutes } from './file_upload/file_upload_router';
import { FileUploadMiddleware } from './middlewares/file-upload.middleware';
import { TypeMiddleware } from './file_upload/type.middleware';




export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api',AuthRoutes.routes)
    router.use('/api/category', [AuthMidddleWare.validateJWT], CategoryRoutes.routes)
    router.use('/api/products', [AuthMidddleWare.validateJWT], ProductRoutes.routes)
    router.use('/api/upload', [AuthMidddleWare.validateJWT, FileUploadMiddleware.containFiles, TypeMiddleware.validTypes(['users', 'products', 'categories']) ], FileUploadRoutes.routes)

    return router;
  }


}

