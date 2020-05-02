import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import Transition, { EXITED, TransitionStatus } from "react-transition-group/Transition";
import CSSTransition, { CSSTransitionProps } from "react-transition-group/CSSTransition";

export const version = "%VERSION%";

export interface PopupProps extends React.HTMLAttributes<any> {
	prefixCls: string;
	style: React.CSSProperties;
	className: string;
	rootClassName: string;
	rootStyle: React.CSSProperties;
	rootProps: React.HTMLAttributes<any>;

	visible: boolean;
	fixed: boolean;
	lazyMount: boolean;
	transition: CSSTransitionProps;
	destroyOnClose: boolean;
	getPosition?: (
		dom: HTMLElement
	) => {
		top?: number | string;
		left?: number | string;
		right?: number | string;
		bottom?: number | string;
	};

	mask: boolean;
	maskStyle: React.CSSProperties;
	maskProps: React.HTMLAttributes<any>;
	maskClassName: string;
	maskTransition: CSSTransitionProps;

	component: React.ElementType;
	maskComponent: React.ElementType;
	rootComponent: React.ElementType;

	wrapContent: (node: React.ReactNode) => React.ReactNode;
}

export class Popup extends React.Component<PopupProps, {}> {
	static defaultProps = {
		prefixCls: "rw-popup",
		style: {},
		className: "",
		rootClassName: "",
		rootStyle: {},
		rootProps: {},

		visible: false,
		fixed: false,
		//初始未显示的情况下不渲染组件，作用同react-transition-group的mountOnEnter
		lazyMount: true,
		//popup动画配置参数参考react-transition-group
		//http://reactcommunity.org/react-transition-group/css-transition
		transition: {},
		//visible=false时移除组件，作用同react-transition-group的unmountOnExit
		destroyOnClose: true,

		mask: false,
		maskStyle: {},
		maskProps: {},
		maskClassName: "",
		//popupMask动画配置参数参考react-transition-group
		//http://reactcommunity.org/react-transition-group/css-transition
		maskTransition: {},

		component: "div",
		maskComponent: "div",
		rootComponent: Fragment,

		wrapContent: (node: React.ReactNode) => {
			return node;
		},
	};

	protected transitionStatus: TransitionStatus = EXITED;

	shouldComponentUpdate(nextProps: PopupProps) {
		const status = this.transitionStatus;
		return !(EXITED === status && !nextProps.visible);
	}

	shouldHide() {
		const { lazyMount, visible } = this.props;
		return !visible && !lazyMount;
	}

	protected _refs: Record<string, React.ReactInstance | null> = {};

	saveRef(key: string, component: React.ReactInstance | null) {
		this._refs[key] = component;
	}

	getPopupRootDOM(): React.ReactInstance {
		return ReactDOM.findDOMNode(this._refs["popupRoot"]);
	}

	getPopupDOM() {
		return ReactDOM.findDOMNode(this._refs["popup"]);
	}

	getPopupMaskDOM(): React.ReactInstance {
		return ReactDOM.findDOMNode(this._refs["popupMask"]);
	}

