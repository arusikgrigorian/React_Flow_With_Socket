import Gemba from "@/components/Gemba";
import httpClient from "@/services/rest";
import { transformNodes } from "@/utils/transformNodes";
import { ENDPOINTS } from "@/api/types";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default async function Home({ params: { id = "49" } }: Props) {
  // TODO -> user id can be got here from the cookies (server)
  const user = 1;
  const ICId = Number(id);
  const params = { all: true, five_w_two_h: id };

  const { results } = await httpClient.get(ENDPOINTS.gembaNote, params);

  const nodes = transformNodes(results);

  return <Gemba nodes={nodes} user={user} ICId={ICId} />;
}
