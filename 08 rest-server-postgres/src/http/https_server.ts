import http2 from "http2"
import fs from 'fs'

const server = http2.createSecureServer(
    {
        key: fs.readFileSync('./keys/server.key'),
        cert:  fs.readFileSync('./keys/server.crt') 
    },
    (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse)=>{
        console.log(req.url);
        
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

server.listen(3001, ()=>{
    console.log('Server listening');
    
})