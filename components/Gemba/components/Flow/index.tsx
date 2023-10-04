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
import { getGembaCustomNodeId } from "@/utils/getGembaCustomNodeId";
import { generateRandomColor } from "@/utils/generateRandomColor";

import "reactflow/dist/style.css";

const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const nodeTypes = { custom: CustomNode };

type Props = {
  nodes: Array<Node>;
};

export default function Flow({ nodes: initialNodes }: Props) {
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);

  const { fitView, project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Array<Node>>(initialNodes);

  const onFitView = () => fitView({ duration: 400 });

  const onCustomNodeAdd = useCallback(() => {
    const id = getGembaCustomNodeId();
    const position = project({ x: 0, y: 0 });

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
        color: generateRandomColor(),
      },
    };

    setNodes((nds) => nds.concat(newCustomNode));
    setTimeout(onFitView, 100);
  }, [project]);

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
