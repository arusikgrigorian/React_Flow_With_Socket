import { SocketResult } from "@/types/global";
import { Event } from "@/types/api";

function getEventType(event: keyof typeof Event): string {
  let eventType;

  switch (event) {
    case Event.input:
      eventType = Event.input;
      break;
    case Event.resize:
      eventType = Event.resize;
      break;
    case Event.deletion:
      eventType = Event.deletion;
      break;
    case Event.addition:
      eventType = Event.addition;
      break;
    case Event.position:
      eventType = Event.position;
      break;
    default:
      eventType = "";
  }

  return eventType;
}

export function getSocketEventType(
  jsonMessages: SocketResult["jsonMessage"],
): string {
  const isEventTheSame =
    jsonMessages &&
    jsonMessages
      .map(({ event }) => event)
      .every((event) => getEventType(event));

  return isEventTheSame ? jsonMessages[0]?.event : "";
}
