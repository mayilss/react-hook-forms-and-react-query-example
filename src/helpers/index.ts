import { DefaultOptionType } from "antd/es/select";
import { IError, IStatus } from "../models";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

function getStatusColor(statusId: string) {
  switch (statusId) {
    case "1":
      return "info";
    case "2":
      return "warning";
    case "3":
      return "success";
    default:
      return "info";
  }
}

function getStatusOptions(statuses: IStatus[] | undefined) {
  let options: DefaultOptionType[] = [];
  if (statuses) {
    options = statuses.map((status) => ({
      label: status.name,
      value: String(status.id),
    }));
  }
  return options;
}

function onErrorResponse(error: AxiosError<IError>) {
  toast.error(error.response?.data.message);
}

export default { getStatusColor, getStatusOptions, onErrorResponse };
