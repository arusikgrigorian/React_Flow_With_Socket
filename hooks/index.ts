import { useEffect } from "react";
import { useReactFlow } from "reactflow";
import useWebSocket, { Options } from "react-use-websocket";

import { getSocketEventType } from "@/utils/getSocketEventType";
import { extractJsonMessageData } from "@/utils/extractJsonMessageData";
import { transformNodes } from "@/utils/transformNodes";

import { SOCKET_URL } from "@/constants";

import { SocketResult } from "@/types/global";
import { Event, SOCKET_ENDPOINTS } from "@/types/api";

const OPTIONS: Options = {
  share: true,
  shouldReconnect: () => false,
};

type Param = {
  id: string | number;
  endpoint: string;
};

export function useSocket({ id, endpoint }: Param, nodeId?: string) {
  const url = `${SOCKET_URL}/${SOCKET_ENDPOINTS.socket}/`;
  const path = `${endpoint}/${id}/`;

  const { setNodes, deleteElements } = useReactFlow();

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<
    SocketResult["jsonMessage"]
  >(`${url}${path}`, OPTIONS);

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

    if (event === Event.resize) {
      lastChangedNodes.length &&
        lastChangedNodes.map((lastChangedNode) => {
          setNodes((nodes) => {
            return nodes.map((node) => {
              if (node.id === lastChangedNode.id) {
                return {
                  ...node,
                  data: {
                    ...lastChangedNode.data,
                  },
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
