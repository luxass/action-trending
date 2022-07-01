import { getInput, setFailed, info, getBooleanInput } from "@actions/core";
import { DateRanges, Type } from "./types";
import { ensureFile, writeFile } from "fs-extra";
import { getTrending } from "./trending";

async function run(): Promise<void> {
  try {
    const type: Type = <Type>getInput("type");

    const dateRange: DateRanges = <DateRanges>getInput("date");

    const language = getInput("language");

    const spoken = getInput("spoken");
    const sponsorable = getBooleanInput("sponsorable");

    info(type);
    info(dateRange);
    info(language);
    info(spoken);

    const trending = await getTrending(
      type,
      dateRange,
      language,
      spoken,
      sponsorable
    );
    const path = `${process.cwd()}/trending-${type}-${type}-${Math.floor(
      Date.now() / 1000
    )}.json`;

    await ensureFile(path);
    await writeFile(path, JSON.stringify(trending, null, 2));
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
