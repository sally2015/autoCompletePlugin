webpackHotUpdate(0,[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _msg = __webpack_require__(3);
	
	var _onMessage = __webpack_require__(4);
	
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

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerMessage = registerMessage;
	
	var _log = __webpack_require__(5);
	
	var messageHandlers = {
	  handlers: {},
	  doListener: function doListener(msg, sender, response) {
	    (0, _log.info)('[onMessage]', msg);
	    var responseFn = function responseFn(responseMsg) {
	      (0, _log.info)('[onMessageBack]', responseMsg);
	      response(responseMsg);
	    };
	    this.handlers[msg].call(this, msg, sender, responseFn);
	  },
	  push: function push(event, process) {
	    if (this.handlers[event]) {
	      throw Error('\u91CD\u590D\u76D1\u542C' + event + '\u4E8B\u4EF6');
	    }
	    if (!process || typeof process !== 'function') {
	      throw Error('\u76D1\u542C' + event + '\u5FC5\u987B\u4F20\u5165\u56DE\u8C03\u51FD\u6570');
	    }
	
	    this.handlers[event] = process;
	  }
	};
	
	var isRegister = false;
	
	function registerMessage(event, process) {
	  messageHandlers.push(event, process);
	  if (!isRegister) {
	    try {
	      chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	        messageHandlers.doListener(msg, sender, response);
	      });
	    } catch (e) {
	      console.log('onMessage error', e);
	    }
	
	    isRegister = true;
	  }
	}

/***/ })
])
//# sourceMappingURL=sourcemap/0.415972aedfb243ed3bb8.hot-update.js.map