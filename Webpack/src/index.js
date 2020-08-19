import * as appCtrl from "./app.ctrl";
import "./style.css";

(function init() {
    appCtrl.callNewTaskHandler();
    for (let i = 0; i < localStorage.length; i++) {
        const taskID = localStorage.key(i);
        const { title, checked } = JSON.parse(localStorage.getItem(taskID));
        appCtrl.addTaskToDOM(taskID, title, checked);
    }
})();
