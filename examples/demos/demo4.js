import React, { Component, Fragment } from "react";
import Popup from "../../src";

const animateClassNames = {
	appear: "animated",
	appearActive: "fadeBottomIn",
	appearDone: "done",
	enter: "animated",
	enterActive: "fadeBottomIn",
	enterDone: "done",
	exit: "animated",
	exitActive: "fadeBottomOut",
	exitDone: "done",
};

const maskAnimateClassNames = {
	appear: "animated",
	appearActive: "fadeIn",
	appearDone: "done",
	enter: "animated",
	enterActive: "fadeIn",
	exit: "animated",
	exitActive: "fadeOut",
};

export default class DEMO extends Component {
	state = {
		visible: true,
		mask: false,
		disableMask: false,
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

	toggleClick3 = e => {
		const { disableMask } = this.state;
		this.setState({
			disableMask: !disableMask,
		});
	};

	render() {
		const { visible, mask, disableMask } = this.state;

		console.log(mask, "render");

		return (
			<Fragment>
				<div>
					<button onClick={this.toggleClick}>{visible ? "关闭" : "显示"}</button>
					<button onClick={this.toggleClick2}>
						{mask ? "关闭遮罩层" : "显示遮罩层"}
					</button>
					<button onClick={this.toggleClick3}>
						{!disableMask ? "禁用遮罩层" : "启用遮罩层"}
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
						disableMask={disableMask}
						visible={visible}
						mask={mask}
						lazy={false}
						destroyOnClose={true}
						style={{
							background: "#ff5454",
							color: "#FFF",
							padding: 10,
						}}
						transition={{
							timeout: 500,
							classNames: animateClassNames,
						}}
						maskTransition={{
							timeout: 500,
							classNames: maskAnimateClassNames,
						}}
						maskProps={{
							onClick: () => {
								this.toggleClick2();
							},
						}}
						destroyOnClose={false}
						fixed
					>
						<div>fixed test</div>
					</Popup>
				</div>
			</Fragment>
		);
	}
}
