import React, { Fragment } from "react";
import { findDOMNode } from "react-dom";
import classnames from "classnames";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import Transition, { EXITED, TransitionStatus } from "react-transition-group/Transition";
import CSSTransition, { CSSTransitionProps } from "react-transition-group/CSSTransition";

export const version = "%VERSION%";

export interface PopupProps extends React.HTMLAttributes<any> {
	prefixCls?: string;
	style?: React.CSSProperties;
	className?: string;
	rootClassName?: string;
	rootStyle?: React.CSSProperties;
	rootProps?: React.HTMLAttributes<any>;

	visible?: boolean;
	fixed?: boolean;
	lazy?: boolean;
	forceRender?: boolean;

	transition?: CSSTransitionProps;
	destroyOnClose?: boolean;
	getPosition?: (
		dom: HTMLElement
	) => {
		top?: number | string;
		left?: number | string;
		right?: number | string;
		bottom?: number | string;
	};

	disableMask?: boolean;
	mask?: boolean;
	maskStyle?: React.CSSProperties;
	maskProps?: React.HTMLAttributes<any>;
	maskClassName?: string;
	maskTransition?: CSSTransitionProps;

	component?: React.ElementType;
	maskComponent?: React.ElementType;
	rootComponent?: React.ElementType;

	wrapContent?: (node: React.ReactNode) => React.ReactNode;
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
		lazy: true,
		//当destroyOnClose=false时，visible=false的情况下也会刷新组件
		forceRender: false,
		//popup动画配置参数参考react-transition-group
		//http://reactcommunity.org/react-transition-group/css-transition
		transition: {},
		//visible=false时移除组件，作用同react-transition-group的unmountOnExit
		destroyOnClose: true,

		disableMask: false,
		mask: false,
		maskStyle: {},
		maskProps: {},
		maskClassName: "",
		//popupMask动画配置参数参考react-transition-group
		//http://reactcommunity.org/react-transition-group/css-transition
		maskTransition: {},

		component: "div",
		maskComponent: "div",
		rootComponent: "div",

