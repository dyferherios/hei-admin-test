export async function updateIncident(INCIDENT_ID: any, INCIDENT_API_URL: string, API_KEY: string, COMPONENT_ID: any, STATUS: any) {
  const res = await fetch(`${INCIDENT_API_URL}/${INCIDENT_ID}/incident-updates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `This incident has been resolved.`,
      components: [COMPONENT_ID],
      status: "INVESTIGATING",
      notify: true,
      started: new Date().toISOString(),
      statuses: [
        {
          id: COMPONENT_ID,
          status: STATUS,
        },
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error update incident : ${errorText}`);
  }

  return await res.json();
}
