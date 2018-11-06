
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

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

var _bplokjsPosition = _interopRequireDefault(require("bplokjs-position"));

var _Transition = _interopRequireDefault(require("react-widget-transition/lib/Transition"));

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
  // popupAnimate: PropTypes.shape({
  //     appear: PropTypes.func,//enter
  //     leave: PropTypes.func	//exit
  // }),
  // popupMaskAnimate: PropTypes.shape({
  //     appear: PropTypes.func,
  //     leave: PropTypes.func
  // }),
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  placement: _propTypes.default.any,
  transition: _propTypes.default.object,
  maskTransition: _propTypes.default.object // jqueryui/position.js
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

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Popup)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: true,
      enableAnim: true,
      hidden: false,
      exiting: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_initAppear", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_of", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "cancelCallback", noop);
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onTransitionChange", function (action) {
      var props = _this.props;

      if (props[action]) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        props[action].apply(props, args);
      }
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

      var _this$props = this.props,
          placement = _this$props.placement,
          visible = _this$props.visible;

      if (visible) {
        var pos = isPromiseLike(placement) ? placement : _promise.default.resolve(placement);
        pos.then(function (opts) {
          var position = _this2.getPosition(opts);

          _this2.setPosition(position.pos);
        });
      }
    } // componentWillReceiveProps({ visible }) {
    //     if (this.state.visible || visible) {
    //         this.setState({
    //             visible: true
    //         });
    //     }
    // }
    // shouldComponentUpdate({ visible }) {
    //     const state = this.state;
    //     if (!visible && state.hidden) return false;
    //     return !!(state.visible || visible);
    // }

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.componentDidMount();
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
        ref: this.savePopupMaskDOM,
        className: classes
      })) : null;
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
          transition = _this$props3.transition,
          destroyOnHide = _this$props3.destroyOnHide,
          RootComponent = _this$props3.rootComponent;
      var self = this;
      var classes = (0, _classnames.default)(prefixCls, fixed ? prefixCls + '-fixed' : '', className);
      var transitionOpts = (0, _assign.default)({}, transition, {
        enter: !!transition,
        exit: !!transition,
        onEntered: function onEntered() {
          if (!destroyOnHide) {
            var popup = self.getPopupDOM();
            popup.style.display = '';
          }

          console.log('onEntered', this);
        },
        onExited: function onExited() {
          if (!destroyOnHide) {
            var popup = self.getPopupDOM();
            popup.style.display = 'none';
          }

          console.log('onExited');
        }
      }); //enter exit

      return _react.default.createElement(RootComponent, null, this.renderPopupMask(), _react.default.createElement(_Transition.default, (0, _extends2.default)({
        timeout: 0
      }, transitionOpts, {
        in: visible,
        unmountOnExit: destroyOnHide,
        mountOnEnter: true,
        appear: true
      }), _react.default.createElement("div", (0, _extends2.default)({
        tabIndex: -1,
        style: style
      }, popupProps, {
        ref: this.savePopupDOM,
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
  transition: null,
  maskTransition: null,
  visible: true,
  placement: {
    of: window,
    collision: 'flip' // none flip fit flipfit

  }
});