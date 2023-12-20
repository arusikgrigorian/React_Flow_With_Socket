import { Node } from "reactflow";
import { CustomNode } from "@/types/global";

export function transformNodes(
  nodes: Array<CustomNode | Omit<CustomNode, "type" | "position">>,
): Array<Node> {
  return nodes && nodes.length
    ? nodes.map(
        ({
          id,
          title,
          text,
          color,
          height = 400,
          width = 400,
          five_w_two_h,
          details,
          user,
        }) => {
          const { position = { x: 0, y: 0 } } = details?.data || {};

          return {
            id,
            position,
            type: "custom",
            data: {
              id,
              title,
              text,
              color,
              height,
              width,
              fiveWTwoHId: five_w_two_h,
              user,
            },
          };
        },
      )
    : [];
}
