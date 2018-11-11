///////////////////////////////////////////////////////////////////
////////////part of react-transition-group/CSSTransition///////////
///////////////////////////////////////////////////////////////////

import addOneClass from 'dom-helpers/class/addClass';
import removeOneClass from 'dom-helpers/class/removeClass';

const addClass = (node, classes) => node && classes && classes.split(' ').forEach(c => addOneClass(node, c));
const removeClass = (node, classes) => node && classes && classes.split(' ').forEach(c => removeOneClass(node, c));



export default {

    onEnter(node, appearing, mask) {
        const { className } = this.getClassNames(appearing ? 'appear' : 'enter', mask)

        //this.removeClasses(node, 'exit', mask);
        addClass(node, className);

    },

    onMaskEnter(node, appearing) {
        this.onEnter(node, appearing, true);
    },

    onEntering(node, appearing, mask) {
        const { activeClassName } = this.getClassNames(
            appearing ? 'appear' : 'enter',
            mask
        );

        this.reflowAndAddClass(node, activeClassName)

    },

    onMaskEntering(node, appearing) {
        this.onEntering(node, appearing, true);
    },

    onEntered(node, appearing, mask) {
        const { doneClassName } = this.getClassNames('enter', mask);

        this.removeClasses(node, appearing ? 'appear' : 'enter', mask);
        addClass(node, doneClassName);

    },

    onMaskEntered(node, appearing) {
        this.onEntered(node, appearing, true);
    },

    onExit(node, mask) {
        const { className } = this.getClassNames('exit', mask)

        this.removeClasses(node, 'appear', mask);
        this.removeClasses(node, 'enter', mask);
        addClass(node, className)

    },

    onMaskExit(node) {
        this.onExit(node, true)
    },

    onExiting(node, mask) {
        const { activeClassName } = this.getClassNames('exit', mask)

        this.reflowAndAddClass(node, activeClassName)

    },

    onMaskExiting(node) {
        this.onExiting(node, true)
    },

    onExited(node, mask) {
        const { doneClassName } = this.getClassNames('exit', mask);

        this.removeClasses(node, 'exit', mask);
        addClass(node, doneClassName);

    },

    onMaskExited(node) {
        this.onExited(node, true)
    },


    getClassNames(type, mask) {
        const classNames = mask ? this.props.maskTransitionClassNames : this.props.transitionClassNames;

        let className = typeof classNames !== 'string' ?
            classNames[type] : classNames + '-' + type;

        let activeClassName = typeof classNames !== 'string' ?
            classNames[type + 'Active'] : className + '-active';

        let doneClassName = typeof classNames !== 'string' ?
            classNames[type + 'Done'] : className + '-done';

        return {
            className,
            activeClassName,
            doneClassName
        };
    },

    removeClasses(node, type, mask) {
        const { className, activeClassName, doneClassName } = this.getClassNames(type, mask)
        className && removeClass(node, className);
        activeClassName && removeClass(node, activeClassName);
        doneClassName && removeClass(node, doneClassName);
    },

    reflowAndAddClass(node, className) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        if (className) {
            /* eslint-disable no-unused-expressions */
            node && node.scrollTop;//此行在Popup组件中可省略
            /* eslint-enable no-unused-expressions */
            addClass(node, className);
        }
    }
}