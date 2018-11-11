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

## Options

- prefixCls  
    
    type: `string`  
    default: `rw-popup`

- visible

    type: `bool`  
    default: `true`

    控制Popup是否显示

- fixed

    type: `bool`  
    default: `false` 

    是否使用fixed进行定位

- mask

    type: `bool`  
    default: `false` 

    是否显示遮罩层

- mountOnEnter

    type: `bool`  
    default: `true` 

    不开启时，如果visible=false时则不渲染，可以理解为lazyMount

- unmountOnExit

    type: `bool`  
    default: `true` 

    开始后visible=false时不渲染，可以理解为 destroyOnHide

- resetPositionOnUpdate

    type: `bool`  
    default: `true` 

    每次重新渲染后都会更新计算位置坐标

- resetPositionOnEntered

    type: `bool`  
    default: `false` 

    动画结束后重新计算位置坐标


- rootComponent

    type: `React.Element`  
    default: `React.Fragment` 

- popupComponent

    type: `React.Element`  
    default: `div` 


- maskComponent

    type: `React.Element`  
    default: `div` 

- maskProps

    type: `object`  
    default: `null` 

- placement

    type: `Promise` `Object` `Function`    
    default: `{of:window}`

    Popup内部使用jqueryui/position.js 参考https://api.jqueryui.com/position/

    ```
    //Promise
    <Popup
        placement={Promise.resolve({
            of: window
        })}
    >

    //Object
    <Popup
        placement={{
            of: window
        }}
    >

    //Function
    <Popup
        placement={(node) => //自行设置}
    >

    ```

- timeout

    type: `number` `object`  
    default: `null` 

    参考`react-transition-group`


- transitionClassNames

    type: `string` `object`  
    default: `null`

    ```
    /** 
    * @type {string | {
    *  appear?: string,
    *  appearActive?: string,
    *  enter?: string,
    *  enterActive?: string,
    *  enterDone?: string,
    *  exit?: string,
    *  exitActive?: string,
    *  exitDone?: string,
    * }}
    * */
    ``` 

    开启动画效果

    参考`react-transition-group`

- maskTransitionClassNames

    遮罩层CSS动画效果

    参考`react-transition-group`

- addEndListener

    参考`react-transition-group`

- addMaskEndListener

    参考`react-transition-group`

- onEnter

- onEntering

- onEntered

- onExit

- onExiting

- onExited

- onMaskEnter

- onMaskEntering

- onMaskEntered

- onMaskExit

- onMaskExiting

- onMaskExited
