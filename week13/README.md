# 时间线和动画

## 知识

基础：

1. 16ms。计算机帧之间间隔一般是16ms。因为人眼能分辨的极限是每秒60帧，计算可得每帧16ms即可
1. [requestAnimationFrame()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)，要求浏览器在下次重绘之前调用指定的回调函数。跟浏览器的帧率相关的。比如浏览器降帧时，这个也会随之间隔更久。对应有`cancelAnimationFrame()`。

动画效果的实现一般有三种思路：

1. setInterval。不可控。如果执行慢，可能会发生事件积压。
1. setTimeout。
1. requestAnimationFrame。本例使用。

## 流程

1. 包装一个Timeline类。用来管理多个动画的执行。
    1. 需要`start()`。不需要`stop()`
    1. 需要支持暂停和恢复，`pause()`和`resume()`
    1. 需要支持重置，`reset()`。重置所有东西到最初的状态，相当于`new Timeline()`。
    1. 管理动画。需要提供`add()`接口，可以设置动画启动时间。
    1. 状态管理。可以避免状态混乱，或提供给调用方查看当前运行状态。
1. 包装一个动画类
    1. 封装需要用到的参数。`Animation(object, property, startValue, endValue, duration = 0, delay = 0, timingFunction = time => time, template = v => v)`
    1. 实现一个`receive()`函数，处理指定时间节点的状态。
    1. 针对插值函数`timingFunction`，增加一个`cubicBezier()`来协助生成插值函数。

## 随堂练习

[时间线和动画](https://jsbin.com/nibuzij/edit?js,output);