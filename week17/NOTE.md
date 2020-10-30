# 完善脚手架，增加测试模块

## 关于测试的东西

一般是针对高复用的内容（*组件、框架、库*）进行测试。前端页面由于其变动快，针对其写UI测试会很繁琐。

## 目标

1. 使用mocha写测试
1. 使用nyc做code coverage
1. 集成Babel后的调试配置
1. 集成到vue的generator中

## 知识

### mocha

1. 全局安装（*考虑到其不影响输出结果，并且工具比较简单，所以可以安装在全局吧。不像webpack如果版本不同会影响到最终的打包结果*）
1. 建立test目录，然后里面写上`test.js`的逻辑。
1. 可以使用`assert`。it、describe等函数的作用

### babel

1. package.json module，问题比较多，一般使用babel做
1. webpack 针对dist去做单元测试。测试不该依赖build，并且使用dist代码会给code coverage增添很多麻烦
1. babel-register，可以用于动态编译

```bash
npm install -D @babel/core @babel/preset-env @babel-register mocha
```

写`.babelrc`

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

写函数`add.js`

```js
export default function add(a, b) {
    return a + b;
}
```

写测试函数`test\test.js`

```js
import add from "../add";
const assert = require('assert');

it('1+2 should be 3', () => {
    assert(add(1, 2) === 3);
})
```

执行：

1. 命令行执行`.\node_modules\.bin\mocha --require "@babel/register"`
1. `package.json`编辑test脚本内容`mocha --require "@babel/register"`，然后执行`npm run test`。(*脚本默认会添加`.\node_modules\.bin\`*)

### nyc

```bash
npm install -D nyc
```

`package.json`编辑coverage脚本内容`nyc npm run test`，然后执行`npm run coverage`
