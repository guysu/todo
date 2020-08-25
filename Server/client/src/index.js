import * as appCtrl from "./app.ctrl";
import "./style.scss";
import { getAllTodosFromServer } from "./server-api";

(async function init() {
    appCtrl.callNewTaskHandler();
    const todos = await getAllTodosFromServer();
    for (let i = 0; i < todos.length; i++) {
        const { id, title, checked } = todos[i];
        appCtrl.addTaskToDOM(id, title, checked);
    }
})();
