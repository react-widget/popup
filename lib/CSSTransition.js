
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addClass = _interopRequireDefault(require("dom-helpers/class/addClass"));

var _removeClass = _interopRequireDefault(require("dom-helpers/class/removeClass"));

//////////////////////////////////////////////////////////////////
///////////part of react-transition-group/CSSTransition///////////
//////////////////////////////////////////////////////////////////
var addClass = function addClass(node, classes) {
  return node && classes && classes.split(" ").forEach(function (c) {
    return (0, _addClass.default)(node, c);
  });
};

var removeClass = function removeClass(node, classes) {
  return node && classes && classes.split(" ").forEach(function (c) {
    return (0, _removeClass.default)(node, c);
  });
};

var _default = {
  onEnter: function onEnter(node, appearing, mask) {
    var _this$getClassNames = this.getClassNames(appearing ? "appear" : "enter", mask),
        className = _this$getClassNames.className; //this.removeClasses(node, 'exit', mask);


    addClass(node, className);
  },
  onMaskEnter: function onMaskEnter(node, appearing) {
    this.onEnter(node, appearing, true);
  },
  onEntering: function onEntering(node, appearing, mask) {
    var _this$getClassNames2 = this.getClassNames(appearing ? "appear" : "enter", mask),
        activeClassName = _this$getClassNames2.activeClassName;

    this.reflowAndAddClass(node, activeClassName);
  },
  onMaskEntering: function onMaskEntering(node, appearing) {
    this.onEntering(node, appearing, true);
  },
  onEntered: function onEntered(node, appearing, mask) {
    var _this$getClassNames3 = this.getClassNames("enter", mask),
        doneClassName = _this$getClassNames3.doneClassName;

    this.removeClasses(node, appearing ? "appear" : "enter", mask);
    addClass(node, doneClassName);
  },
  onMaskEntered: function onMaskEntered(node, appearing) {
    this.onEntered(node, appearing, true);
  },
  onExit: function onExit(node, mask) {
    var _this$getClassNames4 = this.getClassNames("exit", mask),
        className = _this$getClassNames4.className;

    this.removeClasses(node, "appear", mask);
    this.removeClasses(node, "enter", mask);
    addClass(node, className);
  },
  onMaskExit: function onMaskExit(node) {
    this.onExit(node, true);
  },
  onExiting: function onExiting(node, mask) {
    var _this$getClassNames5 = this.getClassNames("exit", mask),
        activeClassName = _this$getClassNames5.activeClassName;

    this.reflowAndAddClass(node, activeClassName);
  },
  onMaskExiting: function onMaskExiting(node) {
    this.onExiting(node, true);
  },
  onExited: function onExited(node, mask) {
    var _this$getClassNames6 = this.getClassNames("exit", mask),
        doneClassName = _this$getClassNames6.doneClassName;

    this.removeClasses(node, "exit", mask);
    addClass(node, doneClassName);
  },
  onMaskExited: function onMaskExited(node) {
    this.onExited(node, true);
  },
  getClassNames: function getClassNames(type, mask) {
    var classNames = mask ? this.props.maskTransitionClassNames : this.props.transitionClassNames;
    var className = typeof classNames !== "string" ? classNames[type] : classNames + "-" + type;
    var activeClassName = typeof classNames !== "string" ? classNames[type + "Active"] : className + "-active";
    var doneClassName = typeof classNames !== "string" ? classNames[type + "Done"] : className + "-done";
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