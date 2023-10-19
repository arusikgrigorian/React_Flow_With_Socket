import { useCallback, useContext } from "react";
// import useWebSocket from "react-use-websocket";

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

import "reactflow/dist/style.css";

const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const nodeTypes = { custom: CustomNode };

type Props = {
  nodes: Array<Node>;
  IcId: string;
  userId: number;
};

export default function Flow({ nodes: initialNodes, IcId, userId }: Props) {
  // TODO -> user id can be got here from the local storage/context (client)
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);

  const { fitView, project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Array<Node>>(initialNodes);

  const onFitView = useCallback(() => fitView({ duration: 400 }), [fitView]);

  const onCustomNodeAdd = useCallback(() => {
    const position = project({ x: 0, y: 0 });
    const id = getGembaCustomNodeId();
    const fiveWTwoHId = Number(IcId);
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
        fiveWTwoHId,
        userId,
      },
    };

    setNodes((nds) => nds.concat(newCustomNode));
    setTimeout(onFitView, 100);
  }, [project, setNodes, onFitView, IcId, userId]);

  const onScreenSizeChange = () => {
    setIsFullScreen(!isFullScreen);
    setTimeout(onFitView, 400);
  };

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
