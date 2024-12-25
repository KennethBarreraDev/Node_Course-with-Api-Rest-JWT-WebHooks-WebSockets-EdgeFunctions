import { envs } from "../../config/envs";

export class DiscordService{
    private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL
    constructor(){
    }

    async notify(message: string, ){
        const body = {
            content: message,
        }
        const response = await fetch(this.discordWebHookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })

        if(!response.ok){
            console.log('Error sending message to discord');
            
        }
    }
}