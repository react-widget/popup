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
    transitionClassNames: classNamesShape,
    maskTransitionClassNames: classNamesShape,

    mask: PropTypes.bool,
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
        rootComponent: Fragment,
        popupComponent: 'div',
        transitionComponent: Transition,
        maskComponent: 'div',
        mountOnEnter: true,
        unmountOnExit: true, // destroyOnHide
        mask: false,
        fixed: false,
        // 禁用每次刷新更新位置
        resetPositionOnUpdate: true,
        // 动画结束收重新更新位置，特殊场景下可能需要
        resetPositionOnEntered: false,
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
    static getDerivedStateFromProps({ placement, visible }, state) {
        placement = isPromiseLike(placement) ? placement : Promise.resolve(placement)
        const beforeCb = [];
        let hasStart = false;
        let deferred = Deferred();
        let promise = deferred.promise;

        function before(cb) {
            beforeCb.push(cb);
        }

        function start(cb) {
            // 防止多次调用
            if (hasStart) {
                placement
                    .then(cb)
                    .catch(e => cb(null))
                return;
            };

            hasStart = true;

            beforeCb.forEach(callback => callback());

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
            shouldComponentUpdate: !visible && !state.shouldComponentUpdate ? false : true,
            before,
            start,
            after: (cb) => {
                //cb();
                return promise = promise.then(cb);
            }
        }
    }

    state = {
        shouldComponentUpdate: false,
        before: null,
        start: null,
        after: null,
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
    /**
     * 
     * @param {boolean} reset 强制刷新 
     */
    updatePosition(reset) {
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

                if (reset || shouldSetPosition) {
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

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.shouldComponentUpdate;
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

    onTransitionIn(action, node, appearing) {
        const { before, after } = this.state;
        const props = this.props;

        before(() => {
            if (!props.unmountOnExit && (action === 'onEnter' || action === 'onMaskEnter')) {
                node.style.display = '';
            }
        });

        before(() => {
            if (
                (action === 'onMaskEnter' && props.maskTransitionClassNames) ||
                (action === 'onEnter' && props.transitionClassNames)
            ) {
                this.removeClasses(node, 'exit', action === 'onMaskEnter');
            }
        })

        after(() => {
            if (/^onMask/.test(action) && props.maskTransitionClassNames) {
                this[action](node, appearing);
            }

            if (!/^onMask/.test(action) && props.transitionClassNames) {
                this[action](node, appearing);
            }

            if (props[action]) {
                props[action](node, appearing);
            }

            if (props.resetPositionOnEntered && action === 'onEntered') {
                this.updatePosition(true);
            }
        });
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

        if (!props.unmountOnExit && (action === 'onExited' || action === 'onMaskExited')) {
            node.style.display = 'none';
        }

        if (action === 'onExited') {
            this.setState({
                shouldComponentUpdate: false
            });
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

                onExit={this.onTransitionOut.bind(this, 'onMaskExit')}
                onExiting={this.onTransitionOut.bind(this, 'onMaskExiting')}
                onExited={this.onTransitionOut.bind(this, 'onMaskExited')}

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

                    onExit={this.onTransitionOut.bind(this, 'onExit')}
                    onExiting={this.onTransitionOut.bind(this, 'onExiting')}
                    onExited={this.onTransitionOut.bind(this, 'onExited')}

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