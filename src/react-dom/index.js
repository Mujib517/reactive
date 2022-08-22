const render = (el, node) => {
    if (typeof el === 'function') {
        const html = el();
        node.appendChild(html);
    }
};

export default { render };
