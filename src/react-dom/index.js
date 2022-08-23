let app, mountNode;

const render = (el, node) => {
    if (typeof el === 'function') {
        app = el;
        mountNode = node;
        const html = el();
        node.replaceChildren(html);
    }
};

const rerender = () => {
    render(app, mountNode);
};

export default { render, rerender };
