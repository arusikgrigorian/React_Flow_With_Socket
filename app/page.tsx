import Gemba from "@/components/Gemba";
import httpClient from "../services/httpClient";
import { transformNodes } from "@/utils/transformNodes";
import { HTTP_ENDPOINTS } from "@/types/api";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default async function Home({ params: { id = "40" } }: Props) {
  const user = 1; // TODO -> user id can be got here from the cookies
  const ICId = Number(id);
  const params = { all: true, five_w_two_h: id };

  const { results } = await httpClient.get(HTTP_ENDPOINTS.gembaNote, params);
  const nodes = transformNodes(results);

  return <Gemba nodes={nodes} user={user} ICId={ICId} />;
}
