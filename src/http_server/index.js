import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import { addUser, users } from '../utils/db.js';

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});


function msgHandler(msg, ws) {
    switch (msg.type) {
        case 'reg':
            console.log(msg)
            const response = JSON.stringify(addUser(msg));
            console.log("response " + response)

            ws.send(response); // Stringify once at the top level
            break;
        default:
            console.log(`Unknown action type`);
    }
}
// Initialize the WebSocket server instance
const wss = new WebSocketServer({
    port: 3000,
});


wss.on('connection', function connection(ws) {
    console.log('connected')

    ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);
        msgHandler(msg, ws)
    });

});

wss.on('close', function (code, reason) {
    console.log(`Client disconnected with code: ${code}, and reason: ${reason}`);
});

wss.on('error', function (error) {
    console.error('WebSocket error:', error);
});