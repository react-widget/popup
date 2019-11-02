import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import PopupContext from "./PopupContext";

class PopupCSSTransition extends CSSTransition {
    static contextType = PopupContext;

    _onEnter = (node, appearing) => {
        const popup = this.context;
        const { destroyOnHide, getPosition } = popup.props;
        if (!destroyOnHide) {
            node.style.display = "";
        }

        if (getPosition) {
            const pos = getPosition(node);
            const transform = v => (typeof v === "number" ? `${v}px` : v);

            if (pos) {
                if ("left" in pos) {
                    node.style.left = transform(pos.left);
                }
                if ("top" in pos) {
                    node.style.top = transform(pos.top);
                }
                if ("right" in pos) {
                    node.style.right = transform(pos.right);
                }
                if ("bottom" in pos) {
                    node.style.bottom = transform(pos.bottom);
                }
            }
        }

        this.onEnter(node, appearing);
    };

    render() {
        const child = super.render();

        return React.cloneElement(child, {
            onEnter: this._onEnter
        });
    }
}

PopupCSSTransition.propTypes = {
    ...CSSTransition.propTypes
};

export default PopupCSSTransition;
