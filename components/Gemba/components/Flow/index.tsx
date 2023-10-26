import { useCallback, useContext } from "react";

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
import { useSocket } from "@/hooks";
import { send } from "@/services/socket";

import { getGembaCustomNodeId } from "@/utils/getGembaCustomNodeId";
import { convertHexToRgb } from "@/utils/convertHexToRgb";
import { generateRandomColor } from "@/utils/generateRandomColor";

import { JsonMessageParam } from "@/types";
import { EventSource, Event } from "@/api/types";

import "reactflow/dist/style.css";

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

  const [sendJsonMessage] = useSocket({ id: ICId });

  const onFitView = useCallback(() => fitView({ duration: 400 }), [fitView]);

  const sendMessage = useCallback(
    (params: JsonMessageParam, data: Node["data"]) =>
      send(sendJsonMessage, params, data),
    [sendJsonMessage],
  );

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

    setNodes((nds) => nds.concat(newCustomNode));
    setTimeout(onFitView, 100);

    const params = {
      groupId: ICId,
      eventSource: EventSource.gemba,
      event: Event.addition,
    };

    const addedNodeData = {
      ...newCustomNode.data,
      details: { data: { fiveWTwoHId: ICId, position } },
    };

    sendMessage(params, addedNodeData);
  }, [project, setNodes, onFitView, ICId, user, sendMessage]);

  const onCustomNodeDragStop = useCallback(
    (_: any, { data, position }: Node) => {
      const params = {
        groupId: ICId,
        eventSource: EventSource.gemba,
        event: Event.position,
      };

      const draggedNodeData = {
        ...data,
        position,
        userId: data.user,
        details: { data: { fiveWTwoHId: ICId, position } },
      };

      sendMessage(params, draggedNodeData);
    },
    [ICId, sendMessage],
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
