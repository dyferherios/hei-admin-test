import { determineStatus } from "../componentStatus/determineStatus";
import { createIncident } from "./createIncident";
import { getActiveIncident } from "./getActiveIncident";
import { resolveIncident } from "./resolveIncident";
import { updateIncident } from "./updateIncident";

export async function handleIncident(
  INCIDENT_API_URL: string,
  API_KEY: string,
  COMPONENT_ID: string,
  failedTests: any,
  totalTests: any
) {
  const status = await determineStatus(failedTests, totalTests);
  const incident = await getActiveIncident(
    INCIDENT_API_URL,
    API_KEY,
    COMPONENT_ID
  );
  console.log("Current status:", status);
//  console.log("All incidents:", incident);

  if (status !== "OPERATIONAL") {
    if (!incident) {
		await createIncident(INCIDENT_API_URL, API_KEY, COMPONENT_ID, status);
    }
  } else if (incident) {
    await resolveIncident(incident.id, INCIDENT_API_URL, API_KEY, COMPONENT_ID);
  }
}
