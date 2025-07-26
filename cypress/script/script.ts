import { run as _run } from 'cypress';


const specFiles = ['cypress/e2e/login.cy.tsx'];

// async function updateInstatusStatus(status) {
//   const validStatuses = ['OPERATIONAL', 'PARTIALOUTAGE', 'MAJOROUTAGE'];
//   if (!validStatuses.includes(status)) {
//     throw new Error(`Statut invalide : ${status}`);
//   }
  const COMPONENT_ID = 'cmdfu8jnh0056llvmy1zlqt3g';
  const STATUS_PAGE_ID = 'cmdeg1yli004pbl1jukxjzdq4';
  const API_KEY = 'a9ee11df5056a9da654905371e933070';
  const API_URL = `https://api.instatus.com/v2/${STATUS_PAGE_ID}/components/${COMPONENT_ID}`;

//   const res = await fetch(API_URL, {
//   method: 'PUT',
//   headers: {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       status: status
//     })
//   });

//   if (!res.ok) {
//     const errorBody = await res.text();
//     throw new Error(`Erreur lors de la mise à jour du statut Instatus: ${res.status} - ${errorBody}`);
//   }
// }


// async function runCypressTests() {

//   try {
//     const result = await _run({
//       spec: specFiles.join(','),
//       env: { coverage: 'true' },
//     });

//     if ('runs' in result) {
//       if (result.totalFailed > 0) {
//         await updateInstatusStatus('MAJOROUTAGE');
//         process.exit(1);
//       } else {
//         await updateInstatusStatus('OPERATIONAL');
//         process.exit(0);
//       }
//     } else {
//       await updateInstatusStatus('MAJOROUTAGE');
//       process.exit(1);
//     }
//   } catch (error) {
//     await updateInstatusStatus('MAJOROUTAGE');
//     process.exit(1);
//   }
// }

// runCypressTests();

// Configurations
// const COMPONENT_ID = process.env.INSTATUS_COMPONENT_ID;
// const STATUS_PAGE_ID = process.env.INSTATUS_PAGE_ID;
// const API_KEY = process.env.INSTATUS_API_KEY; // À définir dans les secrets
// const API_URL = `https://api.instatus.com/v2/${STATUS_PAGE_ID}/components/${COMPONENT_ID}`;

// Seuils personnalisables
const STATUS_THRESHOLDS = {
  OPERATIONAL: 0,    // 0% d'échec
  DEGRADED: 20,      // 1-20% d'échec
  PARTIALOUTAGE: 50, // 21-50% d'échec
  MAJOROUTAGE: 51    // 51-100% d'échec
};

async function updateInstatusStatus(status: string) {
  const validStatuses = ['OPERATIONAL', 'DEGRADED', 'PARTIALOUTAGE', 'MAJOROUTAGE'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Statut invalide : ${status}`);
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
    throw new Error(`Erreur Instatus: ${res.status} - ${error || 'Unknown error'}`);
  }
}

async function determineStatus(failedTests: number, totalTests: number) {
  const failureRate = (failedTests / totalTests) * 100;
  
  if (failureRate <= STATUS_THRESHOLDS.DEGRADED) return 'OPERATIONAL';
  if (failureRate <= STATUS_THRESHOLDS.PARTIALOUTAGE) return 'DEGRADED';
  if (failureRate <= STATUS_THRESHOLDS.MAJOROUTAGE) return 'PARTIALOUTAGE';
  return 'MAJOROUTAGE';
}

async function runCypressTests() {
  try {
    const result = await _run({
      spec: specFiles.join(','),
      env: { coverage: 'true' },
    });

    if ('runs' in result) {
      const failedTests = result.totalFailed;
      const totalTests = result.totalTests;
      const status = await determineStatus(failedTests, totalTests);
      
      await updateInstatusStatus(status);
      process.exit(failedTests > 0 ? 1 : 0);
    } else {
      await updateInstatusStatus('MAJOROUTAGE');
      process.exit(1);
    }
  } catch (error) {
    await updateInstatusStatus('MAJOROUTAGE');
    process.exit(1);
  }
}

runCypressTests();