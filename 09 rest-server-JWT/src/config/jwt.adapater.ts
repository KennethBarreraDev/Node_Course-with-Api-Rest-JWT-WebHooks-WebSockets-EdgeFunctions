import jwt from 'jsonwebtoken'
import { envs } from './envs';

export class JwtAdapter {


    static generateToken = async (payload: any, seed: string, duration: string = '10h') => {
        if (typeof payload === 'string') {
            payload = { data: payload }; // Envuelve el string en un objeto
        }
    
        return await new Promise((resolve, reject) => {
            jwt.sign(payload, seed, {
                expiresIn: duration,
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    resolve(null); 
                } else {
                    resolve(token); 
                }
            });
        });
    };
    

    static validateToken = <T>(token: string, seed: string): Promise<T | null> => {
        return new Promise((resolve)=>{
            jwt.verify(token, seed, (error, decoded)=>{
                if(error) return resolve(null)
                return resolve(jwt.decode(token) as T)
            })
        })
    }
}