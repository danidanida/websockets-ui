/*import { sendMessage } from '../utils/sendMessage';
import { ExtendedWebSocket } from '../ws_server/index';
import { addUser, getUserByID, ReceivedUser, users } from '../models/users';
import { updateRooms } from '../models/rooms';
import { updateWinners } from '../models/winners';

interface Message {
    type: string;
    data: string;
    id: number;
}


function handleRegistration(msg: Message, ws: ExtendedWebSocket): void {
    const id: number | undefined = ws?.id;

    const receivedUser: ReceivedUser = JSON.parse(msg.data) as ReceivedUser; // Adjust based on your actual data structure

    const addUserResponse = addUser(receivedUser, id);
    sendMessage(ws, 'reg', addUserResponse);

    const updateRoomsResponse = updateRooms();
    sendMessage(ws, 'update_room', updateRoomsResponse);

    const updateWinnersResponse = updateWinners();
    sendMessage(ws, 'update_winners', updateWinnersResponse);

    console.log(users);
}*/