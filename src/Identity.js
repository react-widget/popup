import React from 'react';

export default class Identity extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.shouldUpdate;
    }
    render() {
        return this.props.children;
    }
}