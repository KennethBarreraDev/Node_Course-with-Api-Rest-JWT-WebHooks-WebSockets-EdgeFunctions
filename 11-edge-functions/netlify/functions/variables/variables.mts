import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    const myImportantVariable = process.env.MyImportantVariable
    const data = {
        message: myImportantVariable ?? "Not found",
        success: true,
    };
    console.log('Hola mundo desde los logs');
    
    return new Response(JSON.stringify(data), {
        status: 200, 
        headers: {
            "Content-Type": "application/json",
        },
    });
};
