import { Config, Context } from "@netlify/functions";


const notify = async (message: string): Promise<boolean> => {
    const body = {
        content: message,
    }

    const url = process.env.DISCORD_WEBHOOK_URL;
    if (url) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            console.log('Error sending message to discord');
            return false
        }
        return true;
    }
    else {
        return false
    }
}
export default async (req: Request, context: Context) => {
    const githubEvent =  req.headers.get('x-github-event') || 'unknown';
    const payload = req.body
    let message = '';
    console.log(githubEvent);
    
    switch (githubEvent) {
        case 'star':
            message =JSON.stringify(payload)
        break;

        default:
            message = `Unknown event ${githubEvent}`
            
    }
    const response = await notify(message)
    const data = {
        message: response ? 'Notification sent succesfully' : 'Error sending notification',
        success: true,
    };
    console.log('Done');
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
