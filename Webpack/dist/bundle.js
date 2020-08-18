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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n___CSS_LOADER_EXPORT___.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"body {\\n    font-family: \\\"Open Sans\\\";\\n    font-weight: 300;\\n    font-size: x-large;\\n    background-color: #e0f0f1;\\n    width: 80%;\\n    margin: auto;\\n}\\n\\nbutton {\\n    margin: auto;\\n    font-size: inherit;\\n    font-family: \\\"Open Sans\\\";\\n}\\n\\nh1 {\\n    text-align: center;\\n    margin-top: 90px;\\n    margin-bottom: 55px;\\n}\\n\\n.add-task {\\n    width: 80%;\\n    margin: auto;\\n    overflow: hidden;\\n    margin-bottom: 40px;\\n}\\n\\n.add-task-input {\\n    font-size: inherit;\\n    margin-right: 30px;\\n    margin-bottom: 10px;\\n    padding: 10px;\\n    width: 80%;\\n}\\n\\n.edit-input {\\n    font-size: inherit;\\n    margin-left: 27px;\\n    margin-right: 40px;\\n    padding: 8px 10px;\\n    width: 40%;\\n}\\n\\n.edit-btn,\\n.delete-btn,\\n.save-btn {\\n    font-size: large;\\n    margin: 3px;\\n    padding: 5px 15px;\\n    background-color: #f2f2f9;\\n    border-radius: 10px;\\n    border: solid;\\n    cursor: pointer;\\n    border-color: #96a4bb;\\n    outline: none;\\n    color: #354458;\\n    font-weight: 550;\\n}\\n\\n.add-task-btn {\\n    padding: 7px 24px;\\n    font-size: large;\\n    font-weight: 600;\\n}\\n\\n.single-task {\\n    display: flex;\\n}\\n\\n.task-title {\\n    flex: 1;\\n    margin: 5px 15px;\\n}\\n\\n.checkbox {\\n    margin: auto;\\n    transform: scale(1.3);\\n}\\n\\n.finished-task {\\n    text-decoration-line: line-through;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: $, DOMhtml, DOMElems, addOnClickHandler, addActionListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$\", function() { return $; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMhtml\", function() { return DOMhtml; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMElems\", function() { return DOMElems; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addOnClickHandler\", function() { return addOnClickHandler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addActionListeners\", function() { return addActionListeners; });\n/* harmony import */ var _task_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task-actions */ \"./src/task-actions.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst $ = document.querySelector.bind(document);\n\nconst DOMhtml = {\n    newTask:\n        '<div class=\"single-task\" id=\"task_%id%\"><input type=\"checkbox\" class=\"checkbox\" id=\"task-status_%id%\"/> <span class=\"task-title\" \\\n                id=\"task-title_%id%\">%title%</span> \\\n                <button class=\"edit-btn\" id=\"edit-btn_%id%\">Edit</button> <button class=\"delete-btn\" id=\"delete_%id%\">Delete</button></div>',\n    editElement:\n        '<div class=\"edit-task\" id=\"edit-task_%id%\"> <input type=\"text\" class=\"edit-input\" id=\"edit-input_%id%\"/>\\\n                <button class=\"save-btn\" id=\"save_%id%\">Save Changes</button></div>',\n};\n\nconst DOMElems = {\n    addTaskButtonClass: \".add-task-btn\",\n    addTaskInputClass: \".add-task-input\",\n    unfinishedTasksClass: \".unfinished-tasks\",\n    tasksContainerClass: \".tasks-container\",\n    editInputId: \"#edit-input_\",\n    taskStatusId: \"#task-status_\",\n    taskTitleId: \"#task-title_\",\n    finishedTaskClass: \"finished-task\",\n    allFinishedTasksClass: \".finished-tasks\",\n    deleteBtn: \"#delete_\",\n    editBtn: \"#edit-btn_\",\n    saveBtn: \"#save_\",\n};\n\nfunction addOnClickHandler(DOMelement, func) {\n    $(DOMelement).addEventListener(\"click\", func);\n}\n\naddOnClickHandler(DOMElems.addTaskButtonClass, function () {\n    const inputDOM = $(DOMElems.addTaskInputClass);\n    const textInput = inputDOM.value;\n    if (textInput) {\n        const taskID = _utils__WEBPACK_IMPORTED_MODULE_1__[\"generateGUID\"]();\n        addTaskToDOM(taskID, textInput, false);\n        inputDOM.value = \"\";\n        addNewTaskToLS(textInput, taskID);\n    }\n});\n\nfunction addTaskToDOM(taskID, textInput, checked) {\n    let html = DOMhtml.newTask.replace(/%id%/g, taskID);\n    html = html.replace(\"%title%\", textInput);\n    checked ? addFinishedTask(html, taskID) : addUnfinishedTask(html);\n    addActionListeners(taskID);\n}\n\nfunction addUnfinishedTask(html) {\n    $(DOMElems.unfinishedTasksClass).insertAdjacentHTML(\"beforeend\", html);\n}\n\nfunction addFinishedTask(html, id) {\n    $(DOMElems.allFinishedTasksClass).insertAdjacentHTML(\"beforeend\", html);\n    $(DOMElems.taskTitleId + id).classList.add(DOMElems.finishedTaskClass);\n    $(DOMElems.taskStatusId + id).checked = true;\n}\n\nfunction addNewTaskToLS(textInput, taskID) {\n    const taskInfo = {\n        title: textInput,\n        checked: false,\n    };\n    localStorage.setItem(taskID, JSON.stringify(taskInfo));\n}\n\nfunction addActionListeners(id) {\n    const deleteBtnID = DOMElems.deleteBtn + id;\n    addOnClickHandler(deleteBtnID, _task_actions__WEBPACK_IMPORTED_MODULE_0__[\"handleDelete\"]);\n    const taskCheckboxID = DOMElems.taskStatusId + id;\n    addOnClickHandler(taskCheckboxID, _task_actions__WEBPACK_IMPORTED_MODULE_0__[\"handleCheck\"]);\n    const editBtnID = DOMElems.editBtn + id;\n    addOnClickHandler(editBtnID, _task_actions__WEBPACK_IMPORTED_MODULE_0__[\"handleEdit\"]);\n}\n\n(function init() {\n    for (let i = 0; i < localStorage.length; i++) {\n        const taskID = localStorage.key(i);\n        const { title, checked } = JSON.parse(localStorage.getItem(taskID));\n        addTaskToDOM(taskID, title, checked);\n    }\n})();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/style.css?");

