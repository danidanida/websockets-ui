interface Game {
    idGame: number;
    idPlayer: number;
}

let games: Game[] = [];

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