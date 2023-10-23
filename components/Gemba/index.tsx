"use client";

import { ReactFlowProvider, Node } from "reactflow";
import Flow from "@/components/Gemba/components/Flow";

type Props = {
  nodes: Array<Node>;
  ICId: number;
  user: number;
};

export default function Gemba({ nodes, ICId, user }: Props) {
  return (
    <ReactFlowProvider>
      <Flow nodes={nodes} ICId={ICId} user={user} />
    </ReactFlowProvider>
  );
}
