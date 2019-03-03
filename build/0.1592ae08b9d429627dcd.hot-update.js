webpackHotUpdate(0,{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _msg = __webpack_require__(3);
	
	var _onMessage = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../common/onMessage\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var count = 0;
	
	(0, _onMessage.registerMessage)(_msg.MSG_COUNT_SHOW, function (msg, sender, response) {
	  response({
	    isShow: count < 10
	  });
	});
	
	(0, _onMessage.registerMessage)(_msg.MSG_COUNT_INCREMENT, function (msg, sender, response) {
	  count += 1;
	  response({
	    count: count
	  });
	});

/***/ })

})
//# sourceMappingURL=sourcemap/0.1592ae08b9d429627dcd.hot-update.js.map