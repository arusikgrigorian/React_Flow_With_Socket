import { Param } from "@/types";

export function getUrlWithParams(url: string, params?: Param): URL {
  const initialUrl = new URL(url);

  if (params) {
    const query = Object.entries(params).map((entry) =>
      entry.map((value) => value.toString()),
    );

    query.length
      ? (initialUrl.search = new URLSearchParams(query).toString())
      : "";
  }

  return initialUrl;
}
