import fg from "fast-glob";
import { fileURLToPath } from "url";
import path from "path";
import { getComponentIds } from "./componentStatus/getComponents";
import { runCypressTests } from "./componentStatus/runCypressTestAndUpdateStatus";
import { determineStatus } from "./componentStatus/determineStatus";
import { handleIncident } from "./incidents/handleIncident";

// export const main = async () => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const rootPath = path.resolve(__dirname, "..");

//   const componentIds = getComponentIds();

//   const statusPageId = process.env.STATUS_PAGE_ID;
//   const apiKey = process.env.API_KEY;

//   const files = await fg("e2e/*.cy.ts", { cwd: rootPath });

//   let hasFailures = false;
  

//   for (const file of files) {
//     const filename = path.basename(file, ".cy.ts");
//     const componentId = componentIds[filename.toLowerCase()];

//     if (!componentId) {
//       console.warn("no component found")
//     }

//     const { failedTests, totalTests } = await runCypressTests(
//       componentId,
//       statusPageId!,
//       apiKey!,
//       file
//     );

//     const status = await determineStatus(failedTests, totalTests);

//     if (failedTests > 0) {
//       hasFailures = true;
//       console.warn(`test failed with file ${file}`);
//     } else {
//       console.log(`test passed with file ${file}`);
//     }
//   }

//   process.exit(hasFailures ? 1 : 0);
// };

// main();

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
      console.warn(`Aucun componentId trouvé pour ${filename}`);
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
      console.error(`Erreur incident pour ${componentId}:`, err);
    }

    if (failedTests > 0) {
      hasFailures = true;
      console.warn(`Tests échoués pour le fichier ${file}`);
    } else {
      console.log(`Tests OK pour le fichier ${file}`);
    }
  }

  process.exit(hasFailures ? 1 : 0);
};

main();