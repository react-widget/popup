
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var Identity =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Identity, _React$Component);

  function Identity() {
    (0, _classCallCheck2.default)(this, Identity);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Identity).apply(this, arguments));
  }

  (0, _createClass2.default)(Identity, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.shouldUpdate;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return Identity;
}(_react.default.Component);

exports.default = Identity;