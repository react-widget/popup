import React, { Component, Fragment } from 'react';
import Popup from '../../lib';

function Test() {
    return <a>Test a</a>;
}

const animateClassNames = {
    "appear": "animated",
    "appearActive": "fadeBottomIn",
    "enter": "animated",
    "enterActive": "fadeBottomIn",
    "enterDone": "",
    "exit": "animated",
    "exitActive": "fadeBottomOut",
    "exitDone": "",
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
                        unmountOnExit={true}
                        resetPositionOnUpdate
                        style={{
                            background: '#ff5454',
                            color: '#FFF',
                            padding: 10
                        }}
                        onEnter={() => console.log('onEnter')}
                        onEntering={() => console.log('onEntering')}
                        onEntered={() => console.log('onEntered')}
                        onExit={() => console.log('Popup onExit')}
                        onExiting={() => console.log('Popup onExiting')}
                        onExited={() => console.log('Popup onExited')}

                        maskProps={{
                            onClick: () => {
                                this.toggleClick2()
                            }
                        }}

                        fixed

                        timeout={300}
                        transitionClassNames={animateClassNames}
                        maskTransitionClassNames={maskAnimateClassNames}

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
