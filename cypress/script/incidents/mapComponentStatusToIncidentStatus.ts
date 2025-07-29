export const mapComponentStatusToIncidentStatus = (componentStatus: string) => {
  switch (componentStatus) {
    case 'DEGRADED':
    case 'PARTIALOUTAGE':
      return 'identified';
    case 'MAJOROUTAGE':
      return 'investigating';
    case 'OPERATIONAL':
      return 'resolved';
    default:
      return 'investigating';
  }
};
