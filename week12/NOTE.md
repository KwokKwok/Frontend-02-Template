1. 组件

热门话题：
1. 组件化。重中之重。从怎么扩展html标签引申出来的前端架构体系，主要目标是复用。
1. 架构模式。MVC、MVVM等。主要关心前端界面和数据间的交互。

组件与对象、模块的区别。
组件是**UI强相关**的，是一种特殊的对象和模块。
相对于对象的Properties、Methods、Inherit，增加了Attribute（*区别于Properties强调从属关系，更强调描述性，往往使用标记语言。比如HTML中的Attribute和Properties，Properties经常是处理过的，更便于使用的。input的Attribute相当于默认值*）、Config（*创建时配置*） & State（*来自用户*）、Event（*组件提供给开发者使用*）、Lifecycle（*创建销毁created、destoryed。显示/挂载mount、unmount。更新update/render*）、Children（*形成树形结构的必要条件，主要分为Content型和Template型*）


2. 组件系统

环境需要能访问markup和JS代码。

markup风格

1. JSX
1. 类似Vue的标记语言的Parser

JSX

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

3

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

4. 


6. 

clientX,clientY