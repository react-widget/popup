import React, { Component, Fragment } from 'react';
import Popup from '../../lib';
import $ from 'jquery'
import CSSTransition from 'react-widget-transition/lib/CSSTransition';
import Transition from 'react-widget-transition/lib/Transition';
import { CSSTransition as OrigCSSTransition } from 'react-transition-group'

function Test() {
    return <a>Test a</a>;
}

const animateClassNames = {
    "appear": "animated",
    "appearActive": "fadeBottomIn",
    "enter": "animated",
    "enterActive": "fadeBottomIn",
    "enterDone": "fadeBottomIn",
    "exit": "animated",
    "exitActive": "fadeBottomOut",
    "exitDone": "fadeBottomIn",
};

const maskAnimateClassNames = {
    "appear": "animated",
    "appearActive": "fadeIn",
    "enter": "animated",
    "enterActive": "fadeIn",
    "exit": "animated",
    "exitActive": "fadeOut"
}

export default class DEMO extends Component {

    state = {
        visible: true,
        mask: true,
    }

    toggleClick = e => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    }

    toggleClick2 = e => {
        const { mask } = this.state;
        this.setState({
            mask: !mask
        });
    }

    refButton = (dom) => {
        this._defer.resolve({
            of: dom,
            my: 'left top',
            at: 'left bottom'
        });
    }

    refButton2 = (dom) => {
        this._defer2.resolve({
            of: dom,
            my: 'left center',
            at: 'right center'
        });
    }
    render() {
        const { visible, mask } = this.state;

        return (
            <Fragment>
                <div>
                    <button onClick={this.toggleClick}>{visible ? '关闭' : '显示'}</button>
                    <button onClick={this.toggleClick2}>{mask ? '关闭遮罩层' : '显示遮罩层'}</button>
                    <button onClick={() => this.forceUpdate()}>refresh</button>
                </div>
                <div style={{
                    height: "calc(100% - 30px)",
                    position: "relative",
                    border: "1px solid #000"
                }}>
                    <Popup
                        visible={visible}
                        mask={mask}
                        unmountOnExit={false}
                        resetPositionOnUpdate
                        style={{
                            background: '#ff5454',
                            color: '#FFF',
                            padding: 10
                        }}
                        timeout={500}
                        onEntered={() => console.log('entered')}
                        onExit={() => console.log('Popup onExit')}
                        onExited={() => console.log('Popup onExited')}

                        classNames={animateClassNames}

                        maskClassNames={maskAnimateClassNames}

                        placement={{
                            of(el) {
                                return el.parentElement;
                            }
                        }}
                    >
                        <div>
                            center2...<Test />
                        </div>
                    </Popup>
                </div>
            </Fragment>
        );
    }

}