	onEnter(
		{ onEnter }: CSSTransitionProps,
		isMask: boolean,
		node: HTMLElement,
		appearing: boolean
	) {
		const { destroyOnClose, getPosition } = this.props;

		if (!destroyOnClose) {
			node.style.display = "";
		}

		if (!isMask && getPosition) {
			const pos = getPosition(node);
			const transform = (v?: number | string): any => (typeof v === "number" ? `${v}px` : v);

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

		if (onEnter) {
			onEnter(node, appearing);
		}
	}

	onExited({ onExited }: CSSTransitionProps, isMask: boolean, node: HTMLElement) {
		const { destroyOnClose } = this.props;

		if (!destroyOnClose) {
			node.style.display = "none";
		}

		if (onExited) {
			onExited(node);
		}
	}

	renderPopupMask() {
		const {
			prefixCls,
			visible,
			mask,
			maskProps,
			maskStyle,
			maskClassName,
			maskTransition,
			lazyMount,
			destroyOnClose,
			fixed,
			maskComponent: MaskComponent,
		} = this.props;

		const classes: string = classnames(
			{
				[`${prefixCls}-mask`]: true,
				[`${prefixCls}-mask-fixed`]: fixed,
			},
			maskProps.className,
			maskClassName
		);

		const mStyle: React.CSSProperties = {};

		if (this.shouldHide()) {
			mStyle.display = "none";
		}

		const TransitionComponent = maskTransition.classNames ? CSSTransition : Transition;

		return (
			<TransitionComponent
				enter
				exit
				appear
				// classNames={{}}
				// timeout={timeout}
				addEndListener={(_, cb) => maskTransition.timeout == null && cb()}
				{...maskTransition}
				in={mask && visible}
				onEnter={this.onEnter.bind(this, maskTransition, true)}
				onExited={this.onExited.bind(this, maskTransition, true)}
				unmountOnExit={destroyOnClose}
				mountOnEnter={lazyMount}
			>
				<MaskComponent
					{...maskProps}
					ref={this.saveRef.bind(this, "popupMask")}
					style={{
						...maskStyle,
						...maskProps.style,
						...mStyle,
					}}
					className={classes}
				/>
			</TransitionComponent>
		);
	}

	render() {
		const {
			style,
			prefixCls,
			className,
			fixed,
			visible,
			children,
			lazyMount,
			destroyOnClose,
			rootClassName,
			rootStyle,
			rootProps,
			rootComponent: RootComponent,
			component: Component,
			transition,
			wrapContent,
			...childProps
		} = this.props;

		delete childProps.mask;
		delete childProps.maskProps;
		delete childProps.maskStyle;
		delete childProps.maskClassName;
		delete childProps.maskComponent;
		delete childProps.maskTransition;
		delete childProps.getPosition;

		let rootComponentProps: {} = {
			...rootProps,
			className: classnames(rootClassName, rootProps.className),
			style: {
				...rootStyle,
				...rootProps.style,
			},
			ref: this.saveRef.bind(this, "popupRoot"),
		};
		if (RootComponent === Fragment) {
			rootComponentProps = {
				ref: this.saveRef.bind(this, "popupRoot"),
			};
		}

		const classes: string = classnames({
			[prefixCls]: true,
			[`${prefixCls}-fixed`]: fixed,
			[className]: className,
		});

		const pStyle: React.CSSProperties = {};

		if (this.shouldHide()) {
			pStyle.display = "none";
		}

		const TransitionComponent = transition.classNames ? CSSTransition : Transition;

		const popup = (
			<RootComponent {...rootComponentProps}>
				{this.renderPopupMask()}
				{wrapContent(
					<TransitionComponent
						enter
						exit
						appear
						addEndListener={(_, cb) => transition.timeout == null && cb()}
						{...transition}
						in={visible}
						onEnter={this.onEnter.bind(this, transition, false)}
						onExited={this.onExited.bind(this, transition, false)}
						unmountOnExit={destroyOnClose}
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
										...pStyle,
									}}
									className={classes}
								>
									{typeof children === "function" ? children(status) : children}
								</Component>
							);
						}}
					</TransitionComponent>
				)}
			</RootComponent>
		);

		return (
			<TransitionGroupContext.Provider value={null}>
				<Transition
					enter
					exit
					appear
					addEndListener={
						transition.addEndListener || ((_, cb) => transition.timeout == null && cb())
					}
					timeout={transition.timeout}
					in={visible}
					unmountOnExit={destroyOnClose}
					mountOnEnter={lazyMount}
				>
					{/* Return the same reference, disable re render */}
					{() => popup}
				</Transition>
			</TransitionGroupContext.Provider>
		);
	}
}

export default Popup;
