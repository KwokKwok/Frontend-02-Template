# 前端训练营总结

<a name="KjRJl"></a>
## 学习方法与知识体系的构建（1）
> You are the owner of your career. 你需要对自己的职业负责。


<br />怎么能被称为优秀：

1. **领域知识**。领域的边界，知识模块之间的联系。实践中学习。
1. **职业规划**。有明确的职业规划，并从职业规划中延伸出学习计划。很重要。
1. **能力、潜力。**建立知识体系，刻意练习。
1. **成就**。业务、工程、攻坚。


<br />面试题：覆盖面、深度、区分度<br />
<br />面试：论点要有论据和论证支持。遇到难题可以展示分析过程，缩小范围。<br />
<br />学习方法：

1. 整理法。注重知识之间的关系。关系要清晰，知识要完备。
1. 追溯法。源头、标准和文档、大师



<a name="f52y3"></a>
## 重学JavaScript（2-3）

1. [产生式、语言、编程语言](https://www.yuque.com/docs/share/a5325cb0-673d-47b9-b971-9441e1d9230c)
1. [JS之基本元素、表达式、语句、结构化](https://www.yuque.com/docs/share/2e6ecffd-2af3-45e0-9fe8-a018f8bbc51e)，从JS语法入手，讲语义和运行时。

<br />
<a name="JcVwf"></a>

## 浏览器工作原理（4-5）

> 通过[Toy Browser](https://www.yuque.com/docs/share/7ff73bb7-197f-4c6b-9c13-c270870a4154) 熟悉浏览器工作原理

<br />流程：

- 获得HTML。通过网络请求指定URL得到Http响应，然后可以从中解析出Http的响应体body。即HTML。
- 获得DOM。通过对HTML进行解析，得到DOM。
- DOM+样式。对DOM进行CSS计算，得到DOM with css。
- DOM+样式+位置。进行布局，得到DOM with position
- 渲染输出。之后进行渲染成Bitmap进行绘制



<a name="PYd7C"></a>
## 重学CSS（6-7）
> CSS语法包含@规则和普通规则。CSS选择器部分（语法、优先级、伪类和伪元素）、盒与排版（讲了正常流和Flex）、动画与绘制。
> 整理了[CSS属性](https://mubu.com/doc/4rQ9Lx5PjC7#m)

[重学CSS](https://www.yuque.com/docs/share/89e574cc-bfb3-49d9-a030-ba56b4934681)<br />

<a name="lnOgL"></a>
## 重学HTML、浏览器API（8）
> DTD和namespace，HTML语法（包括字符引用语法）与语义化。
> API主要分为四类：DOM、CSSOM、CSSOM View、其他（各种标准化组织制定的）
> 通过代码整理了各种API

[HTML与浏览器API](https://www.yuque.com/docs/share/5b008cd4-c82d-4d9d-b91c-c927d875e9a4)<br />

<a name="IDdlx"></a>
## 编程与算法训练（9-11）
> 通过TicTacToc小游戏，讲解基本的数据结构和AI算法。通过寻路，实现一个地图编辑器，讲解一些算法可视化的知识，广度优先算法和启发式搜索的概念。
> 通过使用LL算法构建语法树讲解基础的语法分析。并实现了几种字符串分析算法，Tire树、KMP、Wildcard

1. [算法训练游戏：TicTacToc和寻路](https://www.yuque.com/docs/share/1134c78f-c774-4d9d-8844-3f1c56550c21)
1. [语法分析和字符串分析](https://www.yuque.com/docs/share/4b4b8998-bf83-43e2-a409-28c7143b1ae4)



<a name="wMpZB"></a>
## 组件化（12-15）
> 首先讲了Proxy代理和双向绑定，已经如何使用Range API来提升组件化性能。
> 后续讲了JSX语法如何解析，带领我写了自己的JSX语法解析代码。
> 实现了一个Carousel轮播图组件。写组件的过程中，一步步的讲解了动画、手势、封装等一系列内容。

<br />

1. [Proxy代理与双向绑定、Range API和CSSOM](https://www.yuque.com/docs/share/3ffa0592-e5b0-4141-9a62-30b3030e1493)
1. [组件化基础、JSX语法解析。与Carousel组件](https://www.yuque.com/docs/share/4d69250c-0111-4d4b-865e-d358d6e5a1be)



<a name="f5zbh"></a>
## 工具链（16-17）

1. [Yeoman、Webpack与Babel基础](https://www.yuque.com/docs/share/f3d95f60-32a3-4747-aba0-b03148d19087)
1. [测试：mocha和nyc的基本使用](https://www.yuque.com/docs/share/29fa6103-bc65-4381-bf4a-047810b8b4cb)

<br />
<a name="Nhjvq"></a>

## 发布系统（18-19）

> 首先讲了一些Linux虚拟机操作和node环境、端口映射、SSH和SCP等基础知识。然后讲了express框架（发起请求与响应请求、nodejs流、文件传输和压缩）和[github oAuth授权](https://www.ruanyifeng.com/blog/2019/04/github-oauth.html)。

> 讲了daily build和BVT（构建验证测试。冒烟测试。提交之前先进行简单的验证），然后介绍了如何利用Git进行ESLint检查。最后介绍了Chrome的headless模式（[pupperteer](https://github.com/puppeteer/puppeteer)模块）


<br />TODO 梳理一遍实现了什么，怎么实现
