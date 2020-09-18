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

        let downPoint = null;
        this.root.addEventListener("drag", () => { })
        this.root.addEventListener("mousedown", event => {
            downPoint = {
                x: event.clientX,
                y: event.clientY
            }
        })

        document.addEventListener("mouseup", event => {
            if (!downPoint) return;
            let move = {
                x: event.clientX - downPoint.x,
                y: event.clientY - downPoint.y
            }
            if (move.x === 0 && move.y === 0) {
                console.log("click");
            }
            if (Math.abs(move.x) < 100) return;
            currentIndex = (currentIndex + (move.x > 0 ? -1 : 1)) % this.root.children.length;
            if (currentIndex === -1)
                currentIndex = this.root.children.length - 1;
            if (timer)
                clearTimeout(timer);
            switchNext();
        })

        let currentIndex = 0;
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

            timer = setTimeout(() => {
                currentIndex = nextIndex;
                switchNext();
            }, 1500);
        }

        timer = setTimeout(() => {
            switchNext();
        }, 1500);

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