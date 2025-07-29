import fg from "fast-glob";
import { fileURLToPath } from "url";
import path from "path";
import { getComponentIds } from "./getComponents";
import { runCypressTests } from "./runCypressTestAndUpdateStatus";

const main = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootPath = path.resolve(__dirname, "..");

  const componentIds = getComponentIds();

  const statusPageId = Cypress.env("STATUS_PAGE_ID");
  const apiKey = Cypress.env("API_KEY");

  const files = await fg("e2e/*.cy.ts", { cwd: rootPath });

  for (const file of files) {
    const filename = path.basename(file, ".cy.ts"); 

    const componentId = componentIds[filename.toLowerCase()];

    if (!componentId) {
      console.warn(
        `⚠️ Pas de componentId trouvé pour le specfile '${filename}', test ignoré.`
      );
      continue;
    }

    console.log(
      `▶️ Lancement du test pour '${filename}' avec COMPONENT_ID=${componentId}`
    );

    await runCypressTests(componentId, statusPageId, apiKey, file);
  }
};

main();
