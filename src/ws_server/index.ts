import { WebSocketServer, WebSocket } from 'ws';
import { generateUUID } from '../utils/generateUUID';
import { msgHandler } from '../handlers/msg_handler';

export interface ExtendedWebSocket extends WebSocket {
  id?: string;
}

export const wss = new WebSocketServer({
  port: 3000,
});

wss.on('connection', function connection(ws: ExtendedWebSocket) {
  ws.id = generateUUID();

  console.log(`connected socket ${ws.id}`);

  ws.on('message', function incoming(message: string) {
    try {
      const msg = JSON.parse(message);
      msgHandler(msg, ws);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });

  ws.on('close', function (code: number, reason: string) {
    console.log(`Client disconnected with ID: ${ws.id}, code: ${code}, reason: ${reason}`);
  });

  ws.on('error', function (error: Error) {
    console.error('WebSocket error:', error);
  });
});