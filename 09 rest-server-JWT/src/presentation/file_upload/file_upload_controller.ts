import { Request, Response } from "express";
import { FileServiceUpload } from "../services/file-upload.service";
import { CustomError } from "../../domain/errors/custom.error";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
    constructor(private readonly fileServiceUpload: FileServiceUpload) {
    }

    uploadFile = async (req: Request, res: Response) => {
        try {
            const type = req.params.type;
            const file = req.body.files.at(0) as UploadedFile;
            const uploaded = await this.fileServiceUpload.uploadSingle(file as UploadedFile, `uploads/${type}`)
            return res.json(uploaded)
        } catch (error) {
            console.log(error);

            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    };


    uploadMultipleFile = async (req: Request, res: Response) => {
        try {
            const type = req.params.type;
            const files = req.body.files as UploadedFile[];

            const uploaded = this.fileServiceUpload.uploadMultiple(files, `uploads/${type}`)
            return res.json(uploaded)
        } catch (error) {
            console.log(error);

            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.message);
            } else {
                res.status(500).json('Unexpected error occurred');
            }
        }
    };


}