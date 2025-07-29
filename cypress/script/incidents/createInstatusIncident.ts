import { mapComponentStatusToIncidentStatus } from "./mapComponentStatusToIncidentStatus";

export const createInstatusIncident = async (
  STATUS_PAGE_ID: string,
  API_KEY: string,
  title: string,
  message: string,
  components: { id: string; status: string }[]
) => {
  const incidentStatus = mapComponentStatusToIncidentStatus(
    components[0].status
  );

  const res = await fetch(
    `https://api.instatus.com/v1/${STATUS_PAGE_ID}/incidents`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        message,
        components,
        status: incidentStatus,
        notify: false,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(
      `Erreur création incident Instatus: ${res.status} - ${error}`
    );
  }

  return await res.json();
};
