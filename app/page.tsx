import Gemba from "@/components/Gemba";
import httpClient from "@/services/rest";
import { TOKEN } from "@/constants";
import { ENDPOINTS } from "@/api/types";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default async function Home({ params: { id = "40" } }: Props) {
  httpClient.token = TOKEN;

  const { results } = await httpClient.get(ENDPOINTS.gembaNote, {
    all: true,
    five_w_two_h: id,
  });

  const nodes = results?.map(
    ({ id, title, text, color, five_w_two_h, details, user }) => {
      const { position } = details.data;

      return {
        id,
        position,
        type: "custom",
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
