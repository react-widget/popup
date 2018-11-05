
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _bplokjsPosition = _interopRequireDefault(require("bplokjs-position"));

function noop() {}

function isPromiseLike(promise) {
  return promise && typeof promise.then === 'function';
}

var propTypes = {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  mask: _propTypes.default.bool,
  maskClassName: _propTypes.default.string,
  destroyOnHide: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  fixed: _propTypes.default.bool,
  disabledSetPosition: _propTypes.default.bool,
  onMaskClick: _propTypes.default.func,
  onMaskMouseDown: _propTypes.default.func,
  rootComponent: _propTypes.default.any,
  rootProps: _propTypes.default.object,
  popupProps: _propTypes.default.object,
  popupMaskProps: _propTypes.default.object,
  popupAnimate: _propTypes.default.shape({
    appear: _propTypes.default.func,
    //enter
    leave: _propTypes.default.func //exit

  }),
  popupMaskAnimate: _propTypes.default.shape({
    appear: _propTypes.default.func,
    leave: _propTypes.default.func
  }),
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  getPosition: _propTypes.default.func,
  placement: _propTypes.default.func // jqueryui/position.js
  // of: PropTypes.any,
  // at: PropTypes.any,
  // my: PropTypes.any,
  // collision: PropTypes.any,
  // using: PropTypes.func,
  // within: PropTypes.any,

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
      visible: true,
      enableAnim: true,
      hidden: false,
      exiting: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_initAppear", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_of", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "cancelCallback", noop);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "animateAppear", function () {
      var _this$props = _this.props,
          popupAnimate = _this$props.popupAnimate,
          popupMaskAnimate = _this$props.popupMaskAnimate,
          onShow = _this$props.onShow;

      var popup = _this.getPopupDOM(),
          mask = _this.getPopupMaskDOM();

      _this._initAppear = true;

      if (popupAnimate && popupAnimate.appear) {
        popupAnimate.appear(popup);
      }

      if (popupMaskAnimate && popupMaskAnimate.appear) {
        popupMaskAnimate.appear(mask);
      }

      if (onShow) {
        onShow(popup, mask);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "animateLeave", function (node, done) {
      var _this$props2 = _this.props,
          popupAnimate = _this$props2.popupAnimate,
          popupMaskAnimate = _this$props2.popupMaskAnimate,
          onHide = _this$props2.onHide;

      var popup = _this.getPopupDOM(),
          mask = _this.getPopupMaskDOM();

      if (_this.state.enableAnim && popupAnimate && popupAnimate.leave) {
        popupAnimate.leave(popup, done);
      } else {
        done();
      }

      if (_this.state.enableAnim && popupMaskAnimate && popupMaskAnimate.leave) {
        popupMaskAnimate.leave(mask, function () {});
      }

      if (onHide) {
        onHide(popup, mask);
      }
    });
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveRootDOM", function (node) {
      _this._rootDOM = node;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "savePopupDOM", function (node) {
      _this._popupDOM = node;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "savePopupMaskDOM", function (node) {
      _this._popupMaskDOM = node;
    });
    return _this;
  }

  (0, _createClass2.default)(Popup, [{
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
    value: function setPosition(pos) {
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
    value: function updatePosition() {// this._of = of;
      // this.setPosition();
      // this._of = null;
      // if (!this._initAppear) {
      //     this.animateAppear();
      // }

      var of = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var placement = this.props.placement;
      var visible = this.state.visible;

      if (visible) {
        var pos = placement();
        pos = isPromiseLike(pos) ? pos : _promise.default.resolve(pos);
        pos.then(function (opts) {
          var position = _this2.getPosition(opts);

          _this2.setPosition(position.pos);

          _this2.animateAppear();
        });
      }
    } // componentWillReceiveProps({ visible }) {
    //     if (this.state.visible || visible) {
    //         this.setState({
    //             visible: true
    //         });
    //     }
    // }

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_ref) {
      var visible = _ref.visible;
      var state = this.state;
      if (!visible && state.hidden) return false;
      return !!(state.visible || visible);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      var props = this.props;
      var state = this.state;
      var popup = this.getPopupDOM(),
          mask = this.getPopupMaskDOM();
      if (!state.visible) return;

      if (!props.visible) {
        if (state.hidden) return;
        state.exiting = true;
        state.hidden = true;
        var once = false;

        this.cancelCallback = function () {
          if (once) return;
          once = true; //必须使用this.state

          _this3.state.exiting = false;
          _this3.cancelCallback = noop; //此处props可以不用加this

          if (props.destroyOnHide) {
            //设置了shouldComponentUpdate
            //此处必须用forceUpdate更新
            _this3.state.visible = false;

            _this3.forceUpdate();
          } else {
            if (popup) {
              popup.style.display = "none";
            }

            if (mask) {
              mask.style.display = "none";
            }
          }
        };

        this.animateLeave(null, this.cancelCallback);
      } else {
        if (state.exiting) {
          this.cancelCallback();
        }

        var hidden = state.hidden;

        if (hidden) {
          state.hidden = false;

          if (popup) {
            popup.style.display = "";
          }

          if (mask) {
            mask.style.display = "";
          }
        }

        this.showPopup(); //隐藏->显示

        if (hidden) {
          this.animateAppear();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.isHidden) {
        this.state.enableAnim = false;
      }
    }
  }, {
    key: "showPopup",
    value: function showPopup() {
      if (!this.props.disabledSetPosition) {
        this.setPosition();
      }
    }
  }, {
    key: "getRootDOM",
    value: function getRootDOM() {
      return this._rootDOM;
    }
  }, {
    key: "getPopupDOM",
    value: function getPopupDOM() {
      return this._popupDOM;
    }
  }, {
    key: "getPopupMaskDOM",
    value: function getPopupMaskDOM() {
      return this._popupMaskDOM;
    }
  }, {
    key: "getMaskComponent",
    value: function getMaskComponent() {
      var _classNames;

      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          mask = _this$props3.mask,
          maskClassName = _this$props3.maskClassName,
          popupMaskProps = _this$props3.popupMaskProps,
          fixed = _this$props3.fixed;
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mask"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mask-fixed"), fixed), (0, _defineProperty2.default)(_classNames, maskClassName, maskClassName), _classNames));
      return _react.default.createElement("div", (0, _extends2.default)({
        onMouseDown: this.handleMaskMouseDown,
        onClick: this.handleMaskClick
      }, popupMaskProps, {
        ref: this.savePopupMaskDOM,
        className: classes
      }));
    }
  }, {
    key: "getPopupComponent",
    value: function getPopupComponent() {
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          className = _this$props4.className,
          fixed = _this$props4.fixed,
          mask = _this$props4.mask,
          style = _this$props4.style,
          popupProps = _this$props4.popupProps,
          children = _this$props4.children,
          RootComponent = _this$props4.rootComponent;
      var classes = (0, _classnames.default)(prefixCls, fixed ? prefixCls + '-fixed' : '', className);
      return _react.default.createElement(RootComponent, null, mask ? this.getMaskComponent() : null, _react.default.createElement("div", (0, _extends2.default)({
        tabIndex: -1,
        style: style
      }, popupProps, {
        ref: this.savePopupDOM,
        className: classes
      }), children));
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.visible ? this.getPopupComponent() : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.visible || props.visible) {
        return {
          visible: true
        };
      }

      return null;
    }
  }]);
  return Popup;
}(_react.default.Component);

exports.default = Popup;
(0, _defineProperty2.default)(Popup, "propTypes", propTypes);
(0, _defineProperty2.default)(Popup, "defaultProps", {
  prefixCls: 'rw-popup',
  rootComponent: _react.default.Fragment,
  mask: false,
  fixed: false,
  destroyOnHide: true,
  //禁用每次刷新更新位置
  disabledSetPosition: false,
  visible: true,
  placement: function placement() {
    return {
      of: window,
      collision: 'flip' // none flip fit flipfit

    };
  }
});