import { useCallback, useContext, useEffect } from "react";
import { Doc } from "yjs";
import { WebrtcProvider } from "y-webrtc";

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

const yDoc = new Doc();
const yMap = yDoc.getMap("nodes");

const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const nodeTypes = { customEditor: CustomNode };

type Props = {
  nodes: Array<Node>;
  id: string;
};

export default function Flow({ nodes: initialNodes, id }: Props) {
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);

  const { fitView, project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Array<Node>>(initialNodes);

  useEffect(() => {
    initialNodes.map((initialNode) => {
      yMap.set(initialNode.id, initialNode);
    });
  }, [initialNodes]);

  useEffect(() => {
    const nodeChanges = () => setNodes(() => Array.from(yMap.values()));

    yMap.observe(nodeChanges);

    return () => yMap.unobserve(nodeChanges);
  }, [setNodes]);

  const onFlowInitialization = () => {
    const provider = new WebrtcProvider(`gemba-collaboration-${id}`, yDoc, {
      signaling: [`wss://api-roche-360.development.sentium.io/signal/${id}/`],
    });

    provider.on("synced", (synced: { synced: boolean }) => {
      console.log("synced", synced);
    });
  };

  const onFitView = useCallback(() => fitView({ duration: 400 }), [fitView]);

  const onCustomNodeAdd = useCallback(() => {
    const id = getGembaCustomNodeId();
    const position = project({ x: 0, y: 0 });

    const newCustomNode: Node = {
      id,
      position,
      type: "customEditor",
      deletable: true,
      draggable: true,
      selectable: true,
      data: {
        id,
        title: "",
        text: "",
        color: convertHexToRgb(generateRandomColor()),
      },
    };

    yMap.set(id, newCustomNode);
    setTimeout(onFitView, 100);
  }, [project, onFitView]);

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
          onInit={onFlowInitialization}
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
