import React, { Component, Fragment } from "react";
import Popup from "../../src";

const animateClassNames = {
	appear: "animated",
	appearActive: "fadeBottomIn",
	enter: "animated",
	enterActive: "fadeBottomIn",
	enterDone: undefined,
	exit: "animated",
	exitActive: "fadeBottomOut",
	exitDone: undefined,
};

const maskAnimateClassNames = {
	appear: "animated",
	appearActive: "fadeIn",
	enter: "animated",
	enterActive: "fadeIn",
	exit: "animated",
	exitActive: "fadeOut",
};

export default class DEMO extends Component {
	state = {
		visible: true,
		mask: true,
	};

	toggleClick = e => {
		const { visible } = this.state;
		this.setState({
			visible: !visible,
		});
	};

	toggleClick2 = e => {
		const { mask } = this.state;
		this.setState({
			mask: !mask,
		});
	};

	render() {
		const { visible, mask } = this.state;

		return (
			<Fragment>
				<div>
					<button onClick={this.toggleClick}>{visible ? "关闭" : "显示"}</button>
					<button onClick={this.toggleClick2}>
						{mask ? "关闭遮罩层" : "显示遮罩层"}
					</button>
					<button onClick={() => this.forceUpdate()}>refresh</button>
				</div>
				<div
					style={{
						height: "calc(100% - 30px)",
						position: "relative",
						border: "1px solid #000",
					}}
				>
					<Popup
						visible={visible}
						mask={mask}
						destroyOnClose={true}
						style={{
							background: "#ff5454",
							color: "#FFF",
							padding: 10,
						}}
						maskProps={{
							onClick: () => {
								this.toggleClick2();
							},
						}}
					>
						<div>fixed test</div>
					</Popup>
				</div>
			</Fragment>
		);
	}
}
