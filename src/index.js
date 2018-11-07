import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import position from 'bplokjs-position';
import Transition from 'react-widget-transition/lib/Transition';
import warning from 'warning';
import Identity from './Identity';

function noop() { }

function isPromiseLike(promise) {
    return promise && typeof promise.then === 'function';
}

const propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    mask: PropTypes.bool,
    maskClassName: PropTypes.string,
    visible: PropTypes.bool,
    fixed: PropTypes.bool,
    refreshPositionOnUpdate: PropTypes.bool,
    onMaskClick: PropTypes.func,
    onMaskMouseDown: PropTypes.func,
    rootComponent: PropTypes.any,
    popupComponent: PropTypes.any,
    rootProps: PropTypes.object,
    popupProps: PropTypes.object,
    popupMaskProps: PropTypes.object,

    addEndListener: PropTypes.func,
    timeout: PropTypes.any,

    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    mountOnEnter: PropTypes.bool,
    placement: PropTypes.any,
};

export default class Popup extends React.Component {
    static propTypes = propTypes

    static childContextTypes = {
        transitionGroup: () => { },
    }

    static defaultProps = {
        prefixCls: 'rw-popup',
        rootComponent: React.Fragment,
        popupComponent: 'div',
        mask: false,
        fixed: false,
        //禁用每次刷新更新位置
        refreshPositionOnUpdate: false,
        visible: true,
        addEndListener: noop,
        placement: {
            of: window,
            collision: 'flip', // none flip fit flipfit
        }

    }

    // static getDerivedStateFromProps(props, state) {
    //     return {}
    // }

    getChildContext() {
        return { transitionGroup: null }
    }

    getPosition(opts) {
        const result = {};
        const popup = this.getPopupDOM();

        let { of, my, at, collision, using, within } = opts;

        const config = {
            of,
            using: function (pos, feedback) {
                if (using) {
                    using(pos, feedback);
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

        position(popup, config);

        return result;
    }

    setPosition(pos = {}) {
        const popup = this.getPopupDOM();

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

    componentDidMount() {
        const { placement, visible } = this.props;

        if (visible) {
            const pos = isPromiseLike(placement) ? placement : Promise.resolve(placement);

            pos.then(opts => {
                const position = this.getPosition(opts);
                this.setPosition(position.pos);
            });
        }
    }

    componentDidUpdate() {
        const { refreshPositionOnUpdate, visible } = this.props;
        //if (visible && refreshPositionOnUpdate) {
        this.componentDidMount();
        //}
    }

    componentWillUnmount() {
    }


    showPopup() {
        if (!this.props.disabledSetPosition) {
            this.setPosition();
        }
    }

    handleMaskClick = (e) => {
        const { onMaskClick } = this.props;
        if (onMaskClick) {
            onMaskClick(e);
        }
    }

    handleMaskMouseDown = (e) => {
        const { onMaskMouseDown } = this.props;
        if (onMaskMouseDown) {
            onMaskMouseDown(e);
        }
    }

    refPopup = (el) => {
        this._popupRef = el;
    }

    refPopupMask = (el) => {
        this._popupMaskRef = el;
    }

    getRootDOM() {
        return this._rootDOM;
    }

    getPopupDOM() {
        return ReactDOM.findDOMNode(this._popupRef);
    }

    getPopupMaskDOM() {
        return this._popupMaskRef ? ReactDOM.findDOMNode(this._popupMaskRef) : null;
    }

    renderPopupMask() {
        const { prefixCls, mask, maskClassName, popupMaskProps, fixed } = this.props;

        const classes = classNames({
            [`${prefixCls}-mask`]: true,
            [`${prefixCls}-mask-fixed`]: fixed,
            [maskClassName]: maskClassName
        });

        return mask ?
            <div
                onMouseDown={this.handleMaskMouseDown}
                onClick={this.handleMaskClick}
                {...popupMaskProps}
                ref={this.refPopupMask}
                className={classes}
            ></div> :
            null;
    }

    onTransitionChange(action, node, appearing) {
        const props = this.props;
        const pupupMaskDOM = this.getPopupMaskDOM();

        if (props[action]) {
            props[action](node, pupupMaskDOM);
        }

        console.log(action)
    }

    renderPopup() {
        const {
            prefixCls,
            className,
            fixed,
            style,
            popupProps,
            children,
            visible,
            timeout,
            addEndListener,
            rootComponent: RootComponent,
            popupComponent: PopupComponent
        } = this.props;

        const classes = classNames(prefixCls, fixed ? prefixCls + '-fixed' : '', className);

        warning(PopupComponent !== Fragment, `popupComponent receive a Fragment Component!`);

        return (
            <RootComponent>
                {this.renderPopupMask()}
                <Transition
                    timeout={timeout}
                    addEndListener={
                        timeout == null && addEndListener === noop ?
                            (node, cb) => cb() :
                            addEndListener
                    }

                    in={visible}

                    onEnter={this.onTransitionChange.bind(this, 'onEnter')}
                    onEntering={this.onTransitionChange.bind(this, 'onEntering')}
                    onEntered={this.onTransitionChange.bind(this, 'onEntered')}

                    onExit={this.onTransitionChange.bind(this, 'onExit')}
                    onExiting={this.onTransitionChange.bind(this, 'onExiting')}
                    onExited={this.onTransitionChange.bind(this, 'onExited')}

                    unmountOnExit
                    mountOnEnter
                    enter
                    exit
                    appear
                >
                    <PopupComponent
                        tabIndex={-1}
                        style={style}
                        {...popupProps}
                        ref={this.refPopup}
                        className={classes}
                    >
                        {children}
                    </PopupComponent>
                </Transition>
            </RootComponent>
        );
    }

    render() {
        return this.renderPopup();
    }
}