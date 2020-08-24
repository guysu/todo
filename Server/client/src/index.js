import * as appCtrl from "./app.ctrl";
import "./style.scss";
import { serverAddress } from "./utils";

(async function init() {
    appCtrl.callNewTaskHandler();
    const todos = await (await fetch(serverAddress)).json();

    for (let i = 0; i < todos.length; i++) {
        const { id, title, checked } = todos[i];
        appCtrl.addTaskToDOM(id, title, checked);
    }
})();
