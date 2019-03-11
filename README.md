# react-widget-popup

## 安装
`npm install --save react-widget-popup`

## 使用

```js
var Popup = require('react-widget-popup');

...

render(){
    return (
        <Popup
            visible={true}
        >
            test
        </Popup>
    )
}

...

```

### Popup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 组件CSS样式前缀 | string | rw-popup |
| className | 组件className属性 | string | - |
| style | 组件style属性 | React.CSSProperties | - |
| mask | 是否展示遮罩 | boolean | false |
| visible | 是否可见 | boolean | true |
| fixed | 是否使用固定定位 | boolean | false |
| resetPositionOnUpdate | 每次重新渲染后都会更新计算位置坐标 | boolean | true |
| resetPositionOnEntered | 动画结束后重新计算位置坐标 | boolean | false |
| rootComponent | popup容器组件类 | React.Element | React.Fragment |
| popupComponent | popup组件类 | React.Element | div |
| maskComponent | 遮罩层组件类 | React.Element | div |
| maskProps | 遮罩层组件属性 | object | - |
| placement | 组件显示位置规则,参考`https://api.jqueryui.com/position/` | Promise()=>PlacementObject<br/>PlacementObject<br/>Function=>PlacementObject | {of:window} |
| setDirectionClassName | 是否设置方位样式`rw-popup-direction-top|left|right|bottom` | boolean | true |
| transitionComponent | 动画组件 | React.Element | Transition |
| mountOnEnter | 参考`react-transition-group` | boolean | true |
| unmountOnExit | 参考`react-transition-group` | boolean | true |
| timeout | 参考`react-transition-group` | - | - |
| addEndListener | 参考`react-transition-group` | - | - |
| addMaskEndListener | 参考`react-transition-group` | - | - |
| onEnter | 参考`react-transition-group` | - | - |
| onEntering | 参考`react-transition-group` | - | - |
| onEntered | 参考`react-transition-group` | - | - |
| onExit | 参考`react-transition-group` | - | - |
| onExiting | 参考`react-transition-group` | - | - |
| onExited | 参考`react-transition-group` | - | - |
| onMaskEnter | 参考`react-transition-group` | - | - |
| onMaskEntering | 参考`react-transition-group` | - | - |
| onMaskEntered | 参考`react-transition-group` | - | - |
| onMaskExit | 参考`react-transition-group` | - | - |
| onMaskExiting | 参考`react-transition-group` | - | - |
| onMaskExited | 参考`react-transition-group` | - | - |
| transitionClassNames | 参考`react-transition-group` | - | - |
| maskTransitionClassNames | 参考`react-transition-group` | - | - |
