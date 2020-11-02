# 完善脚手架，增加测试模块

## 0. 关于测试的东西

一般是针对高复用的内容（*组件、框架、库*）进行测试。前端页面由于其变动快，针对其写UI测试会很繁琐。

## 1. 目标

1. 使用mocha写测试
1. 使用nyc做code coverage
1. 集成Babel后的调试配置
1. 集成到vue的generator中

## 2. 整理的步骤

1. 安装`mocha`、`nyc`、`babel`系列。新增`babel-register`，babel-register，可以用于动态编译
    ```bash
    npm install -D @babel/core @babel/preset-env @babel-register mocha nyc
    ```
1. 写`.babelrc`文件，之后我们自己写的js代码都使用es6模块的格式
    ```json
    {
        "presets": [
            "@babel/preset-env"
        ]
    }
    ```
1. 创建一个js文件，写上需要测试的函数，比如`add.js`
    ```js
    export default function add(a, b) {
        return a + b;
    }
    ```
1. 建立test目录，然后里面写上`test.js`的逻辑。可以使用`assert`、`it`（*测试用例，一个单独的测试*）、`describe`（*测试套件，表示一组相关的测试，也可以不用*）等函数的作用。
    ```js
    import add from "../add";
    const assert = require('assert');

    describe("test group 1", () => {
        it('test case 1: 1 + 2 should be 3', () => {
            assert(add(1, 2) === 3);
        })
    })
    ```
1. 使用命令行执行`.\node_modules\.bin\mocha --require "@babel/register"`
1. `package.json`编辑test脚本内容`mocha --require "@babel/register"`，然后执行`npm run test`。(*脚本默认会添加`.\node_modules\.bin\`*)
1. `package.json`编辑coverage脚本内容`nyc npm run test`，然后执行`npm run coverage`
1. VSCode调试配置。测试可以直接调试ES6代码。
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Mocha Tests",
                "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
                "args": [
                    "-t",
                    "tdd",
                    "--require",
                    "@babel/register"
                ],
                "internalConsoleOptions": "openOnSessionStart",
                "skipFiles": [
                    "<node_internals>/**"
                ]
            }
        ]
    }
    ```

## 3. 其他

[测试框架 Mocha 实例教程 - 阮一峰](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)