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
  // token can be got from the storage/context and set via setter (in a component)
  // token can be got from the cookies and set right in HttpClient class constructor
  httpClient.authToken = TOKEN;

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
