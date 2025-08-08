import fg from "fast-glob";
import { fileURLToPath } from "url";
import path from "path";
import { getComponentIds } from "./componentStatus/getComponents";
import { runCypressTests } from "./componentStatus/runCypressTestAndUpdateStatus";
import { handleIncident } from "./incidents/handleIncident";

export const main = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootPath = path.resolve(__dirname, "..");

  const componentIds = getComponentIds();

  const statusPageId = process.env.STATUS_PAGE_ID;
  const apiKey = process.env.API_KEY;
  const incidentApiUrl = `${process.env.INCIDENT_API_URL}/${statusPageId}/incidents`

  const files = await fg("e2e/*.cy.ts", { cwd: rootPath });

  let hasFailures = false;

  for (const file of files) {
    const filename = path.basename(file, ".cy.ts");
    const componentId = componentIds[filename.toLowerCase()];

    if (!componentId) {
      console.warn(`No componentId found to ${filename}`);
      continue;
    }

    const { failedTests, totalTests } = await runCypressTests(
      componentId,
      statusPageId!,
      apiKey!,
      file
    );


    try {
      await handleIncident(incidentApiUrl, apiKey, componentId, failedTests, totalTests);
    } catch (err) {
      console.error(`Error incident to ${componentId}:`, err);
    }

    if (failedTests > 0) {
      hasFailures = true;
      console.warn(`Tests failed for the file ${file}`);
    } else {
      console.log(`Tests passed for the file${file}`);
    }
  }

  process.exit(hasFailures ? 1 : 0);
};

main();
