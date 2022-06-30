// src/index.ts
var import_core = require("@actions/core");
async function run() {
  try {
    const type = (0, import_core.getInput)("type");
    const dateRange = (0, import_core.getInput)("date-range");
    const language = (0, import_core.getInput)("language", {
      required: true
    });
    const spoken = (0, import_core.getInput)("spoken");
    const sponsorable = (0, import_core.getInput)("sponsorable");
    (0, import_core.info)(type);
    (0, import_core.info)(dateRange);
    (0, import_core.info)(language);
    (0, import_core.info)(spoken);
    (0, import_core.info)(sponsorable);
  } catch (error) {
    if (error instanceof Error)
      (0, import_core.setFailed)(error.message);
  }
}
run();
//# sourceMappingURL=index.js.map