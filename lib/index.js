
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _TransitionGroupContext = _interopRequireDefault(require("react-transition-group/TransitionGroupContext"));

var _Transition = require("react-transition-group/Transition");

var _CSSTransition = _interopRequireDefault(require("react-transition-group/CSSTransition"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transitionStatus", _Transition.EXITED);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_refs", {});
    return _this;
  }

  (0, _createClass2.default)(Popup, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var status = this.transitionStatus;
      return !(_Transition.EXITED === status && !nextProps.visible);
    }
  }, {
    key: "shouldHide",
    value: function shouldHide() {
      var _this$props = this.props,
          lazyMount = _this$props.lazyMount,
          visible = _this$props.visible;
      return !visible && !lazyMount;
    }
  }, {
    key: "saveRef",
    value: function saveRef(key, component) {
      this._refs[key] = component;
    }
  }, {
    key: "getPopupRootDOM",
    value: function getPopupRootDOM() {
      return _reactDom.default.findDOMNode(this._refs["popupRoot"]);
    }
  }, {
    key: "getPopupDOM",
    value: function getPopupDOM() {
      return _reactDom.default.findDOMNode(this._refs["popup"]);
    }
  }, {
    key: "getPopupMaskDOM",
    value: function getPopupMaskDOM() {
      return _reactDom.default.findDOMNode(this._refs["popupMask"]);
    }
  }, {
    key: "onEnter",
    value: function onEnter(_ref, node, appearing) {
      var _onEnter = _ref.onEnter;
      var destroyOnHide = this.props.destroyOnHide;

      if (_onEnter) {
        _onEnter(node, appearing);
      }

      if (!destroyOnHide) {
        node.style.display = "";
      }
    }
  }, {
    key: "onExited",
    value: function onExited(_ref2, node) {
      var _onExited = _ref2.onExited;
      var destroyOnHide = this.props.destroyOnHide;

      if (_onExited) {
        _onExited(node);
      }

      if (!destroyOnHide) {
        node.style.display = "none";
      }
    }
  }, {
    key: "renderPopupMask",
    value: function renderPopupMask() {
      var _classnames;

      var _this$props2 = this.props,
          prefix = _this$props2.prefix,
          visible = _this$props2.visible,
          mask = _this$props2.mask,
          maskProps = _this$props2.maskProps,
          maskStyle = _this$props2.maskStyle,
          maskClassName = _this$props2.maskClassName,
          maskTransition = _this$props2.maskTransition,
          lazyMount = _this$props2.lazyMount,
          destroyOnHide = _this$props2.destroyOnHide,
          fixed = _this$props2.fixed,
          timeout = _this$props2.timeout,
          MaskComponent = _this$props2.maskComponent;
      var classes = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-mask"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-mask-fixed"), fixed), (0, _defineProperty2.default)(_classnames, maskProps.className, maskProps.className), (0, _defineProperty2.default)(_classnames, maskClassName, maskClassName), _classnames));
      var mStyle = {};

      if (this.shouldHide()) {
        mStyle.display = "none";
      }

      return _react.default.createElement(_CSSTransition.default, (0, _extends2.default)({
        enter: true,
        exit: true,
        appear: true,
        classNames: {},
        timeout: timeout,
        addEndListener: function addEndListener(_, cb) {
          return timeout == null && cb();
        }
      }, maskTransition, {
        in: mask && visible,
        onEnter: this.onEnter.bind(this, maskTransition),
        onExited: this.onExited.bind(this, maskTransition),
        unmountOnExit: destroyOnHide,
        mountOnEnter: lazyMount
      }), _react.default.createElement(MaskComponent, (0, _extends2.default)({}, maskProps, {
        ref: this.saveRef.bind(this, "popupMask"),
        style: _objectSpread({}, maskStyle, {}, mStyle),
        className: classes
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames3,
          _this2 = this;

      var _this$props3 = this.props,
          style = _this$props3.style,
          prefix = _this$props3.prefix,
          className = _this$props3.className,
          fixed = _this$props3.fixed,
          timeout = _this$props3.timeout,
          visible = _this$props3.visible,
          children = _this$props3.children,
          lazyMount = _this$props3.lazyMount,
          destroyOnHide = _this$props3.destroyOnHide,
          rootClassName = _this$props3.rootClassName,
          RootComponent = _this$props3.rootComponent,
          Component = _this$props3.component,
          transition = _this$props3.transition,
          childProps = (0, _objectWithoutProperties2.default)(_this$props3, ["style", "prefix", "className", "fixed", "timeout", "visible", "children", "lazyMount", "destroyOnHide", "rootClassName", "rootComponent", "component", "transition"]);
      delete childProps.mask;
      delete childProps.maskProps;
      delete childProps.maskStyle;
      delete childProps.maskClassName;
      delete childProps.maskComponent;
      delete childProps.maskTransition;
      var rootProps = {};

      if (RootComponent !== _react.Fragment) {
        var _classnames2;

        rootProps.ref = this.saveRef.bind(this, "popupRoot");
        rootProps.className = (0, _classnames4.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefix, "-root"), true), (0, _defineProperty2.default)(_classnames2, rootClassName, rootClassName), _classnames2));
      }

      var classes = (0, _classnames4.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, prefix, true), (0, _defineProperty2.default)(_classnames3, "".concat(prefix, "-fixed"), fixed), (0, _defineProperty2.default)(_classnames3, className, className), _classnames3));
      var pStyle = {};

      if (this.shouldHide()) {
        pStyle.display = "none";
      }

      return _react.default.createElement(_TransitionGroupContext.default.Provider, {
        value: null
      }, _react.default.createElement(RootComponent, null, this.renderPopupMask(), _react.default.createElement(_CSSTransition.default, (0, _extends2.default)({
        enter: true,
        exit: true,
        appear: true,
        classNames: {},
        timeout: timeout,
        addEndListener: function addEndListener(_, cb) {
          return timeout == null && cb();
        }
      }, transition, {
        in: visible,
        onEnter: this.onEnter.bind(this, transition),
        onExited: this.onExited.bind(this, transition),
        unmountOnExit: destroyOnHide,
        mountOnEnter: lazyMount
      }), function (status) {
        _this2.transitionStatus = status;
        return _react.default.createElement(Component, (0, _extends2.default)({}, childProps, {
          ref: _this2.saveRef.bind(_this2, "popup"),
          style: _objectSpread({}, style, {}, pStyle),
          className: classes
        }), typeof children === "function" ? children(status) : children);
      })));
    }
  }]);
  return Popup;
}(_react.default.Component);

Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  prefix: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  rootClassName: _propTypes.default.string,
  fixed: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  lazyMount: _propTypes.default.bool,
  transition: _propTypes.default.object,
  destroyOnHide: _propTypes.default.bool,
  mask: _propTypes.default.bool,
  maskStyle: _propTypes.default.object,
  maskProps: _propTypes.default.object,
  maskClassName: _propTypes.default.string,
  maskTransition: _propTypes.default.object,
  component: _propTypes.default.elementType,
  maskComponent: _propTypes.default.elementType,
  rootComponent: _propTypes.default.elementType,
  // 动画超时时间，建议在transition和maskTransition设置
  timeout: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object])
} : {};
Popup.defaultProps = {
  prefix: "nex-popup",
  style: {},
  className: "",
  rootClassName: "",
  fixed: false,
  visible: false,
  //初始未显示的情况下不渲染组件，作用同react-transition-group的mountOnEnter
  lazyMount: true,
  //popup动画配置参数参考react-transition-group
  //http://reactcommunity.org/react-transition-group/css-transition
  transition: {},
  //visible=false时移除组件，作用同react-transition-group的unmountOnExit
  destroyOnHide: true,
  mask: false,
  maskStyle: {},
  maskProps: {},
  maskClassName: "",
  //popupMask动画配置参数参考react-transition-group
  //http://reactcommunity.org/react-transition-group/css-transition
  maskTransition: {},
  component: "div",
  maskComponent: "div",
  rootComponent: _react.Fragment
};
var _default = Popup;
exports.default = _default;