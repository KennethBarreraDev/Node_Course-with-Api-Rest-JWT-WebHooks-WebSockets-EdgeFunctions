import express, { json, Router } from 'express'
import path from 'path'

interface Options {
    port: number,
    router: Router
}

export class Server {
    constructor(private readonly options: Options){

    }
    private app = express()
    async start() {
        console.log('Server runnign');
        this.app.use(express.json())
        this.app.use(express.urlencoded())
        this.app.use(this.options.router)
        this.app.listen(this.options.port, () => {
            console.log('App running on port 3000');
        })
    }
}

