/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.ctrl.js":
/*!********************************!*\
  !*** ./client/src/app.ctrl.js ***!
  \********************************/
/*! exports provided: appDOMElems, callNewTaskHandler, addTaskToDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appDOMElems", function() { return appDOMElems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callNewTaskHandler", function() { return callNewTaskHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTaskToDOM", function() { return addTaskToDOM; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./client/src/utils.js");
/* harmony import */ var _task_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-actions */ "./client/src/task-actions.js");





const appDOMElems = {
    addTaskButtonClass: ".add-task-btn",
    addTaskInputClass: ".add-task-input",
    unfinishedTasksClass: ".unfinished-tasks",
    allFinishedTasksClass: ".finished-tasks",
};

function callNewTaskHandler() {
    _utils__WEBPACK_IMPORTED_MODULE_0__["addOnClickHandler"](appDOMElems.addTaskButtonClass, function () {
        const inputDOM = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(appDOMElems.addTaskInputClass);
        const textInput = inputDOM.value;
        if (textInput) {
            const taskID = _utils__WEBPACK_IMPORTED_MODULE_0__["generateGUID"]();
            addTaskToDOM(taskID, textInput, false);
            inputDOM.value = "";
            addNewTaskToLS(textInput, taskID);
        }
    });
}

function addNewTaskToLS(textInput, taskID) {
    const taskInfo = {
        title: textInput,
        checked: false,
    };
    localStorage.setItem(taskID, JSON.stringify(taskInfo));
}

function addTaskToDOM(taskID, textInput, checked) {
    let html = _task_actions__WEBPACK_IMPORTED_MODULE_1__["newTask"].replace(/%id%/g, taskID);
    html = html.replace("%title%", textInput);
    checked ? addFinishedTask(html, taskID) : addUnfinishedTask(html);
    _task_actions__WEBPACK_IMPORTED_MODULE_1__["addActionListeners"](taskID);
}

function addUnfinishedTask(html) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(appDOMElems.unfinishedTasksClass).insertAdjacentHTML("beforeend", html);
}

function addFinishedTask(html, id) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(appDOMElems.allFinishedTasksClass).insertAdjacentHTML("beforeend", html);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(_task_actions__WEBPACK_IMPORTED_MODULE_1__["actionDOMElems"].taskTitleId + id).classList.add(
        _task_actions__WEBPACK_IMPORTED_MODULE_1__["actionDOMElems"].finishedTaskClassStyle
    );
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(_task_actions__WEBPACK_IMPORTED_MODULE_1__["actionDOMElems"].taskStatusId + id).checked = true;
}


/***/ }),

/***/ "./client/src/index.js":
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.ctrl */ "./client/src/app.ctrl.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./client/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_1__);



(function init() {
    _app_ctrl__WEBPACK_IMPORTED_MODULE_0__["callNewTaskHandler"]();
    for (let i = 0; i < localStorage.length; i++) {
        const taskID = localStorage.key(i);
        const { title, checked } = JSON.parse(localStorage.getItem(taskID));
        _app_ctrl__WEBPACK_IMPORTED_MODULE_0__["addTaskToDOM"](taskID, title, checked);
    }
})();


/***/ }),

/***/ "./client/src/style.scss":
/*!*******************************!*\
  !*** ./client/src/style.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./client/src/style.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./client/src/task-actions.js":
/*!************************************!*\
  !*** ./client/src/task-actions.js ***!
  \************************************/
/*! exports provided: actionDOMElems, newTask, addActionListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionDOMElems", function() { return actionDOMElems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newTask", function() { return newTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addActionListeners", function() { return addActionListeners; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./client/src/utils.js");
/* harmony import */ var _app_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.ctrl */ "./client/src/app.ctrl.js");




const actionDOMElems = {
    editInputId: "#edit-input_",
    taskStatusId: "#task-status_",
    taskTitleId: "#task-title_",
    finishedTaskClassStyle: "finished-task",
    deleteBtn: "#delete_",
    editBtn: "#edit-btn_",
    saveBtn: "#save_",
};

const editHtml =
    '<div class="edit-task" id="edit-task_%id%"> <input type="text" class="edit-input" id="edit-input_%id%"/>\
<button class="save-btn" id="save_%id%">Save Changes</button></div>';

const newTask =
    '<div class="single-task" id="task_%id%"><input type="checkbox" class="checkbox" id="task-status_%id%"/> <span class="task-title" \
                id="task-title_%id%">%title%</span> \
                <button class="edit-btn" id="edit-btn_%id%">Edit</button> <button class="delete-btn" id="delete_%id%">Delete</button></div>';

function handleDelete(event) {
    const parentID = event.target.parentNode.id;
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])("#" + parentID).remove();
    const taskID = extractID(event);
    localStorage.removeItem(taskID);
}

