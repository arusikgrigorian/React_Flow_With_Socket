import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  Panel,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { Button, Space } from "antd";
import { useState } from "react";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 50, y: 100 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    position: { x: 500, y: 300 },
    data: { label: "Node 2" },
  },
];

export default function Flow() {
  const [isViewExpanded, setIsViewExpanded] = useState<boolean>(true);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);

  return (
    <main className={"max-h-screen"}>
      <div className={"w-screen h-screen"}>
        <ReactFlow nodes={nodes} onNodesChange={onNodesChange}>
          <Background
            variant={BackgroundVariant.Dots}
            color={"#bfc8d1"}
            gap={12}
            size={1}
          />
          <Panel position={"top-left"}>
            <Space size={8}>
              <Button type={"primary"} className={"bg-amber-500"}>
                Add New
              </Button>
              <Button>Fit View</Button>
              <Button>{isViewExpanded ? "Expand" : "Shrink"}</Button>
            </Space>
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
