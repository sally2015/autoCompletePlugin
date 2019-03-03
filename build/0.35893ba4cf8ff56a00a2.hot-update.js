webpackHotUpdate(0,{

/***/ 4:
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
	      isRegister = true;
	    } catch (e) {
	      console.log('onMessage error: the reason maybe hot reload while open background tab');
	      console.log(e);
	    }
	  }
	}

/***/ })

})
//# sourceMappingURL=sourcemap/0.35893ba4cf8ff56a00a2.hot-update.js.map