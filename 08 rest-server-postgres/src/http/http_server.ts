import http from "http"
import fs from 'fs'

const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>)=>{
        console.log(req.url);
        //Html content
        // res.writeHead(200, {'content-type': 'text/html'})
        // res.write('<h1>Hello world</h1>')

        //Json data
        // const data = {name: 'Kenneth Barrera', age: 24, city: 'Morelia'}
        // res.writeHead(200, {'content-type': 'application/json'})
        // res.end(JSON.stringify(data))

        if(req.url=='/'){
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
            res.writeHead(200, {'content-type': 'text/html'})
            res.end(htmlFile)
            return
        }
        if(req.url?.includes('.css')){
            const htmlFile = fs.readFileSync('./public/styles.css', 'utf-8')
            res.writeHead(200, {'content-type': 'text/css'})
            res.end(htmlFile)
            return
        }

        if(req.url?.includes('.js')){
            const htmlFile = fs.readFileSync('./public/script.js', 'utf-8')
            res.writeHead(200, {'content-type': 'text/javascript'})
            res.end(htmlFile)
            return
        }
    }
)

server.listen(3000, ()=>{
    console.log('Server listening');
    
})