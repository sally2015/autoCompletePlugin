/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "41fb0c4af5b2a6471bc2"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 1;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	__webpack_require__(6);
	module.exports = __webpack_require__(80);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MSG_COUNT_SHOW = exports.MSG_COUNT_SHOW = 'msg_count_show';
	var MSG_COUNT_INCREMENT = exports.MSG_COUNT_INCREMENT = 'msg_count_increment';

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.info = info;
	exports.warn = warn;
	exports.error = error;
	
	
	var isDev = ("development") === 'development';
	
	function info() {
	  if (isDev) {
	    var _console$info;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    (_console$info = console.info).call.apply(_console$info, [console].concat(args));
	  }
	}
	
	function warn() {
	  var _console$warn;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  (_console$warn = console.warn).call.apply(_console$warn, [console].concat(args));
	}
	
	function error() {
	  var _console$error;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  (_console$error = console.error).call.apply(_console$error, [console].concat(args));
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {var url = __webpack_require__(7);
	var stripAnsi = __webpack_require__(14);
	var socket = __webpack_require__(16);
	
	function getCurrentScriptSource() {
		// `document.currentScript` is the most accurate way to find the current script,
		// but is not supported in all browsers.
		if(document.currentScript)
			return document.currentScript.getAttribute("src");
		// Fall back to getting all scripts in the document.
		var scriptElements = document.scripts || [];
		var currentScript = scriptElements[scriptElements.length - 1];
		if(currentScript)
			return currentScript.getAttribute("src");
		// Fail as there was no script to use.
		throw new Error("[WDS] Failed to get current script source");
	}
	
	var urlParts;
	if(true) {
		// If this bundle is inlined, use the resource query to get the correct url.
		urlParts = url.parse(__resourceQuery.substr(1));
	} else {
		// Else, get the url from the <script> this file was called with.
		var scriptHost = getCurrentScriptSource();
		scriptHost = scriptHost.replace(/\/[^\/]+$/, "");
		urlParts = url.parse((scriptHost ? scriptHost : "/"), false, true);
	}
	
	var hot = false;
	var initial = true;
	var currentHash = "";
	var logLevel = "info";
	
	function log(level, msg) {
		if(logLevel === "info" && level === "info")
			return console.log(msg);
		if(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning")
			return console.warn(msg);
		if(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error")
			return console.error(msg);
	}
	
	var onSocketMsg = {
		hot: function() {
			hot = true;
			log("info", "[WDS] Hot Module Replacement enabled.");
		},
		invalid: function() {
			log("info", "[WDS] App updated. Recompiling...");
		},
		hash: function(hash) {
			currentHash = hash;
		},
		"still-ok": function() {
			log("info", "[WDS] Nothing changed.")
		},
		"log-level": function(level) {
			logLevel = level;
		},
		ok: function() {
			if(initial) return initial = false;
			reloadApp();
		},
		warnings: function(warnings) {
			log("info", "[WDS] Warnings while compiling.");
			for(var i = 0; i < warnings.length; i++)
				console.warn(stripAnsi(warnings[i]));
			if(initial) return initial = false;
			reloadApp();
		},
		errors: function(errors) {
			log("info", "[WDS] Errors while compiling.");
			for(var i = 0; i < errors.length; i++)
				console.error(stripAnsi(errors[i]));
			if(initial) return initial = false;
			reloadApp();
		},
		"proxy-error": function(errors) {
			log("info", "[WDS] Proxy error.");
			for(var i = 0; i < errors.length; i++)
				log("error", stripAnsi(errors[i]));
			if(initial) return initial = false;
		},
		error: function(error) {
			console.error(error);
		},
		close: function() {
			log("error", "[WDS] Disconnected!");
		}
	};
	
	var hostname = urlParts.hostname;
	var protocol = urlParts.protocol;
	
	if(urlParts.hostname === '0.0.0.0') {
		// why do we need this check?
		// hostname n/a for file protocol (example, when using electron, ionic)
		// see: https://github.com/webpack/webpack-dev-server/pull/384
		if(window.location.hostname && !!~window.location.protocol.indexOf('http')) {
			hostname = window.location.hostname;
		}
	}
	
	// `hostname` can be empty when the script path is relative. In that case, specifying
	// a protocol would result in an invalid URL.
	// When https is used in the app, secure websockets are always necessary
	// because the browser doesn't accept non-secure websockets.
	if(hostname && (window.location.protocol === "https:" || urlParts.hostname === '0.0.0.0')) {
		protocol = window.location.protocol;
	}
	
	var socketUrl = url.format({
		protocol: protocol,
		auth: urlParts.auth,
		hostname: hostname,
		port: (urlParts.port === '0') ? window.location.port : urlParts.port,
		pathname: urlParts.path == null || urlParts.path === '/' ? "/sockjs-node" : urlParts.path
	});
	
	socket(socketUrl, onSocketMsg);
	
	function reloadApp() {
		if(hot) {
			log("info", "[WDS] App hot update...");
			window.postMessage("webpackHotUpdate" + currentHash, "*");
		} else {
			log("info", "[WDS] App updated. Reloading...");
			window.location.reload();
		}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?http://localhost:3007"))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(8);
	var util = __webpack_require__(10);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(11);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module), (function() { return this; }())))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(12);
	exports.encode = exports.stringify = __webpack_require__(13);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(15)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var SockJS = __webpack_require__(17);
	
	var retries = 0;
	var sock = null;
	
	function socket(url, handlers) {
		sock = new SockJS(url);
	
		sock.onopen = function() {
			retries = 0;
		}
	
		sock.onclose = function() {
			if(retries === 0)
				handlers.close();
	
			// Try to reconnect.
			sock = null;
	
			// After 10 retries stop trying, to prevent logspam.
			if(retries <= 10) {
				// Exponentially increase timeout to reconnect.
				// Respectfully copied from the package `got`.
				var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
				retries += 1;
	
				setTimeout(function() {
					socket(url, handlers);
				}, retryInMs);
			}
		};
	
		sock.onmessage = function(e) {
			// This assumes that all data sent via the websocket is JSON.
			var msg = JSON.parse(e.data);
			if(handlers[msg.type])
				handlers[msg.type](msg.data);
		};
	}
	
	module.exports = socket;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var transportList = __webpack_require__(18);
	
	module.exports = __webpack_require__(64)(transportList);
	
	// TODO can't get rid of this until all servers do
	if ('_sockjs_onload' in global) {
	  setTimeout(global._sockjs_onload, 1);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = [
	  // streaming transports
	  __webpack_require__(19)
	, __webpack_require__(35)
	, __webpack_require__(45)
	, __webpack_require__(47)
	, __webpack_require__(50)(__webpack_require__(47))
	
	  // polling transports
	, __webpack_require__(57)
	, __webpack_require__(50)(__webpack_require__(57))
	, __webpack_require__(59)
	, __webpack_require__(60)
	, __webpack_require__(50)(__webpack_require__(59))
	, __webpack_require__(61)
	];


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(20)
	  , urlUtils = __webpack_require__(23)
	  , inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  , WebsocketDriver = __webpack_require__(34)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:websocket');
	}
	
	function WebSocketTransport(transUrl, ignore, options) {
	  if (!WebSocketTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  EventEmitter.call(this);
	  debug('constructor', transUrl);
	
	  var self = this;
	  var url = urlUtils.addPath(transUrl, '/websocket');
	  if (url.slice(0, 5) === 'https') {
	    url = 'wss' + url.slice(5);
	  } else {
	    url = 'ws' + url.slice(4);
	  }
	  this.url = url;
	
	  this.ws = new WebsocketDriver(this.url, [], options);
	  this.ws.onmessage = function(e) {
	    debug('message event', e.data);
	    self.emit('message', e.data);
	  };
	  // Firefox has an interesting bug. If a websocket connection is
	  // created after onunload, it stays alive even when user
	  // navigates away from the page. In such situation let's lie -
	  // let's not open the ws connection at all. See:
	  // https://github.com/sockjs/sockjs-client/issues/28
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload');
	    self.ws.close();
	  });
	  this.ws.onclose = function(e) {
	    debug('close event', e.code, e.reason);
	    self.emit('close', e.code, e.reason);
	    self._cleanup();
	  };
	  this.ws.onerror = function(e) {
	    debug('error event', e);
	    self.emit('close', 1006, 'WebSocket connection broken');
	    self._cleanup();
	  };
	}
	
	inherits(WebSocketTransport, EventEmitter);
	
	WebSocketTransport.prototype.send = function(data) {
	  var msg = '[' + data + ']';
	  debug('send', msg);
	  this.ws.send(msg);
	};
	
	WebSocketTransport.prototype.close = function() {
	  debug('close');
	  var ws = this.ws;
	  this._cleanup();
	  if (ws) {
	    ws.close();
	  }
	};
	
	WebSocketTransport.prototype._cleanup = function() {
	  debug('_cleanup');
	  var ws = this.ws;
	  if (ws) {
	    ws.onmessage = ws.onclose = ws.onerror = null;
	  }
	  utils.unloadDel(this.unloadRef);
	  this.unloadRef = this.ws = null;
	  this.removeAllListeners();
	};
	
	WebSocketTransport.enabled = function() {
	  debug('enabled');
	  return !!WebsocketDriver;
	};
	WebSocketTransport.transportName = 'websocket';
	
	// In theory, ws should require 1 round trip. But in chrome, this is
	// not very stable over SSL. Most likely a ws connection requires a
	// separate SSL connection, in which case 2 round trips are an
	// absolute minumum.
	WebSocketTransport.roundTrips = 2;
	
	module.exports = WebSocketTransport;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var random = __webpack_require__(21);
	
	var onUnload = {}
	  , afterUnload = false
	    // detect google chrome packaged apps because they don't allow the 'unload' event
	  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
	  ;
	
	module.exports = {
	  attachEvent: function(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.addEventListener(event, listener, false);
	    } else if (global.document && global.attachEvent) {
	      // IE quirks.
	      // According to: http://stevesouders.com/misc/test-postmessage.php
	      // the message gets delivered only to 'document', not 'window'.
	      global.document.attachEvent('on' + event, listener);
	      // I get 'window' for ie8.
	      global.attachEvent('on' + event, listener);
	    }
	  }
	
	, detachEvent: function(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.removeEventListener(event, listener, false);
	    } else if (global.document && global.detachEvent) {
	      global.document.detachEvent('on' + event, listener);
	      global.detachEvent('on' + event, listener);
	    }
	  }
	
	, unloadAdd: function(listener) {
	    if (isChromePackagedApp) {
	      return null;
	    }
	
	    var ref = random.string(8);
	    onUnload[ref] = listener;
	    if (afterUnload) {
	      setTimeout(this.triggerUnloadCallbacks, 0);
	    }
	    return ref;
	  }
	
	, unloadDel: function(ref) {
	    if (ref in onUnload) {
	      delete onUnload[ref];
	    }
	  }
	
	, triggerUnloadCallbacks: function() {
	    for (var ref in onUnload) {
	      onUnload[ref]();
	      delete onUnload[ref];
	    }
	  }
	};
	
	var unloadTriggered = function() {
	  if (afterUnload) {
	    return;
	  }
	  afterUnload = true;
	  module.exports.triggerUnloadCallbacks();
	};
	
	// 'unload' alone is not reliable in opera within an iframe, but we
	// can't use `beforeunload` as IE fires it on javascript: links.
	if (!isChromePackagedApp) {
	  module.exports.attachEvent('unload', unloadTriggered);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global crypto:true */
	var crypto = __webpack_require__(22);
	
	// This string has length 32, a power of 2, so the modulus doesn't introduce a
	// bias.
	var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
	module.exports = {
	  string: function(length) {
	    var max = _randomStringChars.length;
	    var bytes = crypto.randomBytes(length);
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
	    }
	    return ret.join('');
	  }
	
	, number: function(max) {
	    return Math.floor(Math.random() * max);
	  }
	
	, numberString: function(max) {
	    var t = ('' + (max - 1)).length;
	    var p = new Array(t + 1).join('0');
	    return (p + this.number(max)).slice(-t);
	  }
	};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	if (global.crypto && global.crypto.getRandomValues) {
	  module.exports.randomBytes = function(length) {
	    var bytes = new Uint8Array(length);
	    global.crypto.getRandomValues(bytes);
	    return bytes;
	  };
	} else {
	  module.exports.randomBytes = function(length) {
	    var bytes = new Array(length);
	    for (var i = 0; i < length; i++) {
	      bytes[i] = Math.floor(Math.random() * 256);
	    }
	    return bytes;
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var URL = __webpack_require__(24);
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:utils:url');
	}
	
	module.exports = {
	  getOrigin: function(url) {
	    if (!url) {
	      return null;
	    }
	
	    var p = new URL(url);
	    if (p.protocol === 'file:') {
	      return null;
	    }
	
	    var port = p.port;
	    if (!port) {
	      port = (p.protocol === 'https:') ? '443' : '80';
	    }
	
	    return p.protocol + '//' + p.hostname + ':' + port;
	  }
	
	, isOriginEqual: function(a, b) {
	    var res = this.getOrigin(a) === this.getOrigin(b);
	    debug('same', a, b, res);
	    return res;
	  }
	
	, isSchemeEqual: function(a, b) {
	    return (a.split(':')[0] === b.split(':')[0]);
	  }
	
	, addPath: function (url, path) {
	    var qs = url.split('?');
	    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
	  }
	
	, addQuery: function (url, q) {
	    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
	  }
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var required = __webpack_require__(25)
	  , qs = __webpack_require__(26)
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
	  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	
	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  function sanitize(address) {          // Sanitize what is left of the address
	    return address.replace('\\', '/');
	  },
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];
	
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 };
	
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @public
	 */
	function lolcation(loc) {
	  var globalVar;
	
	  if (typeof window !== 'undefined') globalVar = window;
	  else if (typeof global !== 'undefined') globalVar = global;
	  else if (typeof self !== 'undefined') globalVar = self;
	  else globalVar = {};
	
	  var location = globalVar.location || {};
	  loc = loc || location;
	
	  var finaldestination = {}
	    , type = typeof loc
	    , key;
	
	  if ('blob:' === loc.protocol) {
	    finaldestination = new Url(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new Url(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }
	
	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }
	
	  return finaldestination;
	}
	
	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */
	
	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}
	
	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @private
	 */
	function resolve(relative, base) {
	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;
	
	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }
	
	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');
	
	  return path.join('/');
	}
	
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * It is worth noting that we should not use `URL` as class name to prevent
	 * clashes with the global URL instance that got introduced in browsers.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} [location] Location defaults for relative paths.
	 * @param {Boolean|Function} [parser] Parser for the query string.
	 * @private
	 */
	function Url(address, location, parser) {
	  if (!(this instanceof Url)) {
	    return new Url(address, location, parser);
	  }
	
	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;
	
	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }
	
	  if (parser && 'function' !== typeof parser) parser = qs.parse;
	
	  location = lolcation(location);
	
	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;
	
	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];
	
	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	
	    if (typeof instruction === 'function') {
	      address = instruction(address);
	      continue;
	    }
	
	    parse = instruction[0];
	    key = instruction[1];
	
	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if ((index = parse.exec(address))) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }
	
	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );
	
	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }
	
	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);
	
	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }
	
	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }
	
	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }
	
	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';
	
	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}
	
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL} URL instance for chaining.
	 * @public
	 */
	function set(part, value, fn) {
	  var url = this;
	
	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || qs.parse)(value);
	      }
	
	      url[part] = value;
	      break;
	
	    case 'port':
	      url[part] = value;
	
	      if (!required(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }
	
	      break;
	
	    case 'hostname':
	      url[part] = value;
	
	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;
	
	    case 'host':
	      url[part] = value;
	
	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }
	
	      break;
	
	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;
	
	    case 'pathname':
	    case 'hash':
	      if (value) {
	        var char = part === 'pathname' ? '/' : '#';
	        url[part] = value.charAt(0) !== char ? char + value : value;
	      } else {
	        url[part] = value;
	      }
	      break;
	
	    default:
	      url[part] = value;
	  }
	
	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];
	
	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }
	
	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';
	
	  url.href = url.toString();
	
	  return url;
	}
	
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String} Compiled version of the URL.
	 * @public
	 */
	function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
	
	  var query
	    , url = this
	    , protocol = url.protocol;
	
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	
	  var result = protocol + (url.slashes ? '//' : '');
	
	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }
	
	  result += url.host + url.pathname;
	
	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;
	
	  if (url.hash) result += url.hash;
	
	  return result;
	}
	
	Url.prototype = { set: set, toString: toString };
	
	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	Url.extractProtocol = extractProtocol;
	Url.location = lolcation;
	Url.qs = qs;
	
	module.exports = Url;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	
	  if (!port) return false;
	
	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;
	
	    case 'https':
	    case 'wss':
	    return port !== 443;
	
	    case 'ftp':
	    return port !== 21;
	
	    case 'gopher':
	    return port !== 70;
	
	    case 'file':
	    return false;
	  }
	
	  return port !== 0;
	};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty
	  , undef;
	
	/**
	 * Decode a URI encoded string.
	 *
	 * @param {String} input The URI encoded string.
	 * @returns {String} The decoded string.
	 * @api private
	 */
	function decode(input) {
	  return decodeURIComponent(input.replace(/\+/g, ' '));
	}
	
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;
	
	  while (part = parser.exec(query)) {
	    var key = decode(part[1])
	      , value = decode(part[2]);
	
	    //
	    // Prevent overriding of existing properties. This ensures that build-in
	    // methods like `toString` or __proto__ are not overriden by malicious
	    // querystrings.
	    //
	    if (key in result) continue;
	    result[key] = value;
	  }
	
	  return result;
	}
	
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	
	  var pairs = []
	    , value
	    , key;
	
	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';
	
	  for (key in obj) {
	    if (has.call(obj, key)) {
	      value = obj[key];
	
	      //
	      // Edge cases where we actually want to encode the value to an empty
	      // string instead of the stringified value.
	      //
	      if (!value && (value === null || value === undef || isNaN(value))) {
	        value = '';
	      }
	
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(value));
	    }
	  }
	
	  return pairs.length ? prefix + pairs.join('&') : '';
	}
	
	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
	
	/* eslint-env browser */
	
	/**
	 * This is the web browser implementation of `debug()`.
	 */
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	/**
	 * Colors.
	 */
	
	exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	// eslint-disable-next-line complexity
	
	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
	    return true;
	  } // Internet Explorer and Edge do not support colors.
	
	
	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	    return false;
	  } // Is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	
	
	  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	
	function formatArgs(args) {
	  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
	
	  if (!this.useColors) {
	    return;
	  }
	
	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if (match === '%%') {
	      return;
	    }
	
	    index++;
	
	    if (match === '%c') {
	      // We only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	  args.splice(lastC, 0, c);
	}
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	
	function log() {
	  var _console;
	
	  // This hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
	}
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	
	function save(namespaces) {
	  try {
	    if (namespaces) {
	      exports.storage.setItem('debug', namespaces);
	    } else {
	      exports.storage.removeItem('debug');
	    }
	  } catch (error) {// Swallow
	    // XXX (@Qix-) should we be logging these?
	  }
	}
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	
	function load() {
	  var r;
	
	  try {
	    r = exports.storage.getItem('debug');
	  } catch (error) {} // Swallow
	  // XXX (@Qix-) should we be logging these?
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	
	
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = ({"NODE_ENV":"development"}).DEBUG;
	  }
	
	  return r;
	}
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	
	function localstorage() {
	  try {
	    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
	    // The Browser also has localStorage in the global context.
	    return localStorage;
	  } catch (error) {// Swallow
	    // XXX (@Qix-) should we be logging these?
	  }
	}
	
	module.exports = __webpack_require__(29)(exports);
	var formatters = module.exports.formatters;
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (error) {
	    return '[UnexpectedJSONParseError]: ' + error.message;
	  }
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */
	function setup(env) {
	  createDebug.debug = createDebug;
	  createDebug.default = createDebug;
	  createDebug.coerce = coerce;
	  createDebug.disable = disable;
	  createDebug.enable = enable;
	  createDebug.enabled = enabled;
	  createDebug.humanize = __webpack_require__(30);
	  Object.keys(env).forEach(function (key) {
	    createDebug[key] = env[key];
	  });
	  /**
	  * Active `debug` instances.
	  */
	
	  createDebug.instances = [];
	  /**
	  * The currently active debug mode names, and names to skip.
	  */
	
	  createDebug.names = [];
	  createDebug.skips = [];
	  /**
	  * Map of special "%n" handling functions, for the debug "format" argument.
	  *
	  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	  */
	
	  createDebug.formatters = {};
	  /**
	  * Selects a color for a debug namespace
	  * @param {String} namespace The namespace string for the for the debug instance to be colored
	  * @return {Number|String} An ANSI color code for the given namespace
	  * @api private
	  */
	
	  function selectColor(namespace) {
	    var hash = 0;
	
	    for (var i = 0; i < namespace.length; i++) {
	      hash = (hash << 5) - hash + namespace.charCodeAt(i);
	      hash |= 0; // Convert to 32bit integer
	    }
	
	    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	  }
	
	  createDebug.selectColor = selectColor;
	  /**
	  * Create a debugger with the given `namespace`.
	  *
	  * @param {String} namespace
	  * @return {Function}
	  * @api public
	  */
	
	  function createDebug(namespace) {
	    var prevTime;
	
	    function debug() {
	      // Disabled?
	      if (!debug.enabled) {
	        return;
	      }
	
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var self = debug; // Set `diff` timestamp
	
	      var curr = Number(new Date());
	      var ms = curr - (prevTime || curr);
	      self.diff = ms;
	      self.prev = prevTime;
	      self.curr = curr;
	      prevTime = curr;
	      args[0] = createDebug.coerce(args[0]);
	
	      if (typeof args[0] !== 'string') {
	        // Anything else let's inspect with %O
	        args.unshift('%O');
	      } // Apply any `formatters` transformations
	
	
	      var index = 0;
	      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	        // If we encounter an escaped % then don't increase the array index
	        if (match === '%%') {
	          return match;
	        }
	
	        index++;
	        var formatter = createDebug.formatters[format];
	
	        if (typeof formatter === 'function') {
	          var val = args[index];
	          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`
	
	          args.splice(index, 1);
	          index--;
	        }
	
	        return match;
	      }); // Apply env-specific formatting (colors, etc.)
	
	      createDebug.formatArgs.call(self, args);
	      var logFn = self.log || createDebug.log;
	      logFn.apply(self, args);
	    }
	
	    debug.namespace = namespace;
	    debug.enabled = createDebug.enabled(namespace);
	    debug.useColors = createDebug.useColors();
	    debug.color = selectColor(namespace);
	    debug.destroy = destroy;
	    debug.extend = extend; // Debug.formatArgs = formatArgs;
	    // debug.rawLog = rawLog;
	    // env-specific initialization logic for debug instances
	
	    if (typeof createDebug.init === 'function') {
	      createDebug.init(debug);
	    }
	
	    createDebug.instances.push(debug);
	    return debug;
	  }
	
	  function destroy() {
	    var index = createDebug.instances.indexOf(this);
	
	    if (index !== -1) {
	      createDebug.instances.splice(index, 1);
	      return true;
	    }
	
	    return false;
	  }
	
	  function extend(namespace, delimiter) {
	    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
	  }
	  /**
	  * Enables a debug mode by namespaces. This can include modes
	  * separated by a colon and wildcards.
	  *
	  * @param {String} namespaces
	  * @api public
	  */
	
	
	  function enable(namespaces) {
	    createDebug.save(namespaces);
	    createDebug.names = [];
	    createDebug.skips = [];
	    var i;
	    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	    var len = split.length;
	
	    for (i = 0; i < len; i++) {
	      if (!split[i]) {
	        // ignore empty strings
	        continue;
	      }
	
	      namespaces = split[i].replace(/\*/g, '.*?');
	
	      if (namespaces[0] === '-') {
	        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	      } else {
	        createDebug.names.push(new RegExp('^' + namespaces + '$'));
	      }
	    }
	
	    for (i = 0; i < createDebug.instances.length; i++) {
	      var instance = createDebug.instances[i];
	      instance.enabled = createDebug.enabled(instance.namespace);
	    }
	  }
	  /**
	  * Disable debug output.
	  *
	  * @api public
	  */
	
	
	  function disable() {
	    createDebug.enable('');
	  }
	  /**
	  * Returns true if the given mode name is enabled, false otherwise.
	  *
	  * @param {String} name
	  * @return {Boolean}
	  * @api public
	  */
	
	
	  function enabled(name) {
	    if (name[name.length - 1] === '*') {
	      return true;
	    }
	
	    var i;
	    var len;
	
	    for (i = 0, len = createDebug.skips.length; i < len; i++) {
	      if (createDebug.skips[i].test(name)) {
	        return false;
	      }
	    }
	
	    for (i = 0, len = createDebug.names.length; i < len; i++) {
	      if (createDebug.names[i].test(name)) {
	        return true;
	      }
	    }
	
	    return false;
	  }
	  /**
	  * Coerce `val`.
	  *
	  * @param {Mixed} val
	  * @return {Mixed}
	  * @api private
	  */
	
	
	  function coerce(val) {
	    if (val instanceof Error) {
	      return val.stack || val.message;
	    }
	
	    return val;
	  }
	
	  createDebug.enable(createDebug.load());
	  return createDebug;
	}
	
	module.exports = setup;
	


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , EventTarget = __webpack_require__(33)
	  ;
	
	function EventEmitter() {
	  EventTarget.call(this);
	}
	
	inherits(EventEmitter, EventTarget);
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  if (type) {
	    delete this._listeners[type];
	  } else {
	    this._listeners = {};
	  }
	};
	
	EventEmitter.prototype.once = function(type, listener) {
	  var self = this
	    , fired = false;
	
	  function g() {
	    self.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  this.on(type, g);
	};
	
	EventEmitter.prototype.emit = function() {
	  var type = arguments[0];
	  var listeners = this._listeners[type];
	  if (!listeners) {
	    return;
	  }
	  // equivalent of Array.prototype.slice.call(arguments, 1);
	  var l = arguments.length;
	  var args = new Array(l - 1);
	  for (var ai = 1; ai < l; ai++) {
	    args[ai - 1] = arguments[ai];
	  }
	  for (var i = 0; i < listeners.length; i++) {
	    listeners[i].apply(this, args);
	  }
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
	EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;
	
	module.exports.EventEmitter = EventEmitter;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';
	
	/* Simplified implementation of DOM2 EventTarget.
	 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
	 */
	
	function EventTarget() {
	  this._listeners = {};
	}
	
	EventTarget.prototype.addEventListener = function(eventType, listener) {
	  if (!(eventType in this._listeners)) {
	    this._listeners[eventType] = [];
	  }
	  var arr = this._listeners[eventType];
	  // #4
	  if (arr.indexOf(listener) === -1) {
	    // Make a copy so as not to interfere with a current dispatchEvent.
	    arr = arr.concat([listener]);
	  }
	  this._listeners[eventType] = arr;
	};
	
	EventTarget.prototype.removeEventListener = function(eventType, listener) {
	  var arr = this._listeners[eventType];
	  if (!arr) {
	    return;
	  }
	  var idx = arr.indexOf(listener);
	  if (idx !== -1) {
	    if (arr.length > 1) {
	      // Make a copy so as not to interfere with a current dispatchEvent.
	      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
	    } else {
	      delete this._listeners[eventType];
	    }
	    return;
	  }
	};
	
	EventTarget.prototype.dispatchEvent = function() {
	  var event = arguments[0];
	  var t = event.type;
	  // equivalent of Array.prototype.slice.call(arguments, 0);
	  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
	  // TODO: This doesn't match the real behavior; per spec, onfoo get
	  // their place in line from the /first/ time they're set from
	  // non-null. Although WebKit bumps it to the end every time it's
	  // set.
	  if (this['on' + t]) {
	    this['on' + t].apply(this, args);
	  }
	  if (t in this._listeners) {
	    // Grab a reference to the listeners list. removeEventListener may alter the list.
	    var listeners = this._listeners[t];
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	};
	
	module.exports = EventTarget;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var Driver = global.WebSocket || global.MozWebSocket;
	if (Driver) {
		module.exports = function WebSocketBrowserDriver(url) {
			return new Driver(url);
		};
	} else {
		module.exports = undefined;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(31)
	  , AjaxBasedTransport = __webpack_require__(36)
	  , XhrReceiver = __webpack_require__(40)
	  , XHRCorsObject = __webpack_require__(41)
	  , XHRLocalObject = __webpack_require__(43)
	  , browser = __webpack_require__(44)
	  ;
	
	function XhrStreamingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrStreamingTransport, AjaxBasedTransport);
	
	XhrStreamingTransport.enabled = function(info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	  // Opera doesn't support xhr-streaming #60
	  // But it might be able to #92
	  if (browser.isOpera()) {
	    return false;
	  }
	
	  return XHRCorsObject.enabled;
	};
	
	XhrStreamingTransport.transportName = 'xhr-streaming';
	XhrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	// Safari gets confused when a streaming ajax request is started
	// before onload. This causes the load indicator to spin indefinetely.
	// Only require body when used in a browser
	XhrStreamingTransport.needBody = !!global.document;
	
	module.exports = XhrStreamingTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , urlUtils = __webpack_require__(23)
	  , SenderReceiver = __webpack_require__(37)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:ajax-based');
	}
	
	function createAjaxSender(AjaxObject) {
	  return function(url, payload, callback) {
	    debug('create ajax sender', url, payload);
	    var opt = {};
	    if (typeof payload === 'string') {
	      opt.headers = {'Content-type': 'text/plain'};
	    }
	    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
	    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
	    xo.once('finish', function(status) {
	      debug('finish', status);
	      xo = null;
	
	      if (status !== 200 && status !== 204) {
	        return callback(new Error('http status ' + status));
	      }
	      callback();
	    });
	    return function() {
	      debug('abort');
	      xo.close();
	      xo = null;
	
	      var err = new Error('Aborted');
	      err.code = 1000;
	      callback(err);
	    };
	  };
	}
	
	function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
	  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
	}
	
	inherits(AjaxBasedTransport, SenderReceiver);
	
	module.exports = AjaxBasedTransport;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , urlUtils = __webpack_require__(23)
	  , BufferedSender = __webpack_require__(38)
	  , Polling = __webpack_require__(39)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:sender-receiver');
	}
	
	function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
	  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
	  debug(pollUrl);
	  var self = this;
	  BufferedSender.call(this, transUrl, senderFunc);
	
	  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
	  this.poll.on('message', function(msg) {
	    debug('poll message', msg);
	    self.emit('message', msg);
	  });
	  this.poll.once('close', function(code, reason) {
	    debug('poll close', code, reason);
	    self.poll = null;
	    self.emit('close', code, reason);
	    self.close();
	  });
	}
	
	inherits(SenderReceiver, BufferedSender);
	
	SenderReceiver.prototype.close = function() {
	  BufferedSender.prototype.close.call(this);
	  debug('close');
	  this.removeAllListeners();
	  if (this.poll) {
	    this.poll.abort();
	    this.poll = null;
	  }
	};
	
	module.exports = SenderReceiver;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:buffered-sender');
	}
	
	function BufferedSender(url, sender) {
	  debug(url);
	  EventEmitter.call(this);
	  this.sendBuffer = [];
	  this.sender = sender;
	  this.url = url;
	}
	
	inherits(BufferedSender, EventEmitter);
	
	BufferedSender.prototype.send = function(message) {
	  debug('send', message);
	  this.sendBuffer.push(message);
	  if (!this.sendStop) {
	    this.sendSchedule();
	  }
	};
	
	// For polling transports in a situation when in the message callback,
	// new message is being send. If the sending connection was started
	// before receiving one, it is possible to saturate the network and
	// timeout due to the lack of receiving socket. To avoid that we delay
	// sending messages by some small time, in order to let receiving
	// connection be started beforehand. This is only a halfmeasure and
	// does not fix the big problem, but it does make the tests go more
	// stable on slow networks.
	BufferedSender.prototype.sendScheduleWait = function() {
	  debug('sendScheduleWait');
	  var self = this;
	  var tref;
	  this.sendStop = function() {
	    debug('sendStop');
	    self.sendStop = null;
	    clearTimeout(tref);
	  };
	  tref = setTimeout(function() {
	    debug('timeout');
	    self.sendStop = null;
	    self.sendSchedule();
	  }, 25);
	};
	
	BufferedSender.prototype.sendSchedule = function() {
	  debug('sendSchedule', this.sendBuffer.length);
	  var self = this;
	  if (this.sendBuffer.length > 0) {
	    var payload = '[' + this.sendBuffer.join(',') + ']';
	    this.sendStop = this.sender(this.url, payload, function(err) {
	      self.sendStop = null;
	      if (err) {
	        debug('error', err);
	        self.emit('close', err.code || 1006, 'Sending error: ' + err);
	        self.close();
	      } else {
	        self.sendScheduleWait();
	      }
	    });
	    this.sendBuffer = [];
	  }
	};
	
	BufferedSender.prototype._cleanup = function() {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	BufferedSender.prototype.close = function() {
	  debug('close');
	  this._cleanup();
	  if (this.sendStop) {
	    this.sendStop();
	    this.sendStop = null;
	  }
	};
	
	module.exports = BufferedSender;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:polling');
	}
	
	function Polling(Receiver, receiveUrl, AjaxObject) {
	  debug(receiveUrl);
	  EventEmitter.call(this);
	  this.Receiver = Receiver;
	  this.receiveUrl = receiveUrl;
	  this.AjaxObject = AjaxObject;
	  this._scheduleReceiver();
	}
	
	inherits(Polling, EventEmitter);
	
	Polling.prototype._scheduleReceiver = function() {
	  debug('_scheduleReceiver');
	  var self = this;
	  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
	
	  poll.on('message', function(msg) {
	    debug('message', msg);
	    self.emit('message', msg);
	  });
	
	  poll.once('close', function(code, reason) {
	    debug('close', code, reason, self.pollIsClosing);
	    self.poll = poll = null;
	
	    if (!self.pollIsClosing) {
	      if (reason === 'network') {
	        self._scheduleReceiver();
	      } else {
	        self.emit('close', code || 1006, reason);
	        self.removeAllListeners();
	      }
	    }
	  });
	};
	
	Polling.prototype.abort = function() {
	  debug('abort');
	  this.removeAllListeners();
	  this.pollIsClosing = true;
	  if (this.poll) {
	    this.poll.abort();
	  }
	};
	
	module.exports = Polling;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:receiver:xhr');
	}
	
	function XhrReceiver(url, AjaxObject) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	
	  this.bufferPosition = 0;
	
	  this.xo = new AjaxObject('POST', url, null);
	  this.xo.on('chunk', this._chunkHandler.bind(this));
	  this.xo.once('finish', function(status, text) {
	    debug('finish', status, text);
	    self._chunkHandler(status, text);
	    self.xo = null;
	    var reason = status === 200 ? 'network' : 'permanent';
	    debug('close', reason);
	    self.emit('close', null, reason);
	    self._cleanup();
	  });
	}
	
	inherits(XhrReceiver, EventEmitter);
	
	XhrReceiver.prototype._chunkHandler = function(status, text) {
	  debug('_chunkHandler', status);
	  if (status !== 200 || !text) {
	    return;
	  }
	
	  for (var idx = -1; ; this.bufferPosition += idx + 1) {
	    var buf = text.slice(this.bufferPosition);
	    idx = buf.indexOf('\n');
	    if (idx === -1) {
	      break;
	    }
	    var msg = buf.slice(0, idx);
	    if (msg) {
	      debug('message', msg);
	      this.emit('message', msg);
	    }
	  }
	};
	
	XhrReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	XhrReceiver.prototype.abort = function() {
	  debug('abort');
	  if (this.xo) {
	    this.xo.close();
	    debug('close');
	    this.emit('close', null, 'user');
	    this.xo = null;
	  }
	  this._cleanup();
	};
	
	module.exports = XhrReceiver;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , XhrDriver = __webpack_require__(42)
	  ;
	
	function XHRCorsObject(method, url, payload, opts) {
	  XhrDriver.call(this, method, url, payload, opts);
	}
	
	inherits(XHRCorsObject, XhrDriver);
	
	XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
	
	module.exports = XHRCorsObject;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var EventEmitter = __webpack_require__(32).EventEmitter
	  , inherits = __webpack_require__(31)
	  , utils = __webpack_require__(20)
	  , urlUtils = __webpack_require__(23)
	  , XHR = global.XMLHttpRequest
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:browser:xhr');
	}
	
	function AbstractXHRObject(method, url, payload, opts) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function () {
	    self._start(method, url, payload, opts);
	  }, 0);
	}
	
	inherits(AbstractXHRObject, EventEmitter);
	
	AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
	  var self = this;
	
	  try {
	    this.xhr = new XHR();
	  } catch (x) {
	    // intentionally empty
	  }
	
	  if (!this.xhr) {
	    debug('no xhr');
	    this.emit('finish', 0, 'no xhr support');
	    this._cleanup();
	    return;
	  }
	
	  // several browsers cache POSTs
	  url = urlUtils.addQuery(url, 't=' + (+new Date()));
	
	  // Explorer tends to keep connection open, even after the
	  // tab gets closed: http://bugs.jquery.com/ticket/5280
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload cleanup');
	    self._cleanup(true);
	  });
	  try {
	    this.xhr.open(method, url, true);
	    if (this.timeout && 'timeout' in this.xhr) {
	      this.xhr.timeout = this.timeout;
	      this.xhr.ontimeout = function() {
	        debug('xhr timeout');
	        self.emit('finish', 0, '');
	        self._cleanup(false);
	      };
	    }
	  } catch (e) {
	    debug('exception', e);
	    // IE raises an exception on wrong port.
	    this.emit('finish', 0, '');
	    this._cleanup(false);
	    return;
	  }
	
	  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
	    debug('withCredentials');
	    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
	    // "This never affects same-site requests."
	
	    this.xhr.withCredentials = true;
	  }
	  if (opts && opts.headers) {
	    for (var key in opts.headers) {
	      this.xhr.setRequestHeader(key, opts.headers[key]);
	    }
	  }
	
	  this.xhr.onreadystatechange = function() {
	    if (self.xhr) {
	      var x = self.xhr;
	      var text, status;
	      debug('readyState', x.readyState);
	      switch (x.readyState) {
	      case 3:
	        // IE doesn't like peeking into responseText or status
	        // on Microsoft.XMLHTTP and readystate=3
	        try {
	          status = x.status;
	          text = x.responseText;
	        } catch (e) {
	          // intentionally empty
	        }
	        debug('status', status);
	        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	        if (status === 1223) {
	          status = 204;
	        }
	
	        // IE does return readystate == 3 for 404 answers.
	        if (status === 200 && text && text.length > 0) {
	          debug('chunk');
	          self.emit('chunk', status, text);
	        }
	        break;
	      case 4:
	        status = x.status;
	        debug('status', status);
	        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	        if (status === 1223) {
	          status = 204;
	        }
	        // IE returns this for a bad port
	        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
	        if (status === 12005 || status === 12029) {
	          status = 0;
	        }
	
	        debug('finish', status, x.responseText);
	        self.emit('finish', status, x.responseText);
	        self._cleanup(false);
	        break;
	      }
	    }
	  };
	
	  try {
	    self.xhr.send(payload);
	  } catch (e) {
	    self.emit('finish', 0, '');
	    self._cleanup(false);
	  }
	};
	
	AbstractXHRObject.prototype._cleanup = function(abort) {
	  debug('cleanup');
	  if (!this.xhr) {
	    return;
	  }
	  this.removeAllListeners();
	  utils.unloadDel(this.unloadRef);
	
	  // IE needs this field to be a function
	  this.xhr.onreadystatechange = function() {};
	  if (this.xhr.ontimeout) {
	    this.xhr.ontimeout = null;
	  }
	
	  if (abort) {
	    try {
	      this.xhr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xhr = null;
	};
	
	AbstractXHRObject.prototype.close = function() {
	  debug('close');
	  this._cleanup(true);
	};
	
	AbstractXHRObject.enabled = !!XHR;
	// override XMLHttpRequest for IE6/7
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (!AbstractXHRObject.enabled && (axo in global)) {
	  debug('overriding xmlhttprequest');
	  XHR = function() {
	    try {
	      return new global[axo]('Microsoft.XMLHTTP');
	    } catch (e) {
	      return null;
	    }
	  };
	  AbstractXHRObject.enabled = !!new XHR();
	}
	
	var cors = false;
	try {
	  cors = 'withCredentials' in new XHR();
	} catch (ignored) {
	  // intentionally empty
	}
	
	AbstractXHRObject.supportsCORS = cors;
	
	module.exports = AbstractXHRObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , XhrDriver = __webpack_require__(42)
	  ;
	
	function XHRLocalObject(method, url, payload /*, opts */) {
	  XhrDriver.call(this, method, url, payload, {
	    noCredentials: true
	  });
	}
	
	inherits(XHRLocalObject, XhrDriver);
	
	XHRLocalObject.enabled = XhrDriver.enabled;
	
	module.exports = XHRLocalObject;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = {
	  isOpera: function() {
	    return global.navigator &&
	      /opera/i.test(global.navigator.userAgent);
	  }
	
	, isKonqueror: function() {
	    return global.navigator &&
	      /konqueror/i.test(global.navigator.userAgent);
	  }
	
	  // #187 wrap document.domain in try/catch because of WP8 from file:///
	, hasDomain: function () {
	    // non-browser client always has a domain
	    if (!global.document) {
	      return true;
	    }
	
	    try {
	      return !!global.document.domain;
	    } catch (e) {
	      return false;
	    }
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , AjaxBasedTransport = __webpack_require__(36)
	  , XhrReceiver = __webpack_require__(40)
	  , XDRObject = __webpack_require__(46)
	  ;
	
	// According to:
	//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
	//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
	
	function XdrStreamingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
	}
	
	inherits(XdrStreamingTransport, AjaxBasedTransport);
	
	XdrStreamingTransport.enabled = function(info) {
	  if (info.cookie_needed || info.nullOrigin) {
	    return false;
	  }
	  return XDRObject.enabled && info.sameScheme;
	};
	
	XdrStreamingTransport.transportName = 'xdr-streaming';
	XdrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrStreamingTransport;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var EventEmitter = __webpack_require__(32).EventEmitter
	  , inherits = __webpack_require__(31)
	  , eventUtils = __webpack_require__(20)
	  , browser = __webpack_require__(44)
	  , urlUtils = __webpack_require__(23)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:sender:xdr');
	}
	
	// References:
	//   http://ajaxian.com/archives/100-line-ajax-wrapper
	//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
	
	function XDRObject(method, url, payload) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function() {
	    self._start(method, url, payload);
	  }, 0);
	}
	
	inherits(XDRObject, EventEmitter);
	
	XDRObject.prototype._start = function(method, url, payload) {
	  debug('_start');
	  var self = this;
	  var xdr = new global.XDomainRequest();
	  // IE caches even POSTs
	  url = urlUtils.addQuery(url, 't=' + (+new Date()));
	
	  xdr.onerror = function() {
	    debug('onerror');
	    self._error();
	  };
	  xdr.ontimeout = function() {
	    debug('ontimeout');
	    self._error();
	  };
	  xdr.onprogress = function() {
	    debug('progress', xdr.responseText);
	    self.emit('chunk', 200, xdr.responseText);
	  };
	  xdr.onload = function() {
	    debug('load');
	    self.emit('finish', 200, xdr.responseText);
	    self._cleanup(false);
	  };
	  this.xdr = xdr;
	  this.unloadRef = eventUtils.unloadAdd(function() {
	    self._cleanup(true);
	  });
	  try {
	    // Fails with AccessDenied if port number is bogus
	    this.xdr.open(method, url);
	    if (this.timeout) {
	      this.xdr.timeout = this.timeout;
	    }
	    this.xdr.send(payload);
	  } catch (x) {
	    this._error();
	  }
	};
	
	XDRObject.prototype._error = function() {
	  this.emit('finish', 0, '');
	  this._cleanup(false);
	};
	
	XDRObject.prototype._cleanup = function(abort) {
	  debug('cleanup', abort);
	  if (!this.xdr) {
	    return;
	  }
	  this.removeAllListeners();
	  eventUtils.unloadDel(this.unloadRef);
	
	  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
	  if (abort) {
	    try {
	      this.xdr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xdr = null;
	};
	
	XDRObject.prototype.close = function() {
	  debug('close');
	  this._cleanup(true);
	};
	
	// IE 8/9 if the request target uses the same scheme - #79
	XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
	
	module.exports = XDRObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , AjaxBasedTransport = __webpack_require__(36)
	  , EventSourceReceiver = __webpack_require__(48)
	  , XHRCorsObject = __webpack_require__(41)
	  , EventSourceDriver = __webpack_require__(49)
	  ;
	
	function EventSourceTransport(transUrl) {
	  if (!EventSourceTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
	}
	
	inherits(EventSourceTransport, AjaxBasedTransport);
	
	EventSourceTransport.enabled = function() {
	  return !!EventSourceDriver;
	};
	
	EventSourceTransport.transportName = 'eventsource';
	EventSourceTransport.roundTrips = 2;
	
	module.exports = EventSourceTransport;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  , EventSourceDriver = __webpack_require__(49)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:receiver:eventsource');
	}
	
	function EventSourceReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	
	  var self = this;
	  var es = this.es = new EventSourceDriver(url);
	  es.onmessage = function(e) {
	    debug('message', e.data);
	    self.emit('message', decodeURI(e.data));
	  };
	  es.onerror = function(e) {
	    debug('error', es.readyState, e);
	    // ES on reconnection has readyState = 0 or 1.
	    // on network error it's CLOSED = 2
	    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
	    self._cleanup();
	    self._close(reason);
	  };
	}
	
	inherits(EventSourceReceiver, EventEmitter);
	
	EventSourceReceiver.prototype.abort = function() {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	EventSourceReceiver.prototype._cleanup = function() {
	  debug('cleanup');
	  var es = this.es;
	  if (es) {
	    es.onmessage = es.onerror = null;
	    es.close();
	    this.es = null;
	  }
	};
	
	EventSourceReceiver.prototype._close = function(reason) {
	  debug('close', reason);
	  var self = this;
	  // Safari and chrome < 15 crash if we close window before
	  // waiting for ES cleanup. See:
	  // https://code.google.com/p/chromium/issues/detail?id=89155
	  setTimeout(function() {
	    self.emit('close', null, reason);
	    self.removeAllListeners();
	  }, 200);
	};
	
	module.exports = EventSourceReceiver;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.EventSource;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(31)
	  , IframeTransport = __webpack_require__(51)
	  , objectUtils = __webpack_require__(56)
	  ;
	
	module.exports = function(transport) {
	
	  function IframeWrapTransport(transUrl, baseUrl) {
	    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
	  }
	
	  inherits(IframeWrapTransport, IframeTransport);
	
	  IframeWrapTransport.enabled = function(url, info) {
	    if (!global.document) {
	      return false;
	    }
	
	    var iframeInfo = objectUtils.extend({}, info);
	    iframeInfo.sameOrigin = true;
	    return transport.enabled(iframeInfo) && IframeTransport.enabled();
	  };
	
	  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
	  IframeWrapTransport.needBody = true;
	  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)
	
	  IframeWrapTransport.facadeTransport = transport;
	
	  return IframeWrapTransport;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	// Few cool transports do work only for same-origin. In order to make
	// them work cross-domain we shall use iframe, served from the
	// remote domain. New browsers have capabilities to communicate with
	// cross domain iframe using postMessage(). In IE it was implemented
	// from IE 8+, but of course, IE got some details wrong:
	//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
	//    http://stevesouders.com/misc/test-postmessage.php
	
	var inherits = __webpack_require__(31)
	  , JSON3 = __webpack_require__(52)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  , version = __webpack_require__(54)
	  , urlUtils = __webpack_require__(23)
	  , iframeUtils = __webpack_require__(55)
	  , eventUtils = __webpack_require__(20)
	  , random = __webpack_require__(21)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:transport:iframe');
	}
	
	function IframeTransport(transport, transUrl, baseUrl) {
	  if (!IframeTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  EventEmitter.call(this);
	
	  var self = this;
	  this.origin = urlUtils.getOrigin(baseUrl);
	  this.baseUrl = baseUrl;
	  this.transUrl = transUrl;
	  this.transport = transport;
	  this.windowId = random.string(8);
	
	  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
	  debug(transport, transUrl, iframeUrl);
	
	  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
	    debug('err callback');
	    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
	    self.close();
	  });
	
	  this.onmessageCallback = this._message.bind(this);
	  eventUtils.attachEvent('message', this.onmessageCallback);
	}
	
	inherits(IframeTransport, EventEmitter);
	
	IframeTransport.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  if (this.iframeObj) {
	    eventUtils.detachEvent('message', this.onmessageCallback);
	    try {
	      // When the iframe is not loaded, IE raises an exception
	      // on 'contentWindow'.
	      this.postMessage('c');
	    } catch (x) {
	      // intentionally empty
	    }
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	    this.onmessageCallback = this.iframeObj = null;
	  }
	};
	
	IframeTransport.prototype._message = function(e) {
	  debug('message', e.data);
	  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
	    debug('not same origin', e.origin, this.origin);
	    return;
	  }
	
	  var iframeMessage;
	  try {
	    iframeMessage = JSON3.parse(e.data);
	  } catch (ignored) {
	    debug('bad json', e.data);
	    return;
	  }
	
	  if (iframeMessage.windowId !== this.windowId) {
	    debug('mismatched window id', iframeMessage.windowId, this.windowId);
	    return;
	  }
	
	  switch (iframeMessage.type) {
	  case 's':
	    this.iframeObj.loaded();
	    // window global dependency
	    this.postMessage('s', JSON3.stringify([
	      version
	    , this.transport
	    , this.transUrl
	    , this.baseUrl
	    ]));
	    break;
	  case 't':
	    this.emit('message', iframeMessage.data);
	    break;
	  case 'c':
	    var cdata;
	    try {
	      cdata = JSON3.parse(iframeMessage.data);
	    } catch (ignored) {
	      debug('bad json', iframeMessage.data);
	      return;
	    }
	    this.emit('close', cdata[0], cdata[1]);
	    this.close();
	    break;
	  }
	};
	
	IframeTransport.prototype.postMessage = function(type, data) {
	  debug('postMessage', type, data);
	  this.iframeObj.post(JSON3.stringify({
	    windowId: this.windowId
	  , type: type
	  , data: data || ''
	  }), this.origin);
	};
	
	IframeTransport.prototype.send = function(message) {
	  debug('send', message);
	  this.postMessage('m', message);
	};
	
	IframeTransport.enabled = function() {
	  return iframeUtils.iframeEnabled;
	};
	
	IframeTransport.transportName = 'iframe';
	IframeTransport.roundTrips = 2;
	
	module.exports = IframeTransport;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(53);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module), (function() { return this; }())))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = '1.3.0';


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var eventUtils = __webpack_require__(20)
	  , JSON3 = __webpack_require__(52)
	  , browser = __webpack_require__(44)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:utils:iframe');
	}
	
	module.exports = {
	  WPrefix: '_jp'
	, currentWindowId: null
	
	, polluteGlobalNamespace: function() {
	    if (!(module.exports.WPrefix in global)) {
	      global[module.exports.WPrefix] = {};
	    }
	  }
	
	, postMessage: function(type, data) {
	    if (global.parent !== global) {
	      global.parent.postMessage(JSON3.stringify({
	        windowId: module.exports.currentWindowId
	      , type: type
	      , data: data || ''
	      }), '*');
	    } else {
	      debug('Cannot postMessage, no parent window.', type, data);
	    }
	  }
	
	, createIframe: function(iframeUrl, errorCallback) {
	    var iframe = global.document.createElement('iframe');
	    var tref, unloadRef;
	    var unattach = function() {
	      debug('unattach');
	      clearTimeout(tref);
	      // Explorer had problems with that.
	      try {
	        iframe.onload = null;
	      } catch (x) {
	        // intentionally empty
	      }
	      iframe.onerror = null;
	    };
	    var cleanup = function() {
	      debug('cleanup');
	      if (iframe) {
	        unattach();
	        // This timeout makes chrome fire onbeforeunload event
	        // within iframe. Without the timeout it goes straight to
	        // onunload.
	        setTimeout(function() {
	          if (iframe) {
	            iframe.parentNode.removeChild(iframe);
	          }
	          iframe = null;
	        }, 0);
	        eventUtils.unloadDel(unloadRef);
	      }
	    };
	    var onerror = function(err) {
	      debug('onerror', err);
	      if (iframe) {
	        cleanup();
	        errorCallback(err);
	      }
	    };
	    var post = function(msg, origin) {
	      debug('post', msg, origin);
	      setTimeout(function() {
	        try {
	          // When the iframe is not loaded, IE raises an exception
	          // on 'contentWindow'.
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        } catch (x) {
	          // intentionally empty
	        }
	      }, 0);
	    };
	
	    iframe.src = iframeUrl;
	    iframe.style.display = 'none';
	    iframe.style.position = 'absolute';
	    iframe.onerror = function() {
	      onerror('onerror');
	    };
	    iframe.onload = function() {
	      debug('onload');
	      // `onload` is triggered before scripts on the iframe are
	      // executed. Give it few seconds to actually load stuff.
	      clearTimeout(tref);
	      tref = setTimeout(function() {
	        onerror('onload timeout');
	      }, 2000);
	    };
	    global.document.body.appendChild(iframe);
	    tref = setTimeout(function() {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post
	    , cleanup: cleanup
	    , loaded: unattach
	    };
	  }
	
	/* eslint no-undef: "off", new-cap: "off" */
	, createHtmlfile: function(iframeUrl, errorCallback) {
	    var axo = ['Active'].concat('Object').join('X');
	    var doc = new global[axo]('htmlfile');
	    var tref, unloadRef;
	    var iframe;
	    var unattach = function() {
	      clearTimeout(tref);
	      iframe.onerror = null;
	    };
	    var cleanup = function() {
	      if (doc) {
	        unattach();
	        eventUtils.unloadDel(unloadRef);
	        iframe.parentNode.removeChild(iframe);
	        iframe = doc = null;
	        CollectGarbage();
	      }
	    };
	    var onerror = function(r) {
	      debug('onerror', r);
	      if (doc) {
	        cleanup();
	        errorCallback(r);
	      }
	    };
	    var post = function(msg, origin) {
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function() {
	          if (iframe && iframe.contentWindow) {
	              iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    doc.open();
	    doc.write('<html><s' + 'cript>' +
	              'document.domain="' + global.document.domain + '";' +
	              '</s' + 'cript></html>');
	    doc.close();
	    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
	    var c = doc.createElement('div');
	    doc.body.appendChild(c);
	    iframe = doc.createElement('iframe');
	    c.appendChild(iframe);
	    iframe.src = iframeUrl;
	    iframe.onerror = function() {
	      onerror('onerror');
	    };
	    tref = setTimeout(function() {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post
	    , cleanup: cleanup
	    , loaded: unattach
	    };
	  }
	};
	
	module.exports.iframeEnabled = false;
	if (global.document) {
	  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
	  // huge delay, or not at all.
	  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
	    typeof global.postMessage === 'object') && (!browser.isKonqueror());
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
	  isObject: function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  }
	
	, extend: function(obj) {
	    if (!this.isObject(obj)) {
	      return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (Object.prototype.hasOwnProperty.call(source, prop)) {
	          obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  }
	};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , HtmlfileReceiver = __webpack_require__(58)
	  , XHRLocalObject = __webpack_require__(43)
	  , AjaxBasedTransport = __webpack_require__(36)
	  ;
	
	function HtmlFileTransport(transUrl) {
	  if (!HtmlfileReceiver.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
	}
	
	inherits(HtmlFileTransport, AjaxBasedTransport);
	
	HtmlFileTransport.enabled = function(info) {
	  return HtmlfileReceiver.enabled && info.sameOrigin;
	};
	
	HtmlFileTransport.transportName = 'htmlfile';
	HtmlFileTransport.roundTrips = 2;
	
	module.exports = HtmlFileTransport;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(31)
	  , iframeUtils = __webpack_require__(55)
	  , urlUtils = __webpack_require__(23)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  , random = __webpack_require__(21)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:receiver:htmlfile');
	}
	
	function HtmlfileReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	  iframeUtils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
	
	  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
	  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
	      iframeUtils.createHtmlfile : iframeUtils.createIframe;
	
	  global[iframeUtils.WPrefix][this.id] = {
	    start: function() {
	      debug('start');
	      self.iframeObj.loaded();
	    }
	  , message: function(data) {
	      debug('message', data);
	      self.emit('message', data);
	    }
	  , stop: function() {
	      debug('stop');
	      self._cleanup();
	      self._close('network');
	    }
	  };
	  this.iframeObj = constructFunc(url, function() {
	    debug('callback');
	    self._cleanup();
	    self._close('permanent');
	  });
	}
	
	inherits(HtmlfileReceiver, EventEmitter);
	
	HtmlfileReceiver.prototype.abort = function() {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	HtmlfileReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  if (this.iframeObj) {
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	  }
	  delete global[iframeUtils.WPrefix][this.id];
	};
	
	HtmlfileReceiver.prototype._close = function(reason) {
	  debug('_close', reason);
	  this.emit('close', null, reason);
	  this.removeAllListeners();
	};
	
	HtmlfileReceiver.htmlfileEnabled = false;
	
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (axo in global) {
	  try {
	    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
	  } catch (x) {
	    // intentionally empty
	  }
	}
	
	HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
	
	module.exports = HtmlfileReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , AjaxBasedTransport = __webpack_require__(36)
	  , XhrReceiver = __webpack_require__(40)
	  , XHRCorsObject = __webpack_require__(41)
	  , XHRLocalObject = __webpack_require__(43)
	  ;
	
	function XhrPollingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrPollingTransport, AjaxBasedTransport);
	
	XhrPollingTransport.enabled = function(info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	
	  if (XHRLocalObject.enabled && info.sameOrigin) {
	    return true;
	  }
	  return XHRCorsObject.enabled;
	};
	
	XhrPollingTransport.transportName = 'xhr-polling';
	XhrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XhrPollingTransport;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , AjaxBasedTransport = __webpack_require__(36)
	  , XdrStreamingTransport = __webpack_require__(45)
	  , XhrReceiver = __webpack_require__(40)
	  , XDRObject = __webpack_require__(46)
	  ;
	
	function XdrPollingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
	}
	
	inherits(XdrPollingTransport, AjaxBasedTransport);
	
	XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
	XdrPollingTransport.transportName = 'xdr-polling';
	XdrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrPollingTransport;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// The simplest and most robust transport, using the well-know cross
	// domain hack - JSONP. This transport is quite inefficient - one
	// message could use up to one http request. But at least it works almost
	// everywhere.
	// Known limitations:
	//   o you will get a spinning cursor
	//   o for Konqueror a dumb timer is needed to detect errors
	
	var inherits = __webpack_require__(31)
	  , SenderReceiver = __webpack_require__(37)
	  , JsonpReceiver = __webpack_require__(62)
	  , jsonpSender = __webpack_require__(63)
	  ;
	
	function JsonPTransport(transUrl) {
	  if (!JsonPTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
	}
	
	inherits(JsonPTransport, SenderReceiver);
	
	JsonPTransport.enabled = function() {
	  return !!global.document;
	};
	
	JsonPTransport.transportName = 'jsonp-polling';
	JsonPTransport.roundTrips = 1;
	JsonPTransport.needBody = true;
	
	module.exports = JsonPTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var utils = __webpack_require__(55)
	  , random = __webpack_require__(21)
	  , browser = __webpack_require__(44)
	  , urlUtils = __webpack_require__(23)
	  , inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:receiver:jsonp');
	}
	
	function JsonpReceiver(url) {
	  debug(url);
	  var self = this;
	  EventEmitter.call(this);
	
	  utils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
	
	  global[utils.WPrefix][this.id] = this._callback.bind(this);
	  this._createScript(urlWithId);
	
	  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
	  this.timeoutId = setTimeout(function() {
	    debug('timeout');
	    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
	  }, JsonpReceiver.timeout);
	}
	
	inherits(JsonpReceiver, EventEmitter);
	
	JsonpReceiver.prototype.abort = function() {
	  debug('abort');
	  if (global[utils.WPrefix][this.id]) {
	    var err = new Error('JSONP user aborted read');
	    err.code = 1000;
	    this._abort(err);
	  }
	};
	
	JsonpReceiver.timeout = 35000;
	JsonpReceiver.scriptErrorTimeout = 1000;
	
	JsonpReceiver.prototype._callback = function(data) {
	  debug('_callback', data);
	  this._cleanup();
	
	  if (this.aborting) {
	    return;
	  }
	
	  if (data) {
	    debug('message', data);
	    this.emit('message', data);
	  }
	  this.emit('close', null, 'network');
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._abort = function(err) {
	  debug('_abort', err);
	  this._cleanup();
	  this.aborting = true;
	  this.emit('close', err.code, err.message);
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  clearTimeout(this.timeoutId);
	  if (this.script2) {
	    this.script2.parentNode.removeChild(this.script2);
	    this.script2 = null;
	  }
	  if (this.script) {
	    var script = this.script;
	    // Unfortunately, you can't really abort script loading of
	    // the script.
	    script.parentNode.removeChild(script);
	    script.onreadystatechange = script.onerror =
	        script.onload = script.onclick = null;
	    this.script = null;
	  }
	  delete global[utils.WPrefix][this.id];
	};
	
	JsonpReceiver.prototype._scriptError = function() {
	  debug('_scriptError');
	  var self = this;
	  if (this.errorTimer) {
	    return;
	  }
	
	  this.errorTimer = setTimeout(function() {
	    if (!self.loadedOkay) {
	      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
	    }
	  }, JsonpReceiver.scriptErrorTimeout);
	};
	
	JsonpReceiver.prototype._createScript = function(url) {
	  debug('_createScript', url);
	  var self = this;
	  var script = this.script = global.document.createElement('script');
	  var script2;  // Opera synchronous load trick.
	
	  script.id = 'a' + random.string(8);
	  script.src = url;
	  script.type = 'text/javascript';
	  script.charset = 'UTF-8';
	  script.onerror = this._scriptError.bind(this);
	  script.onload = function() {
	    debug('onload');
	    self._abort(new Error('JSONP script loaded abnormally (onload)'));
	  };
	
	  // IE9 fires 'error' event after onreadystatechange or before, in random order.
	  // Use loadedOkay to determine if actually errored
	  script.onreadystatechange = function() {
	    debug('onreadystatechange', script.readyState);
	    if (/loaded|closed/.test(script.readyState)) {
	      if (script && script.htmlFor && script.onclick) {
	        self.loadedOkay = true;
	        try {
	          // In IE, actually execute the script.
	          script.onclick();
	        } catch (x) {
	          // intentionally empty
	        }
	      }
	      if (script) {
	        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
	      }
	    }
	  };
	  // IE: event/htmlFor/onclick trick.
	  // One can't rely on proper order for onreadystatechange. In order to
	  // make sure, set a 'htmlFor' and 'event' properties, so that
	  // script code will be installed as 'onclick' handler for the
	  // script object. Later, onreadystatechange, manually execute this
	  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
	  // set. For reference see:
	  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	  // Also, read on that about script ordering:
	  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
	  if (typeof script.async === 'undefined' && global.document.attachEvent) {
	    // According to mozilla docs, in recent browsers script.async defaults
	    // to 'true', so we may use it to detect a good browser:
	    // https://developer.mozilla.org/en/HTML/Element/script
	    if (!browser.isOpera()) {
	      // Naively assume we're in IE
	      try {
	        script.htmlFor = script.id;
	        script.event = 'onclick';
	      } catch (x) {
	        // intentionally empty
	      }
	      script.async = true;
	    } else {
	      // Opera, second sync script hack
	      script2 = this.script2 = global.document.createElement('script');
	      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
	      script.async = script2.async = false;
	    }
	  }
	  if (typeof script.async !== 'undefined') {
	    script.async = true;
	  }
	
	  var head = global.document.getElementsByTagName('head')[0];
	  head.insertBefore(script, head.firstChild);
	  if (script2) {
	    head.insertBefore(script2, head.firstChild);
	  }
	};
	
	module.exports = JsonpReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var random = __webpack_require__(21)
	  , urlUtils = __webpack_require__(23)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:sender:jsonp');
	}
	
	var form, area;
	
	function createIframe(id) {
	  debug('createIframe', id);
	  try {
	    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	    return global.document.createElement('<iframe name="' + id + '">');
	  } catch (x) {
	    var iframe = global.document.createElement('iframe');
	    iframe.name = id;
	    return iframe;
	  }
	}
	
	function createForm() {
	  debug('createForm');
	  form = global.document.createElement('form');
	  form.style.display = 'none';
	  form.style.position = 'absolute';
	  form.method = 'POST';
	  form.enctype = 'application/x-www-form-urlencoded';
	  form.acceptCharset = 'UTF-8';
	
	  area = global.document.createElement('textarea');
	  area.name = 'd';
	  form.appendChild(area);
	
	  global.document.body.appendChild(form);
	}
	
	module.exports = function(url, payload, callback) {
	  debug(url, payload);
	  if (!form) {
	    createForm();
	  }
	  var id = 'a' + random.string(8);
	  form.target = id;
	  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
	
	  var iframe = createIframe(id);
	  iframe.id = id;
	  iframe.style.display = 'none';
	  form.appendChild(iframe);
	
	  try {
	    area.value = payload;
	  } catch (e) {
	    // seriously broken browsers get here
	  }
	  form.submit();
	
	  var completed = function(err) {
	    debug('completed', id, err);
	    if (!iframe.onerror) {
	      return;
	    }
	    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
	    // Opera mini doesn't like if we GC iframe
	    // immediately, thus this timeout.
	    setTimeout(function() {
	      debug('cleaning up', id);
	      iframe.parentNode.removeChild(iframe);
	      iframe = null;
	    }, 500);
	    area.value = '';
	    // It is not possible to detect if the iframe succeeded or
	    // failed to submit our form.
	    callback(err);
	  };
	  iframe.onerror = function() {
	    debug('onerror', id);
	    completed();
	  };
	  iframe.onload = function() {
	    debug('onload', id);
	    completed();
	  };
	  iframe.onreadystatechange = function(e) {
	    debug('onreadystatechange', id, iframe.readyState, e);
	    if (iframe.readyState === 'complete') {
	      completed();
	    }
	  };
	  return function() {
	    debug('aborted', id);
	    completed(new Error('Aborted'));
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	__webpack_require__(65);
	
	var URL = __webpack_require__(24)
	  , inherits = __webpack_require__(31)
	  , JSON3 = __webpack_require__(52)
	  , random = __webpack_require__(21)
	  , escape = __webpack_require__(66)
	  , urlUtils = __webpack_require__(23)
	  , eventUtils = __webpack_require__(20)
	  , transport = __webpack_require__(67)
	  , objectUtils = __webpack_require__(56)
	  , browser = __webpack_require__(44)
	  , log = __webpack_require__(68)
	  , Event = __webpack_require__(69)
	  , EventTarget = __webpack_require__(33)
	  , loc = __webpack_require__(70)
	  , CloseEvent = __webpack_require__(71)
	  , TransportMessageEvent = __webpack_require__(72)
	  , InfoReceiver = __webpack_require__(73)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:main');
	}
	
	var transports;
	
	// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
	function SockJS(url, protocols, options) {
	  if (!(this instanceof SockJS)) {
	    return new SockJS(url, protocols, options);
	  }
	  if (arguments.length < 1) {
	    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
	  }
	  EventTarget.call(this);
	
	  this.readyState = SockJS.CONNECTING;
	  this.extensions = '';
	  this.protocol = '';
	
	  // non-standard extension
	  options = options || {};
	  if (options.protocols_whitelist) {
	    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
	  }
	  this._transportsWhitelist = options.transports;
	  this._transportOptions = options.transportOptions || {};
	
	  var sessionId = options.sessionId || 8;
	  if (typeof sessionId === 'function') {
	    this._generateSessionId = sessionId;
	  } else if (typeof sessionId === 'number') {
	    this._generateSessionId = function() {
	      return random.string(sessionId);
	    };
	  } else {
	    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
	  }
	
	  this._server = options.server || random.numberString(1000);
	
	  // Step 1 of WS spec - parse and validate the url. Issue #8
	  var parsedUrl = new URL(url);
	  if (!parsedUrl.host || !parsedUrl.protocol) {
	    throw new SyntaxError("The URL '" + url + "' is invalid");
	  } else if (parsedUrl.hash) {
	    throw new SyntaxError('The URL must not contain a fragment');
	  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
	    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
	  }
	
	  var secure = parsedUrl.protocol === 'https:';
	  // Step 2 - don't allow secure origin with an insecure protocol
	  if (loc.protocol === 'https:' && !secure) {
	    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
	  }
	
	  // Step 3 - check port access - no need here
	  // Step 4 - parse protocols argument
	  if (!protocols) {
	    protocols = [];
	  } else if (!Array.isArray(protocols)) {
	    protocols = [protocols];
	  }
	
	  // Step 5 - check protocols argument
	  var sortedProtocols = protocols.sort();
	  sortedProtocols.forEach(function(proto, i) {
	    if (!proto) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
	    }
	    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
	    }
	  });
	
	  // Step 6 - convert origin
	  var o = urlUtils.getOrigin(loc.href);
	  this._origin = o ? o.toLowerCase() : null;
	
	  // remove the trailing slash
	  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));
	
	  // store the sanitized url
	  this.url = parsedUrl.href;
	  debug('using url', this.url);
	
	  // Step 7 - start connection in background
	  // obtain server info
	  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
	  this._urlInfo = {
	    nullOrigin: !browser.hasDomain()
	  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
	  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
	  };
	
	  this._ir = new InfoReceiver(this.url, this._urlInfo);
	  this._ir.once('finish', this._receiveInfo.bind(this));
	}
	
	inherits(SockJS, EventTarget);
	
	function userSetCode(code) {
	  return code === 1000 || (code >= 3000 && code <= 4999);
	}
	
	SockJS.prototype.close = function(code, reason) {
	  // Step 1
	  if (code && !userSetCode(code)) {
	    throw new Error('InvalidAccessError: Invalid code');
	  }
	  // Step 2.4 states the max is 123 bytes, but we are just checking length
	  if (reason && reason.length > 123) {
	    throw new SyntaxError('reason argument has an invalid length');
	  }
	
	  // Step 3.1
	  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
	    return;
	  }
	
	  // TODO look at docs to determine how to set this
	  var wasClean = true;
	  this._close(code || 1000, reason || 'Normal closure', wasClean);
	};
	
	SockJS.prototype.send = function(data) {
	  // #13 - convert anything non-string to string
	  // TODO this currently turns objects into [object Object]
	  if (typeof data !== 'string') {
	    data = '' + data;
	  }
	  if (this.readyState === SockJS.CONNECTING) {
	    throw new Error('InvalidStateError: The connection has not been established yet');
	  }
	  if (this.readyState !== SockJS.OPEN) {
	    return;
	  }
	  this._transport.send(escape.quote(data));
	};
	
	SockJS.version = __webpack_require__(54);
	
	SockJS.CONNECTING = 0;
	SockJS.OPEN = 1;
	SockJS.CLOSING = 2;
	SockJS.CLOSED = 3;
	
	SockJS.prototype._receiveInfo = function(info, rtt) {
	  debug('_receiveInfo', rtt);
	  this._ir = null;
	  if (!info) {
	    this._close(1002, 'Cannot connect to server');
	    return;
	  }
	
	  // establish a round-trip timeout (RTO) based on the
	  // round-trip time (RTT)
	  this._rto = this.countRTO(rtt);
	  // allow server to override url used for the actual transport
	  this._transUrl = info.base_url ? info.base_url : this.url;
	  info = objectUtils.extend(info, this._urlInfo);
	  debug('info', info);
	  // determine list of desired and supported transports
	  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
	  this._transports = enabledTransports.main;
	  debug(this._transports.length + ' enabled transports');
	
	  this._connect();
	};
	
	SockJS.prototype._connect = function() {
	  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
	    debug('attempt', Transport.transportName);
	    if (Transport.needBody) {
	      if (!global.document.body ||
	          (typeof global.document.readyState !== 'undefined' &&
	            global.document.readyState !== 'complete' &&
	            global.document.readyState !== 'interactive')) {
	        debug('waiting for body');
	        this._transports.unshift(Transport);
	        eventUtils.attachEvent('load', this._connect.bind(this));
	        return;
	      }
	    }
	
	    // calculate timeout based on RTO and round trips. Default to 5s
	    var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
	    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
	    debug('using timeout', timeoutMs);
	
	    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
	    var options = this._transportOptions[Transport.transportName];
	    debug('transport url', transportUrl);
	    var transportObj = new Transport(transportUrl, this._transUrl, options);
	    transportObj.on('message', this._transportMessage.bind(this));
	    transportObj.once('close', this._transportClose.bind(this));
	    transportObj.transportName = Transport.transportName;
	    this._transport = transportObj;
	
	    return;
	  }
	  this._close(2000, 'All transports failed', false);
	};
	
	SockJS.prototype._transportTimeout = function() {
	  debug('_transportTimeout');
	  if (this.readyState === SockJS.CONNECTING) {
	    if (this._transport) {
	      this._transport.close();
	    }
	
	    this._transportClose(2007, 'Transport timed out');
	  }
	};
	
	SockJS.prototype._transportMessage = function(msg) {
	  debug('_transportMessage', msg);
	  var self = this
	    , type = msg.slice(0, 1)
	    , content = msg.slice(1)
	    , payload
	    ;
	
	  // first check for messages that don't need a payload
	  switch (type) {
	    case 'o':
	      this._open();
	      return;
	    case 'h':
	      this.dispatchEvent(new Event('heartbeat'));
	      debug('heartbeat', this.transport);
	      return;
	  }
	
	  if (content) {
	    try {
	      payload = JSON3.parse(content);
	    } catch (e) {
	      debug('bad json', content);
	    }
	  }
	
	  if (typeof payload === 'undefined') {
	    debug('empty payload', content);
	    return;
	  }
	
	  switch (type) {
	    case 'a':
	      if (Array.isArray(payload)) {
	        payload.forEach(function(p) {
	          debug('message', self.transport, p);
	          self.dispatchEvent(new TransportMessageEvent(p));
	        });
	      }
	      break;
	    case 'm':
	      debug('message', this.transport, payload);
	      this.dispatchEvent(new TransportMessageEvent(payload));
	      break;
	    case 'c':
	      if (Array.isArray(payload) && payload.length === 2) {
	        this._close(payload[0], payload[1], true);
	      }
	      break;
	  }
	};
	
	SockJS.prototype._transportClose = function(code, reason) {
	  debug('_transportClose', this.transport, code, reason);
	  if (this._transport) {
	    this._transport.removeAllListeners();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
	    this._connect();
	    return;
	  }
	
	  this._close(code, reason);
	};
	
	SockJS.prototype._open = function() {
	  debug('_open', this._transport.transportName, this.readyState);
	  if (this.readyState === SockJS.CONNECTING) {
	    if (this._transportTimeoutId) {
	      clearTimeout(this._transportTimeoutId);
	      this._transportTimeoutId = null;
	    }
	    this.readyState = SockJS.OPEN;
	    this.transport = this._transport.transportName;
	    this.dispatchEvent(new Event('open'));
	    debug('connected', this.transport);
	  } else {
	    // The server might have been restarted, and lost track of our
	    // connection.
	    this._close(1006, 'Server lost session');
	  }
	};
	
	SockJS.prototype._close = function(code, reason, wasClean) {
	  debug('_close', this.transport, code, reason, wasClean, this.readyState);
	  var forceFail = false;
	
	  if (this._ir) {
	    forceFail = true;
	    this._ir.close();
	    this._ir = null;
	  }
	  if (this._transport) {
	    this._transport.close();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (this.readyState === SockJS.CLOSED) {
	    throw new Error('InvalidStateError: SockJS has already been closed');
	  }
	
	  this.readyState = SockJS.CLOSING;
	  setTimeout(function() {
	    this.readyState = SockJS.CLOSED;
	
	    if (forceFail) {
	      this.dispatchEvent(new Event('error'));
	    }
	
	    var e = new CloseEvent('close');
	    e.wasClean = wasClean || false;
	    e.code = code || 1000;
	    e.reason = reason;
	
	    this.dispatchEvent(e);
	    this.onmessage = this.onclose = this.onerror = null;
	    debug('disconnected');
	  }.bind(this), 0);
	};
	
	// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
	// and RFC 2988.
	SockJS.prototype.countRTO = function(rtt) {
	  // In a local environment, when using IE8/9 and the `jsonp-polling`
	  // transport the time needed to establish a connection (the time that pass
	  // from the opening of the transport to the call of `_dispatchOpen`) is
	  // around 200msec (the lower bound used in the article above) and this
	  // causes spurious timeouts. For this reason we calculate a value slightly
	  // larger than that used in the article.
	  if (rtt > 100) {
	    return 4 * rtt; // rto > 400msec
	  }
	  return 300 + rtt; // 300msec < rto <= 400msec
	};
	
	module.exports = function(availableTransports) {
	  transports = transport(availableTransports);
	  __webpack_require__(78)(SockJS, availableTransports);
	  return SockJS;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	/* eslint-disable */
	/* jscs: disable */
	'use strict';
	
	// pulled specific shims from https://github.com/es-shims/es5-shim
	
	var ArrayPrototype = Array.prototype;
	var ObjectPrototype = Object.prototype;
	var FunctionPrototype = Function.prototype;
	var StringPrototype = String.prototype;
	var array_slice = ArrayPrototype.slice;
	
	var _toString = ObjectPrototype.toString;
	var isFunction = function (val) {
	    return ObjectPrototype.toString.call(val) === '[object Function]';
	};
	var isArray = function isArray(obj) {
	    return _toString.call(obj) === '[object Array]';
	};
	var isString = function isString(obj) {
	    return _toString.call(obj) === '[object String]';
	};
	
	var supportsDescriptors = Object.defineProperty && (function () {
	    try {
	        Object.defineProperty({}, 'x', {});
	        return true;
	    } catch (e) { /* this is ES3 */
	        return false;
	    }
	}());
	
	// Define configurable, writable and non-enumerable props
	// if they don't exist.
	var defineProperty;
	if (supportsDescriptors) {
	    defineProperty = function (object, name, method, forceAssign) {
	        if (!forceAssign && (name in object)) { return; }
	        Object.defineProperty(object, name, {
	            configurable: true,
	            enumerable: false,
	            writable: true,
	            value: method
	        });
	    };
	} else {
	    defineProperty = function (object, name, method, forceAssign) {
	        if (!forceAssign && (name in object)) { return; }
	        object[name] = method;
	    };
	}
	var defineProperties = function (object, map, forceAssign) {
	    for (var name in map) {
	        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
	          defineProperty(object, name, map[name], forceAssign);
	        }
	    }
	};
	
	var toObject = function (o) {
	    if (o == null) { // this matches both null and undefined
	        throw new TypeError("can't convert " + o + ' to object');
	    }
	    return Object(o);
	};
	
	//
	// Util
	// ======
	//
	
	// ES5 9.4
	// http://es5.github.com/#x9.4
	// http://jsperf.com/to-integer
	
	function toInteger(num) {
	    var n = +num;
	    if (n !== n) { // isNaN
	        n = 0;
	    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	    }
	    return n;
	}
	
	function ToUint32(x) {
	    return x >>> 0;
	}
	
	//
	// Function
	// ========
	//
	
	// ES-5 15.3.4.5
	// http://es5.github.com/#x15.3.4.5
	
	function Empty() {}
	
	defineProperties(FunctionPrototype, {
	    bind: function bind(that) { // .length is 1
	        // 1. Let Target be the this value.
	        var target = this;
	        // 2. If IsCallable(Target) is false, throw a TypeError exception.
	        if (!isFunction(target)) {
	            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	        }
	        // 3. Let A be a new (possibly empty) internal list of all of the
	        //   argument values provided after thisArg (arg1, arg2 etc), in order.
	        // XXX slicedArgs will stand in for "A" if used
	        var args = array_slice.call(arguments, 1); // for normal call
	        // 4. Let F be a new native ECMAScript object.
	        // 11. Set the [[Prototype]] internal property of F to the standard
	        //   built-in Function prototype object as specified in 15.3.3.1.
	        // 12. Set the [[Call]] internal property of F as described in
	        //   15.3.4.5.1.
	        // 13. Set the [[Construct]] internal property of F as described in
	        //   15.3.4.5.2.
	        // 14. Set the [[HasInstance]] internal property of F as described in
	        //   15.3.4.5.3.
	        var binder = function () {
	
	            if (this instanceof bound) {
	                // 15.3.4.5.2 [[Construct]]
	                // When the [[Construct]] internal method of a function object,
	                // F that was created using the bind function is called with a
	                // list of arguments ExtraArgs, the following steps are taken:
	                // 1. Let target be the value of F's [[TargetFunction]]
	                //   internal property.
	                // 2. If target has no [[Construct]] internal method, a
	                //   TypeError exception is thrown.
	                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Construct]] internal
	                //   method of target providing args as the arguments.
	
	                var result = target.apply(
	                    this,
	                    args.concat(array_slice.call(arguments))
	                );
	                if (Object(result) === result) {
	                    return result;
	                }
	                return this;
	
	            } else {
	                // 15.3.4.5.1 [[Call]]
	                // When the [[Call]] internal method of a function object, F,
	                // which was created using the bind function is called with a
	                // this value and a list of arguments ExtraArgs, the following
	                // steps are taken:
	                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                //   property.
	                // 3. Let target be the value of F's [[TargetFunction]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Call]] internal method
	                //   of target providing boundThis as the this value and
	                //   providing args as the arguments.
	
	                // equiv: target.call(this, ...boundArgs, ...args)
	                return target.apply(
	                    that,
	                    args.concat(array_slice.call(arguments))
	                );
	
	            }
	
	        };
	
	        // 15. If the [[Class]] internal property of Target is "Function", then
	        //     a. Let L be the length property of Target minus the length of A.
	        //     b. Set the length own property of F to either 0 or L, whichever is
	        //       larger.
	        // 16. Else set the length own property of F to 0.
	
	        var boundLength = Math.max(0, target.length - args.length);
	
	        // 17. Set the attributes of the length own property of F to the values
	        //   specified in 15.3.5.1.
	        var boundArgs = [];
	        for (var i = 0; i < boundLength; i++) {
	            boundArgs.push('$' + i);
	        }
	
	        // XXX Build a dynamic function with desired amount of arguments is the only
	        // way to set the length property of a function.
	        // In environments where Content Security Policies enabled (Chrome extensions,
	        // for ex.) all use of eval or Function costructor throws an exception.
	        // However in all of these environments Function.prototype.bind exists
	        // and so this code will never be executed.
	        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
	
	        if (target.prototype) {
	            Empty.prototype = target.prototype;
	            bound.prototype = new Empty();
	            // Clean up dangling references.
	            Empty.prototype = null;
	        }
	
	        // TODO
	        // 18. Set the [[Extensible]] internal property of F to true.
	
	        // TODO
	        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	        // 20. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	        //   false.
	        // 21. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	        //   and false.
	
	        // TODO
	        // NOTE Function objects created using Function.prototype.bind do not
	        // have a prototype property or the [[Code]], [[FormalParameters]], and
	        // [[Scope]] internal properties.
	        // XXX can't delete prototype in pure-js.
	
	        // 22. Return F.
	        return bound;
	    }
	});
	
	//
	// Array
	// =====
	//
	
	// ES5 15.4.3.2
	// http://es5.github.com/#x15.4.3.2
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	defineProperties(Array, { isArray: isArray });
	
	
	var boxedString = Object('a');
	var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
	
	var properlyBoxesContext = function properlyBoxed(method) {
	    // Check node 0.6.21 bug where third parameter is not boxed
	    var properlyBoxesNonStrict = true;
	    var properlyBoxesStrict = true;
	    if (method) {
	        method.call('foo', function (_, __, context) {
	            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
	        });
	
	        method.call([1], function () {
	            'use strict';
	            properlyBoxesStrict = typeof this === 'string';
	        }, 'x');
	    }
	    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
	};
	
	defineProperties(ArrayPrototype, {
	    forEach: function forEach(fun /*, thisp*/) {
	        var object = toObject(this),
	            self = splitString && isString(this) ? this.split('') : object,
	            thisp = arguments[1],
	            i = -1,
	            length = self.length >>> 0;
	
	        // If no callback function or if callback is not a callable function
	        if (!isFunction(fun)) {
	            throw new TypeError(); // TODO message
	        }
	
	        while (++i < length) {
	            if (i in self) {
	                // Invoke the callback function with call, passing arguments:
	                // context, property value, property key, thisArg object
	                // context
	                fun.call(thisp, self[i], i, object);
	            }
	        }
	    }
	}, !properlyBoxesContext(ArrayPrototype.forEach));
	
	// ES5 15.4.4.14
	// http://es5.github.com/#x15.4.4.14
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	defineProperties(ArrayPrototype, {
	    indexOf: function indexOf(sought /*, fromIndex */ ) {
	        var self = splitString && isString(this) ? this.split('') : toObject(this),
	            length = self.length >>> 0;
	
	        if (!length) {
	            return -1;
	        }
	
	        var i = 0;
	        if (arguments.length > 1) {
	            i = toInteger(arguments[1]);
	        }
	
	        // handle negative indices
	        i = i >= 0 ? i : Math.max(0, length + i);
	        for (; i < length; i++) {
	            if (i in self && self[i] === sought) {
	                return i;
	            }
	        }
	        return -1;
	    }
	}, hasFirefox2IndexOfBug);
	
	//
	// String
	// ======
	//
	
	// ES5 15.5.4.14
	// http://es5.github.com/#x15.5.4.14
	
	// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	// Many browsers do not split properly with regular expressions or they
	// do not perform the split correctly under obscure conditions.
	// See http://blog.stevenlevithan.com/archives/cross-browser-split
	// I've tested in many browsers and this seems to cover the deviant ones:
	//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	//       [undefined, "t", undefined, "e", ...]
	//    ''.split(/.?/) should be [], not [""]
	//    '.'.split(/()()/) should be ["."], not ["", "", "."]
	
	var string_split = StringPrototype.split;
	if (
	    'ab'.split(/(?:ab)*/).length !== 2 ||
	    '.'.split(/(.?)(.?)/).length !== 4 ||
	    'tesst'.split(/(s)*/)[1] === 't' ||
	    'test'.split(/(?:)/, -1).length !== 4 ||
	    ''.split(/.?/).length ||
	    '.'.split(/()()/).length > 1
	) {
	    (function () {
	        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group
	
	        StringPrototype.split = function (separator, limit) {
	            var string = this;
	            if (separator === void 0 && limit === 0) {
	                return [];
	            }
	
	            // If `separator` is not a regex, use native split
	            if (_toString.call(separator) !== '[object RegExp]') {
	                return string_split.call(this, separator, limit);
	            }
	
	            var output = [],
	                flags = (separator.ignoreCase ? 'i' : '') +
	                        (separator.multiline  ? 'm' : '') +
	                        (separator.extended   ? 'x' : '') + // Proposed for ES6
	                        (separator.sticky     ? 'y' : ''), // Firefox 3+
	                lastLastIndex = 0,
	                // Make `global` and avoid `lastIndex` issues by working with a copy
	                separator2, match, lastIndex, lastLength;
	            separator = new RegExp(separator.source, flags + 'g');
	            string += ''; // Type-convert
	            if (!compliantExecNpcg) {
	                // Doesn't need flags gy, but they don't hurt
	                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
	            }
	            /* Values for `limit`, per the spec:
	             * If undefined: 4294967295 // Math.pow(2, 32) - 1
	             * If 0, Infinity, or NaN: 0
	             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	             * If other: Type-convert, then use the above rules
	             */
	            limit = limit === void 0 ?
	                -1 >>> 0 : // Math.pow(2, 32) - 1
	                ToUint32(limit);
	            while (match = separator.exec(string)) {
	                // `separator.lastIndex` is not reliable cross-browser
	                lastIndex = match.index + match[0].length;
	                if (lastIndex > lastLastIndex) {
	                    output.push(string.slice(lastLastIndex, match.index));
	                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                    // nonparticipating capturing groups
	                    if (!compliantExecNpcg && match.length > 1) {
	                        match[0].replace(separator2, function () {
	                            for (var i = 1; i < arguments.length - 2; i++) {
	                                if (arguments[i] === void 0) {
	                                    match[i] = void 0;
	                                }
	                            }
	                        });
	                    }
	                    if (match.length > 1 && match.index < string.length) {
	                        ArrayPrototype.push.apply(output, match.slice(1));
	                    }
	                    lastLength = match[0].length;
	                    lastLastIndex = lastIndex;
	                    if (output.length >= limit) {
	                        break;
	                    }
	                }
	                if (separator.lastIndex === match.index) {
	                    separator.lastIndex++; // Avoid an infinite loop
	                }
	            }
	            if (lastLastIndex === string.length) {
	                if (lastLength || !separator.test('')) {
	                    output.push('');
	                }
	            } else {
	                output.push(string.slice(lastLastIndex));
	            }
	            return output.length > limit ? output.slice(0, limit) : output;
	        };
	    }());
	
	// [bugfix, chrome]
	// If separator is undefined, then the result array contains just one String,
	// which is the this value (converted to a String). If limit is not undefined,
	// then the output array is truncated so that it contains no more than limit
	// elements.
	// "0".split(undefined, 0) -> []
	} else if ('0'.split(void 0, 0).length) {
	    StringPrototype.split = function split(separator, limit) {
	        if (separator === void 0 && limit === 0) { return []; }
	        return string_split.call(this, separator, limit);
	    };
	}
	
	// ECMA-262, 3rd B.2.3
	// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	// non-normative section suggesting uniform semantics and it should be
	// normalized across all browsers
	// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	var string_substr = StringPrototype.substr;
	var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	defineProperties(StringPrototype, {
	    substr: function substr(start, length) {
	        return string_substr.call(
	            this,
	            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
	            length
	        );
	    }
	}, hasNegativeSubstrBug);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(52);
	
	// Some extra characters that Chrome gets wrong, and substitutes with
	// something else on the wire.
	// eslint-disable-next-line no-control-regex
	var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
	  , extraLookup;
	
	// This may be quite slow, so let's delay until user actually uses bad
	// characters.
	var unrollLookup = function(escapable) {
	  var i;
	  var unrolled = {};
	  var c = [];
	  for (i = 0; i < 65536; i++) {
	    c.push( String.fromCharCode(i) );
	  }
	  escapable.lastIndex = 0;
	  c.join('').replace(escapable, function(a) {
	    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    return '';
	  });
	  escapable.lastIndex = 0;
	  return unrolled;
	};
	
	// Quote string, also taking care of unicode characters that browsers
	// often break. Especially, take care of unicode surrogates:
	// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
	module.exports = {
	  quote: function(string) {
	    var quoted = JSON3.stringify(string);
	
	    // In most cases this should be very fast and good enough.
	    extraEscapable.lastIndex = 0;
	    if (!extraEscapable.test(quoted)) {
	      return quoted;
	    }
	
	    if (!extraLookup) {
	      extraLookup = unrollLookup(extraEscapable);
	    }
	
	    return quoted.replace(extraEscapable, function(a) {
	      return extraLookup[a];
	    });
	  }
	};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:utils:transport');
	}
	
	module.exports = function(availableTransports) {
	  return {
	    filterToEnabled: function(transportsWhitelist, info) {
	      var transports = {
	        main: []
	      , facade: []
	      };
	      if (!transportsWhitelist) {
	        transportsWhitelist = [];
	      } else if (typeof transportsWhitelist === 'string') {
	        transportsWhitelist = [transportsWhitelist];
	      }
	
	      availableTransports.forEach(function(trans) {
	        if (!trans) {
	          return;
	        }
	
	        if (trans.transportName === 'websocket' && info.websocket === false) {
	          debug('disabled from server', 'websocket');
	          return;
	        }
	
	        if (transportsWhitelist.length &&
	            transportsWhitelist.indexOf(trans.transportName) === -1) {
	          debug('not in whitelist', trans.transportName);
	          return;
	        }
	
	        if (trans.enabled(info)) {
	          debug('enabled', trans.transportName);
	          transports.main.push(trans);
	          if (trans.facadeTransport) {
	            transports.facade.push(trans.facadeTransport);
	          }
	        } else {
	          debug('disabled', trans.transportName);
	        }
	      });
	      return transports;
	    }
	  };
	};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var logObject = {};
	['log', 'debug', 'warn'].forEach(function (level) {
	  var levelExists;
	
	  try {
	    levelExists = global.console && global.console[level] && global.console[level].apply;
	  } catch(e) {
	    // do nothing
	  }
	
	  logObject[level] = levelExists ? function () {
	    return global.console[level].apply(global.console, arguments);
	  } : (level === 'log' ? function () {} : logObject.log);
	});
	
	module.exports = logObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	'use strict';
	
	function Event(eventType) {
	  this.type = eventType;
	}
	
	Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
	  this.type = eventType;
	  this.bubbles = canBubble;
	  this.cancelable = cancelable;
	  this.timeStamp = +new Date();
	  return this;
	};
	
	Event.prototype.stopPropagation = function() {};
	Event.prototype.preventDefault = function() {};
	
	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;
	
	module.exports = Event;


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = global.location || {
	  origin: 'http://localhost:80'
	, protocol: 'http:'
	, host: 'localhost'
	, port: 80
	, href: 'http://localhost/'
	, hash: ''
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , Event = __webpack_require__(69)
	  ;
	
	function CloseEvent() {
	  Event.call(this);
	  this.initEvent('close', false, false);
	  this.wasClean = false;
	  this.code = 0;
	  this.reason = '';
	}
	
	inherits(CloseEvent, Event);
	
	module.exports = CloseEvent;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , Event = __webpack_require__(69)
	  ;
	
	function TransportMessageEvent(data) {
	  Event.call(this);
	  this.initEvent('message', false, false);
	  this.data = data;
	}
	
	inherits(TransportMessageEvent, Event);
	
	module.exports = TransportMessageEvent;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(32).EventEmitter
	  , inherits = __webpack_require__(31)
	  , urlUtils = __webpack_require__(23)
	  , XDR = __webpack_require__(46)
	  , XHRCors = __webpack_require__(41)
	  , XHRLocal = __webpack_require__(43)
	  , XHRFake = __webpack_require__(74)
	  , InfoIframe = __webpack_require__(75)
	  , InfoAjax = __webpack_require__(77)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:info-receiver');
	}
	
	function InfoReceiver(baseUrl, urlInfo) {
	  debug(baseUrl);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function() {
	    self.doXhr(baseUrl, urlInfo);
	  }, 0);
	}
	
	inherits(InfoReceiver, EventEmitter);
	
	// TODO this is currently ignoring the list of available transports and the whitelist
	
	InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
	  // determine method of CORS support (if needed)
	  if (urlInfo.sameOrigin) {
	    return new InfoAjax(url, XHRLocal);
	  }
	  if (XHRCors.enabled) {
	    return new InfoAjax(url, XHRCors);
	  }
	  if (XDR.enabled && urlInfo.sameScheme) {
	    return new InfoAjax(url, XDR);
	  }
	  if (InfoIframe.enabled()) {
	    return new InfoIframe(baseUrl, url);
	  }
	  return new InfoAjax(url, XHRFake);
	};
	
	InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
	  var self = this
	    , url = urlUtils.addPath(baseUrl, '/info')
	    ;
	  debug('doXhr', url);
	
	  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
	
	  this.timeoutRef = setTimeout(function() {
	    debug('timeout');
	    self._cleanup(false);
	    self.emit('finish');
	  }, InfoReceiver.timeout);
	
	  this.xo.once('finish', function(info, rtt) {
	    debug('finish', info, rtt);
	    self._cleanup(true);
	    self.emit('finish', info, rtt);
	  });
	};
	
	InfoReceiver.prototype._cleanup = function(wasClean) {
	  debug('_cleanup');
	  clearTimeout(this.timeoutRef);
	  this.timeoutRef = null;
	  if (!wasClean && this.xo) {
	    this.xo.close();
	  }
	  this.xo = null;
	};
	
	InfoReceiver.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  this._cleanup(false);
	};
	
	InfoReceiver.timeout = 8000;
	
	module.exports = InfoReceiver;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(32).EventEmitter
	  , inherits = __webpack_require__(31)
	  ;
	
	function XHRFake(/* method, url, payload, opts */) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.to = setTimeout(function() {
	    self.emit('finish', 200, '{}');
	  }, XHRFake.timeout);
	}
	
	inherits(XHRFake, EventEmitter);
	
	XHRFake.prototype.close = function() {
	  clearTimeout(this.to);
	};
	
	XHRFake.timeout = 2000;
	
	module.exports = XHRFake;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var EventEmitter = __webpack_require__(32).EventEmitter
	  , inherits = __webpack_require__(31)
	  , JSON3 = __webpack_require__(52)
	  , utils = __webpack_require__(20)
	  , IframeTransport = __webpack_require__(51)
	  , InfoReceiverIframe = __webpack_require__(76)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:info-iframe');
	}
	
	function InfoIframe(baseUrl, url) {
	  var self = this;
	  EventEmitter.call(this);
	
	  var go = function() {
	    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
	
	    ifr.once('message', function(msg) {
	      if (msg) {
	        var d;
	        try {
	          d = JSON3.parse(msg);
	        } catch (e) {
	          debug('bad json', msg);
	          self.emit('finish');
	          self.close();
	          return;
	        }
	
	        var info = d[0], rtt = d[1];
	        self.emit('finish', info, rtt);
	      }
	      self.close();
	    });
	
	    ifr.once('close', function() {
	      self.emit('finish');
	      self.close();
	    });
	  };
	
	  // TODO this seems the same as the 'needBody' from transports
	  if (!global.document.body) {
	    utils.attachEvent('load', go);
	  } else {
	    go();
	  }
	}
	
	inherits(InfoIframe, EventEmitter);
	
	InfoIframe.enabled = function() {
	  return IframeTransport.enabled();
	};
	
	InfoIframe.prototype.close = function() {
	  if (this.ifr) {
	    this.ifr.close();
	  }
	  this.removeAllListeners();
	  this.ifr = null;
	};
	
	module.exports = InfoIframe;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(31)
	  , EventEmitter = __webpack_require__(32).EventEmitter
	  , JSON3 = __webpack_require__(52)
	  , XHRLocalObject = __webpack_require__(43)
	  , InfoAjax = __webpack_require__(77)
	  ;
	
	function InfoReceiverIframe(transUrl) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.ir = new InfoAjax(transUrl, XHRLocalObject);
	  this.ir.once('finish', function(info, rtt) {
	    self.ir = null;
	    self.emit('message', JSON3.stringify([info, rtt]));
	  });
	}
	
	inherits(InfoReceiverIframe, EventEmitter);
	
	InfoReceiverIframe.transportName = 'iframe-info-receiver';
	
	InfoReceiverIframe.prototype.close = function() {
	  if (this.ir) {
	    this.ir.close();
	    this.ir = null;
	  }
	  this.removeAllListeners();
	};
	
	module.exports = InfoReceiverIframe;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(32).EventEmitter
	  , inherits = __webpack_require__(31)
	  , JSON3 = __webpack_require__(52)
	  , objectUtils = __webpack_require__(56)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:info-ajax');
	}
	
	function InfoAjax(url, AjaxObject) {
	  EventEmitter.call(this);
	
	  var self = this;
	  var t0 = +new Date();
	  this.xo = new AjaxObject('GET', url);
	
	  this.xo.once('finish', function(status, text) {
	    var info, rtt;
	    if (status === 200) {
	      rtt = (+new Date()) - t0;
	      if (text) {
	        try {
	          info = JSON3.parse(text);
	        } catch (e) {
	          debug('bad json', text);
	        }
	      }
	
	      if (!objectUtils.isObject(info)) {
	        info = {};
	      }
	    }
	    self.emit('finish', info, rtt);
	    self.removeAllListeners();
	  });
	}
	
	inherits(InfoAjax, EventEmitter);
	
	InfoAjax.prototype.close = function() {
	  this.removeAllListeners();
	  this.xo.close();
	};
	
	module.exports = InfoAjax;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var urlUtils = __webpack_require__(23)
	  , eventUtils = __webpack_require__(20)
	  , JSON3 = __webpack_require__(52)
	  , FacadeJS = __webpack_require__(79)
	  , InfoIframeReceiver = __webpack_require__(76)
	  , iframeUtils = __webpack_require__(55)
	  , loc = __webpack_require__(70)
	  ;
	
	var debug = function() {};
	if (true) {
	  debug = __webpack_require__(27)('sockjs-client:iframe-bootstrap');
	}
	
	module.exports = function(SockJS, availableTransports) {
	  var transportMap = {};
	  availableTransports.forEach(function(at) {
	    if (at.facadeTransport) {
	      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
	    }
	  });
	
	  // hard-coded for the info iframe
	  // TODO see if we can make this more dynamic
	  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
	  var parentOrigin;
	
	  /* eslint-disable camelcase */
	  SockJS.bootstrap_iframe = function() {
	    /* eslint-enable camelcase */
	    var facade;
	    iframeUtils.currentWindowId = loc.hash.slice(1);
	    var onMessage = function(e) {
	      if (e.source !== parent) {
	        return;
	      }
	      if (typeof parentOrigin === 'undefined') {
	        parentOrigin = e.origin;
	      }
	      if (e.origin !== parentOrigin) {
	        return;
	      }
	
	      var iframeMessage;
	      try {
	        iframeMessage = JSON3.parse(e.data);
	      } catch (ignored) {
	        debug('bad json', e.data);
	        return;
	      }
	
	      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
	        return;
	      }
	      switch (iframeMessage.type) {
	      case 's':
	        var p;
	        try {
	          p = JSON3.parse(iframeMessage.data);
	        } catch (ignored) {
	          debug('bad json', iframeMessage.data);
	          break;
	        }
	        var version = p[0];
	        var transport = p[1];
	        var transUrl = p[2];
	        var baseUrl = p[3];
	        debug(version, transport, transUrl, baseUrl);
	        // change this to semver logic
	        if (version !== SockJS.version) {
	          throw new Error('Incompatible SockJS! Main site uses:' +
	                    ' "' + version + '", the iframe:' +
	                    ' "' + SockJS.version + '".');
	        }
	
	        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
	            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
	          throw new Error('Can\'t connect to different domain from within an ' +
	                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
	        }
	        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
	        break;
	      case 'm':
	        facade._send(iframeMessage.data);
	        break;
	      case 'c':
	        if (facade) {
	          facade._close();
	        }
	        facade = null;
	        break;
	      }
	    };
	
	    eventUtils.attachEvent('message', onMessage);
	
	    // Start
	    iframeUtils.postMessage('s');
	  };
	};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(52)
	  , iframeUtils = __webpack_require__(55)
	  ;
	
	function FacadeJS(transport) {
	  this._transport = transport;
	  transport.on('message', this._transportMessage.bind(this));
	  transport.on('close', this._transportClose.bind(this));
	}
	
	FacadeJS.prototype._transportClose = function(code, reason) {
	  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
	};
	FacadeJS.prototype._transportMessage = function(frame) {
	  iframeUtils.postMessage('t', frame);
	};
	FacadeJS.prototype._send = function(data) {
	  this._transport.send(data);
	};
	FacadeJS.prototype._close = function() {
	  this._transport.close();
	  this._transport.removeAllListeners();
	};
	
	module.exports = FacadeJS;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}
	
				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}
	
				if(!upToDate()) {
					check();
				}
	
				__webpack_require__(81)(updatedModules, updatedModules);
	
				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}
	
			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(83);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _contentscript = __webpack_require__(86);
	
	var _contentscript2 = _interopRequireDefault(_contentscript);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var el = document.createElement('div');
	document.body.appendChild(el);
	var app = new _vue2.default({
	  render: function render(createElement) {
	    return createElement(_contentscript2.default);
	  }
	});
	app.$mount(el);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
	 * Vue.js v2.6.8
	 * (c) 2014-2019 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global = global || self, global.Vue = factory());
	}(this, function () { 'use strict';
	
	  /*  */
	
	  var emptyObject = Object.freeze({});
	
	  // These helpers produce better VM code in JS engines due to their
	  // explicitness and function inlining.
	  function isUndef (v) {
	    return v === undefined || v === null
	  }
	
	  function isDef (v) {
	    return v !== undefined && v !== null
	  }
	
	  function isTrue (v) {
	    return v === true
	  }
	
	  function isFalse (v) {
	    return v === false
	  }
	
	  /**
	   * Check if value is primitive.
	   */
	  function isPrimitive (value) {
	    return (
	      typeof value === 'string' ||
	      typeof value === 'number' ||
	      // $flow-disable-line
	      typeof value === 'symbol' ||
	      typeof value === 'boolean'
	    )
	  }
	
	  /**
	   * Quick object check - this is primarily used to tell
	   * Objects from primitive values when we know the value
	   * is a JSON-compliant type.
	   */
	  function isObject (obj) {
	    return obj !== null && typeof obj === 'object'
	  }
	
	  /**
	   * Get the raw type string of a value, e.g., [object Object].
	   */
	  var _toString = Object.prototype.toString;
	
	  function toRawType (value) {
	    return _toString.call(value).slice(8, -1)
	  }
	
	  /**
	   * Strict object type check. Only returns true
	   * for plain JavaScript objects.
	   */
	  function isPlainObject (obj) {
	    return _toString.call(obj) === '[object Object]'
	  }
	
	  function isRegExp (v) {
	    return _toString.call(v) === '[object RegExp]'
	  }
	
	  /**
	   * Check if val is a valid array index.
	   */
	  function isValidArrayIndex (val) {
	    var n = parseFloat(String(val));
	    return n >= 0 && Math.floor(n) === n && isFinite(val)
	  }
	
	  function isPromise (val) {
	    return (
	      isDef(val) &&
	      typeof val.then === 'function' &&
	      typeof val.catch === 'function'
	    )
	  }
	
	  /**
	   * Convert a value to a string that is actually rendered.
	   */
	  function toString (val) {
	    return val == null
	      ? ''
	      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
	        ? JSON.stringify(val, null, 2)
	        : String(val)
	  }
	
	  /**
	   * Convert an input value to a number for persistence.
	   * If the conversion fails, return original string.
	   */
	  function toNumber (val) {
	    var n = parseFloat(val);
	    return isNaN(n) ? val : n
	  }
	
	  /**
	   * Make a map and return a function for checking if a key
	   * is in that map.
	   */
	  function makeMap (
	    str,
	    expectsLowerCase
	  ) {
	    var map = Object.create(null);
	    var list = str.split(',');
	    for (var i = 0; i < list.length; i++) {
	      map[list[i]] = true;
	    }
	    return expectsLowerCase
	      ? function (val) { return map[val.toLowerCase()]; }
	      : function (val) { return map[val]; }
	  }
	
	  /**
	   * Check if a tag is a built-in tag.
	   */
	  var isBuiltInTag = makeMap('slot,component', true);
	
	  /**
	   * Check if an attribute is a reserved attribute.
	   */
	  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
	
	  /**
	   * Remove an item from an array.
	   */
	  function remove (arr, item) {
	    if (arr.length) {
	      var index = arr.indexOf(item);
	      if (index > -1) {
	        return arr.splice(index, 1)
	      }
	    }
	  }
	
	  /**
	   * Check whether an object has the property.
	   */
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  function hasOwn (obj, key) {
	    return hasOwnProperty.call(obj, key)
	  }
	
	  /**
	   * Create a cached version of a pure function.
	   */
	  function cached (fn) {
	    var cache = Object.create(null);
	    return (function cachedFn (str) {
	      var hit = cache[str];
	      return hit || (cache[str] = fn(str))
	    })
	  }
	
	  /**
	   * Camelize a hyphen-delimited string.
	   */
	  var camelizeRE = /-(\w)/g;
	  var camelize = cached(function (str) {
	    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	  });
	
	  /**
	   * Capitalize a string.
	   */
	  var capitalize = cached(function (str) {
	    return str.charAt(0).toUpperCase() + str.slice(1)
	  });
	
	  /**
	   * Hyphenate a camelCase string.
	   */
	  var hyphenateRE = /\B([A-Z])/g;
	  var hyphenate = cached(function (str) {
	    return str.replace(hyphenateRE, '-$1').toLowerCase()
	  });
	
	  /**
	   * Simple bind polyfill for environments that do not support it,
	   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
	   * since native bind is now performant enough in most browsers.
	   * But removing it would mean breaking code that was able to run in
	   * PhantomJS 1.x, so this must be kept for backward compatibility.
	   */
	
	  /* istanbul ignore next */
	  function polyfillBind (fn, ctx) {
	    function boundFn (a) {
	      var l = arguments.length;
	      return l
	        ? l > 1
	          ? fn.apply(ctx, arguments)
	          : fn.call(ctx, a)
	        : fn.call(ctx)
	    }
	
	    boundFn._length = fn.length;
	    return boundFn
	  }
	
	  function nativeBind (fn, ctx) {
	    return fn.bind(ctx)
	  }
	
	  var bind = Function.prototype.bind
	    ? nativeBind
	    : polyfillBind;
	
	  /**
	   * Convert an Array-like object to a real Array.
	   */
	  function toArray (list, start) {
	    start = start || 0;
	    var i = list.length - start;
	    var ret = new Array(i);
	    while (i--) {
	      ret[i] = list[i + start];
	    }
	    return ret
	  }
	
	  /**
	   * Mix properties into target object.
	   */
	  function extend (to, _from) {
	    for (var key in _from) {
	      to[key] = _from[key];
	    }
	    return to
	  }
	
	  /**
	   * Merge an Array of Objects into a single Object.
	   */
	  function toObject (arr) {
	    var res = {};
	    for (var i = 0; i < arr.length; i++) {
	      if (arr[i]) {
	        extend(res, arr[i]);
	      }
	    }
	    return res
	  }
	
	  /* eslint-disable no-unused-vars */
	
	  /**
	   * Perform no operation.
	   * Stubbing args to make Flow happy without leaving useless transpiled code
	   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
	   */
	  function noop (a, b, c) {}
	
	  /**
	   * Always return false.
	   */
	  var no = function (a, b, c) { return false; };
	
	  /* eslint-enable no-unused-vars */
	
	  /**
	   * Return the same value.
	   */
	  var identity = function (_) { return _; };
	
	  /**
	   * Generate a string containing static keys from compiler modules.
	   */
	  function genStaticKeys (modules) {
	    return modules.reduce(function (keys, m) {
	      return keys.concat(m.staticKeys || [])
	    }, []).join(',')
	  }
	
	  /**
	   * Check if two values are loosely equal - that is,
	   * if they are plain objects, do they have the same shape?
	   */
	  function looseEqual (a, b) {
	    if (a === b) { return true }
	    var isObjectA = isObject(a);
	    var isObjectB = isObject(b);
	    if (isObjectA && isObjectB) {
	      try {
	        var isArrayA = Array.isArray(a);
	        var isArrayB = Array.isArray(b);
	        if (isArrayA && isArrayB) {
	          return a.length === b.length && a.every(function (e, i) {
	            return looseEqual(e, b[i])
	          })
	        } else if (a instanceof Date && b instanceof Date) {
	          return a.getTime() === b.getTime()
	        } else if (!isArrayA && !isArrayB) {
	          var keysA = Object.keys(a);
	          var keysB = Object.keys(b);
	          return keysA.length === keysB.length && keysA.every(function (key) {
	            return looseEqual(a[key], b[key])
	          })
	        } else {
	          /* istanbul ignore next */
	          return false
	        }
	      } catch (e) {
	        /* istanbul ignore next */
	        return false
	      }
	    } else if (!isObjectA && !isObjectB) {
	      return String(a) === String(b)
	    } else {
	      return false
	    }
	  }
	
	  /**
	   * Return the first index at which a loosely equal value can be
	   * found in the array (if value is a plain object, the array must
	   * contain an object of the same shape), or -1 if it is not present.
	   */
	  function looseIndexOf (arr, val) {
	    for (var i = 0; i < arr.length; i++) {
	      if (looseEqual(arr[i], val)) { return i }
	    }
	    return -1
	  }
	
	  /**
	   * Ensure a function is called only once.
	   */
	  function once (fn) {
	    var called = false;
	    return function () {
	      if (!called) {
	        called = true;
	        fn.apply(this, arguments);
	      }
	    }
	  }
	
	  var SSR_ATTR = 'data-server-rendered';
	
	  var ASSET_TYPES = [
	    'component',
	    'directive',
	    'filter'
	  ];
	
	  var LIFECYCLE_HOOKS = [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated',
	    'errorCaptured',
	    'serverPrefetch'
	  ];
	
	  /*  */
	
	
	
	  var config = ({
	    /**
	     * Option merge strategies (used in core/util/options)
	     */
	    // $flow-disable-line
	    optionMergeStrategies: Object.create(null),
	
	    /**
	     * Whether to suppress warnings.
	     */
	    silent: false,
	
	    /**
	     * Show production mode tip message on boot?
	     */
	    productionTip: "development" !== 'production',
	
	    /**
	     * Whether to enable devtools
	     */
	    devtools: "development" !== 'production',
	
	    /**
	     * Whether to record perf
	     */
	    performance: false,
	
	    /**
	     * Error handler for watcher errors
	     */
	    errorHandler: null,
	
	    /**
	     * Warn handler for watcher warns
	     */
	    warnHandler: null,
	
	    /**
	     * Ignore certain custom elements
	     */
	    ignoredElements: [],
	
	    /**
	     * Custom user key aliases for v-on
	     */
	    // $flow-disable-line
	    keyCodes: Object.create(null),
	
	    /**
	     * Check if a tag is reserved so that it cannot be registered as a
	     * component. This is platform-dependent and may be overwritten.
	     */
	    isReservedTag: no,
	
	    /**
	     * Check if an attribute is reserved so that it cannot be used as a component
	     * prop. This is platform-dependent and may be overwritten.
	     */
	    isReservedAttr: no,
	
	    /**
	     * Check if a tag is an unknown element.
	     * Platform-dependent.
	     */
	    isUnknownElement: no,
	
	    /**
	     * Get the namespace of an element
	     */
	    getTagNamespace: noop,
	
	    /**
	     * Parse the real tag name for the specific platform.
	     */
	    parsePlatformTagName: identity,
	
	    /**
	     * Check if an attribute must be bound using property, e.g. value
	     * Platform-dependent.
	     */
	    mustUseProp: no,
	
	    /**
	     * Perform updates asynchronously. Intended to be used by Vue Test Utils
	     * This will significantly reduce performance if set to false.
	     */
	    async: true,
	
	    /**
	     * Exposed for legacy reasons
	     */
	    _lifecycleHooks: LIFECYCLE_HOOKS
	  });
	
	  /*  */
	
	  /**
	   * unicode letters used for parsing html tags, component names and property paths.
	   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
	   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
	   */
	  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
	
	  /**
	   * Check if a string starts with $ or _
	   */
	  function isReserved (str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5F
	  }
	
	  /**
	   * Define a property.
	   */
	  function def (obj, key, val, enumerable) {
	    Object.defineProperty(obj, key, {
	      value: val,
	      enumerable: !!enumerable,
	      writable: true,
	      configurable: true
	    });
	  }
	
	  /**
	   * Parse simple path.
	   */
	  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
	  function parsePath (path) {
	    if (bailRE.test(path)) {
	      return
	    }
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	
	  /*  */
	
	  // can we use __proto__?
	  var hasProto = '__proto__' in {};
	
	  // Browser environment sniffing
	  var inBrowser = typeof window !== 'undefined';
	  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
	  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
	  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	  var isIE = UA && /msie|trident/.test(UA);
	  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	  var isEdge = UA && UA.indexOf('edge/') > 0;
	  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
	  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
	  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	  var isPhantomJS = UA && /phantomjs/.test(UA);
	  var isFF = UA && UA.match(/firefox\/(\d+)/);
	
	  // Firefox has a "watch" function on Object.prototype...
	  var nativeWatch = ({}).watch;
	
	  var supportsPassive = false;
	  if (inBrowser) {
	    try {
	      var opts = {};
	      Object.defineProperty(opts, 'passive', ({
	        get: function get () {
	          /* istanbul ignore next */
	          supportsPassive = true;
	        }
	      })); // https://github.com/facebook/flow/issues/285
	      window.addEventListener('test-passive', null, opts);
	    } catch (e) {}
	  }
	
	  // this needs to be lazy-evaled because vue may be required before
	  // vue-server-renderer can set VUE_ENV
	  var _isServer;
	  var isServerRendering = function () {
	    if (_isServer === undefined) {
	      /* istanbul ignore if */
	      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
	        // detect presence of vue-server-renderer and avoid
	        // Webpack shimming the process
	        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
	      } else {
	        _isServer = false;
	      }
	    }
	    return _isServer
	  };
	
	  // detect devtools
	  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	  /* istanbul ignore next */
	  function isNative (Ctor) {
	    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	  }
	
	  var hasSymbol =
	    typeof Symbol !== 'undefined' && isNative(Symbol) &&
	    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
	
	  var _Set;
	  /* istanbul ignore if */ // $flow-disable-line
	  if (typeof Set !== 'undefined' && isNative(Set)) {
	    // use native Set when available.
	    _Set = Set;
	  } else {
	    // a non-standard Set polyfill that only works with primitive keys.
	    _Set = /*@__PURE__*/(function () {
	      function Set () {
	        this.set = Object.create(null);
	      }
	      Set.prototype.has = function has (key) {
	        return this.set[key] === true
	      };
	      Set.prototype.add = function add (key) {
	        this.set[key] = true;
	      };
	      Set.prototype.clear = function clear () {
	        this.set = Object.create(null);
	      };
	
	      return Set;
	    }());
	  }
	
	  /*  */
	
	  var warn = noop;
	  var tip = noop;
	  var generateComponentTrace = (noop); // work around flow check
	  var formatComponentName = (noop);
	
	  {
	    var hasConsole = typeof console !== 'undefined';
	    var classifyRE = /(?:^|[-_])(\w)/g;
	    var classify = function (str) { return str
	      .replace(classifyRE, function (c) { return c.toUpperCase(); })
	      .replace(/[-_]/g, ''); };
	
	    warn = function (msg, vm) {
	      var trace = vm ? generateComponentTrace(vm) : '';
	
	      if (config.warnHandler) {
	        config.warnHandler.call(null, msg, vm, trace);
	      } else if (hasConsole && (!config.silent)) {
	        console.error(("[Vue warn]: " + msg + trace));
	      }
	    };
	
	    tip = function (msg, vm) {
	      if (hasConsole && (!config.silent)) {
	        console.warn("[Vue tip]: " + msg + (
	          vm ? generateComponentTrace(vm) : ''
	        ));
	      }
	    };
	
	    formatComponentName = function (vm, includeFile) {
	      if (vm.$root === vm) {
	        return '<Root>'
	      }
	      var options = typeof vm === 'function' && vm.cid != null
	        ? vm.options
	        : vm._isVue
	          ? vm.$options || vm.constructor.options
	          : vm;
	      var name = options.name || options._componentTag;
	      var file = options.__file;
	      if (!name && file) {
	        var match = file.match(/([^/\\]+)\.vue$/);
	        name = match && match[1];
	      }
	
	      return (
	        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	        (file && includeFile !== false ? (" at " + file) : '')
	      )
	    };
	
	    var repeat = function (str, n) {
	      var res = '';
	      while (n) {
	        if (n % 2 === 1) { res += str; }
	        if (n > 1) { str += str; }
	        n >>= 1;
	      }
	      return res
	    };
	
	    generateComponentTrace = function (vm) {
	      if (vm._isVue && vm.$parent) {
	        var tree = [];
	        var currentRecursiveSequence = 0;
	        while (vm) {
	          if (tree.length > 0) {
	            var last = tree[tree.length - 1];
	            if (last.constructor === vm.constructor) {
	              currentRecursiveSequence++;
	              vm = vm.$parent;
	              continue
	            } else if (currentRecursiveSequence > 0) {
	              tree[tree.length - 1] = [last, currentRecursiveSequence];
	              currentRecursiveSequence = 0;
	            }
	          }
	          tree.push(vm);
	          vm = vm.$parent;
	        }
	        return '\n\nfound in\n\n' + tree
	          .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
	              ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
	              : formatComponentName(vm))); })
	          .join('\n')
	      } else {
	        return ("\n\n(found in " + (formatComponentName(vm)) + ")")
	      }
	    };
	  }
	
	  /*  */
	
	  var uid = 0;
	
	  /**
	   * A dep is an observable that can have multiple
	   * directives subscribing to it.
	   */
	  var Dep = function Dep () {
	    this.id = uid++;
	    this.subs = [];
	  };
	
	  Dep.prototype.addSub = function addSub (sub) {
	    this.subs.push(sub);
	  };
	
	  Dep.prototype.removeSub = function removeSub (sub) {
	    remove(this.subs, sub);
	  };
	
	  Dep.prototype.depend = function depend () {
	    if (Dep.target) {
	      Dep.target.addDep(this);
	    }
	  };
	
	  Dep.prototype.notify = function notify () {
	    // stabilize the subscriber list first
	    var subs = this.subs.slice();
	    if (!config.async) {
	      // subs aren't sorted in scheduler if not running async
	      // we need to sort them now to make sure they fire in correct
	      // order
	      subs.sort(function (a, b) { return a.id - b.id; });
	    }
	    for (var i = 0, l = subs.length; i < l; i++) {
	      subs[i].update();
	    }
	  };
	
	  // The current target watcher being evaluated.
	  // This is globally unique because only one watcher
	  // can be evaluated at a time.
	  Dep.target = null;
	  var targetStack = [];
	
	  function pushTarget (target) {
	    targetStack.push(target);
	    Dep.target = target;
	  }
	
	  function popTarget () {
	    targetStack.pop();
	    Dep.target = targetStack[targetStack.length - 1];
	  }
	
	  /*  */
	
	  var VNode = function VNode (
	    tag,
	    data,
	    children,
	    text,
	    elm,
	    context,
	    componentOptions,
	    asyncFactory
	  ) {
	    this.tag = tag;
	    this.data = data;
	    this.children = children;
	    this.text = text;
	    this.elm = elm;
	    this.ns = undefined;
	    this.context = context;
	    this.fnContext = undefined;
	    this.fnOptions = undefined;
	    this.fnScopeId = undefined;
	    this.key = data && data.key;
	    this.componentOptions = componentOptions;
	    this.componentInstance = undefined;
	    this.parent = undefined;
	    this.raw = false;
	    this.isStatic = false;
	    this.isRootInsert = true;
	    this.isComment = false;
	    this.isCloned = false;
	    this.isOnce = false;
	    this.asyncFactory = asyncFactory;
	    this.asyncMeta = undefined;
	    this.isAsyncPlaceholder = false;
	  };
	
	  var prototypeAccessors = { child: { configurable: true } };
	
	  // DEPRECATED: alias for componentInstance for backwards compat.
	  /* istanbul ignore next */
	  prototypeAccessors.child.get = function () {
	    return this.componentInstance
	  };
	
	  Object.defineProperties( VNode.prototype, prototypeAccessors );
	
	  var createEmptyVNode = function (text) {
	    if ( text === void 0 ) text = '';
	
	    var node = new VNode();
	    node.text = text;
	    node.isComment = true;
	    return node
	  };
	
	  function createTextVNode (val) {
	    return new VNode(undefined, undefined, undefined, String(val))
	  }
	
	  // optimized shallow clone
	  // used for static nodes and slot nodes because they may be reused across
	  // multiple renders, cloning them avoids errors when DOM manipulations rely
	  // on their elm reference.
	  function cloneVNode (vnode) {
	    var cloned = new VNode(
	      vnode.tag,
	      vnode.data,
	      // #7975
	      // clone children array to avoid mutating original in case of cloning
	      // a child.
	      vnode.children && vnode.children.slice(),
	      vnode.text,
	      vnode.elm,
	      vnode.context,
	      vnode.componentOptions,
	      vnode.asyncFactory
	    );
	    cloned.ns = vnode.ns;
	    cloned.isStatic = vnode.isStatic;
	    cloned.key = vnode.key;
	    cloned.isComment = vnode.isComment;
	    cloned.fnContext = vnode.fnContext;
	    cloned.fnOptions = vnode.fnOptions;
	    cloned.fnScopeId = vnode.fnScopeId;
	    cloned.asyncMeta = vnode.asyncMeta;
	    cloned.isCloned = true;
	    return cloned
	  }
	
	  /*
	   * not type checking this file because flow doesn't play well with
	   * dynamically accessing methods on Array prototype
	   */
	
	  var arrayProto = Array.prototype;
	  var arrayMethods = Object.create(arrayProto);
	
	  var methodsToPatch = [
	    'push',
	    'pop',
	    'shift',
	    'unshift',
	    'splice',
	    'sort',
	    'reverse'
	  ];
	
	  /**
	   * Intercept mutating methods and emit events
	   */
	  methodsToPatch.forEach(function (method) {
	    // cache original method
	    var original = arrayProto[method];
	    def(arrayMethods, method, function mutator () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      var result = original.apply(this, args);
	      var ob = this.__ob__;
	      var inserted;
	      switch (method) {
	        case 'push':
	        case 'unshift':
	          inserted = args;
	          break
	        case 'splice':
	          inserted = args.slice(2);
	          break
	      }
	      if (inserted) { ob.observeArray(inserted); }
	      // notify change
	      ob.dep.notify();
	      return result
	    });
	  });
	
	  /*  */
	
	  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	  /**
	   * In some cases we may want to disable observation inside a component's
	   * update computation.
	   */
	  var shouldObserve = true;
	
	  function toggleObserving (value) {
	    shouldObserve = value;
	  }
	
	  /**
	   * Observer class that is attached to each observed
	   * object. Once attached, the observer converts the target
	   * object's property keys into getter/setters that
	   * collect dependencies and dispatch updates.
	   */
	  var Observer = function Observer (value) {
	    this.value = value;
	    this.dep = new Dep();
	    this.vmCount = 0;
	    def(value, '__ob__', this);
	    if (Array.isArray(value)) {
	      if (hasProto) {
	        protoAugment(value, arrayMethods);
	      } else {
	        copyAugment(value, arrayMethods, arrayKeys);
	      }
	      this.observeArray(value);
	    } else {
	      this.walk(value);
	    }
	  };
	
	  /**
	   * Walk through all properties and convert them into
	   * getter/setters. This method should only be called when
	   * value type is Object.
	   */
	  Observer.prototype.walk = function walk (obj) {
	    var keys = Object.keys(obj);
	    for (var i = 0; i < keys.length; i++) {
	      defineReactive$$1(obj, keys[i]);
	    }
	  };
	
	  /**
	   * Observe a list of Array items.
	   */
	  Observer.prototype.observeArray = function observeArray (items) {
	    for (var i = 0, l = items.length; i < l; i++) {
	      observe(items[i]);
	    }
	  };
	
	  // helpers
	
	  /**
	   * Augment a target Object or Array by intercepting
	   * the prototype chain using __proto__
	   */
	  function protoAugment (target, src) {
	    /* eslint-disable no-proto */
	    target.__proto__ = src;
	    /* eslint-enable no-proto */
	  }
	
	  /**
	   * Augment a target Object or Array by defining
	   * hidden properties.
	   */
	  /* istanbul ignore next */
	  function copyAugment (target, src, keys) {
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      def(target, key, src[key]);
	    }
	  }
	
	  /**
	   * Attempt to create an observer instance for a value,
	   * returns the new observer if successfully observed,
	   * or the existing observer if the value already has one.
	   */
	  function observe (value, asRootData) {
	    if (!isObject(value) || value instanceof VNode) {
	      return
	    }
	    var ob;
	    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	      ob = value.__ob__;
	    } else if (
	      shouldObserve &&
	      !isServerRendering() &&
	      (Array.isArray(value) || isPlainObject(value)) &&
	      Object.isExtensible(value) &&
	      !value._isVue
	    ) {
	      ob = new Observer(value);
	    }
	    if (asRootData && ob) {
	      ob.vmCount++;
	    }
	    return ob
	  }
	
	  /**
	   * Define a reactive property on an Object.
	   */
	  function defineReactive$$1 (
	    obj,
	    key,
	    val,
	    customSetter,
	    shallow
	  ) {
	    var dep = new Dep();
	
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return
	    }
	
	    // cater for pre-defined getter/setters
	    var getter = property && property.get;
	    var setter = property && property.set;
	    if ((!getter || setter) && arguments.length === 2) {
	      val = obj[key];
	    }
	
	    var childOb = !shallow && observe(val);
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      configurable: true,
	      get: function reactiveGetter () {
	        var value = getter ? getter.call(obj) : val;
	        if (Dep.target) {
	          dep.depend();
	          if (childOb) {
	            childOb.dep.depend();
	            if (Array.isArray(value)) {
	              dependArray(value);
	            }
	          }
	        }
	        return value
	      },
	      set: function reactiveSetter (newVal) {
	        var value = getter ? getter.call(obj) : val;
	        /* eslint-disable no-self-compare */
	        if (newVal === value || (newVal !== newVal && value !== value)) {
	          return
	        }
	        /* eslint-enable no-self-compare */
	        if (customSetter) {
	          customSetter();
	        }
	        // #7981: for accessor properties without setter
	        if (getter && !setter) { return }
	        if (setter) {
	          setter.call(obj, newVal);
	        } else {
	          val = newVal;
	        }
	        childOb = !shallow && observe(newVal);
	        dep.notify();
	      }
	    });
	  }
	
	  /**
	   * Set a property on an object. Adds the new property and
	   * triggers change notification if the property doesn't
	   * already exist.
	   */
	  function set (target, key, val) {
	    if (isUndef(target) || isPrimitive(target)
	    ) {
	      warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
	    }
	    if (Array.isArray(target) && isValidArrayIndex(key)) {
	      target.length = Math.max(target.length, key);
	      target.splice(key, 1, val);
	      return val
	    }
	    if (key in target && !(key in Object.prototype)) {
	      target[key] = val;
	      return val
	    }
	    var ob = (target).__ob__;
	    if (target._isVue || (ob && ob.vmCount)) {
	      warn(
	        'Avoid adding reactive properties to a Vue instance or its root $data ' +
	        'at runtime - declare it upfront in the data option.'
	      );
	      return val
	    }
	    if (!ob) {
	      target[key] = val;
	      return val
	    }
	    defineReactive$$1(ob.value, key, val);
	    ob.dep.notify();
	    return val
	  }
	
	  /**
	   * Delete a property and trigger change if necessary.
	   */
	  function del (target, key) {
	    if (isUndef(target) || isPrimitive(target)
	    ) {
	      warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
	    }
	    if (Array.isArray(target) && isValidArrayIndex(key)) {
	      target.splice(key, 1);
	      return
	    }
	    var ob = (target).__ob__;
	    if (target._isVue || (ob && ob.vmCount)) {
	      warn(
	        'Avoid deleting properties on a Vue instance or its root $data ' +
	        '- just set it to null.'
	      );
	      return
	    }
	    if (!hasOwn(target, key)) {
	      return
	    }
	    delete target[key];
	    if (!ob) {
	      return
	    }
	    ob.dep.notify();
	  }
	
	  /**
	   * Collect dependencies on array elements when the array is touched, since
	   * we cannot intercept array element access like property getters.
	   */
	  function dependArray (value) {
	    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	      e = value[i];
	      e && e.__ob__ && e.__ob__.dep.depend();
	      if (Array.isArray(e)) {
	        dependArray(e);
	      }
	    }
	  }
	
	  /*  */
	
	  /**
	   * Option overwriting strategies are functions that handle
	   * how to merge a parent option value and a child option
	   * value into the final value.
	   */
	  var strats = config.optionMergeStrategies;
	
	  /**
	   * Options with restrictions
	   */
	  {
	    strats.el = strats.propsData = function (parent, child, vm, key) {
	      if (!vm) {
	        warn(
	          "option \"" + key + "\" can only be used during instance " +
	          'creation with the `new` keyword.'
	        );
	      }
	      return defaultStrat(parent, child)
	    };
	  }
	
	  /**
	   * Helper that recursively merges two data objects together.
	   */
	  function mergeData (to, from) {
	    if (!from) { return to }
	    var key, toVal, fromVal;
	
	    var keys = hasSymbol
	      ? Reflect.ownKeys(from)
	      : Object.keys(from);
	
	    for (var i = 0; i < keys.length; i++) {
	      key = keys[i];
	      // in case the object is already observed...
	      if (key === '__ob__') { continue }
	      toVal = to[key];
	      fromVal = from[key];
	      if (!hasOwn(to, key)) {
	        set(to, key, fromVal);
	      } else if (
	        toVal !== fromVal &&
	        isPlainObject(toVal) &&
	        isPlainObject(fromVal)
	      ) {
	        mergeData(toVal, fromVal);
	      }
	    }
	    return to
	  }
	
	  /**
	   * Data
	   */
	  function mergeDataOrFn (
	    parentVal,
	    childVal,
	    vm
	  ) {
	    if (!vm) {
	      // in a Vue.extend merge, both should be functions
	      if (!childVal) {
	        return parentVal
	      }
	      if (!parentVal) {
	        return childVal
	      }
	      // when parentVal & childVal are both present,
	      // we need to return a function that returns the
	      // merged result of both functions... no need to
	      // check if parentVal is a function here because
	      // it has to be a function to pass previous merges.
	      return function mergedDataFn () {
	        return mergeData(
	          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
	          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
	        )
	      }
	    } else {
	      return function mergedInstanceDataFn () {
	        // instance merge
	        var instanceData = typeof childVal === 'function'
	          ? childVal.call(vm, vm)
	          : childVal;
	        var defaultData = typeof parentVal === 'function'
	          ? parentVal.call(vm, vm)
	          : parentVal;
	        if (instanceData) {
	          return mergeData(instanceData, defaultData)
	        } else {
	          return defaultData
	        }
	      }
	    }
	  }
	
	  strats.data = function (
	    parentVal,
	    childVal,
	    vm
	  ) {
	    if (!vm) {
	      if (childVal && typeof childVal !== 'function') {
	        warn(
	          'The "data" option should be a function ' +
	          'that returns a per-instance value in component ' +
	          'definitions.',
	          vm
	        );
	
	        return parentVal
	      }
	      return mergeDataOrFn(parentVal, childVal)
	    }
	
	    return mergeDataOrFn(parentVal, childVal, vm)
	  };
	
	  /**
	   * Hooks and props are merged as arrays.
	   */
	  function mergeHook (
	    parentVal,
	    childVal
	  ) {
	    var res = childVal
	      ? parentVal
	        ? parentVal.concat(childVal)
	        : Array.isArray(childVal)
	          ? childVal
	          : [childVal]
	      : parentVal;
	    return res
	      ? dedupeHooks(res)
	      : res
	  }
	
	  function dedupeHooks (hooks) {
	    var res = [];
	    for (var i = 0; i < hooks.length; i++) {
	      if (res.indexOf(hooks[i]) === -1) {
	        res.push(hooks[i]);
	      }
	    }
	    return res
	  }
	
	  LIFECYCLE_HOOKS.forEach(function (hook) {
	    strats[hook] = mergeHook;
	  });
	
	  /**
	   * Assets
	   *
	   * When a vm is present (instance creation), we need to do
	   * a three-way merge between constructor options, instance
	   * options and parent options.
	   */
	  function mergeAssets (
	    parentVal,
	    childVal,
	    vm,
	    key
	  ) {
	    var res = Object.create(parentVal || null);
	    if (childVal) {
	      assertObjectType(key, childVal, vm);
	      return extend(res, childVal)
	    } else {
	      return res
	    }
	  }
	
	  ASSET_TYPES.forEach(function (type) {
	    strats[type + 's'] = mergeAssets;
	  });
	
	  /**
	   * Watchers.
	   *
	   * Watchers hashes should not overwrite one
	   * another, so we merge them as arrays.
	   */
	  strats.watch = function (
	    parentVal,
	    childVal,
	    vm,
	    key
	  ) {
	    // work around Firefox's Object.prototype.watch...
	    if (parentVal === nativeWatch) { parentVal = undefined; }
	    if (childVal === nativeWatch) { childVal = undefined; }
	    /* istanbul ignore if */
	    if (!childVal) { return Object.create(parentVal || null) }
	    {
	      assertObjectType(key, childVal, vm);
	    }
	    if (!parentVal) { return childVal }
	    var ret = {};
	    extend(ret, parentVal);
	    for (var key$1 in childVal) {
	      var parent = ret[key$1];
	      var child = childVal[key$1];
	      if (parent && !Array.isArray(parent)) {
	        parent = [parent];
	      }
	      ret[key$1] = parent
	        ? parent.concat(child)
	        : Array.isArray(child) ? child : [child];
	    }
	    return ret
	  };
	
	  /**
	   * Other object hashes.
	   */
	  strats.props =
	  strats.methods =
	  strats.inject =
	  strats.computed = function (
	    parentVal,
	    childVal,
	    vm,
	    key
	  ) {
	    if (childVal && "development" !== 'production') {
	      assertObjectType(key, childVal, vm);
	    }
	    if (!parentVal) { return childVal }
	    var ret = Object.create(null);
	    extend(ret, parentVal);
	    if (childVal) { extend(ret, childVal); }
	    return ret
	  };
	  strats.provide = mergeDataOrFn;
	
	  /**
	   * Default strategy.
	   */
	  var defaultStrat = function (parentVal, childVal) {
	    return childVal === undefined
	      ? parentVal
	      : childVal
	  };
	
	  /**
	   * Validate component names
	   */
	  function checkComponents (options) {
	    for (var key in options.components) {
	      validateComponentName(key);
	    }
	  }
	
	  function validateComponentName (name) {
	    if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
	      warn(
	        'Invalid component name: "' + name + '". Component names ' +
	        'should conform to valid custom element name in html5 specification.'
	      );
	    }
	    if (isBuiltInTag(name) || config.isReservedTag(name)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + name
	      );
	    }
	  }
	
	  /**
	   * Ensure all props option syntax are normalized into the
	   * Object-based format.
	   */
	  function normalizeProps (options, vm) {
	    var props = options.props;
	    if (!props) { return }
	    var res = {};
	    var i, val, name;
	    if (Array.isArray(props)) {
	      i = props.length;
	      while (i--) {
	        val = props[i];
	        if (typeof val === 'string') {
	          name = camelize(val);
	          res[name] = { type: null };
	        } else {
	          warn('props must be strings when using array syntax.');
	        }
	      }
	    } else if (isPlainObject(props)) {
	      for (var key in props) {
	        val = props[key];
	        name = camelize(key);
	        res[name] = isPlainObject(val)
	          ? val
	          : { type: val };
	      }
	    } else {
	      warn(
	        "Invalid value for option \"props\": expected an Array or an Object, " +
	        "but got " + (toRawType(props)) + ".",
	        vm
	      );
	    }
	    options.props = res;
	  }
	
	  /**
	   * Normalize all injections into Object-based format
	   */
	  function normalizeInject (options, vm) {
	    var inject = options.inject;
	    if (!inject) { return }
	    var normalized = options.inject = {};
	    if (Array.isArray(inject)) {
	      for (var i = 0; i < inject.length; i++) {
	        normalized[inject[i]] = { from: inject[i] };
	      }
	    } else if (isPlainObject(inject)) {
	      for (var key in inject) {
	        var val = inject[key];
	        normalized[key] = isPlainObject(val)
	          ? extend({ from: key }, val)
	          : { from: val };
	      }
	    } else {
	      warn(
	        "Invalid value for option \"inject\": expected an Array or an Object, " +
	        "but got " + (toRawType(inject)) + ".",
	        vm
	      );
	    }
	  }
	
	  /**
	   * Normalize raw function directives into object format.
	   */
	  function normalizeDirectives (options) {
	    var dirs = options.directives;
	    if (dirs) {
	      for (var key in dirs) {
	        var def$$1 = dirs[key];
	        if (typeof def$$1 === 'function') {
	          dirs[key] = { bind: def$$1, update: def$$1 };
	        }
	      }
	    }
	  }
	
	  function assertObjectType (name, value, vm) {
	    if (!isPlainObject(value)) {
	      warn(
	        "Invalid value for option \"" + name + "\": expected an Object, " +
	        "but got " + (toRawType(value)) + ".",
	        vm
	      );
	    }
	  }
	
	  /**
	   * Merge two option objects into a new one.
	   * Core utility used in both instantiation and inheritance.
	   */
	  function mergeOptions (
	    parent,
	    child,
	    vm
	  ) {
	    {
	      checkComponents(child);
	    }
	
	    if (typeof child === 'function') {
	      child = child.options;
	    }
	
	    normalizeProps(child, vm);
	    normalizeInject(child, vm);
	    normalizeDirectives(child);
	
	    // Apply extends and mixins on the child options,
	    // but only if it is a raw options object that isn't
	    // the result of another mergeOptions call.
	    // Only merged options has the _base property.
	    if (!child._base) {
	      if (child.extends) {
	        parent = mergeOptions(parent, child.extends, vm);
	      }
	      if (child.mixins) {
	        for (var i = 0, l = child.mixins.length; i < l; i++) {
	          parent = mergeOptions(parent, child.mixins[i], vm);
	        }
	      }
	    }
	
	    var options = {};
	    var key;
	    for (key in parent) {
	      mergeField(key);
	    }
	    for (key in child) {
	      if (!hasOwn(parent, key)) {
	        mergeField(key);
	      }
	    }
	    function mergeField (key) {
	      var strat = strats[key] || defaultStrat;
	      options[key] = strat(parent[key], child[key], vm, key);
	    }
	    return options
	  }
	
	  /**
	   * Resolve an asset.
	   * This function is used because child instances need access
	   * to assets defined in its ancestor chain.
	   */
	  function resolveAsset (
	    options,
	    type,
	    id,
	    warnMissing
	  ) {
	    /* istanbul ignore if */
	    if (typeof id !== 'string') {
	      return
	    }
	    var assets = options[type];
	    // check local registration variations first
	    if (hasOwn(assets, id)) { return assets[id] }
	    var camelizedId = camelize(id);
	    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	    var PascalCaseId = capitalize(camelizedId);
	    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	    // fallback to prototype chain
	    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	    if (warnMissing && !res) {
	      warn(
	        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	        options
	      );
	    }
	    return res
	  }
	
	  /*  */
	
	
	
	  function validateProp (
	    key,
	    propOptions,
	    propsData,
	    vm
	  ) {
	    var prop = propOptions[key];
	    var absent = !hasOwn(propsData, key);
	    var value = propsData[key];
	    // boolean casting
	    var booleanIndex = getTypeIndex(Boolean, prop.type);
	    if (booleanIndex > -1) {
	      if (absent && !hasOwn(prop, 'default')) {
	        value = false;
	      } else if (value === '' || value === hyphenate(key)) {
	        // only cast empty string / same name to boolean if
	        // boolean has higher priority
	        var stringIndex = getTypeIndex(String, prop.type);
	        if (stringIndex < 0 || booleanIndex < stringIndex) {
	          value = true;
	        }
	      }
	    }
	    // check default value
	    if (value === undefined) {
	      value = getPropDefaultValue(vm, prop, key);
	      // since the default value is a fresh copy,
	      // make sure to observe it.
	      var prevShouldObserve = shouldObserve;
	      toggleObserving(true);
	      observe(value);
	      toggleObserving(prevShouldObserve);
	    }
	    {
	      assertProp(prop, key, value, vm, absent);
	    }
	    return value
	  }
	
	  /**
	   * Get the default value of a prop.
	   */
	  function getPropDefaultValue (vm, prop, key) {
	    // no default, return undefined
	    if (!hasOwn(prop, 'default')) {
	      return undefined
	    }
	    var def = prop.default;
	    // warn against non-factory defaults for Object & Array
	    if (isObject(def)) {
	      warn(
	        'Invalid default value for prop "' + key + '": ' +
	        'Props with type Object/Array must use a factory function ' +
	        'to return the default value.',
	        vm
	      );
	    }
	    // the raw prop value was also undefined from previous render,
	    // return previous default value to avoid unnecessary watcher trigger
	    if (vm && vm.$options.propsData &&
	      vm.$options.propsData[key] === undefined &&
	      vm._props[key] !== undefined
	    ) {
	      return vm._props[key]
	    }
	    // call factory function for non-Function types
	    // a value is Function if its prototype is function even across different execution context
	    return typeof def === 'function' && getType(prop.type) !== 'Function'
	      ? def.call(vm)
	      : def
	  }
	
	  /**
	   * Assert whether a prop is valid.
	   */
	  function assertProp (
	    prop,
	    name,
	    value,
	    vm,
	    absent
	  ) {
	    if (prop.required && absent) {
	      warn(
	        'Missing required prop: "' + name + '"',
	        vm
	      );
	      return
	    }
	    if (value == null && !prop.required) {
	      return
	    }
	    var type = prop.type;
	    var valid = !type || type === true;
	    var expectedTypes = [];
	    if (type) {
	      if (!Array.isArray(type)) {
	        type = [type];
	      }
	      for (var i = 0; i < type.length && !valid; i++) {
	        var assertedType = assertType(value, type[i]);
	        expectedTypes.push(assertedType.expectedType || '');
	        valid = assertedType.valid;
	      }
	    }
	
	    if (!valid) {
	      warn(
	        getInvalidTypeMessage(name, value, expectedTypes),
	        vm
	      );
	      return
	    }
	    var validator = prop.validator;
	    if (validator) {
	      if (!validator(value)) {
	        warn(
	          'Invalid prop: custom validator check failed for prop "' + name + '".',
	          vm
	        );
	      }
	    }
	  }
	
	  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;
	
	  function assertType (value, type) {
	    var valid;
	    var expectedType = getType(type);
	    if (simpleCheckRE.test(expectedType)) {
	      var t = typeof value;
	      valid = t === expectedType.toLowerCase();
	      // for primitive wrapper objects
	      if (!valid && t === 'object') {
	        valid = value instanceof type;
	      }
	    } else if (expectedType === 'Object') {
	      valid = isPlainObject(value);
	    } else if (expectedType === 'Array') {
	      valid = Array.isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	    return {
	      valid: valid,
	      expectedType: expectedType
	    }
	  }
	
	  /**
	   * Use function string name to check built-in types,
	   * because a simple equality check will fail when running
	   * across different vms / iframes.
	   */
	  function getType (fn) {
	    var match = fn && fn.toString().match(/^\s*function (\w+)/);
	    return match ? match[1] : ''
	  }
	
	  function isSameType (a, b) {
	    return getType(a) === getType(b)
	  }
	
	  function getTypeIndex (type, expectedTypes) {
	    if (!Array.isArray(expectedTypes)) {
	      return isSameType(expectedTypes, type) ? 0 : -1
	    }
	    for (var i = 0, len = expectedTypes.length; i < len; i++) {
	      if (isSameType(expectedTypes[i], type)) {
	        return i
	      }
	    }
	    return -1
	  }
	
	  function getInvalidTypeMessage (name, value, expectedTypes) {
	    var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
	      " Expected " + (expectedTypes.map(capitalize).join(', '));
	    var expectedType = expectedTypes[0];
	    var receivedType = toRawType(value);
	    var expectedValue = styleValue(value, expectedType);
	    var receivedValue = styleValue(value, receivedType);
	    // check if we need to specify expected value
	    if (expectedTypes.length === 1 &&
	        isExplicable(expectedType) &&
	        !isBoolean(expectedType, receivedType)) {
	      message += " with value " + expectedValue;
	    }
	    message += ", got " + receivedType + " ";
	    // check if we need to specify received value
	    if (isExplicable(receivedType)) {
	      message += "with value " + receivedValue + ".";
	    }
	    return message
	  }
	
	  function styleValue (value, type) {
	    if (type === 'String') {
	      return ("\"" + value + "\"")
	    } else if (type === 'Number') {
	      return ("" + (Number(value)))
	    } else {
	      return ("" + value)
	    }
	  }
	
	  function isExplicable (value) {
	    var explicitTypes = ['string', 'number', 'boolean'];
	    return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
	  }
	
	  function isBoolean () {
	    var args = [], len = arguments.length;
	    while ( len-- ) args[ len ] = arguments[ len ];
	
	    return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
	  }
	
	  /*  */
	
	  function handleError (err, vm, info) {
	    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
	    // See: https://github.com/vuejs/vuex/issues/1505
	    pushTarget();
	    try {
	      if (vm) {
	        var cur = vm;
	        while ((cur = cur.$parent)) {
	          var hooks = cur.$options.errorCaptured;
	          if (hooks) {
	            for (var i = 0; i < hooks.length; i++) {
	              try {
	                var capture = hooks[i].call(cur, err, vm, info) === false;
	                if (capture) { return }
	              } catch (e) {
	                globalHandleError(e, cur, 'errorCaptured hook');
	              }
	            }
	          }
	        }
	      }
	      globalHandleError(err, vm, info);
	    } finally {
	      popTarget();
	    }
	  }
	
	  function invokeWithErrorHandling (
	    handler,
	    context,
	    args,
	    vm,
	    info
	  ) {
	    var res;
	    try {
	      res = args ? handler.apply(context, args) : handler.call(context);
	      if (res && !res._isVue && isPromise(res)) {
	        // issue #9511
	        // reassign to res to avoid catch triggering multiple times when nested calls
	        res = res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
	      }
	    } catch (e) {
	      handleError(e, vm, info);
	    }
	    return res
	  }
	
	  function globalHandleError (err, vm, info) {
	    if (config.errorHandler) {
	      try {
	        return config.errorHandler.call(null, err, vm, info)
	      } catch (e) {
	        // if the user intentionally throws the original error in the handler,
	        // do not log it twice
	        if (e !== err) {
	          logError(e, null, 'config.errorHandler');
	        }
	      }
	    }
	    logError(err, vm, info);
	  }
	
	  function logError (err, vm, info) {
	    {
	      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
	    }
	    /* istanbul ignore else */
	    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	
	  /*  */
	
	  var isUsingMicroTask = false;
	
	  var callbacks = [];
	  var pending = false;
	
	  function flushCallbacks () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  // Here we have async deferring wrappers using microtasks.
	  // In 2.5 we used (macro) tasks (in combination with microtasks).
	  // However, it has subtle problems when state is changed right before repaint
	  // (e.g. #6813, out-in transitions).
	  // Also, using (macro) tasks in event handler would cause some weird behaviors
	  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
	  // So we now use microtasks everywhere, again.
	  // A major drawback of this tradeoff is that there are some scenarios
	  // where microtasks have too high a priority and fire in between supposedly
	  // sequential events (e.g. #4521, #6690, which have workarounds)
	  // or even between bubbling of the same event (#6566).
	  var timerFunc;
	
	  // The nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore next, $flow-disable-line */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    timerFunc = function () {
	      p.then(flushCallbacks);
	      // In problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	    isUsingMicroTask = true;
	  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // Use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS, iOS7, Android 4.4
	    // (#6466 MutationObserver is unreliable in IE11)
	    var counter = 1;
	    var observer = new MutationObserver(flushCallbacks);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	    isUsingMicroTask = true;
	  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
	    // Fallback to setImmediate.
	    // Techinically it leverages the (macro) task queue,
	    // but it is still a better choice than setTimeout.
	    timerFunc = function () {
	      setImmediate(flushCallbacks);
	    };
	  } else {
	    // Fallback to setTimeout.
	    timerFunc = function () {
	      setTimeout(flushCallbacks, 0);
	    };
	  }
	
	  function nextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) {
	        try {
	          cb.call(ctx);
	        } catch (e) {
	          handleError(e, ctx, 'nextTick');
	        }
	      } else if (_resolve) {
	        _resolve(ctx);
	      }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    // $flow-disable-line
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	
	  /*  */
	
	  var mark;
	  var measure;
	
	  {
	    var perf = inBrowser && window.performance;
	    /* istanbul ignore if */
	    if (
	      perf &&
	      perf.mark &&
	      perf.measure &&
	      perf.clearMarks &&
	      perf.clearMeasures
	    ) {
	      mark = function (tag) { return perf.mark(tag); };
	      measure = function (name, startTag, endTag) {
	        perf.measure(name, startTag, endTag);
	        perf.clearMarks(startTag);
	        perf.clearMarks(endTag);
	        // perf.clearMeasures(name)
	      };
	    }
	  }
	
	  /* not type checking this file because flow doesn't play well with Proxy */
	
	  var initProxy;
	
	  {
	    var allowedGlobals = makeMap(
	      'Infinity,undefined,NaN,isFinite,isNaN,' +
	      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	      'require' // for Webpack/Browserify
	    );
	
	    var warnNonPresent = function (target, key) {
	      warn(
	        "Property or method \"" + key + "\" is not defined on the instance but " +
	        'referenced during render. Make sure that this property is reactive, ' +
	        'either in the data option, or for class-based components, by ' +
	        'initializing the property. ' +
	        'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
	        target
	      );
	    };
	
	    var warnReservedPrefix = function (target, key) {
	      warn(
	        "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
	        'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
	        'prevent conflicts with Vue internals' +
	        'See: https://vuejs.org/v2/api/#data',
	        target
	      );
	    };
	
	    var hasProxy =
	      typeof Proxy !== 'undefined' && isNative(Proxy);
	
	    if (hasProxy) {
	      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
	      config.keyCodes = new Proxy(config.keyCodes, {
	        set: function set (target, key, value) {
	          if (isBuiltInModifier(key)) {
	            warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	            return false
	          } else {
	            target[key] = value;
	            return true
	          }
	        }
	      });
	    }
	
	    var hasHandler = {
	      has: function has (target, key) {
	        var has = key in target;
	        var isAllowed = allowedGlobals(key) ||
	          (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
	        if (!has && !isAllowed) {
	          if (key in target.$data) { warnReservedPrefix(target, key); }
	          else { warnNonPresent(target, key); }
	        }
	        return has || !isAllowed
	      }
	    };
	
	    var getHandler = {
	      get: function get (target, key) {
	        if (typeof key === 'string' && !(key in target)) {
	          if (key in target.$data) { warnReservedPrefix(target, key); }
	          else { warnNonPresent(target, key); }
	        }
	        return target[key]
	      }
	    };
	
	    initProxy = function initProxy (vm) {
	      if (hasProxy) {
	        // determine which proxy handler to use
	        var options = vm.$options;
	        var handlers = options.render && options.render._withStripped
	          ? getHandler
	          : hasHandler;
	        vm._renderProxy = new Proxy(vm, handlers);
	      } else {
	        vm._renderProxy = vm;
	      }
	    };
	  }
	
	  /*  */
	
	  var seenObjects = new _Set();
	
	  /**
	   * Recursively traverse an object to evoke all converted
	   * getters, so that every nested property inside the object
	   * is collected as a "deep" dependency.
	   */
	  function traverse (val) {
	    _traverse(val, seenObjects);
	    seenObjects.clear();
	  }
	
	  function _traverse (val, seen) {
	    var i, keys;
	    var isA = Array.isArray(val);
	    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
	      return
	    }
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return
	      }
	      seen.add(depId);
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) { _traverse(val[i], seen); }
	    } else {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) { _traverse(val[keys[i]], seen); }
	    }
	  }
	
	  /*  */
	
	  var normalizeEvent = cached(function (name) {
	    var passive = name.charAt(0) === '&';
	    name = passive ? name.slice(1) : name;
	    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	    name = once$$1 ? name.slice(1) : name;
	    var capture = name.charAt(0) === '!';
	    name = capture ? name.slice(1) : name;
	    return {
	      name: name,
	      once: once$$1,
	      capture: capture,
	      passive: passive
	    }
	  });
	
	  function createFnInvoker (fns, vm) {
	    function invoker () {
	      var arguments$1 = arguments;
	
	      var fns = invoker.fns;
	      if (Array.isArray(fns)) {
	        var cloned = fns.slice();
	        for (var i = 0; i < cloned.length; i++) {
	          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
	        }
	      } else {
	        // return handler return value for single handlers
	        return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
	      }
	    }
	    invoker.fns = fns;
	    return invoker
	  }
	
	  function updateListeners (
	    on,
	    oldOn,
	    add,
	    remove$$1,
	    createOnceHandler,
	    vm
	  ) {
	    var name, def$$1, cur, old, event;
	    for (name in on) {
	      def$$1 = cur = on[name];
	      old = oldOn[name];
	      event = normalizeEvent(name);
	      if (isUndef(cur)) {
	        warn(
	          "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	          vm
	        );
	      } else if (isUndef(old)) {
	        if (isUndef(cur.fns)) {
	          cur = on[name] = createFnInvoker(cur, vm);
	        }
	        if (isTrue(event.once)) {
	          cur = on[name] = createOnceHandler(event.name, cur, event.capture);
	        }
	        add(event.name, cur, event.capture, event.passive, event.params);
	      } else if (cur !== old) {
	        old.fns = cur;
	        on[name] = old;
	      }
	    }
	    for (name in oldOn) {
	      if (isUndef(on[name])) {
	        event = normalizeEvent(name);
	        remove$$1(event.name, oldOn[name], event.capture);
	      }
	    }
	  }
	
	  /*  */
	
	  function mergeVNodeHook (def, hookKey, hook) {
	    if (def instanceof VNode) {
	      def = def.data.hook || (def.data.hook = {});
	    }
	    var invoker;
	    var oldHook = def[hookKey];
	
	    function wrappedHook () {
	      hook.apply(this, arguments);
	      // important: remove merged hook to ensure it's called only once
	      // and prevent memory leak
	      remove(invoker.fns, wrappedHook);
	    }
	
	    if (isUndef(oldHook)) {
	      // no existing hook
	      invoker = createFnInvoker([wrappedHook]);
	    } else {
	      /* istanbul ignore if */
	      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	        // already a merged invoker
	        invoker = oldHook;
	        invoker.fns.push(wrappedHook);
	      } else {
	        // existing plain hook
	        invoker = createFnInvoker([oldHook, wrappedHook]);
	      }
	    }
	
	    invoker.merged = true;
	    def[hookKey] = invoker;
	  }
	
	  /*  */
	
	  function extractPropsFromVNodeData (
	    data,
	    Ctor,
	    tag
	  ) {
	    // we are only extracting raw values here.
	    // validation and default values are handled in the child
	    // component itself.
	    var propOptions = Ctor.options.props;
	    if (isUndef(propOptions)) {
	      return
	    }
	    var res = {};
	    var attrs = data.attrs;
	    var props = data.props;
	    if (isDef(attrs) || isDef(props)) {
	      for (var key in propOptions) {
	        var altKey = hyphenate(key);
	        {
	          var keyInLowerCase = key.toLowerCase();
	          if (
	            key !== keyInLowerCase &&
	            attrs && hasOwn(attrs, keyInLowerCase)
	          ) {
	            tip(
	              "Prop \"" + keyInLowerCase + "\" is passed to component " +
	              (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	              " \"" + key + "\". " +
	              "Note that HTML attributes are case-insensitive and camelCased " +
	              "props need to use their kebab-case equivalents when using in-DOM " +
	              "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	            );
	          }
	        }
	        checkProp(res, props, key, altKey, true) ||
	        checkProp(res, attrs, key, altKey, false);
	      }
	    }
	    return res
	  }
	
	  function checkProp (
	    res,
	    hash,
	    key,
	    altKey,
	    preserve
	  ) {
	    if (isDef(hash)) {
	      if (hasOwn(hash, key)) {
	        res[key] = hash[key];
	        if (!preserve) {
	          delete hash[key];
	        }
	        return true
	      } else if (hasOwn(hash, altKey)) {
	        res[key] = hash[altKey];
	        if (!preserve) {
	          delete hash[altKey];
	        }
	        return true
	      }
	    }
	    return false
	  }
	
	  /*  */
	
	  // The template compiler attempts to minimize the need for normalization by
	  // statically analyzing the template at compile time.
	  //
	  // For plain HTML markup, normalization can be completely skipped because the
	  // generated render function is guaranteed to return Array<VNode>. There are
	  // two cases where extra normalization is needed:
	
	  // 1. When the children contains components - because a functional component
	  // may return an Array instead of a single root. In this case, just a simple
	  // normalization is needed - if any child is an Array, we flatten the whole
	  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	  // because functional components already normalize their own children.
	  function simpleNormalizeChildren (children) {
	    for (var i = 0; i < children.length; i++) {
	      if (Array.isArray(children[i])) {
	        return Array.prototype.concat.apply([], children)
	      }
	    }
	    return children
	  }
	
	  // 2. When the children contains constructs that always generated nested Arrays,
	  // e.g. <template>, <slot>, v-for, or when the children is provided by user
	  // with hand-written render functions / JSX. In such cases a full normalization
	  // is needed to cater to all possible types of children values.
	  function normalizeChildren (children) {
	    return isPrimitive(children)
	      ? [createTextVNode(children)]
	      : Array.isArray(children)
	        ? normalizeArrayChildren(children)
	        : undefined
	  }
	
	  function isTextNode (node) {
	    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	  }
	
	  function normalizeArrayChildren (children, nestedIndex) {
	    var res = [];
	    var i, c, lastIndex, last;
	    for (i = 0; i < children.length; i++) {
	      c = children[i];
	      if (isUndef(c) || typeof c === 'boolean') { continue }
	      lastIndex = res.length - 1;
	      last = res[lastIndex];
	      //  nested
	      if (Array.isArray(c)) {
	        if (c.length > 0) {
	          c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
	          // merge adjacent text nodes
	          if (isTextNode(c[0]) && isTextNode(last)) {
	            res[lastIndex] = createTextVNode(last.text + (c[0]).text);
	            c.shift();
	          }
	          res.push.apply(res, c);
	        }
	      } else if (isPrimitive(c)) {
	        if (isTextNode(last)) {
	          // merge adjacent text nodes
	          // this is necessary for SSR hydration because text nodes are
	          // essentially merged when rendered to HTML strings
	          res[lastIndex] = createTextVNode(last.text + c);
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c));
	        }
	      } else {
	        if (isTextNode(c) && isTextNode(last)) {
	          // merge adjacent text nodes
	          res[lastIndex] = createTextVNode(last.text + c.text);
	        } else {
	          // default key for nested array children (likely generated by v-for)
	          if (isTrue(children._isVList) &&
	            isDef(c.tag) &&
	            isUndef(c.key) &&
	            isDef(nestedIndex)) {
	            c.key = "__vlist" + nestedIndex + "_" + i + "__";
	          }
	          res.push(c);
	        }
	      }
	    }
	    return res
	  }
	
	  /*  */
	
	  function initProvide (vm) {
	    var provide = vm.$options.provide;
	    if (provide) {
	      vm._provided = typeof provide === 'function'
	        ? provide.call(vm)
	        : provide;
	    }
	  }
	
	  function initInjections (vm) {
	    var result = resolveInject(vm.$options.inject, vm);
	    if (result) {
	      toggleObserving(false);
	      Object.keys(result).forEach(function (key) {
	        /* istanbul ignore else */
	        {
	          defineReactive$$1(vm, key, result[key], function () {
	            warn(
	              "Avoid mutating an injected value directly since the changes will be " +
	              "overwritten whenever the provided component re-renders. " +
	              "injection being mutated: \"" + key + "\"",
	              vm
	            );
	          });
	        }
	      });
	      toggleObserving(true);
	    }
	  }
	
	  function resolveInject (inject, vm) {
	    if (inject) {
	      // inject is :any because flow is not smart enough to figure out cached
	      var result = Object.create(null);
	      var keys = hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);
	
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        // #6574 in case the inject object is observed...
	        if (key === '__ob__') { continue }
	        var provideKey = inject[key].from;
	        var source = vm;
	        while (source) {
	          if (source._provided && hasOwn(source._provided, provideKey)) {
	            result[key] = source._provided[provideKey];
	            break
	          }
	          source = source.$parent;
	        }
	        if (!source) {
	          if ('default' in inject[key]) {
	            var provideDefault = inject[key].default;
	            result[key] = typeof provideDefault === 'function'
	              ? provideDefault.call(vm)
	              : provideDefault;
	          } else {
	            warn(("Injection \"" + key + "\" not found"), vm);
	          }
	        }
	      }
	      return result
	    }
	  }
	
	  /*  */
	
	
	
	  /**
	   * Runtime helper for resolving raw children VNodes into a slot object.
	   */
	  function resolveSlots (
	    children,
	    context
	  ) {
	    if (!children || !children.length) {
	      return {}
	    }
	    var slots = {};
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var data = child.data;
	      // remove slot attribute if the node is resolved as a Vue slot node
	      if (data && data.attrs && data.attrs.slot) {
	        delete data.attrs.slot;
	      }
	      // named slots should only be respected if the vnode was rendered in the
	      // same context.
	      if ((child.context === context || child.fnContext === context) &&
	        data && data.slot != null
	      ) {
	        var name = data.slot;
	        var slot = (slots[name] || (slots[name] = []));
	        if (child.tag === 'template') {
	          slot.push.apply(slot, child.children || []);
	        } else {
	          slot.push(child);
	        }
	      } else {
	        (slots.default || (slots.default = [])).push(child);
	      }
	    }
	    // ignore slots that contains only whitespace
	    for (var name$1 in slots) {
	      if (slots[name$1].every(isWhitespace)) {
	        delete slots[name$1];
	      }
	    }
	    return slots
	  }
	
	  function isWhitespace (node) {
	    return (node.isComment && !node.asyncFactory) || node.text === ' '
	  }
	
	  /*  */
	
	  function normalizeScopedSlots (
	    slots,
	    normalSlots,
	    prevSlots
	  ) {
	    var res;
	    var isStable = slots ? !!slots.$stable : true;
	    var key = slots && slots.$key;
	    if (!slots) {
	      res = {};
	    } else if (slots._normalized) {
	      // fast path 1: child component re-render only, parent did not change
	      return slots._normalized
	    } else if (
	      isStable &&
	      prevSlots &&
	      prevSlots !== emptyObject &&
	      key === prevSlots.$key &&
	      Object.keys(normalSlots).length === 0
	    ) {
	      // fast path 2: stable scoped slots w/ no normal slots to proxy,
	      // only need to normalize once
	      return prevSlots
	    } else {
	      res = {};
	      for (var key$1 in slots) {
	        if (slots[key$1] && key$1[0] !== '$') {
	          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
	        }
	      }
	    }
	    // expose normal slots on scopedSlots
	    for (var key$2 in normalSlots) {
	      if (!(key$2 in res)) {
	        res[key$2] = proxyNormalSlot(normalSlots, key$2);
	      }
	    }
	    // avoriaz seems to mock a non-extensible $scopedSlots object
	    // and when that is passed down this would cause an error
	    if (slots && Object.isExtensible(slots)) {
	      (slots)._normalized = res;
	    }
	    def(res, '$stable', isStable);
	    def(res, '$key', key);
	    return res
	  }
	
	  function normalizeScopedSlot(normalSlots, key, fn) {
	    var normalized = function () {
	      var res = arguments.length ? fn.apply(null, arguments) : fn({});
	      res = res && typeof res === 'object' && !Array.isArray(res)
	        ? [res] // single vnode
	        : normalizeChildren(res);
	      return res && res.length === 0
	        ? undefined
	        : res
	    };
	    // this is a slot using the new v-slot syntax without scope. although it is
	    // compiled as a scoped slot, render fn users would expect it to be present
	    // on this.$slots because the usage is semantically a normal slot.
	    if (fn.proxy) {
	      Object.defineProperty(normalSlots, key, {
	        get: normalized,
	        enumerable: true,
	        configurable: true
	      });
	    }
	    return normalized
	  }
	
	  function proxyNormalSlot(slots, key) {
	    return function () { return slots[key]; }
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for rendering v-for lists.
	   */
	  function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val) || typeof val === 'string') {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      if (hasSymbol && val[Symbol.iterator]) {
	        ret = [];
	        var iterator = val[Symbol.iterator]();
	        var result = iterator.next();
	        while (!result.done) {
	          ret.push(render(result.value, ret.length));
	          result = iterator.next();
	        }
	      } else {
	        keys = Object.keys(val);
	        ret = new Array(keys.length);
	        for (i = 0, l = keys.length; i < l; i++) {
	          key = keys[i];
	          ret[i] = render(val[key], key, i);
	        }
	      }
	    }
	    if (!isDef(ret)) {
	      ret = [];
	    }
	    (ret)._isVList = true;
	    return ret
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for rendering <slot>
	   */
	  function renderSlot (
	    name,
	    fallback,
	    props,
	    bindObject
	  ) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    var nodes;
	    if (scopedSlotFn) { // scoped slot
	      props = props || {};
	      if (bindObject) {
	        if (!isObject(bindObject)) {
	          warn(
	            'slot v-bind without argument expects an Object',
	            this
	          );
	        }
	        props = extend(extend({}, bindObject), props);
	      }
	      nodes = scopedSlotFn(props) || fallback;
	    } else {
	      nodes = this.$slots[name] || fallback;
	    }
	
	    var target = props && props.slot;
	    if (target) {
	      return this.$createElement('template', { slot: target }, nodes)
	    } else {
	      return nodes
	    }
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for resolving filters
	   */
	  function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  }
	
	  /*  */
	
	  function isKeyNotMatch (expect, actual) {
	    if (Array.isArray(expect)) {
	      return expect.indexOf(actual) === -1
	    } else {
	      return expect !== actual
	    }
	  }
	
	  /**
	   * Runtime helper for checking keyCodes from config.
	   * exposed as Vue.prototype._k
	   * passing in eventKeyName as last argument separately for backwards compat
	   */
	  function checkKeyCodes (
	    eventKeyCode,
	    key,
	    builtInKeyCode,
	    eventKeyName,
	    builtInKeyName
	  ) {
	    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
	    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
	      return isKeyNotMatch(builtInKeyName, eventKeyName)
	    } else if (mappedKeyCode) {
	      return isKeyNotMatch(mappedKeyCode, eventKeyCode)
	    } else if (eventKeyName) {
	      return hyphenate(eventKeyName) !== key
	    }
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for merging v-bind="object" into a VNode's data.
	   */
	  function bindObjectProps (
	    data,
	    tag,
	    value,
	    asProp,
	    isSync
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        var hash;
	        var loop = function ( key ) {
	          if (
	            key === 'class' ||
	            key === 'style' ||
	            isReservedAttribute(key)
	          ) {
	            hash = data;
	          } else {
	            var type = data.attrs && data.attrs.type;
	            hash = asProp || config.mustUseProp(tag, type, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	          }
	          var camelizedKey = camelize(key);
	          if (!(key in hash) && !(camelizedKey in hash)) {
	            hash[key] = value[key];
	
	            if (isSync) {
	              var on = data.on || (data.on = {});
	              on[("update:" + camelizedKey)] = function ($event) {
	                value[key] = $event;
	              };
	            }
	          }
	        };
	
	        for (var key in value) loop( key );
	      }
	    }
	    return data
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for rendering static trees.
	   */
	  function renderStatic (
	    index,
	    isInFor
	  ) {
	    var cached = this._staticTrees || (this._staticTrees = []);
	    var tree = cached[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree.
	    if (tree && !isInFor) {
	      return tree
	    }
	    // otherwise, render a fresh tree.
	    tree = cached[index] = this.$options.staticRenderFns[index].call(
	      this._renderProxy,
	      null,
	      this // for render fns generated for functional component templates
	    );
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  }
	
	  /**
	   * Runtime helper for v-once.
	   * Effectively it means marking the node as static with a unique key.
	   */
	  function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  }
	
	  function markStatic (
	    tree,
	    key,
	    isOnce
	  ) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }
	
	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }
	
	  /*  */
	
	  function bindObjectListeners (data, value) {
	    if (value) {
	      if (!isPlainObject(value)) {
	        warn(
	          'v-on without argument expects an Object value',
	          this
	        );
	      } else {
	        var on = data.on = data.on ? extend({}, data.on) : {};
	        for (var key in value) {
	          var existing = on[key];
	          var ours = value[key];
	          on[key] = existing ? [].concat(existing, ours) : ours;
	        }
	      }
	    }
	    return data
	  }
	
	  /*  */
	
	  function resolveScopedSlots (
	    fns, // see flow/vnode
	    res,
	    // the following are added in 2.6
	    hasDynamicKeys,
	    contentHashKey
	  ) {
	    res = res || { $stable: !hasDynamicKeys };
	    for (var i = 0; i < fns.length; i++) {
	      var slot = fns[i];
	      if (Array.isArray(slot)) {
	        resolveScopedSlots(slot, res, hasDynamicKeys);
	      } else if (slot) {
	        // marker for reverse proxying v-slot without scope on this.$slots
	        if (slot.proxy) {
	          slot.fn.proxy = true;
	        }
	        res[slot.key] = slot.fn;
	      }
	    }
	    if (contentHashKey) {
	      (res).$key = contentHashKey;
	    }
	    return res
	  }
	
	  /*  */
	
	  function bindDynamicKeys (baseObj, values) {
	    for (var i = 0; i < values.length; i += 2) {
	      var key = values[i];
	      if (typeof key === 'string' && key) {
	        baseObj[values[i]] = values[i + 1];
	      } else if (key !== '' && key !== null) {
	        // null is a speical value for explicitly removing a binding
	        warn(
	          ("Invalid value for dynamic directive argument (expected string or null): " + key),
	          this
	        );
	      }
	    }
	    return baseObj
	  }
	
	  // helper to dynamically append modifier runtime markers to event names.
	  // ensure only append when value is already string, otherwise it will be cast
	  // to string and cause the type check to miss.
	  function prependModifier (value, symbol) {
	    return typeof value === 'string' ? symbol + value : value
	  }
	
	  /*  */
	
	  function installRenderHelpers (target) {
	    target._o = markOnce;
	    target._n = toNumber;
	    target._s = toString;
	    target._l = renderList;
	    target._t = renderSlot;
	    target._q = looseEqual;
	    target._i = looseIndexOf;
	    target._m = renderStatic;
	    target._f = resolveFilter;
	    target._k = checkKeyCodes;
	    target._b = bindObjectProps;
	    target._v = createTextVNode;
	    target._e = createEmptyVNode;
	    target._u = resolveScopedSlots;
	    target._g = bindObjectListeners;
	    target._d = bindDynamicKeys;
	    target._p = prependModifier;
	  }
	
	  /*  */
	
	  function FunctionalRenderContext (
	    data,
	    props,
	    children,
	    parent,
	    Ctor
	  ) {
	    var this$1 = this;
	
	    var options = Ctor.options;
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    var contextVm;
	    if (hasOwn(parent, '_uid')) {
	      contextVm = Object.create(parent);
	      // $flow-disable-line
	      contextVm._original = parent;
	    } else {
	      // the context vm passed in is a functional context as well.
	      // in this case we want to make sure we are able to get a hold to the
	      // real context instance.
	      contextVm = parent;
	      // $flow-disable-line
	      parent = parent._original;
	    }
	    var isCompiled = isTrue(options._compiled);
	    var needNormalization = !isCompiled;
	
	    this.data = data;
	    this.props = props;
	    this.children = children;
	    this.parent = parent;
	    this.listeners = data.on || emptyObject;
	    this.injections = resolveInject(options.inject, parent);
	    this.slots = function () {
	      if (!this$1.$slots) {
	        normalizeScopedSlots(
	          data.scopedSlots,
	          this$1.$slots = resolveSlots(children, parent)
	        );
	      }
	      return this$1.$slots
	    };
	
	    Object.defineProperty(this, 'scopedSlots', ({
	      enumerable: true,
	      get: function get () {
	        return normalizeScopedSlots(data.scopedSlots, this.slots())
	      }
	    }));
	
	    // support for compiled functional template
	    if (isCompiled) {
	      // exposing $options for renderStatic()
	      this.$options = options;
	      // pre-resolve slots for renderSlot()
	      this.$slots = this.slots();
	      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
	    }
	
	    if (options._scopeId) {
	      this._c = function (a, b, c, d) {
	        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
	        if (vnode && !Array.isArray(vnode)) {
	          vnode.fnScopeId = options._scopeId;
	          vnode.fnContext = parent;
	        }
	        return vnode
	      };
	    } else {
	      this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
	    }
	  }
	
	  installRenderHelpers(FunctionalRenderContext.prototype);
	
	  function createFunctionalComponent (
	    Ctor,
	    propsData,
	    data,
	    contextVm,
	    children
	  ) {
	    var options = Ctor.options;
	    var props = {};
	    var propOptions = options.props;
	    if (isDef(propOptions)) {
	      for (var key in propOptions) {
	        props[key] = validateProp(key, propOptions, propsData || emptyObject);
	      }
	    } else {
	      if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
	      if (isDef(data.props)) { mergeProps(props, data.props); }
	    }
	
	    var renderContext = new FunctionalRenderContext(
	      data,
	      props,
	      children,
	      contextVm,
	      Ctor
	    );
	
	    var vnode = options.render.call(null, renderContext._c, renderContext);
	
	    if (vnode instanceof VNode) {
	      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
	    } else if (Array.isArray(vnode)) {
	      var vnodes = normalizeChildren(vnode) || [];
	      var res = new Array(vnodes.length);
	      for (var i = 0; i < vnodes.length; i++) {
	        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
	      }
	      return res
	    }
	  }
	
	  function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
	    // #7817 clone node before setting fnContext, otherwise if the node is reused
	    // (e.g. it was from a cached normal slot) the fnContext causes named slots
	    // that should not be matched to match.
	    var clone = cloneVNode(vnode);
	    clone.fnContext = contextVm;
	    clone.fnOptions = options;
	    {
	      (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
	    }
	    if (data.slot) {
	      (clone.data || (clone.data = {})).slot = data.slot;
	    }
	    return clone
	  }
	
	  function mergeProps (to, from) {
	    for (var key in from) {
	      to[camelize(key)] = from[key];
	    }
	  }
	
	  /*  */
	
	  /*  */
	
	  /*  */
	
	  /*  */
	
	  // inline hooks to be invoked on component VNodes during patch
	  var componentVNodeHooks = {
	    init: function init (vnode, hydrating) {
	      if (
	        vnode.componentInstance &&
	        !vnode.componentInstance._isDestroyed &&
	        vnode.data.keepAlive
	      ) {
	        // kept-alive components, treat as a patch
	        var mountedNode = vnode; // work around flow
	        componentVNodeHooks.prepatch(mountedNode, mountedNode);
	      } else {
	        var child = vnode.componentInstance = createComponentInstanceForVnode(
	          vnode,
	          activeInstance
	        );
	        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	      }
	    },
	
	    prepatch: function prepatch (oldVnode, vnode) {
	      var options = vnode.componentOptions;
	      var child = vnode.componentInstance = oldVnode.componentInstance;
	      updateChildComponent(
	        child,
	        options.propsData, // updated props
	        options.listeners, // updated listeners
	        vnode, // new parent vnode
	        options.children // new children
	      );
	    },
	
	    insert: function insert (vnode) {
	      var context = vnode.context;
	      var componentInstance = vnode.componentInstance;
	      if (!componentInstance._isMounted) {
	        componentInstance._isMounted = true;
	        callHook(componentInstance, 'mounted');
	      }
	      if (vnode.data.keepAlive) {
	        if (context._isMounted) {
	          // vue-router#1212
	          // During updates, a kept-alive component's child components may
	          // change, so directly walking the tree here may call activated hooks
	          // on incorrect children. Instead we push them into a queue which will
	          // be processed after the whole patch process ended.
	          queueActivatedComponent(componentInstance);
	        } else {
	          activateChildComponent(componentInstance, true /* direct */);
	        }
	      }
	    },
	
	    destroy: function destroy (vnode) {
	      var componentInstance = vnode.componentInstance;
	      if (!componentInstance._isDestroyed) {
	        if (!vnode.data.keepAlive) {
	          componentInstance.$destroy();
	        } else {
	          deactivateChildComponent(componentInstance, true /* direct */);
	        }
	      }
	    }
	  };
	
	  var hooksToMerge = Object.keys(componentVNodeHooks);
	
	  function createComponent (
	    Ctor,
	    data,
	    context,
	    children,
	    tag
	  ) {
	    if (isUndef(Ctor)) {
	      return
	    }
	
	    var baseCtor = context.$options._base;
	
	    // plain options object: turn it into a constructor
	    if (isObject(Ctor)) {
	      Ctor = baseCtor.extend(Ctor);
	    }
	
	    // if at this stage it's not a constructor or an async component factory,
	    // reject.
	    if (typeof Ctor !== 'function') {
	      {
	        warn(("Invalid Component definition: " + (String(Ctor))), context);
	      }
	      return
	    }
	
	    // async component
	    var asyncFactory;
	    if (isUndef(Ctor.cid)) {
	      asyncFactory = Ctor;
	      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
	      if (Ctor === undefined) {
	        // return a placeholder node for async component, which is rendered
	        // as a comment node but preserves all the raw information for the node.
	        // the information will be used for async server-rendering and hydration.
	        return createAsyncPlaceholder(
	          asyncFactory,
	          data,
	          context,
	          children,
	          tag
	        )
	      }
	    }
	
	    data = data || {};
	
	    // resolve constructor options in case global mixins are applied after
	    // component constructor creation
	    resolveConstructorOptions(Ctor);
	
	    // transform component v-model data into props & events
	    if (isDef(data.model)) {
	      transformModel(Ctor.options, data);
	    }
	
	    // extract props
	    var propsData = extractPropsFromVNodeData(data, Ctor, tag);
	
	    // functional component
	    if (isTrue(Ctor.options.functional)) {
	      return createFunctionalComponent(Ctor, propsData, data, context, children)
	    }
	
	    // extract listeners, since these needs to be treated as
	    // child component listeners instead of DOM listeners
	    var listeners = data.on;
	    // replace with listeners with .native modifier
	    // so it gets processed during parent component patch.
	    data.on = data.nativeOn;
	
	    if (isTrue(Ctor.options.abstract)) {
	      // abstract components do not keep anything
	      // other than props & listeners & slot
	
	      // work around flow
	      var slot = data.slot;
	      data = {};
	      if (slot) {
	        data.slot = slot;
	      }
	    }
	
	    // install component management hooks onto the placeholder node
	    installComponentHooks(data);
	
	    // return a placeholder vnode
	    var name = Ctor.options.name || tag;
	    var vnode = new VNode(
	      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	      data, undefined, undefined, undefined, context,
	      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
	      asyncFactory
	    );
	
	    return vnode
	  }
	
	  function createComponentInstanceForVnode (
	    vnode, // we know it's MountedComponentVNode but flow doesn't
	    parent // activeInstance in lifecycle state
	  ) {
	    var options = {
	      _isComponent: true,
	      _parentVnode: vnode,
	      parent: parent
	    };
	    // check inline-template render functions
	    var inlineTemplate = vnode.data.inlineTemplate;
	    if (isDef(inlineTemplate)) {
	      options.render = inlineTemplate.render;
	      options.staticRenderFns = inlineTemplate.staticRenderFns;
	    }
	    return new vnode.componentOptions.Ctor(options)
	  }
	
	  function installComponentHooks (data) {
	    var hooks = data.hook || (data.hook = {});
	    for (var i = 0; i < hooksToMerge.length; i++) {
	      var key = hooksToMerge[i];
	      var existing = hooks[key];
	      var toMerge = componentVNodeHooks[key];
	      if (existing !== toMerge && !(existing && existing._merged)) {
	        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
	      }
	    }
	  }
	
	  function mergeHook$1 (f1, f2) {
	    var merged = function (a, b) {
	      // flow complains about extra args which is why we use any
	      f1(a, b);
	      f2(a, b);
	    };
	    merged._merged = true;
	    return merged
	  }
	
	  // transform component v-model info (value and callback) into
	  // prop and event handler respectively.
	  function transformModel (options, data) {
	    var prop = (options.model && options.model.prop) || 'value';
	    var event = (options.model && options.model.event) || 'input'
	    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
	    var on = data.on || (data.on = {});
	    var existing = on[event];
	    var callback = data.model.callback;
	    if (isDef(existing)) {
	      if (
	        Array.isArray(existing)
	          ? existing.indexOf(callback) === -1
	          : existing !== callback
	      ) {
	        on[event] = [callback].concat(existing);
	      }
	    } else {
	      on[event] = callback;
	    }
	  }
	
	  /*  */
	
	  var SIMPLE_NORMALIZE = 1;
	  var ALWAYS_NORMALIZE = 2;
	
	  // wrapper function for providing a more flexible interface
	  // without getting yelled at by flow
	  function createElement (
	    context,
	    tag,
	    data,
	    children,
	    normalizationType,
	    alwaysNormalize
	  ) {
	    if (Array.isArray(data) || isPrimitive(data)) {
	      normalizationType = children;
	      children = data;
	      data = undefined;
	    }
	    if (isTrue(alwaysNormalize)) {
	      normalizationType = ALWAYS_NORMALIZE;
	    }
	    return _createElement(context, tag, data, children, normalizationType)
	  }
	
	  function _createElement (
	    context,
	    tag,
	    data,
	    children,
	    normalizationType
	  ) {
	    if (isDef(data) && isDef((data).__ob__)) {
	      warn(
	        "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	        'Always create fresh vnode data objects in each render!',
	        context
	      );
	      return createEmptyVNode()
	    }
	    // object syntax in v-bind
	    if (isDef(data) && isDef(data.is)) {
	      tag = data.is;
	    }
	    if (!tag) {
	      // in case of component :is set to falsy value
	      return createEmptyVNode()
	    }
	    // warn against non-primitive key
	    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
	    ) {
	      {
	        warn(
	          'Avoid using non-primitive value as key, ' +
	          'use string/number value instead.',
	          context
	        );
	      }
	    }
	    // support single function children as default scoped slot
	    if (Array.isArray(children) &&
	      typeof children[0] === 'function'
	    ) {
	      data = data || {};
	      data.scopedSlots = { default: children[0] };
	      children.length = 0;
	    }
	    if (normalizationType === ALWAYS_NORMALIZE) {
	      children = normalizeChildren(children);
	    } else if (normalizationType === SIMPLE_NORMALIZE) {
	      children = simpleNormalizeChildren(children);
	    }
	    var vnode, ns;
	    if (typeof tag === 'string') {
	      var Ctor;
	      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
	      if (config.isReservedTag(tag)) {
	        // platform built-in elements
	        vnode = new VNode(
	          config.parsePlatformTagName(tag), data, children,
	          undefined, undefined, context
	        );
	      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	        // component
	        vnode = createComponent(Ctor, data, context, children, tag);
	      } else {
	        // unknown or unlisted namespaced elements
	        // check at runtime because it may get assigned a namespace when its
	        // parent normalizes children
	        vnode = new VNode(
	          tag, data, children,
	          undefined, undefined, context
	        );
	      }
	    } else {
	      // direct component options / constructor
	      vnode = createComponent(tag, data, context, children);
	    }
	    if (Array.isArray(vnode)) {
	      return vnode
	    } else if (isDef(vnode)) {
	      if (isDef(ns)) { applyNS(vnode, ns); }
	      if (isDef(data)) { registerDeepBindings(data); }
	      return vnode
	    } else {
	      return createEmptyVNode()
	    }
	  }
	
	  function applyNS (vnode, ns, force) {
	    vnode.ns = ns;
	    if (vnode.tag === 'foreignObject') {
	      // use default namespace inside foreignObject
	      ns = undefined;
	      force = true;
	    }
	    if (isDef(vnode.children)) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        var child = vnode.children[i];
	        if (isDef(child.tag) && (
	          isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
	          applyNS(child, ns, force);
	        }
	      }
	    }
	  }
	
	  // ref #5318
	  // necessary to ensure parent re-render when deep bindings like :style and
	  // :class are used on slot nodes
	  function registerDeepBindings (data) {
	    if (isObject(data.style)) {
	      traverse(data.style);
	    }
	    if (isObject(data.class)) {
	      traverse(data.class);
	    }
	  }
	
	  /*  */
	
	  function initRender (vm) {
	    vm._vnode = null; // the root of the child tree
	    vm._staticTrees = null; // v-once cached trees
	    var options = vm.$options;
	    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
	    var renderContext = parentVnode && parentVnode.context;
	    vm.$slots = resolveSlots(options._renderChildren, renderContext);
	    vm.$scopedSlots = emptyObject;
	    // bind the createElement fn to this instance
	    // so that we get proper render context inside it.
	    // args order: tag, data, children, normalizationType, alwaysNormalize
	    // internal version is used by render functions compiled from templates
	    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	    // normalization is always applied for the public version, used in
	    // user-written render functions.
	    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	
	    // $attrs & $listeners are exposed for easier HOC creation.
	    // they need to be reactive so that HOCs using them are always updated
	    var parentData = parentVnode && parentVnode.data;
	
	    /* istanbul ignore else */
	    {
	      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
	        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
	      }, true);
	      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
	        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
	      }, true);
	    }
	  }
	
	  var currentRenderingInstance = null;
	
	  function renderMixin (Vue) {
	    // install runtime convenience helpers
	    installRenderHelpers(Vue.prototype);
	
	    Vue.prototype.$nextTick = function (fn) {
	      return nextTick(fn, this)
	    };
	
	    Vue.prototype._render = function () {
	      var vm = this;
	      var ref = vm.$options;
	      var render = ref.render;
	      var _parentVnode = ref._parentVnode;
	
	      if (_parentVnode) {
	        vm.$scopedSlots = normalizeScopedSlots(
	          _parentVnode.data.scopedSlots,
	          vm.$slots,
	          vm.$scopedSlots
	        );
	      }
	
	      // set parent vnode. this allows render functions to have access
	      // to the data on the placeholder node.
	      vm.$vnode = _parentVnode;
	      // render self
	      var vnode;
	      try {
	        // There's no need to maintain a stack becaues all render fns are called
	        // separately from one another. Nested component's render fns are called
	        // when parent component is patched.
	        currentRenderingInstance = vm;
	        vnode = render.call(vm._renderProxy, vm.$createElement);
	      } catch (e) {
	        handleError(e, vm, "render");
	        // return error render result,
	        // or previous vnode to prevent render error causing blank component
	        /* istanbul ignore else */
	        if (vm.$options.renderError) {
	          try {
	            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
	          } catch (e) {
	            handleError(e, vm, "renderError");
	            vnode = vm._vnode;
	          }
	        } else {
	          vnode = vm._vnode;
	        }
	      } finally {
	        currentRenderingInstance = null;
	      }
	      // if the returned array contains only a single node, allow it
	      if (Array.isArray(vnode) && vnode.length === 1) {
	        vnode = vnode[0];
	      }
	      // return empty vnode in case the render function errored out
	      if (!(vnode instanceof VNode)) {
	        if (Array.isArray(vnode)) {
	          warn(
	            'Multiple root nodes returned from render function. Render function ' +
	            'should return a single root node.',
	            vm
	          );
	        }
	        vnode = createEmptyVNode();
	      }
	      // set parent
	      vnode.parent = _parentVnode;
	      return vnode
	    };
	  }
	
	  /*  */
	
	  function ensureCtor (comp, base) {
	    if (
	      comp.__esModule ||
	      (hasSymbol && comp[Symbol.toStringTag] === 'Module')
	    ) {
	      comp = comp.default;
	    }
	    return isObject(comp)
	      ? base.extend(comp)
	      : comp
	  }
	
	  function createAsyncPlaceholder (
	    factory,
	    data,
	    context,
	    children,
	    tag
	  ) {
	    var node = createEmptyVNode();
	    node.asyncFactory = factory;
	    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
	    return node
	  }
	
	  function resolveAsyncComponent (
	    factory,
	    baseCtor
	  ) {
	    if (isTrue(factory.error) && isDef(factory.errorComp)) {
	      return factory.errorComp
	    }
	
	    if (isDef(factory.resolved)) {
	      return factory.resolved
	    }
	
	    var owner = currentRenderingInstance;
	    if (isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
	      // already pending
	      factory.owners.push(owner);
	    }
	
	    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	      return factory.loadingComp
	    }
	
	    if (!isDef(factory.owners)) {
	      var owners = factory.owners = [owner];
	      var sync = true
	
	      ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });
	
	      var forceRender = function (renderCompleted) {
	        for (var i = 0, l = owners.length; i < l; i++) {
	          (owners[i]).$forceUpdate();
	        }
	
	        if (renderCompleted) {
	          owners.length = 0;
	        }
	      };
	
	      var resolve = once(function (res) {
	        // cache resolved
	        factory.resolved = ensureCtor(res, baseCtor);
	        // invoke callbacks only if this is not a synchronous resolve
	        // (async resolves are shimmed as synchronous during SSR)
	        if (!sync) {
	          forceRender(true);
	        } else {
	          owners.length = 0;
	        }
	      });
	
	      var reject = once(function (reason) {
	        warn(
	          "Failed to resolve async component: " + (String(factory)) +
	          (reason ? ("\nReason: " + reason) : '')
	        );
	        if (isDef(factory.errorComp)) {
	          factory.error = true;
	          forceRender(true);
	        }
	      });
	
	      var res = factory(resolve, reject);
	
	      if (isObject(res)) {
	        if (isPromise(res)) {
	          // () => Promise
	          if (isUndef(factory.resolved)) {
	            res.then(resolve, reject);
	          }
	        } else if (isPromise(res.component)) {
	          res.component.then(resolve, reject);
	
	          if (isDef(res.error)) {
	            factory.errorComp = ensureCtor(res.error, baseCtor);
	          }
	
	          if (isDef(res.loading)) {
	            factory.loadingComp = ensureCtor(res.loading, baseCtor);
	            if (res.delay === 0) {
	              factory.loading = true;
	            } else {
	              setTimeout(function () {
	                if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                  factory.loading = true;
	                  forceRender(false);
	                }
	              }, res.delay || 200);
	            }
	          }
	
	          if (isDef(res.timeout)) {
	            setTimeout(function () {
	              if (isUndef(factory.resolved)) {
	                reject(
	                  "timeout (" + (res.timeout) + "ms)"
	                );
	              }
	            }, res.timeout);
	          }
	        }
	      }
	
	      sync = false;
	      // return in case resolved synchronously
	      return factory.loading
	        ? factory.loadingComp
	        : factory.resolved
	    }
	  }
	
	  /*  */
	
	  function isAsyncPlaceholder (node) {
	    return node.isComment && node.asyncFactory
	  }
	
	  /*  */
	
	  function getFirstComponentChild (children) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; i++) {
	        var c = children[i];
	        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
	          return c
	        }
	      }
	    }
	  }
	
	  /*  */
	
	  /*  */
	
	  function initEvents (vm) {
	    vm._events = Object.create(null);
	    vm._hasHookEvent = false;
	    // init parent attached events
	    var listeners = vm.$options._parentListeners;
	    if (listeners) {
	      updateComponentListeners(vm, listeners);
	    }
	  }
	
	  var target;
	
	  function add (event, fn) {
	    target.$on(event, fn);
	  }
	
	  function remove$1 (event, fn) {
	    target.$off(event, fn);
	  }
	
	  function createOnceHandler (event, fn) {
	    var _target = target;
	    return function onceHandler () {
	      var res = fn.apply(null, arguments);
	      if (res !== null) {
	        _target.$off(event, onceHandler);
	      }
	    }
	  }
	
	  function updateComponentListeners (
	    vm,
	    listeners,
	    oldListeners
	  ) {
	    target = vm;
	    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
	    target = undefined;
	  }
	
	  function eventsMixin (Vue) {
	    var hookRE = /^hook:/;
	    Vue.prototype.$on = function (event, fn) {
	      var vm = this;
	      if (Array.isArray(event)) {
	        for (var i = 0, l = event.length; i < l; i++) {
	          vm.$on(event[i], fn);
	        }
	      } else {
	        (vm._events[event] || (vm._events[event] = [])).push(fn);
	        // optimize hook:event cost by using a boolean flag marked at registration
	        // instead of a hash lookup
	        if (hookRE.test(event)) {
	          vm._hasHookEvent = true;
	        }
	      }
	      return vm
	    };
	
	    Vue.prototype.$once = function (event, fn) {
	      var vm = this;
	      function on () {
	        vm.$off(event, on);
	        fn.apply(vm, arguments);
	      }
	      on.fn = fn;
	      vm.$on(event, on);
	      return vm
	    };
	
	    Vue.prototype.$off = function (event, fn) {
	      var vm = this;
	      // all
	      if (!arguments.length) {
	        vm._events = Object.create(null);
	        return vm
	      }
	      // array of events
	      if (Array.isArray(event)) {
	        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	          vm.$off(event[i$1], fn);
	        }
	        return vm
	      }
	      // specific event
	      var cbs = vm._events[event];
	      if (!cbs) {
	        return vm
	      }
	      if (!fn) {
	        vm._events[event] = null;
	        return vm
	      }
	      // specific handler
	      var cb;
	      var i = cbs.length;
	      while (i--) {
	        cb = cbs[i];
	        if (cb === fn || cb.fn === fn) {
	          cbs.splice(i, 1);
	          break
	        }
	      }
	      return vm
	    };
	
	    Vue.prototype.$emit = function (event) {
	      var vm = this;
	      {
	        var lowerCaseEvent = event.toLowerCase();
	        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	          tip(
	            "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	            (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	            "Note that HTML attributes are case-insensitive and you cannot use " +
	            "v-on to listen to camelCase events when using in-DOM templates. " +
	            "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	          );
	        }
	      }
	      var cbs = vm._events[event];
	      if (cbs) {
	        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	        var args = toArray(arguments, 1);
	        var info = "event handler for \"" + event + "\"";
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
	        }
	      }
	      return vm
	    };
	  }
	
	  /*  */
	
	  var activeInstance = null;
	  var isUpdatingChildComponent = false;
	
	  function setActiveInstance(vm) {
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    return function () {
	      activeInstance = prevActiveInstance;
	    }
	  }
	
	  function initLifecycle (vm) {
	    var options = vm.$options;
	
	    // locate first non-abstract parent
	    var parent = options.parent;
	    if (parent && !options.abstract) {
	      while (parent.$options.abstract && parent.$parent) {
	        parent = parent.$parent;
	      }
	      parent.$children.push(vm);
	    }
	
	    vm.$parent = parent;
	    vm.$root = parent ? parent.$root : vm;
	
	    vm.$children = [];
	    vm.$refs = {};
	
	    vm._watcher = null;
	    vm._inactive = null;
	    vm._directInactive = false;
	    vm._isMounted = false;
	    vm._isDestroyed = false;
	    vm._isBeingDestroyed = false;
	  }
	
	  function lifecycleMixin (Vue) {
	    Vue.prototype._update = function (vnode, hydrating) {
	      var vm = this;
	      var prevEl = vm.$el;
	      var prevVnode = vm._vnode;
	      var restoreActiveInstance = setActiveInstance(vm);
	      vm._vnode = vnode;
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      if (!prevVnode) {
	        // initial render
	        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
	      } else {
	        // updates
	        vm.$el = vm.__patch__(prevVnode, vnode);
	      }
	      restoreActiveInstance();
	      // update __vue__ reference
	      if (prevEl) {
	        prevEl.__vue__ = null;
	      }
	      if (vm.$el) {
	        vm.$el.__vue__ = vm;
	      }
	      // if parent is an HOC, update its $el as well
	      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	        vm.$parent.$el = vm.$el;
	      }
	      // updated hook is called by the scheduler to ensure that children are
	      // updated in a parent's updated hook.
	    };
	
	    Vue.prototype.$forceUpdate = function () {
	      var vm = this;
	      if (vm._watcher) {
	        vm._watcher.update();
	      }
	    };
	
	    Vue.prototype.$destroy = function () {
	      var vm = this;
	      if (vm._isBeingDestroyed) {
	        return
	      }
	      callHook(vm, 'beforeDestroy');
	      vm._isBeingDestroyed = true;
	      // remove self from parent
	      var parent = vm.$parent;
	      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	        remove(parent.$children, vm);
	      }
	      // teardown watchers
	      if (vm._watcher) {
	        vm._watcher.teardown();
	      }
	      var i = vm._watchers.length;
	      while (i--) {
	        vm._watchers[i].teardown();
	      }
	      // remove reference from data ob
	      // frozen object may not have observer.
	      if (vm._data.__ob__) {
	        vm._data.__ob__.vmCount--;
	      }
	      // call the last hook...
	      vm._isDestroyed = true;
	      // invoke destroy hooks on current rendered tree
	      vm.__patch__(vm._vnode, null);
	      // fire destroyed hook
	      callHook(vm, 'destroyed');
	      // turn off all instance listeners.
	      vm.$off();
	      // remove __vue__ reference
	      if (vm.$el) {
	        vm.$el.__vue__ = null;
	      }
	      // release circular reference (#6759)
	      if (vm.$vnode) {
	        vm.$vnode.parent = null;
	      }
	    };
	  }
	
	  function mountComponent (
	    vm,
	    el,
	    hydrating
	  ) {
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      {
	        /* istanbul ignore if */
	        if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	          vm.$options.el || el) {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'compiler is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	
	    var updateComponent;
	    /* istanbul ignore if */
	    if (config.performance && mark) {
	      updateComponent = function () {
	        var name = vm._name;
	        var id = vm._uid;
	        var startTag = "vue-perf-start:" + id;
	        var endTag = "vue-perf-end:" + id;
	
	        mark(startTag);
	        var vnode = vm._render();
	        mark(endTag);
	        measure(("vue " + name + " render"), startTag, endTag);
	
	        mark(startTag);
	        vm._update(vnode, hydrating);
	        mark(endTag);
	        measure(("vue " + name + " patch"), startTag, endTag);
	      };
	    } else {
	      updateComponent = function () {
	        vm._update(vm._render(), hydrating);
	      };
	    }
	
	    // we set this to vm._watcher inside the watcher's constructor
	    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
	    // component's mounted hook), which relies on vm._watcher being already defined
	    new Watcher(vm, updateComponent, noop, {
	      before: function before () {
	        if (vm._isMounted && !vm._isDestroyed) {
	          callHook(vm, 'beforeUpdate');
	        }
	      }
	    }, true /* isRenderWatcher */);
	    hydrating = false;
	
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  }
	
	  function updateChildComponent (
	    vm,
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    {
	      isUpdatingChildComponent = true;
	    }
	
	    // determine whether component has slot children
	    // we need to do this before overwriting $options._renderChildren.
	
	    // check if there are dynamic scopedSlots (hand-written or compiled but with
	    // dynamic slot names). Static scoped slots compiled from template has the
	    // "$stable" marker.
	    var newScopedSlots = parentVnode.data.scopedSlots;
	    var oldScopedSlots = vm.$scopedSlots;
	    var hasDynamicScopedSlot = !!(
	      (newScopedSlots && !newScopedSlots.$stable) ||
	      (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
	      (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
	    );
	
	    // Any static slot children from the parent may have changed during parent's
	    // update. Dynamic scoped slots may also have changed. In such cases, a forced
	    // update is necessary to ensure correctness.
	    var needsForceUpdate = !!(
	      renderChildren ||               // has new static slots
	      vm.$options._renderChildren ||  // has old static slots
	      hasDynamicScopedSlot
	    );
	
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	
	    if (vm._vnode) { // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	
	    // update $attrs and $listeners hash
	    // these are also reactive so they may trigger child update if the child
	    // used them during render
	    vm.$attrs = parentVnode.data.attrs || emptyObject;
	    vm.$listeners = listeners || emptyObject;
	
	    // update props
	    if (propsData && vm.$options.props) {
	      toggleObserving(false);
	      var props = vm._props;
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        var propOptions = vm.$options.props; // wtf flow?
	        props[key] = validateProp(key, propOptions, propsData, vm);
	      }
	      toggleObserving(true);
	      // keep a copy of raw propsData
	      vm.$options.propsData = propsData;
	    }
	
	    // update listeners
	    listeners = listeners || emptyObject;
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	
	    // resolve slots + force update if has children
	    if (needsForceUpdate) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	
	    {
	      isUpdatingChildComponent = false;
	    }
	  }
	
	  function isInInactiveTree (vm) {
	    while (vm && (vm = vm.$parent)) {
	      if (vm._inactive) { return true }
	    }
	    return false
	  }
	
	  function activateChildComponent (vm, direct) {
	    if (direct) {
	      vm._directInactive = false;
	      if (isInInactiveTree(vm)) {
	        return
	      }
	    } else if (vm._directInactive) {
	      return
	    }
	    if (vm._inactive || vm._inactive === null) {
	      vm._inactive = false;
	      for (var i = 0; i < vm.$children.length; i++) {
	        activateChildComponent(vm.$children[i]);
	      }
	      callHook(vm, 'activated');
	    }
	  }
	
	  function deactivateChildComponent (vm, direct) {
	    if (direct) {
	      vm._directInactive = true;
	      if (isInInactiveTree(vm)) {
	        return
	      }
	    }
	    if (!vm._inactive) {
	      vm._inactive = true;
	      for (var i = 0; i < vm.$children.length; i++) {
	        deactivateChildComponent(vm.$children[i]);
	      }
	      callHook(vm, 'deactivated');
	    }
	  }
	
	  function callHook (vm, hook) {
	    // #7573 disable dep collection when invoking lifecycle hooks
	    pushTarget();
	    var handlers = vm.$options[hook];
	    var info = hook + " hook";
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
	      }
	    }
	    if (vm._hasHookEvent) {
	      vm.$emit('hook:' + hook);
	    }
	    popTarget();
	  }
	
	  /*  */
	
	  var MAX_UPDATE_COUNT = 100;
	
	  var queue = [];
	  var activatedChildren = [];
	  var has = {};
	  var circular = {};
	  var waiting = false;
	  var flushing = false;
	  var index = 0;
	
	  /**
	   * Reset the scheduler's state.
	   */
	  function resetSchedulerState () {
	    index = queue.length = activatedChildren.length = 0;
	    has = {};
	    {
	      circular = {};
	    }
	    waiting = flushing = false;
	  }
	
	  // Async edge case #6566 requires saving the timestamp when event listeners are
	  // attached. However, calling performance.now() has a perf overhead especially
	  // if the page has thousands of event listeners. Instead, we take a timestamp
	  // every time the scheduler flushes and use that for all event listeners
	  // attached during that flush.
	  var currentFlushTimestamp = 0;
	
	  // Async edge case fix requires storing an event listener's attach timestamp.
	  var getNow = Date.now;
	
	  // Determine what event timestamp the browser is using. Annoyingly, the
	  // timestamp can either be hi-res (relative to page load) or low-res
	  // (relative to UNIX epoch), so in order to compare time we have to use the
	  // same timestamp type when saving the flush timestamp.
	  if (inBrowser && getNow() > document.createEvent('Event').timeStamp) {
	    // if the low-res timestamp which is bigger than the event timestamp
	    // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
	    // and we need to use the hi-res version for event listeners as well.
	    getNow = function () { return performance.now(); };
	  }
	
	  /**
	   * Flush both queues and run the watchers.
	   */
	  function flushSchedulerQueue () {
	    currentFlushTimestamp = getNow();
	    flushing = true;
	    var watcher, id;
	
	    // Sort queue before flush.
	    // This ensures that:
	    // 1. Components are updated from parent to child. (because parent is always
	    //    created before the child)
	    // 2. A component's user watchers are run before its render watcher (because
	    //    user watchers are created before the render watcher)
	    // 3. If a component is destroyed during a parent component's watcher run,
	    //    its watchers can be skipped.
	    queue.sort(function (a, b) { return a.id - b.id; });
	
	    // do not cache length because more watchers might be pushed
	    // as we run existing watchers
	    for (index = 0; index < queue.length; index++) {
	      watcher = queue[index];
	      if (watcher.before) {
	        watcher.before();
	      }
	      id = watcher.id;
	      has[id] = null;
	      watcher.run();
	      // in dev build, check and stop circular updates.
	      if (has[id] != null) {
	        circular[id] = (circular[id] || 0) + 1;
	        if (circular[id] > MAX_UPDATE_COUNT) {
	          warn(
	            'You may have an infinite update loop ' + (
	              watcher.user
	                ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	                : "in a component render function."
	            ),
	            watcher.vm
	          );
	          break
	        }
	      }
	    }
	
	    // keep copies of post queues before resetting state
	    var activatedQueue = activatedChildren.slice();
	    var updatedQueue = queue.slice();
	
	    resetSchedulerState();
	
	    // call component updated and activated hooks
	    callActivatedHooks(activatedQueue);
	    callUpdatedHooks(updatedQueue);
	
	    // devtool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	  }
	
	  function callUpdatedHooks (queue) {
	    var i = queue.length;
	    while (i--) {
	      var watcher = queue[i];
	      var vm = watcher.vm;
	      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
	        callHook(vm, 'updated');
	      }
	    }
	  }
	
	  /**
	   * Queue a kept-alive component that was activated during patch.
	   * The queue will be processed after the entire tree has been patched.
	   */
	  function queueActivatedComponent (vm) {
	    // setting _inactive to false here so that a render function can
	    // rely on checking whether it's in an inactive tree (e.g. router-view)
	    vm._inactive = false;
	    activatedChildren.push(vm);
	  }
	
	  function callActivatedHooks (queue) {
	    for (var i = 0; i < queue.length; i++) {
	      queue[i]._inactive = true;
	      activateChildComponent(queue[i], true /* true */);
	    }
	  }
	
	  /**
	   * Push a watcher into the watcher queue.
	   * Jobs with duplicate IDs will be skipped unless it's
	   * pushed when the queue is being flushed.
	   */
	  function queueWatcher (watcher) {
	    var id = watcher.id;
	    if (has[id] == null) {
	      has[id] = true;
	      if (!flushing) {
	        queue.push(watcher);
	      } else {
	        // if already flushing, splice the watcher based on its id
	        // if already past its id, it will be run next immediately.
	        var i = queue.length - 1;
	        while (i > index && queue[i].id > watcher.id) {
	          i--;
	        }
	        queue.splice(i + 1, 0, watcher);
	      }
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	
	        if (!config.async) {
	          flushSchedulerQueue();
	          return
	        }
	        nextTick(flushSchedulerQueue);
	      }
	    }
	  }
	
	  /*  */
	
	
	
	  var uid$2 = 0;
	
	  /**
	   * A watcher parses an expression, collects dependencies,
	   * and fires callback when the expression value changes.
	   * This is used for both the $watch() api and directives.
	   */
	  var Watcher = function Watcher (
	    vm,
	    expOrFn,
	    cb,
	    options,
	    isRenderWatcher
	  ) {
	    this.vm = vm;
	    if (isRenderWatcher) {
	      vm._watcher = this;
	    }
	    vm._watchers.push(this);
	    // options
	    if (options) {
	      this.deep = !!options.deep;
	      this.user = !!options.user;
	      this.lazy = !!options.lazy;
	      this.sync = !!options.sync;
	      this.before = options.before;
	    } else {
	      this.deep = this.user = this.lazy = this.sync = false;
	    }
	    this.cb = cb;
	    this.id = ++uid$2; // uid for batching
	    this.active = true;
	    this.dirty = this.lazy; // for lazy watchers
	    this.deps = [];
	    this.newDeps = [];
	    this.depIds = new _Set();
	    this.newDepIds = new _Set();
	    this.expression = expOrFn.toString();
	    // parse expression for getter
	    if (typeof expOrFn === 'function') {
	      this.getter = expOrFn;
	    } else {
	      this.getter = parsePath(expOrFn);
	      if (!this.getter) {
	        this.getter = noop;
	        warn(
	          "Failed watching path: \"" + expOrFn + "\" " +
	          'Watcher only accepts simple dot-delimited paths. ' +
	          'For full control, use a function instead.',
	          vm
	        );
	      }
	    }
	    this.value = this.lazy
	      ? undefined
	      : this.get();
	  };
	
	  /**
	   * Evaluate the getter, and re-collect dependencies.
	   */
	  Watcher.prototype.get = function get () {
	    pushTarget(this);
	    var value;
	    var vm = this.vm;
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      if (this.user) {
	        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	      } else {
	        throw e
	      }
	    } finally {
	      // "touch" every property so they are all tracked as
	      // dependencies for deep watching
	      if (this.deep) {
	        traverse(value);
	      }
	      popTarget();
	      this.cleanupDeps();
	    }
	    return value
	  };
	
	  /**
	   * Add a dependency to this directive.
	   */
	  Watcher.prototype.addDep = function addDep (dep) {
	    var id = dep.id;
	    if (!this.newDepIds.has(id)) {
	      this.newDepIds.add(id);
	      this.newDeps.push(dep);
	      if (!this.depIds.has(id)) {
	        dep.addSub(this);
	      }
	    }
	  };
	
	  /**
	   * Clean up for dependency collection.
	   */
	  Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var i = this.deps.length;
	    while (i--) {
	      var dep = this.deps[i];
	      if (!this.newDepIds.has(dep.id)) {
	        dep.removeSub(this);
	      }
	    }
	    var tmp = this.depIds;
	    this.depIds = this.newDepIds;
	    this.newDepIds = tmp;
	    this.newDepIds.clear();
	    tmp = this.deps;
	    this.deps = this.newDeps;
	    this.newDeps = tmp;
	    this.newDeps.length = 0;
	  };
	
	  /**
	   * Subscriber interface.
	   * Will be called when a dependency changes.
	   */
	  Watcher.prototype.update = function update () {
	    /* istanbul ignore else */
	    if (this.lazy) {
	      this.dirty = true;
	    } else if (this.sync) {
	      this.run();
	    } else {
	      queueWatcher(this);
	    }
	  };
	
	  /**
	   * Scheduler job interface.
	   * Will be called by the scheduler.
	   */
	  Watcher.prototype.run = function run () {
	    if (this.active) {
	      var value = this.get();
	      if (
	        value !== this.value ||
	        // Deep watchers and watchers on Object/Arrays should fire even
	        // when the value is the same, because the value may
	        // have mutated.
	        isObject(value) ||
	        this.deep
	      ) {
	        // set new value
	        var oldValue = this.value;
	        this.value = value;
	        if (this.user) {
	          try {
	            this.cb.call(this.vm, value, oldValue);
	          } catch (e) {
	            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	          }
	        } else {
	          this.cb.call(this.vm, value, oldValue);
	        }
	      }
	    }
	  };
	
	  /**
	   * Evaluate the value of the watcher.
	   * This only gets called for lazy watchers.
	   */
	  Watcher.prototype.evaluate = function evaluate () {
	    this.value = this.get();
	    this.dirty = false;
	  };
	
	  /**
	   * Depend on all deps collected by this watcher.
	   */
	  Watcher.prototype.depend = function depend () {
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].depend();
	    }
	  };
	
	  /**
	   * Remove self from all dependencies' subscriber list.
	   */
	  Watcher.prototype.teardown = function teardown () {
	    if (this.active) {
	      // remove self from vm's watcher list
	      // this is a somewhat expensive operation so we skip it
	      // if the vm is being destroyed.
	      if (!this.vm._isBeingDestroyed) {
	        remove(this.vm._watchers, this);
	      }
	      var i = this.deps.length;
	      while (i--) {
	        this.deps[i].removeSub(this);
	      }
	      this.active = false;
	    }
	  };
	
	  /*  */
	
	  var sharedPropertyDefinition = {
	    enumerable: true,
	    configurable: true,
	    get: noop,
	    set: noop
	  };
	
	  function proxy (target, sourceKey, key) {
	    sharedPropertyDefinition.get = function proxyGetter () {
	      return this[sourceKey][key]
	    };
	    sharedPropertyDefinition.set = function proxySetter (val) {
	      this[sourceKey][key] = val;
	    };
	    Object.defineProperty(target, key, sharedPropertyDefinition);
	  }
	
	  function initState (vm) {
	    vm._watchers = [];
	    var opts = vm.$options;
	    if (opts.props) { initProps(vm, opts.props); }
	    if (opts.methods) { initMethods(vm, opts.methods); }
	    if (opts.data) {
	      initData(vm);
	    } else {
	      observe(vm._data = {}, true /* asRootData */);
	    }
	    if (opts.computed) { initComputed(vm, opts.computed); }
	    if (opts.watch && opts.watch !== nativeWatch) {
	      initWatch(vm, opts.watch);
	    }
	  }
	
	  function initProps (vm, propsOptions) {
	    var propsData = vm.$options.propsData || {};
	    var props = vm._props = {};
	    // cache prop keys so that future props updates can iterate using Array
	    // instead of dynamic object key enumeration.
	    var keys = vm.$options._propKeys = [];
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    if (!isRoot) {
	      toggleObserving(false);
	    }
	    var loop = function ( key ) {
	      keys.push(key);
	      var value = validateProp(key, propsOptions, propsData, vm);
	      /* istanbul ignore else */
	      {
	        var hyphenatedKey = hyphenate(key);
	        if (isReservedAttribute(hyphenatedKey) ||
	            config.isReservedAttr(hyphenatedKey)) {
	          warn(
	            ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
	            vm
	          );
	        }
	        defineReactive$$1(props, key, value, function () {
	          if (!isRoot && !isUpdatingChildComponent) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            );
	          }
	        });
	      }
	      // static props are already proxied on the component's prototype
	      // during Vue.extend(). We only need to proxy props defined at
	      // instantiation here.
	      if (!(key in vm)) {
	        proxy(vm, "_props", key);
	      }
	    };
	
	    for (var key in propsOptions) loop( key );
	    toggleObserving(true);
	  }
	
	  function initData (vm) {
	    var data = vm.$options.data;
	    data = vm._data = typeof data === 'function'
	      ? getData(data, vm)
	      : data || {};
	    if (!isPlainObject(data)) {
	      data = {};
	      warn(
	        'data functions should return an object:\n' +
	        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	        vm
	      );
	    }
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var props = vm.$options.props;
	    var methods = vm.$options.methods;
	    var i = keys.length;
	    while (i--) {
	      var key = keys[i];
	      {
	        if (methods && hasOwn(methods, key)) {
	          warn(
	            ("Method \"" + key + "\" has already been defined as a data property."),
	            vm
	          );
	        }
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          "The data property \"" + key + "\" is already declared as a prop. " +
	          "Use prop default value instead.",
	          vm
	        );
	      } else if (!isReserved(key)) {
	        proxy(vm, "_data", key);
	      }
	    }
	    // observe data
	    observe(data, true /* asRootData */);
	  }
	
	  function getData (data, vm) {
	    // #7573 disable dep collection when invoking data getters
	    pushTarget();
	    try {
	      return data.call(vm, vm)
	    } catch (e) {
	      handleError(e, vm, "data()");
	      return {}
	    } finally {
	      popTarget();
	    }
	  }
	
	  var computedWatcherOptions = { lazy: true };
	
	  function initComputed (vm, computed) {
	    // $flow-disable-line
	    var watchers = vm._computedWatchers = Object.create(null);
	    // computed properties are just getters during SSR
	    var isSSR = isServerRendering();
	
	    for (var key in computed) {
	      var userDef = computed[key];
	      var getter = typeof userDef === 'function' ? userDef : userDef.get;
	      if (getter == null) {
	        warn(
	          ("Getter is missing for computed property \"" + key + "\"."),
	          vm
	        );
	      }
	
	      if (!isSSR) {
	        // create internal watcher for the computed property.
	        watchers[key] = new Watcher(
	          vm,
	          getter || noop,
	          noop,
	          computedWatcherOptions
	        );
	      }
	
	      // component-defined computed properties are already defined on the
	      // component prototype. We only need to define computed properties defined
	      // at instantiation here.
	      if (!(key in vm)) {
	        defineComputed(vm, key, userDef);
	      } else {
	        if (key in vm.$data) {
	          warn(("The computed property \"" + key + "\" is already defined in data."), vm);
	        } else if (vm.$options.props && key in vm.$options.props) {
	          warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
	        }
	      }
	    }
	  }
	
	  function defineComputed (
	    target,
	    key,
	    userDef
	  ) {
	    var shouldCache = !isServerRendering();
	    if (typeof userDef === 'function') {
	      sharedPropertyDefinition.get = shouldCache
	        ? createComputedGetter(key)
	        : createGetterInvoker(userDef);
	      sharedPropertyDefinition.set = noop;
	    } else {
	      sharedPropertyDefinition.get = userDef.get
	        ? shouldCache && userDef.cache !== false
	          ? createComputedGetter(key)
	          : createGetterInvoker(userDef.get)
	        : noop;
	      sharedPropertyDefinition.set = userDef.set || noop;
	    }
	    if (sharedPropertyDefinition.set === noop) {
	      sharedPropertyDefinition.set = function () {
	        warn(
	          ("Computed property \"" + key + "\" was assigned to but it has no setter."),
	          this
	        );
	      };
	    }
	    Object.defineProperty(target, key, sharedPropertyDefinition);
	  }
	
	  function createComputedGetter (key) {
	    return function computedGetter () {
	      var watcher = this._computedWatchers && this._computedWatchers[key];
	      if (watcher) {
	        if (watcher.dirty) {
	          watcher.evaluate();
	        }
	        if (Dep.target) {
	          watcher.depend();
	        }
	        return watcher.value
	      }
	    }
	  }
	
	  function createGetterInvoker(fn) {
	    return function computedGetter () {
	      return fn.call(this, this)
	    }
	  }
	
	  function initMethods (vm, methods) {
	    var props = vm.$options.props;
	    for (var key in methods) {
	      {
	        if (typeof methods[key] !== 'function') {
	          warn(
	            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
	            "Did you reference the function correctly?",
	            vm
	          );
	        }
	        if (props && hasOwn(props, key)) {
	          warn(
	            ("Method \"" + key + "\" has already been defined as a prop."),
	            vm
	          );
	        }
	        if ((key in vm) && isReserved(key)) {
	          warn(
	            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
	            "Avoid defining component methods that start with _ or $."
	          );
	        }
	      }
	      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
	    }
	  }
	
	  function initWatch (vm, watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	
	  function createWatcher (
	    vm,
	    expOrFn,
	    handler,
	    options
	  ) {
	    if (isPlainObject(handler)) {
	      options = handler;
	      handler = handler.handler;
	    }
	    if (typeof handler === 'string') {
	      handler = vm[handler];
	    }
	    return vm.$watch(expOrFn, handler, options)
	  }
	
	  function stateMixin (Vue) {
	    // flow somehow has problems with directly declared definition object
	    // when using Object.defineProperty, so we have to procedurally build up
	    // the object here.
	    var dataDef = {};
	    dataDef.get = function () { return this._data };
	    var propsDef = {};
	    propsDef.get = function () { return this._props };
	    {
	      dataDef.set = function () {
	        warn(
	          'Avoid replacing instance root $data. ' +
	          'Use nested data properties instead.',
	          this
	        );
	      };
	      propsDef.set = function () {
	        warn("$props is readonly.", this);
	      };
	    }
	    Object.defineProperty(Vue.prototype, '$data', dataDef);
	    Object.defineProperty(Vue.prototype, '$props', propsDef);
	
	    Vue.prototype.$set = set;
	    Vue.prototype.$delete = del;
	
	    Vue.prototype.$watch = function (
	      expOrFn,
	      cb,
	      options
	    ) {
	      var vm = this;
	      if (isPlainObject(cb)) {
	        return createWatcher(vm, expOrFn, cb, options)
	      }
	      options = options || {};
	      options.user = true;
	      var watcher = new Watcher(vm, expOrFn, cb, options);
	      if (options.immediate) {
	        try {
	          cb.call(vm, watcher.value);
	        } catch (error) {
	          handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
	        }
	      }
	      return function unwatchFn () {
	        watcher.teardown();
	      }
	    };
	  }
	
	  /*  */
	
	  var uid$3 = 0;
	
	  function initMixin (Vue) {
	    Vue.prototype._init = function (options) {
	      var vm = this;
	      // a uid
	      vm._uid = uid$3++;
	
	      var startTag, endTag;
	      /* istanbul ignore if */
	      if (config.performance && mark) {
	        startTag = "vue-perf-start:" + (vm._uid);
	        endTag = "vue-perf-end:" + (vm._uid);
	        mark(startTag);
	      }
	
	      // a flag to avoid this being observed
	      vm._isVue = true;
	      // merge options
	      if (options && options._isComponent) {
	        // optimize internal component instantiation
	        // since dynamic options merging is pretty slow, and none of the
	        // internal component options needs special treatment.
	        initInternalComponent(vm, options);
	      } else {
	        vm.$options = mergeOptions(
	          resolveConstructorOptions(vm.constructor),
	          options || {},
	          vm
	        );
	      }
	      /* istanbul ignore else */
	      {
	        initProxy(vm);
	      }
	      // expose real self
	      vm._self = vm;
	      initLifecycle(vm);
	      initEvents(vm);
	      initRender(vm);
	      callHook(vm, 'beforeCreate');
	      initInjections(vm); // resolve injections before data/props
	      initState(vm);
	      initProvide(vm); // resolve provide after data/props
	      callHook(vm, 'created');
	
	      /* istanbul ignore if */
	      if (config.performance && mark) {
	        vm._name = formatComponentName(vm, false);
	        mark(endTag);
	        measure(("vue " + (vm._name) + " init"), startTag, endTag);
	      }
	
	      if (vm.$options.el) {
	        vm.$mount(vm.$options.el);
	      }
	    };
	  }
	
	  function initInternalComponent (vm, options) {
	    var opts = vm.$options = Object.create(vm.constructor.options);
	    // doing this because it's faster than dynamic enumeration.
	    var parentVnode = options._parentVnode;
	    opts.parent = options.parent;
	    opts._parentVnode = parentVnode;
	
	    var vnodeComponentOptions = parentVnode.componentOptions;
	    opts.propsData = vnodeComponentOptions.propsData;
	    opts._parentListeners = vnodeComponentOptions.listeners;
	    opts._renderChildren = vnodeComponentOptions.children;
	    opts._componentTag = vnodeComponentOptions.tag;
	
	    if (options.render) {
	      opts.render = options.render;
	      opts.staticRenderFns = options.staticRenderFns;
	    }
	  }
	
	  function resolveConstructorOptions (Ctor) {
	    var options = Ctor.options;
	    if (Ctor.super) {
	      var superOptions = resolveConstructorOptions(Ctor.super);
	      var cachedSuperOptions = Ctor.superOptions;
	      if (superOptions !== cachedSuperOptions) {
	        // super option changed,
	        // need to resolve new options.
	        Ctor.superOptions = superOptions;
	        // check if there are any late-modified/attached options (#4976)
	        var modifiedOptions = resolveModifiedOptions(Ctor);
	        // update base extend options
	        if (modifiedOptions) {
	          extend(Ctor.extendOptions, modifiedOptions);
	        }
	        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	        if (options.name) {
	          options.components[options.name] = Ctor;
	        }
	      }
	    }
	    return options
	  }
	
	  function resolveModifiedOptions (Ctor) {
	    var modified;
	    var latest = Ctor.options;
	    var sealed = Ctor.sealedOptions;
	    for (var key in latest) {
	      if (latest[key] !== sealed[key]) {
	        if (!modified) { modified = {}; }
	        modified[key] = latest[key];
	      }
	    }
	    return modified
	  }
	
	  function Vue (options) {
	    if (!(this instanceof Vue)
	    ) {
	      warn('Vue is a constructor and should be called with the `new` keyword');
	    }
	    this._init(options);
	  }
	
	  initMixin(Vue);
	  stateMixin(Vue);
	  eventsMixin(Vue);
	  lifecycleMixin(Vue);
	  renderMixin(Vue);
	
	  /*  */
	
	  function initUse (Vue) {
	    Vue.use = function (plugin) {
	      var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
	      if (installedPlugins.indexOf(plugin) > -1) {
	        return this
	      }
	
	      // additional parameters
	      var args = toArray(arguments, 1);
	      args.unshift(this);
	      if (typeof plugin.install === 'function') {
	        plugin.install.apply(plugin, args);
	      } else if (typeof plugin === 'function') {
	        plugin.apply(null, args);
	      }
	      installedPlugins.push(plugin);
	      return this
	    };
	  }
	
	  /*  */
	
	  function initMixin$1 (Vue) {
	    Vue.mixin = function (mixin) {
	      this.options = mergeOptions(this.options, mixin);
	      return this
	    };
	  }
	
	  /*  */
	
	  function initExtend (Vue) {
	    /**
	     * Each instance constructor, including Vue, has a unique
	     * cid. This enables us to create wrapped "child
	     * constructors" for prototypal inheritance and cache them.
	     */
	    Vue.cid = 0;
	    var cid = 1;
	
	    /**
	     * Class inheritance
	     */
	    Vue.extend = function (extendOptions) {
	      extendOptions = extendOptions || {};
	      var Super = this;
	      var SuperId = Super.cid;
	      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	      if (cachedCtors[SuperId]) {
	        return cachedCtors[SuperId]
	      }
	
	      var name = extendOptions.name || Super.options.name;
	      if (name) {
	        validateComponentName(name);
	      }
	
	      var Sub = function VueComponent (options) {
	        this._init(options);
	      };
	      Sub.prototype = Object.create(Super.prototype);
	      Sub.prototype.constructor = Sub;
	      Sub.cid = cid++;
	      Sub.options = mergeOptions(
	        Super.options,
	        extendOptions
	      );
	      Sub['super'] = Super;
	
	      // For props and computed properties, we define the proxy getters on
	      // the Vue instances at extension time, on the extended prototype. This
	      // avoids Object.defineProperty calls for each instance created.
	      if (Sub.options.props) {
	        initProps$1(Sub);
	      }
	      if (Sub.options.computed) {
	        initComputed$1(Sub);
	      }
	
	      // allow further extension/mixin/plugin usage
	      Sub.extend = Super.extend;
	      Sub.mixin = Super.mixin;
	      Sub.use = Super.use;
	
	      // create asset registers, so extended classes
	      // can have their private assets too.
	      ASSET_TYPES.forEach(function (type) {
	        Sub[type] = Super[type];
	      });
	      // enable recursive self-lookup
	      if (name) {
	        Sub.options.components[name] = Sub;
	      }
	
	      // keep a reference to the super options at extension time.
	      // later at instantiation we can check if Super's options have
	      // been updated.
	      Sub.superOptions = Super.options;
	      Sub.extendOptions = extendOptions;
	      Sub.sealedOptions = extend({}, Sub.options);
	
	      // cache constructor
	      cachedCtors[SuperId] = Sub;
	      return Sub
	    };
	  }
	
	  function initProps$1 (Comp) {
	    var props = Comp.options.props;
	    for (var key in props) {
	      proxy(Comp.prototype, "_props", key);
	    }
	  }
	
	  function initComputed$1 (Comp) {
	    var computed = Comp.options.computed;
	    for (var key in computed) {
	      defineComputed(Comp.prototype, key, computed[key]);
	    }
	  }
	
	  /*  */
	
	  function initAssetRegisters (Vue) {
	    /**
	     * Create asset registration methods.
	     */
	    ASSET_TYPES.forEach(function (type) {
	      Vue[type] = function (
	        id,
	        definition
	      ) {
	        if (!definition) {
	          return this.options[type + 's'][id]
	        } else {
	          /* istanbul ignore if */
	          if (type === 'component') {
	            validateComponentName(id);
	          }
	          if (type === 'component' && isPlainObject(definition)) {
	            definition.name = definition.name || id;
	            definition = this.options._base.extend(definition);
	          }
	          if (type === 'directive' && typeof definition === 'function') {
	            definition = { bind: definition, update: definition };
	          }
	          this.options[type + 's'][id] = definition;
	          return definition
	        }
	      };
	    });
	  }
	
	  /*  */
	
	
	
	  function getComponentName (opts) {
	    return opts && (opts.Ctor.options.name || opts.tag)
	  }
	
	  function matches (pattern, name) {
	    if (Array.isArray(pattern)) {
	      return pattern.indexOf(name) > -1
	    } else if (typeof pattern === 'string') {
	      return pattern.split(',').indexOf(name) > -1
	    } else if (isRegExp(pattern)) {
	      return pattern.test(name)
	    }
	    /* istanbul ignore next */
	    return false
	  }
	
	  function pruneCache (keepAliveInstance, filter) {
	    var cache = keepAliveInstance.cache;
	    var keys = keepAliveInstance.keys;
	    var _vnode = keepAliveInstance._vnode;
	    for (var key in cache) {
	      var cachedNode = cache[key];
	      if (cachedNode) {
	        var name = getComponentName(cachedNode.componentOptions);
	        if (name && !filter(name)) {
	          pruneCacheEntry(cache, key, keys, _vnode);
	        }
	      }
	    }
	  }
	
	  function pruneCacheEntry (
	    cache,
	    key,
	    keys,
	    current
	  ) {
	    var cached$$1 = cache[key];
	    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
	      cached$$1.componentInstance.$destroy();
	    }
	    cache[key] = null;
	    remove(keys, key);
	  }
	
	  var patternTypes = [String, RegExp, Array];
	
	  var KeepAlive = {
	    name: 'keep-alive',
	    abstract: true,
	
	    props: {
	      include: patternTypes,
	      exclude: patternTypes,
	      max: [String, Number]
	    },
	
	    created: function created () {
	      this.cache = Object.create(null);
	      this.keys = [];
	    },
	
	    destroyed: function destroyed () {
	      for (var key in this.cache) {
	        pruneCacheEntry(this.cache, key, this.keys);
	      }
	    },
	
	    mounted: function mounted () {
	      var this$1 = this;
	
	      this.$watch('include', function (val) {
	        pruneCache(this$1, function (name) { return matches(val, name); });
	      });
	      this.$watch('exclude', function (val) {
	        pruneCache(this$1, function (name) { return !matches(val, name); });
	      });
	    },
	
	    render: function render () {
	      var slot = this.$slots.default;
	      var vnode = getFirstComponentChild(slot);
	      var componentOptions = vnode && vnode.componentOptions;
	      if (componentOptions) {
	        // check pattern
	        var name = getComponentName(componentOptions);
	        var ref = this;
	        var include = ref.include;
	        var exclude = ref.exclude;
	        if (
	          // not included
	          (include && (!name || !matches(include, name))) ||
	          // excluded
	          (exclude && name && matches(exclude, name))
	        ) {
	          return vnode
	        }
	
	        var ref$1 = this;
	        var cache = ref$1.cache;
	        var keys = ref$1.keys;
	        var key = vnode.key == null
	          // same constructor may get registered as different local components
	          // so cid alone is not enough (#3269)
	          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	          : vnode.key;
	        if (cache[key]) {
	          vnode.componentInstance = cache[key].componentInstance;
	          // make current key freshest
	          remove(keys, key);
	          keys.push(key);
	        } else {
	          cache[key] = vnode;
	          keys.push(key);
	          // prune oldest entry
	          if (this.max && keys.length > parseInt(this.max)) {
	            pruneCacheEntry(cache, keys[0], keys, this._vnode);
	          }
	        }
	
	        vnode.data.keepAlive = true;
	      }
	      return vnode || (slot && slot[0])
	    }
	  };
	
	  var builtInComponents = {
	    KeepAlive: KeepAlive
	  };
	
	  /*  */
	
	  function initGlobalAPI (Vue) {
	    // config
	    var configDef = {};
	    configDef.get = function () { return config; };
	    {
	      configDef.set = function () {
	        warn(
	          'Do not replace the Vue.config object, set individual fields instead.'
	        );
	      };
	    }
	    Object.defineProperty(Vue, 'config', configDef);
	
	    // exposed util methods.
	    // NOTE: these are not considered part of the public API - avoid relying on
	    // them unless you are aware of the risk.
	    Vue.util = {
	      warn: warn,
	      extend: extend,
	      mergeOptions: mergeOptions,
	      defineReactive: defineReactive$$1
	    };
	
	    Vue.set = set;
	    Vue.delete = del;
	    Vue.nextTick = nextTick;
	
	    // 2.6 explicit observable API
	    Vue.observable = function (obj) {
	      observe(obj);
	      return obj
	    };
	
	    Vue.options = Object.create(null);
	    ASSET_TYPES.forEach(function (type) {
	      Vue.options[type + 's'] = Object.create(null);
	    });
	
	    // this is used to identify the "base" constructor to extend all plain-object
	    // components with in Weex's multi-instance scenarios.
	    Vue.options._base = Vue;
	
	    extend(Vue.options.components, builtInComponents);
	
	    initUse(Vue);
	    initMixin$1(Vue);
	    initExtend(Vue);
	    initAssetRegisters(Vue);
	  }
	
	  initGlobalAPI(Vue);
	
	  Object.defineProperty(Vue.prototype, '$isServer', {
	    get: isServerRendering
	  });
	
	  Object.defineProperty(Vue.prototype, '$ssrContext', {
	    get: function get () {
	      /* istanbul ignore next */
	      return this.$vnode && this.$vnode.ssrContext
	    }
	  });
	
	  // expose FunctionalRenderContext for ssr runtime helper installation
	  Object.defineProperty(Vue, 'FunctionalRenderContext', {
	    value: FunctionalRenderContext
	  });
	
	  Vue.version = '2.6.8';
	
	  /*  */
	
	  // these are reserved for web because they are directly compiled away
	  // during template compilation
	  var isReservedAttr = makeMap('style,class');
	
	  // attributes that should be using props for binding
	  var acceptValue = makeMap('input,textarea,option,select,progress');
	  var mustUseProp = function (tag, type, attr) {
	    return (
	      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	      (attr === 'selected' && tag === 'option') ||
	      (attr === 'checked' && tag === 'input') ||
	      (attr === 'muted' && tag === 'video')
	    )
	  };
	
	  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
	
	  var convertEnumeratedValue = function (key, value) {
	    return isFalsyAttrValue(value) || value === 'false'
	      ? 'false'
	      // allow arbitrary string value for contenteditable
	      : key === 'contenteditable' && isValidContentEditableValue(value)
	        ? value
	        : 'true'
	  };
	
	  var isBooleanAttr = makeMap(
	    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	    'required,reversed,scoped,seamless,selected,sortable,translate,' +
	    'truespeed,typemustmatch,visible'
	  );
	
	  var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	  var isXlink = function (name) {
	    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	  };
	
	  var getXlinkProp = function (name) {
	    return isXlink(name) ? name.slice(6, name.length) : ''
	  };
	
	  var isFalsyAttrValue = function (val) {
	    return val == null || val === false
	  };
	
	  /*  */
	
	  function genClassForVnode (vnode) {
	    var data = vnode.data;
	    var parentNode = vnode;
	    var childNode = vnode;
	    while (isDef(childNode.componentInstance)) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode && childNode.data) {
	        data = mergeClassData(childNode.data, data);
	      }
	    }
	    while (isDef(parentNode = parentNode.parent)) {
	      if (parentNode && parentNode.data) {
	        data = mergeClassData(data, parentNode.data);
	      }
	    }
	    return renderClass(data.staticClass, data.class)
	  }
	
	  function mergeClassData (child, parent) {
	    return {
	      staticClass: concat(child.staticClass, parent.staticClass),
	      class: isDef(child.class)
	        ? [child.class, parent.class]
	        : parent.class
	    }
	  }
	
	  function renderClass (
	    staticClass,
	    dynamicClass
	  ) {
	    if (isDef(staticClass) || isDef(dynamicClass)) {
	      return concat(staticClass, stringifyClass(dynamicClass))
	    }
	    /* istanbul ignore next */
	    return ''
	  }
	
	  function concat (a, b) {
	    return a ? b ? (a + ' ' + b) : a : (b || '')
	  }
	
	  function stringifyClass (value) {
	    if (Array.isArray(value)) {
	      return stringifyArray(value)
	    }
	    if (isObject(value)) {
	      return stringifyObject(value)
	    }
	    if (typeof value === 'string') {
	      return value
	    }
	    /* istanbul ignore next */
	    return ''
	  }
	
	  function stringifyArray (value) {
	    var res = '';
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	        if (res) { res += ' '; }
	        res += stringified;
	      }
	    }
	    return res
	  }
	
	  function stringifyObject (value) {
	    var res = '';
	    for (var key in value) {
	      if (value[key]) {
	        if (res) { res += ' '; }
	        res += key;
	      }
	    }
	    return res
	  }
	
	  /*  */
	
	  var namespaceMap = {
	    svg: 'http://www.w3.org/2000/svg',
	    math: 'http://www.w3.org/1998/Math/MathML'
	  };
	
	  var isHTMLTag = makeMap(
	    'html,body,base,head,link,meta,style,title,' +
	    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
	    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	    'embed,object,param,source,canvas,script,noscript,del,ins,' +
	    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	    'output,progress,select,textarea,' +
	    'details,dialog,menu,menuitem,summary,' +
	    'content,element,shadow,template,blockquote,iframe,tfoot'
	  );
	
	  // this map is intentionally selective, only covering SVG elements that may
	  // contain child elements.
	  var isSVG = makeMap(
	    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	    true
	  );
	
	  var isPreTag = function (tag) { return tag === 'pre'; };
	
	  var isReservedTag = function (tag) {
	    return isHTMLTag(tag) || isSVG(tag)
	  };
	
	  function getTagNamespace (tag) {
	    if (isSVG(tag)) {
	      return 'svg'
	    }
	    // basic support for MathML
	    // note it doesn't support other MathML elements being component roots
	    if (tag === 'math') {
	      return 'math'
	    }
	  }
	
	  var unknownElementCache = Object.create(null);
	  function isUnknownElement (tag) {
	    /* istanbul ignore if */
	    if (!inBrowser) {
	      return true
	    }
	    if (isReservedTag(tag)) {
	      return false
	    }
	    tag = tag.toLowerCase();
	    /* istanbul ignore if */
	    if (unknownElementCache[tag] != null) {
	      return unknownElementCache[tag]
	    }
	    var el = document.createElement(tag);
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return (unknownElementCache[tag] = (
	        el.constructor === window.HTMLUnknownElement ||
	        el.constructor === window.HTMLElement
	      ))
	    } else {
	      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	    }
	  }
	
	  var isTextInputType = makeMap('text,number,password,search,email,tel,url');
	
	  /*  */
	
	  /**
	   * Query an element selector if it's not an element already.
	   */
	  function query (el) {
	    if (typeof el === 'string') {
	      var selected = document.querySelector(el);
	      if (!selected) {
	        warn(
	          'Cannot find element: ' + el
	        );
	        return document.createElement('div')
	      }
	      return selected
	    } else {
	      return el
	    }
	  }
	
	  /*  */
	
	  function createElement$1 (tagName, vnode) {
	    var elm = document.createElement(tagName);
	    if (tagName !== 'select') {
	      return elm
	    }
	    // false or null will remove the attribute but undefined will not
	    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	      elm.setAttribute('multiple', 'multiple');
	    }
	    return elm
	  }
	
	  function createElementNS (namespace, tagName) {
	    return document.createElementNS(namespaceMap[namespace], tagName)
	  }
	
	  function createTextNode (text) {
	    return document.createTextNode(text)
	  }
	
	  function createComment (text) {
	    return document.createComment(text)
	  }
	
	  function insertBefore (parentNode, newNode, referenceNode) {
	    parentNode.insertBefore(newNode, referenceNode);
	  }
	
	  function removeChild (node, child) {
	    node.removeChild(child);
	  }
	
	  function appendChild (node, child) {
	    node.appendChild(child);
	  }
	
	  function parentNode (node) {
	    return node.parentNode
	  }
	
	  function nextSibling (node) {
	    return node.nextSibling
	  }
	
	  function tagName (node) {
	    return node.tagName
	  }
	
	  function setTextContent (node, text) {
	    node.textContent = text;
	  }
	
	  function setStyleScope (node, scopeId) {
	    node.setAttribute(scopeId, '');
	  }
	
	  var nodeOps = /*#__PURE__*/Object.freeze({
	    createElement: createElement$1,
	    createElementNS: createElementNS,
	    createTextNode: createTextNode,
	    createComment: createComment,
	    insertBefore: insertBefore,
	    removeChild: removeChild,
	    appendChild: appendChild,
	    parentNode: parentNode,
	    nextSibling: nextSibling,
	    tagName: tagName,
	    setTextContent: setTextContent,
	    setStyleScope: setStyleScope
	  });
	
	  /*  */
	
	  var ref = {
	    create: function create (_, vnode) {
	      registerRef(vnode);
	    },
	    update: function update (oldVnode, vnode) {
	      if (oldVnode.data.ref !== vnode.data.ref) {
	        registerRef(oldVnode, true);
	        registerRef(vnode);
	      }
	    },
	    destroy: function destroy (vnode) {
	      registerRef(vnode, true);
	    }
	  };
	
	  function registerRef (vnode, isRemoval) {
	    var key = vnode.data.ref;
	    if (!isDef(key)) { return }
	
	    var vm = vnode.context;
	    var ref = vnode.componentInstance || vnode.elm;
	    var refs = vm.$refs;
	    if (isRemoval) {
	      if (Array.isArray(refs[key])) {
	        remove(refs[key], ref);
	      } else if (refs[key] === ref) {
	        refs[key] = undefined;
	      }
	    } else {
	      if (vnode.data.refInFor) {
	        if (!Array.isArray(refs[key])) {
	          refs[key] = [ref];
	        } else if (refs[key].indexOf(ref) < 0) {
	          // $flow-disable-line
	          refs[key].push(ref);
	        }
	      } else {
	        refs[key] = ref;
	      }
	    }
	  }
	
	  /**
	   * Virtual DOM patching algorithm based on Snabbdom by
	   * Simon Friis Vindum (@paldepind)
	   * Licensed under the MIT License
	   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	   *
	   * modified by Evan You (@yyx990803)
	   *
	   * Not type-checking this because this file is perf-critical and the cost
	   * of making flow understand it is not worth it.
	   */
	
	  var emptyNode = new VNode('', {}, []);
	
	  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
	
	  function sameVnode (a, b) {
	    return (
	      a.key === b.key && (
	        (
	          a.tag === b.tag &&
	          a.isComment === b.isComment &&
	          isDef(a.data) === isDef(b.data) &&
	          sameInputType(a, b)
	        ) || (
	          isTrue(a.isAsyncPlaceholder) &&
	          a.asyncFactory === b.asyncFactory &&
	          isUndef(b.asyncFactory.error)
	        )
	      )
	    )
	  }
	
	  function sameInputType (a, b) {
	    if (a.tag !== 'input') { return true }
	    var i;
	    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
	  }
	
	  function createKeyToOldIdx (children, beginIdx, endIdx) {
	    var i, key;
	    var map = {};
	    for (i = beginIdx; i <= endIdx; ++i) {
	      key = children[i].key;
	      if (isDef(key)) { map[key] = i; }
	    }
	    return map
	  }
	
	  function createPatchFunction (backend) {
	    var i, j;
	    var cbs = {};
	
	    var modules = backend.modules;
	    var nodeOps = backend.nodeOps;
	
	    for (i = 0; i < hooks.length; ++i) {
	      cbs[hooks[i]] = [];
	      for (j = 0; j < modules.length; ++j) {
	        if (isDef(modules[j][hooks[i]])) {
	          cbs[hooks[i]].push(modules[j][hooks[i]]);
	        }
	      }
	    }
	
	    function emptyNodeAt (elm) {
	      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	    }
	
	    function createRmCb (childElm, listeners) {
	      function remove$$1 () {
	        if (--remove$$1.listeners === 0) {
	          removeNode(childElm);
	        }
	      }
	      remove$$1.listeners = listeners;
	      return remove$$1
	    }
	
	    function removeNode (el) {
	      var parent = nodeOps.parentNode(el);
	      // element may have already been removed due to v-html / v-text
	      if (isDef(parent)) {
	        nodeOps.removeChild(parent, el);
	      }
	    }
	
	    function isUnknownElement$$1 (vnode, inVPre) {
	      return (
	        !inVPre &&
	        !vnode.ns &&
	        !(
	          config.ignoredElements.length &&
	          config.ignoredElements.some(function (ignore) {
	            return isRegExp(ignore)
	              ? ignore.test(vnode.tag)
	              : ignore === vnode.tag
	          })
	        ) &&
	        config.isUnknownElement(vnode.tag)
	      )
	    }
	
	    var creatingElmInVPre = 0;
	
	    function createElm (
	      vnode,
	      insertedVnodeQueue,
	      parentElm,
	      refElm,
	      nested,
	      ownerArray,
	      index
	    ) {
	      if (isDef(vnode.elm) && isDef(ownerArray)) {
	        // This vnode was used in a previous render!
	        // now it's used as a new node, overwriting its elm would cause
	        // potential patch errors down the road when it's used as an insertion
	        // reference node. Instead, we clone the node on-demand before creating
	        // associated DOM element for it.
	        vnode = ownerArray[index] = cloneVNode(vnode);
	      }
	
	      vnode.isRootInsert = !nested; // for transition enter check
	      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	        return
	      }
	
	      var data = vnode.data;
	      var children = vnode.children;
	      var tag = vnode.tag;
	      if (isDef(tag)) {
	        {
	          if (data && data.pre) {
	            creatingElmInVPre++;
	          }
	          if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
	            warn(
	              'Unknown custom element: <' + tag + '> - did you ' +
	              'register the component correctly? For recursive components, ' +
	              'make sure to provide the "name" option.',
	              vnode.context
	            );
	          }
	        }
	
	        vnode.elm = vnode.ns
	          ? nodeOps.createElementNS(vnode.ns, tag)
	          : nodeOps.createElement(tag, vnode);
	        setScope(vnode);
	
	        /* istanbul ignore if */
	        {
	          createChildren(vnode, children, insertedVnodeQueue);
	          if (isDef(data)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	          }
	          insert(parentElm, vnode.elm, refElm);
	        }
	
	        if (data && data.pre) {
	          creatingElmInVPre--;
	        }
	      } else if (isTrue(vnode.isComment)) {
	        vnode.elm = nodeOps.createComment(vnode.text);
	        insert(parentElm, vnode.elm, refElm);
	      } else {
	        vnode.elm = nodeOps.createTextNode(vnode.text);
	        insert(parentElm, vnode.elm, refElm);
	      }
	    }
	
	    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	      var i = vnode.data;
	      if (isDef(i)) {
	        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	        if (isDef(i = i.hook) && isDef(i = i.init)) {
	          i(vnode, false /* hydrating */);
	        }
	        // after calling the init hook, if the vnode is a child component
	        // it should've created a child instance and mounted it. the child
	        // component also has set the placeholder vnode's elm.
	        // in that case we can just return the element and be done.
	        if (isDef(vnode.componentInstance)) {
	          initComponent(vnode, insertedVnodeQueue);
	          insert(parentElm, vnode.elm, refElm);
	          if (isTrue(isReactivated)) {
	            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	          }
	          return true
	        }
	      }
	    }
	
	    function initComponent (vnode, insertedVnodeQueue) {
	      if (isDef(vnode.data.pendingInsert)) {
	        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	        vnode.data.pendingInsert = null;
	      }
	      vnode.elm = vnode.componentInstance.$el;
	      if (isPatchable(vnode)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	        setScope(vnode);
	      } else {
	        // empty component root.
	        // skip all element-related modules except for ref (#3455)
	        registerRef(vnode);
	        // make sure to invoke the insert hook
	        insertedVnodeQueue.push(vnode);
	      }
	    }
	
	    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	      var i;
	      // hack for #4339: a reactivated component with inner transition
	      // does not trigger because the inner node's created hooks are not called
	      // again. It's not ideal to involve module-specific logic in here but
	      // there doesn't seem to be a better way to do it.
	      var innerNode = vnode;
	      while (innerNode.componentInstance) {
	        innerNode = innerNode.componentInstance._vnode;
	        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	          for (i = 0; i < cbs.activate.length; ++i) {
	            cbs.activate[i](emptyNode, innerNode);
	          }
	          insertedVnodeQueue.push(innerNode);
	          break
	        }
	      }
	      // unlike a newly created component,
	      // a reactivated keep-alive component doesn't insert itself
	      insert(parentElm, vnode.elm, refElm);
	    }
	
	    function insert (parent, elm, ref$$1) {
	      if (isDef(parent)) {
	        if (isDef(ref$$1)) {
	          if (nodeOps.parentNode(ref$$1) === parent) {
	            nodeOps.insertBefore(parent, elm, ref$$1);
	          }
	        } else {
	          nodeOps.appendChild(parent, elm);
	        }
	      }
	    }
	
	    function createChildren (vnode, children, insertedVnodeQueue) {
	      if (Array.isArray(children)) {
	        {
	          checkDuplicateKeys(children);
	        }
	        for (var i = 0; i < children.length; ++i) {
	          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
	        }
	      } else if (isPrimitive(vnode.text)) {
	        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
	      }
	    }
	
	    function isPatchable (vnode) {
	      while (vnode.componentInstance) {
	        vnode = vnode.componentInstance._vnode;
	      }
	      return isDef(vnode.tag)
	    }
	
	    function invokeCreateHooks (vnode, insertedVnodeQueue) {
	      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	        cbs.create[i$1](emptyNode, vnode);
	      }
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (isDef(i.create)) { i.create(emptyNode, vnode); }
	        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	      }
	    }
	
	    // set scope id attribute for scoped CSS.
	    // this is implemented as a special case to avoid the overhead
	    // of going through the normal attribute patching process.
	    function setScope (vnode) {
	      var i;
	      if (isDef(i = vnode.fnScopeId)) {
	        nodeOps.setStyleScope(vnode.elm, i);
	      } else {
	        var ancestor = vnode;
	        while (ancestor) {
	          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	            nodeOps.setStyleScope(vnode.elm, i);
	          }
	          ancestor = ancestor.parent;
	        }
	      }
	      // for slot content they should also get the scopeId from the host instance.
	      if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        i !== vnode.fnContext &&
	        isDef(i = i.$options._scopeId)
	      ) {
	        nodeOps.setStyleScope(vnode.elm, i);
	      }
	    }
	
	    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	      for (; startIdx <= endIdx; ++startIdx) {
	        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
	      }
	    }
	
	    function invokeDestroyHook (vnode) {
	      var i, j;
	      var data = vnode.data;
	      if (isDef(data)) {
	        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	      }
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	
	    function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	      for (; startIdx <= endIdx; ++startIdx) {
	        var ch = vnodes[startIdx];
	        if (isDef(ch)) {
	          if (isDef(ch.tag)) {
	            removeAndInvokeRemoveHook(ch);
	            invokeDestroyHook(ch);
	          } else { // Text node
	            removeNode(ch.elm);
	          }
	        }
	      }
	    }
	
	    function removeAndInvokeRemoveHook (vnode, rm) {
	      if (isDef(rm) || isDef(vnode.data)) {
	        var i;
	        var listeners = cbs.remove.length + 1;
	        if (isDef(rm)) {
	          // we have a recursively passed down rm callback
	          // increase the listeners count
	          rm.listeners += listeners;
	        } else {
	          // directly removing
	          rm = createRmCb(vnode.elm, listeners);
	        }
	        // recursively invoke hooks on child component root node
	        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	          removeAndInvokeRemoveHook(i, rm);
	        }
	        for (i = 0; i < cbs.remove.length; ++i) {
	          cbs.remove[i](vnode, rm);
	        }
	        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	          i(vnode, rm);
	        } else {
	          rm();
	        }
	      } else {
	        removeNode(vnode.elm);
	      }
	    }
	
	    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	      var oldStartIdx = 0;
	      var newStartIdx = 0;
	      var oldEndIdx = oldCh.length - 1;
	      var oldStartVnode = oldCh[0];
	      var oldEndVnode = oldCh[oldEndIdx];
	      var newEndIdx = newCh.length - 1;
	      var newStartVnode = newCh[0];
	      var newEndVnode = newCh[newEndIdx];
	      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
	
	      // removeOnly is a special flag used only by <transition-group>
	      // to ensure removed elements stay in correct relative positions
	      // during leaving transitions
	      var canMove = !removeOnly;
	
	      {
	        checkDuplicateKeys(newCh);
	      }
	
	      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	        if (isUndef(oldStartVnode)) {
	          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	        } else if (isUndef(oldEndVnode)) {
	          oldEndVnode = oldCh[--oldEndIdx];
	        } else if (sameVnode(oldStartVnode, newStartVnode)) {
	          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
	          oldStartVnode = oldCh[++oldStartIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else if (sameVnode(oldEndVnode, newEndVnode)) {
	          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
	          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	          oldStartVnode = oldCh[++oldStartIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
	          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	          idxInOld = isDef(newStartVnode.key)
	            ? oldKeyToIdx[newStartVnode.key]
	            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
	          if (isUndef(idxInOld)) { // New element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
	          } else {
	            vnodeToMove = oldCh[idxInOld];
	            if (sameVnode(vnodeToMove, newStartVnode)) {
	              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
	              oldCh[idxInOld] = undefined;
	              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
	            } else {
	              // same key but different element. treat as new element
	              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
	            }
	          }
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	      if (oldStartIdx > oldEndIdx) {
	        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	      } else if (newStartIdx > newEndIdx) {
	        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	      }
	    }
	
	    function checkDuplicateKeys (children) {
	      var seenKeys = {};
	      for (var i = 0; i < children.length; i++) {
	        var vnode = children[i];
	        var key = vnode.key;
	        if (isDef(key)) {
	          if (seenKeys[key]) {
	            warn(
	              ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
	              vnode.context
	            );
	          } else {
	            seenKeys[key] = true;
	          }
	        }
	      }
	    }
	
	    function findIdxInOld (node, oldCh, start, end) {
	      for (var i = start; i < end; i++) {
	        var c = oldCh[i];
	        if (isDef(c) && sameVnode(node, c)) { return i }
	      }
	    }
	
	    function patchVnode (
	      oldVnode,
	      vnode,
	      insertedVnodeQueue,
	      ownerArray,
	      index,
	      removeOnly
	    ) {
	      if (oldVnode === vnode) {
	        return
	      }
	
	      if (isDef(vnode.elm) && isDef(ownerArray)) {
	        // clone reused vnode
	        vnode = ownerArray[index] = cloneVNode(vnode);
	      }
	
	      var elm = vnode.elm = oldVnode.elm;
	
	      if (isTrue(oldVnode.isAsyncPlaceholder)) {
	        if (isDef(vnode.asyncFactory.resolved)) {
	          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
	        } else {
	          vnode.isAsyncPlaceholder = true;
	        }
	        return
	      }
	
	      // reuse element for static trees.
	      // note we only do this if the vnode is cloned -
	      // if the new node is not cloned it means the render functions have been
	      // reset by the hot-reload-api and we need to do a proper re-render.
	      if (isTrue(vnode.isStatic) &&
	        isTrue(oldVnode.isStatic) &&
	        vnode.key === oldVnode.key &&
	        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
	      ) {
	        vnode.componentInstance = oldVnode.componentInstance;
	        return
	      }
	
	      var i;
	      var data = vnode.data;
	      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	        i(oldVnode, vnode);
	      }
	
	      var oldCh = oldVnode.children;
	      var ch = vnode.children;
	      if (isDef(data) && isPatchable(vnode)) {
	        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	      }
	      if (isUndef(vnode.text)) {
	        if (isDef(oldCh) && isDef(ch)) {
	          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	        } else if (isDef(ch)) {
	          {
	            checkDuplicateKeys(ch);
	          }
	          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	        } else if (isDef(oldCh)) {
	          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	        } else if (isDef(oldVnode.text)) {
	          nodeOps.setTextContent(elm, '');
	        }
	      } else if (oldVnode.text !== vnode.text) {
	        nodeOps.setTextContent(elm, vnode.text);
	      }
	      if (isDef(data)) {
	        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	      }
	    }
	
	    function invokeInsertHook (vnode, queue, initial) {
	      // delay insert hooks for component root nodes, invoke them after the
	      // element is really inserted
	      if (isTrue(initial) && isDef(vnode.parent)) {
	        vnode.parent.data.pendingInsert = queue;
	      } else {
	        for (var i = 0; i < queue.length; ++i) {
	          queue[i].data.hook.insert(queue[i]);
	        }
	      }
	    }
	
	    var hydrationBailed = false;
	    // list of modules that can skip create hook during hydration because they
	    // are already rendered on the client or has no need for initialization
	    // Note: style is excluded because it relies on initial clone for future
	    // deep updates (#7063).
	    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
	
	    // Note: this is a browser-only function so we can assume elms are DOM nodes.
	    function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
	      var i;
	      var tag = vnode.tag;
	      var data = vnode.data;
	      var children = vnode.children;
	      inVPre = inVPre || (data && data.pre);
	      vnode.elm = elm;
	
	      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
	        vnode.isAsyncPlaceholder = true;
	        return true
	      }
	      // assert node match
	      {
	        if (!assertNodeMatch(elm, vnode, inVPre)) {
	          return false
	        }
	      }
	      if (isDef(data)) {
	        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	        if (isDef(i = vnode.componentInstance)) {
	          // child component. it should have hydrated its own tree.
	          initComponent(vnode, insertedVnodeQueue);
	          return true
	        }
	      }
	      if (isDef(tag)) {
	        if (isDef(children)) {
	          // empty element, allow client to pick up and populate children
	          if (!elm.hasChildNodes()) {
	            createChildren(vnode, children, insertedVnodeQueue);
	          } else {
	            // v-html and domProps: innerHTML
	            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
	              if (i !== elm.innerHTML) {
	                /* istanbul ignore if */
	                if (typeof console !== 'undefined' &&
	                  !hydrationBailed
	                ) {
	                  hydrationBailed = true;
	                  console.warn('Parent: ', elm);
	                  console.warn('server innerHTML: ', i);
	                  console.warn('client innerHTML: ', elm.innerHTML);
	                }
	                return false
	              }
	            } else {
	              // iterate and compare children lists
	              var childrenMatch = true;
	              var childNode = elm.firstChild;
	              for (var i$1 = 0; i$1 < children.length; i$1++) {
	                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
	                  childrenMatch = false;
	                  break
	                }
	                childNode = childNode.nextSibling;
	              }
	              // if childNode is not null, it means the actual childNodes list is
	              // longer than the virtual children list.
	              if (!childrenMatch || childNode) {
	                /* istanbul ignore if */
	                if (typeof console !== 'undefined' &&
	                  !hydrationBailed
	                ) {
	                  hydrationBailed = true;
	                  console.warn('Parent: ', elm);
	                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	                }
	                return false
	              }
	            }
	          }
	        }
	        if (isDef(data)) {
	          var fullInvoke = false;
	          for (var key in data) {
	            if (!isRenderedModule(key)) {
	              fullInvoke = true;
	              invokeCreateHooks(vnode, insertedVnodeQueue);
	              break
	            }
	          }
	          if (!fullInvoke && data['class']) {
	            // ensure collecting deps for deep class bindings for future updates
	            traverse(data['class']);
	          }
	        }
	      } else if (elm.data !== vnode.text) {
	        elm.data = vnode.text;
	      }
	      return true
	    }
	
	    function assertNodeMatch (node, vnode, inVPre) {
	      if (isDef(vnode.tag)) {
	        return vnode.tag.indexOf('vue-component') === 0 || (
	          !isUnknownElement$$1(vnode, inVPre) &&
	          vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	        )
	      } else {
	        return node.nodeType === (vnode.isComment ? 8 : 3)
	      }
	    }
	
	    return function patch (oldVnode, vnode, hydrating, removeOnly) {
	      if (isUndef(vnode)) {
	        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	        return
	      }
	
	      var isInitialPatch = false;
	      var insertedVnodeQueue = [];
	
	      if (isUndef(oldVnode)) {
	        // empty mount (likely as component), create new root element
	        isInitialPatch = true;
	        createElm(vnode, insertedVnodeQueue);
	      } else {
	        var isRealElement = isDef(oldVnode.nodeType);
	        if (!isRealElement && sameVnode(oldVnode, vnode)) {
	          // patch existing root node
	          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
	        } else {
	          if (isRealElement) {
	            // mounting to a real element
	            // check if this is server-rendered content and if we can perform
	            // a successful hydration.
	            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	              oldVnode.removeAttribute(SSR_ATTR);
	              hydrating = true;
	            }
	            if (isTrue(hydrating)) {
	              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	                invokeInsertHook(vnode, insertedVnodeQueue, true);
	                return oldVnode
	              } else {
	                warn(
	                  'The client-side rendered virtual DOM tree is not matching ' +
	                  'server-rendered content. This is likely caused by incorrect ' +
	                  'HTML markup, for example nesting block-level elements inside ' +
	                  '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                  'full client-side render.'
	                );
	              }
	            }
	            // either not server-rendered, or hydration failed.
	            // create an empty node and replace it
	            oldVnode = emptyNodeAt(oldVnode);
	          }
	
	          // replacing existing element
	          var oldElm = oldVnode.elm;
	          var parentElm = nodeOps.parentNode(oldElm);
	
	          // create new node
	          createElm(
	            vnode,
	            insertedVnodeQueue,
	            // extremely rare edge case: do not insert if old element is in a
	            // leaving transition. Only happens when combining transition +
	            // keep-alive + HOCs. (#4590)
	            oldElm._leaveCb ? null : parentElm,
	            nodeOps.nextSibling(oldElm)
	          );
	
	          // update parent placeholder node element, recursively
	          if (isDef(vnode.parent)) {
	            var ancestor = vnode.parent;
	            var patchable = isPatchable(vnode);
	            while (ancestor) {
	              for (var i = 0; i < cbs.destroy.length; ++i) {
	                cbs.destroy[i](ancestor);
	              }
	              ancestor.elm = vnode.elm;
	              if (patchable) {
	                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	                  cbs.create[i$1](emptyNode, ancestor);
	                }
	                // #6513
	                // invoke insert hooks that may have been merged by create hooks.
	                // e.g. for directives that uses the "inserted" hook.
	                var insert = ancestor.data.hook.insert;
	                if (insert.merged) {
	                  // start at index 1 to avoid re-invoking component mounted hook
	                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
	                    insert.fns[i$2]();
	                  }
	                }
	              } else {
	                registerRef(ancestor);
	              }
	              ancestor = ancestor.parent;
	            }
	          }
	
	          // destroy old node
	          if (isDef(parentElm)) {
	            removeVnodes(parentElm, [oldVnode], 0, 0);
	          } else if (isDef(oldVnode.tag)) {
	            invokeDestroyHook(oldVnode);
	          }
	        }
	      }
	
	      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	      return vnode.elm
	    }
	  }
	
	  /*  */
	
	  var directives = {
	    create: updateDirectives,
	    update: updateDirectives,
	    destroy: function unbindDirectives (vnode) {
	      updateDirectives(vnode, emptyNode);
	    }
	  };
	
	  function updateDirectives (oldVnode, vnode) {
	    if (oldVnode.data.directives || vnode.data.directives) {
	      _update(oldVnode, vnode);
	    }
	  }
	
	  function _update (oldVnode, vnode) {
	    var isCreate = oldVnode === emptyNode;
	    var isDestroy = vnode === emptyNode;
	    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	
	    var dirsWithInsert = [];
	    var dirsWithPostpatch = [];
	
	    var key, oldDir, dir;
	    for (key in newDirs) {
	      oldDir = oldDirs[key];
	      dir = newDirs[key];
	      if (!oldDir) {
	        // new directive, bind
	        callHook$1(dir, 'bind', vnode, oldVnode);
	        if (dir.def && dir.def.inserted) {
	          dirsWithInsert.push(dir);
	        }
	      } else {
	        // existing directive, update
	        dir.oldValue = oldDir.value;
	        dir.oldArg = oldDir.arg;
	        callHook$1(dir, 'update', vnode, oldVnode);
	        if (dir.def && dir.def.componentUpdated) {
	          dirsWithPostpatch.push(dir);
	        }
	      }
	    }
	
	    if (dirsWithInsert.length) {
	      var callInsert = function () {
	        for (var i = 0; i < dirsWithInsert.length; i++) {
	          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	        }
	      };
	      if (isCreate) {
	        mergeVNodeHook(vnode, 'insert', callInsert);
	      } else {
	        callInsert();
	      }
	    }
	
	    if (dirsWithPostpatch.length) {
	      mergeVNodeHook(vnode, 'postpatch', function () {
	        for (var i = 0; i < dirsWithPostpatch.length; i++) {
	          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	        }
	      });
	    }
	
	    if (!isCreate) {
	      for (key in oldDirs) {
	        if (!newDirs[key]) {
	          // no longer present, unbind
	          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	        }
	      }
	    }
	  }
	
	  var emptyModifiers = Object.create(null);
	
	  function normalizeDirectives$1 (
	    dirs,
	    vm
	  ) {
	    var res = Object.create(null);
	    if (!dirs) {
	      // $flow-disable-line
	      return res
	    }
	    var i, dir;
	    for (i = 0; i < dirs.length; i++) {
	      dir = dirs[i];
	      if (!dir.modifiers) {
	        // $flow-disable-line
	        dir.modifiers = emptyModifiers;
	      }
	      res[getRawDirName(dir)] = dir;
	      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	    }
	    // $flow-disable-line
	    return res
	  }
	
	  function getRawDirName (dir) {
	    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	  }
	
	  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	    var fn = dir.def && dir.def[hook];
	    if (fn) {
	      try {
	        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	      } catch (e) {
	        handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
	      }
	    }
	  }
	
	  var baseModules = [
	    ref,
	    directives
	  ];
	
	  /*  */
	
	  function updateAttrs (oldVnode, vnode) {
	    var opts = vnode.componentOptions;
	    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
	      return
	    }
	    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	      return
	    }
	    var key, cur, old;
	    var elm = vnode.elm;
	    var oldAttrs = oldVnode.data.attrs || {};
	    var attrs = vnode.data.attrs || {};
	    // clone observed objects, as the user probably wants to mutate it
	    if (isDef(attrs.__ob__)) {
	      attrs = vnode.data.attrs = extend({}, attrs);
	    }
	
	    for (key in attrs) {
	      cur = attrs[key];
	      old = oldAttrs[key];
	      if (old !== cur) {
	        setAttr(elm, key, cur);
	      }
	    }
	    // #4391: in IE9, setting type can reset value for input[type=radio]
	    // #6666: IE/Edge forces progress value down to 1 before setting a max
	    /* istanbul ignore if */
	    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
	      setAttr(elm, 'value', attrs.value);
	    }
	    for (key in oldAttrs) {
	      if (isUndef(attrs[key])) {
	        if (isXlink(key)) {
	          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	        } else if (!isEnumeratedAttr(key)) {
	          elm.removeAttribute(key);
	        }
	      }
	    }
	  }
	
	  function setAttr (el, key, value) {
	    if (el.tagName.indexOf('-') > -1) {
	      baseSetAttr(el, key, value);
	    } else if (isBooleanAttr(key)) {
	      // set attribute for blank value
	      // e.g. <option disabled>Select one</option>
	      if (isFalsyAttrValue(value)) {
	        el.removeAttribute(key);
	      } else {
	        // technically allowfullscreen is a boolean attribute for <iframe>,
	        // but Flash expects a value of "true" when used on <embed> tag
	        value = key === 'allowfullscreen' && el.tagName === 'EMBED'
	          ? 'true'
	          : key;
	        el.setAttribute(key, value);
	      }
	    } else if (isEnumeratedAttr(key)) {
	      el.setAttribute(key, convertEnumeratedValue(key, value));
	    } else if (isXlink(key)) {
	      if (isFalsyAttrValue(value)) {
	        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else {
	        el.setAttributeNS(xlinkNS, key, value);
	      }
	    } else {
	      baseSetAttr(el, key, value);
	    }
	  }
	
	  function baseSetAttr (el, key, value) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      // #7138: IE10 & 11 fires input event when setting placeholder on
	      // <textarea>... block the first input event and remove the blocker
	      // immediately.
	      /* istanbul ignore if */
	      if (
	        isIE && !isIE9 &&
	        el.tagName === 'TEXTAREA' &&
	        key === 'placeholder' && value !== '' && !el.__ieph
	      ) {
	        var blocker = function (e) {
	          e.stopImmediatePropagation();
	          el.removeEventListener('input', blocker);
	        };
	        el.addEventListener('input', blocker);
	        // $flow-disable-line
	        el.__ieph = true; /* IE placeholder patched */
	      }
	      el.setAttribute(key, value);
	    }
	  }
	
	  var attrs = {
	    create: updateAttrs,
	    update: updateAttrs
	  };
	
	  /*  */
	
	  function updateClass (oldVnode, vnode) {
	    var el = vnode.elm;
	    var data = vnode.data;
	    var oldData = oldVnode.data;
	    if (
	      isUndef(data.staticClass) &&
	      isUndef(data.class) && (
	        isUndef(oldData) || (
	          isUndef(oldData.staticClass) &&
	          isUndef(oldData.class)
	        )
	      )
	    ) {
	      return
	    }
	
	    var cls = genClassForVnode(vnode);
	
	    // handle transition classes
	    var transitionClass = el._transitionClasses;
	    if (isDef(transitionClass)) {
	      cls = concat(cls, stringifyClass(transitionClass));
	    }
	
	    // set the class
	    if (cls !== el._prevClass) {
	      el.setAttribute('class', cls);
	      el._prevClass = cls;
	    }
	  }
	
	  var klass = {
	    create: updateClass,
	    update: updateClass
	  };
	
	  /*  */
	
	  var validDivisionCharRE = /[\w).+\-_$\]]/;
	
	  function parseFilters (exp) {
	    var inSingle = false;
	    var inDouble = false;
	    var inTemplateString = false;
	    var inRegex = false;
	    var curly = 0;
	    var square = 0;
	    var paren = 0;
	    var lastFilterIndex = 0;
	    var c, prev, i, expression, filters;
	
	    for (i = 0; i < exp.length; i++) {
	      prev = c;
	      c = exp.charCodeAt(i);
	      if (inSingle) {
	        if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	      } else if (inDouble) {
	        if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	      } else if (inTemplateString) {
	        if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	      } else if (inRegex) {
	        if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	      } else if (
	        c === 0x7C && // pipe
	        exp.charCodeAt(i + 1) !== 0x7C &&
	        exp.charCodeAt(i - 1) !== 0x7C &&
	        !curly && !square && !paren
	      ) {
	        if (expression === undefined) {
	          // first filter, end of expression
	          lastFilterIndex = i + 1;
	          expression = exp.slice(0, i).trim();
	        } else {
	          pushFilter();
	        }
	      } else {
	        switch (c) {
	          case 0x22: inDouble = true; break         // "
	          case 0x27: inSingle = true; break         // '
	          case 0x60: inTemplateString = true; break // `
	          case 0x28: paren++; break                 // (
	          case 0x29: paren--; break                 // )
	          case 0x5B: square++; break                // [
	          case 0x5D: square--; break                // ]
	          case 0x7B: curly++; break                 // {
	          case 0x7D: curly--; break                 // }
	        }
	        if (c === 0x2f) { // /
	          var j = i - 1;
	          var p = (void 0);
	          // find first non-whitespace prev char
	          for (; j >= 0; j--) {
	            p = exp.charAt(j);
	            if (p !== ' ') { break }
	          }
	          if (!p || !validDivisionCharRE.test(p)) {
	            inRegex = true;
	          }
	        }
	      }
	    }
	
	    if (expression === undefined) {
	      expression = exp.slice(0, i).trim();
	    } else if (lastFilterIndex !== 0) {
	      pushFilter();
	    }
	
	    function pushFilter () {
	      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	      lastFilterIndex = i + 1;
	    }
	
	    if (filters) {
	      for (i = 0; i < filters.length; i++) {
	        expression = wrapFilter(expression, filters[i]);
	      }
	    }
	
	    return expression
	  }
	
	  function wrapFilter (exp, filter) {
	    var i = filter.indexOf('(');
	    if (i < 0) {
	      // _f: resolveFilter
	      return ("_f(\"" + filter + "\")(" + exp + ")")
	    } else {
	      var name = filter.slice(0, i);
	      var args = filter.slice(i + 1);
	      return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
	    }
	  }
	
	  /*  */
	
	
	
	  /* eslint-disable no-unused-vars */
	  function baseWarn (msg, range) {
	    console.error(("[Vue compiler]: " + msg));
	  }
	  /* eslint-enable no-unused-vars */
	
	  function pluckModuleFunction (
	    modules,
	    key
	  ) {
	    return modules
	      ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	      : []
	  }
	
	  function addProp (el, name, value, range, dynamic) {
	    (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
	    el.plain = false;
	  }
	
	  function addAttr (el, name, value, range, dynamic) {
	    var attrs = dynamic
	      ? (el.dynamicAttrs || (el.dynamicAttrs = []))
	      : (el.attrs || (el.attrs = []));
	    attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
	    el.plain = false;
	  }
	
	  // add a raw attr (use this in preTransforms)
	  function addRawAttr (el, name, value, range) {
	    el.attrsMap[name] = value;
	    el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
	  }
	
	  function addDirective (
	    el,
	    name,
	    rawName,
	    value,
	    arg,
	    isDynamicArg,
	    modifiers,
	    range
	  ) {
	    (el.directives || (el.directives = [])).push(rangeSetItem({
	      name: name,
	      rawName: rawName,
	      value: value,
	      arg: arg,
	      isDynamicArg: isDynamicArg,
	      modifiers: modifiers
	    }, range));
	    el.plain = false;
	  }
	
	  function prependModifierMarker (symbol, name, dynamic) {
	    return dynamic
	      ? ("_p(" + name + ",\"" + symbol + "\")")
	      : symbol + name // mark the event as captured
	  }
	
	  function addHandler (
	    el,
	    name,
	    value,
	    modifiers,
	    important,
	    warn,
	    range,
	    dynamic
	  ) {
	    modifiers = modifiers || emptyObject;
	    // warn prevent and passive modifier
	    /* istanbul ignore if */
	    if (
	      warn &&
	      modifiers.prevent && modifiers.passive
	    ) {
	      warn(
	        'passive and prevent can\'t be used together. ' +
	        'Passive handler can\'t prevent default event.',
	        range
	      );
	    }
	
	    // normalize click.right and click.middle since they don't actually fire
	    // this is technically browser-specific, but at least for now browsers are
	    // the only target envs that have right/middle clicks.
	    if (modifiers.right) {
	      if (dynamic) {
	        name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
	      } else if (name === 'click') {
	        name = 'contextmenu';
	        delete modifiers.right;
	      }
	    } else if (modifiers.middle) {
	      if (dynamic) {
	        name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
	      } else if (name === 'click') {
	        name = 'mouseup';
	      }
	    }
	
	    // check capture modifier
	    if (modifiers.capture) {
	      delete modifiers.capture;
	      name = prependModifierMarker('!', name, dynamic);
	    }
	    if (modifiers.once) {
	      delete modifiers.once;
	      name = prependModifierMarker('~', name, dynamic);
	    }
	    /* istanbul ignore if */
	    if (modifiers.passive) {
	      delete modifiers.passive;
	      name = prependModifierMarker('&', name, dynamic);
	    }
	
	    var events;
	    if (modifiers.native) {
	      delete modifiers.native;
	      events = el.nativeEvents || (el.nativeEvents = {});
	    } else {
	      events = el.events || (el.events = {});
	    }
	
	    var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
	    if (modifiers !== emptyObject) {
	      newHandler.modifiers = modifiers;
	    }
	
	    var handlers = events[name];
	    /* istanbul ignore if */
	    if (Array.isArray(handlers)) {
	      important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	    } else if (handlers) {
	      events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	    } else {
	      events[name] = newHandler;
	    }
	
	    el.plain = false;
	  }
	
	  function getRawBindingAttr (
	    el,
	    name
	  ) {
	    return el.rawAttrsMap[':' + name] ||
	      el.rawAttrsMap['v-bind:' + name] ||
	      el.rawAttrsMap[name]
	  }
	
	  function getBindingAttr (
	    el,
	    name,
	    getStatic
	  ) {
	    var dynamicValue =
	      getAndRemoveAttr(el, ':' + name) ||
	      getAndRemoveAttr(el, 'v-bind:' + name);
	    if (dynamicValue != null) {
	      return parseFilters(dynamicValue)
	    } else if (getStatic !== false) {
	      var staticValue = getAndRemoveAttr(el, name);
	      if (staticValue != null) {
	        return JSON.stringify(staticValue)
	      }
	    }
	  }
	
	  // note: this only removes the attr from the Array (attrsList) so that it
	  // doesn't get processed by processAttrs.
	  // By default it does NOT remove it from the map (attrsMap) because the map is
	  // needed during codegen.
	  function getAndRemoveAttr (
	    el,
	    name,
	    removeFromMap
	  ) {
	    var val;
	    if ((val = el.attrsMap[name]) != null) {
	      var list = el.attrsList;
	      for (var i = 0, l = list.length; i < l; i++) {
	        if (list[i].name === name) {
	          list.splice(i, 1);
	          break
	        }
	      }
	    }
	    if (removeFromMap) {
	      delete el.attrsMap[name];
	    }
	    return val
	  }
	
	  function getAndRemoveAttrByRegex (
	    el,
	    name
	  ) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      var attr = list[i];
	      if (name.test(attr.name)) {
	        list.splice(i, 1);
	        return attr
	      }
	    }
	  }
	
	  function rangeSetItem (
	    item,
	    range
	  ) {
	    if (range) {
	      if (range.start != null) {
	        item.start = range.start;
	      }
	      if (range.end != null) {
	        item.end = range.end;
	      }
	    }
	    return item
	  }
	
	  /*  */
	
	  /**
	   * Cross-platform code generation for component v-model
	   */
	  function genComponentModel (
	    el,
	    value,
	    modifiers
	  ) {
	    var ref = modifiers || {};
	    var number = ref.number;
	    var trim = ref.trim;
	
	    var baseValueExpression = '$$v';
	    var valueExpression = baseValueExpression;
	    if (trim) {
	      valueExpression =
	        "(typeof " + baseValueExpression + " === 'string'" +
	        "? " + baseValueExpression + ".trim()" +
	        ": " + baseValueExpression + ")";
	    }
	    if (number) {
	      valueExpression = "_n(" + valueExpression + ")";
	    }
	    var assignment = genAssignmentCode(value, valueExpression);
	
	    el.model = {
	      value: ("(" + value + ")"),
	      expression: JSON.stringify(value),
	      callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
	    };
	  }
	
	  /**
	   * Cross-platform codegen helper for generating v-model value assignment code.
	   */
	  function genAssignmentCode (
	    value,
	    assignment
	  ) {
	    var res = parseModel(value);
	    if (res.key === null) {
	      return (value + "=" + assignment)
	    } else {
	      return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
	    }
	  }
	
	  /**
	   * Parse a v-model expression into a base path and a final key segment.
	   * Handles both dot-path and possible square brackets.
	   *
	   * Possible cases:
	   *
	   * - test
	   * - test[key]
	   * - test[test1[key]]
	   * - test["a"][key]
	   * - xxx.test[a[a].test1[key]]
	   * - test.xxx.a["asa"][test1[key]]
	   *
	   */
	
	  var len, str, chr, index$1, expressionPos, expressionEndPos;
	
	
	
	  function parseModel (val) {
	    // Fix https://github.com/vuejs/vue/pull/7730
	    // allow v-model="obj.val " (trailing whitespace)
	    val = val.trim();
	    len = val.length;
	
	    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	      index$1 = val.lastIndexOf('.');
	      if (index$1 > -1) {
	        return {
	          exp: val.slice(0, index$1),
	          key: '"' + val.slice(index$1 + 1) + '"'
	        }
	      } else {
	        return {
	          exp: val,
	          key: null
	        }
	      }
	    }
	
	    str = val;
	    index$1 = expressionPos = expressionEndPos = 0;
	
	    while (!eof()) {
	      chr = next();
	      /* istanbul ignore if */
	      if (isStringStart(chr)) {
	        parseString(chr);
	      } else if (chr === 0x5B) {
	        parseBracket(chr);
	      }
	    }
	
	    return {
	      exp: val.slice(0, expressionPos),
	      key: val.slice(expressionPos + 1, expressionEndPos)
	    }
	  }
	
	  function next () {
	    return str.charCodeAt(++index$1)
	  }
	
	  function eof () {
	    return index$1 >= len
	  }
	
	  function isStringStart (chr) {
	    return chr === 0x22 || chr === 0x27
	  }
	
	  function parseBracket (chr) {
	    var inBracket = 1;
	    expressionPos = index$1;
	    while (!eof()) {
	      chr = next();
	      if (isStringStart(chr)) {
	        parseString(chr);
	        continue
	      }
	      if (chr === 0x5B) { inBracket++; }
	      if (chr === 0x5D) { inBracket--; }
	      if (inBracket === 0) {
	        expressionEndPos = index$1;
	        break
	      }
	    }
	  }
	
	  function parseString (chr) {
	    var stringQuote = chr;
	    while (!eof()) {
	      chr = next();
	      if (chr === stringQuote) {
	        break
	      }
	    }
	  }
	
	  /*  */
	
	  var warn$1;
	
	  // in some cases, the event used has to be determined at runtime
	  // so we used some reserved tokens during compile.
	  var RANGE_TOKEN = '__r';
	  var CHECKBOX_RADIO_TOKEN = '__c';
	
	  function model (
	    el,
	    dir,
	    _warn
	  ) {
	    warn$1 = _warn;
	    var value = dir.value;
	    var modifiers = dir.modifiers;
	    var tag = el.tag;
	    var type = el.attrsMap.type;
	
	    {
	      // inputs with type="file" are read only and setting the input's
	      // value will throw an error.
	      if (tag === 'input' && type === 'file') {
	        warn$1(
	          "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	          "File inputs are read only. Use a v-on:change listener instead.",
	          el.rawAttrsMap['v-model']
	        );
	      }
	    }
	
	    if (el.component) {
	      genComponentModel(el, value, modifiers);
	      // component v-model doesn't need extra runtime
	      return false
	    } else if (tag === 'select') {
	      genSelect(el, value, modifiers);
	    } else if (tag === 'input' && type === 'checkbox') {
	      genCheckboxModel(el, value, modifiers);
	    } else if (tag === 'input' && type === 'radio') {
	      genRadioModel(el, value, modifiers);
	    } else if (tag === 'input' || tag === 'textarea') {
	      genDefaultModel(el, value, modifiers);
	    } else if (!config.isReservedTag(tag)) {
	      genComponentModel(el, value, modifiers);
	      // component v-model doesn't need extra runtime
	      return false
	    } else {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "v-model is not supported on this element type. " +
	        'If you are working with contenteditable, it\'s recommended to ' +
	        'wrap a library dedicated for that purpose inside a custom component.',
	        el.rawAttrsMap['v-model']
	      );
	    }
	
	    // ensure runtime directive metadata
	    return true
	  }
	
	  function genCheckboxModel (
	    el,
	    value,
	    modifiers
	  ) {
	    var number = modifiers && modifiers.number;
	    var valueBinding = getBindingAttr(el, 'value') || 'null';
	    var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	    var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	    addProp(el, 'checked',
	      "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	    );
	    addHandler(el, 'change',
	      "var $$a=" + value + "," +
	          '$$el=$event.target,' +
	          "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	      'if(Array.isArray($$a)){' +
	        "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	            '$$i=_i($$a,$$v);' +
	        "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
	        "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
	      "}else{" + (genAssignmentCode(value, '$$c')) + "}",
	      null, true
	    );
	  }
	
	  function genRadioModel (
	    el,
	    value,
	    modifiers
	  ) {
	    var number = modifiers && modifiers.number;
	    var valueBinding = getBindingAttr(el, 'value') || 'null';
	    valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	    addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	    addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	  }
	
	  function genSelect (
	    el,
	    value,
	    modifiers
	  ) {
	    var number = modifiers && modifiers.number;
	    var selectedVal = "Array.prototype.filter" +
	      ".call($event.target.options,function(o){return o.selected})" +
	      ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	      "return " + (number ? '_n(val)' : 'val') + "})";
	
	    var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	    var code = "var $$selectedVal = " + selectedVal + ";";
	    code = code + " " + (genAssignmentCode(value, assignment));
	    addHandler(el, 'change', code, null, true);
	  }
	
	  function genDefaultModel (
	    el,
	    value,
	    modifiers
	  ) {
	    var type = el.attrsMap.type;
	
	    // warn if v-bind:value conflicts with v-model
	    // except for inputs with v-bind:type
	    {
	      var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
	      var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	      if (value$1 && !typeBinding) {
	        var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
	        warn$1(
	          binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
	          'because the latter already expands to a value binding internally',
	          el.rawAttrsMap[binding]
	        );
	      }
	    }
	
	    var ref = modifiers || {};
	    var lazy = ref.lazy;
	    var number = ref.number;
	    var trim = ref.trim;
	    var needCompositionGuard = !lazy && type !== 'range';
	    var event = lazy
	      ? 'change'
	      : type === 'range'
	        ? RANGE_TOKEN
	        : 'input';
	
	    var valueExpression = '$event.target.value';
	    if (trim) {
	      valueExpression = "$event.target.value.trim()";
	    }
	    if (number) {
	      valueExpression = "_n(" + valueExpression + ")";
	    }
	
	    var code = genAssignmentCode(value, valueExpression);
	    if (needCompositionGuard) {
	      code = "if($event.target.composing)return;" + code;
	    }
	
	    addProp(el, 'value', ("(" + value + ")"));
	    addHandler(el, event, code, null, true);
	    if (trim || number) {
	      addHandler(el, 'blur', '$forceUpdate()');
	    }
	  }
	
	  /*  */
	
	  // normalize v-model event tokens that can only be determined at runtime.
	  // it's important to place the event as the first in the array because
	  // the whole point is ensuring the v-model callback gets called before
	  // user-attached handlers.
	  function normalizeEvents (on) {
	    /* istanbul ignore if */
	    if (isDef(on[RANGE_TOKEN])) {
	      // IE input[type=range] only supports `change` event
	      var event = isIE ? 'change' : 'input';
	      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	      delete on[RANGE_TOKEN];
	    }
	    // This was originally intended to fix #4521 but no longer necessary
	    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
	    /* istanbul ignore if */
	    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
	      delete on[CHECKBOX_RADIO_TOKEN];
	    }
	  }
	
	  var target$1;
	
	  function createOnceHandler$1 (event, handler, capture) {
	    var _target = target$1; // save current target element in closure
	    return function onceHandler () {
	      var res = handler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, onceHandler, capture, _target);
	      }
	    }
	  }
	
	  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
	  // implementation and does not fire microtasks in between event propagation, so
	  // safe to exclude.
	  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
	
	  function add$1 (
	    name,
	    handler,
	    capture,
	    passive
	  ) {
	    // async edge case #6566: inner click event triggers patch, event handler
	    // attached to outer element during patch, and triggered again. This
	    // happens because browsers fire microtask ticks between event propagation.
	    // the solution is simple: we save the timestamp when a handler is attached,
	    // and the handler would only fire if the event passed to it was fired
	    // AFTER it was attached.
	    if (useMicrotaskFix) {
	      var attachedTimestamp = currentFlushTimestamp;
	      var original = handler;
	      handler = original._wrapper = function (e) {
	        if (
	          // no bubbling, should always fire.
	          // this is just a safety net in case event.timeStamp is unreliable in
	          // certain weird environments...
	          e.target === e.currentTarget ||
	          // event is fired after handler attachment
	          e.timeStamp >= attachedTimestamp ||
	          // #9462 bail for iOS 9 bug: event.timeStamp is 0 after history.pushState
	          e.timeStamp === 0 ||
	          // #9448 bail if event is fired in another document in a multi-page
	          // electron/nw.js app, since event.timeStamp will be using a different
	          // starting reference
	          e.target.ownerDocument !== document
	        ) {
	          return original.apply(this, arguments)
	        }
	      };
	    }
	    target$1.addEventListener(
	      name,
	      handler,
	      supportsPassive
	        ? { capture: capture, passive: passive }
	        : capture
	    );
	  }
	
	  function remove$2 (
	    name,
	    handler,
	    capture,
	    _target
	  ) {
	    (_target || target$1).removeEventListener(
	      name,
	      handler._wrapper || handler,
	      capture
	    );
	  }
	
	  function updateDOMListeners (oldVnode, vnode) {
	    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	      return
	    }
	    var on = vnode.data.on || {};
	    var oldOn = oldVnode.data.on || {};
	    target$1 = vnode.elm;
	    normalizeEvents(on);
	    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
	    target$1 = undefined;
	  }
	
	  var events = {
	    create: updateDOMListeners,
	    update: updateDOMListeners
	  };
	
	  /*  */
	
	  var svgContainer;
	
	  function updateDOMProps (oldVnode, vnode) {
	    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	      return
	    }
	    var key, cur;
	    var elm = vnode.elm;
	    var oldProps = oldVnode.data.domProps || {};
	    var props = vnode.data.domProps || {};
	    // clone observed objects, as the user probably wants to mutate it
	    if (isDef(props.__ob__)) {
	      props = vnode.data.domProps = extend({}, props);
	    }
	
	    for (key in oldProps) {
	      if (isUndef(props[key])) {
	        elm[key] = '';
	      }
	    }
	    for (key in props) {
	      cur = props[key];
	      // ignore children if the node has textContent or innerHTML,
	      // as these will throw away existing DOM nodes and cause removal errors
	      // on subsequent patches (#3360)
	      if (key === 'textContent' || key === 'innerHTML') {
	        if (vnode.children) { vnode.children.length = 0; }
	        if (cur === oldProps[key]) { continue }
	        // #6601 work around Chrome version <= 55 bug where single textNode
	        // replaced by innerHTML/textContent retains its parentNode property
	        if (elm.childNodes.length === 1) {
	          elm.removeChild(elm.childNodes[0]);
	        }
	      }
	
	      if (key === 'value' && elm.tagName !== 'PROGRESS') {
	        // store value as _value as well since
	        // non-string values will be stringified
	        elm._value = cur;
	        // avoid resetting cursor position when value is the same
	        var strCur = isUndef(cur) ? '' : String(cur);
	        if (shouldUpdateValue(elm, strCur)) {
	          elm.value = strCur;
	        }
	      } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
	        // IE doesn't support innerHTML for SVG elements
	        svgContainer = svgContainer || document.createElement('div');
	        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
	        var svg = svgContainer.firstChild;
	        while (elm.firstChild) {
	          elm.removeChild(elm.firstChild);
	        }
	        while (svg.firstChild) {
	          elm.appendChild(svg.firstChild);
	        }
	      } else if (
	        // skip the update if old and new VDOM state is the same.
	        // `value` is handled separately because the DOM value may be temporarily
	        // out of sync with VDOM state due to focus, composition and modifiers.
	        // This  #4521 by skipping the unnecesarry `checked` update.
	        cur !== oldProps[key]
	      ) {
	        // some property updates can throw
	        // e.g. `value` on <progress> w/ non-finite value
	        try {
	          elm[key] = cur;
	        } catch (e) {}
	      }
	    }
	  }
	
	  // check platforms/web/util/attrs.js acceptValue
	
	
	  function shouldUpdateValue (elm, checkVal) {
	    return (!elm.composing && (
	      elm.tagName === 'OPTION' ||
	      isNotInFocusAndDirty(elm, checkVal) ||
	      isDirtyWithModifiers(elm, checkVal)
	    ))
	  }
	
	  function isNotInFocusAndDirty (elm, checkVal) {
	    // return true when textbox (.number and .trim) loses focus and its value is
	    // not equal to the updated value
	    var notInFocus = true;
	    // #6157
	    // work around IE bug when accessing document.activeElement in an iframe
	    try { notInFocus = document.activeElement !== elm; } catch (e) {}
	    return notInFocus && elm.value !== checkVal
	  }
	
	  function isDirtyWithModifiers (elm, newVal) {
	    var value = elm.value;
	    var modifiers = elm._vModifiers; // injected by v-model runtime
	    if (isDef(modifiers)) {
	      if (modifiers.number) {
	        return toNumber(value) !== toNumber(newVal)
	      }
	      if (modifiers.trim) {
	        return value.trim() !== newVal.trim()
	      }
	    }
	    return value !== newVal
	  }
	
	  var domProps = {
	    create: updateDOMProps,
	    update: updateDOMProps
	  };
	
	  /*  */
	
	  var parseStyleText = cached(function (cssText) {
	    var res = {};
	    var listDelimiter = /;(?![^(]*\))/g;
	    var propertyDelimiter = /:(.+)/;
	    cssText.split(listDelimiter).forEach(function (item) {
	      if (item) {
	        var tmp = item.split(propertyDelimiter);
	        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	      }
	    });
	    return res
	  });
	
	  // merge static and dynamic style data on the same vnode
	  function normalizeStyleData (data) {
	    var style = normalizeStyleBinding(data.style);
	    // static style is pre-processed into an object during compilation
	    // and is always a fresh object, so it's safe to merge into it
	    return data.staticStyle
	      ? extend(data.staticStyle, style)
	      : style
	  }
	
	  // normalize possible array / string values into Object
	  function normalizeStyleBinding (bindingStyle) {
	    if (Array.isArray(bindingStyle)) {
	      return toObject(bindingStyle)
	    }
	    if (typeof bindingStyle === 'string') {
	      return parseStyleText(bindingStyle)
	    }
	    return bindingStyle
	  }
	
	  /**
	   * parent component style should be after child's
	   * so that parent component's style could override it
	   */
	  function getStyle (vnode, checkChild) {
	    var res = {};
	    var styleData;
	
	    if (checkChild) {
	      var childNode = vnode;
	      while (childNode.componentInstance) {
	        childNode = childNode.componentInstance._vnode;
	        if (
	          childNode && childNode.data &&
	          (styleData = normalizeStyleData(childNode.data))
	        ) {
	          extend(res, styleData);
	        }
	      }
	    }
	
	    if ((styleData = normalizeStyleData(vnode.data))) {
	      extend(res, styleData);
	    }
	
	    var parentNode = vnode;
	    while ((parentNode = parentNode.parent)) {
	      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	        extend(res, styleData);
	      }
	    }
	    return res
	  }
	
	  /*  */
	
	  var cssVarRE = /^--/;
	  var importantRE = /\s*!important$/;
	  var setProp = function (el, name, val) {
	    /* istanbul ignore if */
	    if (cssVarRE.test(name)) {
	      el.style.setProperty(name, val);
	    } else if (importantRE.test(val)) {
	      el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
	    } else {
	      var normalizedName = normalize(name);
	      if (Array.isArray(val)) {
	        // Support values array created by autoprefixer, e.g.
	        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	        // Set them one by one, and the browser will only set those it can recognize
	        for (var i = 0, len = val.length; i < len; i++) {
	          el.style[normalizedName] = val[i];
	        }
	      } else {
	        el.style[normalizedName] = val;
	      }
	    }
	  };
	
	  var vendorNames = ['Webkit', 'Moz', 'ms'];
	
	  var emptyStyle;
	  var normalize = cached(function (prop) {
	    emptyStyle = emptyStyle || document.createElement('div').style;
	    prop = camelize(prop);
	    if (prop !== 'filter' && (prop in emptyStyle)) {
	      return prop
	    }
	    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
	    for (var i = 0; i < vendorNames.length; i++) {
	      var name = vendorNames[i] + capName;
	      if (name in emptyStyle) {
	        return name
	      }
	    }
	  });
	
	  function updateStyle (oldVnode, vnode) {
	    var data = vnode.data;
	    var oldData = oldVnode.data;
	
	    if (isUndef(data.staticStyle) && isUndef(data.style) &&
	      isUndef(oldData.staticStyle) && isUndef(oldData.style)
	    ) {
	      return
	    }
	
	    var cur, name;
	    var el = vnode.elm;
	    var oldStaticStyle = oldData.staticStyle;
	    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
	
	    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	    var oldStyle = oldStaticStyle || oldStyleBinding;
	
	    var style = normalizeStyleBinding(vnode.data.style) || {};
	
	    // store normalized style under a different key for next diff
	    // make sure to clone it if it's reactive, since the user likely wants
	    // to mutate it.
	    vnode.data.normalizedStyle = isDef(style.__ob__)
	      ? extend({}, style)
	      : style;
	
	    var newStyle = getStyle(vnode, true);
	
	    for (name in oldStyle) {
	      if (isUndef(newStyle[name])) {
	        setProp(el, name, '');
	      }
	    }
	    for (name in newStyle) {
	      cur = newStyle[name];
	      if (cur !== oldStyle[name]) {
	        // ie9 setting to null has no effect, must use empty string
	        setProp(el, name, cur == null ? '' : cur);
	      }
	    }
	  }
	
	  var style = {
	    create: updateStyle,
	    update: updateStyle
	  };
	
	  /*  */
	
	  var whitespaceRE = /\s+/;
	
	  /**
	   * Add class with compatibility for SVG since classList is not supported on
	   * SVG elements in IE
	   */
	  function addClass (el, cls) {
	    /* istanbul ignore if */
	    if (!cls || !(cls = cls.trim())) {
	      return
	    }
	
	    /* istanbul ignore else */
	    if (el.classList) {
	      if (cls.indexOf(' ') > -1) {
	        cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
	      } else {
	        el.classList.add(cls);
	      }
	    } else {
	      var cur = " " + (el.getAttribute('class') || '') + " ";
	      if (cur.indexOf(' ' + cls + ' ') < 0) {
	        el.setAttribute('class', (cur + cls).trim());
	      }
	    }
	  }
	
	  /**
	   * Remove class with compatibility for SVG since classList is not supported on
	   * SVG elements in IE
	   */
	  function removeClass (el, cls) {
	    /* istanbul ignore if */
	    if (!cls || !(cls = cls.trim())) {
	      return
	    }
	
	    /* istanbul ignore else */
	    if (el.classList) {
	      if (cls.indexOf(' ') > -1) {
	        cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
	      } else {
	        el.classList.remove(cls);
	      }
	      if (!el.classList.length) {
	        el.removeAttribute('class');
	      }
	    } else {
	      var cur = " " + (el.getAttribute('class') || '') + " ";
	      var tar = ' ' + cls + ' ';
	      while (cur.indexOf(tar) >= 0) {
	        cur = cur.replace(tar, ' ');
	      }
	      cur = cur.trim();
	      if (cur) {
	        el.setAttribute('class', cur);
	      } else {
	        el.removeAttribute('class');
	      }
	    }
	  }
	
	  /*  */
	
	  function resolveTransition (def$$1) {
	    if (!def$$1) {
	      return
	    }
	    /* istanbul ignore else */
	    if (typeof def$$1 === 'object') {
	      var res = {};
	      if (def$$1.css !== false) {
	        extend(res, autoCssTransition(def$$1.name || 'v'));
	      }
	      extend(res, def$$1);
	      return res
	    } else if (typeof def$$1 === 'string') {
	      return autoCssTransition(def$$1)
	    }
	  }
	
	  var autoCssTransition = cached(function (name) {
	    return {
	      enterClass: (name + "-enter"),
	      enterToClass: (name + "-enter-to"),
	      enterActiveClass: (name + "-enter-active"),
	      leaveClass: (name + "-leave"),
	      leaveToClass: (name + "-leave-to"),
	      leaveActiveClass: (name + "-leave-active")
	    }
	  });
	
	  var hasTransition = inBrowser && !isIE9;
	  var TRANSITION = 'transition';
	  var ANIMATION = 'animation';
	
	  // Transition property/event sniffing
	  var transitionProp = 'transition';
	  var transitionEndEvent = 'transitionend';
	  var animationProp = 'animation';
	  var animationEndEvent = 'animationend';
	  if (hasTransition) {
	    /* istanbul ignore if */
	    if (window.ontransitionend === undefined &&
	      window.onwebkittransitionend !== undefined
	    ) {
	      transitionProp = 'WebkitTransition';
	      transitionEndEvent = 'webkitTransitionEnd';
	    }
	    if (window.onanimationend === undefined &&
	      window.onwebkitanimationend !== undefined
	    ) {
	      animationProp = 'WebkitAnimation';
	      animationEndEvent = 'webkitAnimationEnd';
	    }
	  }
	
	  // binding to window is necessary to make hot reload work in IE in strict mode
	  var raf = inBrowser
	    ? window.requestAnimationFrame
	      ? window.requestAnimationFrame.bind(window)
	      : setTimeout
	    : /* istanbul ignore next */ function (fn) { return fn(); };
	
	  function nextFrame (fn) {
	    raf(function () {
	      raf(fn);
	    });
	  }
	
	  function addTransitionClass (el, cls) {
	    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
	    if (transitionClasses.indexOf(cls) < 0) {
	      transitionClasses.push(cls);
	      addClass(el, cls);
	    }
	  }
	
	  function removeTransitionClass (el, cls) {
	    if (el._transitionClasses) {
	      remove(el._transitionClasses, cls);
	    }
	    removeClass(el, cls);
	  }
	
	  function whenTransitionEnds (
	    el,
	    expectedType,
	    cb
	  ) {
	    var ref = getTransitionInfo(el, expectedType);
	    var type = ref.type;
	    var timeout = ref.timeout;
	    var propCount = ref.propCount;
	    if (!type) { return cb() }
	    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	    var ended = 0;
	    var end = function () {
	      el.removeEventListener(event, onEnd);
	      cb();
	    };
	    var onEnd = function (e) {
	      if (e.target === el) {
	        if (++ended >= propCount) {
	          end();
	        }
	      }
	    };
	    setTimeout(function () {
	      if (ended < propCount) {
	        end();
	      }
	    }, timeout + 1);
	    el.addEventListener(event, onEnd);
	  }
	
	  var transformRE = /\b(transform|all)(,|$)/;
	
	  function getTransitionInfo (el, expectedType) {
	    var styles = window.getComputedStyle(el);
	    // JSDOM may return undefined for transition properties
	    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
	    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
	    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
	    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
	    var animationTimeout = getTimeout(animationDelays, animationDurations);
	
	    var type;
	    var timeout = 0;
	    var propCount = 0;
	    /* istanbul ignore if */
	    if (expectedType === TRANSITION) {
	      if (transitionTimeout > 0) {
	        type = TRANSITION;
	        timeout = transitionTimeout;
	        propCount = transitionDurations.length;
	      }
	    } else if (expectedType === ANIMATION) {
	      if (animationTimeout > 0) {
	        type = ANIMATION;
	        timeout = animationTimeout;
	        propCount = animationDurations.length;
	      }
	    } else {
	      timeout = Math.max(transitionTimeout, animationTimeout);
	      type = timeout > 0
	        ? transitionTimeout > animationTimeout
	          ? TRANSITION
	          : ANIMATION
	        : null;
	      propCount = type
	        ? type === TRANSITION
	          ? transitionDurations.length
	          : animationDurations.length
	        : 0;
	    }
	    var hasTransform =
	      type === TRANSITION &&
	      transformRE.test(styles[transitionProp + 'Property']);
	    return {
	      type: type,
	      timeout: timeout,
	      propCount: propCount,
	      hasTransform: hasTransform
	    }
	  }
	
	  function getTimeout (delays, durations) {
	    /* istanbul ignore next */
	    while (delays.length < durations.length) {
	      delays = delays.concat(delays);
	    }
	
	    return Math.max.apply(null, durations.map(function (d, i) {
	      return toMs(d) + toMs(delays[i])
	    }))
	  }
	
	  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
	  // in a locale-dependent way, using a comma instead of a dot.
	  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
	  // as a floor function) causing unexpected behaviors
	  function toMs (s) {
	    return Number(s.slice(0, -1).replace(',', '.')) * 1000
	  }
	
	  /*  */
	
	  function enter (vnode, toggleDisplay) {
	    var el = vnode.elm;
	
	    // call leave callback now
	    if (isDef(el._leaveCb)) {
	      el._leaveCb.cancelled = true;
	      el._leaveCb();
	    }
	
	    var data = resolveTransition(vnode.data.transition);
	    if (isUndef(data)) {
	      return
	    }
	
	    /* istanbul ignore if */
	    if (isDef(el._enterCb) || el.nodeType !== 1) {
	      return
	    }
	
	    var css = data.css;
	    var type = data.type;
	    var enterClass = data.enterClass;
	    var enterToClass = data.enterToClass;
	    var enterActiveClass = data.enterActiveClass;
	    var appearClass = data.appearClass;
	    var appearToClass = data.appearToClass;
	    var appearActiveClass = data.appearActiveClass;
	    var beforeEnter = data.beforeEnter;
	    var enter = data.enter;
	    var afterEnter = data.afterEnter;
	    var enterCancelled = data.enterCancelled;
	    var beforeAppear = data.beforeAppear;
	    var appear = data.appear;
	    var afterAppear = data.afterAppear;
	    var appearCancelled = data.appearCancelled;
	    var duration = data.duration;
	
	    // activeInstance will always be the <transition> component managing this
	    // transition. One edge case to check is when the <transition> is placed
	    // as the root node of a child component. In that case we need to check
	    // <transition>'s parent for appear check.
	    var context = activeInstance;
	    var transitionNode = activeInstance.$vnode;
	    while (transitionNode && transitionNode.parent) {
	      transitionNode = transitionNode.parent;
	      context = transitionNode.context;
	    }
	
	    var isAppear = !context._isMounted || !vnode.isRootInsert;
	
	    if (isAppear && !appear && appear !== '') {
	      return
	    }
	
	    var startClass = isAppear && appearClass
	      ? appearClass
	      : enterClass;
	    var activeClass = isAppear && appearActiveClass
	      ? appearActiveClass
	      : enterActiveClass;
	    var toClass = isAppear && appearToClass
	      ? appearToClass
	      : enterToClass;
	
	    var beforeEnterHook = isAppear
	      ? (beforeAppear || beforeEnter)
	      : beforeEnter;
	    var enterHook = isAppear
	      ? (typeof appear === 'function' ? appear : enter)
	      : enter;
	    var afterEnterHook = isAppear
	      ? (afterAppear || afterEnter)
	      : afterEnter;
	    var enterCancelledHook = isAppear
	      ? (appearCancelled || enterCancelled)
	      : enterCancelled;
	
	    var explicitEnterDuration = toNumber(
	      isObject(duration)
	        ? duration.enter
	        : duration
	    );
	
	    if (explicitEnterDuration != null) {
	      checkDuration(explicitEnterDuration, 'enter', vnode);
	    }
	
	    var expectsCSS = css !== false && !isIE9;
	    var userWantsControl = getHookArgumentsLength(enterHook);
	
	    var cb = el._enterCb = once(function () {
	      if (expectsCSS) {
	        removeTransitionClass(el, toClass);
	        removeTransitionClass(el, activeClass);
	      }
	      if (cb.cancelled) {
	        if (expectsCSS) {
	          removeTransitionClass(el, startClass);
	        }
	        enterCancelledHook && enterCancelledHook(el);
	      } else {
	        afterEnterHook && afterEnterHook(el);
	      }
	      el._enterCb = null;
	    });
	
	    if (!vnode.data.show) {
	      // remove pending leave element on enter by injecting an insert hook
	      mergeVNodeHook(vnode, 'insert', function () {
	        var parent = el.parentNode;
	        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	        if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb
	        ) {
	          pendingNode.elm._leaveCb();
	        }
	        enterHook && enterHook(el, cb);
	      });
	    }
	
	    // start enter transition
	    beforeEnterHook && beforeEnterHook(el);
	    if (expectsCSS) {
	      addTransitionClass(el, startClass);
	      addTransitionClass(el, activeClass);
	      nextFrame(function () {
	        removeTransitionClass(el, startClass);
	        if (!cb.cancelled) {
	          addTransitionClass(el, toClass);
	          if (!userWantsControl) {
	            if (isValidDuration(explicitEnterDuration)) {
	              setTimeout(cb, explicitEnterDuration);
	            } else {
	              whenTransitionEnds(el, type, cb);
	            }
	          }
	        }
	      });
	    }
	
	    if (vnode.data.show) {
	      toggleDisplay && toggleDisplay();
	      enterHook && enterHook(el, cb);
	    }
	
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	
	  function leave (vnode, rm) {
	    var el = vnode.elm;
	
	    // call enter callback now
	    if (isDef(el._enterCb)) {
	      el._enterCb.cancelled = true;
	      el._enterCb();
	    }
	
	    var data = resolveTransition(vnode.data.transition);
	    if (isUndef(data) || el.nodeType !== 1) {
	      return rm()
	    }
	
	    /* istanbul ignore if */
	    if (isDef(el._leaveCb)) {
	      return
	    }
	
	    var css = data.css;
	    var type = data.type;
	    var leaveClass = data.leaveClass;
	    var leaveToClass = data.leaveToClass;
	    var leaveActiveClass = data.leaveActiveClass;
	    var beforeLeave = data.beforeLeave;
	    var leave = data.leave;
	    var afterLeave = data.afterLeave;
	    var leaveCancelled = data.leaveCancelled;
	    var delayLeave = data.delayLeave;
	    var duration = data.duration;
	
	    var expectsCSS = css !== false && !isIE9;
	    var userWantsControl = getHookArgumentsLength(leave);
	
	    var explicitLeaveDuration = toNumber(
	      isObject(duration)
	        ? duration.leave
	        : duration
	    );
	
	    if (isDef(explicitLeaveDuration)) {
	      checkDuration(explicitLeaveDuration, 'leave', vnode);
	    }
	
	    var cb = el._leaveCb = once(function () {
	      if (el.parentNode && el.parentNode._pending) {
	        el.parentNode._pending[vnode.key] = null;
	      }
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveActiveClass);
	      }
	      if (cb.cancelled) {
	        if (expectsCSS) {
	          removeTransitionClass(el, leaveClass);
	        }
	        leaveCancelled && leaveCancelled(el);
	      } else {
	        rm();
	        afterLeave && afterLeave(el);
	      }
	      el._leaveCb = null;
	    });
	
	    if (delayLeave) {
	      delayLeave(performLeave);
	    } else {
	      performLeave();
	    }
	
	    function performLeave () {
	      // the delayed leave may have already been cancelled
	      if (cb.cancelled) {
	        return
	      }
	      // record leaving element
	      if (!vnode.data.show && el.parentNode) {
	        (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
	      }
	      beforeLeave && beforeLeave(el);
	      if (expectsCSS) {
	        addTransitionClass(el, leaveClass);
	        addTransitionClass(el, leaveActiveClass);
	        nextFrame(function () {
	          removeTransitionClass(el, leaveClass);
	          if (!cb.cancelled) {
	            addTransitionClass(el, leaveToClass);
	            if (!userWantsControl) {
	              if (isValidDuration(explicitLeaveDuration)) {
	                setTimeout(cb, explicitLeaveDuration);
	              } else {
	                whenTransitionEnds(el, type, cb);
	              }
	            }
	          }
	        });
	      }
	      leave && leave(el, cb);
	      if (!expectsCSS && !userWantsControl) {
	        cb();
	      }
	    }
	  }
	
	  // only used in dev mode
	  function checkDuration (val, name, vnode) {
	    if (typeof val !== 'number') {
	      warn(
	        "<transition> explicit " + name + " duration is not a valid number - " +
	        "got " + (JSON.stringify(val)) + ".",
	        vnode.context
	      );
	    } else if (isNaN(val)) {
	      warn(
	        "<transition> explicit " + name + " duration is NaN - " +
	        'the duration expression might be incorrect.',
	        vnode.context
	      );
	    }
	  }
	
	  function isValidDuration (val) {
	    return typeof val === 'number' && !isNaN(val)
	  }
	
	  /**
	   * Normalize a transition hook's argument length. The hook may be:
	   * - a merged hook (invoker) with the original in .fns
	   * - a wrapped component method (check ._length)
	   * - a plain function (.length)
	   */
	  function getHookArgumentsLength (fn) {
	    if (isUndef(fn)) {
	      return false
	    }
	    var invokerFns = fn.fns;
	    if (isDef(invokerFns)) {
	      // invoker
	      return getHookArgumentsLength(
	        Array.isArray(invokerFns)
	          ? invokerFns[0]
	          : invokerFns
	      )
	    } else {
	      return (fn._length || fn.length) > 1
	    }
	  }
	
	  function _enter (_, vnode) {
	    if (vnode.data.show !== true) {
	      enter(vnode);
	    }
	  }
	
	  var transition = inBrowser ? {
	    create: _enter,
	    activate: _enter,
	    remove: function remove$$1 (vnode, rm) {
	      /* istanbul ignore else */
	      if (vnode.data.show !== true) {
	        leave(vnode, rm);
	      } else {
	        rm();
	      }
	    }
	  } : {};
	
	  var platformModules = [
	    attrs,
	    klass,
	    events,
	    domProps,
	    style,
	    transition
	  ];
	
	  /*  */
	
	  // the directive module should be applied last, after all
	  // built-in modules have been applied.
	  var modules = platformModules.concat(baseModules);
	
	  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	  /**
	   * Not type checking this file because flow doesn't like attaching
	   * properties to Elements.
	   */
	
	  /* istanbul ignore if */
	  if (isIE9) {
	    // http://www.matts411.com/post/internet-explorer-9-oninput/
	    document.addEventListener('selectionchange', function () {
	      var el = document.activeElement;
	      if (el && el.vmodel) {
	        trigger(el, 'input');
	      }
	    });
	  }
	
	  var directive = {
	    inserted: function inserted (el, binding, vnode, oldVnode) {
	      if (vnode.tag === 'select') {
	        // #6903
	        if (oldVnode.elm && !oldVnode.elm._vOptions) {
	          mergeVNodeHook(vnode, 'postpatch', function () {
	            directive.componentUpdated(el, binding, vnode);
	          });
	        } else {
	          setSelected(el, binding, vnode.context);
	        }
	        el._vOptions = [].map.call(el.options, getValue);
	      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
	        el._vModifiers = binding.modifiers;
	        if (!binding.modifiers.lazy) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	          // Safari < 10.2 & UIWebView doesn't fire compositionend when
	          // switching focus before confirming composition choice
	          // this also fixes the issue where some browsers e.g. iOS Chrome
	          // fires "change" instead of "input" on autocomplete.
	          el.addEventListener('change', onCompositionEnd);
	          /* istanbul ignore if */
	          if (isIE9) {
	            el.vmodel = true;
	          }
	        }
	      }
	    },
	
	    componentUpdated: function componentUpdated (el, binding, vnode) {
	      if (vnode.tag === 'select') {
	        setSelected(el, binding, vnode.context);
	        // in case the options rendered by v-for have changed,
	        // it's possible that the value is out-of-sync with the rendered options.
	        // detect such cases and filter out values that no longer has a matching
	        // option in the DOM.
	        var prevOptions = el._vOptions;
	        var curOptions = el._vOptions = [].map.call(el.options, getValue);
	        if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
	          // trigger change event if
	          // no matching option found for at least one value
	          var needReset = el.multiple
	            ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
	            : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
	          if (needReset) {
	            trigger(el, 'change');
	          }
	        }
	      }
	    }
	  };
	
	  function setSelected (el, binding, vm) {
	    actuallySetSelected(el, binding, vm);
	    /* istanbul ignore if */
	    if (isIE || isEdge) {
	      setTimeout(function () {
	        actuallySetSelected(el, binding, vm);
	      }, 0);
	    }
	  }
	
	  function actuallySetSelected (el, binding, vm) {
	    var value = binding.value;
	    var isMultiple = el.multiple;
	    if (isMultiple && !Array.isArray(value)) {
	      warn(
	        "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	        "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	        vm
	      );
	      return
	    }
	    var selected, option;
	    for (var i = 0, l = el.options.length; i < l; i++) {
	      option = el.options[i];
	      if (isMultiple) {
	        selected = looseIndexOf(value, getValue(option)) > -1;
	        if (option.selected !== selected) {
	          option.selected = selected;
	        }
	      } else {
	        if (looseEqual(getValue(option), value)) {
	          if (el.selectedIndex !== i) {
	            el.selectedIndex = i;
	          }
	          return
	        }
	      }
	    }
	    if (!isMultiple) {
	      el.selectedIndex = -1;
	    }
	  }
	
	  function hasNoMatchingOption (value, options) {
	    return options.every(function (o) { return !looseEqual(o, value); })
	  }
	
	  function getValue (option) {
	    return '_value' in option
	      ? option._value
	      : option.value
	  }
	
	  function onCompositionStart (e) {
	    e.target.composing = true;
	  }
	
	  function onCompositionEnd (e) {
	    // prevent triggering an input event for no reason
	    if (!e.target.composing) { return }
	    e.target.composing = false;
	    trigger(e.target, 'input');
	  }
	
	  function trigger (el, type) {
	    var e = document.createEvent('HTMLEvents');
	    e.initEvent(type, true, true);
	    el.dispatchEvent(e);
	  }
	
	  /*  */
	
	  // recursively search for possible transition defined inside the component root
	  function locateNode (vnode) {
	    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	      ? locateNode(vnode.componentInstance._vnode)
	      : vnode
	  }
	
	  var show = {
	    bind: function bind (el, ref, vnode) {
	      var value = ref.value;
	
	      vnode = locateNode(vnode);
	      var transition$$1 = vnode.data && vnode.data.transition;
	      var originalDisplay = el.__vOriginalDisplay =
	        el.style.display === 'none' ? '' : el.style.display;
	      if (value && transition$$1) {
	        vnode.data.show = true;
	        enter(vnode, function () {
	          el.style.display = originalDisplay;
	        });
	      } else {
	        el.style.display = value ? originalDisplay : 'none';
	      }
	    },
	
	    update: function update (el, ref, vnode) {
	      var value = ref.value;
	      var oldValue = ref.oldValue;
	
	      /* istanbul ignore if */
	      if (!value === !oldValue) { return }
	      vnode = locateNode(vnode);
	      var transition$$1 = vnode.data && vnode.data.transition;
	      if (transition$$1) {
	        vnode.data.show = true;
	        if (value) {
	          enter(vnode, function () {
	            el.style.display = el.__vOriginalDisplay;
	          });
	        } else {
	          leave(vnode, function () {
	            el.style.display = 'none';
	          });
	        }
	      } else {
	        el.style.display = value ? el.__vOriginalDisplay : 'none';
	      }
	    },
	
	    unbind: function unbind (
	      el,
	      binding,
	      vnode,
	      oldVnode,
	      isDestroy
	    ) {
	      if (!isDestroy) {
	        el.style.display = el.__vOriginalDisplay;
	      }
	    }
	  };
	
	  var platformDirectives = {
	    model: directive,
	    show: show
	  };
	
	  /*  */
	
	  var transitionProps = {
	    name: String,
	    appear: Boolean,
	    css: Boolean,
	    mode: String,
	    type: String,
	    enterClass: String,
	    leaveClass: String,
	    enterToClass: String,
	    leaveToClass: String,
	    enterActiveClass: String,
	    leaveActiveClass: String,
	    appearClass: String,
	    appearActiveClass: String,
	    appearToClass: String,
	    duration: [Number, String, Object]
	  };
	
	  // in case the child is also an abstract component, e.g. <keep-alive>
	  // we want to recursively retrieve the real component to be rendered
	  function getRealChild (vnode) {
	    var compOptions = vnode && vnode.componentOptions;
	    if (compOptions && compOptions.Ctor.options.abstract) {
	      return getRealChild(getFirstComponentChild(compOptions.children))
	    } else {
	      return vnode
	    }
	  }
	
	  function extractTransitionData (comp) {
	    var data = {};
	    var options = comp.$options;
	    // props
	    for (var key in options.propsData) {
	      data[key] = comp[key];
	    }
	    // events.
	    // extract listeners and pass them directly to the transition methods
	    var listeners = options._parentListeners;
	    for (var key$1 in listeners) {
	      data[camelize(key$1)] = listeners[key$1];
	    }
	    return data
	  }
	
	  function placeholder (h, rawChild) {
	    if (/\d-keep-alive$/.test(rawChild.tag)) {
	      return h('keep-alive', {
	        props: rawChild.componentOptions.propsData
	      })
	    }
	  }
	
	  function hasParentTransition (vnode) {
	    while ((vnode = vnode.parent)) {
	      if (vnode.data.transition) {
	        return true
	      }
	    }
	  }
	
	  function isSameChild (child, oldChild) {
	    return oldChild.key === child.key && oldChild.tag === child.tag
	  }
	
	  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };
	
	  var isVShowDirective = function (d) { return d.name === 'show'; };
	
	  var Transition = {
	    name: 'transition',
	    props: transitionProps,
	    abstract: true,
	
	    render: function render (h) {
	      var this$1 = this;
	
	      var children = this.$slots.default;
	      if (!children) {
	        return
	      }
	
	      // filter out text nodes (possible whitespaces)
	      children = children.filter(isNotTextNode);
	      /* istanbul ignore if */
	      if (!children.length) {
	        return
	      }
	
	      // warn multiple elements
	      if (children.length > 1) {
	        warn(
	          '<transition> can only be used on a single element. Use ' +
	          '<transition-group> for lists.',
	          this.$parent
	        );
	      }
	
	      var mode = this.mode;
	
	      // warn invalid mode
	      if (mode && mode !== 'in-out' && mode !== 'out-in'
	      ) {
	        warn(
	          'invalid <transition> mode: ' + mode,
	          this.$parent
	        );
	      }
	
	      var rawChild = children[0];
	
	      // if this is a component root node and the component's
	      // parent container node also has transition, skip.
	      if (hasParentTransition(this.$vnode)) {
	        return rawChild
	      }
	
	      // apply transition data to child
	      // use getRealChild() to ignore abstract components e.g. keep-alive
	      var child = getRealChild(rawChild);
	      /* istanbul ignore if */
	      if (!child) {
	        return rawChild
	      }
	
	      if (this._leaving) {
	        return placeholder(h, rawChild)
	      }
	
	      // ensure a key that is unique to the vnode type and to this transition
	      // component instance. This key will be used to remove pending leaving nodes
	      // during entering.
	      var id = "__transition-" + (this._uid) + "-";
	      child.key = child.key == null
	        ? child.isComment
	          ? id + 'comment'
	          : id + child.tag
	        : isPrimitive(child.key)
	          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	          : child.key;
	
	      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	      var oldRawChild = this._vnode;
	      var oldChild = getRealChild(oldRawChild);
	
	      // mark v-show
	      // so that the transition module can hand over the control to the directive
	      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
	        child.data.show = true;
	      }
	
	      if (
	        oldChild &&
	        oldChild.data &&
	        !isSameChild(child, oldChild) &&
	        !isAsyncPlaceholder(oldChild) &&
	        // #6687 component root is a comment node
	        !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
	      ) {
	        // replace old child transition data with fresh one
	        // important for dynamic transitions!
	        var oldData = oldChild.data.transition = extend({}, data);
	        // handle transition mode
	        if (mode === 'out-in') {
	          // return placeholder node and queue update when leave finishes
	          this._leaving = true;
	          mergeVNodeHook(oldData, 'afterLeave', function () {
	            this$1._leaving = false;
	            this$1.$forceUpdate();
	          });
	          return placeholder(h, rawChild)
	        } else if (mode === 'in-out') {
	          if (isAsyncPlaceholder(child)) {
	            return oldRawChild
	          }
	          var delayedLeave;
	          var performLeave = function () { delayedLeave(); };
	          mergeVNodeHook(data, 'afterEnter', performLeave);
	          mergeVNodeHook(data, 'enterCancelled', performLeave);
	          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	        }
	      }
	
	      return rawChild
	    }
	  };
	
	  /*  */
	
	  var props = extend({
	    tag: String,
	    moveClass: String
	  }, transitionProps);
	
	  delete props.mode;
	
	  var TransitionGroup = {
	    props: props,
	
	    beforeMount: function beforeMount () {
	      var this$1 = this;
	
	      var update = this._update;
	      this._update = function (vnode, hydrating) {
	        var restoreActiveInstance = setActiveInstance(this$1);
	        // force removing pass
	        this$1.__patch__(
	          this$1._vnode,
	          this$1.kept,
	          false, // hydrating
	          true // removeOnly (!important, avoids unnecessary moves)
	        );
	        this$1._vnode = this$1.kept;
	        restoreActiveInstance();
	        update.call(this$1, vnode, hydrating);
	      };
	    },
	
	    render: function render (h) {
	      var tag = this.tag || this.$vnode.data.tag || 'span';
	      var map = Object.create(null);
	      var prevChildren = this.prevChildren = this.children;
	      var rawChildren = this.$slots.default || [];
	      var children = this.children = [];
	      var transitionData = extractTransitionData(this);
	
	      for (var i = 0; i < rawChildren.length; i++) {
	        var c = rawChildren[i];
	        if (c.tag) {
	          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	            children.push(c);
	            map[c.key] = c
	            ;(c.data || (c.data = {})).transition = transitionData;
	          } else {
	            var opts = c.componentOptions;
	            var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	            warn(("<transition-group> children must be keyed: <" + name + ">"));
	          }
	        }
	      }
	
	      if (prevChildren) {
	        var kept = [];
	        var removed = [];
	        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	          var c$1 = prevChildren[i$1];
	          c$1.data.transition = transitionData;
	          c$1.data.pos = c$1.elm.getBoundingClientRect();
	          if (map[c$1.key]) {
	            kept.push(c$1);
	          } else {
	            removed.push(c$1);
	          }
	        }
	        this.kept = h(tag, null, kept);
	        this.removed = removed;
	      }
	
	      return h(tag, null, children)
	    },
	
	    updated: function updated () {
	      var children = this.prevChildren;
	      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	        return
	      }
	
	      // we divide the work into three loops to avoid mixing DOM reads and writes
	      // in each iteration - which helps prevent layout thrashing.
	      children.forEach(callPendingCbs);
	      children.forEach(recordPosition);
	      children.forEach(applyTranslation);
	
	      // force reflow to put everything in position
	      // assign to this to avoid being removed in tree-shaking
	      // $flow-disable-line
	      this._reflow = document.body.offsetHeight;
	
	      children.forEach(function (c) {
	        if (c.data.moved) {
	          var el = c.elm;
	          var s = el.style;
	          addTransitionClass(el, moveClass);
	          s.transform = s.WebkitTransform = s.transitionDuration = '';
	          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	            if (e && e.target !== el) {
	              return
	            }
	            if (!e || /transform$/.test(e.propertyName)) {
	              el.removeEventListener(transitionEndEvent, cb);
	              el._moveCb = null;
	              removeTransitionClass(el, moveClass);
	            }
	          });
	        }
	      });
	    },
	
	    methods: {
	      hasMove: function hasMove (el, moveClass) {
	        /* istanbul ignore if */
	        if (!hasTransition) {
	          return false
	        }
	        /* istanbul ignore if */
	        if (this._hasMove) {
	          return this._hasMove
	        }
	        // Detect whether an element with the move class applied has
	        // CSS transitions. Since the element may be inside an entering
	        // transition at this very moment, we make a clone of it and remove
	        // all other transition classes applied to ensure only the move class
	        // is applied.
	        var clone = el.cloneNode();
	        if (el._transitionClasses) {
	          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	        }
	        addClass(clone, moveClass);
	        clone.style.display = 'none';
	        this.$el.appendChild(clone);
	        var info = getTransitionInfo(clone);
	        this.$el.removeChild(clone);
	        return (this._hasMove = info.hasTransform)
	      }
	    }
	  };
	
	  function callPendingCbs (c) {
	    /* istanbul ignore if */
	    if (c.elm._moveCb) {
	      c.elm._moveCb();
	    }
	    /* istanbul ignore if */
	    if (c.elm._enterCb) {
	      c.elm._enterCb();
	    }
	  }
	
	  function recordPosition (c) {
	    c.data.newPos = c.elm.getBoundingClientRect();
	  }
	
	  function applyTranslation (c) {
	    var oldPos = c.data.pos;
	    var newPos = c.data.newPos;
	    var dx = oldPos.left - newPos.left;
	    var dy = oldPos.top - newPos.top;
	    if (dx || dy) {
	      c.data.moved = true;
	      var s = c.elm.style;
	      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	      s.transitionDuration = '0s';
	    }
	  }
	
	  var platformComponents = {
	    Transition: Transition,
	    TransitionGroup: TransitionGroup
	  };
	
	  /*  */
	
	  // install platform specific utils
	  Vue.config.mustUseProp = mustUseProp;
	  Vue.config.isReservedTag = isReservedTag;
	  Vue.config.isReservedAttr = isReservedAttr;
	  Vue.config.getTagNamespace = getTagNamespace;
	  Vue.config.isUnknownElement = isUnknownElement;
	
	  // install platform runtime directives & components
	  extend(Vue.options.directives, platformDirectives);
	  extend(Vue.options.components, platformComponents);
	
	  // install platform patch function
	  Vue.prototype.__patch__ = inBrowser ? patch : noop;
	
	  // public mount method
	  Vue.prototype.$mount = function (
	    el,
	    hydrating
	  ) {
	    el = el && inBrowser ? query(el) : undefined;
	    return mountComponent(this, el, hydrating)
	  };
	
	  // devtools global hook
	  /* istanbul ignore next */
	  if (inBrowser) {
	    setTimeout(function () {
	      if (config.devtools) {
	        if (devtools) {
	          devtools.emit('init', Vue);
	        } else {
	          console[console.info ? 'info' : 'log'](
	            'Download the Vue Devtools extension for a better development experience:\n' +
	            'https://github.com/vuejs/vue-devtools'
	          );
	        }
	      }
	      if (config.productionTip !== false &&
	        typeof console !== 'undefined'
	      ) {
	        console[console.info ? 'info' : 'log'](
	          "You are running Vue in development mode.\n" +
	          "Make sure to turn on production mode when deploying for production.\n" +
	          "See more tips at https://vuejs.org/guide/deployment.html"
	        );
	      }
	    }, 0);
	  }
	
	  /*  */
	
	  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	
	  var buildRegex = cached(function (delimiters) {
	    var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	    var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	  });
	
	
	
	  function parseText (
	    text,
	    delimiters
	  ) {
	    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	    if (!tagRE.test(text)) {
	      return
	    }
	    var tokens = [];
	    var rawTokens = [];
	    var lastIndex = tagRE.lastIndex = 0;
	    var match, index, tokenValue;
	    while ((match = tagRE.exec(text))) {
	      index = match.index;
	      // push text token
	      if (index > lastIndex) {
	        rawTokens.push(tokenValue = text.slice(lastIndex, index));
	        tokens.push(JSON.stringify(tokenValue));
	      }
	      // tag token
	      var exp = parseFilters(match[1].trim());
	      tokens.push(("_s(" + exp + ")"));
	      rawTokens.push({ '@binding': exp });
	      lastIndex = index + match[0].length;
	    }
	    if (lastIndex < text.length) {
	      rawTokens.push(tokenValue = text.slice(lastIndex));
	      tokens.push(JSON.stringify(tokenValue));
	    }
	    return {
	      expression: tokens.join('+'),
	      tokens: rawTokens
	    }
	  }
	
	  /*  */
	
	  function transformNode (el, options) {
	    var warn = options.warn || baseWarn;
	    var staticClass = getAndRemoveAttr(el, 'class');
	    if (staticClass) {
	      var res = parseText(staticClass, options.delimiters);
	      if (res) {
	        warn(
	          "class=\"" + staticClass + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div class="{{ val }}">, use <div :class="val">.',
	          el.rawAttrsMap['class']
	        );
	      }
	    }
	    if (staticClass) {
	      el.staticClass = JSON.stringify(staticClass);
	    }
	    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	    if (classBinding) {
	      el.classBinding = classBinding;
	    }
	  }
	
	  function genData (el) {
	    var data = '';
	    if (el.staticClass) {
	      data += "staticClass:" + (el.staticClass) + ",";
	    }
	    if (el.classBinding) {
	      data += "class:" + (el.classBinding) + ",";
	    }
	    return data
	  }
	
	  var klass$1 = {
	    staticKeys: ['staticClass'],
	    transformNode: transformNode,
	    genData: genData
	  };
	
	  /*  */
	
	  function transformNode$1 (el, options) {
	    var warn = options.warn || baseWarn;
	    var staticStyle = getAndRemoveAttr(el, 'style');
	    if (staticStyle) {
	      /* istanbul ignore if */
	      {
	        var res = parseText(staticStyle, options.delimiters);
	        if (res) {
	          warn(
	            "style=\"" + staticStyle + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div style="{{ val }}">, use <div :style="val">.',
	            el.rawAttrsMap['style']
	          );
	        }
	      }
	      el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	    }
	
	    var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	    if (styleBinding) {
	      el.styleBinding = styleBinding;
	    }
	  }
	
	  function genData$1 (el) {
	    var data = '';
	    if (el.staticStyle) {
	      data += "staticStyle:" + (el.staticStyle) + ",";
	    }
	    if (el.styleBinding) {
	      data += "style:(" + (el.styleBinding) + "),";
	    }
	    return data
	  }
	
	  var style$1 = {
	    staticKeys: ['staticStyle'],
	    transformNode: transformNode$1,
	    genData: genData$1
	  };
	
	  /*  */
	
	  var decoder;
	
	  var he = {
	    decode: function decode (html) {
	      decoder = decoder || document.createElement('div');
	      decoder.innerHTML = html;
	      return decoder.textContent
	    }
	  };
	
	  /*  */
	
	  var isUnaryTag = makeMap(
	    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	    'link,meta,param,source,track,wbr'
	  );
	
	  // Elements that you can, intentionally, leave open
	  // (and which close themselves)
	  var canBeLeftOpenTag = makeMap(
	    'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	  );
	
	  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	  var isNonPhrasingTag = makeMap(
	    'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	    'title,tr,track'
	  );
	
	  /**
	   * Not type-checking this file because it's mostly vendor code.
	   */
	
	  // Regular Expressions for parsing tags and attributes
	  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
	  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
	  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
	  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
	  var startTagOpen = new RegExp(("^<" + qnameCapture));
	  var startTagClose = /^\s*(\/?)>/;
	  var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
	  var doctype = /^<!DOCTYPE [^>]+>/i;
	  // #7298: escape - to avoid being pased as HTML comment when inlined in page
	  var comment = /^<!\--/;
	  var conditionalComment = /^<!\[/;
	
	  // Special Elements (can contain anything)
	  var isPlainTextElement = makeMap('script,style,textarea', true);
	  var reCache = {};
	
	  var decodingMap = {
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&amp;': '&',
	    '&#10;': '\n',
	    '&#9;': '\t',
	    '&#39;': "'"
	  };
	  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
	  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
	
	  // #5992
	  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
	  var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };
	
	  function decodeAttr (value, shouldDecodeNewlines) {
	    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	    return value.replace(re, function (match) { return decodingMap[match]; })
	  }
	
	  function parseHTML (html, options) {
	    var stack = [];
	    var expectHTML = options.expectHTML;
	    var isUnaryTag$$1 = options.isUnaryTag || no;
	    var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
	    var index = 0;
	    var last, lastTag;
	    while (html) {
	      last = html;
	      // Make sure we're not in a plaintext content element like script/style
	      if (!lastTag || !isPlainTextElement(lastTag)) {
	        var textEnd = html.indexOf('<');
	        if (textEnd === 0) {
	          // Comment:
	          if (comment.test(html)) {
	            var commentEnd = html.indexOf('-->');
	
	            if (commentEnd >= 0) {
	              if (options.shouldKeepComment) {
	                options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
	              }
	              advance(commentEnd + 3);
	              continue
	            }
	          }
	
	          // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	          if (conditionalComment.test(html)) {
	            var conditionalEnd = html.indexOf(']>');
	
	            if (conditionalEnd >= 0) {
	              advance(conditionalEnd + 2);
	              continue
	            }
	          }
	
	          // Doctype:
	          var doctypeMatch = html.match(doctype);
	          if (doctypeMatch) {
	            advance(doctypeMatch[0].length);
	            continue
	          }
	
	          // End tag:
	          var endTagMatch = html.match(endTag);
	          if (endTagMatch) {
	            var curIndex = index;
	            advance(endTagMatch[0].length);
	            parseEndTag(endTagMatch[1], curIndex, index);
	            continue
	          }
	
	          // Start tag:
	          var startTagMatch = parseStartTag();
	          if (startTagMatch) {
	            handleStartTag(startTagMatch);
	            if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
	              advance(1);
	            }
	            continue
	          }
	        }
	
	        var text = (void 0), rest = (void 0), next = (void 0);
	        if (textEnd >= 0) {
	          rest = html.slice(textEnd);
	          while (
	            !endTag.test(rest) &&
	            !startTagOpen.test(rest) &&
	            !comment.test(rest) &&
	            !conditionalComment.test(rest)
	          ) {
	            // < in plain text, be forgiving and treat it as text
	            next = rest.indexOf('<', 1);
	            if (next < 0) { break }
	            textEnd += next;
	            rest = html.slice(textEnd);
	          }
	          text = html.substring(0, textEnd);
	        }
	
	        if (textEnd < 0) {
	          text = html;
	        }
	
	        if (text) {
	          advance(text.length);
	        }
	
	        if (options.chars && text) {
	          options.chars(text, index - text.length, index);
	        }
	      } else {
	        var endTagLength = 0;
	        var stackedTag = lastTag.toLowerCase();
	        var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	        var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
	          endTagLength = endTag.length;
	          if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
	            text = text
	              .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
	              .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	          }
	          if (shouldIgnoreFirstNewline(stackedTag, text)) {
	            text = text.slice(1);
	          }
	          if (options.chars) {
	            options.chars(text);
	          }
	          return ''
	        });
	        index += html.length - rest$1.length;
	        html = rest$1;
	        parseEndTag(stackedTag, index - endTagLength, index);
	      }
	
	      if (html === last) {
	        options.chars && options.chars(html);
	        if (!stack.length && options.warn) {
	          options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
	        }
	        break
	      }
	    }
	
	    // Clean up any remaining tags
	    parseEndTag();
	
	    function advance (n) {
	      index += n;
	      html = html.substring(n);
	    }
	
	    function parseStartTag () {
	      var start = html.match(startTagOpen);
	      if (start) {
	        var match = {
	          tagName: start[1],
	          attrs: [],
	          start: index
	        };
	        advance(start[0].length);
	        var end, attr;
	        while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
	          attr.start = index;
	          advance(attr[0].length);
	          attr.end = index;
	          match.attrs.push(attr);
	        }
	        if (end) {
	          match.unarySlash = end[1];
	          advance(end[0].length);
	          match.end = index;
	          return match
	        }
	      }
	    }
	
	    function handleStartTag (match) {
	      var tagName = match.tagName;
	      var unarySlash = match.unarySlash;
	
	      if (expectHTML) {
	        if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	          parseEndTag(lastTag);
	        }
	        if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
	          parseEndTag(tagName);
	        }
	      }
	
	      var unary = isUnaryTag$$1(tagName) || !!unarySlash;
	
	      var l = match.attrs.length;
	      var attrs = new Array(l);
	      for (var i = 0; i < l; i++) {
	        var args = match.attrs[i];
	        var value = args[3] || args[4] || args[5] || '';
	        var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
	          ? options.shouldDecodeNewlinesForHref
	          : options.shouldDecodeNewlines;
	        attrs[i] = {
	          name: args[1],
	          value: decodeAttr(value, shouldDecodeNewlines)
	        };
	        if (options.outputSourceRange) {
	          attrs[i].start = args.start + args[0].match(/^\s*/).length;
	          attrs[i].end = args.end;
	        }
	      }
	
	      if (!unary) {
	        stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
	        lastTag = tagName;
	      }
	
	      if (options.start) {
	        options.start(tagName, attrs, unary, match.start, match.end);
	      }
	    }
	
	    function parseEndTag (tagName, start, end) {
	      var pos, lowerCasedTagName;
	      if (start == null) { start = index; }
	      if (end == null) { end = index; }
	
	      // Find the closest opened tag of the same type
	      if (tagName) {
	        lowerCasedTagName = tagName.toLowerCase();
	        for (pos = stack.length - 1; pos >= 0; pos--) {
	          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	            break
	          }
	        }
	      } else {
	        // If no tag name is provided, clean shop
	        pos = 0;
	      }
	
	      if (pos >= 0) {
	        // Close all the open elements, up the stack
	        for (var i = stack.length - 1; i >= pos; i--) {
	          if (i > pos || !tagName &&
	            options.warn
	          ) {
	            options.warn(
	              ("tag <" + (stack[i].tag) + "> has no matching end tag."),
	              { start: stack[i].start, end: stack[i].end }
	            );
	          }
	          if (options.end) {
	            options.end(stack[i].tag, start, end);
	          }
	        }
	
	        // Remove the open elements from the stack
	        stack.length = pos;
	        lastTag = pos && stack[pos - 1].tag;
	      } else if (lowerCasedTagName === 'br') {
	        if (options.start) {
	          options.start(tagName, [], true, start, end);
	        }
	      } else if (lowerCasedTagName === 'p') {
	        if (options.start) {
	          options.start(tagName, [], false, start, end);
	        }
	        if (options.end) {
	          options.end(tagName, start, end);
	        }
	      }
	    }
	  }
	
	  /*  */
	
	  var onRE = /^@|^v-on:/;
	  var dirRE = /^v-|^@|^:/;
	  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
	  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
	  var stripParensRE = /^\(|\)$/g;
	  var dynamicArgRE = /^\[.*\]$/;
	
	  var argRE = /:(.*)$/;
	  var bindRE = /^:|^\.|^v-bind:/;
	  var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
	
	  var slotRE = /^v-slot(:|$)|^#/;
	
	  var lineBreakRE = /[\r\n]/;
	  var whitespaceRE$1 = /\s+/g;
	
	  var invalidAttributeRE = /[\s"'<>\/=]/;
	
	  var decodeHTMLCached = cached(he.decode);
	
	  var emptySlotScopeToken = "_empty_";
	
	  // configurable state
	  var warn$2;
	  var delimiters;
	  var transforms;
	  var preTransforms;
	  var postTransforms;
	  var platformIsPreTag;
	  var platformMustUseProp;
	  var platformGetTagNamespace;
	  var maybeComponent;
	
	  function createASTElement (
	    tag,
	    attrs,
	    parent
	  ) {
	    return {
	      type: 1,
	      tag: tag,
	      attrsList: attrs,
	      attrsMap: makeAttrsMap(attrs),
	      rawAttrsMap: {},
	      parent: parent,
	      children: []
	    }
	  }
	
	  /**
	   * Convert HTML string to AST.
	   */
	  function parse (
	    template,
	    options
	  ) {
	    warn$2 = options.warn || baseWarn;
	
	    platformIsPreTag = options.isPreTag || no;
	    platformMustUseProp = options.mustUseProp || no;
	    platformGetTagNamespace = options.getTagNamespace || no;
	    var isReservedTag = options.isReservedTag || no;
	    maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
	
	    transforms = pluckModuleFunction(options.modules, 'transformNode');
	    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	
	    delimiters = options.delimiters;
	
	    var stack = [];
	    var preserveWhitespace = options.preserveWhitespace !== false;
	    var whitespaceOption = options.whitespace;
	    var root;
	    var currentParent;
	    var inVPre = false;
	    var inPre = false;
	    var warned = false;
	
	    function warnOnce (msg, range) {
	      if (!warned) {
	        warned = true;
	        warn$2(msg, range);
	      }
	    }
	
	    function closeElement (element) {
	      trimEndingWhitespace(element);
	      if (!inVPre && !element.processed) {
	        element = processElement(element, options);
	      }
	      // tree management
	      if (!stack.length && element !== root) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          {
	            checkRootConstraints(element);
	          }
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else {
	          warnOnce(
	            "Component template should contain exactly one root element. " +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead.",
	            { start: element.start }
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else {
	          if (element.slotScope) {
	            // scoped slot
	            // keep it in the children list so that v-else(-if) conditions can
	            // find it as the prev node.
	            var name = element.slotTarget || '"default"'
	            ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	          }
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	
	      // final children cleanup
	      // filter out scoped slots
	      element.children = element.children.filter(function (c) { return !(c).slotScope; });
	      // remove trailing whitespace node again
	      trimEndingWhitespace(element);
	
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	      // apply post-transforms
	      for (var i = 0; i < postTransforms.length; i++) {
	        postTransforms[i](element, options);
	      }
	    }
	
	    function trimEndingWhitespace (el) {
	      // remove trailing whitespace node
	      if (!inPre) {
	        var lastNode;
	        while (
	          (lastNode = el.children[el.children.length - 1]) &&
	          lastNode.type === 3 &&
	          lastNode.text === ' '
	        ) {
	          el.children.pop();
	        }
	      }
	    }
	
	    function checkRootConstraints (el) {
	      if (el.tag === 'slot' || el.tag === 'template') {
	        warnOnce(
	          "Cannot use <" + (el.tag) + "> as component root element because it may " +
	          'contain multiple nodes.',
	          { start: el.start }
	        );
	      }
	      if (el.attrsMap.hasOwnProperty('v-for')) {
	        warnOnce(
	          'Cannot use v-for on stateful component root element because ' +
	          'it renders multiple elements.',
	          el.rawAttrsMap['v-for']
	        );
	      }
	    }
	
	    parseHTML(template, {
	      warn: warn$2,
	      expectHTML: options.expectHTML,
	      isUnaryTag: options.isUnaryTag,
	      canBeLeftOpenTag: options.canBeLeftOpenTag,
	      shouldDecodeNewlines: options.shouldDecodeNewlines,
	      shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
	      shouldKeepComment: options.comments,
	      outputSourceRange: options.outputSourceRange,
	      start: function start (tag, attrs, unary, start$1, end) {
	        // check namespace.
	        // inherit parent ns if there is one
	        var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
	
	        // handle IE svg bug
	        /* istanbul ignore if */
	        if (isIE && ns === 'svg') {
	          attrs = guardIESVGBug(attrs);
	        }
	
	        var element = createASTElement(tag, attrs, currentParent);
	        if (ns) {
	          element.ns = ns;
	        }
	
	        {
	          if (options.outputSourceRange) {
	            element.start = start$1;
	            element.end = end;
	            element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
	              cumulated[attr.name] = attr;
	              return cumulated
	            }, {});
	          }
	          attrs.forEach(function (attr) {
	            if (invalidAttributeRE.test(attr.name)) {
	              warn$2(
	                "Invalid dynamic argument expression: attribute names cannot contain " +
	                "spaces, quotes, <, >, / or =.",
	                {
	                  start: attr.start + attr.name.indexOf("["),
	                  end: attr.start + attr.name.length
	                }
	              );
	            }
	          });
	        }
	
	        if (isForbiddenTag(element) && !isServerRendering()) {
	          element.forbidden = true;
	          warn$2(
	            'Templates should only be responsible for mapping the state to the ' +
	            'UI. Avoid placing tags with side-effects in your templates, such as ' +
	            "<" + tag + ">" + ', as they will not be parsed.',
	            { start: element.start }
	          );
	        }
	
	        // apply pre-transforms
	        for (var i = 0; i < preTransforms.length; i++) {
	          element = preTransforms[i](element, options) || element;
	        }
	
	        if (!inVPre) {
	          processPre(element);
	          if (element.pre) {
	            inVPre = true;
	          }
	        }
	        if (platformIsPreTag(element.tag)) {
	          inPre = true;
	        }
	        if (inVPre) {
	          processRawAttrs(element);
	        } else if (!element.processed) {
	          // structural directives
	          processFor(element);
	          processIf(element);
	          processOnce(element);
	        }
	
	        if (!root) {
	          root = element;
	          {
	            checkRootConstraints(root);
	          }
	        }
	
	        if (!unary) {
	          currentParent = element;
	          stack.push(element);
	        } else {
	          closeElement(element);
	        }
	      },
	
	      end: function end (tag, start, end$1) {
	        var element = stack[stack.length - 1];
	        // pop stack
	        stack.length -= 1;
	        currentParent = stack[stack.length - 1];
	        if (options.outputSourceRange) {
	          element.end = end$1;
	        }
	        closeElement(element);
	      },
	
	      chars: function chars (text, start, end) {
	        if (!currentParent) {
	          {
	            if (text === template) {
	              warnOnce(
	                'Component template requires a root element, rather than just text.',
	                { start: start }
	              );
	            } else if ((text = text.trim())) {
	              warnOnce(
	                ("text \"" + text + "\" outside root element will be ignored."),
	                { start: start }
	              );
	            }
	          }
	          return
	        }
	        // IE textarea placeholder bug
	        /* istanbul ignore if */
	        if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text
	        ) {
	          return
	        }
	        var children = currentParent.children;
	        if (inPre || text.trim()) {
	          text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
	        } else if (!children.length) {
	          // remove the whitespace-only node right after an opening tag
	          text = '';
	        } else if (whitespaceOption) {
	          if (whitespaceOption === 'condense') {
	            // in condense mode, remove the whitespace node if it contains
	            // line break, otherwise condense to a single space
	            text = lineBreakRE.test(text) ? '' : ' ';
	          } else {
	            text = ' ';
	          }
	        } else {
	          text = preserveWhitespace ? ' ' : '';
	        }
	        if (text) {
	          if (whitespaceOption === 'condense') {
	            // condense consecutive whitespaces into single space
	            text = text.replace(whitespaceRE$1, ' ');
	          }
	          var res;
	          var child;
	          if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
	            child = {
	              type: 2,
	              expression: res.expression,
	              tokens: res.tokens,
	              text: text
	            };
	          } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	            child = {
	              type: 3,
	              text: text
	            };
	          }
	          if (child) {
	            if (options.outputSourceRange) {
	              child.start = start;
	              child.end = end;
	            }
	            children.push(child);
	          }
	        }
	      },
	      comment: function comment (text, start, end) {
	        // adding anyting as a sibling to the root node is forbidden
	        // comments should still be allowed, but ignored
	        if (currentParent) {
	          var child = {
	            type: 3,
	            text: text,
	            isComment: true
	          };
	          if (options.outputSourceRange) {
	            child.start = start;
	            child.end = end;
	          }
	          currentParent.children.push(child);
	        }
	      }
	    });
	    return root
	  }
	
	  function processPre (el) {
	    if (getAndRemoveAttr(el, 'v-pre') != null) {
	      el.pre = true;
	    }
	  }
	
	  function processRawAttrs (el) {
	    var list = el.attrsList;
	    var len = list.length;
	    if (len) {
	      var attrs = el.attrs = new Array(len);
	      for (var i = 0; i < len; i++) {
	        attrs[i] = {
	          name: list[i].name,
	          value: JSON.stringify(list[i].value)
	        };
	        if (list[i].start != null) {
	          attrs[i].start = list[i].start;
	          attrs[i].end = list[i].end;
	        }
	      }
	    } else if (!el.pre) {
	      // non root node in pre blocks with no attributes
	      el.plain = true;
	    }
	  }
	
	  function processElement (
	    element,
	    options
	  ) {
	    processKey(element);
	
	    // determine whether this is a plain element after
	    // removing structural attributes
	    element.plain = (
	      !element.key &&
	      !element.scopedSlots &&
	      !element.attrsList.length
	    );
	
	    processRef(element);
	    processSlotContent(element);
	    processSlotOutlet(element);
	    processComponent(element);
	    for (var i = 0; i < transforms.length; i++) {
	      element = transforms[i](element, options) || element;
	    }
	    processAttrs(element);
	    return element
	  }
	
	  function processKey (el) {
	    var exp = getBindingAttr(el, 'key');
	    if (exp) {
	      {
	        if (el.tag === 'template') {
	          warn$2(
	            "<template> cannot be keyed. Place the key on real elements instead.",
	            getRawBindingAttr(el, 'key')
	          );
	        }
	        if (el.for) {
	          var iterator = el.iterator2 || el.iterator1;
	          var parent = el.parent;
	          if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
	            warn$2(
	              "Do not use v-for index as key on <transition-group> children, " +
	              "this is the same as not using keys.",
	              getRawBindingAttr(el, 'key'),
	              true /* tip */
	            );
	          }
	        }
	      }
	      el.key = exp;
	    }
	  }
	
	  function processRef (el) {
	    var ref = getBindingAttr(el, 'ref');
	    if (ref) {
	      el.ref = ref;
	      el.refInFor = checkInFor(el);
	    }
	  }
	
	  function processFor (el) {
	    var exp;
	    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	      var res = parseFor(exp);
	      if (res) {
	        extend(el, res);
	      } else {
	        warn$2(
	          ("Invalid v-for expression: " + exp),
	          el.rawAttrsMap['v-for']
	        );
	      }
	    }
	  }
	
	
	
	  function parseFor (exp) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) { return }
	    var res = {};
	    res.for = inMatch[2].trim();
	    var alias = inMatch[1].trim().replace(stripParensRE, '');
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      res.alias = alias.replace(forIteratorRE, '').trim();
	      res.iterator1 = iteratorMatch[1].trim();
	      if (iteratorMatch[2]) {
	        res.iterator2 = iteratorMatch[2].trim();
	      }
	    } else {
	      res.alias = alias;
	    }
	    return res
	  }
	
	  function processIf (el) {
	    var exp = getAndRemoveAttr(el, 'v-if');
	    if (exp) {
	      el.if = exp;
	      addIfCondition(el, {
	        exp: exp,
	        block: el
	      });
	    } else {
	      if (getAndRemoveAttr(el, 'v-else') != null) {
	        el.else = true;
	      }
	      var elseif = getAndRemoveAttr(el, 'v-else-if');
	      if (elseif) {
	        el.elseif = elseif;
	      }
	    }
	  }
	
	  function processIfConditions (el, parent) {
	    var prev = findPrevElement(parent.children);
	    if (prev && prev.if) {
	      addIfCondition(prev, {
	        exp: el.elseif,
	        block: el
	      });
	    } else {
	      warn$2(
	        "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	        "used on element <" + (el.tag) + "> without corresponding v-if.",
	        el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
	      );
	    }
	  }
	
	  function findPrevElement (children) {
	    var i = children.length;
	    while (i--) {
	      if (children[i].type === 1) {
	        return children[i]
	      } else {
	        if (children[i].text !== ' ') {
	          warn$2(
	            "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	            "will be ignored.",
	            children[i]
	          );
	        }
	        children.pop();
	      }
	    }
	  }
	
	  function addIfCondition (el, condition) {
	    if (!el.ifConditions) {
	      el.ifConditions = [];
	    }
	    el.ifConditions.push(condition);
	  }
	
	  function processOnce (el) {
	    var once$$1 = getAndRemoveAttr(el, 'v-once');
	    if (once$$1 != null) {
	      el.once = true;
	    }
	  }
	
	  // handle content being passed to a component as slot,
	  // e.g. <template slot="xxx">, <div slot-scope="xxx">
	  function processSlotContent (el) {
	    var slotScope;
	    if (el.tag === 'template') {
	      slotScope = getAndRemoveAttr(el, 'scope');
	      /* istanbul ignore if */
	      if (slotScope) {
	        warn$2(
	          "the \"scope\" attribute for scoped slots have been deprecated and " +
	          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
	          "can also be used on plain elements in addition to <template> to " +
	          "denote scoped slots.",
	          el.rawAttrsMap['scope'],
	          true
	        );
	      }
	      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
	    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
	      /* istanbul ignore if */
	      if (el.attrsMap['v-for']) {
	        warn$2(
	          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
	          "(v-for takes higher priority). Use a wrapper <template> for the " +
	          "scoped slot to make it clearer.",
	          el.rawAttrsMap['slot-scope'],
	          true
	        );
	      }
	      el.slotScope = slotScope;
	    }
	
	    // slot="xxx"
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	      el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
	      // preserve slot as an attribute for native shadow DOM compat
	      // only for non-scoped slots.
	      if (el.tag !== 'template' && !el.slotScope) {
	        addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
	      }
	    }
	
	    // 2.6 v-slot syntax
	    {
	      if (el.tag === 'template') {
	        // v-slot on <template>
	        var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
	        if (slotBinding) {
	          {
	            if (el.slotTarget || el.slotScope) {
	              warn$2(
	                "Unexpected mixed usage of different slot syntaxes.",
	                el
	              );
	            }
	            if (el.parent && !maybeComponent(el.parent)) {
	              warn$2(
	                "<template v-slot> can only appear at the root level inside " +
	                "the receiving the component",
	                el
	              );
	            }
	          }
	          var ref = getSlotName(slotBinding);
	          var name = ref.name;
	          var dynamic = ref.dynamic;
	          el.slotTarget = name;
	          el.slotTargetDynamic = dynamic;
	          el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
	        }
	      } else {
	        // v-slot on component, denotes default slot
	        var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
	        if (slotBinding$1) {
	          {
	            if (!maybeComponent(el)) {
	              warn$2(
	                "v-slot can only be used on components or <template>.",
	                slotBinding$1
	              );
	            }
	            if (el.slotScope || el.slotTarget) {
	              warn$2(
	                "Unexpected mixed usage of different slot syntaxes.",
	                el
	              );
	            }
	            if (el.scopedSlots) {
	              warn$2(
	                "To avoid scope ambiguity, the default slot should also use " +
	                "<template> syntax when there are other named slots.",
	                slotBinding$1
	              );
	            }
	          }
	          // add the component's children to its default slot
	          var slots = el.scopedSlots || (el.scopedSlots = {});
	          var ref$1 = getSlotName(slotBinding$1);
	          var name$1 = ref$1.name;
	          var dynamic$1 = ref$1.dynamic;
	          var slotContainer = slots[name$1] = createASTElement('template', [], el);
	          slotContainer.slotTarget = name$1;
	          slotContainer.slotTargetDynamic = dynamic$1;
	          slotContainer.children = el.children.filter(function (c) {
	            if (!c.slotScope) {
	              c.parent = slotContainer;
	              return true
	            }
	          });
	          slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
	          // remove children as they are returned from scopedSlots now
	          el.children = [];
	          // mark el non-plain so data gets generated
	          el.plain = false;
	        }
	      }
	    }
	  }
	
	  function getSlotName (binding) {
	    var name = binding.name.replace(slotRE, '');
	    if (!name) {
	      if (binding.name[0] !== '#') {
	        name = 'default';
	      } else {
	        warn$2(
	          "v-slot shorthand syntax requires a slot name.",
	          binding
	        );
	      }
	    }
	    return dynamicArgRE.test(name)
	      // dynamic [name]
	      ? { name: name.slice(1, -1), dynamic: true }
	      // static name
	      : { name: ("\"" + name + "\""), dynamic: false }
	  }
	
	  // handle <slot/> outlets
	  function processSlotOutlet (el) {
	    if (el.tag === 'slot') {
	      el.slotName = getBindingAttr(el, 'name');
	      if (el.key) {
	        warn$2(
	          "`key` does not work on <slot> because slots are abstract outlets " +
	          "and can possibly expand into multiple elements. " +
	          "Use the key on a wrapping element instead.",
	          getRawBindingAttr(el, 'key')
	        );
	      }
	    }
	  }
	
	  function processComponent (el) {
	    var binding;
	    if ((binding = getBindingAttr(el, 'is'))) {
	      el.component = binding;
	    }
	    if (getAndRemoveAttr(el, 'inline-template') != null) {
	      el.inlineTemplate = true;
	    }
	  }
	
	  function processAttrs (el) {
	    var list = el.attrsList;
	    var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
	    for (i = 0, l = list.length; i < l; i++) {
	      name = rawName = list[i].name;
	      value = list[i].value;
	      if (dirRE.test(name)) {
	        // mark element as dynamic
	        el.hasBindings = true;
	        // modifiers
	        modifiers = parseModifiers(name.replace(dirRE, ''));
	        // support .foo shorthand syntax for the .prop modifier
	        if (modifiers) {
	          name = name.replace(modifierRE, '');
	        }
	        if (bindRE.test(name)) { // v-bind
	          name = name.replace(bindRE, '');
	          value = parseFilters(value);
	          isDynamic = dynamicArgRE.test(name);
	          if (isDynamic) {
	            name = name.slice(1, -1);
	          }
	          if (
	            value.trim().length === 0
	          ) {
	            warn$2(
	              ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
	            );
	          }
	          if (modifiers) {
	            if (modifiers.prop && !isDynamic) {
	              name = camelize(name);
	              if (name === 'innerHtml') { name = 'innerHTML'; }
	            }
	            if (modifiers.camel && !isDynamic) {
	              name = camelize(name);
	            }
	            if (modifiers.sync) {
	              syncGen = genAssignmentCode(value, "$event");
	              if (!isDynamic) {
	                addHandler(
	                  el,
	                  ("update:" + (camelize(name))),
	                  syncGen,
	                  null,
	                  false,
	                  warn$2,
	                  list[i]
	                );
	                if (hyphenate(name) !== camelize(name)) {
	                  addHandler(
	                    el,
	                    ("update:" + (hyphenate(name))),
	                    syncGen,
	                    null,
	                    false,
	                    warn$2,
	                    list[i]
	                  );
	                }
	              } else {
	                // handler w/ dynamic event name
	                addHandler(
	                  el,
	                  ("\"update:\"+(" + name + ")"),
	                  syncGen,
	                  null,
	                  false,
	                  warn$2,
	                  list[i],
	                  true // dynamic
	                );
	              }
	            }
	          }
	          if ((modifiers && modifiers.prop) || (
	            !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
	          )) {
	            addProp(el, name, value, list[i], isDynamic);
	          } else {
	            addAttr(el, name, value, list[i], isDynamic);
	          }
	        } else if (onRE.test(name)) { // v-on
	          name = name.replace(onRE, '');
	          isDynamic = dynamicArgRE.test(name);
	          if (isDynamic) {
	            name = name.slice(1, -1);
	          }
	          addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
	        } else { // normal directives
	          name = name.replace(dirRE, '');
	          // parse arg
	          var argMatch = name.match(argRE);
	          var arg = argMatch && argMatch[1];
	          isDynamic = false;
	          if (arg) {
	            name = name.slice(0, -(arg.length + 1));
	            if (dynamicArgRE.test(arg)) {
	              arg = arg.slice(1, -1);
	              isDynamic = true;
	            }
	          }
	          addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
	          if (name === 'model') {
	            checkForAliasModel(el, value);
	          }
	        }
	      } else {
	        // literal attribute
	        {
	          var res = parseText(value, delimiters);
	          if (res) {
	            warn$2(
	              name + "=\"" + value + "\": " +
	              'Interpolation inside attributes has been removed. ' +
	              'Use v-bind or the colon shorthand instead. For example, ' +
	              'instead of <div id="{{ val }}">, use <div :id="val">.',
	              list[i]
	            );
	          }
	        }
	        addAttr(el, name, JSON.stringify(value), list[i]);
	        // #6887 firefox doesn't update muted state if set via attribute
	        // even immediately after element creation
	        if (!el.component &&
	            name === 'muted' &&
	            platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, 'true', list[i]);
	        }
	      }
	    }
	  }
	
	  function checkInFor (el) {
	    var parent = el;
	    while (parent) {
	      if (parent.for !== undefined) {
	        return true
	      }
	      parent = parent.parent;
	    }
	    return false
	  }
	
	  function parseModifiers (name) {
	    var match = name.match(modifierRE);
	    if (match) {
	      var ret = {};
	      match.forEach(function (m) { ret[m.slice(1)] = true; });
	      return ret
	    }
	  }
	
	  function makeAttrsMap (attrs) {
	    var map = {};
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      if (
	        map[attrs[i].name] && !isIE && !isEdge
	      ) {
	        warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
	      }
	      map[attrs[i].name] = attrs[i].value;
	    }
	    return map
	  }
	
	  // for script (e.g. type="x/template") or style, do not decode content
	  function isTextTag (el) {
	    return el.tag === 'script' || el.tag === 'style'
	  }
	
	  function isForbiddenTag (el) {
	    return (
	      el.tag === 'style' ||
	      (el.tag === 'script' && (
	        !el.attrsMap.type ||
	        el.attrsMap.type === 'text/javascript'
	      ))
	    )
	  }
	
	  var ieNSBug = /^xmlns:NS\d+/;
	  var ieNSPrefix = /^NS\d+:/;
	
	  /* istanbul ignore next */
	  function guardIESVGBug (attrs) {
	    var res = [];
	    for (var i = 0; i < attrs.length; i++) {
	      var attr = attrs[i];
	      if (!ieNSBug.test(attr.name)) {
	        attr.name = attr.name.replace(ieNSPrefix, '');
	        res.push(attr);
	      }
	    }
	    return res
	  }
	
	  function checkForAliasModel (el, value) {
	    var _el = el;
	    while (_el) {
	      if (_el.for && _el.alias === value) {
	        warn$2(
	          "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	          "You are binding v-model directly to a v-for iteration alias. " +
	          "This will not be able to modify the v-for source array because " +
	          "writing to the alias is like modifying a function local variable. " +
	          "Consider using an array of objects and use v-model on an object property instead.",
	          el.rawAttrsMap['v-model']
	        );
	      }
	      _el = _el.parent;
	    }
	  }
	
	  /*  */
	
	  function preTransformNode (el, options) {
	    if (el.tag === 'input') {
	      var map = el.attrsMap;
	      if (!map['v-model']) {
	        return
	      }
	
	      var typeBinding;
	      if (map[':type'] || map['v-bind:type']) {
	        typeBinding = getBindingAttr(el, 'type');
	      }
	      if (!map.type && !typeBinding && map['v-bind']) {
	        typeBinding = "(" + (map['v-bind']) + ").type";
	      }
	
	      if (typeBinding) {
	        var ifCondition = getAndRemoveAttr(el, 'v-if', true);
	        var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
	        var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
	        var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
	        // 1. checkbox
	        var branch0 = cloneASTElement(el);
	        // process for on the main node
	        processFor(branch0);
	        addRawAttr(branch0, 'type', 'checkbox');
	        processElement(branch0, options);
	        branch0.processed = true; // prevent it from double-processed
	        branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
	        addIfCondition(branch0, {
	          exp: branch0.if,
	          block: branch0
	        });
	        // 2. add radio else-if condition
	        var branch1 = cloneASTElement(el);
	        getAndRemoveAttr(branch1, 'v-for', true);
	        addRawAttr(branch1, 'type', 'radio');
	        processElement(branch1, options);
	        addIfCondition(branch0, {
	          exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
	          block: branch1
	        });
	        // 3. other
	        var branch2 = cloneASTElement(el);
	        getAndRemoveAttr(branch2, 'v-for', true);
	        addRawAttr(branch2, ':type', typeBinding);
	        processElement(branch2, options);
	        addIfCondition(branch0, {
	          exp: ifCondition,
	          block: branch2
	        });
	
	        if (hasElse) {
	          branch0.else = true;
	        } else if (elseIfCondition) {
	          branch0.elseif = elseIfCondition;
	        }
	
	        return branch0
	      }
	    }
	  }
	
	  function cloneASTElement (el) {
	    return createASTElement(el.tag, el.attrsList.slice(), el.parent)
	  }
	
	  var model$1 = {
	    preTransformNode: preTransformNode
	  };
	
	  var modules$1 = [
	    klass$1,
	    style$1,
	    model$1
	  ];
	
	  /*  */
	
	  function text (el, dir) {
	    if (dir.value) {
	      addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
	    }
	  }
	
	  /*  */
	
	  function html (el, dir) {
	    if (dir.value) {
	      addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
	    }
	  }
	
	  var directives$1 = {
	    model: model,
	    text: text,
	    html: html
	  };
	
	  /*  */
	
	  var baseOptions = {
	    expectHTML: true,
	    modules: modules$1,
	    directives: directives$1,
	    isPreTag: isPreTag,
	    isUnaryTag: isUnaryTag,
	    mustUseProp: mustUseProp,
	    canBeLeftOpenTag: canBeLeftOpenTag,
	    isReservedTag: isReservedTag,
	    getTagNamespace: getTagNamespace,
	    staticKeys: genStaticKeys(modules$1)
	  };
	
	  /*  */
	
	  var isStaticKey;
	  var isPlatformReservedTag;
	
	  var genStaticKeysCached = cached(genStaticKeys$1);
	
	  /**
	   * Goal of the optimizer: walk the generated template AST tree
	   * and detect sub-trees that are purely static, i.e. parts of
	   * the DOM that never needs to change.
	   *
	   * Once we detect these sub-trees, we can:
	   *
	   * 1. Hoist them into constants, so that we no longer need to
	   *    create fresh nodes for them on each re-render;
	   * 2. Completely skip them in the patching process.
	   */
	  function optimize (root, options) {
	    if (!root) { return }
	    isStaticKey = genStaticKeysCached(options.staticKeys || '');
	    isPlatformReservedTag = options.isReservedTag || no;
	    // first pass: mark all non-static nodes.
	    markStatic$1(root);
	    // second pass: mark static roots.
	    markStaticRoots(root, false);
	  }
	
	  function genStaticKeys$1 (keys) {
	    return makeMap(
	      'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
	      (keys ? ',' + keys : '')
	    )
	  }
	
	  function markStatic$1 (node) {
	    node.static = isStatic(node);
	    if (node.type === 1) {
	      // do not make component slot content static. this avoids
	      // 1. components not able to mutate slot nodes
	      // 2. static slot content fails for hot-reloading
	      if (
	        !isPlatformReservedTag(node.tag) &&
	        node.tag !== 'slot' &&
	        node.attrsMap['inline-template'] == null
	      ) {
	        return
	      }
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        var child = node.children[i];
	        markStatic$1(child);
	        if (!child.static) {
	          node.static = false;
	        }
	      }
	      if (node.ifConditions) {
	        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
	          var block = node.ifConditions[i$1].block;
	          markStatic$1(block);
	          if (!block.static) {
	            node.static = false;
	          }
	        }
	      }
	    }
	  }
	
	  function markStaticRoots (node, isInFor) {
	    if (node.type === 1) {
	      if (node.static || node.once) {
	        node.staticInFor = isInFor;
	      }
	      // For a node to qualify as a static root, it should have children that
	      // are not just static text. Otherwise the cost of hoisting out will
	      // outweigh the benefits and it's better off to just always render it fresh.
	      if (node.static && node.children.length && !(
	        node.children.length === 1 &&
	        node.children[0].type === 3
	      )) {
	        node.staticRoot = true;
	        return
	      } else {
	        node.staticRoot = false;
	      }
	      if (node.children) {
	        for (var i = 0, l = node.children.length; i < l; i++) {
	          markStaticRoots(node.children[i], isInFor || !!node.for);
	        }
	      }
	      if (node.ifConditions) {
	        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
	          markStaticRoots(node.ifConditions[i$1].block, isInFor);
	        }
	      }
	    }
	  }
	
	  function isStatic (node) {
	    if (node.type === 2) { // expression
	      return false
	    }
	    if (node.type === 3) { // text
	      return true
	    }
	    return !!(node.pre || (
	      !node.hasBindings && // no dynamic bindings
	      !node.if && !node.for && // not v-if or v-for or v-else
	      !isBuiltInTag(node.tag) && // not a built-in
	      isPlatformReservedTag(node.tag) && // not a component
	      !isDirectChildOfTemplateFor(node) &&
	      Object.keys(node).every(isStaticKey)
	    ))
	  }
	
	  function isDirectChildOfTemplateFor (node) {
	    while (node.parent) {
	      node = node.parent;
	      if (node.tag !== 'template') {
	        return false
	      }
	      if (node.for) {
	        return true
	      }
	    }
	    return false
	  }
	
	  /*  */
	
	  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	  var fnInvokeRE = /\([^)]*?\);*$/;
	  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
	
	  // KeyboardEvent.keyCode aliases
	  var keyCodes = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40,
	    'delete': [8, 46]
	  };
	
	  // KeyboardEvent.key aliases
	  var keyNames = {
	    // #7880: IE11 and Edge use `Esc` for Escape key name.
	    esc: ['Esc', 'Escape'],
	    tab: 'Tab',
	    enter: 'Enter',
	    // #9112: IE11 uses `Spacebar` for Space key name.
	    space: [' ', 'Spacebar'],
	    // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
	    up: ['Up', 'ArrowUp'],
	    left: ['Left', 'ArrowLeft'],
	    right: ['Right', 'ArrowRight'],
	    down: ['Down', 'ArrowDown'],
	    // #9112: IE11 uses `Del` for Delete key name.
	    'delete': ['Backspace', 'Delete', 'Del']
	  };
	
	  // #4868: modifiers that prevent the execution of the listener
	  // need to explicitly return null so that we can determine whether to remove
	  // the listener for .once
	  var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };
	
	  var modifierCode = {
	    stop: '$event.stopPropagation();',
	    prevent: '$event.preventDefault();',
	    self: genGuard("$event.target !== $event.currentTarget"),
	    ctrl: genGuard("!$event.ctrlKey"),
	    shift: genGuard("!$event.shiftKey"),
	    alt: genGuard("!$event.altKey"),
	    meta: genGuard("!$event.metaKey"),
	    left: genGuard("'button' in $event && $event.button !== 0"),
	    middle: genGuard("'button' in $event && $event.button !== 1"),
	    right: genGuard("'button' in $event && $event.button !== 2")
	  };
	
	  function genHandlers (
	    events,
	    isNative
	  ) {
	    var prefix = isNative ? 'nativeOn:' : 'on:';
	    var staticHandlers = "";
	    var dynamicHandlers = "";
	    for (var name in events) {
	      var handlerCode = genHandler(events[name]);
	      if (events[name] && events[name].dynamic) {
	        dynamicHandlers += name + "," + handlerCode + ",";
	      } else {
	        staticHandlers += "\"" + name + "\":" + handlerCode + ",";
	      }
	    }
	    staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
	    if (dynamicHandlers) {
	      return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
	    } else {
	      return prefix + staticHandlers
	    }
	  }
	
	  function genHandler (handler) {
	    if (!handler) {
	      return 'function(){}'
	    }
	
	    if (Array.isArray(handler)) {
	      return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
	    }
	
	    var isMethodPath = simplePathRE.test(handler.value);
	    var isFunctionExpression = fnExpRE.test(handler.value);
	    var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));
	
	    if (!handler.modifiers) {
	      if (isMethodPath || isFunctionExpression) {
	        return handler.value
	      }
	      return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
	    } else {
	      var code = '';
	      var genModifierCode = '';
	      var keys = [];
	      for (var key in handler.modifiers) {
	        if (modifierCode[key]) {
	          genModifierCode += modifierCode[key];
	          // left/right
	          if (keyCodes[key]) {
	            keys.push(key);
	          }
	        } else if (key === 'exact') {
	          var modifiers = (handler.modifiers);
	          genModifierCode += genGuard(
	            ['ctrl', 'shift', 'alt', 'meta']
	              .filter(function (keyModifier) { return !modifiers[keyModifier]; })
	              .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
	              .join('||')
	          );
	        } else {
	          keys.push(key);
	        }
	      }
	      if (keys.length) {
	        code += genKeyFilter(keys);
	      }
	      // Make sure modifiers like prevent and stop get executed after key filtering
	      if (genModifierCode) {
	        code += genModifierCode;
	      }
	      var handlerCode = isMethodPath
	        ? ("return " + (handler.value) + "($event)")
	        : isFunctionExpression
	          ? ("return (" + (handler.value) + ")($event)")
	          : isFunctionInvocation
	            ? ("return " + (handler.value))
	            : handler.value;
	      return ("function($event){" + code + handlerCode + "}")
	    }
	  }
	
	  function genKeyFilter (keys) {
	    return (
	      // make sure the key filters only apply to KeyboardEvents
	      // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
	      // key events that do not have keyCode property...
	      "if(!$event.type.indexOf('key')&&" +
	      (keys.map(genFilterCode).join('&&')) + ")return null;"
	    )
	  }
	
	  function genFilterCode (key) {
	    var keyVal = parseInt(key, 10);
	    if (keyVal) {
	      return ("$event.keyCode!==" + keyVal)
	    }
	    var keyCode = keyCodes[key];
	    var keyName = keyNames[key];
	    return (
	      "_k($event.keyCode," +
	      (JSON.stringify(key)) + "," +
	      (JSON.stringify(keyCode)) + "," +
	      "$event.key," +
	      "" + (JSON.stringify(keyName)) +
	      ")"
	    )
	  }
	
	  /*  */
	
	  function on (el, dir) {
	    if (dir.modifiers) {
	      warn("v-on without argument does not support modifiers.");
	    }
	    el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
	  }
	
	  /*  */
	
	  function bind$1 (el, dir) {
	    el.wrapData = function (code) {
	      return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
	    };
	  }
	
	  /*  */
	
	  var baseDirectives = {
	    on: on,
	    bind: bind$1,
	    cloak: noop
	  };
	
	  /*  */
	
	
	
	
	
	  var CodegenState = function CodegenState (options) {
	    this.options = options;
	    this.warn = options.warn || baseWarn;
	    this.transforms = pluckModuleFunction(options.modules, 'transformCode');
	    this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
	    this.directives = extend(extend({}, baseDirectives), options.directives);
	    var isReservedTag = options.isReservedTag || no;
	    this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
	    this.onceId = 0;
	    this.staticRenderFns = [];
	    this.pre = false;
	  };
	
	
	
	  function generate (
	    ast,
	    options
	  ) {
	    var state = new CodegenState(options);
	    var code = ast ? genElement(ast, state) : '_c("div")';
	    return {
	      render: ("with(this){return " + code + "}"),
	      staticRenderFns: state.staticRenderFns
	    }
	  }
	
	  function genElement (el, state) {
	    if (el.parent) {
	      el.pre = el.pre || el.parent.pre;
	    }
	
	    if (el.staticRoot && !el.staticProcessed) {
	      return genStatic(el, state)
	    } else if (el.once && !el.onceProcessed) {
	      return genOnce(el, state)
	    } else if (el.for && !el.forProcessed) {
	      return genFor(el, state)
	    } else if (el.if && !el.ifProcessed) {
	      return genIf(el, state)
	    } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
	      return genChildren(el, state) || 'void 0'
	    } else if (el.tag === 'slot') {
	      return genSlot(el, state)
	    } else {
	      // component or element
	      var code;
	      if (el.component) {
	        code = genComponent(el.component, el, state);
	      } else {
	        var data;
	        if (!el.plain || (el.pre && state.maybeComponent(el))) {
	          data = genData$2(el, state);
	        }
	
	        var children = el.inlineTemplate ? null : genChildren(el, state, true);
	        code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	      }
	      // module transforms
	      for (var i = 0; i < state.transforms.length; i++) {
	        code = state.transforms[i](el, code);
	      }
	      return code
	    }
	  }
	
	  // hoist static sub-trees out
	  function genStatic (el, state) {
	    el.staticProcessed = true;
	    // Some elements (templates) need to behave differently inside of a v-pre
	    // node.  All pre nodes are static roots, so we can use this as a location to
	    // wrap a state change and reset it upon exiting the pre node.
	    var originalPreState = state.pre;
	    if (el.pre) {
	      state.pre = el.pre;
	    }
	    state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
	    state.pre = originalPreState;
	    return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	  }
	
	  // v-once
	  function genOnce (el, state) {
	    el.onceProcessed = true;
	    if (el.if && !el.ifProcessed) {
	      return genIf(el, state)
	    } else if (el.staticInFor) {
	      var key = '';
	      var parent = el.parent;
	      while (parent) {
	        if (parent.for) {
	          key = parent.key;
	          break
	        }
	        parent = parent.parent;
	      }
	      if (!key) {
	        state.warn(
	          "v-once can only be used inside v-for that is keyed. ",
	          el.rawAttrsMap['v-once']
	        );
	        return genElement(el, state)
	      }
	      return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
	    } else {
	      return genStatic(el, state)
	    }
	  }
	
	  function genIf (
	    el,
	    state,
	    altGen,
	    altEmpty
	  ) {
	    el.ifProcessed = true; // avoid recursion
	    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
	  }
	
	  function genIfConditions (
	    conditions,
	    state,
	    altGen,
	    altEmpty
	  ) {
	    if (!conditions.length) {
	      return altEmpty || '_e()'
	    }
	
	    var condition = conditions.shift();
	    if (condition.exp) {
	      return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
	    } else {
	      return ("" + (genTernaryExp(condition.block)))
	    }
	
	    // v-if with v-once should generate code like (a)?_m(0):_m(1)
	    function genTernaryExp (el) {
	      return altGen
	        ? altGen(el, state)
	        : el.once
	          ? genOnce(el, state)
	          : genElement(el, state)
	    }
	  }
	
	  function genFor (
	    el,
	    state,
	    altGen,
	    altHelper
	  ) {
	    var exp = el.for;
	    var alias = el.alias;
	    var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	    var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	
	    if (state.maybeComponent(el) &&
	      el.tag !== 'slot' &&
	      el.tag !== 'template' &&
	      !el.key
	    ) {
	      state.warn(
	        "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
	        "v-for should have explicit keys. " +
	        "See https://vuejs.org/guide/list.html#key for more info.",
	        el.rawAttrsMap['v-for'],
	        true /* tip */
	      );
	    }
	
	    el.forProcessed = true; // avoid recursion
	    return (altHelper || '_l') + "((" + exp + ")," +
	      "function(" + alias + iterator1 + iterator2 + "){" +
	        "return " + ((altGen || genElement)(el, state)) +
	      '})'
	  }
	
	  function genData$2 (el, state) {
	    var data = '{';
	
	    // directives first.
	    // directives may mutate the el's other properties before they are generated.
	    var dirs = genDirectives(el, state);
	    if (dirs) { data += dirs + ','; }
	
	    // key
	    if (el.key) {
	      data += "key:" + (el.key) + ",";
	    }
	    // ref
	    if (el.ref) {
	      data += "ref:" + (el.ref) + ",";
	    }
	    if (el.refInFor) {
	      data += "refInFor:true,";
	    }
	    // pre
	    if (el.pre) {
	      data += "pre:true,";
	    }
	    // record original tag name for components using "is" attribute
	    if (el.component) {
	      data += "tag:\"" + (el.tag) + "\",";
	    }
	    // module data generation functions
	    for (var i = 0; i < state.dataGenFns.length; i++) {
	      data += state.dataGenFns[i](el);
	    }
	    // attributes
	    if (el.attrs) {
	      data += "attrs:" + (genProps(el.attrs)) + ",";
	    }
	    // DOM props
	    if (el.props) {
	      data += "domProps:" + (genProps(el.props)) + ",";
	    }
	    // event handlers
	    if (el.events) {
	      data += (genHandlers(el.events, false)) + ",";
	    }
	    if (el.nativeEvents) {
	      data += (genHandlers(el.nativeEvents, true)) + ",";
	    }
	    // slot target
	    // only for non-scoped slots
	    if (el.slotTarget && !el.slotScope) {
	      data += "slot:" + (el.slotTarget) + ",";
	    }
	    // scoped slots
	    if (el.scopedSlots) {
	      data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
	    }
	    // component v-model
	    if (el.model) {
	      data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
	    }
	    // inline-template
	    if (el.inlineTemplate) {
	      var inlineTemplate = genInlineTemplate(el, state);
	      if (inlineTemplate) {
	        data += inlineTemplate + ",";
	      }
	    }
	    data = data.replace(/,$/, '') + '}';
	    // v-bind dynamic argument wrap
	    // v-bind with dynamic arguments must be applied using the same v-bind object
	    // merge helper so that class/style/mustUseProp attrs are handled correctly.
	    if (el.dynamicAttrs) {
	      data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
	    }
	    // v-bind data wrap
	    if (el.wrapData) {
	      data = el.wrapData(data);
	    }
	    // v-on data wrap
	    if (el.wrapListeners) {
	      data = el.wrapListeners(data);
	    }
	    return data
	  }
	
	  function genDirectives (el, state) {
	    var dirs = el.directives;
	    if (!dirs) { return }
	    var res = 'directives:[';
	    var hasRuntime = false;
	    var i, l, dir, needRuntime;
	    for (i = 0, l = dirs.length; i < l; i++) {
	      dir = dirs[i];
	      needRuntime = true;
	      var gen = state.directives[dir.name];
	      if (gen) {
	        // compile-time directive that manipulates AST.
	        // returns true if it also needs a runtime counterpart.
	        needRuntime = !!gen(el, dir, state.warn);
	      }
	      if (needRuntime) {
	        hasRuntime = true;
	        res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	      }
	    }
	    if (hasRuntime) {
	      return res.slice(0, -1) + ']'
	    }
	  }
	
	  function genInlineTemplate (el, state) {
	    var ast = el.children[0];
	    if (el.children.length !== 1 || ast.type !== 1) {
	      state.warn(
	        'Inline-template components must have exactly one child element.',
	        { start: el.start }
	      );
	    }
	    if (ast && ast.type === 1) {
	      var inlineRenderFns = generate(ast, state.options);
	      return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	    }
	  }
	
	  function genScopedSlots (
	    el,
	    slots,
	    state
	  ) {
	    // by default scoped slots are considered "stable", this allows child
	    // components with only scoped slots to skip forced updates from parent.
	    // but in some cases we have to bail-out of this optimization
	    // for example if the slot contains dynamic names, has v-if or v-for on them...
	    var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
	      var slot = slots[key];
	      return (
	        slot.slotTargetDynamic ||
	        slot.if ||
	        slot.for ||
	        containsSlotChild(slot) // is passing down slot from parent which may be dynamic
	      )
	    });
	
	    // #9534: if a component with scoped slots is inside a conditional branch,
	    // it's possible for the same component to be reused but with different
	    // compiled slot content. To avoid that, we generate a unique key based on
	    // the generated code of all the slot contents.
	    var needsKey = !!el.if;
	
	    // OR when it is inside another scoped slot or v-for (the reactivity may be
	    // disconnected due to the intermediate scope variable)
	    // #9438, #9506
	    // TODO: this can be further optimized by properly analyzing in-scope bindings
	    // and skip force updating ones that do not actually use scope variables.
	    if (!needsForceUpdate) {
	      var parent = el.parent;
	      while (parent) {
	        if (
	          (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
	          parent.for
	        ) {
	          needsForceUpdate = true;
	          break
	        }
	        if (parent.if) {
	          needsKey = true;
	        }
	        parent = parent.parent;
	      }
	    }
	
	    var generatedSlots = Object.keys(slots)
	      .map(function (key) { return genScopedSlot(slots[key], state); })
	      .join(',');
	
	    return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
	  }
	
	  function hash(str) {
	    var hash = 5381;
	    var i = str.length;
	    while(i) {
	      hash = (hash * 33) ^ str.charCodeAt(--i);
	    }
	    return hash >>> 0
	  }
	
	  function containsSlotChild (el) {
	    if (el.type === 1) {
	      if (el.tag === 'slot') {
	        return true
	      }
	      return el.children.some(containsSlotChild)
	    }
	    return false
	  }
	
	  function genScopedSlot (
	    el,
	    state
	  ) {
	    var isLegacySyntax = el.attrsMap['slot-scope'];
	    if (el.if && !el.ifProcessed && !isLegacySyntax) {
	      return genIf(el, state, genScopedSlot, "null")
	    }
	    if (el.for && !el.forProcessed) {
	      return genFor(el, state, genScopedSlot)
	    }
	    var slotScope = el.slotScope === emptySlotScopeToken
	      ? ""
	      : String(el.slotScope);
	    var fn = "function(" + slotScope + "){" +
	      "return " + (el.tag === 'template'
	        ? el.if && isLegacySyntax
	          ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
	          : genChildren(el, state) || 'undefined'
	        : genElement(el, state)) + "}";
	    // reverse proxy v-slot without scope on this.$slots
	    var reverseProxy = slotScope ? "" : ",proxy:true";
	    return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
	  }
	
	  function genChildren (
	    el,
	    state,
	    checkSkip,
	    altGenElement,
	    altGenNode
	  ) {
	    var children = el.children;
	    if (children.length) {
	      var el$1 = children[0];
	      // optimize single v-for
	      if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot'
	      ) {
	        var normalizationType = checkSkip
	          ? state.maybeComponent(el$1) ? ",1" : ",0"
	          : "";
	        return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
	      }
	      var normalizationType$1 = checkSkip
	        ? getNormalizationType(children, state.maybeComponent)
	        : 0;
	      var gen = altGenNode || genNode;
	      return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
	    }
	  }
	
	  // determine the normalization needed for the children array.
	  // 0: no normalization needed
	  // 1: simple normalization needed (possible 1-level deep nested array)
	  // 2: full normalization needed
	  function getNormalizationType (
	    children,
	    maybeComponent
	  ) {
	    var res = 0;
	    for (var i = 0; i < children.length; i++) {
	      var el = children[i];
	      if (el.type !== 1) {
	        continue
	      }
	      if (needsNormalization(el) ||
	          (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	        res = 2;
	        break
	      }
	      if (maybeComponent(el) ||
	          (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	        res = 1;
	      }
	    }
	    return res
	  }
	
	  function needsNormalization (el) {
	    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	  }
	
	  function genNode (node, state) {
	    if (node.type === 1) {
	      return genElement(node, state)
	    } else if (node.type === 3 && node.isComment) {
	      return genComment(node)
	    } else {
	      return genText(node)
	    }
	  }
	
	  function genText (text) {
	    return ("_v(" + (text.type === 2
	      ? text.expression // no need for () because already wrapped in _s()
	      : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	  }
	
	  function genComment (comment) {
	    return ("_e(" + (JSON.stringify(comment.text)) + ")")
	  }
	
	  function genSlot (el, state) {
	    var slotName = el.slotName || '"default"';
	    var children = genChildren(el, state);
	    var res = "_t(" + slotName + (children ? ("," + children) : '');
	    var attrs = el.attrs || el.dynamicAttrs
	      ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
	          // slot props are camelized
	          name: camelize(attr.name),
	          value: attr.value,
	          dynamic: attr.dynamic
	        }); }))
	      : null;
	    var bind$$1 = el.attrsMap['v-bind'];
	    if ((attrs || bind$$1) && !children) {
	      res += ",null";
	    }
	    if (attrs) {
	      res += "," + attrs;
	    }
	    if (bind$$1) {
	      res += (attrs ? '' : ',null') + "," + bind$$1;
	    }
	    return res + ')'
	  }
	
	  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
	  function genComponent (
	    componentName,
	    el,
	    state
	  ) {
	    var children = el.inlineTemplate ? null : genChildren(el, state, true);
	    return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
	  }
	
	  function genProps (props) {
	    var staticProps = "";
	    var dynamicProps = "";
	    for (var i = 0; i < props.length; i++) {
	      var prop = props[i];
	      var value = transformSpecialNewlines(prop.value);
	      if (prop.dynamic) {
	        dynamicProps += (prop.name) + "," + value + ",";
	      } else {
	        staticProps += "\"" + (prop.name) + "\":" + value + ",";
	      }
	    }
	    staticProps = "{" + (staticProps.slice(0, -1)) + "}";
	    if (dynamicProps) {
	      return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
	    } else {
	      return staticProps
	    }
	  }
	
	  // #3895, #4268
	  function transformSpecialNewlines (text) {
	    return text
	      .replace(/\u2028/g, '\\u2028')
	      .replace(/\u2029/g, '\\u2029')
	  }
	
	  /*  */
	
	
	
	  // these keywords should not appear inside expressions, but operators like
	  // typeof, instanceof and in are allowed
	  var prohibitedKeywordRE = new RegExp('\\b' + (
	    'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	    'super,throw,while,yield,delete,export,import,return,switch,default,' +
	    'extends,finally,continue,debugger,function,arguments'
	  ).split(',').join('\\b|\\b') + '\\b');
	
	  // these unary operators should not be used as property/method names
	  var unaryOperatorsRE = new RegExp('\\b' + (
	    'delete,typeof,void'
	  ).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');
	
	  // strip strings in expressions
	  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
	
	  // detect problematic expressions in a template
	  function detectErrors (ast, warn) {
	    if (ast) {
	      checkNode(ast, warn);
	    }
	  }
	
	  function checkNode (node, warn) {
	    if (node.type === 1) {
	      for (var name in node.attrsMap) {
	        if (dirRE.test(name)) {
	          var value = node.attrsMap[name];
	          if (value) {
	            var range = node.rawAttrsMap[name];
	            if (name === 'v-for') {
	              checkFor(node, ("v-for=\"" + value + "\""), warn, range);
	            } else if (onRE.test(name)) {
	              checkEvent(value, (name + "=\"" + value + "\""), warn, range);
	            } else {
	              checkExpression(value, (name + "=\"" + value + "\""), warn, range);
	            }
	          }
	        }
	      }
	      if (node.children) {
	        for (var i = 0; i < node.children.length; i++) {
	          checkNode(node.children[i], warn);
	        }
	      }
	    } else if (node.type === 2) {
	      checkExpression(node.expression, node.text, warn, node);
	    }
	  }
	
	  function checkEvent (exp, text, warn, range) {
	    var stipped = exp.replace(stripStringRE, '');
	    var keywordMatch = stipped.match(unaryOperatorsRE);
	    if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
	      warn(
	        "avoid using JavaScript unary operator as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
	        range
	      );
	    }
	    checkExpression(exp, text, warn, range);
	  }
	
	  function checkFor (node, text, warn, range) {
	    checkExpression(node.for || '', text, warn, range);
	    checkIdentifier(node.alias, 'v-for alias', text, warn, range);
	    checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
	    checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
	  }
	
	  function checkIdentifier (
	    ident,
	    type,
	    text,
	    warn,
	    range
	  ) {
	    if (typeof ident === 'string') {
	      try {
	        new Function(("var " + ident + "=_"));
	      } catch (e) {
	        warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
	      }
	    }
	  }
	
	  function checkExpression (exp, text, warn, range) {
	    try {
	      new Function(("return " + exp));
	    } catch (e) {
	      var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	      if (keywordMatch) {
	        warn(
	          "avoid using JavaScript keyword as property name: " +
	          "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
	          range
	        );
	      } else {
	        warn(
	          "invalid expression: " + (e.message) + " in\n\n" +
	          "    " + exp + "\n\n" +
	          "  Raw expression: " + (text.trim()) + "\n",
	          range
	        );
	      }
	    }
	  }
	
	  /*  */
	
	  var range = 2;
	
	  function generateCodeFrame (
	    source,
	    start,
	    end
	  ) {
	    if ( start === void 0 ) start = 0;
	    if ( end === void 0 ) end = source.length;
	
	    var lines = source.split(/\r?\n/);
	    var count = 0;
	    var res = [];
	    for (var i = 0; i < lines.length; i++) {
	      count += lines[i].length + 1;
	      if (count >= start) {
	        for (var j = i - range; j <= i + range || end > count; j++) {
	          if (j < 0 || j >= lines.length) { continue }
	          res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
	          var lineLength = lines[j].length;
	          if (j === i) {
	            // push underline
	            var pad = start - (count - lineLength) + 1;
	            var length = end > count ? lineLength - pad : end - start;
	            res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
	          } else if (j > i) {
	            if (end > count) {
	              var length$1 = Math.min(end - count, lineLength);
	              res.push("   |  " + repeat$1("^", length$1));
	            }
	            count += lineLength + 1;
	          }
	        }
	        break
	      }
	    }
	    return res.join('\n')
	  }
	
	  function repeat$1 (str, n) {
	    var result = '';
	    if (n > 0) {
	      while (true) { // eslint-disable-line
	        if (n & 1) { result += str; }
	        n >>>= 1;
	        if (n <= 0) { break }
	        str += str;
	      }
	    }
	    return result
	  }
	
	  /*  */
	
	
	
	  function createFunction (code, errors) {
	    try {
	      return new Function(code)
	    } catch (err) {
	      errors.push({ err: err, code: code });
	      return noop
	    }
	  }
	
	  function createCompileToFunctionFn (compile) {
	    var cache = Object.create(null);
	
	    return function compileToFunctions (
	      template,
	      options,
	      vm
	    ) {
	      options = extend({}, options);
	      var warn$$1 = options.warn || warn;
	      delete options.warn;
	
	      /* istanbul ignore if */
	      {
	        // detect possible CSP restriction
	        try {
	          new Function('return 1');
	        } catch (e) {
	          if (e.toString().match(/unsafe-eval|CSP/)) {
	            warn$$1(
	              'It seems you are using the standalone build of Vue.js in an ' +
	              'environment with Content Security Policy that prohibits unsafe-eval. ' +
	              'The template compiler cannot work in this environment. Consider ' +
	              'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	              'templates into render functions.'
	            );
	          }
	        }
	      }
	
	      // check cache
	      var key = options.delimiters
	        ? String(options.delimiters) + template
	        : template;
	      if (cache[key]) {
	        return cache[key]
	      }
	
	      // compile
	      var compiled = compile(template, options);
	
	      // check compilation errors/tips
	      {
	        if (compiled.errors && compiled.errors.length) {
	          if (options.outputSourceRange) {
	            compiled.errors.forEach(function (e) {
	              warn$$1(
	                "Error compiling template:\n\n" + (e.msg) + "\n\n" +
	                generateCodeFrame(template, e.start, e.end),
	                vm
	              );
	            });
	          } else {
	            warn$$1(
	              "Error compiling template:\n\n" + template + "\n\n" +
	              compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
	              vm
	            );
	          }
	        }
	        if (compiled.tips && compiled.tips.length) {
	          if (options.outputSourceRange) {
	            compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
	          } else {
	            compiled.tips.forEach(function (msg) { return tip(msg, vm); });
	          }
	        }
	      }
	
	      // turn code into functions
	      var res = {};
	      var fnGenErrors = [];
	      res.render = createFunction(compiled.render, fnGenErrors);
	      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
	        return createFunction(code, fnGenErrors)
	      });
	
	      // check function generation errors.
	      // this should only happen if there is a bug in the compiler itself.
	      // mostly for codegen development use
	      /* istanbul ignore if */
	      {
	        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	          warn$$1(
	            "Failed to generate render function:\n\n" +
	            fnGenErrors.map(function (ref) {
	              var err = ref.err;
	              var code = ref.code;
	
	              return ((err.toString()) + " in\n\n" + code + "\n");
	          }).join('\n'),
	            vm
	          );
	        }
	      }
	
	      return (cache[key] = res)
	    }
	  }
	
	  /*  */
	
	  function createCompilerCreator (baseCompile) {
	    return function createCompiler (baseOptions) {
	      function compile (
	        template,
	        options
	      ) {
	        var finalOptions = Object.create(baseOptions);
	        var errors = [];
	        var tips = [];
	
	        var warn = function (msg, range, tip) {
	          (tip ? tips : errors).push(msg);
	        };
	
	        if (options) {
	          if (options.outputSourceRange) {
	            // $flow-disable-line
	            var leadingSpaceLength = template.match(/^\s*/)[0].length;
	
	            warn = function (msg, range, tip) {
	              var data = { msg: msg };
	              if (range) {
	                if (range.start != null) {
	                  data.start = range.start + leadingSpaceLength;
	                }
	                if (range.end != null) {
	                  data.end = range.end + leadingSpaceLength;
	                }
	              }
	              (tip ? tips : errors).push(data);
	            };
	          }
	          // merge custom modules
	          if (options.modules) {
	            finalOptions.modules =
	              (baseOptions.modules || []).concat(options.modules);
	          }
	          // merge custom directives
	          if (options.directives) {
	            finalOptions.directives = extend(
	              Object.create(baseOptions.directives || null),
	              options.directives
	            );
	          }
	          // copy other options
	          for (var key in options) {
	            if (key !== 'modules' && key !== 'directives') {
	              finalOptions[key] = options[key];
	            }
	          }
	        }
	
	        finalOptions.warn = warn;
	
	        var compiled = baseCompile(template.trim(), finalOptions);
	        {
	          detectErrors(compiled.ast, warn);
	        }
	        compiled.errors = errors;
	        compiled.tips = tips;
	        return compiled
	      }
	
	      return {
	        compile: compile,
	        compileToFunctions: createCompileToFunctionFn(compile)
	      }
	    }
	  }
	
	  /*  */
	
	  // `createCompilerCreator` allows creating compilers that use alternative
	  // parser/optimizer/codegen, e.g the SSR optimizing compiler.
	  // Here we just export a default compiler using the default parts.
	  var createCompiler = createCompilerCreator(function baseCompile (
	    template,
	    options
	  ) {
	    var ast = parse(template.trim(), options);
	    if (options.optimize !== false) {
	      optimize(ast, options);
	    }
	    var code = generate(ast, options);
	    return {
	      ast: ast,
	      render: code.render,
	      staticRenderFns: code.staticRenderFns
	    }
	  });
	
	  /*  */
	
	  var ref$1 = createCompiler(baseOptions);
	  var compile = ref$1.compile;
	  var compileToFunctions = ref$1.compileToFunctions;
	
	  /*  */
	
	  // check whether current browser encodes a char inside attribute values
	  var div;
	  function getShouldDecode (href) {
	    div = div || document.createElement('div');
	    div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
	    return div.innerHTML.indexOf('&#10;') > 0
	  }
	
	  // #3663: IE encodes newlines inside attribute values while other browsers don't
	  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
	  // #6828: chrome encodes content in a[href]
	  var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
	
	  /*  */
	
	  var idToTemplate = cached(function (id) {
	    var el = query(id);
	    return el && el.innerHTML
	  });
	
	  var mount = Vue.prototype.$mount;
	  Vue.prototype.$mount = function (
	    el,
	    hydrating
	  ) {
	    el = el && query(el);
	
	    /* istanbul ignore if */
	    if (el === document.body || el === document.documentElement) {
	      warn(
	        "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	      );
	      return this
	    }
	
	    var options = this.$options;
	    // resolve template/el and convert to render function
	    if (!options.render) {
	      var template = options.template;
	      if (template) {
	        if (typeof template === 'string') {
	          if (template.charAt(0) === '#') {
	            template = idToTemplate(template);
	            /* istanbul ignore if */
	            if (!template) {
	              warn(
	                ("Template element not found or is empty: " + (options.template)),
	                this
	              );
	            }
	          }
	        } else if (template.nodeType) {
	          template = template.innerHTML;
	        } else {
	          {
	            warn('invalid template option:' + template, this);
	          }
	          return this
	        }
	      } else if (el) {
	        template = getOuterHTML(el);
	      }
	      if (template) {
	        /* istanbul ignore if */
	        if (config.performance && mark) {
	          mark('compile');
	        }
	
	        var ref = compileToFunctions(template, {
	          outputSourceRange: "development" !== 'production',
	          shouldDecodeNewlines: shouldDecodeNewlines,
	          shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
	          delimiters: options.delimiters,
	          comments: options.comments
	        }, this);
	        var render = ref.render;
	        var staticRenderFns = ref.staticRenderFns;
	        options.render = render;
	        options.staticRenderFns = staticRenderFns;
	
	        /* istanbul ignore if */
	        if (config.performance && mark) {
	          mark('compile end');
	          measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
	        }
	      }
	    }
	    return mount.call(this, el, hydrating)
	  };
	
	  /**
	   * Get outerHTML of elements, taking care
	   * of SVG elements in IE as well.
	   */
	  function getOuterHTML (el) {
	    if (el.outerHTML) {
	      return el.outerHTML
	    } else {
	      var container = document.createElement('div');
	      container.appendChild(el.cloneNode(true));
	      return container.innerHTML
	    }
	  }
	
	  Vue.compile = compileToFunctions;
	
	  return Vue;
	
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(84).setImmediate))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
	            (typeof self !== "undefined" && self) ||
	            window;
	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(scope, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(85);
	// On some exotic environments, it's not clear which object `setimmediate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
	                       (typeof global !== "undefined" && global.setImmediate) ||
	                       (this && this.setImmediate);
	exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
	                         (typeof global !== "undefined" && global.clearImmediate) ||
	                         (this && this.clearImmediate);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(28)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(87)
	
	var Component = __webpack_require__(92)(
	  /* script */
	  __webpack_require__(93),
	  /* template */
	  __webpack_require__(95),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "E:\\study\\extension-hot-reload-master\\src\\biz\\count\\contentscript.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] contentscript.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (true) {(function () {
	  var hotAPI = __webpack_require__(96)
	  hotAPI.install(__webpack_require__(83), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0704f538", Component.options)
	  } else {
	    hotAPI.reload("data-v-0704f538", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(88);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(90)("9fb91492", content, false);
	// Hot Module Replacement
	if(true) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept(88, function() {
	     var newContent = __webpack_require__(88);
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.demo-count {\n  position: absolute;\n  background: #fff;\n  width: 200px;\n  height: 200px;\n  left: 50%;\n  top: 50%;\n  margin: -100px 0 0 -100px;\n  border: 1px solid red;\n  box-shadow: 0 2px 5px #999;\n  font-size: 24px;\n  text-align: center;\n}\n", "", {"version":3,"sources":["E:/study/extension-hot-reload-master/src/biz/count/contentscript.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;EACnB,iBAAiB;EACjB,aAAa;EACb,cAAc;EACd,UAAU;EACV,SAAS;EACT,0BAA0B;EAC1B,sBAAsB;EACtB,2BAA2B;EAC3B,gBAAgB;EAChB,mBAAmB;CACpB","file":"contentscript.vue","sourcesContent":[".demo-count {\n  position: absolute;\n  background: #fff;\n  width: 200px;\n  height: 200px;\n  left: 50%;\n  top: 50%;\n  margin: -100px 0 0 -100px;\n  border: 1px solid red;\n  box-shadow: 0 2px 5px #999;\n  font-size: 24px;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),
/* 89 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/
	
	var hasDocument = typeof document !== 'undefined'
	
	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}
	
	var listToStyles = __webpack_require__(91)
	
	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}
	
	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/
	
	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}
	
	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}
	
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())
	
	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction
	
	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)
	
	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}
	
	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}
	
	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}
	
	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	
	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }
	
	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }
	
	  update(obj)
	
	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}
	
	var replaceText = (function () {
	  var textStore = []
	
	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()
	
	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}
	
	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap
	
	  if (media) {
	    styleElement.setAttribute('media', media)
	  }
	
	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),
/* 91 */
/***/ (function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ }),
/* 92 */
/***/ (function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}
	
	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }
	
	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports
	
	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }
	
	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }
	
	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }
	
	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _msg = __webpack_require__(3);
	
	var _message = __webpack_require__(94);
	
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  data: function data() {
	    return {
	      isShow: false,
	      count: 0
	    };
	  },
	
	  methods: {
	    add: function add() {
	      var _this = this;
	
	      (0, _message.sendMessage)(_msg.MSG_COUNT_INCREMENT, function (responseMsg) {
	        _this.count = responseMsg.count;
	        if (_this.count >= 10) {
	          _this.isShow = false;
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;
	
	    (0, _message.sendMessage)(_msg.MSG_COUNT_SHOW, function (responseMsg) {
	      _this2.isShow = responseMsg.isShow;
	    });
	  }
	};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sendMessage = sendMessage;
	
	var _log = __webpack_require__(5);
	
	function sendMessage(event, data, response) {
	  var d = data;
	  var r = response;
	  if (typeof data === 'function' && !r) {
	    d = {};
	    r = data;
	  }
	
	  (0, _log.info)('[sendMessage] ', event);
	  chrome.runtime.sendMessage('', event, d, function (responseMsg) {
	    (0, _log.info)('[sendMessageBack]', event, responseMsg);
	    r(responseMsg);
	  });
	}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isShow),
	      expression: "isShow"
	    }],
	    staticClass: "demo-count"
	  }, [_c('div', {
	    domProps: {
	      "textContent": _vm._s(_vm.count)
	    }
	  }), _vm._v(" "), _c('button', {
	    on: {
	      "click": _vm.add
	    }
	  }, [_vm._v("addfssffff")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (true) {
	  module.hot.accept()
	  if (module.hot.data) {
	     __webpack_require__(96).rerender("data-v-0704f538", module.exports)
	  }
	}

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	var Vue // late bind
	var version
	var map = Object.create(null)
	if (typeof window !== 'undefined') {
	  window.__VUE_HOT_MAP__ = map
	}
	var installed = false
	var isBrowserify = false
	var initHookName = 'beforeCreate'
	
	exports.install = function (vue, browserify) {
	  if (installed) { return }
	  installed = true
	
	  Vue = vue.__esModule ? vue.default : vue
	  version = Vue.version.split('.').map(Number)
	  isBrowserify = browserify
	
	  // compat with < 2.0.0-alpha.7
	  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
	    initHookName = 'init'
	  }
	
	  exports.compatible = version[0] >= 2
	  if (!exports.compatible) {
	    console.warn(
	      '[HMR] You are using a version of vue-hot-reload-api that is ' +
	        'only compatible with Vue.js core ^2.0.0.'
	    )
	    return
	  }
	}
	
	/**
	 * Create a record for a hot module, which keeps track of its constructor
	 * and instances
	 *
	 * @param {String} id
	 * @param {Object} options
	 */
	
	exports.createRecord = function (id, options) {
	  if(map[id]) { return }
	
	  var Ctor = null
	  if (typeof options === 'function') {
	    Ctor = options
	    options = Ctor.options
	  }
	  makeOptionsHot(id, options)
	  map[id] = {
	    Ctor: Ctor,
	    options: options,
	    instances: []
	  }
	}
	
	/**
	 * Check if module is recorded
	 *
	 * @param {String} id
	 */
	
	exports.isRecorded = function (id) {
	  return typeof map[id] !== 'undefined'
	}
	
	/**
	 * Make a Component options object hot.
	 *
	 * @param {String} id
	 * @param {Object} options
	 */
	
	function makeOptionsHot(id, options) {
	  if (options.functional) {
	    var render = options.render
	    options.render = function (h, ctx) {
	      var instances = map[id].instances
	      if (ctx && instances.indexOf(ctx.parent) < 0) {
	        instances.push(ctx.parent)
	      }
	      return render(h, ctx)
	    }
	  } else {
	    injectHook(options, initHookName, function() {
	      var record = map[id]
	      if (!record.Ctor) {
	        record.Ctor = this.constructor
	      }
	      record.instances.push(this)
	    })
	    injectHook(options, 'beforeDestroy', function() {
	      var instances = map[id].instances
	      instances.splice(instances.indexOf(this), 1)
	    })
	  }
	}
	
	/**
	 * Inject a hook to a hot reloadable component so that
	 * we can keep track of it.
	 *
	 * @param {Object} options
	 * @param {String} name
	 * @param {Function} hook
	 */
	
	function injectHook(options, name, hook) {
	  var existing = options[name]
	  options[name] = existing
	    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
	    : [hook]
	}
	
	function tryWrap(fn) {
	  return function (id, arg) {
	    try {
	      fn(id, arg)
	    } catch (e) {
	      console.error(e)
	      console.warn(
	        'Something went wrong during Vue component hot-reload. Full reload required.'
	      )
	    }
	  }
	}
	
	function updateOptions (oldOptions, newOptions) {
	  for (var key in oldOptions) {
	    if (!(key in newOptions)) {
	      delete oldOptions[key]
	    }
	  }
	  for (var key$1 in newOptions) {
	    oldOptions[key$1] = newOptions[key$1]
	  }
	}
	
	exports.rerender = tryWrap(function (id, options) {
	  var record = map[id]
	  if (!options) {
	    record.instances.slice().forEach(function (instance) {
	      instance.$forceUpdate()
	    })
	    return
	  }
	  if (typeof options === 'function') {
	    options = options.options
	  }
	  if (record.Ctor) {
	    record.Ctor.options.render = options.render
	    record.Ctor.options.staticRenderFns = options.staticRenderFns
	    record.instances.slice().forEach(function (instance) {
	      instance.$options.render = options.render
	      instance.$options.staticRenderFns = options.staticRenderFns
	      // reset static trees
	      // pre 2.5, all static trees are cached together on the instance
	      if (instance._staticTrees) {
	        instance._staticTrees = []
	      }
	      // 2.5.0
	      if (Array.isArray(record.Ctor.options.cached)) {
	        record.Ctor.options.cached = []
	      }
	      // 2.5.3
	      if (Array.isArray(instance.$options.cached)) {
	        instance.$options.cached = []
	      }
	
	      // post 2.5.4: v-once trees are cached on instance._staticTrees.
	      // Pure static trees are cached on the staticRenderFns array
	      // (both already reset above)
	
	      // 2.6: temporarily mark rendered scoped slots as unstable so that
	      // child components can be forced to update
	      var restore = patchScopedSlots(instance)
	      instance.$forceUpdate()
	      instance.$nextTick(restore)
	    })
	  } else {
	    // functional or no instance created yet
	    record.options.render = options.render
	    record.options.staticRenderFns = options.staticRenderFns
	
	    // handle functional component re-render
	    if (record.options.functional) {
	      // rerender with full options
	      if (Object.keys(options).length > 2) {
	        updateOptions(record.options, options)
	      } else {
	        // template-only rerender.
	        // need to inject the style injection code for CSS modules
	        // to work properly.
	        var injectStyles = record.options._injectStyles
	        if (injectStyles) {
	          var render = options.render
	          record.options.render = function (h, ctx) {
	            injectStyles.call(ctx)
	            return render(h, ctx)
	          }
	        }
	      }
	      record.options._Ctor = null
	      // 2.5.3
	      if (Array.isArray(record.options.cached)) {
	        record.options.cached = []
	      }
	      record.instances.slice().forEach(function (instance) {
	        instance.$forceUpdate()
	      })
	    }
	  }
	})
	
	exports.reload = tryWrap(function (id, options) {
	  var record = map[id]
	  if (options) {
	    if (typeof options === 'function') {
	      options = options.options
	    }
	    makeOptionsHot(id, options)
	    if (record.Ctor) {
	      if (version[1] < 2) {
	        // preserve pre 2.2 behavior for global mixin handling
	        record.Ctor.extendOptions = options
	      }
	      var newCtor = record.Ctor.super.extend(options)
	      record.Ctor.options = newCtor.options
	      record.Ctor.cid = newCtor.cid
	      record.Ctor.prototype = newCtor.prototype
	      if (newCtor.release) {
	        // temporary global mixin strategy used in < 2.0.0-alpha.6
	        newCtor.release()
	      }
	    } else {
	      updateOptions(record.options, options)
	    }
	  }
	  record.instances.slice().forEach(function (instance) {
	    if (instance.$vnode && instance.$vnode.context) {
	      instance.$vnode.context.$forceUpdate()
	    } else {
	      console.warn(
	        'Root or manually mounted instance modified. Full reload required.'
	      )
	    }
	  })
	})
	
	// 2.6 optimizes template-compiled scoped slots and skips updates if child
	// only uses scoped slots. We need to patch the scoped slots resolving helper
	// to temporarily mark all scoped slots as unstable in order to force child
	// updates.
	function patchScopedSlots (instance) {
	  if (!instance._u) { return }
	  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
	  var original = instance._u
	  instance._u = function (slots) {
	    try {
	      // 2.6.4 ~ 2.6.6
	      return original(slots, true)
	    } catch (e) {
	      // 2.5 / >= 2.6.7
	      return original(slots, null, true)
	    }
	  }
	  return function () {
	    instance._u = original
	  }
	}


/***/ })
/******/ ]);
//# sourceMappingURL=sourcemap/count.js.map