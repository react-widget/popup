(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,n){},113:function(e,t,n){},114:function(e,t,n){},125:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n.n(s),i=n(11),o=n.n(i),l=(n(112),n(113),n(114),n(7),n(115),n(13),n(1)),r=n.n(l),c=(n(69),n(72)),m=n.n(c),d=n(23),p=n.n(d),u=n(42),h=n.n(u),k=n(18),f=n(14),v=n(43);class b extends a.a.Component{constructor(...e){super(...e),r()(this,"transitionStatus",f.a),r()(this,"_refs",{})}shouldComponentUpdate(e){const t=this.transitionStatus;return!(f.a===t&&!e.visible)}shouldHide(){const e=this.props,t=e.lazyMount;return!e.visible&&!t}saveRef(e,t){this._refs[e]=t}getPopupRootDOM(){return o.a.findDOMNode(this._refs.popupRoot)}getPopupDOM(){return o.a.findDOMNode(this._refs.popup)}getPopupMaskDOM(){return o.a.findDOMNode(this._refs.popupMask)}onEnter({onEnter:e},t,n,s){const a=this.props,i=a.destroyOnClose,o=a.getPosition;if(i||(n.style.display=""),!t&&o){const e=o(n),t=e=>"number"===typeof e?e+"px":e;e&&("left"in e&&(n.style.left=t(e.left)),"top"in e&&(n.style.top=t(e.top)),"right"in e&&(n.style.right=t(e.right)),"bottom"in e&&(n.style.bottom=t(e.bottom)))}e&&e(n,s)}onExited({onExited:e},t,n){this.props.destroyOnClose||(n.style.display="none"),e&&e(n)}renderPopupMask(){const e=this.props,t=e.prefixCls,n=e.visible,s=e.mask,i=e.maskProps,o=e.maskStyle,l=e.maskClassName,r=e.maskTransition,c=e.lazyMount,m=e.destroyOnClose,d=e.fixed,u=e.maskComponent,k=h()({[t+"-mask"]:!0,[t+"-mask-fixed"]:d},i.className,l),b={};this.shouldHide()&&(b.display="none");const g=r.classNames?v.a:f.b;return a.a.createElement(g,p()({enter:!0,exit:!0,appear:!0,addEndListener:(e,t)=>null==r.timeout&&t()},r,{in:s&&n,onEnter:this.onEnter.bind(this,r,!0),onExited:this.onExited.bind(this,r,!0),unmountOnExit:m,mountOnEnter:c}),a.a.createElement(u,p()({},i,{ref:this.saveRef.bind(this,"popupMask"),style:Object.assign({},i.style,{},o,{},b),className:k})))}render(){const e=this.props,t=e.style,n=e.prefixCls,i=e.className,o=e.fixed,l=e.visible,r=e.children,c=e.lazyMount,d=e.destroyOnClose,u=e.rootClassName,b=e.rootComponent,g=e.component,C=e.transition,E=e.wrapContent,x=m()(e,["style","prefixCls","className","fixed","visible","children","lazyMount","destroyOnClose","rootClassName","rootComponent","component","transition","wrapContent"]);delete x.mask,delete x.maskProps,delete x.maskStyle,delete x.maskClassName,delete x.maskComponent,delete x.maskTransition,delete x.getPosition;const y={ref:this.saveRef.bind(this,"popupRoot"),[u]:u};b===s.Fragment&&(delete y.ref,delete y[u]);const O=h()({[n]:!0,[n+"-fixed"]:o,[i]:i}),N={};this.shouldHide()&&(N.display="none");const D=C.classNames?v.a:f.b;return a.a.createElement(k.a.Provider,{value:null},a.a.createElement(b,null,this.renderPopupMask(),E(a.a.createElement(D,p()({enter:!0,exit:!0,appear:!0,addEndListener:(e,t)=>null==C.timeout&&t()},C,{in:l,onEnter:this.onEnter.bind(this,C,!1),onExited:this.onExited.bind(this,C,!1),unmountOnExit:d,mountOnEnter:c}),e=>(this.transitionStatus=e,a.a.createElement(g,p()({},x,{ref:this.saveRef.bind(this,"popup"),style:Object.assign({},t,{},N),className:O}),"function"===typeof r?r(e):r))))))}}r()(b,"defaultProps",{prefixCls:"rw-popup",style:{},className:"",rootClassName:"",visible:!1,fixed:!1,lazyMount:!0,transition:{},destroyOnClose:!0,mask:!1,maskStyle:{},maskProps:{},maskClassName:"",maskTransition:{},component:"div",maskComponent:"div",rootComponent:s.Fragment,wrapContent:e=>e});var g=b,C=n(5),E=n.n(C);class x extends s.Component{constructor(...e){super(...e),r()(this,"state",{visible:!1}),r()(this,"toggleClick",e=>{const t=this.state.visible;this.setState({visible:!t})})}componentDidMount(){}render(){const e=this.state.visible;return a.a.createElement("div",null,a.a.createElement("button",{onClick:this.toggleClick},e?"\u5173\u95ed":"\u663e\u793a"),a.a.createElement(g,{visible:e,transition:{timeout:500,onEnter:e=>{E()(e).hide(),E()(e).stop().fadeIn(500)},onExit:e=>{E()(e).stop().fadeOut(500)}},getPosition:e=>(console.log(e),{left:"50%",top:50})},a.a.createElement("div",{className:"dialog"},"center...")))}}class y extends s.Component{constructor(...e){super(...e),r()(this,"state",{visible:!0,mask:!0}),r()(this,"toggleClick",e=>{const t=this.state.visible;this.setState({visible:!t})}),r()(this,"toggleClick2",e=>{const t=this.state.mask;this.setState({mask:!t})}),r()(this,"refButton",e=>{this._defer.resolve({of:e,my:"left top",at:"left bottom"})}),r()(this,"refButton2",e=>{this._defer2.resolve({of:e,my:"left center",at:"right center"})})}render(){const e=this.state,t=e.visible,n=e.mask;return a.a.createElement(s.Fragment,null,a.a.createElement("div",null,a.a.createElement("button",{onClick:this.toggleClick},t?"\u5173\u95ed":"\u663e\u793a"),a.a.createElement("button",{onClick:this.toggleClick2},n?"\u5173\u95ed\u906e\u7f69\u5c42":"\u663e\u793a\u906e\u7f69\u5c42")),a.a.createElement("div",{style:{height:"calc(100% - 30px)",position:"relative",border:"1px solid #000"}},a.a.createElement(g,{visible:t,mask:n,style:{left:"50%",top:10,background:"#ff5454",color:"#FFF",padding:10},transition:{timeout:500,onEnter:e=>{E()(e).hide(),E()(e).stop().fadeIn(500)},onExit:e=>{E()(e).stop().fadeOut(500)}},maskTransition:{timeout:500,onEnter:e=>{E()(e).hide(),E()(e).stop().fadeIn(500)},onExit:e=>{E()(e).stop().fadeOut(500)}}},a.a.createElement("div",null,"center2..."))))}}let O=1;function N(){return console.log("1"),a.a.createElement("a",null,"Test a",O++)}const D={appear:"animated",appearActive:"fadeBottomIn",appearDone:"done",enter:"animated",enterActive:"fadeBottomIn",enterDone:"done",exit:"animated",exitActive:"fadeBottomOut",exitDone:"done"},F={appear:"animated",appearActive:"fadeIn",appearDone:"done",enter:"animated",enterActive:"fadeIn",enterDone:"done",exit:"animated",exitActive:"fadeOut",exitDone:"done"};class S extends s.Component{constructor(...e){super(...e),r()(this,"state",{visible:!0,mask:!0}),r()(this,"toggleClick",e=>{const t=this.state.visible;this.setState({visible:!t})}),r()(this,"toggleClick2",e=>{const t=this.state.mask;this.setState({mask:!t})})}render(){const e=this.state,t=e.visible,n=e.mask;return a.a.createElement(s.Fragment,null,a.a.createElement("div",null,a.a.createElement("button",{onClick:this.toggleClick},t?"\u5173\u95ed":"\u663e\u793a"),a.a.createElement("button",{onClick:this.toggleClick2},n?"\u5173\u95ed\u906e\u7f69\u5c42":"\u663e\u793a\u906e\u7f69\u5c42"),a.a.createElement("button",{onClick:()=>this.forceUpdate()},"refresh")),a.a.createElement("div",{style:{height:"calc(100% - 30px)",position:"relative",border:"1px solid #000"}},a.a.createElement(g,{visible:t,mask:n,destroyOnClose:!1,style:{left:10,top:10,background:"#ff5454",color:"#FFF",padding:10},transition:{timeout:500,classNames:D},maskTransition:{timeout:500,classNames:F}},a.a.createElement("div",null,a.a.createElement(N,null)))))}}const M={appear:"animated",appearActive:"fadeBottomIn",appearDone:"done",enter:"animated",enterActive:"fadeBottomIn",enterDone:"done",exit:"animated",exitActive:"fadeBottomOut",exitDone:"done"},P={appear:"animated",appearActive:"fadeIn",appearDone:"done",enter:"animated",enterActive:"fadeIn",exit:"animated",exitActive:"fadeOut"};class A extends s.Component{constructor(...e){super(...e),r()(this,"state",{visible:!0,mask:!0}),r()(this,"toggleClick",e=>{const t=this.state.visible;this.setState({visible:!t})}),r()(this,"toggleClick2",e=>{const t=this.state.mask;this.setState({mask:!t})})}render(){const e=this.state,t=e.visible,n=e.mask;return a.a.createElement(s.Fragment,null,a.a.createElement("div",null,a.a.createElement("button",{onClick:this.toggleClick},t?"\u5173\u95ed":"\u663e\u793a"),a.a.createElement("button",{onClick:this.toggleClick2},n?"\u5173\u95ed\u906e\u7f69\u5c42":"\u663e\u793a\u906e\u7f69\u5c42"),a.a.createElement("button",{onClick:()=>this.forceUpdate()},"refresh")),a.a.createElement("div",{style:{height:"calc(100% - 30px)",position:"relative",border:"1px solid #000"}},a.a.createElement(g,{visible:t,mask:n,destroyOnClose:!0,style:{background:"#ff5454",color:"#FFF",padding:10},transition:{timeout:500,classNames:M},maskTransition:{timeout:500,classNames:P},maskProps:{onClick:()=>{this.toggleClick2()}},fixed:!0},a.a.createElement("div",null,"fixed test"))))}}class I extends s.Component{constructor(...e){super(...e),r()(this,"state",{visible:!0,mask:!0}),r()(this,"toggleClick",e=>{const t=this.state.visible;this.setState({visible:!t})}),r()(this,"toggleClick2",e=>{const t=this.state.mask;this.setState({mask:!t})})}render(){const e=this.state,t=e.visible,n=e.mask;return a.a.createElement(s.Fragment,null,a.a.createElement("div",null,a.a.createElement("button",{onClick:this.toggleClick},t?"\u5173\u95ed":"\u663e\u793a"),a.a.createElement("button",{onClick:this.toggleClick2},n?"\u5173\u95ed\u906e\u7f69\u5c42":"\u663e\u793a\u906e\u7f69\u5c42"),a.a.createElement("button",{onClick:()=>this.forceUpdate()},"refresh")),a.a.createElement("div",{style:{height:"calc(100% - 30px)",position:"relative",border:"1px solid #000"}},a.a.createElement(g,{visible:t,mask:n,destroyOnClose:!0,style:{background:"#ff5454",color:"#FFF",padding:10},maskProps:{onClick:()=>{this.toggleClick2()}}},a.a.createElement("div",null,"fixed test"))))}}var w=[{label:"\u57fa\u672c\u529f\u80fd",component:x},{label:"\u906e\u7f69\u5c42",component:y},{label:"\u4f7f\u7528CSS\u52a8\u753b",component:S},{label:"fixed",component:A},{label:"\u65e0\u52a8\u753b",component:I}];class B extends s.Component{constructor(...e){super(...e),r()(this,"state",{current:w[0]})}onDemoChange(e,t){this.setState({current:e})}render(){const e=this.state.current;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"slider"},w.map((t,n)=>a.a.createElement("div",{className:e===t?"active":"",onClick:this.onDemoChange.bind(this,t)},t.label))),a.a.createElement("div",{className:"content"},e?a.a.createElement(e.component,null):null))}}o.a.render(a.a.createElement(B,null),document.getElementById("demo"))},74:function(e,t,n){n(75),e.exports=n(125)}},[[74,1,2]]]);