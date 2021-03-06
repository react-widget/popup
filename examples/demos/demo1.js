import React, { Component } from "react";
import Popup from "../../src";
import $ from "jquery";

export default class DEMO extends Component {
	state = {
		visible: false,
	};

	toggleClick = (e) => {
		const { visible } = this.state;
		this.setState({
			visible: !visible,
		});
	};

	componentDidMount() {
		// setInterval(this.forceUpdate.bind(this), 1000);
	}

	render() {
		const { visible } = this.state;

		return (
			<div>
				<button onClick={this.toggleClick}>{visible ? "关闭" : "显示"}</button>
				<Popup
					rootComponent="div"
					rootClassName="p-root"
					rootStyle={{
						zIndex: 0,
						tabIndex: -1,
					}}
					rootProps={{
						"data-x": "1",
					}}
					visible={visible}
					transition={{
						timeout: 500,
						onEnter: (node) => {
							$(node).hide();
							$(node).stop().fadeIn(500);
						},
						onExit: (node) => {
							$(node).stop().fadeOut(500);
						},
					}}
					getPosition={(dom) => {
						console.log(dom);
						return {
							left: "50%",
							top: 50,
						};
					}}
					// style={{
					//     left: 10,
					//     top: 10
					// }}
				>
					<div className="dialog">center...</div>
				</Popup>
			</div>
		);
	}
}
