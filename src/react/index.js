const attachProps = (elem, props) => {
    if (!props) return;

    for (let key in props) {
        elem.setAttribute(key, props[key]);
    }
};

const appendChildren = (elem, children) => {
    if (!children) return;
    console.log(children, 'children');
    if (Array.isArray(children)) {
        for (let child of children) {
            if (typeof child === 'function') {
                const html = child();
                console.log(html);
                elem.appendChild(html);
            }

            else elem.appendChild(child);
        }
    } else {
        elem.innerText = children;
    }
};

const createElement = (el, props, children) => {
    const htmlElem = document.createElement(el);

    attachProps(htmlElem, props);
    appendChildren(htmlElem, children);

    return htmlElem;
};


export default { createElement };
