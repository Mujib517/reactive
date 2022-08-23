export const appendChildren = (elem, children) => {
    if (!children) return;
    if (Array.isArray(children)) {
        children.forEach(child => appendChildren(elem, child));
    }
    else {
        elem.appendChild(children.nodeType ? children : document.createTextNode(children));
    }
};
