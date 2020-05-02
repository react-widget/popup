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

### propTypes

```ts
type statusTypes = 'unmounted' | 'exited' | 'entering' | 'entered' | 'exiting' ;

interface PopupProps {
    children?: React.ReactNode | (status: statusTypes) => React.ReactNode;
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;

    fixed?: boolean;
    visible: boolean;
    lazyMount?: boolean;
    //http://reactcommunity.org/react-transition-group/css-transition
    transition?: CSSTransitionProps;
    destroyOnClose?: boolean;

    mask?: boolean;
    maskStyle?: React.CSSProperties;
    maskProps?: {};
    maskClassName?: string;
    //http://reactcommunity.org/react-transition-group/css-transition
    maskTransition?: CSSTransitionProps;

    component?: React.ElementType;
    maskComponent?: React.ElementType;
    rootComponent?: React.ElementType;

    wrapContent?: (node: React.ReactNode) => React.ReactNode;

    [prop: string]: any;
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
    lazyMount: true,
    transition: {},
    destroyOnClose: true,

    mask: false,
    maskStyle: {},
    maskProps: {},
    maskClassName: "",
    maskTransition: {},

    component: "div",
    maskComponent: "div",
    rootComponent: Fragment
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
