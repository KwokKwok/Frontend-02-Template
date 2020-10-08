手势的基本知识

1. 为什么
    1. 细微的拖拽也会位移，在触摸情况下，微小的位移是不可避免的
    1. 鼠标和触屏的逻辑不太一样，需要做统一触屏

1. 统一抽象到start、move、end
1. tap事件
1. pan事件，10px作为移动的误差，pan start、pan、pan end\flick
    1. 10px特指Retina屏（*2倍屏*）
1. press事件，0.5s
    1. press可以进入pan或者press end状态，区别是是否有移动


实现鼠标操作

1. context，针对不同的按键，记录不同的上下文
1. 掩码
1. buttons和button的顺序不一致，需要处理

1. 使用[document.documentElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement)返回文档对象的根元素（*如HTML文档的 `<html>` 元素*）;
1. [`addEventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)第三个参数，可以是Boolean（*useCapture*）或者对象（*options*）

1. 触摸事件，不需要监测是否按下鼠标才开始监测移动事件
1. event.changedTouches，可以区分多个触摸点。还有一个identfier
1. touchcancel事件，比如触摸中间出现alert等**系统**操作，都会把`end`事件变成`cancel`


处理鼠标事件

1. event.button和event.buttons（*采用掩码模式，move时使用*）

派发事件

1. new Event();
1. element.dispatchEvent()，然后监听该事件

flick事件

1. 需要判断速度

封装

1. 监听 -> 识别 -> 分发


[练习](https://jsbin.com/wafojoq/edit?html,js,output)
