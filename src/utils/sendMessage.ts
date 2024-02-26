import { ExtendedWebSocket } from '../ws_server/index';

export function sendMessage(ws: ExtendedWebSocket, type: string, data: string): void {
    const message = JSON.stringify({ type, data, id: 0 });
    ws.send(message);
}