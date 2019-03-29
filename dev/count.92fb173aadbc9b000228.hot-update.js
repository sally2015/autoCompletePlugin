webpackHotUpdate("count",{

/***/ "./src/common/source/helpers.js":
/*!**************************************!*\
  !*** ./src/common/source/helpers.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collectDeviceInfo = exports.getFootprint = exports.genAction = undefined;
exports.debounce = debounce;

var _util = __webpack_require__(/*! ./util */ "./src/common/source/util.js");

var _gen = __webpack_require__(/*! ./gen.js */ "./src/common/source/gen.js");

var _isMobile = __webpack_require__(/*! ./isMobile */ "./src/common/source/isMobile.js");

var _isMobile2 = _interopRequireDefault(_isMobile);

var _uniqueSelector = __webpack_require__(/*! unique-selector */ "./node_modules/unique-selector/lib/index.js");

var _uniqueSelector2 = _interopRequireDefault(_uniqueSelector);

var _cssSelectorGenerator = __webpack_require__(/*! css-selector-generator */ "./node_modules/css-selector-generator/build/css-selector-generator.js");

var _cssSelectorGenerator2 = _interopRequireDefault(_cssSelectorGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sg = new _cssSelectorGenerator2.default();
/**
 * delegate function, when event is triggled, record it.
 * @param {*} e 
 */
var genAction = exports.genAction = function genAction(e, opts) {
    var target = e.target,
        srcElement = e.srcElement,
        tagName = srcElement.tagName && srcElement.tagName.toLowerCase() || '',
        timeStamp = +new Date();
    return {
        timeStamp: timeStamp,
        url: window.location.href,
        title: target.title,
        id: srcElement.getAttribute('_id_'),
        className: srcElement.getAttribute('_class_'),
        selector: sg.getSelector(srcElement),
        tagName: tagName,
        innerText: target.innerText || target.value,
        event: e.type,
        target: srcElement,
        _options: opts
    };
};

var getFootprint = exports.getFootprint = function getFootprint(actionPaths, initDeviceInfo) {
    var generator = new _gen.Gen(actionPaths[0].url, navigator.userAgent, initDeviceInfo);
    actionPaths.forEach(function (action) {
        action.reload ? generator.goto(action.url) : generator.add(action);
    });

    return generator.dest();
};

function debounce(fn, delay) {
    // 定时器，用来 setTimeout
    var timer = void 0;

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this;
        var args = arguments;

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer);

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

var collectDeviceInfo = exports.collectDeviceInfo = function collectDeviceInfo(userAgent, window, screen) {
    var ismobile = (0, _isMobile2.default)(userAgent);
    return {
        devicePixelRatio: window.devicePixelRatio,
        orientation: screen.orientation || screen.mozOrientation || screen.msOrientation,
        deviceWidth: window.innerWidth > 0 ? window.innerWidth : screen.width,
        deviceHeight: window.innerHeight > 0 ? window.innerHeight : screen.height,
        isMobileDevice: ismobile.phone || ismobile.tablet,
        isMobile: ismobile
    };
};

/***/ })

})
//# sourceMappingURL=sourcemap/count.92fb173aadbc9b000228.hot-update.js.map