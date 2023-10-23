import { WebSocketResult } from "@/types";

export function getSocketEventType(
  jsonMessages: WebSocketResult["jsonMessage"],
): string {
  let event = "";

  jsonMessages &&
    jsonMessages
      .map(({ eventSource }) => eventSource)
      .every((eventSource) => {
        switch (eventSource) {
          case "gemba":
            event = "change";
            break;
          case "remove-gemba":
            event = "deletion";
            break;
          default:
            event = "";
        }
      });

  return event;
}
