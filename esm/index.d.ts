import React from "react";
import { TransitionChildren } from "react-transition-group/Transition";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export interface PopupProps {
    children?: TransitionChildren;
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;

    fixed?: boolean;
    visible?: boolean;
    lazyMount?: boolean;
    transition?: CSSTransitionProps;
    destroyOnHide?: boolean;
    getPosition: (
        dom: HTMLElement
    ) => { top?: any; left?: any; right?: any; bottom?: any };

    mask?: boolean;
    maskStyle?: React.CSSProperties;
    maskProps?: {};
    maskClassName?: string;
    maskTransition?: CSSTransitionProps;

    component?: React.ElementType;
    maskComponent?: React.ElementType;
    rootComponent?: React.ElementType;

    // 动画超时时间，建议在transition和maskTransition设置
    timeout?: CSSTransitionProps.timeout;

    [prop: string]: any;
}

declare class Popup extends React.Component<PopupProps, {}> {}

export default Popup;
