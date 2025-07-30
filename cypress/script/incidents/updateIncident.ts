export async function updateIncident(INCIDENT_ID: any, INCIDENT_API_URL: string, API_KEY:string, COMPONENT_ID: any, STATUS: any) {
  const res = await fetch(`${INCIDENT_API_URL}/${INCIDENT_ID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `Mise à jour - ${STATUS}`,
      components: [COMPONENT_ID],
      status: "INVESTIGATING",
      notify: true,
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
    throw new Error(`Erreur mise à jour incident : ${errorText}`);
  }

  return await res.json();
}
