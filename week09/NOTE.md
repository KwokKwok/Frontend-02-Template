**同note.md，包含对作业的代码实现（JS Bin）*
# 编程和算法训练（*Week09*）

## 一、TicTacToc小游戏

### 游戏的基础实现

> 编程训练：算法+数据结构+语言特性
tips:

1. 使用`innerHTML=""`直接清空div
1. 使用border来设置间隔（*我使用了margin，加一些css让间隔保持一致*）
1. 通过让`line-height`和div高度一致，可以设置字体居中
1. 为了div垂直居中对齐，需要重新设置`vertical-align`，默认baseline对齐可能因为div中的文本导致baseline不一致。
1. 多级三目表达式的写法
1. 使用br标签换行（*我使用指定宽度*）
1. 使用`{}`创建新的作用域以重复使用变量

实现流程：

1. 创建棋盘，设置样式
1. 监听点击事件（*落子函数*）
1. 判断胜利（*check函数*），判断四种情况
    1. 行一致
    1. 列一致
    1. 斜向一致（*两种*）
1. willWin函数，遍历空节点，检查是否可以胜利

### 为TicTacToe添加AI

tips:

1. 最大深度，为节省计算会在某个计算阈值返回一个赢的概率
1. win-lost剪枝，确定会赢后不再继续计算
1. 一维数组的拷贝，可以使用原型的方式`return Object.create(array)`，可以很大的节省内存;
1. 通过指定label的方式break外层循环

流程：

1. bestChoise()
    1. 先判断willWin，直接返回
    1. 找到对方最差的点，返回
    1. 无点可走，返回0
1. 二维转一维，方便copy
1. 在用户userMove之后加上一个computerMove，实现简单的AI

### **作业*

- [TicTacToc](https://jsbin.com/lorotoz/edit?html,output)
- [五子棋](https://jsbin.com/yurolad/edit?html,output)

## 二、寻路

### 知识准备：异步编程

1. 使用Promise实现sleep函数
1. async/await
1. happen函数，对事件进行的一种封装
1. 生成器函数，函数后面加上*号，可以在里面使用`yield`。（*因为生成器函数出现的比较早，可以用来模拟async/await*）
    - async generater，使用了async/await的生成器函数
    - 生成器函数的执行返回的是迭代器，可以用`for of`进行迭代

### 地图编辑器

> 重点：寻路算法、算法步骤可视化
创建一个100*100的地图编辑器，实现以下功能：

- 左键按下后滑动鼠标，设置墙
- 右键按下后滑动鼠标，移除墙
- localStorage用来保存和加载地图

### 广度优先算法


tips：

1. 寻路使用广度优先比较好，也可以使用递归实现深度优先搜索
1. 队列，push和shift来实现入队和出队（*unshift和pop也可以实现*）
1. 可以使用使用push和pop来实现深度优先

流程：

1. 从起点出发，把可以走到的点周围的点加入可走到的点
    1. insert函数，判断边缘、墙、和已经走过的点
1. 访问到目的点，完成寻路

### 算法可视化部分

执行一步后加上延时，然后设置格子颜色

### 启发式搜索（一）之Sorted结构

Sorted，取的时候拿出来一个最小的。

要求：

1. 传入data和compare
    1. compare有一个默认的函数
1. take()
    1. 在数组为空时返回undefined，因为null是可能的正常返回值
    1. 遍历找到最小值
    1. 移除最小值（*因为数组是无序的，可以把最后的元素放在要移除的位置，然后调用pop()方法。不适用splice因为它移除数据后，会把后面的数据都往前挪，是一个O(n)的操作。*）

### 启发式搜索（二）之A*实现

1. 使用Sorted替换原来的数组，comparer传入distance()函数
    - 使用乘方来计算。因为是给comparer使用，所以可以不开根号。
1. 每次取出来的都是和终点比较接近的点

### **优化点*

1. 对寻路冗余的处理
1. 使用二叉堆替换Sorted以实现更好的性能

### 实现

- [寻路](https://jsbin.com/xibetij/edit?html,output)
- [寻路 二叉堆版](https://jsbin.com/xehizav/1/edit?html,output)