import { STATE, ATTRIBUTES, Component } from "./framework.js"
import { enableGesture } from "./gesture.js"
import { Timeline, Animation } from "./animation.js"

export { STATE, ATTRIBUTES } from "./framework.js"

export class Carousel extends Component {
    constructor(interval = 3000, animationDuration = 500, timeFunction = v => v) {
        super();
        this.interval = interval;
        this.animationDuration = animationDuration;
        this.timeFunction = timeFunction;
    }

    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel")
        for (const record of this[ATTRIBUTES].src) {
            let child = document.createElement("div");
            child.style.backgroundColor = record;
            this.root.appendChild(child);
        }
        enableGesture(this.root);
        HTMLElement.prototype.translateX = function (px) {
            this.style.transform = `translateX(${px}px)`
        }
        HTMLElement.prototype.transition = function (trans) {
            this.style.transition = trans;
        }

        this[STATE].currentPosition = 0;
        let children = this.root.children;

        let timeline = new Timeline();
        timeline.start();

        let timer = null;

        let t = 0;
        let ax = 0;

        this.root.addEventListener("start", e => {
            timeline.pause();
            this.rootWidth = this.root.getBoundingClientRect().width;
            if (t) {
                let progress = (Date.now() - t) / this.animationDuration;
                ax = this.timeFunction(progress) * this.rootWidth - this.rootWidth;
            }
            cancelAutoSwitch();
        });

        this.root.addEventListener("tap", e => {
            this.triggerEvent("click", {
                position: this[STATE].currentPosition,
                color: this[ATTRIBUTES].src[this[STATE].currentPosition]
            })
        })

        this.root.addEventListener("pan", e => {
            let rootWidth = this.root.getBoundingClientRect().width;
            let x = e.clientX - e.startX - ax;

            let current = this[STATE].currentPosition - (x - x % rootWidth) / rootWidth;

            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                // 确保pos为正数，然后%length
                pos = (pos % children.length + children.length) % children.length;
                let child = children[pos];
                child.transition("none");
                // 先挪回0的位置，然后根据位置放置在左右，最后加上偏移量
                child.translateX(-pos * rootWidth + offset * rootWidth + x % rootWidth);
            }
        });

        this.root.addEventListener("end", e => {
            timeline.reset();
            timeline.start();

            let rootWidth = this.root.getBoundingClientRect().width;

            let x = e.clientX - e.startX - ax

            let current = this[STATE].currentPosition - (x - x % rootWidth) / rootWidth;
            let direction = Math.round((x % rootWidth) / rootWidth);
            if (e.isFlick) {
                direction = Math.sign((x % rootWidth) / rootWidth);
            }


            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                // 确保pos为正数，然后%length
                pos = (pos % children.length + children.length) % children.length;
                let child = children[pos];
                let startValue = -pos * rootWidth + offset * rootWidth + x % rootWidth;
                let endValue = -pos * rootWidth + offset * rootWidth + direction * rootWidth;
                timeline.add(new Animation(child.style, "transform", startValue, endValue, Math.abs(endValue - startValue) / rootWidth * this.animationDuration, 0, this.timeFunction, v => `translateX(${v}px)`));
            }

            this[STATE].currentPosition -= direction;
            this[STATE].currentPosition = (this[STATE].currentPosition % children.length + children.length) % children.length;
            this.triggerEvent("change", { position: this[STATE].currentPosition });

            autoSwitch();
        })

        let switchNext = () => {
            let children = this.root.children;
            let rootWidth = this.root.getBoundingClientRect().width;
            let nextIndex = (this[STATE].currentPosition + 1) % children.length;
            let current = children[this[STATE].currentPosition];
            let next = children[nextIndex];

            t = Date.now();
            timeline.add(new Animation(current.style, "transform", -this[STATE].currentPosition * rootWidth, - this[STATE].currentPosition * rootWidth - rootWidth, this.animationDuration, 0, this.timeFunction, v => `translateX(${v}px)`));
            timeline.add(new Animation(next.style, "transform", - nextIndex * rootWidth + rootWidth, -nextIndex * rootWidth, this.animationDuration, 0, this.timeFunction, v => `translateX(${v}px)`));
            this[STATE].currentPosition = nextIndex;
            this.triggerEvent("change", { position: this[STATE].currentPosition });
            autoSwitch();
        }

        let autoSwitch = () => {
            timer = setTimeout(() => {
                switchNext();
            }, this.interval);
        }

        let cancelAutoSwitch = () => {
            clearTimeout(timer);
        }
        autoSwitch();
        return this.root;
    }
}
