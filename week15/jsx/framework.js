export function createElement(type, attributes, ...children) {
    let element;
    if (typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    for (const child of children) {
        if (typeof child === "string")
            child = new TextWrapper(child);
        element.appendChild(child)
    }
    return element;
}

export const STATE = Symbol("state");
export const ATTRIBUTES = Symbol("attributes");


export class Component {
    constructor() {
        this[ATTRIBUTES] = Object.create(null);
        this[STATE] = Object.create(null);
    }

    setAttribute(name, value) {
        this[ATTRIBUTES][name] = value;
    }

    appendChild(child) {
        child.mountTo(this.root)
    }


    render() {

    }

    mountTo(parent) {
        if (!this.root)
            this.render();
        parent.appendChild(this.root);
    }

    triggerEvent(type, args) {
        this[ATTRIBUTES]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, {
            detail: args
        }));
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type);
    }
}