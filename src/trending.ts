import { info } from "@actions/core";
import { HttpClient } from "@actions/http-client";
import { GITHUB_TRENDING_DEV_URL, GITHUB_TRENDING_URL } from "./constants";
import { DateRanges } from "./types";

export async function getTrending(
  type: string,
  dateRange: DateRanges,
  language: string,
  spoken: string,
  sponsorable: string
) {
  const isDev = type === "developers";
  const base = isDev ? GITHUB_TRENDING_DEV_URL : GITHUB_TRENDING_URL;

  const url = `${base}${encodeURIComponent(language)}?since=${dateRange}`;
  const client = new HttpClient();

  const data = await client.get(url);
  info(await data.readBody());
}
