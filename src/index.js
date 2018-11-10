import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import position from 'bplokjs-position';
import CSSTransition from './CSSTransition';
import Transition from 'react-widget-transition/lib/Transition';
import warning from 'warning';
import omit from 'object.omit';
import Deferred from 'bplokjs-deferred'

function noop() { }

function isPromiseLike(promise) {
    return promise && typeof promise.then === 'function';
}


const classNamesShape = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        enter: PropTypes.string,
        exit: PropTypes.string,
        active: PropTypes.string,
    }),
    PropTypes.shape({
        enter: PropTypes.string,
        enterDone: PropTypes.string,
        enterActive: PropTypes.string,
        exit: PropTypes.string,
        exitDone: PropTypes.string,
        exitActive: PropTypes.string,
    }),
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
    classNames: classNamesShape,
    maskClassNames: classNamesShape,

    mask: PropTypes.bool,
    visible: PropTypes.bool,
    fixed: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    resetPositionOnUpdate: PropTypes.bool,

    rootComponent: PropTypes.any,
    popupComponent: PropTypes.any,
    transitionComponent: PropTypes.any,

    maskComponent: PropTypes.any,
    maskProps: PropTypes.object,

    placement: PropTypes.any,// object func

    //translaton
    timeout: PropTypes.any,
    addEndListener: PropTypes.func,
    addMaskEndListener: PropTypes.func,
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
    onMaskExited: PropTypes.func,
};

class Popup extends React.Component {
    static propTypes = propTypes

    static childContextTypes = {
        transitionGroup: () => { },
    }

    static defaultProps = {
        prefixCls: 'rw-popup',
        rootComponent: React.Fragment,
        popupComponent: 'div',
        transitionComponent: Transition,
        maskComponent: 'div',
        mountOnEnter: true,
        unmountOnExit: true, // destroyOnHide
        mask: false,
        fixed: false,
        //禁用每次刷新更新位置
        resetPositionOnUpdate: true,
        visible: true,
        addEndListener: noop,
        addMaskEndListener: noop,
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
                    if (typeof opts === 'function') {
                        opts(this.getPopupDOM());
                    } else {
                        const position = this.getPosition(opts);
                        this.setPosition(position.pos);
                    }
                    this._hasSetPosition = true;
                }

            });
        }
    }

    componentDidMount() {
        const props = this.props;

        if (!props.visible && !props.mountOnEnter) {
            const popupDOM = this.getPopupDOM();
            const popupMaskDOM = this.getPopupMaskDOM();

            popupDOM && (popupDOM.style.display = 'none');

            popupMaskDOM && (popupMaskDOM.style.display = 'none');
        }

        this.updatePosition();
    }

    componentDidUpdate() {
        this.updatePosition();
    }

    componentWillUnmount() { }

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

    onTransitionIn(action, ...args) {
        const { then } = this.state;
        const props = this.props;

        if (!props.unmountOnExit && (action === 'onEnter' || action === 'onMaskEnter')) {
            args[0].style.display = '';
        }

        then(() => {

            if (/^onMask/.test(action) && props.maskClassNames) {
                this[action](...args);
            }

            if (!/^onMask/.test(action) && props.classNames) {
                this[action](...args);
            }

            if (props[action]) {
                props[action](...args);
            }
        });
    }

    onTransitionChange(action, ...args) {
        const props = this.props;

        if (!props.unmountOnExit && (action === 'onExited' || action === 'onMaskExited')) {
            args[0].style.display = 'none';
        }

        if (/^onMask/.test(action) && props.maskClassNames) {
            this[action](...args);
        }

        if (!/^onMask/.test(action) && props.classNames) {
            this[action](...args);
        }

        if (props[action]) {
            props[action](...args);
        }
    }

    renderPopupMask() {
        const {
            prefixCls,
            mask,
            visible,
            unmountOnExit,
            mountOnEnter,
            maskProps = {},
            fixed,
            timeout,
            addMaskEndListener,
            transitionComponent: Transition,
            maskComponent: MaskComponent
        } = this.props;

        const cls = classnames({
            [`${prefixCls}-mask`]: true,
            [`${prefixCls}-mask-fixed`]: fixed,
            [maskProps.className]: maskProps.className
        });

        return (
            <Transition
                timeout={timeout}
                addEndListener={
                    timeout == null && addMaskEndListener === noop ?
                        (node, cb) => cb() :
                        addMaskEndListener
                }

                in={mask && visible}

                onEnter={this.onTransitionIn.bind(this, 'onMaskEnter')}
                onEntering={this.onTransitionIn.bind(this, 'onMaskEntering')}
                onEntered={this.onTransitionIn.bind(this, 'onMaskEntered')}

                onExit={this.onTransitionChange.bind(this, 'onMaskExit')}
                onExiting={this.onTransitionChange.bind(this, 'onMaskExiting')}
                onExited={this.onTransitionChange.bind(this, 'onMaskExited')}

                unmountOnExit={unmountOnExit}
                mountOnEnter={mountOnEnter}
                enter
                exit
                appear
            >
                <MaskComponent
                    {...maskProps}
                    ref={this.refPopupMask}
                    className={cls}
                />
            </Transition>
        );
    }

    renderPopup() {
        const {
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
            transitionComponent: Transition,
            ...others
        } = this.props;

        const cls = classnames({
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

                    unmountOnExit={unmountOnExit}
                    mountOnEnter={mountOnEnter}
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

Object.assign(Popup.prototype, CSSTransition);

export default Popup;