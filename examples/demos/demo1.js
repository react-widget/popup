import React, { Component } from "react";
import Popup from "../../src";
import $ from "jquery";
import Deferred from "bplokjs-deferred";

class T1 extends React.Component {
    componentDidMount() {
        setInterval(() => this.setState({}), 1000);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            console.log("componentDidUpdateA");
            return;
        }
    }

    render() {
        return this.props.children;
    }
}

function Test() {
    console.log("Test Render");
    return null;
}

export default class DEMO extends Component {
    state = {
        visible: false
    };

    toggleClick = e => {
        const { visible } = this.state;
        console.log("show...");
        this.setState({
            visible: !visible
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

    _defer = Deferred();
    _defer2 = Deferred();

    componentDidMount() {
        // setTimeout(this.forceUpdate.bind(this), 1000);
    }

    render() {
        const { visible } = this.state;
        const defer = Deferred();

        return (
            <div>
                {/* <T1>
                    <Test />
                </T1> */}
                <button onClick={this.toggleClick}>
                    {visible ? "关闭" : "显示"}
                </button>
                <Popup visible={visible} position={[10, 10]}>
                    <div className="dialog">
                        center...
                        <div>
                            <Test />
                        </div>
                    </div>

                    <Test />
                    <Test />
                </Popup>
            </div>
        );
    }
}
