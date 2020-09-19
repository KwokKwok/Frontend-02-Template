import { Component, createElement } from "./framework.js"

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel")
        for (const record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundColor = record;
            this.root.appendChild(child);
        }

        this.root.addEventListener("dragstart", () => false);
        let currentIndex = 0;

        this.root.addEventListener("mousedown", mouseDownEvent => {
            let moveDistance = (x, y) => { return { x: x - mouseDownEvent.clientX, y: y - mouseDownEvent.clientY } };
            HTMLElement.prototype.translateX = function (px) {
                this.style.transform = `translateX(${px}px)`
            }
            HTMLElement.prototype.transition = function (trans) {
                this.style.transition = trans;
            }
            let children = this.root.children;
            let rootWidth = this.root.getBoundingClientRect().width;

            let onmove = e => {
                let distance = moveDistance(e.clientX, e.clientY);
                let current = currentIndex - ((distance.x - distance.x % rootWidth) / rootWidth);

                for (const offset of [-2, -1, 0, 1, 2]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.transition("none");
                    child.translateX(-pos * rootWidth + offset * rootWidth + distance.x % rootWidth);
                }
            }
            let onup = e => {
                let distance = moveDistance(e.clientX, e.clientY);
                let x = distance.x;
                currentIndex -= Math.round(x / rootWidth);
                let current = currentIndex - ((x - x % rootWidth) / rootWidth);

                for (const offset of [0, -Math.sign(Math.round(x / rootWidth) - x + 250 * Math.sign(x))]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.transition("");
                    child.translateX(-pos * rootWidth + offset * rootWidth);
                }

                document.removeEventListener("mouseup", onup);
                document.removeEventListener("mousemove", onmove);
            }

            document.addEventListener("mousemove", onmove)
            document.addEventListener("mouseup", onup)
        })

        let timer = null;
        let switchNext = () => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;
            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(100%)`;
            setTimeout(() => {
                next.style.transition = "";
                next.style.transform = "none";
                current.style.transform = `translateX(-100%)`
            }, 16);

            // timer = setTimeout(() => {
            //     currentIndex = nextIndex;
            //     switchNext();
            // }, 1500);
        }

        // timer = setTimeout(() => {
        //     switchNext();
        // }, 1500);

        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = ["yellow", "blue", "green", "black"];

let a = <Carousel src={d}>

</Carousel>

a.mountTo(document.body)