		wrapContent: (node: React.ReactNode) => {
			return node;
		},
	};

	protected transitionStatus: TransitionStatus = EXITED;
	protected inTransition: boolean = false;
	protected inMaskTransition: boolean = false;

	protected rootInstance: React.ReactInstance;
	protected popupInstance: React.ReactInstance;
	protected maskInstance: React.ReactInstance;

	protected refHandlers = {
		root: (node: React.ReactInstance) => (this.rootInstance = node),
		popup: (node: React.ReactInstance) => (this.popupInstance = node),
		mask: (node: React.ReactInstance) => (this.maskInstance = node),
	};

	shouldComponentUpdate(nextProps: PopupProps) {
		return nextProps.forceRender || !(EXITED === this.transitionStatus && !nextProps.visible);
	}

	componentDidMount() {
		const { lazy, visible, mask } = this.props;
		const rootElement = findDOMNode(this.rootInstance) as HTMLElement;
		const popupElement = findDOMNode(this.popupInstance) as HTMLElement;
		const maskElement = findDOMNode(this.maskInstance) as HTMLElement;

		if (!visible && !lazy) {
			if (rootElement) rootElement.style.display = "none";
			if (popupElement) popupElement.style.display = "none";
			if (maskElement) maskElement.style.display = "none";
		}

		if (visible && !mask) {
			if (maskElement) maskElement.style.display = "none";
		}
	}

	onEnter(
		{ onEnter }: CSSTransitionProps,
		isMask: boolean,
		node: HTMLElement,
		appearing: boolean
	) {
		const { destroyOnClose, getPosition } = this.props;
		const rootElement = findDOMNode(this.rootInstance) as HTMLElement;
		const popupElement = findDOMNode(this.popupInstance) as HTMLElement;
		const maskElement = findDOMNode(this.maskInstance) as HTMLElement;

		if (isMask) {
			this.inMaskTransition = true;
		} else {
			this.inTransition = true;
		}

		if (!destroyOnClose) {
			if (rootElement) rootElement.style.display = "";
			if (!isMask && popupElement) popupElement.style.display = "";
			if (isMask && maskElement) maskElement.style.display = "";
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

	onEntered({ onEntered }, isMask: boolean, node: HTMLElement, appearing: boolean) {
		if (isMask) {
			this.inMaskTransition = false;
		} else {
			this.inTransition = false;
		}

		if (onEntered) {
			onEntered(node, appearing);
		}
	}

	onExit({ onExit }: CSSTransitionProps, isMask: boolean, node: HTMLElement) {
		if (isMask) {
			this.inMaskTransition = true;
		} else {
			this.inTransition = true;
		}

		if (onExit) {
			onExit(node);
		}
	}

	onExited({ onExited }: CSSTransitionProps, isMask: boolean, node: HTMLElement) {
		const { destroyOnClose, visible } = this.props;
		const rootElement = findDOMNode(this.rootInstance) as HTMLElement;
		const popupElement = findDOMNode(this.popupInstance) as HTMLElement;
		const maskElement = findDOMNode(this.maskInstance) as HTMLElement;

		if (isMask) {
			this.inMaskTransition = false;
		} else {
			this.inTransition = false;
		}

		if (!destroyOnClose) {
			if (!visible && !this.inMaskTransition && !this.inTransition && rootElement) {
				rootElement.style.display = "none";
			}
			if (!isMask && popupElement) {
				popupElement.style.display = "none";
			}
			if (isMask && maskElement) {
				maskElement.style.display = "none";
			}
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
			lazy,
			destroyOnClose,
			fixed,
			maskComponent,
		} = this.props;

		const MaskComponent = maskComponent!;

		const classes: string = classnames(
			{
				[`${prefixCls}-mask`]: true,
				[`${prefixCls}-mask-fixed`]: fixed,
			},
			maskProps!.className,
			maskClassName
		);

		const TransitionComponent = maskTransition!.classNames ? CSSTransition : Transition;

		return (
			<TransitionComponent
				enter
				exit
				appear
				addEndListener={(_, cb) => maskTransition!.timeout == null && cb()}
				{...maskTransition}
				in={mask && visible}
				onEnter={this.onEnter.bind(this, maskTransition, true)}
				onEntered={this.onEntered.bind(this, maskTransition, true)}
				onExit={this.onExit.bind(this, maskTransition, true)}
				onExited={this.onExited.bind(this, maskTransition, true)}
				unmountOnExit={destroyOnClose}
				mountOnEnter={lazy}
			>
				<MaskComponent
					{...maskProps}
					ref={this.refHandlers.mask}
					style={{
						...maskStyle,
						...maskProps!.style,
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
			lazy,
			destroyOnClose,
			rootClassName,
			rootStyle,
			rootProps,
			rootComponent,
			component,
			transition,
			wrapContent,
			disableMask,
			...childProps
		} = this.props;

		const RootComponent = rootComponent!;
		const Component = rootComponent!;

		delete childProps.mask;
		delete childProps.maskProps;
		delete childProps.maskStyle;
		delete childProps.maskClassName;
		delete childProps.maskComponent;
		delete childProps.maskTransition;
		delete childProps.getPosition;
		delete childProps.forceRender;

		let rootComponentProps: {} = {
			...rootProps,
			className: classnames(rootClassName, rootProps!.className),
			style: {
				...rootStyle,
				...rootProps!.style,
			},
		};

		if (RootComponent === Fragment) {
			rootComponentProps = {};
		}

		const classes: string = classnames(
			prefixCls,
			{
				[`${prefixCls}-fixed`]: fixed,
			},
			className
		);

		const TransitionComponent = transition!.classNames ? CSSTransition : Transition;

		const popup = (
			<RootComponent {...rootComponentProps} ref={this.refHandlers.root}>
				{!disableMask && this.renderPopupMask()}
				{wrapContent!(
					<TransitionComponent
						enter
						exit
						appear
						addEndListener={(_, cb) => transition!.timeout == null && cb()}
						{...transition}
						in={visible}
						onEnter={this.onEnter.bind(this, transition, false)}
						onEntered={this.onEntered.bind(this, transition, false)}
						onExit={this.onExit.bind(this, transition, false)}
						onExited={this.onExited.bind(this, transition, false)}
						unmountOnExit={destroyOnClose}
						mountOnEnter={lazy}
					>
						{status => {
							this.transitionStatus = status;
							return (
								<Component
									{...childProps}
									ref={this.refHandlers.popup}
									style={style}
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
						transition!.addEndListener ||
						((_, cb) => transition!.timeout == null && cb())
					}
					timeout={transition!.timeout}
					in={visible}
					unmountOnExit={destroyOnClose}
					mountOnEnter={lazy}
				>
					{/* Return the same reference, disable re-render */}
					{() => popup}
				</Transition>
			</TransitionGroupContext.Provider>
		);
	}
}

export default Popup;
