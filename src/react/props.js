const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

const attachEvent = (elem, evt, handler) => {
    const eventName = evt.toLowerCase().substring(2);
    elem.addEventListener(eventName, handler);
};

const isEvent = (prop) => {
    return prop.startsWith('on') && prop.toLowerCase() in window;
};

const attachStyles = (elem, styleObj) => {
    let styles = '';
    for (let key in styleObj) {
        styles += `${camelToSnakeCase(key)}:${styleObj[key]};`;
    }
    elem.setAttribute('style', styles);
};

export const attachProps = (elem, props) => {
    if (!props) return;

    for (let key in props) {
        if (key === 'style') attachStyles(elem, props[key]);
        else
            isEvent(key)
                ? attachEvent(elem, key, props[key])
                : elem.setAttribute(key, props[key]);
    }
};

