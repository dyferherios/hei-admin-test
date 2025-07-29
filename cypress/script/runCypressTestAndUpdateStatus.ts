import { run as _run } from 'cypress';
import { updateInstatusStatus } from './upadateInstatus';
import { determineStatus } from './determineStatus';

export const runCypressTests = async (COMPONENT_ID: string, STATUS_PAGE_ID: string, API_KEY: string, specFile: string) => {
  try {
    const result = await _run({
      spec: specFile,
      env: { coverage: 'true' },
    });

    if ('runs' in result) {
      const failedTests = result.totalFailed;
      const totalTests = result.totalTests;
      const status = await determineStatus(failedTests, totalTests);

      await updateInstatusStatus(status, STATUS_PAGE_ID, COMPONENT_ID, API_KEY);
      process.exit(failedTests > 0 ? 1 : 0);
    } else {
      await updateInstatusStatus('MAJOROUTAGE', STATUS_PAGE_ID, COMPONENT_ID, API_KEY);
      process.exit(1);
    }
  } catch (error) {
    await updateInstatusStatus('MAJOROUTAGE', STATUS_PAGE_ID, COMPONENT_ID, API_KEY);
    process.exit(1);
  }
}

