import { info } from "@actions/core";
import { HttpClient } from "@actions/http-client";
import {
  GITHUB_TRENDING_DEV_URL,
  GITHUB_TRENDING_URL,
  GITHUB_URL,
} from "./constants";
import { DateRanges, TrendingItem, TrendingRepository } from "./types";
import { Cheerio, CheerioAPI, Element, load } from "cheerio";

export async function getTrending(
  type: string,
  dateRange: DateRanges,
  language: string,
  spoken: string,
  sponsorable: string
): Promise<TrendingItem[]> {
  const isDev = type === "developers";
  const base = isDev ? GITHUB_TRENDING_DEV_URL : GITHUB_TRENDING_URL;

  const url = `${base}${encodeURIComponent(language)}?since=${dateRange}`;
  const client = new HttpClient();

  const data = await client.get(url);
  const body = await data.readBody();
  const $ = load(body);
  const elements: Element[] = $(".Box article.Box-row").get();

  return elements.map((_el) => {
    const el = $(_el);
    return isDev
      ? getTrendingDevelopers(el, $)
      : getTrendingRepositories(el, $);
  });
}

function getTrendingDevelopers(
  el: Cheerio<Element>,
  $: CheerioAPI
): TrendingItem {
  return {} as TrendingItem;
}

function getTrendingRepositories(
  el: Cheerio<Element>,
  $: CheerioAPI
): TrendingItem {
  const title = el.find(".h3").text().trim();
  const [username, repoName] = title.split("/").map((v) => v.trim());
  const relativeUrl = el.find(".h3").find("a").attr("href");

  const periodStars = el.find(".float-sm-right").text().trim() || "";

  const builtBy = el
    .find('span:contains("Built by")')
    .find('[data-hovercard-type="user"]')
    .map((i, user) => {
      const altString = $(user).children("img").attr("alt");
      const avatarUrl = $(user).children("img").attr("src");
      return {
        username: altString ? altString.slice(1) : null,
        href: `${GITHUB_URL}${user.attribs.href}`,
        avatar: avatarUrl?.replace(/\?s=.*$/, ""),
      };
    })
    .get();

  const colorNode = el.find(".repo-language-color");
  const langColor = colorNode.length ? colorNode.css("background-color") : null;

  const langNode = el.find("[itemprop=programmingLanguage]");

  const lang = langNode.length ? langNode.text().trim() : null;

  return {
    author: username,
    avatar: `${GITHUB_URL}/${username}.png`,
    name: repoName,
    url: `${GITHUB_URL}${relativeUrl}`,
    description: el.find("p.my-1").text().trim() || "",
    language: lang,
    color: langColor,
    stars: parseInt(
      el
        .find(".mr-3 svg[aria-label='star']")
        .first()
        .parent()
        .text()
        .trim()
        .replace(",", "") || "0",
      10
    ),
    forks: parseInt(
      el
        .find("svg[aria-label='fork']")
        .first()
        .parent()
        .text()
        .trim()
        .replace(",", "") || "0",
      10
    ),
    periodStars: parseInt(
      periodStars.split(" ")[0].replace(",", "") || "0",
      10
    ),
    builtBy,
  } as TrendingRepository;
}
