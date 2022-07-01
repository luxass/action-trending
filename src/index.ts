import { getInput, setFailed, info, getBooleanInput } from "@actions/core";
import { DateRanges, Type } from "./types";
import { ensureFile, writeFile } from "fs-extra";
import { getTrending } from "./trending";
import { pipi } from "@luxass/luxals-pipi";

async function run(): Promise<void> {
  try {
    const output = getInput("output");
    const type: Type = <Type>getInput("type");

    const dateRange: DateRanges = <DateRanges>getInput("date");

    const language = getInput("language");

    const spoken = getInput("spoken");
    const sponsorable = getBooleanInput("sponsorable");

    const trending = await getTrending(
      type,
      dateRange,
      language,
      spoken,
      sponsorable
    );

    const path = pipi(output, {
      cwd: process.cwd(),
      language: language,
      unix: `${Math.floor(Date.now() / 1000)}`,
      type: type,
      spoken: spoken,
      date: dateRange,
      sponsorable: `${sponsorable}`,
    });

    await ensureFile(path);
    await writeFile(path, JSON.stringify(trending, null, 2));
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
