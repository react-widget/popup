
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import { EXITED } from "react-transition-group/Transition";
import CSSTransition from "react-transition-group/CSSTransition";

var Popup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Popup, _React$Component);

  function Popup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "transitionStatus", EXITED);

    _defineProperty(_assertThisInitialized(_this), "_refs", {});

    return _this;
  }

  var _proto = Popup.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var status = this.transitionStatus;
    return !(EXITED === status && !nextProps.visible);
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
    return ReactDOM.findDOMNode(this._refs["popupRoot"]);
  };

  _proto.getPopupDOM = function getPopupDOM() {
    return ReactDOM.findDOMNode(this._refs["popup"]);
  };

  _proto.getPopupMaskDOM = function getPopupMaskDOM() {
    return ReactDOM.findDOMNode(this._refs["popupMask"]);
  };

  _proto.onEnter = function onEnter(_ref, isMask, node, appearing) {
    var _onEnter = _ref.onEnter;
    var _this$props2 = this.props,
        destroyOnHide = _this$props2.destroyOnHide,
        getPosition = _this$props2.getPosition;

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

    if (_onEnter) {
      _onEnter(node, appearing);
    }
  };

  _proto.onExited = function onExited(_ref2, isMask, node) {
    var _onExited = _ref2.onExited;
    var destroyOnHide = this.props.destroyOnHide;

    if (!destroyOnHide) {
      node.style.display = "none";
    }

    if (_onExited) {
      _onExited(node);
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
    var classes = classnames((_classnames = {}, _classnames[prefix + "-mask"] = true, _classnames[prefix + "-mask-fixed"] = fixed, _classnames[maskProps.className] = maskProps.className, _classnames[maskClassName] = maskClassName, _classnames));
    var mStyle = {};

    if (this.shouldHide()) {
      mStyle.display = "none";
    }

    return React.createElement(CSSTransition, _extends({
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
    }), React.createElement(MaskComponent, _extends({}, maskProps, {
      ref: this.saveRef.bind(this, "popupMask"),
      style: _extends({}, maskStyle, {}, mStyle),
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
        childProps = _objectWithoutPropertiesLoose(_this$props4, ["style", "prefix", "className", "fixed", "timeout", "visible", "children", "lazyMount", "destroyOnHide", "rootClassName", "rootComponent", "component", "transition"]);

    delete childProps.mask;
    delete childProps.maskProps;
    delete childProps.maskStyle;
    delete childProps.maskClassName;
    delete childProps.maskComponent;
    delete childProps.maskTransition;
    delete childProps.getPosition;
    var rootProps = {};

    if (RootComponent !== Fragment) {
      var _classnames2;

      rootProps.ref = this.saveRef.bind(this, "popupRoot");
      rootProps.className = classnames((_classnames2 = {}, _classnames2[prefix + "-root"] = true, _classnames2[rootClassName] = rootClassName, _classnames2));
    }

    var classes = classnames((_classnames3 = {}, _classnames3[prefix] = true, _classnames3[prefix + "-fixed"] = fixed, _classnames3[className] = className, _classnames3));
    var pStyle = {};

    if (this.shouldHide()) {
      pStyle.display = "none";
    }

    return React.createElement(TransitionGroupContext.Provider, {
      value: null
    }, React.createElement(RootComponent, null, this.renderPopupMask(), React.createElement(CSSTransition, _extends({
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
      return React.createElement(Component, _extends({}, childProps, {
        ref: _this2.saveRef.bind(_this2, "popup"),
        style: _extends({}, style, {}, pStyle),
        className: classes
      }), typeof children === "function" ? children(status) : children);
    })));
  };

  return Popup;
}(React.Component);

Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  prefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  fixed: PropTypes.bool,
  visible: PropTypes.bool,
  lazyMount: PropTypes.bool,
  transition: PropTypes.object,
  destroyOnHide: PropTypes.bool,
  getPosition: PropTypes.func,
  mask: PropTypes.bool,
  maskStyle: PropTypes.object,
  maskProps: PropTypes.object,
  maskClassName: PropTypes.string,
  maskTransition: PropTypes.object,
  component: PropTypes.elementType,
  maskComponent: PropTypes.elementType,
  rootComponent: PropTypes.elementType,
  // 动画超时时间，建议在transition和maskTransition设置
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
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
  rootComponent: Fragment
};
export default Popup;