import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import { EXITED } from "react-transition-group/Transition";
import CSSTransition from "react-transition-group/CSSTransition";

class Popup extends React.Component {
    transitionStatus = EXITED;

    shouldComponentUpdate(nextProps, nextState) {
        const status = this.transitionStatus;
        return !(EXITED === status && !nextProps.visible);
    }

    shouldHide() {
        const { visible, lazyMount } = this.props;
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

    onEnter({ onEnter }, node, appearing) {
        const { destroyOnHide } = this.props;

        if (onEnter) {
            onEnter(node, appearing);
        }

        if (!destroyOnHide) {
            node.style.display = "";
        }
    }

    onExited({ onExited }, node) {
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
            maskTransition,
            mask,
            maskProps,
            maskClassName,
            maskStyle,
            visible,
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
                addEndListener={(_, cb) => cb()}
                {...maskTransition}
                in={mask && visible}
                onEnter={this.onEnter.bind(this, maskTransition)}
                onExited={this.onExited.bind(this, maskTransition)}
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
            children,
            visible,
            lazyMount,
            destroyOnHide,
            popupRootClassName,
            popupRootComponent: PopupRootComponent,
            popupComponent: PopupComponent,
            transition,
            ...childProps
        } = this.props;

        delete childProps.mask;
        delete childProps.maskProps;
        delete childProps.maskStyle;
        delete childProps.maskClassName;
        delete childProps.maskComponent;
        delete childProps.maskTransition;

        const popupRootProps = {};
        if (PopupRootComponent !== Fragment) {
            popupRootProps.ref = this.saveRef.bind(this, "popupRoot");
            popupRootProps.className = classnames({
                [`${prefix}-root`]: true,
                [popupRootClassName]: popupRootClassName
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
            <TransitionGroupContext.Provider value={null}>
                <PopupRootComponent>
                    {this.renderPopupMask()}
                    <CSSTransition
                        enter
                        exit
                        appear
                        classNames={{}}
                        timeout={timeout}
                        addEndListener={(_, cb) => cb()}
                        {...transition}
                        in={visible}
                        onEnter={this.onEnter.bind(this, transition)}
                        onExited={this.onExited.bind(this, transition)}
                        unmountOnExit={destroyOnHide}
                        mountOnEnter={lazyMount}
                    >
                        {status => {
                            this.transitionStatus = status;
                            return (
                                <PopupComponent
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
                                </PopupComponent>
                            );
                        }}
                    </CSSTransition>
                </PopupRootComponent>
            </TransitionGroupContext.Provider>
        );
    }
}

Popup.propTypes = {
    prefix: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    popupRootClassName: PropTypes.string,

    fixed: PropTypes.bool,
    visible: PropTypes.bool,
    lazyMount: PropTypes.bool,
    transition: PropTypes.object,
    destroyOnHide: PropTypes.bool,

    mask: PropTypes.bool,
    maskStyle: PropTypes.object,
    maskProps: PropTypes.object,
    maskClassName: PropTypes.string,
    maskComponent: PropTypes.elementType,
    maskTransition: PropTypes.object,

    popupComponent: PropTypes.elementType,
    popupRootComponent: PropTypes.elementType,

    // 动画超时时间，建议在transition和maskTransition设置
    timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};

Popup.defaultProps = {
    prefix: "nex-popup",
    style: {},
    className: "",
    popupRootClassName: "",

    fixed: false,
    visible: true,
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
    maskComponent: "div",
    //popupMask动画配置参数参考react-transition-group
    //http://reactcommunity.org/react-transition-group/css-transition
    maskTransition: {},

    popupComponent: "div",
    popupRootComponent: Fragment
};

export default Popup;
