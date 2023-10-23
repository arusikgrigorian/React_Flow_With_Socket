export function generateSocketRoomName(type: string, id: string): string {
  return `room-${type}-${id}`;
}
