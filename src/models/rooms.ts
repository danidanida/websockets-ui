interface RoomUser {
    name: string;
    index: number;
  }
  
  interface Room {
    roomId: number;
    roomUsers: RoomUser[];
  }
  
  export let rooms: Room[] = [];
  
  export function addRoom(room: Room): void {
    rooms.push(room);
  }
  
  export function updateRooms(): string {
    const response = JSON.stringify({
      type: "update_room",
      data: JSON.stringify(rooms),
      id: 0,
    });
    return response;
  }