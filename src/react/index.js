import utils from "../utils";
import { attachProps } from './props';

class Component {
    state = {}

    constructor(props) { }

    setState() { }
}

const appendChildren = (elem, children) => {
    if (!children) return;
    if (Array.isArray(children)) {
        children.forEach(child => appendChildren(elem, child));
    }
    else {
        elem.appendChild(children.nodeType ? children : document.createTextNode(children));
    }
};

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
