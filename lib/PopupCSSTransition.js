
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _CSSTransition2 = _interopRequireDefault(require("react-transition-group/CSSTransition"));

var _PopupContext = _interopRequireDefault(require("./PopupContext"));

var PopupCSSTransition =
/*#__PURE__*/
function (_CSSTransition) {
  (0, _inheritsLoose2.default)(PopupCSSTransition, _CSSTransition);

  function PopupCSSTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _CSSTransition.call.apply(_CSSTransition, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_onEnter", function (node, appearing) {
      var popup = _this.context;
      var _popup$props = popup.props,
          destroyOnHide = _popup$props.destroyOnHide,
          getPosition = _popup$props.getPosition;

      if (!destroyOnHide) {
        node.style.display = "";
      }

      if (getPosition) {
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

      _this.onEnter(node, appearing);
    });
    return _this;
  }

  var _proto = PopupCSSTransition.prototype;

  _proto.render = function render() {
    var child = _CSSTransition.prototype.render.call(this);

    return _react.default.cloneElement(child, {
      onEnter: this._onEnter
    });
  };

  return PopupCSSTransition;
}(_CSSTransition2.default);

(0, _defineProperty2.default)(PopupCSSTransition, "contextType", _PopupContext.default);
PopupCSSTransition.propTypes = (0, _extends2.default)({}, _CSSTransition2.default.propTypes);
var _default = PopupCSSTransition;
exports.default = _default;