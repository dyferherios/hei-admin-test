
// const STATUS_THRESHOLDS = {
//   OPERATIONAL: 0,    // 0% d'échec
//   DEGRADED: 20,      // 1-20% d'échec
//   PARTIALOUTAGE: 50, // 21-50% d'échec
//   MAJOROUTAGE: 51    // 51-100% d'échec
// };

// export const determineStatus = async (failedTests: number, totalTests: number) => {
//   const failureRate = (failedTests / totalTests) * 100;

//   if (failureRate <= STATUS_THRESHOLDS.DEGRADED) return 'OPERATIONAL';
//   if (failureRate <= STATUS_THRESHOLDS.PARTIALOUTAGE) return 'DEGRADED';
//   if (failureRate <= STATUS_THRESHOLDS.MAJOROUTAGE) return 'PARTIALOUTAGE';
//   return 'MAJOROUTAGE';
// }


const STATUS_THRESHOLDS = {
  OPERATIONAL: 0, // 0% échec
  DEGRADEDPERFORMANCE: 20, // 1-20%
  PARTIALOUTAGE: 50, // 21-50%
  MAJOROUTAGE: 100, // 51-100%
};

export const determineStatus = async (
  failedTests: number,
  totalTests: number
): Promise<
  | "OPERATIONAL"
  | "UNDERMAINTENANCE"
  | "DEGRADEDPERFORMANCE"
  | "PARTIALOUTAGE"
  | "MAJOROUTAGE"
> => {
  const failureRate = (failedTests / totalTests) * 100;

  if (failureRate === 0) return "OPERATIONAL";
  if (failureRate <= STATUS_THRESHOLDS.DEGRADEDPERFORMANCE)
    return "DEGRADEDPERFORMANCE";
  if (failureRate <= STATUS_THRESHOLDS.PARTIALOUTAGE) return "PARTIALOUTAGE";
  if (failureRate <= STATUS_THRESHOLDS.MAJOROUTAGE) return "MAJOROUTAGE";
  return "UNDERMAINTENANCE";
};
