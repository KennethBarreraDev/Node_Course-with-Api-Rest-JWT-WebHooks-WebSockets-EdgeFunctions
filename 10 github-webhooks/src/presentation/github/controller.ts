import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService()
    ) {

    }

    webhookHandler = async (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown'
        const payload = req.body
        let message = '';
        console.log(githubEvent);
        
        switch (githubEvent) {
            case 'star':
                message = this.githubService.onStar(payload)
            break;

            default:
                message = `Unknown event ${githubEvent}`
                
        }
        await this.discordService.notify(message)
        res.status(200).send('Accepted')
    }
}