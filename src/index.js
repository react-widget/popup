import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import position from 'bplokjs-position';
import Transition from 'react-widget-transition/lib/Transition';

function noop() { }

function isPromiseLike(promise) {
    return promise && typeof promise.then === 'function';
}

const propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    mask: PropTypes.bool,
    maskClassName: PropTypes.string,
    destroyOnHide: PropTypes.bool,
    visible: PropTypes.bool,
    fixed: PropTypes.bool,
    disabledSetPosition: PropTypes.bool,
    onMaskClick: PropTypes.func,
    onMaskMouseDown: PropTypes.func,
    rootComponent: PropTypes.any,
    rootProps: PropTypes.object,
    popupProps: PropTypes.object,
    popupMaskProps: PropTypes.object,
    // popupAnimate: PropTypes.shape({
    //     appear: PropTypes.func,//enter
    //     leave: PropTypes.func	//exit
    // }),
    // popupMaskAnimate: PropTypes.shape({
    //     appear: PropTypes.func,
    //     leave: PropTypes.func
    // }),
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    placement: PropTypes.any,
    transition: PropTypes.object,
    maskTransition: PropTypes.object,
    // jqueryui/position.js
    // of: PropTypes.any,
    // at: PropTypes.any,
    // my: PropTypes.any,
    // collision: PropTypes.any,
    // using: PropTypes.func,
    // within: PropTypes.any,
};

export default class Popup extends React.Component {
    static propTypes = propTypes

    static defaultProps = {
        prefixCls: 'rw-popup',
        rootComponent: React.Fragment,
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
            collision: 'flip', // none flip fit flipfit
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (state.visible || props.visible) {
            return {
                visible: true
            }
        }
        return null;
    }

    state = {
        visible: true,
        enableAnim: true,
        hidden: false,
        exiting: false,
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

    _initAppear = false;
    _of = null
    updatePosition(of = null) {
        // this._of = of;
        // this.setPosition();
        // this._of = null;

        // if (!this._initAppear) {
        //     this.animateAppear();
        // }
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

    // componentWillReceiveProps({ visible }) {
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

    cancelCallback = noop

    componentDidUpdate() {
        this.componentDidMount();
    }

    componentWillUnmount() {
        if (this.state.isHidden) {
            this.state.enableAnim = false;
        }
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

    saveRootDOM = (node) => {
        this._rootDOM = node;
    }

    savePopupDOM = (node) => {
        this._popupDOM = node;
    }

    savePopupMaskDOM = (node) => {
        this._popupMaskDOM = node;
    }

    getRootDOM() {
        return this._rootDOM;
    }

    getPopupDOM() {
        return this._popupDOM;
    }

    getPopupMaskDOM() {
        return this._popupMaskDOM;
    }

    onTransitionChange = (action, ...args) => {
        const props = this.props;
        if (props[action]) {
            props[action](...args);
        }
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
                ref={this.savePopupMaskDOM}
                className={classes}
            ></div> :
            null;
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
            transition,
            destroyOnHide,
            rootComponent: RootComponent
        } = this.props;
        const self = this;

        const classes = classNames(prefixCls, fixed ? prefixCls + '-fixed' : '', className);

        const transitionOpts = Object.assign({}, transition, {
            enter: !!transition,
            exit: !!transition,
            onEntered() {
                if (!destroyOnHide) {
                    const popup = self.getPopupDOM();
                    popup.style.display = '';
                }
                console.log('onEntered', this)
            },
            onExited() {
                if (!destroyOnHide) {
                    const popup = self.getPopupDOM();
                    popup.style.display = 'none';
                }
                console.log('onExited')
            }
        });

        //enter exit
        return (
            <RootComponent>
                {this.renderPopupMask()}
                <Transition
                    timeout={0}
                    {...transitionOpts}
                    in={visible}
                    unmountOnExit={destroyOnHide}
                    mountOnEnter
                    appear
                >
                    <div tabIndex={-1} style={style} {...popupProps} ref={this.savePopupDOM} className={classes}>{children}</div>
                </Transition>
            </RootComponent>
        );
    }

    render() {
        return this.renderPopup();
    }
}