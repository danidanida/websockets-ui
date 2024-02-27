import { addUser, getUserByID, ReceivedUser, users } from '../models/users';
import { updateRooms, createNewRoom, addUserToRoom, getRoomUsers, cleanRooms } from '../models/rooms';
import { updateWinners } from '../models/winners';
import { createGame, startGame, games } from '../models/games';
import { addShips, Ship, evaluateAttack } from '../models/ships';
import { ExtendedWebSocket } from '../ws_server/index';
import { generateNumericID } from '../utils/generateUUID';
import { wss } from '../ws_server/index';

interface Message {
    type: string;
    data: string;
    id: number;
}

function sendTurn(playerId: number): string {

    return JSON.stringify({
        type: "turn",
        data: JSON.stringify(
            {
                currentPlayer: playerId
            }),
        id: 0,
    })

}

function sendFinishGame(winnerId: number): string {
    return JSON.stringify({
        type: "finish",
        data:
        {
            winPlayer: winnerId,
        },
        id: 0,
    })
}

function sendAttackFeedback(status: string, x: number, y: number, currentPlayer: number): string {
    return JSON.stringify(
        {
            type: "attack",
            data: JSON.stringify(
                {
                    position:
                    {
                        x,
                        y,
                    },
                    currentPlayer,
                    status
                }),
            id: 0,
        }
    )

}

export function msgHandler(msg: Message, ws: ExtendedWebSocket): void {
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

            let newGameId = generateNumericID()

            let roomUsersIndexes = getRoomUsers(roomIndex).map((rU) => rU.index);

            wss.clients.forEach((client: ExtendedWebSocket) => {
                if (client.readyState && roomUsersIndexes.includes(client.id || -1)) {
                    var createGameResponse = JSON.stringify(createGame(newGameId, client.id || -1))
                    client.send(createGameResponse);
                    client.send(cleanRooms())
                }
            })
            break;

        case 'add_ships':
            var ships = JSON.parse(msg.data).ships;
            var playerId = JSON.parse(msg.data).indexPlayer;
            var gameId = JSON.parse(msg.data).gameId;

            var playersIgGameIDs = games.filter((g) => g.idGame === gameId).map((g2) => g2.idPlayer);

            ships.forEach((ship: Ship) => {
                addShips(playerId, ship)
            })

            wss.clients.forEach((client: ExtendedWebSocket) => {
                if (client.readyState && playersIgGameIDs.includes(client.id || -1)) {
                    var startGameResponse = JSON.stringify(startGame(client.id || -1))
                    client.send(startGameResponse)
                    client.send(sendTurn(playerId || -1))
                }
            })
            break;
        case 'attack':
            var playerId = JSON.parse(msg.data).indexPlayer;
            let coordinates = JSON.parse(msg.data);
            let status = evaluateAttack(playerId, coordinates.x, coordinates.y)
            let attackFeedbackResponse = sendAttackFeedback(status, coordinates.x, coordinates.y, playerId)
            ws.send(attackFeedbackResponse)

            var gameId = JSON.parse(msg.data).gameId;

            var opponentsId = games.filter((g) => g.idGame === gameId).filter((g2) => g2.idPlayer !== playerId)[0].idPlayer;

            var gameId = JSON.parse(msg.data).gameId;

            var playersIgGameIDs = games.filter((g) => g.idGame === gameId).map((g2) => g2.idPlayer);

            wss.clients.forEach((client: ExtendedWebSocket) => {
                if (client.readyState && playersIgGameIDs.includes(client.id || -1)) {
                    client.send(sendTurn(opponentsId || -1))
                }
            })

            break;
        case 'randomAttack':

            // send attack feedback 
            // send turn
            break;
        default:
            console.log(`Unknown action type`);
    }
}