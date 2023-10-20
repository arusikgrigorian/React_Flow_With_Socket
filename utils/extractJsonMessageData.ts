import { CustomNode, WebSocketResult } from "@/types";

export function extractJsonMessageData(
  jsonMessages: WebSocketResult["jsonMessage"],
): Array<Omit<CustomNode, "type" | "position">> {
  return (
    (jsonMessages &&
      jsonMessages.map(({ data }) => {
        const { color, details, fiveWTwoHId, id, text, title, userId } = data;

        return {
          id,
          title,
          text,
          color,
          details,
          five_w_two_h: fiveWTwoHId,
          user: userId,
        };
      })) ||
    []
  );
}
