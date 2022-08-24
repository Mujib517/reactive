import React from '../react';

let app, mountNode;
let virtualDOM = null;


const render = (el, node) => {
    if (typeof el === 'function') {
        app = el;
        mountNode = node;
        const html = el();
        virtualDOM = html.cloneNode(true);
        node.replaceChildren(html);
    }
};

const findElementRoot = (root, instanceId, newChild) => {
    if (!root || root.nodeType !== 1) return;
    const id = root.getAttribute('instance-id');
    if (id == instanceId) return root;

    for (let i = 0; i < root.childNodes.length; i++) {
        const child = root.childNodes[i];
        if (findElementRoot(child, instanceId, newChild)) {
            root.insertBefore(newChild, child);
            child.remove();
            return;
        }
    }
};

const updateVirtalDOM = (elRoot, instanceId) => {
    elRoot.setAttribute('instance-id', instanceId);
    findElementRoot(virtualDOM, instanceId, elRoot);
    console.log(virtualDOM, 'vdom');
};

export default { render, updateVirtalDOM };
