interface Position {
    x: number;
    y: number;
}

export interface Ship {
    position: Position;
    direction: boolean; // true for horizontal, false for vertical
    length: number;
    type: "small" | "medium" | "large" | "huge";
}

export let ships: { [playerId: number]: Ship[] } = {};

export function addShips(playerId: number, ship: Ship) {
    if (!ships[playerId]) {
        ships[playerId] = [];
    }
    ships[playerId].push(ship);
}

export function evaluateAttack(playerId: number, x: number, y: number): "miss" | "killed" | "shot" {
    const playerShips = ships[playerId];
    if (!playerShips) {
        throw new Error("Player not found");
    }

    for (const ship of playerShips) {
        const shipPositions = calculateShipPositions(ship);
        const hitPosition = shipPositions.find(position => position.x === x && position.y === y);
        if (hitPosition) {
            const allPartsHit = false; 

            return allPartsHit ? "killed" : "shot";
        }
    }
    return "miss";
}

function calculateShipPositions(ship: Ship): Position[] {
    const positions: Position[] = [];
    for (let i = 0; i < ship.length; i++) {
        positions.push({
            x: ship.direction ? ship.position.x + i : ship.position.x,
            y: ship.direction ? ship.position.y : ship.position.y + i,
        });
    }
    return positions;
}
