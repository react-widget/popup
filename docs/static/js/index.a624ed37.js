/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./demos/Demo2 */ "./examples/demos/Demo2.js"));

var _Demo2 = _interopRequireDefault(__webpack_require__(/*! ./demos/Demo3 */ "./examples/demos/Demo3.js"));

var _Demo3 = _interopRequireDefault(__webpack_require__(/*! ./demos/Demo4 */ "./examples/demos/Demo4.js"));

var _default = [{
  label: '基本功能',
  component: _demo.default
}, {
  label: '遮罩层',
  component: _Demo.default
}, {
  label: '使用CSS动画',
  component: _Demo2.default
}, {
  label: 'fixed',
  component: _Demo3.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/Demo2.js":
/*!*********************************!*\
  !*** ./examples/demos/Demo2.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _lib = _interopRequireDefault(__webpack_require__(/*! ../../lib */ "./lib/index.js"));

var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

function Test() {
  console.log(1);
  return null;
}

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: true,
      mask: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick", function (e) {
      var visible = _this.state.visible;

      _this.setState({
        visible: !visible
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick2", function (e) {
      var mask = _this.state.mask;

      _this.setState({
        mask: !mask
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton", function (dom) {
      _this._defer.resolve({
        of: dom,
        my: 'left top',
        at: 'left bottom'
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton2", function (dom) {
      _this._defer2.resolve({
        of: dom,
        my: 'left center',
        at: 'right center'
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          visible = _this$state.visible,
          mask = _this$state.mask;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", null, _react.default.createElement("button", {
        onClick: this.toggleClick
      }, visible ? '关闭' : '显示'), _react.default.createElement("button", {
        onClick: this.toggleClick2
      }, mask ? '关闭遮罩层' : '显示遮罩层')), _react.default.createElement("div", {
        style: {
          height: "calc(100% - 30px)",
          position: "relative",
          border: "1px solid #000"
        }
      }, _react.default.createElement(_lib.default, {
        visible: visible,
        mask: mask,
        resetPositionOnUpdate: true,
        style: {
          background: '#ff5454',
          color: '#FFF',
          padding: 10
        },
        timeout: 500,
        onEnter: function onEnter(node) {
          (0, _jquery.default)(node).hide();
          (0, _jquery.default)(node).stop().fadeIn(500);
        },
        onExit: function onExit(node) {
          (0, _jquery.default)(node).stop().fadeOut(500);
        },
        onExited: function onExited(node) {
          console.log('onExited');
        },
        onMaskEnter: function onMaskEnter(node) {
          (0, _jquery.default)(node).hide();
          (0, _jquery.default)(node).stop().fadeIn(500);
        },
        onMaskExit: function onMaskExit(node) {
          (0, _jquery.default)(node).stop().fadeOut(500);
        },
        placement: {
          of: function of(el) {
            return el.parentElement;
          }
        }
      }, _react.default.createElement("div", null, "center2..."))));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/demos/Demo3.js":
/*!*********************************!*\
  !*** ./examples/demos/Demo3.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _lib = _interopRequireDefault(__webpack_require__(/*! ../../lib */ "./lib/index.js"));

var i = 1;

function Test() {
  console.log('1');
  return _react.default.createElement("a", null, "Test a", i++);
}

var animateClassNames = {
  "appear": "animated",
  "appearActive": "fadeBottomIn",
  "enter": "animated",
  "enterActive": "fadeBottomIn",
  "enterDone": "",
  "exit": "animated",
  "exitActive": "fadeBottomOut",
  "exitDone": ""
};
var maskAnimateClassNames = {
  "appear": "animated",
  "appearActive": "fadeIn",
  "enter": "animated",
  "enterActive": "fadeIn",
  "exit": "animated",
  "exitActive": "fadeOut"
};

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: true,
      mask: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick", function (e) {
      var visible = _this.state.visible;

      _this.setState({
        visible: !visible
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick2", function (e) {
      var mask = _this.state.mask;

      _this.setState({
        mask: !mask
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton", function (dom) {
      _this._defer.resolve({
        of: dom,
        my: 'left top',
        at: 'left bottom'
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton2", function (dom) {
      _this._defer2.resolve({
        of: dom,
        my: 'left center',
        at: 'right center'
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setInterval(this.forceUpdate.bind(this), 1000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          visible = _this$state.visible,
          mask = _this$state.mask;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", null, _react.default.createElement("button", {
        onClick: this.toggleClick
      }, visible ? '关闭' : '显示'), _react.default.createElement("button", {
        onClick: this.toggleClick2
      }, mask ? '关闭遮罩层' : '显示遮罩层'), _react.default.createElement("button", {
        onClick: function onClick() {
          return _this2.forceUpdate();
        }
      }, "refresh")), _react.default.createElement("div", {
        style: {
          height: "calc(100% - 30px)",
          position: "relative",
          border: "1px solid #000"
        }
      }, _react.default.createElement(_lib.default, {
        visible: visible,
        mask: mask,
        unmountOnExit: false,
        resetPositionOnUpdate: true,
        style: {
          background: '#ff5454',
          color: '#FFF',
          padding: 10
        },
        onEnter: function onEnter() {
          return console.log('onEnter');
        },
        onEntering: function onEntering() {
          return console.log('onEntering');
        },
        onEntered: function onEntered() {
          return console.log('onEntered');
        },
        onExit: function onExit() {
          return console.log('Popup onExit');
        },
        onExiting: function onExiting() {
          return console.log('Popup onExiting');
        },
        onExited: function onExited() {
          return console.log('Popup onExited');
        },
        timeout: 300,
        transitionClassNames: animateClassNames,
        maskTransitionClassNames: maskAnimateClassNames,
        placement: {
          of: function of(el) {
            return el.parentElement;
          }
        }
      }, _react.default.createElement("div", null, "center2...", _react.default.createElement(Test, null)))));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/demos/Demo4.js":
/*!*********************************!*\
  !*** ./examples/demos/Demo4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _lib = _interopRequireDefault(__webpack_require__(/*! ../../lib */ "./lib/index.js"));

function Test() {
  return _react.default.createElement("a", null, "Test a");
}

var animateClassNames = {
  "appear": "animated",
  "appearActive": "fadeBottomIn",
  "enter": "animated",
  "enterActive": "fadeBottomIn",
  "enterDone": "",
  "exit": "animated",
  "exitActive": "fadeBottomOut",
  "exitDone": ""
};
var maskAnimateClassNames = {
  "appear": "animated",
  "appearActive": "fadeIn",
  "enter": "animated",
  "enterActive": "fadeIn",
  "exit": "animated",
  "exitActive": "fadeOut"
};

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: true,
      mask: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick", function (e) {
      var visible = _this.state.visible;

      _this.setState({
        visible: !visible
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick2", function (e) {
      var mask = _this.state.mask;

      _this.setState({
        mask: !mask
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton", function (dom) {
      _this._defer.resolve({
        of: dom,
        my: 'left top',
        at: 'left bottom'
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton2", function (dom) {
      _this._defer2.resolve({
        of: dom,
        my: 'left center',
        at: 'right center'
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          visible = _this$state.visible,
          mask = _this$state.mask;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", null, _react.default.createElement("button", {
        onClick: this.toggleClick
      }, visible ? '关闭' : '显示'), _react.default.createElement("button", {
        onClick: this.toggleClick2
      }, mask ? '关闭遮罩层' : '显示遮罩层'), _react.default.createElement("button", {
        onClick: function onClick() {
          return _this2.forceUpdate();
        }
      }, "refresh")), _react.default.createElement("div", {
        style: {
          height: "calc(100% - 30px)",
          position: "relative",
          border: "1px solid #000"
        }
      }, _react.default.createElement(_lib.default, {
        visible: visible,
        mask: mask,
        unmountOnExit: true,
        resetPositionOnUpdate: true,
        style: {
          background: '#ff5454',
          color: '#FFF',
          padding: 10
        },
        onEnter: function onEnter() {
          return console.log('onEnter');
        },
        onEntering: function onEntering() {
          return console.log('onEntering');
        },
        onEntered: function onEntered() {
          return console.log('onEntered');
        },
        onExit: function onExit() {
          return console.log('Popup onExit');
        },
        onExiting: function onExiting() {
          return console.log('Popup onExiting');
        },
        onExited: function onExited() {
          return console.log('Popup onExited');
        },
        maskProps: {
          onClick: function onClick() {
            _this2.toggleClick2();
          }
        },
        fixed: true,
        timeout: 300,
        transitionClassNames: animateClassNames,
        maskTransitionClassNames: maskAnimateClassNames,
        placement: {
          of: function of(el) {
            return el.parentElement;
          }
        }
      }, _react.default.createElement("div", null, "center2...", _react.default.createElement(Test, null)))));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _lib = _interopRequireDefault(__webpack_require__(/*! ../../lib */ "./lib/index.js"));

var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

var _bplokjsDeferred = _interopRequireDefault(__webpack_require__(/*! bplokjs-deferred */ "./node_modules/bplokjs-deferred/index.js"));

function Test() {
  console.log(1);
  return null;
}

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleClick", function (e) {
      var visible = _this.state.visible;

      _this.setState({
        visible: !visible
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton", function (dom) {
      _this._defer.resolve({
        of: dom,
        my: 'left top',
        at: 'left bottom'
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refButton2", function (dom) {
      _this._defer2.resolve({
        of: dom,
        my: 'left center',
        at: 'right center'
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_defer", (0, _bplokjsDeferred.default)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_defer2", (0, _bplokjsDeferred.default)());
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setInterval(this.forceUpdate.bind(this), 1000);
    }
  }, {
    key: "render",
    value: function render() {
      var visible = this.state.visible;
      var defer = (0, _bplokjsDeferred.default)();
      return _react.default.createElement("div", {
        ref: function ref(dom) {
          return dom && defer.resolve({
            of: dom.parentElement
          });
        }
      }, _react.default.createElement("button", {
        onClick: this.toggleClick
      }, visible ? '关闭' : '显示'), _react.default.createElement(_lib.default, {
        visible: visible,
        resetPositionOnUpdate: true
      }, _react.default.createElement("div", {
        className: "dialog"
      }, "center...")), _react.default.createElement("button", {
        onClick: this.toggleClick,
        ref: this.refButton
      }, "trigger"), _react.default.createElement(_lib.default, {
        visible: visible,
        placement: this._defer
      }, _react.default.createElement("div", {
        className: "dialog"
      }, "trigger1...")), _react.default.createElement("button", {
        onClick: this.toggleClick,
        ref: this.refButton2
      }, "animate"), _react.default.createElement(_lib.default, {
        visible: visible,
        placement: this._defer2,
        timeout: 500,
        onEnter: function onEnter(node) {
          (0, _jquery.default)(node).hide();
          (0, _jquery.default)(node).stop().fadeIn(500);
        },
        onExit: function onExit(node) {
          (0, _jquery.default)(node).stop().fadeOut(500);
        },
        style: {
          border: "5px solid #ccc"
        },
        onClick: function onClick() {
          return alert('you clicked!');
        }
      }, _react.default.createElement("div", {
        className: "dialog"
      }, "trigger2...", _react.default.createElement(Test, null))), _react.default.createElement(_lib.default, {
        visible: visible,
        resetPositionOnUpdate: true,
        style: {
          background: '#ccc',
          padding: 10
        },
        placement: defer
      }, _react.default.createElement("div", null, "center2...")));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! ../lib/style/index.css */ "./lib/style/index.css");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./lib/CSSTransition.js":
/*!******************************!*\
  !*** ./lib/CSSTransition.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addClass = _interopRequireDefault(__webpack_require__(/*! dom-helpers/class/addClass */ "./node_modules/dom-helpers/class/addClass.js"));

var _removeClass = _interopRequireDefault(__webpack_require__(/*! dom-helpers/class/removeClass */ "./node_modules/dom-helpers/class/removeClass.js")); ///////////////////////////////////////////////////////////////////
////////////part of react-transition-group/CSSTransition///////////
///////////////////////////////////////////////////////////////////


var addClass = function addClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return (0, _addClass.default)(node, c);
  });
};

var removeClass = function removeClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return (0, _removeClass.default)(node, c);
  });
};

var _default = {
  onEnter: function onEnter(node, appearing, mask) {
    var _this$getClassNames = this.getClassNames(appearing ? 'appear' : 'enter', mask),
        className = _this$getClassNames.className; //this.removeClasses(node, 'exit', mask);


    addClass(node, className);
  },
  onMaskEnter: function onMaskEnter(node, appearing) {
    this.onEnter(node, appearing, true);
  },
  onEntering: function onEntering(node, appearing, mask) {
    var _this$getClassNames2 = this.getClassNames(appearing ? 'appear' : 'enter', mask),
        activeClassName = _this$getClassNames2.activeClassName;

    this.reflowAndAddClass(node, activeClassName);
  },
  onMaskEntering: function onMaskEntering(node, appearing) {
    this.onEntering(node, appearing, true);
  },
  onEntered: function onEntered(node, appearing, mask) {
    var _this$getClassNames3 = this.getClassNames('enter', mask),
        doneClassName = _this$getClassNames3.doneClassName;

    this.removeClasses(node, appearing ? 'appear' : 'enter', mask);
    addClass(node, doneClassName);
  },
  onMaskEntered: function onMaskEntered(node, appearing) {
    this.onEntered(node, appearing, true);
  },
  onExit: function onExit(node, mask) {
    var _this$getClassNames4 = this.getClassNames('exit', mask),
        className = _this$getClassNames4.className;

    this.removeClasses(node, 'appear', mask);
    this.removeClasses(node, 'enter', mask);
    addClass(node, className);
  },
  onMaskExit: function onMaskExit(node) {
    this.onExit(node, true);
  },
  onExiting: function onExiting(node, mask) {
    var _this$getClassNames5 = this.getClassNames('exit', mask),
        activeClassName = _this$getClassNames5.activeClassName;

    this.reflowAndAddClass(node, activeClassName);
  },
  onMaskExiting: function onMaskExiting(node) {
    this.onExiting(node, true);
  },
  onExited: function onExited(node, mask) {
    var _this$getClassNames6 = this.getClassNames('exit', mask),
        doneClassName = _this$getClassNames6.doneClassName;

    this.removeClasses(node, 'exit', mask);
    addClass(node, doneClassName);
  },
  onMaskExited: function onMaskExited(node) {
    this.onExited(node, true);
  },
  getClassNames: function getClassNames(type, mask) {
    var classNames = mask ? this.props.maskTransitionClassNames : this.props.transitionClassNames;
    var className = typeof classNames !== 'string' ? classNames[type] : classNames + '-' + type;
    var activeClassName = typeof classNames !== 'string' ? classNames[type + 'Active'] : className + '-active';
    var doneClassName = typeof classNames !== 'string' ? classNames[type + 'Done'] : className + '-done';
    return {
      className: className,
      activeClassName: activeClassName,
      doneClassName: doneClassName
    };
  },
  removeClasses: function removeClasses(node, type, mask) {
    var _this$getClassNames7 = this.getClassNames(type, mask),
        className = _this$getClassNames7.className,
        activeClassName = _this$getClassNames7.activeClassName,
        doneClassName = _this$getClassNames7.doneClassName;

    className && removeClass(node, className);
    activeClassName && removeClass(node, activeClassName);
    doneClassName && removeClass(node, doneClassName);
  },
  reflowAndAddClass: function reflowAndAddClass(node, className) {
    // This is for to force a repaint,
    // which is necessary in order to transition styles when adding a class name.
    if (className) {
      /* eslint-disable no-unused-expressions */
      node && node.scrollTop; //此行在Popup组件中可省略

      /* eslint-enable no-unused-expressions */

      addClass(node, className);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js"));

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/objectWithoutProperties.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames3 = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _bplokjsPosition = _interopRequireDefault(__webpack_require__(/*! bplokjs-position */ "./node_modules/bplokjs-position/index.js"));

var _CSSTransition = _interopRequireDefault(__webpack_require__(/*! ./CSSTransition */ "./lib/CSSTransition.js"));

var _Transition = _interopRequireDefault(__webpack_require__(/*! react-widget-transition/lib/Transition */ "./node_modules/react-widget-transition/lib/Transition.js"));

var _warning = _interopRequireDefault(__webpack_require__(/*! warning */ "./node_modules/warning/warning.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! object.omit */ "./node_modules/object.omit/index.js"));

var _bplokjsDeferred = _interopRequireDefault(__webpack_require__(/*! bplokjs-deferred */ "./node_modules/bplokjs-deferred/index.js"));

function noop() {}

function isPromiseLike(promise) {
  return promise && typeof promise.then === 'function';
}

var classNamesShape = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
  enter: _propTypes.default.string,
  exit: _propTypes.default.string,
  active: _propTypes.default.string
}), _propTypes.default.shape({
  enter: _propTypes.default.string,
  enterDone: _propTypes.default.string,
  enterActive: _propTypes.default.string,
  exit: _propTypes.default.string,
  exitDone: _propTypes.default.string,
  exitActive: _propTypes.default.string
})]);

var propTypes = {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,

  /** 
  * @type {string | {
  *  appear?: string,
  *  appearActive?: string,
  *  enter?: string,
  *  enterActive?: string,
  *  enterDone?: string,
  *  exit?: string,
  *  exitActive?: string,
  *  exitDone?: string,
  * }}
  * */
  transitionClassNames: classNamesShape,
  maskTransitionClassNames: classNamesShape,
  mask: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  fixed: _propTypes.default.bool,
  mountOnEnter: _propTypes.default.bool,
  unmountOnExit: _propTypes.default.bool,
  resetPositionOnUpdate: _propTypes.default.bool,
  resetPositionOnEntered: _propTypes.default.bool,
  rootComponent: _propTypes.default.any,
  popupComponent: _propTypes.default.any,
  transitionComponent: _propTypes.default.any,
  maskComponent: _propTypes.default.any,
  maskProps: _propTypes.default.object,
  placement: _propTypes.default.any,
  // object func
  //translaton
  timeout: _propTypes.default.any,
  addEndListener: _propTypes.default.func,
  addMaskEndListener: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  onMaskEnter: _propTypes.default.func,
  onMaskEntering: _propTypes.default.func,
  onMaskEntered: _propTypes.default.func,
  onMaskExit: _propTypes.default.func,
  onMaskExiting: _propTypes.default.func,
  onMaskExited: _propTypes.default.func
};

var Popup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Popup, _React$Component);

  function Popup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      shouldComponentUpdate: false,
      before: null,
      start: null,
      after: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_hasSetPosition", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refPopup", function (el) {
      _this._popupRef = el;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refPopupMask", function (el) {
      _this._popupMaskRef = el;
    });
    return _this;
  }

  (0, _createClass2.default)(Popup, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        transitionGroup: null
      };
    }
  }, {
    key: "getPosition",
    value: function getPosition(opts) {
      var result = {};
      var popup = this.getPopupDOM();
      var of = opts.of,
          my = opts.my,
          at = opts.at,
          collision = opts.collision,
          _using = opts.using,
          within = opts.within;

      if (typeof of === 'function') {
        of = of(popup);
      }

      var config = {
        of: of,
        using: function using(pos, feedback) {
          if (_using) {
            _using(pos, feedback);
          }

          result.pos = pos;
          result.feedback = feedback;
        }
      };

      if (my) {
        config.my = my;
      }

      if (at) {
        config.at = at;
      }

      if (collision) {
        config.collision = collision;
      }

      if (within) {
        config.within = within;
      }

      (0, _bplokjsPosition.default)(popup, config);
      return result;
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var popup = this.getPopupDOM();

      if ('left' in pos) {
        popup.style.left = ~~pos.left + 'px';
      }

      if ('top' in pos) {
        popup.style.top = ~~pos.top + 'px';
      }

      if ('right' in pos) {
        popup.style.right = ~~pos.right + 'px';
      }

      if ('bottom' in pos) {
        popup.style.bottom = ~~pos.bottom + 'px';
      }
    }
    /**
     * 
     * @param {boolean} reset 强制刷新 
     */

  }, {
    key: "updatePosition",
    value: function updatePosition(reset) {
      var _this2 = this;

      var _this$props = this.props,
          visible = _this$props.visible,
          resetPositionOnUpdate = _this$props.resetPositionOnUpdate;
      var start = this.state.start;

      if (visible) {
        start(function (opts) {
          if (opts == null) return;
          var shouldSetPosition = resetPositionOnUpdate ? true : _this2._hasSetPosition ? resetPositionOnUpdate : true;

          if (reset || shouldSetPosition) {
            if (typeof opts === 'function') {
              opts(_this2.getPopupDOM());
            } else {
              var _position = _this2.getPosition(opts);

              _this2.setPosition(_position.pos);
            }

            _this2._hasSetPosition = true;
          }
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.shouldComponentUpdate;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;

      if (!props.visible && !props.mountOnEnter) {
        var popupDOM = this.getPopupDOM();
        var popupMaskDOM = this.getPopupMaskDOM();
        popupDOM && (popupDOM.style.display = 'none');
        popupMaskDOM && (popupMaskDOM.style.display = 'none');
      }

      this.updatePosition();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updatePosition();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "getRootDOM",
    value: function getRootDOM() {
      return this._rootDOM;
    }
  }, {
    key: "getPopupDOM",
    value: function getPopupDOM() {
      return _reactDom.default.findDOMNode(this._popupRef);
    }
  }, {
    key: "getPopupMaskDOM",
    value: function getPopupMaskDOM() {
      return this._popupMaskRef ? _reactDom.default.findDOMNode(this._popupMaskRef) : null;
    }
  }, {
    key: "onTransitionIn",
    value: function onTransitionIn(action, node, appearing) {
      var _this3 = this;

      var _this$state = this.state,
          before = _this$state.before,
          after = _this$state.after;
      var props = this.props;
      before(function () {
        if (!props.unmountOnExit && (action === 'onEnter' || action === 'onMaskEnter')) {
          node.style.display = '';
        }
      });
      before(function () {
        if (action === 'onMaskEnter' && props.maskTransitionClassNames || action === 'onEnter' && props.transitionClassNames) {
          _this3.removeClasses(node, 'exit', action === 'onMaskEnter');
        }
      });
      after(function () {
        if (/^onMask/.test(action) && props.maskTransitionClassNames) {
          _this3[action](node, appearing);
        }

        if (!/^onMask/.test(action) && props.transitionClassNames) {
          _this3[action](node, appearing);
        }

        if (props[action]) {
          props[action](node, appearing);
        }

        if (props.resetPositionOnEntered && action === 'onEntered') {
          _this3.updatePosition(true);
        }
      });
    }
  }, {
    key: "onTransitionOut",
    value: function onTransitionOut(action, node) {
      var props = this.props;

      if (/^onMask/.test(action) && props.maskTransitionClassNames) {
        this[action](node);
      }

      if (!/^onMask/.test(action) && props.transitionClassNames) {
        this[action](node);
      }

      if (props[action]) {
        props[action](node);
      }

      if (!props.unmountOnExit && (action === 'onExited' || action === 'onMaskExited')) {
        node.style.display = 'none';
      }

      if (action === 'onExited') {
        this.setState({
          shouldComponentUpdate: false
        });
      }
    }
  }, {
    key: "renderPopupMask",
    value: function renderPopupMask() {
      var _classnames;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          mask = _this$props2.mask,
          visible = _this$props2.visible,
          unmountOnExit = _this$props2.unmountOnExit,
          mountOnEnter = _this$props2.mountOnEnter,
          _this$props2$maskProp = _this$props2.maskProps,
          maskProps = _this$props2$maskProp === void 0 ? {} : _this$props2$maskProp,
          fixed = _this$props2.fixed,
          timeout = _this$props2.timeout,
          addMaskEndListener = _this$props2.addMaskEndListener,
          Transition = _this$props2.transitionComponent,
          MaskComponent = _this$props2.maskComponent;
      var cls = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-mask"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-mask-fixed"), fixed), (0, _defineProperty2.default)(_classnames, maskProps.className, maskProps.className), _classnames));
      return _react.default.createElement(Transition, {
        timeout: timeout,
        addEndListener: timeout == null && addMaskEndListener === noop ? function (node, cb) {
          return cb();
        } : addMaskEndListener,
        in: mask && visible,
        onEnter: this.onTransitionIn.bind(this, 'onMaskEnter'),
        onEntering: this.onTransitionIn.bind(this, 'onMaskEntering'),
        onEntered: this.onTransitionIn.bind(this, 'onMaskEntered'),
        onExit: this.onTransitionOut.bind(this, 'onMaskExit'),
        onExiting: this.onTransitionOut.bind(this, 'onMaskExiting'),
        onExited: this.onTransitionOut.bind(this, 'onMaskExited'),
        unmountOnExit: unmountOnExit,
        mountOnEnter: mountOnEnter,
        enter: true,
        exit: true,
        appear: true
      }, _react.default.createElement(MaskComponent, (0, _extends2.default)({}, maskProps, {
        ref: this.refPopupMask,
        className: cls
      })));
    }
  }, {
    key: "renderPopup",
    value: function renderPopup() {
      var _classnames2;

      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          className = _this$props3.className,
          fixed = _this$props3.fixed,
          children = _this$props3.children,
          visible = _this$props3.visible,
          mountOnEnter = _this$props3.mountOnEnter,
          unmountOnExit = _this$props3.unmountOnExit,
          timeout = _this$props3.timeout,
          addEndListener = _this$props3.addEndListener,
          RootComponent = _this$props3.rootComponent,
          PopupComponent = _this$props3.popupComponent,
          Transition = _this$props3.transitionComponent,
          others = (0, _objectWithoutProperties2.default)(_this$props3, ["prefixCls", "className", "fixed", "children", "visible", "mountOnEnter", "unmountOnExit", "timeout", "addEndListener", "rootComponent", "popupComponent", "transitionComponent"]);
      var cls = (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, prefixCls, true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-fixed"), fixed), (0, _defineProperty2.default)(_classnames2, className, className), _classnames2));
      (0, _warning.default)(PopupComponent !== _react.Fragment, "popupComponent receive a Fragment Component!");
      return _react.default.createElement(RootComponent, null, this.renderPopupMask(), _react.default.createElement(Transition, {
        timeout: timeout,
        addEndListener: timeout == null && addEndListener === noop ? function (node, cb) {
          return cb();
        } : addEndListener,
        in: visible,
        onEnter: this.onTransitionIn.bind(this, 'onEnter'),
        onEntering: this.onTransitionIn.bind(this, 'onEntering'),
        onEntered: this.onTransitionIn.bind(this, 'onEntered'),
        onExit: this.onTransitionOut.bind(this, 'onExit'),
        onExiting: this.onTransitionOut.bind(this, 'onExiting'),
        onExited: this.onTransitionOut.bind(this, 'onExited'),
        unmountOnExit: unmountOnExit,
        mountOnEnter: mountOnEnter,
        enter: true,
        exit: true,
        appear: true
      }, _react.default.createElement(PopupComponent, (0, _extends2.default)({
        tabIndex: -1
      }, (0, _object.default)(others, (0, _keys.default)(propTypes)), {
        ref: this.refPopup,
        className: cls
      }), children)));
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderPopup();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, state) {
      var placement = _ref.placement,
          visible = _ref.visible;
      placement = isPromiseLike(placement) ? placement : _promise.default.resolve(placement);
      var beforeCb = [];
      var hasStart = false;
      var deferred = (0, _bplokjsDeferred.default)();
      var promise = deferred.promise;

      function before(cb) {
        beforeCb.push(cb);
      }

      function start(cb) {
        // 防止多次调用
        if (hasStart) {
          placement.then(cb).catch(function (e) {
            return cb(null);
          });
          return;
        }

        ;
        hasStart = true;
        beforeCb.forEach(function (callback) {
          return callback();
        });
        placement.then(function (opts) {
          cb(opts);
          deferred.resolve();
        }).catch(function (e) {
          cb(null);
          deferred.resolve();
        });
      }

      return {
        shouldComponentUpdate: !visible && !state.shouldComponentUpdate ? false : true,
        before: before,
        start: start,
        after: function after(cb) {
          //cb();
          return promise = promise.then(cb);
        }
      };
    }
  }]);
  return Popup;
}(_react.default.Component);

