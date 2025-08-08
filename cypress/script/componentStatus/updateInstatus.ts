export const updateInstatusStatus = async (status: string, STATUS_PAGE_ID: string, COMPONENT_ID: string, API_KEY: string) => {
  const API_URL = `https://api.instatus.com/v2/${STATUS_PAGE_ID}/components/${COMPONENT_ID}`;
  const validStatuses = ['OPERATIONAL', 'DEGRADED', 'PARTIALOUTAGE', 'MAJOROUTAGE'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status : ${status}`);
  }

  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Error Instatus: ${res.status} - ${error || 'Unknown error'}`);
  }
}


