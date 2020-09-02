#!/usr/bin/env node
/*!
 * @license :readmeta - V1.0.2 - 02/09/2020
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

/***/ "./src/change_img.ts":
/*!***************************!*\
  !*** ./src/change_img.ts ***!
  \***************************/
/*! exports provided: changeImageSize, crop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeImageSize", function() { return changeImageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crop", function() { return crop; });
// import { getImgExtensionFromUrl } from "./get_extension_from_url";
const changeImageSize = async function (dataUrl, width, height, quality = 1 // e.g. 0.9 = 90% quality
) {
    const getImgExtensionFromUrl = (url) => {
        const extension = ["jpg", "jpeg", "png", "svg", "webp"];
        return extension.find(q => url.includes(q));
    };
    function getImage(dataUrl) {
        return new Promise((resolve, reject) => {
            // add current data for caching issue
            // if (dataUrl.includes('http')) {
            //     dataUrl = addParameterToURL(dataUrl, 'cors', Date.now());
            // }
            const image = new Image();
            image.src = dataUrl;
            image.crossOrigin = "true";
            image.onload = () => {
                resolve(image);
            };
            // image.onerror = (el: any, err: ErrorEvent) => {
            //     reject(err.error);
            // };
        });
    }
    // Create a temporary image so that we can compute the height of the image.
    const image = await getImage(dataUrl);
    const imageType = `image/${getImgExtensionFromUrl(dataUrl)}`;
    // Create a temporary canvas to draw the downscaled image on.
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    // Draw the downscaled image on the canvas and return the new data URL.
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    const newDataUrl = canvas.toDataURL(imageType, quality);
    return newDataUrl;
};
const crop = function (url, aspectRatio) {
    // we return a Promise that gets resolved with our canvas element
    return new Promise(resolve => {
        // this image will hold our source image data
        const inputImage = new Image();
        inputImage.crossOrigin = "true";
        // we want to wait for our image to load
        inputImage.onload = () => {
            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;
            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;
            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            }
            else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputWidth / aspectRatio;
            }
            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * .5;
            const outputY = (outputHeight - inputHeight) * .5;
            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');
            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;
            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d');
            ctx.drawImage(inputImage, outputX, outputY);
            document.body.appendChild(outputImage);
            // resolve(outputImage);
            resolve(outputImage.toDataURL("image/png"));
        };
        // start loading our image
        inputImage.src = url;
    });
};


/***/ }),

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
/* harmony import */ var _print_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./print_tag */ "./src/print_tag.ts");
/* harmony import */ var _change_img__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./change_img */ "./src/change_img.ts");

const { PendingXHR } = __webpack_require__(/*! pending-xhr-puppeteer */ "pending-xhr-puppeteer");



