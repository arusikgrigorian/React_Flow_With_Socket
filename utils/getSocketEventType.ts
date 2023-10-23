import { WebSocketResult } from "@/types";

export function getSocketEventType(
  jsonMessages: WebSocketResult["jsonMessage"],
): string {
  let eventType = "";

  jsonMessages &&
    jsonMessages
      .map(({ event }) => event)
      .every((event) => {
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
      });

  return eventType;
}
