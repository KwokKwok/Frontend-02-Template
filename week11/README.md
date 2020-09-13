学习笔记

# proxy与双向绑定

## 基础知识


[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)：用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

> 即使是赋值，也要自己手动写代码对被代理对象赋值。

示例：

```js
let obj = {
    a=12,
    b=13
}

let po = new Proxy(obj, {
    set(obj, prop, value) {
        console.log("SET");
        obj[prop] = value;
    },
    get(obj, prop) {
        console.log("GET");
        return obj[prop];
    }
})
```

[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

可以使用`has`、`set`和`get`进行设置和访问

## 思路



## 练习

[调色盘](https://jsbin.com/qakeloz/edit?html,output)

# 二、Range API和CSSOM

## 基础知识

1. 鼠标抬起事件加在`document`对象上。
1. range对单个文字的选中。

## 思路

1. 将所有文字解析为range对象，添加加到ranges数组中。
1. 设置事件监听。
    1. 监听方块点击事件，此时开始监听document鼠标移动事件。
    1. 监听document鼠标抬起事件，此时移除对鼠标移动时间的监听。
1. 鼠标移动事件的处理，判断与鼠标位置最接近的文字（*range对象*），将方块插入对应的range对象中。

## 练习

[拖拽](https://jsbin.com/cazofil/edit?html,output)