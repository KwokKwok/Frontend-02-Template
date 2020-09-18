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

1. 构建Proxy对象。为对象增加`get`、`set`监听
1. 记录需要监测的对象属性，在set函数执行时，依次触发注册对应属性的监测callback。
    1. 增加effect函数，函数内会执行一个callback，需要将这个callback增加在每个callback内会访问的属性上。
    1. effect内的callback执行前，清空监测列表。在get代理内，不断往监测列表增加记录。在callback执行完，就可以获取到callback所访问的对象。遍历监测列表，将callback添加到监测属性的callback列表。
1. 为了处理多层对象访问的情况，需要将对象处理成reactive对象保存在reactivies数组内。
1. 处理调色盘逻辑。
    1. 添加三个进度控件，分别用于控制rgb的三个值。添加一个div，将其背景设置为rgb颜色。
    1. 数据到界面映射。增加一个reactive对象，有r、g、b三个属性。分别设置在改变时修改input控件的值，并修改div背景颜色。
    1. 界面到数据映射。为三个input添加监听，在值改变时，修改reactive对象对应的属性值。并修改div背景颜色。

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