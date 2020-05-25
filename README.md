# react-widget-popup

## 安装

`npm install --save react-widget-popup`

## 使用

```jsx
import Popup from 'react-widget-popup';

...

render(){
    return (
        <Popup
            visible={true}
            style={{
                left: 100,
                top: 100
            }}
        >
            test
        </Popup>
    )
}

...

```

### Interfaces

```ts
type statusTypes = 'unmounted' | 'exited' | 'entering' | 'entered' | 'exiting' ;

interface PopupProps extends React.HTMLAttributes<any> {
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
```

### defaultProps

```js
{
    prefixCls: "rw-popup",
    style: {},
    className: "",
    rootClassName: "",

    fixed: false,
    lazy: true,
    transition: {},
    destroyOnClose: true,

    disableMask: false,
    mask: false,
    maskStyle: {},
    maskProps: {},
    maskClassName: "",
    maskTransition: {},

    component: "div",
    maskComponent: "div",
    rootComponent: "div"
}
```

### 基础样式

```css
.rw-popup-root {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
}

.rw-popup {
    position: absolute;
    left: 0;
    top: 0;
    outline: 0;
}

.rw-popup-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.1;
}

.rw-popup-fixed,
.rw-popup-mask-fixed {
    position: fixed;
}
```
