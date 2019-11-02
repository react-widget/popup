import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import { EXITED } from "react-transition-group/Transition";
import CSSTransition from "react-transition-group/CSSTransition";
// import PopupCSSTransition from "./PopupCSSTransition";
// import PopupContext from "./PopupContext";

class Popup extends React.Component {
    transitionStatus = EXITED;

    shouldComponentUpdate(nextProps, nextState) {
        const status = this.transitionStatus;
        return !(EXITED === status && !nextProps.visible);
    }

    shouldHide() {
        const { lazyMount, visible } = this.props;
        return !visible && !lazyMount;
    }

    _refs = {};
    saveRef(key, component) {
        this._refs[key] = component;
    }

    getPopupRootDOM() {
        return ReactDOM.findDOMNode(this._refs["popupRoot"]);
    }

    getPopupDOM() {
        return ReactDOM.findDOMNode(this._refs["popup"]);
    }

    getPopupMaskDOM() {
        return ReactDOM.findDOMNode(this._refs["popupMask"]);
    }

    onEnter({ onEnter }, isMask, node, appearing) {
        const { destroyOnHide, getPosition } = this.props;

        if (onEnter) {
            onEnter(node, appearing);
        }

        if (!destroyOnHide) {
            node.style.display = "";
        }

        if (!isMask && getPosition) {
            const pos = getPosition(node);
            const transform = v => (typeof v === "number" ? `${v}px` : v);

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
    }

    onExited({ onExited }, isMask, node) {
        const { destroyOnHide } = this.props;

        if (onExited) {
            onExited(node);
        }

        if (!destroyOnHide) {
            node.style.display = "none";
        }
    }

    renderPopupMask() {
        const {
            prefix,
            visible,
            mask,
            maskProps,
            maskStyle,
            maskClassName,
            maskTransition,
            lazyMount,
            destroyOnHide,
            fixed,
            timeout,
            maskComponent: MaskComponent
        } = this.props;

        const classes = classnames({
            [`${prefix}-mask`]: true,
            [`${prefix}-mask-fixed`]: fixed,
            [maskProps.className]: maskProps.className,
            [maskClassName]: maskClassName
        });

        const mStyle = {};

        if (this.shouldHide()) {
            mStyle.display = "none";
        }

        return (
            <CSSTransition
                enter
                exit
                appear
                classNames={{}}
                timeout={timeout}
                addEndListener={(_, cb) => timeout == null && cb()}
                {...maskTransition}
                in={mask && visible}
                onEnter={this.onEnter.bind(this, maskTransition, true)}
                onExited={this.onExited.bind(this, maskTransition, true)}
                unmountOnExit={destroyOnHide}
                mountOnEnter={lazyMount}
            >
                <MaskComponent
                    {...maskProps}
                    ref={this.saveRef.bind(this, "popupMask")}
                    style={{
                        ...maskStyle,
                        ...mStyle
                    }}
                    className={classes}
                />
            </CSSTransition>
        );
    }

    render() {
        const {
            style,
            prefix,
            className,
            fixed,
            timeout,
            visible,
            children,
            lazyMount,
            destroyOnHide,
            rootClassName,
            rootComponent: RootComponent,
            component: Component,
            transition,
            ...childProps
        } = this.props;

        delete childProps.mask;
        delete childProps.maskProps;
        delete childProps.maskStyle;
        delete childProps.maskClassName;
        delete childProps.maskComponent;
        delete childProps.maskTransition;
        delete childProps.getPosition;

        const rootProps = {};
        if (RootComponent !== Fragment) {
            rootProps.ref = this.saveRef.bind(this, "popupRoot");
            rootProps.className = classnames({
                [`${prefix}-root`]: true,
                [rootClassName]: rootClassName
            });
        }

        const classes = classnames({
            [prefix]: true,
            [`${prefix}-fixed`]: fixed,
            [className]: className
        });

        const pStyle = {};

        if (this.shouldHide()) {
            pStyle.display = "none";
        }

        return (
            // <PopupContext.Provider value={this}>
            <TransitionGroupContext.Provider value={null}>
                <RootComponent>
                    {this.renderPopupMask()}
                    <CSSTransition
                        enter
                        exit
                        appear
                        classNames={{}}
                        timeout={timeout}
                        addEndListener={(_, cb) => timeout == null && cb()}
                        {...transition}
                        in={visible}
                        onEnter={this.onEnter.bind(this, transition, false)}
                        onExited={this.onExited.bind(this, transition, false)}
                        unmountOnExit={destroyOnHide}
                        mountOnEnter={lazyMount}
                    >
                        {status => {
                            this.transitionStatus = status;
                            return (
                                <Component
                                    {...childProps}
                                    ref={this.saveRef.bind(this, "popup")}
                                    style={{
                                        ...style,
                                        ...pStyle
                                    }}
                                    className={classes}
                                >
                                    {typeof children === "function"
                                        ? children(status)
                                        : children}
                                </Component>
                            );
                        }}
                    </CSSTransition>
                </RootComponent>
            </TransitionGroupContext.Provider>
            // </PopupContext.Provider>
        );
    }
}

Popup.propTypes = {
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
};

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
