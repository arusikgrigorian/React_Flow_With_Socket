"use client";

import { ReactFlowProvider, Node } from "reactflow";
import Flow from "@/components/Gemba/components/Flow";

type Props = {
  nodes: Array<Node>;
  id: string;
};

export default function Gemba({ nodes, id }: Props) {
  return (
    <ReactFlowProvider>
      <Flow nodes={nodes} id={id} />
    </ReactFlowProvider>
  );
}
