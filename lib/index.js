
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _bplokjsPosition = _interopRequireDefault(require("bplokjs-position"));

var _CSSTransition = _interopRequireDefault(require("./CSSTransition"));

var _Transition = _interopRequireDefault(require("react-widget-transition/lib/Transition"));

var _warning = _interopRequireDefault(require("warning"));

var _object = _interopRequireDefault(require("object.omit"));

var _bplokjsDeferred = _interopRequireDefault(require("bplokjs-deferred"));

var _addClass = _interopRequireDefault(require("dom-helpers/class/addClass"));

var _removeClass = _interopRequireDefault(require("dom-helpers/class/removeClass"));

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
  setDirectionClassName: _propTypes.default.bool,
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

      if ((0, _isArray.default)(of)) {
        of = {
          pageX: of[0],
          pageY: of[1]
        };
      }

      var directionMap = {
        'left': 'right',
        'right': 'top',
        'bottom': 'top',
        'top': 'bottom',
        'center': 'center'
      };
      var config = {
        of: of,
        using: function using(pos, feedback) {
          if (_using) {
            _using(pos, feedback);
          }

          result.direction = directionMap[feedback[feedback.important]];
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
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var popup = this.getPopupDOM();

      if (this.props.setDirectionClassName) {
        (0, _removeClass.default)(popup, "".concat(this.props.prefixCls, "-direction-top"));
        (0, _removeClass.default)(popup, "".concat(this.props.prefixCls, "-direction-bottom"));
        (0, _removeClass.default)(popup, "".concat(this.props.prefixCls, "-direction-left"));
        (0, _removeClass.default)(popup, "".concat(this.props.prefixCls, "-direction-right"));

        if (direction) {
          (0, _addClass.default)(popup, "".concat(this.props.prefixCls, "-direction-").concat(direction));
        }
      } //~~ .toFixed()


      if ('left' in pos) {
        popup.style.left = pos.left.toFixed() + 'px';
      }

      if ('top' in pos) {
        popup.style.top = pos.top.toFixed() + 'px';
      }

      if ('right' in pos) {
        popup.style.right = pos.right.toFixed() + 'px';
      }

      if ('bottom' in pos) {
        popup.style.bottom = pos.bottom.toFixed() + 'px';
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

              _this2.setPosition(_position.pos, _position.direction);
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
      }, _react.default.createElement(PopupComponent, (0, _extends2.default)({}, (0, _object.default)(others, (0, _keys.default)(propTypes)), {
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
  setDirectionClassName: true,
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

  }
  /**
   * onEnter onEntering onEntered在updatePosition执行
   */

});
(0, _assign.default)(Popup.prototype, _CSSTransition.default);
var _default = Popup;
exports.default = _default;