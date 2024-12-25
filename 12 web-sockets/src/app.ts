import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const payload = {
                    type: 'custom-message',
                    payload: data.toString().toUpperCase()
                }
                client.send(JSON.stringify(payload), {binary: false})
            }
        });

    });

    ws.on('close', () => {
        console.log('Client disconnected');

    })

    // setInterval(() => {
    //     ws.send('Hola desde el servidor');
    // }, 2000)
});

console.log('Server running on port 3000');
