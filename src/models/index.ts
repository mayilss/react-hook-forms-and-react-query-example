export interface ITodo {
  id: string;
  title: string;
  description: string;
  statusId: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface IError {
  status: number;
  message: string;
}
