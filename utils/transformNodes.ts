import { Node } from "reactflow";
import { CustomNode } from "@/types";

export function transformNodes(
  nodes: Array<CustomNode | Omit<CustomNode, "type" | "position">>,
): Array<Node> {
  return nodes && nodes.length
    ? nodes.map(({ id, title, text, color, five_w_two_h, details, user }) => {
        const { position } = details.data;

        return {
          id,
          position,
          type: "custom",
          data: {
            id,
            title,
            text,
            color,
            fiveWTwoHId: `${five_w_two_h}`,
            user,
          },
        };
      })
    : [];
}
