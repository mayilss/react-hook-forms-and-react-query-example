export interface ITodo {
  title: string;
  statusId: string;
  id?: string;
  description?: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface IError {
  status: number;
  message: string;
}
