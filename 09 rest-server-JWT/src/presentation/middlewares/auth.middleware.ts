import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapater";
import { envs } from "../../config/envs";
import { UserEntity } from "../../domain/entities/user.entity";
import { MongoUserModel } from "../../data/mongo/models/user.model";

export class AuthMidddleWare {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization')
        if (!authorization) return res.status(401).json({ error: 'Forbidden access to categories' })
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Ilegal token provided' })

        const token = authorization.split(' ')[1] || ''

        try {
            const payload = await JwtAdapter.validateToken(token, envs.JWT_SEED)
            if (!payload) return res.status(401).json({ error: 'Token is not valid' })
            const { data } = payload as { data: string }
        
            const user = await MongoUserModel.findOne({ _id: data })

            if (!user) return res.status(400).json({ error: 'User not found' })
            const parsedUser = UserEntity.fromObject(user)
            req.body.user = parsedUser
            next()
        } catch (error) {
            res.status(501).json({ error: 'An server error has occured' })
        }
    }
}