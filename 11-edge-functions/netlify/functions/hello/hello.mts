import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    const data = {
        message: "Hola, este es un ejemplo de respuesta JSON",
        success: true,
    };

    return new Response(JSON.stringify(data), {
        status: 200, 
        headers: {
            "Content-Type": "application/json",
        },
    });
};
