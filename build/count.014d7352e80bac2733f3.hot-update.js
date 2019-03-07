webpackHotUpdate("count",{

/***/ "./src/common/storage.js":
/*!*******************************!*\
  !*** ./src/common/storage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getOwnPropertyDescriptor = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-descriptor */ "./node_modules/babel-runtime/core-js/object/get-own-property-descriptor.js");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var Storage = (_class = function () {
    function Storage(url) {
        (0, _classCallCheck3.default)(this, Storage);

        this.url = url;
    }

    (0, _createClass3.default)(Storage, [{
        key: 'set',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name, obj) {
                var _this = this;

                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.get();

                            case 2:
                                data = _context.sent;

                                if (!data) {
                                    data = {};
                                }
                                return _context.abrupt('return', new _promise2.default(function (resove) {
                                    chrome.storage.sync.set((0, _defineProperty3.default)({}, _this.url, (0, _assign2.default)(data, {
                                        name: obj
                                    })), function () {
                                        console.log(chrome.runtime.lastError, 'lastErr222or');
                                        resove();
                                    });
                                }));

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function set(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return set;
        }()
    }, {
        key: 'get',
        value: function get(name) {
            var _this2 = this;

            return new _promise2.default(function (resove) {
                chrome.storage.sync.get([_this2.url], function (data) {
                    console.log(data, 'get');
                    resove(name ? data[_this2.url] : data[_this2.url][name]);
                });
            });
        }
    }]);
    return Storage;
}(), (_applyDecoratedDescriptor(_class.prototype, 'set', [decoErrFn], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'set'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'get', [decoErrFn], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'get'), _class.prototype)), _class);


function decoErrFn(target, name, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function () {
        return fn.apply(this, arguments).catch(function (e) {
            console.error('chrome storage error:' + e);
        });
    };
}

exports.default = new Storage(location.href);

/***/ })

})
//# sourceMappingURL=sourcemap/count.014d7352e80bac2733f3.hot-update.js.map