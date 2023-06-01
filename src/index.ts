import { getBooleanInput, getInput, info, setFailed } from "@actions/core";
import { ensureFile, writeFile } from "fs-extra";
import { pipi } from "@luxass/luxals";
import type { DateRanges, Type } from "./types";
import { getTrending } from "./trending";

async function run(): Promise<void> {
  try {
    const output = getInput("output");
    const type = <Type>getInput("type");

    const dateRange = <DateRanges>getInput("date");

    let language = getInput("language");

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
      language: () => {
        // if (language.includes("++")) {
        //   language = language.replace(/\+\+/g, "pp");
        // }
        language = language
          .replace(/\s/g, "-");
        // .replace(/#/g, "sharp")
        // .replace(/\+/g, "-");

        return language;
      },
      unix: `${Math.floor(Date.now() / 1000)}`,
      type,
      spoken,
      date: dateRange,
      sponsorable: `${sponsorable}`
    });

    info(`Writing to ${path}`);
    await ensureFile(path);
    await writeFile(path, JSON.stringify(trending, null, 2));
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
