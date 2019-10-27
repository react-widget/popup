import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import CSSTransition from "./CSSTransition";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import Transition from "react-transition-group/Transition";
import omit from "lodash/omit";

function noop() {}

const classNamesShape = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        enter: PropTypes.string,
        exit: PropTypes.string,
        active: PropTypes.string
    }),
    PropTypes.shape({
        enter: PropTypes.string,
        enterDone: PropTypes.string,
        enterActive: PropTypes.string,
        exit: PropTypes.string,
        exitDone: PropTypes.string,
        exitActive: PropTypes.string
    })
]);

const propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
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

    mask: PropTypes.bool,
    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    visible: PropTypes.bool,
    fixed: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    resetPositionOnUpdate: PropTypes.bool,
    resetPositionOnEntered: PropTypes.bool,

    rootComponent: PropTypes.any,
    popupComponent: PropTypes.any,
    transitionComponent: PropTypes.any,

    maskComponent: PropTypes.any,
    maskProps: PropTypes.object,

    position: PropTypes.array,
    placement: PropTypes.any, // object func

    setDirectionClassName: PropTypes.bool,

    //translaton
    timeout: PropTypes.any,
    addEndListener: PropTypes.func,
    addMaskEndListener: PropTypes.func,
    enter: PropTypes.bool,
    exit: PropTypes.bool,
    appear: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    onMaskEnter: PropTypes.func,
    onMaskEntering: PropTypes.func,
    onMaskEntered: PropTypes.func,
    onMaskExit: PropTypes.func,
    onMaskExiting: PropTypes.func,
    onMaskExited: PropTypes.func
};

class Popup extends React.Component {
    static propTypes = propTypes;

    static defaultProps = {
        prefixCls: "nex-popup",
        style: {},
        rootComponent: Fragment,
        popupComponent: "div",
        transitionComponent: Transition,
        maskComponent: "div",
        mountOnEnter: true,
        unmountOnExit: true, // destroyOnHide
        setDirectionClassName: true,
        mask: false,
        maskStyle: {},
        fixed: false,
        // 禁用每次刷新更新位置
        resetPositionOnUpdate: true,
        // 动画结束收重新更新位置，特殊场景下可能需要
        resetPositionOnEntered: false,
        visible: true,
        addEndListener: noop,
        addMaskEndListener: noop,
        position: [0, 0],
        placement: {
            of: window,
            collision: "flip" // none flip fit flipfit
        },
        enter: true,
        exit: true,
        appear: true
    };

    /**
     * onEnter onEntering onEntered在updatePosition执行
     */
    static getDerivedStateFromProps({ visible }, state) {
        return {
            shouldComponentUpdate:
                !visible && !state.shouldComponentUpdate ? false : true
        };
    }

    state = {
        shouldComponentUpdate: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.shouldComponentUpdate;
    }

    shouldHide() {
        const { visible, mountOnEnter } = this.props;
        return !visible && !mountOnEnter;
    }

    // componentDidMount() {}

    // componentDidUpdate() {}

    // componentWillUnmount() {}

    refPopup = el => {
        this._popupRef = el;
    };

    refPopupMask = el => {
        this._popupMaskRef = el;
    };

    getRootDOM() {
        return this._rootDOM;
    }

    getPopupDOM() {
        return ReactDOM.findDOMNode(this._popupRef);
    }

    getPopupMaskDOM() {
        return this._popupMaskRef
            ? ReactDOM.findDOMNode(this._popupMaskRef)
            : null;
    }

    onTransitionIn(action, node, appearing) {
        const props = this.props;

        if (
            !props.unmountOnExit &&
            (action === "onEnter" || action === "onMaskEnter")
        ) {
            node.style.display = "";
        }

        if (
            (action === "onMaskEnter" && props.maskTransitionClassNames) ||
            (action === "onEnter" && props.transitionClassNames)
        ) {
            this.removeClasses(node, "exit", action === "onMaskEnter");
        }

        if (/^onMask/.test(action) && props.maskTransitionClassNames) {
            this[action](node, appearing);
        }

        if (!/^onMask/.test(action) && props.transitionClassNames) {
            this[action](node, appearing);
        }

        if (props[action]) {
            props[action](node, appearing);
        }
    }

