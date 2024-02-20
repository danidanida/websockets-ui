import { addUser, users } from '../models/users.js';
import { updateRooms } from '../models/rooms.js';
import { updateWinners } from '../models/winners.js';

export function msgHandler(msg, ws) {
    switch (msg.type) {
        case 'reg':
            console.log(msg)
            const response = JSON.stringify(addUser(msg, ws.id));
            ws.send(response);
            const updateRoomsResponse = updateRooms();
            ws.send(updateRoomsResponse)
            const updateWinnersResponse = updateWinners();
            ws.send(updateWinnersResponse)

            break;
        case 'create_room':

            break;
        default:
            console.log(`Unknown action type`);
    }
}
