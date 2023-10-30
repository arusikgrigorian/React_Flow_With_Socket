import { Param } from "@/types/global";

export function getUrlWithParams(
  baseUrl: string,
  endpoint: string,
  params?: Param,
): URL {
  const url = new URL(`${baseUrl}/${endpoint}`);

  if (params) {
    const query = Object.entries(params).map((entry) =>
      entry.map((value) => value.toString()),
    );

    query.length ? (url.search = new URLSearchParams(query).toString()) : "";
  }

  return url;
}
