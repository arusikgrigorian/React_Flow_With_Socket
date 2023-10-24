import { useCallback, useContext, useEffect } from "react";
import useWebSocket from "react-use-websocket";

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  NodeOrigin,
  Panel,
  ProOptions,
  useNodesState,
  useReactFlow,
} from "reactflow";

import CustomNode from "../CustomNode";
import FlowPanel from "../FlowPanel";
import { FullScreenContext } from "@/context/GembaScreenContext";
import { getGembaCustomNodeId } from "@/utils/getGembaCustomNodeId";
import { convertHexToRgb } from "@/utils/convertHexToRgb";
import { generateRandomColor } from "@/utils/generateRandomColor";
import { generateSocketRoomName } from "@/utils/generateSocketRoomName";
import { OPTIONS } from "@/services/socket/constants";
import { SOCKET_URL } from "@/constants";
import { WebSocketResult } from "@/types";
import { ROOM } from "@/api/types";

import "reactflow/dist/style.css";
import { getSocketEventType } from "@/utils/getSocketEventType";
import { extractJsonMessageData } from "@/utils/extractJsonMessageData";
import { transformNodes } from "@/utils/transformNodes";

const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const nodeTypes = { custom: CustomNode };

type Props = {
  nodes: Array<Node>;
  ICId: number;
  user: number;
};

export default function Flow({ nodes: initialNodes, ICId, user }: Props) {
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);

  const { fitView, project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Array<Node>>(initialNodes);

  const onFitView = useCallback(() => fitView({ duration: 400 }), [fitView]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<
    WebSocketResult["jsonMessage"]
  >(`${SOCKET_URL}/socket/5w2h/${ICId}/`, OPTIONS);

  useEffect(() => {
    const lastMessageData = extractJsonMessageData(lastJsonMessage);
    const lastChangedNodes = transformNodes(lastMessageData);
    const event = getSocketEventType(lastJsonMessage);

    if (!event) {
      return;
    }

    if (event === "addition") {
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

    if (event === "position") {
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
  }, [setNodes, lastJsonMessage]);

  const onScreenSizeChange = useCallback(() => {
    setIsFullScreen(!isFullScreen);
    setTimeout(onFitView, 400);
  }, [isFullScreen, setIsFullScreen, onFitView]);

  const onCustomNodeAdd = useCallback(() => {
    const position = project({ x: 0, y: 0 });
    const id = getGembaCustomNodeId();
    const color = convertHexToRgb(generateRandomColor());

    const newCustomNode: Node = {
      id,
      position,
      type: "custom",
      deletable: true,
      draggable: true,
      selectable: true,
      data: {
        id,
        title: "",
        text: "",
        color,
        fiveWTwoHId: ICId,
        userId: user,
      },
    };

    const detailsData = { fiveWTwoHId: ICId, position };
    const addedNodeData = {
      ...newCustomNode.data,
      event: "addition",
      details: { data: { ...detailsData } },
    };

    setNodes((nds) => nds.concat(newCustomNode));
    setTimeout(onFitView, 100);

    sendJsonMessage({
      group: generateSocketRoomName(ROOM.note, ICId),
      type: ROOM.note,
      eventSource: "gemba",
      event: "addition",
      data: { ...addedNodeData },
    });
  }, [project, setNodes, onFitView, ICId, user, sendJsonMessage]);

  const onCustomNodeDragStop = useCallback(
    (_: any, { data, position }: Node) => {
      const detailsData = { fiveWTwoHId: ICId, position };

      const draggedNodeData = {
        ...data,
        position,
        userId: data.user,
        details: { data: { ...detailsData } },
      };

      sendJsonMessage({
        group: generateSocketRoomName(ROOM.note, ICId),
        type: ROOM.note,
        eventSource: "gemba",
        event: "position",
        data: { ...draggedNodeData },
      });
    },
    [ICId, sendJsonMessage],
  );

  return (
    <main className={"max-h-screen"}>
      <div
        className={`${
          isFullScreen ? "w-screen" : "w-96"
        } h-screen transition-[width] 400ms ease-in-out bg-blue-2`}
      >
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodeDragStop={onCustomNodeDragStop}
          fitView={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          nodeOrigin={nodeOrigin}
          minZoom={-Infinity}
          maxZoom={Infinity}
          proOptions={proOptions}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Panel position={"top-left"}>
            <FlowPanel
              isFullScreen={isFullScreen}
              onCustomNodeAdd={onCustomNodeAdd}
              onFitView={onFitView}
              onScreenSizeChange={onScreenSizeChange}
            />
          </Panel>
          <Controls
            position={"bottom-right"}
            showFitView={false}
            showInteractive={false}
          />
        </ReactFlow>
      </div>
    </main>
  );
}
