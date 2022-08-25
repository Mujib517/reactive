const arePropsEqual = (node1, node2) => {
    if (node1.nodeType === 3) return true;
    for (let attr of node1.attributes) {
        console.log(attr);
    }
    if (node1.hasAttributes() !== node2.hasAttributes()) {
        return false;
    }
    return true;
};

const areSameElement = (node1, node2) => {
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

    if (!areSameElement(vRoot, domRoot)) {
        domRoot = vRoot;
        return;
    }
    if (!areContentsSame(vRoot, domRoot)) {
        domRoot.textContent = vRoot.textContent;
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
    console.log('after reconciliation dom is ', dom);
};

export default reconcile;
