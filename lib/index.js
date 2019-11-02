
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _TransitionGroupContext = _interopRequireDefault(require("react-transition-group/TransitionGroupContext"));

var _Transition = require("react-transition-group/Transition");

var _CSSTransition = _interopRequireDefault(require("react-transition-group/CSSTransition"));

// import PopupCSSTransition from "./PopupCSSTransition";
// import PopupContext from "./PopupContext";
var Popup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Popup, _React$Component);

  function Popup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transitionStatus", _Transition.EXITED);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_refs", {});
    return _this;
  }

  var _proto = Popup.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var status = this.transitionStatus;
    return !(_Transition.EXITED === status && !nextProps.visible);
  };

  _proto.shouldHide = function shouldHide() {
    var _this$props = this.props,
        lazyMount = _this$props.lazyMount,
        visible = _this$props.visible;
    return !visible && !lazyMount;
  };

  _proto.saveRef = function saveRef(key, component) {
    this._refs[key] = component;
  };

  _proto.getPopupRootDOM = function getPopupRootDOM() {
    return _reactDom.default.findDOMNode(this._refs["popupRoot"]);
  };

  _proto.getPopupDOM = function getPopupDOM() {
    return _reactDom.default.findDOMNode(this._refs["popup"]);
  };

  _proto.getPopupMaskDOM = function getPopupMaskDOM() {
    return _reactDom.default.findDOMNode(this._refs["popupMask"]);
  };

  _proto.onEnter = function onEnter(_ref, isMask, node, appearing) {
    var _onEnter = _ref.onEnter;
    var _this$props2 = this.props,
        destroyOnHide = _this$props2.destroyOnHide,
        getPosition = _this$props2.getPosition;

    if (_onEnter) {
      _onEnter(node, appearing);
    }

    if (!destroyOnHide) {
      node.style.display = "";
    }

    if (!isMask && getPosition) {
      var pos = getPosition(node);

      var transform = function transform(v) {
        return typeof v === "number" ? v + "px" : v;
      };

      if (pos) {
        if ("left" in pos) {
          node.style.left = transform(pos.left);
        }

        if ("top" in pos) {
          node.style.top = transform(pos.top);
        }

        if ("right" in pos) {
          node.style.right = transform(pos.right);
        }

        if ("bottom" in pos) {
          node.style.bottom = transform(pos.bottom);
        }
      }
    }
  };

  _proto.onExited = function onExited(_ref2, isMask, node) {
    var _onExited = _ref2.onExited;
    var destroyOnHide = this.props.destroyOnHide;

    if (_onExited) {
      _onExited(node);
    }

    if (!destroyOnHide) {
      node.style.display = "none";
    }
  };

  _proto.renderPopupMask = function renderPopupMask() {
    var _classnames;

    var _this$props3 = this.props,
        prefix = _this$props3.prefix,
        visible = _this$props3.visible,
        mask = _this$props3.mask,
        maskProps = _this$props3.maskProps,
        maskStyle = _this$props3.maskStyle,
        maskClassName = _this$props3.maskClassName,
        maskTransition = _this$props3.maskTransition,
        lazyMount = _this$props3.lazyMount,
        destroyOnHide = _this$props3.destroyOnHide,
        fixed = _this$props3.fixed,
        timeout = _this$props3.timeout,
        MaskComponent = _this$props3.maskComponent;
    var classes = (0, _classnames4.default)((_classnames = {}, _classnames[prefix + "-mask"] = true, _classnames[prefix + "-mask-fixed"] = fixed, _classnames[maskProps.className] = maskProps.className, _classnames[maskClassName] = maskClassName, _classnames));
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
      onEnter: this.onEnter.bind(this, maskTransition, true),
      onExited: this.onExited.bind(this, maskTransition, true),
      unmountOnExit: destroyOnHide,
      mountOnEnter: lazyMount
    }), _react.default.createElement(MaskComponent, (0, _extends2.default)({}, maskProps, {
      ref: this.saveRef.bind(this, "popupMask"),
      style: (0, _extends2.default)({}, maskStyle, {}, mStyle),
      className: classes
    })));
  };

  _proto.render = function render() {
    var _classnames3,
        _this2 = this;

    var _this$props4 = this.props,
        style = _this$props4.style,
        prefix = _this$props4.prefix,
        className = _this$props4.className,
        fixed = _this$props4.fixed,
        timeout = _this$props4.timeout,
        visible = _this$props4.visible,
        children = _this$props4.children,
        lazyMount = _this$props4.lazyMount,
        destroyOnHide = _this$props4.destroyOnHide,
        rootClassName = _this$props4.rootClassName,
        RootComponent = _this$props4.rootComponent,
        Component = _this$props4.component,
        transition = _this$props4.transition,
        childProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["style", "prefix", "className", "fixed", "timeout", "visible", "children", "lazyMount", "destroyOnHide", "rootClassName", "rootComponent", "component", "transition"]);
    delete childProps.mask;
    delete childProps.maskProps;
    delete childProps.maskStyle;
    delete childProps.maskClassName;
    delete childProps.maskComponent;
    delete childProps.maskTransition;
    delete childProps.getPosition;
    var rootProps = {};

    if (RootComponent !== _react.Fragment) {
      var _classnames2;

      rootProps.ref = this.saveRef.bind(this, "popupRoot");
      rootProps.className = (0, _classnames4.default)((_classnames2 = {}, _classnames2[prefix + "-root"] = true, _classnames2[rootClassName] = rootClassName, _classnames2));
    }

    var classes = (0, _classnames4.default)((_classnames3 = {}, _classnames3[prefix] = true, _classnames3[prefix + "-fixed"] = fixed, _classnames3[className] = className, _classnames3));
    var pStyle = {};

    if (this.shouldHide()) {
      pStyle.display = "none";
    }

    return (// <PopupContext.Provider value={this}>
      _react.default.createElement(_TransitionGroupContext.default.Provider, {
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
        onEnter: this.onEnter.bind(this, transition, false),
        onExited: this.onExited.bind(this, transition, false),
        unmountOnExit: destroyOnHide,
        mountOnEnter: lazyMount
      }), function (status) {
        _this2.transitionStatus = status;
        return _react.default.createElement(Component, (0, _extends2.default)({}, childProps, {
          ref: _this2.saveRef.bind(_this2, "popup"),
          style: (0, _extends2.default)({}, style, {}, pStyle),
          className: classes
        }), typeof children === "function" ? children(status) : children);
      }))) // </PopupContext.Provider>

    );
  };

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
  getPosition: _propTypes.default.func,
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