(0, _defineProperty2.default)(Popup, "propTypes", propTypes);
(0, _defineProperty2.default)(Popup, "childContextTypes", {
  transitionGroup: function transitionGroup() {}
});
(0, _defineProperty2.default)(Popup, "defaultProps", {
  prefixCls: 'rw-popup',
  rootComponent: _react.Fragment,
  popupComponent: 'div',
  transitionComponent: _Transition.default,
  maskComponent: 'div',
  mountOnEnter: true,
  unmountOnExit: true,
  // destroyOnHide
  mask: false,
  fixed: false,
  // 禁用每次刷新更新位置
  resetPositionOnUpdate: true,
  // 动画结束收重新更新位置，特殊场景下可能需要
  resetPositionOnEntered: false,
  visible: true,
  addEndListener: noop,
  addMaskEndListener: noop,
  placement: {
    of: window,
    collision: 'flip' // none flip fit flipfit

    /**
     * onEnter onEntering onEntered在updatePosition执行
     */

  }
});
(0, _assign.default)(Popup.prototype, _CSSTransition.default);
var _default = Popup;
exports.default = _default;

/***/ }),

/***/ "./lib/style/index.css":
/*!*****************************!*\
  !*** ./lib/style/index.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\popup\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\popup\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\react-widget\popup\examples\index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.a624ed37.js.map