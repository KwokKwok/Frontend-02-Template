知识：

1. 库可以通过业务实践提升稳定性。
1. state是一个客观存在的东西，对形式没有要求。
1. `export const STATE=Symbol("state");` 可以通过该方式实现私有属性。如果可能使用继承，需要在使用类中，继续将其`export`
1. 正则里可以传函数。比如`type.replace(/^[\s\S]/, s => s.toUpperCase())`

事件监听（*以onChange为例*）：

1. onChange属性。写一个`onChange={e=>console.log(e)}`
1. 调用onChange属性即可。（*调用步骤可以优化处理，比如triggerEvent函数*）

children机制：

1. 内容型children。放什么就是什么
    1. 如果需要将children放在多层嵌套的某一层，需要重写appendChild来将其放在指定的位置。
1. 模板型children。内置一个模板
    1. 模板自动映射到this.template
    1. 将数组通过map传入this.template，映射为元素数组，然后加入到div中