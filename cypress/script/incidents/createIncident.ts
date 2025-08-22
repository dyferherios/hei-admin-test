export async function createIncident(INCIDENT_API_URL: string, API_KEY:string, COMPONENT_ID: string, filename: string, STATUS: string) {
  const impactMap = {
    DEGRADEDPERFORMANCE: "minor",
    PARTIALOUTAGE: "major",
    MAJOROUTAGE: "critical",
  };


  const res = await fetch(INCIDENT_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `check: ${filename} - ${STATUS}`,
      message: `Component status: ${STATUS}.`,
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
    throw new Error(`Incident creation Error : ${errorText}`);
  }

  return await res.json();
}