function handleCheck(event) {
    const eventID = event.target.id;
    const taskTitleID = extractID(event);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])("#" + eventID).checked
        ? appendToFinished(event)
        : appendToUnfinished(event);
    getTask(taskTitleID).classList.toggle(
        actionDOMElems.finishedTaskClassStyle
    );
    checkTaskInLS(taskTitleID);
}

function checkTaskInLS(taskTitleID) {
    let taskInfo = JSON.parse(localStorage.getItem(taskTitleID));
    taskInfo.checked = !taskInfo.checked;
    localStorage.setItem(taskTitleID, JSON.stringify(taskInfo));
}

function appendToUnfinished(event) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(_app_ctrl__WEBPACK_IMPORTED_MODULE_1__["appDOMElems"].unfinishedTasksClass).appendChild(event.target.parentNode);
}

function appendToFinished(event) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(_app_ctrl__WEBPACK_IMPORTED_MODULE_1__["appDOMElems"].allFinishedTasksClass).prepend(event.target.parentNode);
}

function handleEdit(event) {
    const taskID = extractID(event);
    const editElementHtml = editHtml.replace(/%id%/g, taskID);
    const newElement = createHTMLElement(editElementHtml);
    const existingTitle = getTask(taskID).textContent;
    replaceTaskElement(event, newElement);
    const saveBtnID = actionDOMElems.saveBtn + taskID;
    _utils__WEBPACK_IMPORTED_MODULE_0__["addOnClickHandler"](saveBtnID, handleSave);
    let inputField = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(actionDOMElems.editInputId + taskID);
    inputField.value = existingTitle;
    inputField.focus();
}

function extractID(event) {
    return event.target.id.split("_")[1];
}

function replaceTaskElement(event, newElement) {
    const oldElement = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])("#" + event.target.parentNode.id);
    const parentClass = event.target.parentNode.parentNode.classList[0];
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])("." + parentClass).replaceChild(newElement, oldElement);
}

function createHTMLElement(htmlString) {
    var div = document.createElement("DIV");
    div.innerHTML = htmlString;
    return div.firstChild;
}

function handleSave(event) {
    const taskID = extractID(event);
    let html = newTask.replace(/%id%/g, taskID);
    const taskStatus = event.target.parentNode.parentNode.classList[0];
    const newTitle = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(actionDOMElems.editInputId + taskID).value;
    html = html.replace("%title%", newTitle);
    const editedTaskElement = createHTMLElement(html);
    replaceTaskElement(event, editedTaskElement);
    if (taskStatus.startsWith("finished")) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(actionDOMElems.taskStatusId + taskID).checked = true;
        getTask(taskID).classList.add(actionDOMElems.finishedTaskClassStyle);
    }
    addActionListeners(taskID);
    editTaskInLS(taskID, newTitle);
}

function addActionListeners(id) {
    const deleteBtnID = actionDOMElems.deleteBtn + id;
    _utils__WEBPACK_IMPORTED_MODULE_0__["addOnClickHandler"](deleteBtnID, handleDelete);
    const taskCheckboxID = actionDOMElems.taskStatusId + id;
    _utils__WEBPACK_IMPORTED_MODULE_0__["addOnClickHandler"](taskCheckboxID, handleCheck);
    const editBtnID = actionDOMElems.editBtn + id;
    _utils__WEBPACK_IMPORTED_MODULE_0__["addOnClickHandler"](editBtnID, handleEdit);
}

function editTaskInLS(taskID, newTitle) {
    let taskInfo = JSON.parse(localStorage.getItem(taskID));
    taskInfo.title = newTitle;
    localStorage.setItem(taskID, JSON.stringify(taskInfo));
}

function getTask(taskID) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$"])(actionDOMElems.taskTitleId + taskID);
}


/***/ }),

/***/ "./client/src/utils.js":
/*!*****************************!*\
  !*** ./client/src/utils.js ***!
  \*****************************/
