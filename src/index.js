import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import position from 'bplokjs-position';

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
    popupAnimate: PropTypes.shape({
        appear: PropTypes.func,//enter
        leave: PropTypes.func	//exit
    }),
    popupMaskAnimate: PropTypes.shape({
        appear: PropTypes.func,
        leave: PropTypes.func
    }),
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    getPosition: PropTypes.func,
    placement: PropTypes.any,
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

    setPosition(pos) {
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
        const { placement } = this.props;
        const { visible } = this.state;

        if (visible) {
            const pos = isPromiseLike(placement) ? placement : Promise.resolve(placement);

            pos.then(opts => {
                const position = this.getPosition(opts);
                this.setPosition(position.pos);
                this.animateAppear();
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

    shouldComponentUpdate({ visible }) {
        const state = this.state;

        if (!visible && state.hidden) return false;

        return !!(state.visible || visible);
    }

    cancelCallback = noop

    componentDidUpdate() {
        const props = this.props;
        const state = this.state;
        const popup = this.getPopupDOM(), mask = this.getPopupMaskDOM();

        if (!state.visible) return;

        if (!props.visible) {
            if (state.hidden) return;

            state.exiting = true;
            state.hidden = true;

            let once = false;
            this.cancelCallback = () => {
                if (once) return;
                once = true;
                //必须使用this.state
                this.state.exiting = false;
                this.cancelCallback = noop;
                //此处props可以不用加this
                if (props.destroyOnHide) {
                    //设置了shouldComponentUpdate
                    //此处必须用forceUpdate更新
                    this.state.visible = false;
                    this.forceUpdate();
                } else {
                    if (popup) {
                        popup.style.display = "none";
                    }
                    if (mask) {
                        mask.style.display = "none";
                    }
                }
            }

            this.animateLeave(null, this.cancelCallback);

        } else {
            if (state.exiting) {
                this.cancelCallback();
            }

            const hidden = state.hidden;

            if (hidden) {
                state.hidden = false;
                if (popup) {
                    popup.style.display = "";
                }
                if (mask) {
                    mask.style.display = "";
                }
            }

            this.showPopup();
            //隐藏->显示
            if (hidden) {
                this.animateAppear();
            }
        }
    }

    componentWillUnmount() {
        if (this.state.isHidden) {
            this.state.enableAnim = false;
        }
    }

    animateAppear = () => {
        const { popupAnimate, popupMaskAnimate, onShow } = this.props;
        const popup = this.getPopupDOM(), mask = this.getPopupMaskDOM();

        this._initAppear = true;

        if (popupAnimate && popupAnimate.appear) {
            popupAnimate.appear(popup);
        }

        if (popupMaskAnimate && popupMaskAnimate.appear) {
            popupMaskAnimate.appear(mask);
        }

        if (onShow) {
            onShow(popup, mask)
        }
    }

    animateLeave = (node, done) => {
        const { popupAnimate, popupMaskAnimate, onHide } = this.props;
        const popup = this.getPopupDOM(), mask = this.getPopupMaskDOM();

        if (this.state.enableAnim && popupAnimate && popupAnimate.leave) {
            popupAnimate.leave(popup, done);
        } else {
            done();
        }

        if (this.state.enableAnim && popupMaskAnimate && popupMaskAnimate.leave) {
            popupMaskAnimate.leave(mask, () => { });
        }

        if (onHide) {
            onHide(popup, mask)
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

    getMaskComponent() {
        const { prefixCls, mask, maskClassName, popupMaskProps, fixed } = this.props;

        const classes = classNames({
            [`${prefixCls}-mask`]: true,
            [`${prefixCls}-mask-fixed`]: fixed,
            [maskClassName]: maskClassName
        });

        return (
            <div onMouseDown={this.handleMaskMouseDown} onClick={this.handleMaskClick} {...popupMaskProps} ref={this.savePopupMaskDOM} className={classes}></div>
        );
    }

    getPopupComponent() {
        const {
            prefixCls,
            className,
            fixed,
            mask,
            style,
            popupProps,
            children,
            rootComponent: RootComponent
        } = this.props;

        const classes = classNames(prefixCls, fixed ? prefixCls + '-fixed' : '', className);

        return (
            <RootComponent>
                {mask ? this.getMaskComponent() : null}
                <div tabIndex={-1} style={style} {...popupProps} ref={this.savePopupDOM} className={classes}>{children}</div>
            </RootComponent>
        );
    }

    render() {
        return this.state.visible ? this.getPopupComponent() : null;
    }
}