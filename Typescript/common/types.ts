import { Request } from "express"
export interface userAuthRequest extends Request {
  userId: string
}

export type Todo = { id: string; title: string; checked: boolean };
export type NewTodo = {title: string, checked: boolean};
