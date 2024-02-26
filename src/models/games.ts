import { ships } from './ships';

interface Game {
    idGame: number;
    idPlayer: number;
}

export let games: Game[] = [];

interface GameCreationResponse {
    type: string;
    data: string;
    id: number;
}

export function createGame(idGame: number, idPlayer: number): GameCreationResponse {

    games.push({ idGame, idPlayer });

    return {
        type: "create_game",
        data: JSON.stringify({
            idGame,
            idPlayer,
        }),
        id: 0,
    };
}

export function startGame(playerId: number): object {
    let __ships = ships[playerId];

    return {
        type: "start_game",
        data:
        JSON.stringify({
            ships: JSON.stringify(__ships),
            currentPlayerIndex: playerId,
        }),
        id: 0,
    }
}