
const STATUS_THRESHOLDS = {
  OPERATIONAL: 0,    // 0% d'échec
  DEGRADED: 20,      // 1-20% d'échec
  PARTIALOUTAGE: 50, // 21-50% d'échec
  MAJOROUTAGE: 51    // 51-100% d'échec
};

export const determineStatus = async (failedTests: number, totalTests: number) => {
  const failureRate = (failedTests / totalTests) * 100;

  if (failureRate <= STATUS_THRESHOLDS.DEGRADED) return 'OPERATIONAL';
  if (failureRate <= STATUS_THRESHOLDS.PARTIALOUTAGE) return 'DEGRADED';
  if (failureRate <= STATUS_THRESHOLDS.MAJOROUTAGE) return 'PARTIALOUTAGE';
  return 'MAJOROUTAGE';
}


