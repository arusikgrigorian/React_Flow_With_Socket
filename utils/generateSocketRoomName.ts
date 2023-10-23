export function generateSocketRoomName(type: string, id: number): string {
  return `room-${type}-${id}`;
}
