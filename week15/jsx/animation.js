const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time-map");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

const TimelineState = {
    INITED: Symbol.for("inited"),
    RUNNING: Symbol.for("running"),
    PAUSED: Symbol.for("paused")
}
export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_TIME] = 0;
        this[PAUSE_START] = null;
        this.state = TimelineState.INITED;
    }

    start() {
        if (this.state !== TimelineState.INITED)
            return;
        this.state = TimelineState.RUNNING;
        let startTime = Date.now();
        this[TICK] = () => {
            let now = Date.now();
            for (const animation of this[ANIMATIONS]) {
                let t;
                if (this[START_TIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME] - animation.delay;
                } else {
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
                }
                if (animation.duration <= t) {
                    this[ANIMATIONS].delete(animation);
                    t = animation.duration;
                }
                if (t > 0)
                    animation.receiveTime(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause() {
        if (this.state !== TimelineState.RUNNING)
            return;
        this.state = TimelineState.PAUSED;
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }

    resume() {
        if (this.state !== TimelineState.PAUSED)
            return;
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[PAUSE_START] = null;
        this.state = TimelineState.RUNNING;
        this[TICK]();
    }

    reset() {
        this.pause();
        this.state = TimelineState.INITED;
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_TIME] = 0;
        this[PAUSE_START] = null;
        this[TICK_HANDLER] = null;
    }

    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration = 0, delay = 0, timingFunction = time => time, template = v => v) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        this.template = template;
    }

    receiveTime(time) {
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.template(this.startValue + range * this.timingFunction(time) / this.duration);
    }
}