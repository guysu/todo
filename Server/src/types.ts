import {Todo} from '../../common/types';

export type DbAPI = {
	setTask: (userID: string, taskToSet: Todo) => void,

	getAllUserTodos: (userID: string) => Promise<Todo[]>;

	getSingleTodo: (userID: string, taskID: string) => Promise<Todo>,

	deleteSingleTodo: (userID: string, taskID: string) =>  void,
}

export type AppConfig = {
    dbApi: DbAPI;
};