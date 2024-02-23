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

export function createNewRoom(userInfo: RoomUser): void {
  rooms.push({
    roomId: rooms.length,
    roomUsers: [userInfo]
  });
}

export function getRoomUsers(roomId: number): RoomUser[] {
  let __room = rooms.find((r) => r.roomId === roomId);
  if (__room) {
    return __room.roomUsers
  } else return []

}

export function addUserToRoom(roomId: number, userInfo: RoomUser): void {
  let __room = rooms.find((r) => r.roomId === roomId);
  if (__room) {
    __room.roomUsers.push(userInfo);
  }

}

export function updateRooms(): string {
  const response = JSON.stringify({
    type: "update_room",
    data: JSON.stringify(rooms),
    id: 0,
  });
  return response;
}

export function cleanRooms(): string {
  const response = JSON.stringify({
    type: "update_room",
    data: JSON.stringify([]),
    id: 0,
  });
  return response;

}