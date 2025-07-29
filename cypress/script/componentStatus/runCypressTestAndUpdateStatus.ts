// import { run as _run } from "cypress";
// import { updateInstatusStatus } from "./upadateInstatus";
// import { determineStatus } from "./determineStatus";

// export const runCypressTests = async (
//   COMPONENT_ID: string,
//   STATUS_PAGE_ID: string,
//   API_KEY: string,
//   specFile: string
// ): Promise<number> => {
//   try {
//     const result = await _run({
//       spec: `cypress/${specFile}`,
//       env: { coverage: "true" },
//     });

//     console.log(result);

//     if ("runs" in result) {
//       const failedTests = result.totalFailed;
//       const totalTests = result.totalTests;
//       const status = await determineStatus(failedTests, totalTests);

//       await updateInstatusStatus(status, STATUS_PAGE_ID, COMPONENT_ID, API_KEY);
//       return failedTests;
//     } else {
//       await updateInstatusStatus(
//         "MAJOROUTAGE",
//         STATUS_PAGE_ID,
//         COMPONENT_ID,
//         API_KEY
//       );
//       return 1;
//     }
//   } catch (error) {
//     await updateInstatusStatus(
//       "MAJOROUTAGE",
//       STATUS_PAGE_ID,
//       COMPONENT_ID,
//       API_KEY
//     );
//     return 1;
//   }
// };

import { run as _run } from "cypress";
import { updateInstatusStatus } from "./upadateInstatus";
import { determineStatus } from "./determineStatus";

export const runCypressTests = async (
  COMPONENT_ID: string,
  STATUS_PAGE_ID: string,
  API_KEY: string,
  specFile: string
): Promise<{ failedTests: number; totalTests: number }> => {
  try {
    const result = await _run({
      spec: `cypress/${specFile}`,
      env: { coverage: "true" },
    });

    if ("runs" in result) {
      const failedTests = result.totalFailed;
      const totalTests = result.totalTests;
      const status = await determineStatus(failedTests, totalTests);

      await updateInstatusStatus(status, STATUS_PAGE_ID, COMPONENT_ID, API_KEY);
      return { failedTests, totalTests };
    } else {
      await updateInstatusStatus(
        "MAJOROUTAGE",
        STATUS_PAGE_ID,
        COMPONENT_ID,
        API_KEY
      );
      return { failedTests: 1, totalTests: 1 };
    }
  } catch (error) {
    await updateInstatusStatus(
      "MAJOROUTAGE",
      STATUS_PAGE_ID,
      COMPONENT_ID,
      API_KEY
    );
    return { failedTests: 1, totalTests: 1 };
  }
};
