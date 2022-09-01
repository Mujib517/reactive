import $ from 'jquery';

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
        operations.push({ type: op.ReplaceRoot, src: domRoot, dest: vRoot.cloneNode(true) });
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
            const newNode = $(vChild).clone(true, true);
            operations.push({ type: op.Add, parent: domRoot, node: newNode });
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
                operation.node.appendTo(operation.parent);
                break;
            case op.Delete:
                console.log('deleting');
                operation.node.remove();
                break;
            case op.ChangeContent:
                operation.src.textContent = operation.dest.textContent;
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

export default reconcile;
