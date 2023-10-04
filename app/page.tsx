import { Node } from "reactflow";
import Gemba from "@/components/Gemba";

type Props = {
  results: Array<
    Node & {
      details: any;
      color: any;
      title: any;
      text: any;
      five_w_two_h: any;
    }
  >;
};

const getGembaNotes = async (): Promise<Props> => {
  const response = await fetch("", {
    headers: {
      Authorization: "Token ",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export default async function Home() {
  const { results = [] } = await getGembaNotes();

  const nodes = results.map((node) => {
    return {
      id: node.id,
      type: "custom",
      hidden: node.details.data.hidden,
      position: node.details.data.position,
      data: {
        id: node.id,
        color: node.color,
        title: node.title,
        text: node.text,
        fiveWTwoHId: String(node.five_w_two_h),
        hidden: node.details.data.hidden,
      },
    };
  });

  return <Gemba nodes={nodes} />;
}
