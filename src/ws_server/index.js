
import { WebSocketServer } from 'ws';
import { generateUUID } from '../utils/generateUUID.js';
import { msgHandler } from '../handlers/msg_handler.js';

export const wss = new WebSocketServer({
    port: 3000,
});

wss.on('connection', function connection(ws) {
    ws.id = generateUUID();

    console.log(`connected socket ${ws.id}`)

    ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);
        msgHandler(msg, ws)
    });

    ws.on('close', function (code, reason) {
        console.log(`Client disconnected with ID: ${ws.id}, code: ${code}, reason: ${reason}`);
    });

    ws.on('error', function (error) {
        console.error('WebSocket error:', error);
    });

});