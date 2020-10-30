# 工具链 - 初始化与构建

> Yeoman用于构建脚手架。Webpack用于打包JS文件，Babel用于将新版本的JS转译为旧版本JS，让其可以在低版本浏览器中正常运行。他们都是单独的模块，也可以结合使用。

## 一、Yeoman

[使用文档](https://yeoman.io/authoring/index.html)

```sh
# 安装yeoman、generator-generator
npm install -g yo
npm install -g generator-generator
```

### 0. 基础

大体流程：

1. 执行`yo generator ${generator-name}`，按提示创建生成器项目
1. 进入新创建的文件夹，然后执行[`npm link`](https://javascript.ruanyifeng.com/nodejs/npm.html#toc18)
1. 完善修改生成器项目
1. 找一个文件夹，生成项目，执行`yo ${generator-name}`

主要文档结构：

```sh
├───package.json
└───generators/
    ├───app/
    │   └───index.js
```

使用生成器生成项目时会顺序执行`generators\app\index.js`下类的各个函数（*一些特殊函数是有默认的优先级的，参见[运行中的上下文](https://yeoman.io/authoring/running-context.html)*）：

```js
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }
};
```

### 1. 参数收集

```js
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // 要求必须输入appname
    this.argument("appname", { type: String, required: true });
    this.log(this.options.appname);
  }
  async prompting() {
    // 可以输入项目名称，默认为appname
    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "项目名称",
        default: this.options.appname
      },
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    this.props = await this.prompt(prompts);
  }

  writing() {
    this.log(JSON.stringify(this.props))
  }
};
```

### 2. 文件复制

```js
// 复制文件夹下面的所有文件，到指定的文件夹
this.fs.copy(this.templatePath("copy"), this.destinationPath());

// 复制文件，并使用属性填充模板。模板语法 <%= title %>
this.fs.copyTpl(this.templatePath(`index.html`), this.destinationPath("publish/index.html"), {title:"template title"});
```

### 3. npm安装

[文档](https://yeoman.io/authoring/dependencies.html)

```js
const pkgJson = {
    devDependencies: {
        eslint: '^3.15.0'
    },
    dependencies: {
        react: '^16.2.0'
    }
};

// 写package.json
this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);


// 调用npm install
this.npmInstall();

// 也可以使用yarn
this.yarnInstall(['lodash'], { 'dev': true });
```

### 4. 其他

```js
// 多彩控制台输出
const yosay = require('yosay');
const chalk = require("chalk");

_yosay(msg, color = "yellowBright") {
    this.log(yosay(chalk[color](msg)));
}

method1(){
    _yosay("done");
    // 执行命令行
    this.spawnCommand(`code ${this.destinationPath()}`);
}
```

### **关于npm包的发布和删除*

```bash
npm login

# 发布
npm publish

# 删除。72小时内可删除，删除24小时内不能重新发布
npm unpublish yuyy-test-pkg --force
```

### 成果

[generator-kkvue](https://www.npmjs.com/package/generator-kkvue) 

[![npm version](https://badge.fury.io/js/generator-kkvue.svg)](//npmjs.com/package/generator-kkvue)

## 二、Webpack基础

知识点：

1. 最初是为node涉及的打包工具，把node的代码打包成浏览器可用的代码。针对JS。其他基于HTML打包的工具，在配置上要求低一点。
1. 多文件合并。通过loader和plugin，控制规则、文本转换，进行合并。
1. webpack涉及两个node module，webpack命令在webpack里，但是使用需要安装webpack-cli。
1. npx-webpack，没有安装就会安装webpack，安装过就不会重复安装了。不全局安装可以避免项目在不同电脑环境下打包结果不一致。
1. webpack-config，入口文件。多个文件打包，也是一次只进行一个。
1. loader，在module的rules中配置。loader是一个转换，webpack会根据转换结果加载资源。通过test的规则，决定什么后缀使用什么loader。可以使用多个loader。
1. plugin更像是独立的工具

## 三、Babel基础

知识点：

1. babel是一个独立的系统，用于将代码转译为旧标准的js代码，以兼容旧浏览器。
1. 如果不用插件的话，babel会将输入原样输出。它的转译依赖一系列插件。
1. babel 配置插件很多，为了方便使用预设了一些常见的配置，比如最常用的`@babel/preset-env`。
1. 配置使用`.babelrc`文件。常配合webpack使用，在webpack配置中进行配置。