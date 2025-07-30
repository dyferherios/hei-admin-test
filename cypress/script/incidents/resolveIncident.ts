export async function resolveIncident(INCIDENT_ID:string,INCIDENT_API_URL:string,API_KEY:string, COMPONENT_ID: string ) {
  const res = await fetch(`${INCIDENT_API_URL}/${INCIDENT_ID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `Incident résolu`,
      components: [COMPONENT_ID],
      status: "RESOLVED",
      notify: true,
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
