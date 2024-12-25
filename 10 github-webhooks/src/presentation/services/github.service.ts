import { GithubStarts } from "../../interfaces/github_starts";

export class GithubService {
    constructor(){

    }

    onStar(payload: GithubStarts): string{
        let message: string= '';
        const {starred_at}  = payload

        message = starred_at || ''
        return message
    }
}