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



## 练习

[调色盘](https://jsbin.com/qakeloz/edit?html,output)

# 二、Range API和CSSOM



## 练习

[拖拽](https://jsbin.com/cazofil/edit?html,output)