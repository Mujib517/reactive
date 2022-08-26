const arePropsEqual = (node1, node2) => {
    if (node1.nodeType === 3) return true;

    const attributes = node1.getAttributeNames();
    for (let attr of attributes) {
        if (node1.getAttribute(attr) !== node2.getAttribute(attr)) {
            node2.setAttribute(attr, node1.getAttribute(attr));
        }
    }
    if (node1.hasAttributes() !== node2.hasAttributes()) {
        return false;
    }
    return true;
};

const areSameElements = (node1, node2) => {
    return node1.tagName === node2.tagName;
};

const areContentsSame = (node1, node2) => {
    if (node1.nodeType === 3 && node2.nodeType === 3) {
        return node1.textContent === node2.textContent;
    }
    return true;
};

const reconcileRec = (vRoot, domRoot) => {
    if (!vRoot && !domRoot) return;

    if (!areSameElements(vRoot, domRoot)) {
        domRoot.replaceWith(vRoot.cloneNode(true));
        return;
    }
    if (!areContentsSame(vRoot, domRoot)) {
        domRoot.textContent = vRoot.textContent;
        return;
    }
    if (!arePropsEqual(vRoot, domRoot)) {
        domRoot.attributes = vRoot.attributes;
    }

    for (let i = 0; i < vRoot.childNodes.length; i++) {
        const vChild = vRoot.childNodes[i];
        const domChild = domRoot.childNodes[i];
        reconcileRec(vChild, domChild);
    }
};


const reconcile = (vDom, dom) => {
    reconcileRec(vDom, dom);
};

export default reconcile;
