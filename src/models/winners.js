
export let winners = [];

/*{
    name: <string>,
    wins: <number>,
}*/

export function updateWinners() {
    const response = JSON.stringify({
        "type": "update_winners",
        "data": JSON.stringify(winners),
        "id": 0,
    })
    return response;
}
