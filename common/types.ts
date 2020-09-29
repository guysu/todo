export type Todo = { id: string; title: string; checked: boolean };
export type NewTodo = { title: string; checked: boolean };

export type ReturnTypeAsync<T extends (...args: any) => any> = T extends (
    ...args: any
) => Promise<infer R>
    ? R
    : any;
