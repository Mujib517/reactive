import React from '../react';
import reconcile from '../react/reconcile';

let app, mountNode;
let virtualDOM = null;
let html = null;


const render = (el, node) => {
    if (typeof el === 'function') {
        app = el;
        mountNode = node;
        html = el();
        virtualDOM = html.cloneNode(true);
        node.replaceChildren(html);
    }
};

const update = (root, instanceId, newChild) => {
    if (!root || root.nodeType !== 1) return;

    const id = root.getAttribute('instance-id');
    if (id == instanceId) {
        root.innerHtml = '';
        root.replaceWith(newChild);
        return;
    }

    for (let i = 0; i < root.childNodes.length; i++) {
        const child = root.childNodes[i];
        update(child, instanceId, newChild);
    }
};

const updateVirtualDOM = (elRoot, instanceId) => {
    elRoot.setAttribute('instance-id', instanceId);

    if (instanceId == virtualDOM.getAttribute('instance-id')) virtualDOM = elRoot;
    else update(virtualDOM, instanceId, elRoot);

    reconcile(virtualDOM, html);
};

export default { render, updateVirtualDOM };
