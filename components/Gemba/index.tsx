"use client";

import { ReactFlowProvider, Node } from "reactflow";
import Flow from "@/components/Gemba/components/Flow";

type Props = {
  nodes: Array<Node>;
  IcId: string;
  user: number;
};

export default function Gemba({ nodes, IcId, user }: Props) {
  return (
    <ReactFlowProvider>
      <Flow nodes={nodes} IcId={IcId} user={user} />
    </ReactFlowProvider>
  );
}
