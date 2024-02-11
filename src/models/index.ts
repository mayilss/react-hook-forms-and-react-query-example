import { Status } from "../config/enums";

export interface Todo {
  id: number;
  title: string;
  description: string;
  statusId: Status;
}
