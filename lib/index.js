
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

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

var _classnames = _interopRequireDefault(require("classnames"));

var _bplokjsPosition = _interopRequireDefault(require("bplokjs-position"));

var _Transition = _interopRequireDefault(require("react-widget-transition/lib/Transition"));

var _warning = _interopRequireDefault(require("warning"));

var _bplokjsDeferred = _interopRequireDefault(require("bplokjs-deferred"));

function noop() {}

function isPromiseLike(promise) {
  return promise && typeof promise.then === 'function';
}

var propTypes = {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  mask: _propTypes.default.bool,
  maskClassName: _propTypes.default.string,
  visible: _propTypes.default.bool,
  fixed: _propTypes.default.bool,
  resetPositionOnUpdate: _propTypes.default.bool,
  onMaskClick: _propTypes.default.func,
  onMaskMouseDown: _propTypes.default.func,
  rootComponent: _propTypes.default.any,
  popupComponent: _propTypes.default.any,
  rootProps: _propTypes.default.object,
  popupProps: _propTypes.default.object,
  popupMaskProps: _propTypes.default.object,
  addEndListener: _propTypes.default.func,
  timeout: _propTypes.default.any,
  onEntered: _propTypes.default.func,
  onExited: _propTypes.default.func,
  mountOnEnter: _propTypes.default.bool,
  placement: _propTypes.default.any
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
      start: null,
      then: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_hasSetPosition", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMaskClick", function (e) {
      var onMaskClick = _this.props.onMaskClick;

      if (onMaskClick) {
        onMaskClick(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMaskMouseDown", function (e) {
      var onMaskMouseDown = _this.props.onMaskMouseDown;

      if (onMaskMouseDown) {
        onMaskMouseDown(e);
      }
    });
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
        popup.style.left = pos.left + 'px';
      }

      if ('top' in pos) {
        popup.style.top = pos.top + 'px';
      }

      if ('right' in pos) {
        popup.style.right = pos.right + 'px';
      }

      if ('bottom' in pos) {
        popup.style.bottom = pos.bottom + 'px';
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var _this2 = this;

      var _this$props = this.props,
          visible = _this$props.visible,
          resetPositionOnUpdate = _this$props.resetPositionOnUpdate;
      var start = this.state.start;

      if (visible) {
        start(function (opts) {
          if (opts == null) return;
          var shouldSetPosition = resetPositionOnUpdate ? true : _this2._hasSetPosition ? resetPositionOnUpdate : true;

          if (shouldSetPosition) {
            var _position = _this2.getPosition(opts);

            _this2.setPosition(_position.pos);

            _this2._hasSetPosition = true;
          }
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
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
    key: "renderPopupMask",
    value: function renderPopupMask() {
      var _classNames;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          mask = _this$props2.mask,
          maskClassName = _this$props2.maskClassName,
          popupMaskProps = _this$props2.popupMaskProps,
          fixed = _this$props2.fixed;
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mask"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mask-fixed"), fixed), (0, _defineProperty2.default)(_classNames, maskClassName, maskClassName), _classNames));
      return mask ? _react.default.createElement("div", (0, _extends2.default)({
        onMouseDown: this.handleMaskMouseDown,
        onClick: this.handleMaskClick
      }, popupMaskProps, {
        ref: this.refPopupMask,
        className: classes
      })) : null;
    }
  }, {
    key: "onTransitionChange",
    value: function onTransitionChange(action, node) {
      var props = this.props;
      var pupupMaskDOM = this.getPopupMaskDOM();

      if (props[action]) {
        props[action](node, pupupMaskDOM);
      }
    }
  }, {
    key: "onTransitionIn",
    value: function onTransitionIn(action, node) {
      var then = this.state.then;
      var props = this.props;
      var pupupMaskDOM = this.getPopupMaskDOM();
      then(function () {
        if (props[action]) {
          props[action](node, pupupMaskDOM);
        }

        console.log(action);
      });
    }
  }, {
    key: "renderPopup",
    value: function renderPopup() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          className = _this$props3.className,
          fixed = _this$props3.fixed,
          style = _this$props3.style,
          popupProps = _this$props3.popupProps,
          children = _this$props3.children,
          visible = _this$props3.visible,
          timeout = _this$props3.timeout,
          addEndListener = _this$props3.addEndListener,
          RootComponent = _this$props3.rootComponent,
          PopupComponent = _this$props3.popupComponent;
      var classes = (0, _classnames.default)(prefixCls, fixed ? prefixCls + '-fixed' : '', className);
      (0, _warning.default)(PopupComponent !== _react.Fragment, "popupComponent receive a Fragment Component!");
      return _react.default.createElement(RootComponent, null, this.renderPopupMask(), _react.default.createElement(_Transition.default, {
        timeout: timeout,
        addEndListener: timeout == null && addEndListener === noop ? function (node, cb) {
          return cb();
        } : addEndListener,
        in: visible,
        onEnter: this.onTransitionIn.bind(this, 'onEnter'),
        onEntering: this.onTransitionIn.bind(this, 'onEntering'),
        onEntered: this.onTransitionIn.bind(this, 'onEntered'),
        onExit: this.onTransitionChange.bind(this, 'onExit'),
        onExiting: this.onTransitionChange.bind(this, 'onExiting'),
        onExited: this.onTransitionChange.bind(this, 'onExited'),
        unmountOnExit: true,
        mountOnEnter: true,
        enter: true,
        exit: true,
        appear: true
      }, _react.default.createElement(PopupComponent, (0, _extends2.default)({
        tabIndex: -1,
        style: style
      }, popupProps, {
        ref: this.refPopup,
        className: classes
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
      var placement = _ref.placement;
      placement = isPromiseLike(placement) ? placement : _promise.default.resolve(placement);
      var deferred = (0, _bplokjsDeferred.default)();
      var promise = deferred.promise;

      function start(cb) {
        placement.then(function (opts) {
          cb(opts);
          deferred.resolve();
        }).catch(function (e) {
          cb(null);
          deferred.resolve();
        });
      }

      return {
        start: start,
        then: function then(cb) {
          return promise = promise.then(cb);
        }
      };
    }
  }]);
  return Popup;
}(_react.default.Component);

exports.default = Popup;
(0, _defineProperty2.default)(Popup, "propTypes", propTypes);
(0, _defineProperty2.default)(Popup, "childContextTypes", {
  transitionGroup: function transitionGroup() {}
});
(0, _defineProperty2.default)(Popup, "defaultProps", {
  prefixCls: 'rw-popup',
  rootComponent: _react.default.Fragment,
  popupComponent: 'div',
  mask: false,
  fixed: false,
  //禁用每次刷新更新位置
  resetPositionOnUpdate: true,
  visible: true,
  addEndListener: noop,
  placement: {
    of: window,
    collision: 'flip' // none flip fit flipfit

  }
  /**
   * onEnter onEntering onEntered在updatePosition执行
   */

});