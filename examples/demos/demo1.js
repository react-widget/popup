import React, { Component } from 'react';
import Popup from '../../lib';

export default class DEMO extends Component {

    state = {
        visible: false,
    }

    toggleClick = e => {
        this.setState({
            visible: true
        });
    }

    render() {
        const { visible } = this.state;

        return (
            <div>
                <button onClick={this.toggleClick}>显示</button>
                <Popup visible={visible}>
                    test...
                </Popup>
            </div>
        );
    }

}
