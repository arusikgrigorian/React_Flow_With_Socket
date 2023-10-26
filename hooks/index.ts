import { useEffect } from "react";
import { useReactFlow } from "reactflow";
import useWebSocket from "react-use-websocket";

import { getSocketEventType } from "@/utils/getSocketEventType";
import { extractJsonMessageData } from "@/utils/extractJsonMessageData";
import { transformNodes } from "@/utils/transformNodes";

import { OPTIONS } from "@/hooks/constants";
import { SOCKET_URL } from "@/constants";

import { SocketResult } from "@/types";
import { Event } from "@/api/types";

type Param = {
  id: string | number;
};

export function useSocket(params: Param, nodeId?: string) {
  const { setNodes, deleteElements } = useReactFlow();

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<
    SocketResult["jsonMessage"]
  >(`${SOCKET_URL}/socket/5w2h/${params.id}/`, OPTIONS);

  useEffect(() => {
    const lastMessageData = extractJsonMessageData(lastJsonMessage);
    const lastChangedNodes = transformNodes(lastMessageData);

    const event = getSocketEventType(lastJsonMessage);

    if (!event) {
      return;
    }

    if (event === Event.deletion) {
      const nodes = lastChangedNodes.map(({ id }) => {
        return { id };
      });

      deleteElements({ nodes });
    }

    if (event === Event.input) {
      lastChangedNodes.length &&
        lastChangedNodes.map((lastChangedNode) => {
          setNodes((nodes) => {
            return nodes.map((node) => {
              if (node.id === lastChangedNode.id) {
                return {
                  ...node,
                  data: { ...lastChangedNode.data },
                };
              }

              return node;
            });
          });
        });
    }

    if (event === Event.addition) {
      lastChangedNodes.length &&
        lastChangedNodes.map((lastChangedNode) => {
          setNodes((nodes) => {
            let isNodeAlreadyAdded = false;

            nodes.forEach((node) => {
              isNodeAlreadyAdded = node.id === lastChangedNode.id;
            });

            return isNodeAlreadyAdded ? nodes : nodes.concat(lastChangedNode);
          });
        });
    }

    if (event === Event.position) {
      lastChangedNodes.length &&
        lastChangedNodes.map((lastChangedNode) => {
          setNodes((nodes) => {
            return nodes.map((node) => {
              if (node.id === lastChangedNode.id) {
                return {
                  ...node,
                  ...lastChangedNode,
                };
              }

              return node;
            });
          });
        });
    }
  }, [lastJsonMessage, setNodes, nodeId, deleteElements]);

  return { sendJsonMessage };
}
