"use client";

import { ReactFlowProvider } from "reactflow";
import { Node } from "reactflow";
import Flow from "@/components/Gemba/components/Flow";

type Props = {
  nodes: Array<Node>;
};

export default function Gemba({ nodes }: Props) {
  return (
    <ReactFlowProvider>
      <Flow nodes={nodes} />
    </ReactFlowProvider>
  );
}
