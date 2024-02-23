import { addUser, getUserByID, ReceivedUser, users } from '../models/users';
import { updateRooms, createNewRoom, addUserToRoom, getRoomUsers, cleanRooms } from '../models/rooms';
import { updateWinners } from '../models/winners';
import { createGame } from '../models/games';
import { ExtendedWebSocket } from '../ws_server/index';
import { generateNumericID } from '../utils/generateUUID';
import { wss } from '../ws_server/index';

interface Message {
    type: string;
    data: string;
    id: number;
}

export function msgHandler(msg: Message, ws: ExtendedWebSocket): void {
    /*wss.clients.forEach(client  => {
        if (client.readyState && client.roomIndex === roomIndex) {
            console.log(client)
            client.send(createGameResponse);
        }
    })*/
    switch (msg.type) {
        case 'reg':
            let id: number | undefined = ws?.id;
            let receivedUser: ReceivedUser = msg;
            const response = JSON.stringify(addUser(receivedUser, id));
            ws.send(response);
            var updateRoomsResponse = updateRooms();
            ws.send(updateRoomsResponse);
            const updateWinnersResponse = updateWinners();
            ws.send(updateWinnersResponse);
            console.log(users)
            break;
        case 'create_room':
            var user = getUserByID(ws?.id)
            createNewRoom(user);
            var updateRoomsResponse = updateRooms();
            ws.send(updateRoomsResponse);
            break;
        case 'add_user_to_room':
            var user = getUserByID(ws?.id)
            let roomIndex = JSON.parse(msg.data).indexRoom;
            addUserToRoom(roomIndex, user)
            //var updateRoomsResponse = updateRooms();
            //ws.send(updateRoomsResponse);
            let newGameId = generateNumericID()
            
            let roomUsersIndexes = getRoomUsers(roomIndex).map((rU) => rU.index);
            //ws.send(createGameResponse); // I NEED TO SEND IT TO BOTH USERS IN THE ROOM

            wss.clients.forEach((client: ExtendedWebSocket) => {
                if (client.readyState && roomUsersIndexes.includes(client.id || -1)) {
                    var createGameResponse = JSON.stringify(createGame(newGameId, client.id || -1))
                    client.send(createGameResponse);
                    client.send(cleanRooms())
                }
            })
            break;
        default:
            console.log(`Unknown action type`);
    }
}