import { Router } from "express";
import { FileUploadController } from "./file_upload_controller";
import { FileServiceUpload } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";

export class FileUploadRoutes {


  static get routes(): Router {
    const router = Router();

    const fileUploadController = new FileUploadController(new FileServiceUpload())
    router.post('/single/:type', fileUploadController.uploadFile)
    router.post('/multiple/:type', fileUploadController.uploadMultipleFile)

    return router;
  }


}