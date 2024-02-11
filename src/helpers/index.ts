function getStatusColor(statusId: number) {
  switch (statusId) {
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "success";
    default:
      return "info";
  }
}

export default { getStatusColor };
