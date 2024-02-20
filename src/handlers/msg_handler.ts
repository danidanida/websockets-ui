import { addUser, users, ReceivedUser } from '../models/users';
import { updateRooms } from '../models/rooms';
import { updateWinners } from '../models/winners';
import { ExtendedWebSocket } from '../ws_server/index'; 

interface Message {
    type: string;
    data: string;
    id: number;
}

export function msgHandler(msg: Message, ws: ExtendedWebSocket): void {
    switch (msg.type) {
        case 'reg':
            let id: string | undefined = ws?.id;
            let receivedUser: ReceivedUser = msg;
            const response = JSON.stringify(addUser(receivedUser, id));
            ws.send(response);
            const updateRoomsResponse = updateRooms();
            ws.send(updateRoomsResponse);
            const updateWinnersResponse = updateWinners();
            ws.send(updateWinnersResponse);
            break;
        case 'create_room':
            break;
        default:
            console.log(`Unknown action type`);
    }
}