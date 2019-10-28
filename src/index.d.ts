import React from "react";
import {
    TransitionProps,
    TransitionChildren
} from "react-transition-group/Transition";

export interface PopupProps {
    children?: TransitionChildren;
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    popupRootClassName?: string;

    fixed?: boolean;
    visible?: boolean;
    lazyMount?: boolean;
    transition?: TransitionProps;
    destroyOnHide?: boolean;

    mask?: boolean;
    maskStyle?: React.CSSProperties;
    maskProps?: {};
    maskClassName?: string;
    maskComponent?: React.ElementType;
    maskTransition?: TransitionProps;

    popupComponent?: React.ElementType;
    popupRootComponent?: React.ElementType;

    // 动画超时时间，建议在transition和maskTransition设置
    timeout?: TransitionProps.timeout;

    [prop: string]: any;
}

declare class Popup extends React.Component<PopupProps, {}> {}

export default Popup;
