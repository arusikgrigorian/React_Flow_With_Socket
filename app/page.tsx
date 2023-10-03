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
    headers: {},
  });

  return await response.json();
};

export default async function Home() {
  const { results = [] } = await getGembaNotes();
  const nodes = results.map((el) => {
    return {
      id: el.id,
      type: "custom",
      hidden: el.details.data.hidden,
      position: el.details.data.position,
      data: {
        id: el.id,
        color: el.color,
        title: el.title,
        text: el.text,
        fiveWTwoHId: String(el.five_w_two_h),
        hidden: el.details.data.hidden,
      },
    };
  });

  return <Gemba nodes={nodes} />;
}
