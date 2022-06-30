import { getInput, setFailed, info } from "@actions/core";
import { DateRanges, Type } from "./types";

async function run(): Promise<void> {
  try {
    const type: Type = <Type>getInput("type");

    const dateRange: DateRanges = <DateRanges>getInput("date-range");

    const language = getInput("language", {
      required: true,
    });

    const spoken = getInput("spoken");
    const sponsorable = getInput("sponsorable");

    info(type);
    info(dateRange);
    info(language);
    info(spoken);
    info(sponsorable);
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
