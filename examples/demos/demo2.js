import React, { Component, Fragment } from "react";
import Popup from "../../src";
import $ from "jquery";

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

    refButton = dom => {
        this._defer.resolve({
            of: dom,
            my: "left top",
            at: "left bottom"
        });
    };

    refButton2 = dom => {
        this._defer2.resolve({
            of: dom,
            my: "left center",
            at: "right center"
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
                        style={{
                            left: 10,
                            top: 10,
                            background: "#ff5454",
                            color: "#FFF",
                            padding: 10
                        }}
                        timeout={500}
                        transition={{
                            onEnter: node => {
                                $(node).hide();
                                $(node)
                                    .stop()
                                    .fadeIn(500);
                            },
                            onExit: node => {
                                $(node)
                                    .stop()
                                    .fadeOut(500);
                            }
                        }}
                        maskTransition={{
                            onEnter: node => {
                                $(node).hide();
                                $(node)
                                    .stop()
                                    .fadeIn(500);
                            },
                            onExit: node => {
                                $(node)
                                    .stop()
                                    .fadeOut(500);
                            }
                        }}
                    >
                        <div>center2...</div>
                    </Popup>
                </div>
            </Fragment>
        );
    }
}
