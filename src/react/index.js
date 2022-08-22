const attachProps = (elem, props) => {
    if (!props) return;

    for (let key in props) {
        elem.setAttribute(key, props[key]);
    }
};

const appendChildren = (elem, children) => {
    if (!children) return;
    if (Array.isArray(children)) {
        children.forEach(child => appendChildren(elem, child));
    }
    else elem.appendChild(children.nodeType ? children : document.createTextNode(children));
};

const createElement = (el, props, ...children) => {
    if (typeof el === 'function') {
        return el();
    } else {

        const htmlElem = document.createElement(el);
        attachProps(htmlElem, props);
        appendChildren(htmlElem, children);
        return htmlElem;
    }
};


export default { createElement };
