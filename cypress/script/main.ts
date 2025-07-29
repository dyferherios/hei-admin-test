import fg from "fast-glob";
import { fileURLToPath } from "url";
import path from "path";
import { getComponentIds } from "./componentStatus/getComponents";
import { runCypressTests } from "./componentStatus/runCypressTestAndUpdateStatus";
import { determineStatus } from "./componentStatus/determineStatus";

export const main = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootPath = path.resolve(__dirname, "..");

  const componentIds = getComponentIds();

  const statusPageId = process.env.STATUS_PAGE_ID;
  const apiKey = process.env.API_KEY;

  const files = await fg("e2e/*.cy.ts", { cwd: rootPath });

  let hasFailures = false;
  

  for (const file of files) {
    const filename = path.basename(file, ".cy.ts");
    const componentId = componentIds[filename.toLowerCase()];

    if (!componentId) {
      console.warn("no component found")
    }

    const { failedTests, totalTests } = await runCypressTests(
      componentId,
      statusPageId!,
      apiKey!,
      file
    );

    const status = await determineStatus(failedTests, totalTests);

    if (failedTests > 0) {
      hasFailures = true;
      console.warn(`test failed with file ${file}`);
    } else {
      console.log(`test passed with file ${file}`);
    }
  }

  process.exit(hasFailures ? 1 : 0);
};

main();
