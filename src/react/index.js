import utils from "../utils";
import { attachProps } from './props';
import { appendChildren } from './children';
import reactDom from "../react-dom";

class Component {
    state = {}

    constructor(props) { }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        reactDom.rerender();
    }
}

const createElement = (el, props, ...children) => {
    if (utils.isClass(el)) {
        return new el(props).render();
    }
    else if (typeof el === 'function') {
        return el(props);
    }
    else {
        const htmlElem = document.createElement(el);
        attachProps(htmlElem, props);
        appendChildren(htmlElem, children);
        return htmlElem;
    }
};


export default { createElement, Component };