/*! exports provided: $, generateGUID, addOnClickHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateGUID", function() { return generateGUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOnClickHandler", function() { return addOnClickHandler; });
const $ = document.querySelector.bind(document);

function generateGUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

function addOnClickHandler(DOMelement, func) {
    $(DOMelement).addEventListener("click", func);
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./client/src/style.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/dist/cjs.js!./client/src/style.scss ***!
  \**********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body {\n  font-family: \"Open Sans\";\n  font-weight: 300;\n  font-size: x-large;\n  background-color: #e0f0f1;\n  width: 80%;\n  margin: auto;\n}\nbody button {\n  font-family: \"Open Sans\";\n}\nbody h1 {\n  text-align: center;\n  margin-top: 90px;\n  margin-bottom: 55px;\n}\nbody .add-task {\n  width: 80%;\n  margin: auto;\n  overflow: hidden;\n  margin-bottom: 40px;\n}\nbody .add-task-input {\n  font-size: inherit;\n  margin-right: 30px;\n  margin-bottom: 10px;\n  padding: 10px;\n  width: 80%;\n}\nbody .edit-input {\n  font-size: inherit;\n  margin-left: 27px;\n  margin-right: 40px;\n  padding: 8px 10px;\n  width: 40%;\n}\nbody .edit-btn,\nbody .delete-btn,\nbody .save-btn {\n  font-size: large;\n  margin: 3px;\n  padding: 5px 15px;\n  background-color: #f2f2f9;\n  border-radius: 10px;\n  border: solid;\n  cursor: pointer;\n  border-color: #96a4bb;\n  outline: none;\n  color: #354458;\n  font-weight: 550;\n}\nbody .add-task-btn {\n  padding: 7px 24px;\n  font-size: large;\n  font-weight: 600;\n}\nbody .single-task {\n  display: flex;\n}\nbody .task-title {\n  flex: 1;\n  margin: 5px 15px;\n}\nbody .checkbox {\n  margin: auto;\n  transform: scale(1.3);\n}\nbody .finished-task {\n  text-decoration-line: line-through;\n}", "",{"version":3,"sources":["style.scss"],"names":[],"mappings":"AAWA;EACI,wBAHG;EAIH,gBAAA;EACA,kBAAA;EACA,yBAAA;EACA,UAAA;EACA,YAAA;AATJ;AAWI;EACI,wBAXD;AAEP;AAYI;EACI,kBAAA;EACA,gBAAA;EACA,mBAAA;AAVR;AAaI;EACI,UAAA;EACA,YAAA;EACA,gBAAA;EACA,mBAAA;AAXR;AAcI;EACI,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,aAAA;EACA,UAAA;AAZR;AAeI;EACI,kBAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;EACA,UAAA;AAbR;AAgBI;;;EAGI,gBAAA;EACA,WAAA;EACA,iBAAA;EACA,yBAAA;EACA,mBAAA;EACA,aAAA;EACA,eAAA;EACA,qBAAA;EACA,aAAA;EACA,cAAA;EACA,gBAAA;AAdR;AAiBI;EACI,iBAAA;EACA,gBAAA;EACA,gBAAA;AAfR;AAkBI;EACI,aAAA;AAhBR;AAmBI;EACI,OAAA;EACA,gBAAA;AAjBR;AAoBI;EACI,YAAA;EACA,qBAAA;AAlBR;AAqBI;EACI,kCAAA;AAnBR","file":"style.scss","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap\");\n\n$colors: (\n    primary-background: #e0f0f1,\n    btn-background: #f2f2f9,\n    btn-border: #96a4bb,\n    btn-font-color: #354458,\n);\n\n$font: \"Open Sans\";\n\nbody {\n    font-family: $font;\n    font-weight: 300;\n    font-size: x-large;\n    background-color: map-get($map: $colors, $key: primary-background);\n    width: 80%;\n    margin: auto;\n\n    button {\n        font-family: $font;\n    }\n\n    h1 {\n        text-align: center;\n        margin-top: 90px;\n        margin-bottom: 55px;\n    }\n\n    .add-task {\n        width: 80%;\n        margin: auto;\n        overflow: hidden;\n        margin-bottom: 40px;\n    }\n\n    .add-task-input {\n        font-size: inherit;\n        margin-right: 30px;\n        margin-bottom: 10px;\n        padding: 10px;\n        width: 80%;\n    }\n\n    .edit-input {\n        font-size: inherit;\n        margin-left: 27px;\n        margin-right: 40px;\n        padding: 8px 10px;\n        width: 40%;\n    }\n\n    .edit-btn,\n    .delete-btn,\n    .save-btn {\n        font-size: large;\n        margin: 3px;\n        padding: 5px 15px;\n        background-color: map-get($map: $colors, $key: btn-background);\n        border-radius: 10px;\n        border: solid;\n        cursor: pointer;\n        border-color: map-get($map: $colors, $key: btn-border);\n        outline: none;\n        color: map-get($map: $colors, $key: btn-font-color);\n        font-weight: 550;\n    }\n\n    .add-task-btn {\n        padding: 7px 24px;\n        font-size: large;\n        font-weight: 600;\n    }\n\n    .single-task {\n        display: flex;\n    }\n\n    .task-title {\n        flex: 1;\n        margin: 5px 15px;\n    }\n\n    .checkbox {\n        margin: auto;\n        transform: scale(1.3);\n    }\n\n    .finished-task {\n        text-decoration-line: line-through;\n    }\n}\n"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map