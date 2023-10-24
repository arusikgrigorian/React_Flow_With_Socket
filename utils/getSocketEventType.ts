import { WebSocketResult } from "@/types";

function getEventType(event: string): string {
  let eventType;

  switch (event) {
    case "change":
      eventType = "change";
      break;
    case "deletion":
      eventType = "deletion";
      break;
    case "addition":
      eventType = "addition";
      break;
    case "position":
      eventType = "position";
      break;
    default:
      eventType = "";
  }

  return eventType;
}

export function getSocketEventType(
  jsonMessages: WebSocketResult["jsonMessage"],
): string {
  const isEventTheSame =
    jsonMessages &&
    jsonMessages
      .map(({ event }) => event)
      .every((event) => getEventType(event));

  return isEventTheSame ? jsonMessages[0]?.event : "";
}
