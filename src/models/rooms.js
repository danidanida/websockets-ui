export let rooms = [];


/*{
                    "roomId": <number>,
                    "roomUsers":
                        [
                            {
                                name: <string>,
                                index: <number>,
                            }
                        ],
                }*/
export function addRoom() {

}

export function updateRooms() {
    const response = JSON.stringify({
        "type": "update_room",
        "data": JSON.stringify(rooms),
        "id": 0,
    })
    return response;
}