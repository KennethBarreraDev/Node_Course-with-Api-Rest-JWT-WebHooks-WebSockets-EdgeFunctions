import express from 'express'
import path from 'path'

export class Server {
    private app = express()
    async start() {
        console.log('Server runnign');
        //Middleware

        //Public folder
        this.app.use(express.static('react-app-router'))

        this.app.get('*', (req, res)=>{
            const indexPath = path.join(__dirname + '../../react-app-router/index.html')
            res.sendFile(indexPath)
        })

        this.app.listen(8080, () => {
            console.log('App running on port 3000');
        })
    }
}

