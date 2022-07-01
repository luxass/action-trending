import { getInput, setFailed, info } from "@actions/core";
import { DateRanges, Type } from "./types";
import cheerio from "cheerio";
import { getTrending } from "./trending";

async function run(): Promise<void> {
  try {
    const type: Type = <Type>getInput("type");

    const dateRange: DateRanges = <DateRanges>getInput("date");

    const language = getInput("language");

    const spoken = getInput("spoken");
    const sponsorable = getInput("sponsorable");

    info(type);
    info(dateRange);
    info(language);
    info(spoken);
    info(sponsorable);

    const trending = await getTrending(
      type,
      dateRange,
      language,
      spoken,
      sponsorable
    );
    info(JSON.stringify(trending));
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
