import { log } from "console";
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

  if (status !== "OPERATIONAL") {
	console.log(`Current status: ${status}`);
    if (!incident) {
		console.log("No active incident found, creating a new one.");
		await createIncident(INCIDENT_API_URL, API_KEY, COMPONENT_ID, status);
    }
  } else if (incident) {
	console.log("Incident found, updating it to operational status.");
    await resolveIncident(incident.id, INCIDENT_API_URL, API_KEY, COMPONENT_ID);
  }
  else {
	console.log("No active incident found, no action needed.");
  }
}
