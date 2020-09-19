本节重点：

1. 组件化的基本知识
1. 实现一个简单的轮播组件

# 一、组件化的基本知识

## 概念

前端的热门话题：

1. **组件化**。重中之重。从怎么扩展html标签引申出来的前端架构体系，主要目标是复用。
1. 架构模式。MVC、MVVM等。主要关心前端界面和数据间的交互。

组件与对象、模块的区别：

1. 组件是**UI强相关**的，是一种特殊的对象和模块。
1. 相对于对象的Properties、Methods、Inherit，增加了
    - Attribute。(*区别于Properties强调从属关系，更强调描述性，往往使用标记语言。比如HTML中的Attribute和Properties，Properties经常是处理过的，更便于使用的。input的Attribute相当于默认值。*)
    - Config（*创建时配置*） & State（*来自用户*）
    - Event（*组件提供给开发者使用*）
    - Lifecycle（*创建销毁created、destoryed。显示/挂载mount、unmount。更新update/render*）
    - Children（*形成树形结构的必要条件，主要分为Content型和Template型*）

## JSX语法解析

> 搭建一个环境，可以解析标记语言。目前常见两种标记风格，JSX和类似Vue的标记语言。这里使用JSX，本步骤的目的是成功解析JSX

环境搭建步骤：


1. 新建目录，初始化npm
1. 安装webpack和webpack-cli，简单配置webpack。创建入口文件，可以通过执行webpack指令进行打包，然后在dist目录查看打包效果
    ```js
    module.exports = { // node模块常见的配置方式，CommonJS
        entry: "./main.js", // 入口
        // ...
    }
    ```
1. 安装babel-loader，babel-core，babel-preset-env。安装babel-react-jsx插件`@babel/plugin-transform-react-jsx`并使用。配置模块。main.js添加jsx语法，会发现jsx在打包完被转为React.createElement语句。
    ```js
    module.exports = {
        // ...
        module: { // webpack模块
            rules: [ // 构建规则
                {
                    test: /\.js$/, // 正则指定哪些文件
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ["@babel/plugin-transform-react-jsx"]
                        }
                    }
                }
            ]
        },
    }
    ```
1. 设置webpack模式
    ```js
    module.exports = {
        // ...
        mode = "development"
    }
    ```

最终的`webpack.config.js`：

```js
module.exports = { // 老的node module常见的配置方式
    entry: "./main.js", // 入口
    module: { // webpack模块
        rules: [ // 构建规则
            {
                test: /\.js$/, // 正则指定哪些文件
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-react-jsx"]
                    }
                }
            }
        ]
    },
    mode: "development",// 不再压缩，可以调试
}

// 使用webpack命令打包，然后可以在dist目录看打包结果
```

## 实现自己的JSX处理逻辑

> 编写`createElement()`，替换`React.createElement()`。去除对React框架的依赖。

步骤：

1. 配置jsx插件，用`createElement`替换`React.createElement`。(*`pragma`配置项*)
    ```js
    plugins: [
        [ // 注意将原来插件名字的字符串变成了一个数组，第一项是插件，第二项是一个配置对象
            "@babel/plugin-transform-react-jsx", 
            {
                pragma: "createElement"
            }
        ]
    ]
    ```
1. 代码里写`createElement(type, attributes, ...children)`函数，先尝试将结构添加到页面上
1. 处理文本节点。判断child为字符串时，将child构造为TextNode然后再插入。
1. 处理类。当type首字母大写，作为类型传入。这里需要增加`ElementWrapper`、`TextWrapper`，并重写其中的`appendChild`、`setAttribute`等方法，以及增加一个`mountTo()`方法。如：
    ```js
    class ElementWrapper {
        constructor(type) {
            this.root = document.createElement(type);
        }

        setAttribute(name, value) {
            this.root.setAttribute(name, value);
        }

        appendChild(child) {
            child.mountTo(this.root)
        }

        mountTo(parent) {
            parent.appendChild(this.root);
        }
    }
    ```

最终结果：

```js
export function createElement(type, attributes, ...children) {
    let element;
    if (typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    for (const child of children) {
        if (typeof child === "string")
            child = new TextWrapper(child);
        element.appendChild(child)
    }
    return element;
}

export class Component {
    constructor() {
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type);
    }
}
```

# 二、实现一个简单的轮播组件

> 目标：实现一个名为`Carousel`的轮播组件。支持手动左划右划，自动右划。

知识点：

1. 全局安装`webpack-dev-server`，然后执行，可以自动编译代码更新页面。

[组件代码与运行效果](https://jsbin.com/dunikey/edit?js,output)

随堂代码见附件