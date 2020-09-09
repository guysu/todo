import "./style.scss";
import { $ } from "./utils";
import * as appCtrl from "./app.ctrl";
import { getAllTodosFromServer } from "./server-api";
import { Todo } from "../../../common/types";

window.onload = () => {
    $("body")!.style.display = "block";
};

(async function () {
    try {
        appCtrl.callNewTaskHandler();
        const todos: Todo[] = await getAllTodosFromServer();
        for (let todo of todos) {
            const { id, title, checked } = todo;
            appCtrl.addTaskToDOM(id, title, checked);
        }
    } catch {
        alert("Could not retrieve data from server, please try again");
    }
})();