    onTransitionOut(action, node) {
        const props = this.props;

        if (/^onMask/.test(action) && props.maskTransitionClassNames) {
            this[action](node);
        }

        if (!/^onMask/.test(action) && props.transitionClassNames) {
            this[action](node);
        }

        if (props[action]) {
            props[action](node);
        }

        if (
            !props.unmountOnExit &&
            (action === "onExited" || action === "onMaskExited")
        ) {
            node.style.display = "none";
        }

        if (action === "onExited") {
            this.setState({
                shouldComponentUpdate: false
            });
        }
    }

    renderPopupMask() {
        const {
            prefixCls,
            mask,
            maskClassName,
            maskStyle,
            visible,
            unmountOnExit,
            mountOnEnter,
            maskProps = {},
            fixed,
            timeout,
            enter,
            exit,
            appear,
            addMaskEndListener,
            // transitionComponent: Transition,
            maskComponent: MaskComponent
        } = this.props;

        const cls = classnames({
            [`${prefixCls}-mask`]: true,
            [`${prefixCls}-mask-fixed`]: fixed,
            [maskClassName]: maskClassName
        });

        const mStyle = {};

        if (this.shouldHide()) {
            mStyle.display = "none";
        }

        return (
            <Transition
                timeout={timeout}
                addEndListener={
                    timeout == null && addMaskEndListener === noop
                        ? (node, cb) => cb()
                        : addMaskEndListener
                }
                in={mask && visible}
                onEnter={this.onTransitionIn.bind(this, "onMaskEnter")}
                onEntering={this.onTransitionIn.bind(this, "onMaskEntering")}
                onEntered={this.onTransitionIn.bind(this, "onMaskEntered")}
                onExit={this.onTransitionOut.bind(this, "onMaskExit")}
                onExiting={this.onTransitionOut.bind(this, "onMaskExiting")}
                onExited={this.onTransitionOut.bind(this, "onMaskExited")}
                unmountOnExit={unmountOnExit}
                mountOnEnter={mountOnEnter}
                enter={enter}
                exit={exit}
                appear={appear}
            >
                <MaskComponent
                    {...maskProps}
                    ref={this.refPopupMask}
                    className={cls}
                    style={{
                        ...maskStyle,
                        ...mStyle
                    }}
                />
            </Transition>
        );
    }

    render() {
        const {
            style,
            prefixCls,
            className,
            fixed,
            children,
            visible,
            mountOnEnter,
            unmountOnExit,
            timeout,
            addEndListener,
            rootComponent: RootComponent,
            popupComponent: PopupComponent,
            // transitionComponent: Transition,
            position,
            enter,
            exit,
            appear,
            ...others
        } = this.props;

        const cls = classnames({
            [prefixCls]: true,
            [`${prefixCls}-fixed`]: fixed,
            [className]: className
        });

        const pStyle = {
            left: position[0],
            top: position[1]
        };

        if (this.shouldHide()) {
            pStyle.display = "none";
        }

        return (
            <TransitionGroupContext.Provider value={null}>
                <RootComponent>
                    {this.renderPopupMask()}
                    <Transition
                        timeout={timeout}
                        addEndListener={
                            timeout == null && addEndListener === noop
                                ? (node, cb) => cb()
                                : addEndListener
                        }
                        in={visible}
                        onEnter={this.onTransitionIn.bind(this, "onEnter")}
                        onEntering={this.onTransitionIn.bind(
                            this,
                            "onEntering"
                        )}
                        onEntered={this.onTransitionIn.bind(this, "onEntered")}
                        onExit={this.onTransitionOut.bind(this, "onExit")}
                        onExiting={this.onTransitionOut.bind(this, "onExiting")}
                        onExited={this.onTransitionOut.bind(this, "onExited")}
                        unmountOnExit={unmountOnExit}
                        mountOnEnter={mountOnEnter}
                        enter={enter}
                        exit={exit}
                        appear={appear}
                    >
                        {status => {
                            return (
                                <PopupComponent
                                    {...omit(others, Object.keys(propTypes))}
                                    style={{
                                        ...style,
                                        ...pStyle
                                    }}
                                    ref={this.refPopup}
                                    className={cls}
                                >
                                    {typeof children === "function"
                                        ? children(status)
                                        : children}
                                </PopupComponent>
                            );
                        }}
                    </Transition>
                </RootComponent>
            </TransitionGroupContext.Provider>
        );
    }
}

Object.assign(Popup.prototype, CSSTransition);

export default Popup;
