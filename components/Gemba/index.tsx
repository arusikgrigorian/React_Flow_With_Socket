"use client";

import { ReactFlowProvider, Node } from "reactflow";
import Flow from "@/components/Gemba/components/Flow";

type Props = {
  nodes: Array<Node>;
  IcId: string;
  userId: number;
};

export default function Gemba({ nodes, IcId, userId }: Props) {
  // TODO -> user id can be got here from the local storage/context (client)

  return (
    <ReactFlowProvider>
      <Flow nodes={nodes} IcId={IcId} userId={userId} />
    </ReactFlowProvider>
  );
}
