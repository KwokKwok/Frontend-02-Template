import { STATE, ATTRIBUTES, Component, createElement } from "./framework.js"
import { enableGesture } from "./gesture.js"

export { STATE, ATTRIBUTES } from "./framework.js"

export class Button extends Component {
    constructor() {
        super();
    }

    render() {
        this.childContainer = <div />;
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }

    appendChild(child) {
        if (!this.childContainer)
            this.render();
        this.childContainer.appendChild(child);
    }
}
