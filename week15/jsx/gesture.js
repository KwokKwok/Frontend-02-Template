export class Dispatcher {
    constructor(element) {
        this.element = element;
    }

    dispatch(type, props) {
        let event = new Event(type);
        for (const name in props) {
            event[name] = props[name];
        }
        this.element.dispatchEvent(event);
    }
}

export class Listener {
    constructor(element, recognizer) {
        let contexts = new Map();
        let isListeningMouse = false;


        element.addEventListener("mousedown", event => {
            let context = Object.create(null);
            let buttonKey = (key) => "mouse" + key;
            contexts.set(buttonKey(1 << event.button), context)
            recognizer.start(event, context);

            let mousemove = event => {
                let button = 1;
                while (button <= event.buttons) {
                    if (button & event.buttons) {
                        let key = button;
                        if (key === 2) {
                            key = 4;
                        } else if (key === 4) {
                            key = 2;
                        }
                        let context = contexts.get(buttonKey(key));
                        recognizer.move(event, context);
                    }
                    button = button << 1;
                }
            };
            let mouseup = event => {
                let context = contexts.get(buttonKey(1 << event.button));
                recognizer.end(event, context);
                contexts.delete(buttonKey(1 << event.button));
                if (event.buttons === 0) {
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                    isListeningMouse = false;
                }

            };

            if (!isListeningMouse) {
                document.addEventListener("mouseup", mouseup);
                document.addEventListener("mousemove", mousemove);
                isListeningMouse = true;
            }
        })

        element.addEventListener("touchstart", event => {
            for (const touch of event.changedTouches) {
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognizer.start(touch, context);
            }
        })

        element.addEventListener("touchmove", event => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.move(touch, context);
            }
        })

        element.addEventListener("touchend", event => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.end(touch, context);
                contexts.delete(touch.identifier);
            }
        })

        element.addEventListener("touchcancel", event => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.cancel(touch, context);
                contexts.delete(touch.identifier);
            }
        })
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }


    recordPoint(point) {
        return {
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        };
    }

    start(point, context) {
        context.startX = point.clientX, context.startY = point.clientY;

        context.points = [
            this.recordPoint(point),
        ]
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.handler = setTimeout(() => {
            this.dispatcher.dispatch("press", {});
            context.isPress = true;
            context.isTap = false;
            context.isPan = false;
            context.handler = null;
        }, 500);
        this.dispatcher.dispatch("start", {
            clientX: point.clientX,
            clientY: point.clientY
        })
    }

    move(point, context) {
        clearTimeout(context.handler);
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            this.dispatcher.dispatch("panstart", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
        }

        if (context.isPan) {
            this.dispatcher.dispatch("pan", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
        }
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push(this.recordPoint(point));
    }

    end(point, context) {
        if (context.isPress) {
            this.dispatcher.dispatch("pressend", {});
        }
        if (context.isTap) {
            this.dispatcher.dispatch("tap", {});
            clearTimeout(context.handler);
        }
        let d, v;
        if (!context.points.length) {
            v = 0;
        } else {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
            v = d / (Date.now() - context.points[0].t);
        }

        if (v > 1.5) {
            this.dispatcher.dispatch("flick", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isFlick: context.isFlick,
                isVertical: context.isVertical,
                velocity: v,
            });
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            this.dispatcher.dispatch("panend", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isFlick: context.isFlick,
                isVertical: context.isVertical,
                velocity: v,
            });
        }

        this.dispatcher.dispatch("end", {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            isFlick: context.isFlick,
            isVertical: context.isVertical,
            velocity: v,
        });
    }

    cancel(point, context) {
        clearTimeout(context.handler);
        this.dispatcher.dispatch("cancel", {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            isFlick: context.isFlick,
            isVertical: context.isVertical

        });
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}