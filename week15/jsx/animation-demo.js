import { Timeline, Animation } from "./animation.js"
let tl = new Timeline();

let btnPause = document.getElementById("pause");
let btnResume = document.getElementById("resume");

btnPause.addEventListener("click", () => tl.pause());
btnResume.addEventListener("click", () => tl.resume());
tl = tl;
let animation1 = new Animation(document.getElementById("el1").style, "transform", 0, 300, 3000, 0, v => v, v => `translateX(${v}px)`);
let animation2 = new Animation(document.getElementById("el2").style, "transform", 0, 300, 3000, 500, v => v, v => `translateX(${v}px)`);

tl.add(animation1);
tl.add(animation2);
tl.start();
