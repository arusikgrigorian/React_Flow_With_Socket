import { CustomNode, SocketResult } from "@/types/global";

export function extractJsonMessageData(
  jsonMessages: SocketResult["jsonMessage"],
): Array<Omit<CustomNode, "type" | "position">> {
  return (
    (jsonMessages &&
      jsonMessages.map(({ data }) => {
        const {
          id,
          text,
          title,
          color,
          height,
          width,
          details,
          fiveWTwoHId,
          userId,
        } = data;

        return {
          id,
          title,
          text,
          color,
          height,
          width,
          details,
          five_w_two_h: fiveWTwoHId,
          user: userId,
        };
      })) ||
    []
  );
}
