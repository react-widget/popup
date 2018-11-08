import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import position from 'bplokjs-position';
import Transition from 'react-widget-transition/lib/Transition';
import warning from 'warning';
import omit from 'object.omit';
import Deferred from 'bplokjs-deferred'

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
    resetPositionOnUpdate: PropTypes.bool,
    rootComponent: PropTypes.any,
    popupComponent: PropTypes.any,

    maskProps: PropTypes.object,

    onMaskClick: PropTypes.func,
    onMaskMouseDown: PropTypes.func,


    placement: PropTypes.any,
    //translaton
    timeout: PropTypes.any,
    addEndListener: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
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
        resetPositionOnUpdate: true,
        visible: true,
        addEndListener: noop,
        placement: {
            of: window,
            collision: 'flip', // none flip fit flipfit
        }

    }

    /**
     * onEnter onEntering onEntered在updatePosition执行
     */
    static getDerivedStateFromProps({ placement }, state) {

        placement = isPromiseLike(placement) ? placement : Promise.resolve(placement)
        let deferred = Deferred();
        let promise = deferred.promise;

        function start(cb) {
            placement
                .then(opts => {
                    cb(opts);
                    deferred.resolve();
                })
                .catch(e => {
                    cb(null);
                    deferred.resolve();
                })
        }

        return {
            start,
            then: (cb) => {
                return promise = promise.then(cb);
            }
        }
    }

    state = {
        start: null,
        then: null,
    }

    _hasSetPosition = false;

    getChildContext() {
        return { transitionGroup: null }
    }

    getPosition(opts) {
        const result = {};
        const popup = this.getPopupDOM();

        let { of, my, at, collision, using, within } = opts;

        if (typeof of === 'function') {
            of = of(popup);
        }

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
            popup.style.left = ~~pos.left + 'px';
        }
        if ('top' in pos) {
            popup.style.top = ~~pos.top + 'px';
        }
        if ('right' in pos) {
            popup.style.right = ~~pos.right + 'px';
        }
        if ('bottom' in pos) {
            popup.style.bottom = ~~pos.bottom + 'px';
        }
    }

    updatePosition() {
        const { visible, resetPositionOnUpdate } = this.props;
        const { start } = this.state;

        if (visible) {
            start(opts => {
                if (opts == null) return;

                let shouldSetPosition = resetPositionOnUpdate ?
                    true :
                    this._hasSetPosition ?
                        resetPositionOnUpdate :
                        true;

                if (shouldSetPosition) {
                    const position = this.getPosition(opts);
                    this.setPosition(position.pos);
                    this._hasSetPosition = true;
                }

            });
        }
    }

    componentDidMount() {
        this.updatePosition();
    }

    componentDidUpdate() {
        this.updatePosition();
    }

    componentWillUnmount() { }

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

    onTransitionChange(action, node) {
        const props = this.props;
        const pupupMaskDOM = this.getPopupMaskDOM();

        if (props[action]) {
            props[action](node, pupupMaskDOM);
        }
    }

    onTransitionIn(action, node) {
        const { then } = this.state;
        const props = this.props;
        const pupupMaskDOM = this.getPopupMaskDOM();

        then(() => {
            if (props[action]) {
                props[action](node, pupupMaskDOM);
            }
        });
    }

    renderPopup() {
        const {
            prefixCls,
            className,
            fixed,
            children,
            visible,
            timeout,
            addEndListener,
            rootComponent: RootComponent,
            popupComponent: PopupComponent,
            ...others
        } = this.props;

        const cls = classNames({
            [prefixCls]: true,
            [`${prefixCls}-fixed`]: fixed,
            [className]: className
        });

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

                    onEnter={this.onTransitionIn.bind(this, 'onEnter')}
                    onEntering={this.onTransitionIn.bind(this, 'onEntering')}
                    onEntered={this.onTransitionIn.bind(this, 'onEntered')}

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
                        {...omit(others, Object.keys(propTypes))}
                        ref={this.refPopup}
                        className={cls}
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