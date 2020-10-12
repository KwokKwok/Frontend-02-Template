import { createElement } from "./framework.js";
import { Carousel } from "./Carousel.js"
import { List } from "./List.js"

let d = ["yellow", "blue", "green", "black"];

let a = <Carousel
    onClick={e => console.log("click: " + e.detail.color)}
    onChange={e => console.log("switch: " + e.detail.position)} src={d}>

    // </Carousel>

// let a = <Button>
//     <a>123</a>
// </Button>

// let a = <List data={d}>
//     {
//         (record) =>
//             <div>
//                 <span class={record}>{record}</span>
//             </div>
//     }
// </List>

a.mountTo(document.body)