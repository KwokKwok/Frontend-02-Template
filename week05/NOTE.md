# DOM渲染

## 一、计算CSS，得到带样式的DOM树

> 收集CSS规则。为元素匹配CSS规则。根据specificity计算元素最终的样式。

简化：

1. 使用npm模块`css`辅助解析(*注意生成的ast的结构*)
1. 选择器列表css parser会进行解析。忽略复合选择器。只处理复杂选择器（*空格隔开，亲代关系相关*）和简单选择器
1. 不解析`link`，`import`等css语法。忽略可能写在body里的style标签。
1. 在分析元素的时候，假设所有的CSS规则都已经收集完了。

要点：

> Tip：优先级，specificity，专指的程度。`[inline,id,class,tag]`，如`div #id #myid => [0,2,0,1]`。采用高位短路比较。

1. 在创建元素的同时，进行CSS计算
1. 元素的CSS计算：遍历规则，在规则里将复杂选择器拆分成简单选择器，将元素从内到外与选择器进行匹配，最终确定元素是否能与某一规则匹配成功
1. 对规则进项优先级（specificity）计算。应用优先级较高的规则

## 二、布局/排版，得到带位置的DOM树

> 在解析到endTag的部分进行

简化：

1. 仅实现flex布局。

要点：

1. 进行预处理，数字类型转换等。给属性设置默认值。根据flex-direction和flex-wrap对应设置主轴和交叉轴属性。（*mainSize、mainStart、mainEnd、mainSign、mainBase、crossSize、crossStart、crossEnd*）
1. 收集元素到行里，如果设置no-wrap则强制分到行内。
1. 计算主轴。找出所有flex元素，把剩余空间按比例分配给他们。如果剩余空间为负，flex元素宽度为零，其等比例压缩其他元素。
1. 计算交叉轴。根据最大元素计算行高。根据行高的flex-aligh和item-align确定元素具体位置。

## 三、渲染

1. 对最终的DOM进行绘制。这里使用images模块将其输出为图片。

简化：

1. 仅实现`background-color`

要点，递归绘制
