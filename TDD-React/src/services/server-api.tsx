import axios from "axios";
import { Todo } from "../../../common/types";

export const getTodos = async (): Promise<Todo[]> => {
    try {
        const getTodos = await axios.get("/todos");
        return getTodos.data;
    } catch (e) {
        throw e;
    }
};

export const addTask = async (title: string): Promise<Todo> => {
    return (await axios.post("/todos", { title, checked: false })).data;
};

export const deleteTask = async (id: string) => {
    return await axios.delete(`/todos/${id}`);
};

export const checkTask = async (id: string, newVal: boolean) => {
    return await axios.put(`/todos/${id}`, { checked: newVal });
};

export const editTask = async (id: string, newVal: string) => {
    return await axios.put(`/todos/${id}`, { title: newVal });
};
