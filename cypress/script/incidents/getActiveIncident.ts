export async function getActiveIncident(
  INCIDENT_API_URL: string,
  API_KEY: string,
  COMPONENT_ID: string
) {
   const res = await fetch(`${INCIDENT_API_URL}?status=INVESTIGATING`, {
   headers: {
     Authorization: `Bearer ${API_KEY}`,
   },
 });

 if (!res.ok) {
   const errorText = await res.text();
   throw new Error(
     `Erreur lors de la récupération des incidents: ${errorText}`
   );
 }

  const resData = await res.json();
  

 if (!Array.isArray(resData)) {
   throw new Error(
     "Format de réponse inattendu : réponse n’est pas un tableau"
   );
 }

 return resData.find((incident: any) =>
   incident.components?.some((comp: any) => comp.id === COMPONENT_ID)
 );
}
