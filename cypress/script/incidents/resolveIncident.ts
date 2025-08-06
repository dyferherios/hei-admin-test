export async function resolveIncident(INCIDENT_ID:string,INCIDENT_API_URL:string,API_KEY:string, COMPONENT_ID: string ) {
  const res = await fetch(`${INCIDENT_API_URL}/${INCIDENT_ID}/incident-updates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `This incident has been resolved.`,
      components: [COMPONENT_ID],
      status: "RESOLVED",
      notify: true,
	  started: new Date().toISOString(),
      statuses: [
        {
          id: COMPONENT_ID,
          status: "OPERATIONAL",
        },
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erreur résolution incident : ${errorText}`);
  }

  return await res.json();
}
