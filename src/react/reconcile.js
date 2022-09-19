let operations = [];

const op = {
    Add: 1,
    Delete: 2,
    ChangeProps: 3,
    ReplaceRoot: 4,
    ChangeContent: 5
};

const arePropsSame = (node1, node2) => {
    if (node1.nodeType === 3 || node2.nodeType === 3) return true;

    if (node1.hasAttributes() !== node2.hasAttributes()) return false;

    const attributes1 = node1.getAttributeNames();
    const attributes2 = node2.getAttributeNames();

    if (attributes1.length !== attributes2.length) return false;

    for (let attr of attributes1) {
        if (node1.getAttribute(attr) !== node2.getAttribute(attr)) return false;
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
        operations.push({ type: op.ReplaceRoot, src: domRoot, dest: vRoot });
        return;
    }

    if (!arePropsSame(vRoot, domRoot)) {
        operations.push({ type: op.ChangeProps, src: vRoot, dest: domRoot });
    }

    if (!areContentsSame(vRoot, domRoot)) {
        operations.push({ type: op.ChangeContent, src: vRoot, dest: domRoot });
        return;
    }

    const totalNodes = vRoot.childNodes.length > domRoot.childNodes.length
        ? vRoot.childNodes.length
        : domRoot.childNodes.length;

    for (let i = 0; i < totalNodes; i++) {
        const vChild = vRoot.childNodes[i];
        const domChild = domRoot.childNodes[i];
        if (vChild && !domChild) {
            operations.push({ type: op.Add, parent: domRoot, node: vChild });
            continue;
        }
        if (!vChild && domChild) {
            operations.push({ type: op.Delete, node: domChild });
            continue;
        }

        reconcileRec(vChild, domChild);
    }
};

const applyProps = (src, dest) => {
    if (!src || !dest) return;

    const srcAttributes = src.getAttributeNames();
    const destAttributes = dest.getAttributeNames();

    const missingProps = destAttributes.filter(attr => !srcAttributes.includes(attr));

    for (let attr of missingProps) dest.setAttribute(attr, null);

    for (let attr of srcAttributes) {
        if (dest.getAttribute(attr) !== src.getAttribute(attr))
            dest.setAttribute(attr, src.getAttribute(attr));
    }
};

const applyOperations = () => {
    for (let operation of operations) {
        switch (operation.type) {
            case op.Add:
                operation.parent.appendChild(operation.node.cloneNode(true));
                break;
            case op.Delete:
                operation.node.remove();
                break;
            case op.ChangeContent:
                operation.dest.textContent = operation.src.textContent;
                break;
            case op.ChangeProps:
                applyProps(operation.src, operation.dest);
                break;
            case op.ReplaceRoot:
                operation.src.replaceWith(operation.dest);
                break;
        }
    }

    operations = [];
};

const reconcile = (vDom, dom) => {
    operations = [];
    reconcileRec(vDom, dom);
    applyOperations();
};


function cloneNodeWithEvents(orgNode) {
    console.log('cloing', orgNode);
    var orgNodeEvenets = orgNode.getElementsByTagName('*');
    var cloneNode = orgNode.cloneNode(true);
    var cloneNodeEvents = cloneNode.getElementsByTagName('*');

    const elem = cloneNodeEvents[1];
    console.log(eval('console.log(elem.onclick)'));
    var allEvents = new Array('onabort', 'onbeforecopy', 'onbeforecut', 'onbeforepaste', 'onblur', 'onchange', 'onclick',
        'oncontextmenu', 'oncopy', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave',
        'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onfocus', 'oninput', 'oninvalid', 'onkeydown',
        'onkeypress', 'onkeyup', 'onload', 'onmousedown', 'onmousemove', 'onmouseout',
        'onmouseover', 'onmouseup', 'onmousewheel', 'onpaste', 'onreset', 'onresize', 'onscroll', 'onsearch', 'onselect', 'onselectstart', 'onsubmit', 'onunload');

    for (var j = 0; j < allEvents.length; j++) {
        // if (orgNode[allEvents[j]]) {
        //     console.log(true, orgNode[allEvents[j]]);
        //     cloneNode[allEvents[j]] = orgNode[allEvents[j]];
        // }
        eval('if( orgNode.' + allEvents[j] + ' ) cloneNode.' + allEvents[j] + ' = orgNode.' + allEvents[j]);
    }

    for (var i = 0; i < orgNodeEvenets.length; i++) {
        for (var j = 0; j < allEvents.length; j++) {
            eval('if( orgNodeEvenets[i].' + allEvents[j] + ' ) cloneNodeEvents[i].' + allEvents[j] + ' = orgNodeEvenets[i].' + allEvents[j]);
        }
    }

    return cloneNode;
}

export default reconcile;
