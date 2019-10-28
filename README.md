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
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;

    fixed?: boolean;
    visible?: boolean;
    lazyMount?: boolean;
    //http://reactcommunity.org/react-transition-group/css-transition
    transition?: CSSTransitionProps;
    destroyOnHide?: boolean;

    mask?: boolean;
    maskStyle?: React.CSSProperties;
    maskProps?: {};
    maskClassName?: string;
    //http://reactcommunity.org/react-transition-group/css-transition
    maskTransition?: CSSTransitionProps;

    component?: React.ElementType;
    maskComponent?: React.ElementType;
    rootComponent?: React.ElementType;

    // 动画超时时间，建议在transition和maskTransition设置
    timeout?: CSSTransitionProps.timeout;

    [prop: string]: any;
}
```

### defaultProps

```js
{
    prefix: "nex-popup",
    style: {},
    className: "",
    rootClassName: "",

    fixed: false,
    visible: false,
    lazyMount: true,
    transition: {},
    destroyOnHide: true,

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
.nex-popup-root {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
}

.nex-popup {
    position: absolute;
    left: 0;
    top: 0;
    outline: 0;
}

.nex-popup-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.1;
}

.nex-popup-fixed,
.nex-popup-mask-fixed {
    position: fixed;
}
```
