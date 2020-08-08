# Week06 重学CSS

## 一、CSS总论

> 从CSS语法入手分析CSS的结构。并且用爬虫爬取CSS标准的内容。

### CSS 结构
CSS2.1标准：

- [@charset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@charset)，指定CSS使用的字符编码。必须出现在最开头，重复无效。**对content比较有用**。未指定一般按HTTP Header里指示的，或默认UTF-8。
- [@import](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import)。导入样式表。需要出现在最开头，@charset除外。可以针对媒体查询。
- rules
    - @media
    - @page
    - rule

#### @规则

所有的[@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)，除了CSS2.1语法中的，还有@font-face(*webfont, 也被扩展用于icon font*)、@keyframes、@namespace、@counter-style、@supports、@document

#### CSS规则

一条完整的CSS规则分成如下部分：

- 选择器。selector。目前主要是标准3，标准4在制定中。
- 声明。declaration
    - key。除了属性外，也可以使用css变量，以`--`开头
    - value。不同的属性要求不同的值，也有一些函数。

选择器规则：

1. 四种连接符，> ~ + 空格。
1. 简单选择器，类型、`*`、`.`、Id`#`、伪类`:`、伪元素`::`、属性`[]`、`not()`

### 收集标准（*爬虫部分*）

在[w3.org/TR](w3.org/TR)可以找到各种标准，执行如下代码：

```js
Array.prototype.slice.call(document.getElementById("container").children).filter(item=>item.getAttribute("data-tag").match(/css/)).map(item=>({name:item.children[1].innerText,url:item.children[1].children[0].href}))
```

完整爬虫代码：

```js
let standards = Array.prototype.slice.call(document.getElementById("container").children).filter(item=>item.getAttribute("data-tag").match(/css/)).map(item=>({name:item.children[1].innerText,url:item.children[1].children[0].href}));


// 可以避免跨域的问题
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

// 等待事件发生一次。监听事件，触发后resolve，并移除事件监听。
function happen(element, event){
    return new Promise(resolve => {
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}

function sleep(timeInMs){
    return new Promise(resolve => {
        setTimeOut(() => resolve(), timeInMs);
    })
}

void async function(){
    for(let standard of standards){
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
        // 同域可以直接访问contentDocument，这里打印出所有的属性
        console.log(iframe.contentDocument.querySelectorAll(".propdef"));
        await sleep(2000);
    }
}()
```

## 二、CSS选择器

### 选择器语法

- 简单选择器
    - `*`，通用选择器，选中所有，相当于没有选择器。
    - `div svg|a`。主要是类型。也有[命名空间](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@namespace)的情况出现，实际上svg只有a和html重叠了，MathML和HTML没有重叠的类型名。
    - `.cls`，类选择器
    - `#id`，ID选择器
    - `[attr=value]`，[属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)。`|=`匹配开头、`~=`匹配包含该value的元素（*如`a[class~="logo"]`*），以及很多种其他匹配方式。理论上可以代替类选择器和ID选择器
    - `:hover`，伪类，主要是元素的特殊状态。也可以使用一些函数。
    - `::before`，伪元素，选中一些原本不存在的元素，允许对被选择元素的特定部分修改样式。用单冒号也能解析，但不建议。
- 复合选择器
    - 多个简单选择器**连着写**即可
    - `*`或者`div`必须写在最前面，伪类伪元素需要写在最后面
- 复杂选择器，使用连接符
    - 空格。子孙，从2.1就支持，最早的方式
    - `>`。父子
    - `~`。通用兄弟。`A~B` 选择`A`元素***之后***所有同层级`B`元素。
    - `+`。相邻兄弟。之后
    - `||`。列选择器。做表格时选中某列。****Selector Level 4***
- 选择器列表。用`,`相连接。多个选择器。

### [选择器优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

之前的spcificity，进行一个N进制的计算。IE6使用的255，如果写256个类就相当于一个ID的优先级。现在普遍使用65536

优先级递增：

1. 类型、伪元素。
1. 类、伪类、属性。
1. ID选择器
1. 内联样式
1. `!important`规则

> 通配选择符（universal selector）（*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。

### [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

所有：

- 链接/行为
    - `:any-link`，所有的超链接
    - `link :visited`，未访问过的超链接、已访问的超链接，可以认为加起来相当于`:any-link`。一旦使用，仅支持修改文字颜色。（*处于安全考虑，避免用户访问了哪些网站被知道*）
    - `:hover`。鼠标覆盖。起初只对超链接生效。
    - `:active`。激活状态。起初只对超链接生效。
    - `:focus`。焦点。
    - `:target`。链接到当前的目标。如果HASH匹配了当前超链接，就会激活这个伪类。
- 树结构。会破坏计算CSS的时机，比如`:last-child`需要等一个元素才能知道当前是否是最后一个子元素。
    - `:empty`。是否有子元素
    - `:nth-child()`。将当前元素的兄弟元素(父元素下的所有元素)，从1开始排序。表达式计算匹配(`an+b`，n=0，1，2，3...)。可以使用even(*2n+0*)、odd(*2n+1*)、3N-1(匹配2、5、8...)、4N+1(匹配1、5、9...)
    - `:nth-last-child()`。从后往前数
    - `:first-child`、`:last-child`、`:only-child`
- 逻辑性
    - `:not()`，当前只支持复合选择器。不支持带连接符（*复杂选择器*）或`,`（*选择器列表*）的形式。
    - `:where`、`:has`，****CSS Level 4***

### [伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pseudo-elements)

> 通过选择器向界面上添加了一个不存在的元素。无中生有（*before/after*），或者括起来（*first-line/first-letter*）。

常用的能用的（4种）：

- `::before`
- `::after`
- `::first-line`，注意：针对**排版后**的firstline。可设置的属性有限。
- `::first-letter`。可设置的的属性有限，但较`::first-line`较多

## 作业：思考题

> 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？