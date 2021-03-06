import React, { Fragment } from "react";
import { findDOMNode } from "react-dom";
import classnames from "classnames";
import TransitionGroupContext from "react-transition-group/TransitionGroupContext";
import Transition, { EXITED, TransitionStatus } from "react-transition-group/Transition";
import CSSTransition, { CSSTransitionProps } from "react-transition-group/CSSTransition";

export const version = "%VERSION%";

export interface PopupProps extends React.HTMLAttributes<any> {
	/** 样式前缀 */
	prefixCls?: string;
	/** popup元素样式 */
	style?: React.CSSProperties;
	/** popupCSS样式名 */
	className?: string;
	/** popup根节点CSS样式名 */
	rootClassName?: string;
	/** popup根节点样式 */
	rootStyle?: React.CSSProperties;
	/** popup元素属性 */
	rootProps?: React.HTMLAttributes<any>;
	/** 否显示popup(受控) */
	visible?: boolean;
	/** 使用fixed定位popup */
	fixed?: boolean;
	/** 初始不显示的情况下不渲染组件 */
	lazy?: boolean;
	/** 当destroyOnClose=false时，组件刷新时强制更新 */
	forceRender?: boolean;
	/** CSSTransition参数，参考：react-transition-group */
	transition?: Partial<CSSTransitionProps>;
	/** 隐藏销毁弹组件 */
	destroyOnClose?: boolean;
	/** popup显示用于获取元素显示位置信息，大部分情况下建议直接用style */
	getPosition?: (
		dom: HTMLElement
	) => {
		top?: number | string;
		left?: number | string;
		right?: number | string;
		bottom?: number | string;
	};
	/** 禁用mask */
	disableMask?: boolean;
	/** 是否开启遮罩层 */
	mask?: boolean;
	/** 遮罩层样式 */
	maskStyle?: React.CSSProperties;
	/** 遮罩层组件属性 */
	maskProps?: React.HTMLAttributes<any>;
	/** 遮罩层样式名称 */
	maskClassName?: string;
	/** CSSTransition参数，参考：react-transition-group */
	maskTransition?: Partial<CSSTransitionProps>;
	/** 内部使用 */
	component?: React.ElementType;
	/** 内部使用 */
	maskComponent?: React.ElementType;
	/** 内部使用 */
	rootComponent?: React.ElementType;
	/** 内部使用 */
	wrapContent?: (node: React.ReactNode) => React.ReactNode;
}

export class Popup extends React.Component<PopupProps, {}> {
	static defaultProps: PopupProps = {
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
		transition: {} as CSSTransitionProps,
		//visible=false时移除组件，作用同react-transition-group的unmountOnExit
		destroyOnClose: true,

		disableMask: false,
		mask: false,
		maskStyle: {},
		maskProps: {},
		maskClassName: "",
		//popupMask动画配置参数参考react-transition-group
		//http://reactcommunity.org/react-transition-group/css-transition
		maskTransition: {} as CSSTransitionProps,

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

	getRootDOM(): HTMLElement | null {
		return findDOMNode(this.rootInstance) as HTMLElement | null;
	}

	getPopupDOM(): HTMLElement | null {
		return findDOMNode(this.popupInstance) as HTMLElement | null;
	}

	getMaskDOM(): HTMLElement | null {
		return findDOMNode(this.maskInstance) as HTMLElement | null;
	}

	shouldComponentUpdate(nextProps: PopupProps) {
		return nextProps.forceRender || !(EXITED === this.transitionStatus && !nextProps.visible);
	}

	componentDidMount() {
		const { lazy, visible, mask } = this.props;
		const rootElement = findDOMNode(this.rootInstance) as HTMLElement;
		const popupElement = findDOMNode(this.popupInstance) as HTMLElement;
		const maskElement = findDOMNode(this.maskInstance) as HTMLElement;

		if (!visible && !lazy) {
			if (rootElement) {
				rootElement.style.display = "none";
				// @ts-ignore
				rootElement.__popupHide = true;
			}
			if (popupElement) {
				popupElement.style.display = "none";
				// @ts-ignore
				popupElement.__popupHide = true;
			}
			if (maskElement) {
				maskElement.style.display = "none";
				// @ts-ignore
				maskElement.__popupHide = true;
			}
		}

		if (visible && !mask) {
			if (maskElement) {
				maskElement.style.display = "none";
				// @ts-ignore
				maskElement.__popupHide = true;
			}
		}
	}

	protected onEnter(
		{ onEnter }: CSSTransitionProps,
		isMask: boolean,
		node: HTMLElement,
		appearing: boolean
	) {
		const { getPosition } = this.props;
		const rootElement = findDOMNode(this.rootInstance) as HTMLElement;
		const popupElement = findDOMNode(this.popupInstance) as HTMLElement;
		const maskElement = findDOMNode(this.maskInstance) as HTMLElement;

		if (isMask) {
			this.inMaskTransition = true;
		} else {
			this.inTransition = true;
		}

		// if (!destroyOnClose) {
		//@ts-ignore
		if (rootElement && rootElement.__popupHide) {
			rootElement.style.display = "";
			//@ts-ignore
			delete rootElement.__popupHide;
		}
		//@ts-ignore
		if (!isMask && popupElement && popupElement.__popupHide) {
			popupElement.style.display = "";
			//@ts-ignore
			delete popupElement.__popupHide;
		}
		//@ts-ignore
		if (isMask && maskElement && maskElement.__popupHide) {
			maskElement.style.display = "";
			//@ts-ignore
			delete maskElement.__popupHide;
		}
		// }

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

	protected onEntered({ onEntered }, isMask: boolean, node: HTMLElement, appearing: boolean) {
		if (isMask) {
			this.inMaskTransition = false;
		} else {
			this.inTransition = false;
		}

		if (onEntered) {
			onEntered(node, appearing);
		}
	}

	protected onExit({ onExit }: CSSTransitionProps, isMask: boolean, node: HTMLElement) {
		if (isMask) {
			this.inMaskTransition = true;
		} else {
			this.inTransition = true;
		}

		if (onExit) {
			onExit(node);
		}
	}

	protected onExited({ onExited }: CSSTransitionProps, isMask: boolean, node: HTMLElement) {
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
				// @ts-ignore
				rootElement.__popupHide = true;
			}
			if (!isMask && popupElement) {
				popupElement.style.display = "none";
				// @ts-ignore
				popupElement.__popupHide = true;
			}
			if (isMask && maskElement) {
				maskElement.style.display = "none";
				// @ts-ignore
				maskElement.__popupHide = true;
			}
		}

		if (onExited) {
			onExited(node);
		}
	}

	protected renderPopupMask() {
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

	addEndListener = (_: any, cb: () => void) => {
		const transition = this.props.transition;
		transition?.addEndListener?.(findDOMNode(this.popupInstance) as HTMLElement, cb);
	};

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
		const Component = component!;

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
			className: classnames(`${prefixCls}-root`, rootClassName, rootProps!.className),
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
						{(status) => {
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
					addEndListener={transition!.addEndListener ? this.addEndListener : undefined}
					timeout={transition!.timeout!}
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
