import utils from "../utils";

class Component {
    state = {}

    constructor(props) { }

    setState() { }
}

const attachEvent = (elem, evt, handler) => {
    const eventName = evt.toLowerCase().substring(2);
    elem.addEventListener(eventName, handler);
};

const isEvent = (prop) => {
    return prop.startsWith('on') && prop.toLowerCase() in window;
};

const attachProps = (elem, props) => {
    if (!props) return;

    for (let key in props) {
        isEvent(key)
            ? attachEvent(elem, key, props[key])
            : elem.setAttribute(key, props[key]);
    }
};

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
