import React, { Component } from "react";
import Popup from "../../src";
import $ from "jquery";

export default class DEMO extends Component {
    state = {
        visible: false
    };

    toggleClick = e => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    };

    componentDidMount() {
        // setInterval(this.forceUpdate.bind(this), 1000);
    }

    render() {
        const { visible } = this.state;

        return (
            <div>
                <button onClick={this.toggleClick}>
                    {visible ? "关闭" : "显示"}
                </button>
                <Popup
                    visible={visible}
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
                    style={{
                        left: 10,
                        top: 10
                    }}
                >
                    <div className="dialog">center...</div>
                </Popup>
            </div>
        );
    }
}
