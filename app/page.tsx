import Gemba from "@/components/Gemba";
import { Result } from "@/types";

type Response = {
  count: number;
  next: null;
  previous: null;
  results: Array<Result>;
};

const getGembaNotes = async (): Promise<Response> => {
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

  const nodes = results.map(
    ({ id, type, title, text, color, five_w_two_h, details }) => {
      const { hidden, position } = details.data;

      return {
        id,
        type: type || "custom",
        hidden: hidden,
        position: position,
        data: {
          id,
          color,
          title,
          text,
          fiveWTwoHId: `${five_w_two_h}`,
          hidden: hidden,
        },
      };
    },
  );

  return <Gemba nodes={nodes} />;
}
