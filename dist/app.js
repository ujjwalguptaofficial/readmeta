#!/usr/bin/env node
/*!
 * @license :getmeta - V1.0.0 - 26/08/2020
 * https://github.com/ujjwalguptaofficial/getmeta
 * Copyright (c) 2020 @Ujjwal Gupta; Licensed MIT
 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fetch_meta.ts":
/*!***************************!*\
  !*** ./src/fetch_meta.ts ***!
  \***************************/
/*! exports provided: fetchMeta */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMeta", function() { return fetchMeta; });
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! puppeteer */ "puppeteer");
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cli_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cli-spinner */ "cli-spinner");
/* harmony import */ var cli_spinner__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cli_spinner__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var PendingXHR = __webpack_require__(/*! pending-xhr-puppeteer */ "pending-xhr-puppeteer").PendingXHR;

var fetchMeta = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var spinner, prefix, browser, page, pendingXHR, result, key, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner = new cli_spinner__WEBPACK_IMPORTED_MODULE_1__["Spinner"]("Fetching.. %s");
                // spinner. spinnerInstance = new Spinner(`${text}.. %s`);
                spinner.setSpinnerString(18);
                spinner.start();
                prefix = 'http://';
                if (url.indexOf("http") < 0) {
                    url = prefix + url;
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, puppeteer__WEBPACK_IMPORTED_MODULE_0___default.a.launch({
                    // headless: false
                    })];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 3:
                page = _a.sent();
                pendingXHR = new PendingXHR(page);
                return [4 /*yield*/, page.goto(url)];
            case 4:
                _a.sent();
                // await page.waitForNavigation({ waitUntil: "networkidle0" });
                return [4 /*yield*/, pendingXHR.waitForAllXhrFinished()];
            case 5:
                // await page.waitForNavigation({ waitUntil: "networkidle0" });
                _a.sent();
                return [4 /*yield*/, new Promise(function (res) {
                        setTimeout(res, 2000);
                    })];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var head = document.head;
                        var description = head.querySelector('meta[name=description]');
                        var ogImage = head.querySelector('meta[property="og:image"]');
                        var ogImageWidth = head.querySelector('meta[property="og:image:width"]');
                        var ogImageHeight = head.querySelector('meta[property="og:image:height"]');
                        var ogTitle = head.querySelector('meta[property="og:title"]');
                        var ogDescription = head.querySelector('meta[property="og:description"]');
                        var ogType = head.querySelector('meta[property="og:type"]');
                        var twitterSite = head.querySelector('meta[name="twitter:site"]');
                        var twitterTitle = head.querySelector('meta[name="twitter:title"]');
                        var twitterDescription = head.querySelector('meta[name="twitter:description"]');
                        var twitterImage = head.querySelector('meta[name="twitter:image"]');
                        var twitterCard = head.querySelector('meta[name="twitter:card"]');
                        return {
                            title: head.getElementsByTagName('title')[0].innerText,
                            descripton: description ? description.content : null,
                            ogTitle: ogTitle ? ogTitle.content : null,
                            ogDescription: ogDescription ? ogDescription.content : null,
                            ogImage: ogImage ? ogImage.content : null,
                            ogImageWidth: ogImageWidth ? ogImageWidth.content : null,
                            ogImageHeight: ogImageHeight ? ogImageHeight.content : null,
                            ogType: ogType ? ogType.content : null,
                            twitterSite: twitterSite ? twitterSite.content : null,
                            twitterTitle: twitterTitle ? twitterTitle.content : null,
                            twitterDescription: twitterDescription ? twitterDescription.content : null,
                            twitterImage: twitterImage ? twitterImage.content : null,
                            twitterCard: twitterCard ? twitterCard.content : null,
                        };
                    })];
            case 7:
                result = _a.sent();
                spinner.stop();
                console.log("\n    \n    ");
                for (key in result) {
                    if (result[key]) {
                        console.log(key + " : \"" + result[key] + "\"");
                        console.log("");
                    }
                }
                return [4 /*yield*/, browser.close()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                spinner.stop();
                console.error("some error occured");
                console.error("Error message is", error_1.message);
                console.info("please contact author of this Project");
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_meta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch_meta */ "./src/fetch_meta.ts");

var Command = __webpack_require__(/*! commander */ "commander").Command;
var program = new Command();
program
    .option('-url, --url <value>', 'absolute url of website');
program.parse(process.argv);
if (program.url) {
    Object(_fetch_meta__WEBPACK_IMPORTED_MODULE_0__["fetchMeta"])(program.url);
}


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/warrior/projects/opensource/getmeta/src/index.ts */"./src/index.ts");


/***/ }),

/***/ "cli-spinner":
/*!******************************!*\
  !*** external "cli-spinner" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cli-spinner");

/***/ }),

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),

/***/ "pending-xhr-puppeteer":
/*!****************************************!*\
  !*** external "pending-xhr-puppeteer" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pending-xhr-puppeteer");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map