const fetchMeta = async (url, shouldPreview) => {
    const spinner = new cli_spinner__WEBPACK_IMPORTED_MODULE_1__["Spinner"](`Fetching.. %s`);
    // spinner. spinnerInstance = new Spinner(`${text}.. %s`);
    spinner.setSpinnerString(18);
    spinner.start();
    var prefix = 'http://';
    if (url.indexOf("http") < 0) {
        url = prefix + url;
    }
    try {
        const browser = await puppeteer__WEBPACK_IMPORTED_MODULE_0___default.a.launch({
            headless: !shouldPreview,
            devtools: true,
            args: ['--disable-infobars']
        });
        let page = await browser.newPage();
        const pendingXHR = new PendingXHR(page);
        await page.goto(url);
        // await page.waitForNavigation({ waitUntil: "networkidle0" });
        await pendingXHR.waitForAllXhrFinished();
        await new Promise((res) => {
            setTimeout(res, 2000);
        });
        const result = await page.evaluate(() => {
            const head = document.head;
            const title = document.querySelector("title");
            const description = head.querySelector('meta[name=description]');
            const keywords = head.querySelector('meta[property=keywords]');
            const ogTitle = head.querySelector('meta[property="og:title"]');
            const ogDescription = head.querySelector('meta[property="og:description"]');
            const ogSiteName = head.querySelector('meta[property="og:site_name"]');
            const ogImage = head.querySelector('meta[property="og:image"]');
            const ogImageWidth = head.querySelector('meta[property="og:image:width"]');
            const ogImageHeight = head.querySelector('meta[property="og:image:height"]');
            const ogType = head.querySelector('meta[property="og:type"]');
            const ogUrl = head.querySelector('meta[property="og:url"]');
            const fbAppId = head.querySelector('meta[property="fb:app_id"]');
            const twitterSite = head.querySelector('meta[name="twitter:site"]');
            const twitterTitle = head.querySelector('meta[name="twitter:title"]');
            const twitterDescription = head.querySelector('meta[name="twitter:description"]');
            const twitterImage = head.querySelector('meta[name="twitter:image"]');
            const twitterCard = head.querySelector('meta[name="twitter:card"]');
            const twitterImageAlt = head.querySelector('meta[name="twitter:image:alt"]');
            return {
                general: {
                    title: title ? title.innerText : null,
                    descripton: description ? description.content : null,
                    keywords: keywords ? keywords.content : null,
                },
                facebook: {
                    "og:title": ogTitle ? ogTitle.content : null,
                    "og:description": ogDescription ? ogDescription.content : null,
                    "og:site_name": ogSiteName ? ogSiteName.content : null,
                    "og:image": ogImage ? ogImage.content : null,
                    "og:image:width": ogImageWidth ? ogImageWidth.content : null,
                    "og:image:height": ogImageHeight ? ogImageHeight.content : null,
                    "og:type": ogType ? ogType.content : null,
                    "og:url": ogUrl ? ogUrl.content : null,
                    "fb:app_id": fbAppId ? fbAppId.content : null,
                },
                twitter: {
                    "twitter:site": twitterSite ? twitterSite.content : null,
                    "twitter:title": twitterTitle ? twitterTitle.content : null,
                    "twitter:description": twitterDescription ? twitterDescription.content : null,
                    "twitter:image": twitterImage ? twitterImage.content : null,
                    "twitter:card": twitterCard ? twitterCard.content : null,
                    "twitter:image:alt": twitterImageAlt ? twitterImageAlt.content : null,
                }
            };
        });
        spinner.stop();
        console.log(`
    
        `);
        const location = await page.evaluate(() => {
            return window.location;
        });
        await page.close();
        if (shouldPreview) {
            page = (await browser.pages())[0];
            // await page.exposeFunction("changeImageSize", changeImageSize);
            await page.evaluate(async ({ og, changeImageSize, crop, location }) => {
                eval("changeImageSize = " + changeImageSize);
                eval("crop = " + crop);
                let imgUrl = og["og:image"];
                if (imgUrl) {
                    if (imgUrl.indexOf("http") < 0) {
                        imgUrl = location.origin + imgUrl;
                    }
                }
                const croppedImg = await crop(imgUrl, 1);
                const img = await changeImageSize(croppedImg, 78, 78);
                document.body.innerHTML = `<h2>WhatsApp</h2>
                <div class="whatsapp">
                   <div class="whatsapp_text">
                        <img class="whatsapp_text_img" src="${img}"/>
                        <div class="whatsapp_text_tag">
                            <div class="whatsapp_text_tag_title">${og["og:title"]}</div>
                            <div class="whatsapp_text_tag_desc">${og["og:description"]}</div>
                            <div class="whatsapp_text_tag_link">${og["og:url"]}</div>
                        </div>
                   </div>
                   <a href="${og["og:url"]}">${og["og:url"]}</a>
                </div>
                <style>
                .whatsapp{
                    display:flex;
                    flex-direction:column;
                    padding: 6px 7px 8px 9px;
                    background: #dcf8c6;
                }
                .whatsapp_text{
                    display:flex;
                    background:#cfe9ba;
                    margin: -3px -4px 6px -6px;
                    border-radius: 6px;
                }
                .whatsapp_text_img{
                    height: 90px;
                    max-height: 100%;
                }
                .whatsapp_text_tag{
                    display:flex;
                    flex-direction:column;
                    padding: 6px 10px;
                }
                .whatsapp_text_tag_title{
                    margin-bottom:2px;
                    color:#000;
                    font-weight:400;
                    font-size:14px;
                }
                .whatsapp_text_tag_desc{
                    font-size:12px;
                    color:rgb(0,0,0,0.45);
                    font-weight:400;
                }
                .whatsapp_text_tag_link{
                    font-size:12px;
                    color:rgb(0,0,0,0.8);
                    font-weight:400;
                    padding-top:1px;
                }
                </style>
                `;
            }, {
                changeImageSize: _change_img__WEBPACK_IMPORTED_MODULE_3__["changeImageSize"].toString(),
                crop: _change_img__WEBPACK_IMPORTED_MODULE_3__["crop"].toString(),
                og: result.facebook,
                location
            });
        }
        else {
            Object(_print_tag__WEBPACK_IMPORTED_MODULE_2__["printTag"])(result);
            await browser.close();
        }
    }
    catch (error) {
        spinner.stop();
        console.error("some error occured");
        console.error("Error message is", error.message);
        console.info("please contact author of this Project");
        process.exit();
    }
};


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

const { Command } = __webpack_require__(/*! commander */ "commander");
const program = new Command();
program
    .option('-url, --url <value>', 'absolute url of website')
    .option('-preview, --preview', 'preview tags in different popular application like whatsapp, facebook, twitter etc.');
program.parse(process.argv);
if (program.url) {
    Object(_fetch_meta__WEBPACK_IMPORTED_MODULE_0__["fetchMeta"])(program.url, program.preview != null);
}


/***/ }),

/***/ "./src/print_tag.ts":
/*!**************************!*\
  !*** ./src/print_tag.ts ***!
  \**************************/
/*! exports provided: printTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printTag", function() { return printTag; });
function printTag(tagMap) {
    const print = (message) => {
        console.log(message);
    };
    for (const category in tagMap) {
        const categoryContent = tagMap[category];
        if (Object.keys(categoryContent).length == 0) {
            return;
        }
        console.log(`--------------------------${category}------------------------------`);
        console.log("");
        for (const meta in categoryContent) {
            const metaContent = categoryContent[meta];
            if (metaContent) {
                console.log(`${meta} : "${metaContent}"`);
                console.log("");
            }
        }
    }
}


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/warrior/projects/opensource/readmeta/src/index.ts */"./src/index.ts");


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