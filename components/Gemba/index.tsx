import { ReactFlowProvider } from "reactflow";
import Flow from "@/components/Gemba/components/Flow";

export default function Gemba() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
