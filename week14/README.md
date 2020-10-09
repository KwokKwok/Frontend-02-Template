# 手势

> 目的：实现一个库。可以识别出点击（*tap*）、长按（*press*）、滑动（*pan*）、快速滑动（*flick*）等行为。兼顾触屏与鼠标操作，做逻辑上的统一。可同时识别多个按键。

## 一、知识

手势基本知识：

1. 细微的拖拽也会位移，在触摸情况下，微小的位移是不可避免的。所以需要设置阈值来区分点击或滑动事件。
    - 以10px的移动作为点按和滑动的分界线。（*特指Retina屏，即两倍屏。三倍屏15px，单倍屏5px，但实际一般直接按照10px为阈值进行区分*）
1. 将鼠标和触屏操作，统一抽象到start、move、end、cancel(*触屏会出现，比如触摸中间出现alert等系统操作，都会把`end`事件变成`cancel`*)
1. 滑动/快速滑动。主要是panstart、pan、panend、flick
1. 以点击不动**0.5s**为界限，识别press事件。press事件可以进入pan或者pressend状态，区别是是否有移动。
1. 快速滑动事件，相对于普通的滑动，速度更高。可以通过计算滑动速度，进一步判断滑动事件是否是快速滑动。

事件监听与处理：

1. 对于触摸事件，因为移动事件必须在手指按下的基础上才会进行，所以可以直接监测各种事件。不需要像鼠标事件一样，先监测鼠标按下才开始监测移动事件。
1. [TouchEvent.changedTouches](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches)，可以区分多个触摸点。还有一个identfier
1. 鼠标滑动事件的event，button属性不指定某个按键（*保持为0*），因为滑动鼠标的时候可以不按键，或同时按下多个键。使用[MouseEvent.buttons](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons)（*掩码模式*）来识别鼠标滑动时有哪些键被按下。处理时注意两点：
    - 用 & 运算符判断event.buttons中某一位是否被按下
    - 处理event.buttons的**中键和右键**与event.button不一致的问题

事件的派发：

1. `element.dispatchEvent(new Event(type));` 从element派发指定type的事件。
1. `addEventListener(type,handler);` 监听处理指定type的事件。

其他：

1. 使用[document.documentElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement)返回文档对象的根元素（*如HTML文档的 `<html>` 元素*）;
1. [`addEventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)第三个参数，可以是Boolean（*useCapture*）或者对象（*options*）

## 二、实现思路

> 总流程是：监听 -> 识别 -> 分发

监听，将鼠标和触屏的行为统一为start、move、end、cancel：

1. 由一个Map保存各个按键对应的上下文，包含鼠标位置等信息，传入start等处理逻辑。对key的处理：触摸事件直接使用`identfier`，鼠标事件使用`button`（*具体使用时使用 `1<<button` 方便后续计算*）
1. 鼠标监听mousedown，然后开始监听mousemove和mouseup事件，并在mouseup的时候取消监听。
    - 避免在多键按下时重复监听。可以用一个变量记录是否已经添加监听，并在所有按键都mouseup时（*buttons=0*）取消事件监听。
    - mousemove时区分多个按键，分别触发move事件
1. 触屏监听。直接监听touchstart、touchmove、touchend、touchcancel事件。针对changedTouched分别触发对应得事件。

识别：

1. 长按事件。在start时设置一个计时器，在move、end、cancel时取消计时。如果计时正常执行，则触发press事件。
1. 点击事件。在press时或移动时，将isTap置为false。如果在end时判断isTap是true，则触发tap事件。
1. 滑动事件。在move时判断移动距离，如果大于10px。则设置isPan为true，并触发panstart。后续在move时判断isPan为true，即触发pan事件。
1. 快速滑动事件。move时记录时间和坐标。保存最近0.5s内的点。在end逻辑中对0.5内的第一个点和end时的点进行速度判断，如果大于1.5则触发flick事件。

分发：

1. 所有事件都记录startX、startY、clientX、clientY。
1. 移动事件，通过横纵移动距离计算方向。以及是否为快速滑动，并记录快速滑动速度。

封装：

最终效果：`enableGesture(element)`；

[随堂练习代码](https://jsbin.com/wafojoq/edit?js,console,output)
