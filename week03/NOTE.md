# 一、表达式

语法

1. 语法树和优先级的关系
    - 优先级会影响到语法树的构成（语法结构）
    - 在JS标准中用产生式来描述优先级
    - 语法结构能表达的内容是要多于运算符优先级能表达的内容，比如`.`运算本身依据前面的语法结构，会具有不同的优先级。（参考Member和Call部分）
    - 优先级
        1. 成员（Member）级别。*（注：并不单指成员访问，而是指与成员访问同一级别的表达式）*
            - 成员访问，a.b、a[b]，以及仅在构造函数中使用的类似的super.a，super[b]
            - 标签函数，详见[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)内的标签函数一节。
            - new.target，用于检测函数或构造方法是否是通过new运算符调用的。返回函数引用，在普通的函数调用中为undefined。
            - 构造函数，new 函数()
        1. New级别，new a优先级低于new a()。***（知道即可，不建议使用构造函数省略括号）***
            - 思考：new a()() / new new a()
            - 例子：new Date.toString()会报错。
        1. Call。注意，括号后的取属性，会让表达式降级为Call表达式。
            - 例子：a().b会先执行a()
1. 运算符的左值和右值，左运算和右运算
    - 不能使用`a+b=c`这种，只有左运算才可以放到`=`的左边。
    - JS没有定义右运算，`Right Handside=!Left Handside`，我们定义好左运算即可。
    - 左运算的标准：是否可以放到`=`左边
    - 不能放到`=`左边，按优先级如下：
        - Update 自增自减，
            - 语法不允许使用 `++a--`
        - Unary (单目运算符)
            - delete、void、typeof
            - +、-
            - ~（按位取反，非整数强制转换然后按位取反）
            - !（非运算，常用于将变量强制转为布尔值）
            - await
        - Exponental，唯一一个右结合的（先算后边的）
            - 比如：`3 ** 2 ** 3 = 3 ** ( 2 ** 3 )`
        - 乘除，需要两边都是数字，会进行强制转换
        - 加减，注意有两种加法，字符串连接和数字相加
        - 移位运算
        - 关系运算，比较、instanceof和in
        - 相等比较
        - 位运算，`&`、`^`、`|`
        - 逻辑运算，`&&`、`||`
        - 条件运算，`?:`，唯一一个三目运算符

运行时

1. 类型转换
1. 引用类型


引用类型

> 简单说，就是删除赋值等写操作是直接对引用进行操作，读操作则是进行解引用。

1. 引用类型分为两部分，`Object`和`Key`，比如`a.b`分别对应其两部分
2. `delete`和`assign`(赋值)这样的基础设施（写操作），是对引用进行操作。
3. 普通的加减法等，会将其解引用，然后进行计算。


## 类型转换

参考[之前的笔记-强制类型转换](https://book.kwok.ink/book/youdontknowjs2.html#%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)

对象拆箱，对象类型转成普通的类型，`ToPrimitive`
1. 转Number先调`valueOf`
1. 需要字符串先调`toString`
1. 如果有`[Symbol.toPrimitive]`，不调其他两个，即使函数的返回值是`null`或`undefined`

装箱
- 会自动进行
- Symbol()不能加new，要装箱需要`new Object(Symbol("123"))`

# 二、语句

语法：
1. 简单语句
    - 表达式语句
    - 空语句(仅`;`)、调试语句(`debugger;`)
    - throw、continue、break、return
1. 组合语句
    - block(`{}`)
    - if、switch
    - 循环语句。特别注意`for`部分
        - for(xx;;)。for语句有另外一个作用域，在{}作用域的外层，每次循环执行过程可以改变作用域的内容
        - for(.. in ..)
        - for(.. of ..)
    - with（不建议用）
    - labelled，给语句加一个标识符。常用于多层嵌套的跳出。
    - try语句，包含try、catch和finnaly
        - 不属于block，花括号由`try`定义，不可省略
        - 内有return也会继续走`finally`，不会打断
1. 声明
    - 老式：作用范围只认function body，没有先后关系。var比较特殊，声明提升，赋值发生在写的地方。
        - 函数，包括产生器、异步函数、异步产生器
        - 变量声明。既有声明的作用，又有实际计算的能力。*在JS标准中将其划为语句。*
    - 新式：在声明前使用会报错，暂存死区。TC39希望的样子
        - class、const、let。

预处理机制：
1. var的变量提升，即使在try catch finally里声明，也会被提升到函数体内
1. const let，暂存死区

作用域：
1. var的作用域在函数体
1. const let 在自己的block语句。*可以利用{}将函数分成多个小节*

# 三、结构化

JS执行粒度（运行时）:
1. 宏任务。给JS引擎执行的一整段代码
1. 微任务（Promise）。
1. 函数调用
1. 语句/声明
1. 表达式
1. 直接量/变量/this ... 

> 关于事件循环：不属于JS语言和引擎的内容，由浏览器和node自己实现。如果用户使用JSC，也会需要去自行实现一个这样的东西。

函数调用会生成**执行上下文栈**，栈顶的元素称为Running Execution Context

**执行上下文**：
1. Code evaluation state，代码执行状态，执行到哪了，用于async和generate的
1. Function
1. Script or Module
1. Generator，Generator函数每次执行生成的结果
1. Realm，保存我们所有使用的内置对象的领域
1. LexicalEnvironment，执行代码中所需要访问的环境，用于保存变量的
    - this
    - new.target
    - super
    - 变量
1. VariableEnvironment，用var声明变量会声明到哪。可以说专门为了`eval()`中的`var`声明保留的。

每个函数都是一个**闭包**，包含两部分:
1. 执行环境
1. 代码

运行时：
1. Completion Record，完成记录。语句的执行结果
    - 类型，normal、break、continue、return throw
    - [[value]]，返回值，return throw都会带一个值
    - [[target]]，label语句，标识符+`:`，有些场合会用到，比如break和containue
1. 词法环境（作用域）

### *关于Realms*

> 参考[Arrays, symbols, and realms](https://jakearchibald.com/2017/arrays-symbols-realms/)，[How to understand js realms - Stackoverflow](https://stackoverflow.com/questions/49832187/how-to-understand-js-realms
)

简单理解如下：

1. 每个窗口都有自己的领域，比如使用ifream
1. 每个领域都有自己的全局变量等，比如array等
1. 跨领域调用instanceof，因为他们的原型其实不是同一个Array，所以会判断为false
1. 使用JSON.parse和stringify来解析传递的数据
1. 可以跨领域使用Symbol静态变量或使用Symbol.for()作为变量