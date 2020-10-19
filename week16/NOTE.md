# 工具链 - 初始化与构建

> Yeoman用于构建脚手架。Webpack用于打包JS文件，Babel用于将新版本的JS转译为旧版本JS，让其可以在低版本浏览器中正常运行。他们都是单独的模块，也可以结合使用。

## 一、Yeoman

npm link

异步任务

用户输入、确认、模板

文件复制

extendJSON，npminstall

## 二、Webpack基础

build能力

最初是为node涉及的打包工具，把node的代码打包成浏览器可用的代码。针对JS。后起之秀基于HTML打包，配置要求低一点。

多文件合并。通过loader和plugin，控制规则、文本转换，进行合并。

webpack两个包，
webpack命令在webpack里，但是使用需要安装webpack-cli

不想全局安装

npx-webpack，没有安装就会安装webpack，安装过就不会重复安装了。

webpack-config

入口文件，多个文件打包，一次只做一个

输出

loader，在module的rules中配置。loader是一个转换，webpack会根据转换结果加载资源
通过test的规则，决定什么后缀使用什么loader。
可是使用多个loader。

plugin更像是独立的工具

## 三、Babel基础

babel 独立系统

babel 配置很多，预设了一些常见的配置。

babel的安装。

babelrc文件，json配置