import React, { Component } from 'react';
import Popup from '../../lib';
import Deferred from 'bplokjs-deferred'

export default class DEMO extends Component {

    state = {
        visible: false,
    }

    toggleClick = e => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    }

    refButton = (dom) => {
        this._defer.resolve({
            of: dom,
            my: 'left top',
            at: 'left bottom'
        });
    }

    _defer = Deferred()

    componentDidMount() {

    }

    render() {
        const { visible } = this.state;

        return (
            <div>
                <button onClick={this.toggleClick}>显示</button>
                <Popup visible={visible} destroyOnHide={true}>
                    <div className="dialog">
                        test...
                    </div>
                </Popup>
                <button onClick={this.toggleClick} ref={this.refButton}>trigger</button>
                <Popup visible={visible} destroyOnHide={true} placement={this._defer}>
                    <div className="dialog">
                        trigger...
                    </div>
                </Popup>
            </div>
        );
    }

}
