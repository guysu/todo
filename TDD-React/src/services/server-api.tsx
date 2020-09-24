import axios from "axios";
import { Todo } from "../../../common/types";

export const getTodos = async (): Promise<Todo[]> => {
    try {
        const getTodos = await axios.get("/todos");
        return getTodos.data;
    } catch (e) {
        throw(e);
    }
};
