import { NextFunction, Request, Response } from "express";
import { Webhooks } from "@octokit/webhooks";

export class WebHookSignatureVerification {

     static verify =
        (secretKey: string) => {
            return async (req: Request, res: Response, next: NextFunction) => {

                const webhooks = new Webhooks({
                    secret: secretKey,
                })
                const signature = req.headers["x-hub-signature-256"];
                const body = await req.body;

                console.log('Received params');
                console.log(signature);
                console.log(body);
                
                
                

                if (!(await webhooks.verify(body, signature as string))) {
                    res.status(401).send("Unauthorized");
                    return;
                }
                next()
            }
        }

}