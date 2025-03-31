export interface Todo {
  id?: number;
  todo: string;
  completed: boolean;
  userId: number;
  isDeleted?: boolean;
  deletedOn?: string;
}

export interface TodoList {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export type User = {
  id: string;
  email: string;
} | null;

export interface Message {
  message: string;
  receiverId: string;
  senderid: string;
}
