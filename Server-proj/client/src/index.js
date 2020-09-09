import * as appCtrl from "./app.ctrl";
import "./style.scss";
import { getAllTodosFromServer } from "./server-api";
import { $ } from "./utils";

window.onload = () => {
    $("body").style.display = "block";
};

(async function init() {
    try {
        appCtrl.callNewTaskHandler();
        const todos = await getAllTodosFromServer();
        for (let i = 0; i < todos.length; i++) {
            const { id, title, checked } = todos[i];
            appCtrl.addTaskToDOM(id, title, checked);
        }
    } catch {
        alert("Could not retrieve data from server, please try again");
    }
})();
