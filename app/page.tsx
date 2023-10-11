import Gemba from "@/components/Gemba";
import { Result } from "@/types";
import { ENDPOINTS } from "@/api/types";
import { BASE_URL, TOKEN } from "@/constants";

type Response = {
  count: number;
  next: null;
  previous: null;
  results: Array<Result>;
};

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const getGembaNotes = async (id: string): Promise<Response> => {
  const response = await fetch(
    `${BASE_URL}/${ENDPOINTS.gembaNote}/?all=true&five_w_two_h=${id}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
};

export default async function Home({ params: { id = "39" } }: Props) {
  const { results } = await getGembaNotes(id);

  const nodes = results?.map(
    ({ id, title, text, color, five_w_two_h, details, user }) => {
      const { position } = details.data;

      return {
        id,
        position,
        type: "customEditor",
        data: {
          id,
          title,
          text,
          color,
          fiveWTwoHId: `${five_w_two_h}`,
          userId: user,
        },
      };
    },
  );

  return <Gemba nodes={nodes} id={id} />;
}
