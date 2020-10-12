import { createElement } from "./framework.js";
import { Carousel } from "./carousel.js"


let d = ["yellow", "blue", "green", "black"];

let a = <Carousel
    onClick={e => console.log("click: " + e.detail.color)}
    onChange={e => console.log("switch: " + e.detail.position)} src={d}>

</Carousel>

a.mountTo(document.body)