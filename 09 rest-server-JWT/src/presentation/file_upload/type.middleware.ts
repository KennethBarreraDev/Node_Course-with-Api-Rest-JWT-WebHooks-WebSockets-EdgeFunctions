import { NextFunction, Request, Response } from "express";

export class TypeMiddleware{
    static validTypes(validTypes: string[]){
        return (req: Request, res: Response, next: NextFunction)=>{
            const type = req.url.split('/')[2]

            if(!validTypes.includes(type)) {
                return res.status(400).json({ error: 'Wrong file directory' })
            }

            next()
        }
    }
}