/***/ }),

/***/ "./src/task-actions.js":
/*!*****************************!*\
  !*** ./src/task-actions.js ***!
  \*****************************/
/*! exports provided: handleDelete, handleCheck, handleEdit, handleSave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleDelete\", function() { return handleDelete; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleCheck\", function() { return handleCheck; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleEdit\", function() { return handleEdit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleSave\", function() { return handleSave; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nfunction handleDelete(event) {\n    const parentID = event.target.parentNode.id;\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](\"#\" + parentID).remove();\n    const taskID = extractID(event);\n    localStorage.removeItem(taskID);\n}\n\nfunction handleCheck(event) {\n    const eventID = event.target.id;\n    const taskTitleID = extractID(event);\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](\"#\" + eventID).checked\n        ? appendToFinished(event)\n        : appendToUnfinished(event);\n    getTask(taskTitleID).classList.toggle(_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].finishedTaskClass);\n    checkTaskInLS(taskTitleID);\n}\n\nfunction checkTaskInLS(taskTitleID) {\n    let taskInfo = JSON.parse(localStorage.getItem(taskTitleID));\n    taskInfo.checked = !taskInfo.checked;\n    localStorage.setItem(taskTitleID, JSON.stringify(taskInfo));\n}\n\nfunction appendToUnfinished(event) {\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].unfinishedTasksClass)\n        .appendChild(event.target.parentNode);\n}\n\nfunction appendToFinished(event) {\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].allFinishedTasksClass)\n        .appendChild(event.target.parentNode);\n}\n\nfunction handleEdit(event) {\n    const taskID = extractID(event);\n    const editElementHtml = _index__WEBPACK_IMPORTED_MODULE_0__[\"DOMhtml\"].editElement.replace(/%id%/g, taskID);\n    const newElement = createHTMLElement(editElementHtml);\n    const existingTitle = getTask(taskID).textContent;\n    replaceTaskElement(event, newElement);\n    const saveBtnID = _index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].saveBtn + taskID;\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"addOnClickHandler\"](saveBtnID, handleSave);\n    let inputField = _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].editInputId + taskID);\n    inputField.value = existingTitle;\n    inputField.focus();\n}\n\nfunction extractID(event) {\n    return event.target.id.split(\"_\")[1];\n}\n\nfunction replaceTaskElement(event, newElement) {\n    const oldElement = _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](\"#\" + event.target.parentNode.id);\n    const parentClass = event.target.parentNode.parentNode.classList[0];\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](\".\" + parentClass).replaceChild(newElement, oldElement);\n}\n\nfunction createHTMLElement(htmlString) {\n    var div = document.createElement(\"DIV\");\n    div.innerHTML = htmlString;\n    return div.firstChild;\n}\n\nfunction handleSave(event) {\n    const taskID = extractID(event);\n    let html = _index__WEBPACK_IMPORTED_MODULE_0__[\"DOMhtml\"].newTask.replace(/%id%/g, taskID);\n    const taskStatus = event.target.parentNode.parentNode.classList[0];\n    const newTitle = _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].editInputId + taskID).value;\n    html = html.replace(\"%title%\", newTitle);\n    const editedTaskElement = createHTMLElement(html);\n    replaceTaskElement(event, editedTaskElement);\n    if (taskStatus.startsWith(\"finished\")) {\n        _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].taskStatusId + taskID).checked = true;\n        getTask(taskID).classList.add(_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].finishedTaskClass);\n    }\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"addActionListeners\"](taskID);\n    editTaskInLS(taskID, newTitle);\n}\n\nfunction editTaskInLS(taskID, newTitle) {\n    let taskInfo = JSON.parse(localStorage.getItem(taskID));\n    taskInfo.title = newTitle;\n    localStorage.setItem(taskID, JSON.stringify(taskInfo));\n}\n\nfunction getTask(taskID) {\n    return _index__WEBPACK_IMPORTED_MODULE_0__[\"$\"](_index__WEBPACK_IMPORTED_MODULE_0__[\"DOMElems\"].taskTitleId + taskID);\n}\n\n\n//# sourceURL=webpack:///./src/task-actions.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: generateGUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateGUID\", function() { return generateGUID; });\nfunction generateGUID() {\n    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>\n        (\n            c ^\n            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))\n        ).toString(16)\n    );\n}\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });