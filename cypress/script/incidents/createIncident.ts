export async function createIncident(INCIDENT_API_URL: string, API_KEY: string, COMPONENT_ID: string, STATUS: string) {
  const resComponent = await fetch(`https://api.instatus.com/v1/components/${COMPONENT_ID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    }
  })
  const component = await resComponent.json();
  const componentName = component.name;
  const res = await fetch(INCIDENT_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `Incident detected - ${STATUS}`,
      message: `The component ${componentName} affected with ${STATUS}.`,
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
    throw new Error(`Error while creating incident : ${errorText}`);
  }

  return await res.json();
}
