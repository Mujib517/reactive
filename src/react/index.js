import utils from "../utils";
import { attachProps } from './props';
import { appendChildren } from './children';
import ReactDOM from '../react-dom';

let id = 0;

class Component {
    state = {};
    instanceId = null;
    root = null;

    constructor(props) { }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        ReactDOM.updateVirtalDOM(this.render(), this.instanceId);
    }
}

const createElement = (el, props, ...children) => {
    if (utils.isClass(el)) {
        const component = new el(props);
        const instanceId = ++id;
        component.instanceId = instanceId;
        const componentHtml = component.render();
        componentHtml.setAttribute('instance-id', instanceId);
        return componentHtml;
    }
    else if (typeof el === 'function') {
        return el(props);
    }
    else {
        const htmlElem = document.createElement(el);
        attachProps(htmlElem, props);
        appendChildren(htmlElem, children);
        return htmlElem;
    }
};


export default { createElement, Component };
