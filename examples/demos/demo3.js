import React, { Component, Fragment } from "react";
import Popup from "../../src";

let i = 1;

function Test() {
    console.log("1");
    return <a>Test a{i++}</a>;
}

const animateClassNames = {
    appear: "animated",
    appearActive: "fadeBottomIn",
    appearDone: "done",
    enter: "animated",
    enterActive: "fadeBottomIn",
    enterDone: "done",
    exit: "animated",
    exitActive: "fadeBottomOut",
    exitDone: "done"
};

const maskAnimateClassNames = {
    appear: "animated",
    appearActive: "fadeIn",
    appearDone: "done",
    enter: "animated",
    enterActive: "fadeIn",
    enterDone: "done",
    exit: "animated",
    exitActive: "fadeOut",
    exitDone: "done"
};

export default class DEMO extends Component {
    state = {
        visible: true,
        mask: true
    };

    toggleClick = e => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    };

    toggleClick2 = e => {
        const { mask } = this.state;
        this.setState({
            mask: !mask
        });
    };

    render() {
        const { visible, mask } = this.state;

        return (
            <Fragment>
                <div>
                    <button onClick={this.toggleClick}>
                        {visible ? "关闭" : "显示"}
                    </button>
                    <button onClick={this.toggleClick2}>
                        {mask ? "关闭遮罩层" : "显示遮罩层"}
                    </button>
                    <button onClick={() => this.forceUpdate()}>refresh</button>
                </div>
                <div
                    style={{
                        height: "calc(100% - 30px)",
                        position: "relative",
                        border: "1px solid #000"
                    }}
                >
                    <Popup
                        visible={visible}
                        mask={mask}
                        destroyOnHide={false}
                        style={{
                            left: 10,
                            top: 10,
                            background: "#ff5454",
                            color: "#FFF",
                            padding: 10
                        }}
                        timeout={300}
                        transition={{
                            classNames: animateClassNames
                        }}
                        maskTransition={{
                            classNames: maskAnimateClassNames
                        }}
                    >
                        <div>
                            center2...
                            <Test />
                        </div>
                    </Popup>
                </div>
            </Fragment>
        );
    }
}
