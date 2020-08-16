# Week 07

## CSS 属性

文字和排版

> 排版和渲染的基本单位是**盒**。

DOM中存放的是**节点**，比如DTD、文本、注释、CDATA，**包括元素**。

盒模型（*最终会用计算出来的盒进行排版*）

从内到外分别是，content、padding、border、margin。
box-sizing: content-box，border-box（包含了padding和border）

### 正常流

> 排版技术：正常流、flex、grid、CSS Houdini(*3.5*)

排版，可见的东西（*盒、文字*）放到正确的位置（*位置、尺寸*）上。

流程：

1. 收集盒进行
1. 计算盒在行内的排布
1. 计算行的排布

line-box盒block-level-box的从上到下的排布

格式化上下文（*存一些信息*）：
IFC：行盒内部从左到右的排布方式
BFC：块级排布方式

基于基线对齐，中文也是基于基线对齐，只是有一定的偏移。

行模型主要的五条线：
- base-line，基线
- text-top、text-bottom，和文字大小有关。多种字体由最大的决定。
- line-bottom、line-top。当行高大于文字大小的时候会涉及。如果和盒混排的时候，会影响。*只有这两条线会撑开。(其他比如middle等都是不会变的，按文字来)*

盒与文字的混排：
- 盒，默认基线对齐。空盒的下边缘与文字基线对齐，非空盒受盒内文字影响。

用于检查对齐的线的代码（*极小的div，设置overflow为visible，然后里面放一条很长的线*）：
```html
<div style="vertical-align:middle;overflow:visible;display:inline-block;width:1px;height:1px;">
    <div style="width:1000px;height:1px;background:red"></div>
</div>
```

### 块级排布

特别机制：

1. float与clear
float：先正常排，然后往一个方向挤。调整高度所占据的范围内的其他行盒的尺寸。（*理解flaot堆叠现象*）
clear：找到某个方向一个干净的空间来放置元素。 

[margin折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)：同一个BFC，纵向方向

BFC合并

BFC术语：
- Block Container：里面有BFC，没有特殊行为的块基本都是(*特殊行为：table-row，flex、grid*)
    - block
    - inline-block
    - table-cell
    - table-caption
    - flex item
    - grid cell
- Block-level Box：外面有BFC
    - 
- Block Box：Block Container+Block-level Box

display的值：

1. block对应inline-block，其他也基本都有对应的
1. run-in，跟上一个元素来。不用考虑

设立BFC：

1. floats
1. 绝对定位元素
1. block containers。
1. block box ,overflow是visible之外的。

总结：默认能容纳正常流的盒，我们都认为他们会创建BFC。除了overflow为visible的BFC（*相当于没有BFC，会发生BFC合并*）。

BFC合并：

1. float：BFC合并后，相当于没有BFC，会环绕float元素。
1. margin折叠：理解BFC合并后外部的margin还是会生效。创建BFC后，外部margin折叠，内部margin仍然有效。

### flex排版

1. 盒收进行。默认换行，如果设置了no-wrap则强行分配进第一行。
1. 计算主轴排布。
    - 找出flex元素，将剩余空间按比例分配给flex元素。
    - 剩余空间为负数时，flex元素为0，剩下的元素等比压缩。
1. 计算交叉轴排布。根据最大元素计算行高。根据flex-align（*align-items：flex-start、flex-end、center、stretch*）和item-align（*align-self*）确定元素位置。

### CSS动画与绘制

Animation

1. @keyframes。定义一个名字，然后可以使用from、to、%等，里面是declaration（*键值对*）
1. 使用animation属性。有动画名字name、时长duration、函数timing-function、延迟delay、次数iteration-count、方向direction

Transition

属性property、时长duration、函数timing-function、延迟delay

Timing Function，主要是三次贝塞尔曲线（*理解一次、二次、三次*）。可以从[cubic-bezier](https://cubic-bezier.com/)调节。

渲染和颜色：

1. 红绿色三原色。视锥细胞只有三种，分别可以感受这三种颜色。
1. 小时候调色使用的红黄蓝三原色。（其实是品红、黄和青，是红绿蓝的补色，颜料会吸收对应的光。印刷行业用的CMYK，因为黑色用其他的混合太贵了）
1. HSL和HSV，W3C选择了HSL，因为是对称的。理解调节色相H的方式来改变颜色，这时候其他的明暗关系和鲜艳程度也都还保留着。
    - H，Hue，色相。6种颜色拼成一个色盘，然后通过指定在色盘中的角度来指定颜色。
    - S，Stauration，纯度。
    - L，lightnass，亮度，100%时是白色，50%是纯色。
    - V，value，色值，100%是纯色。

绘制：

1. 几何图形
    - border
    - box-shadow
    - border-radius
1. 文字，字形glyph，类似矢量图
    - font
    - text-decoration
1. 位图
    - background-image
    - img标签也会产生图片

图形库，最底层的Shader。函数是输入坐标，输出color，根据坐标算颜色，然后绘制。

可以使用data uri + svg来绘制各种图片

# 作业：CSS 属性分类