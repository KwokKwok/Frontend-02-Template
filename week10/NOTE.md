学习笔记

LL 算法

1. 使用LL算法构建AST

> AST：抽象语法树。计算机执行程序，需要编程语言分词->构建语法树->解析
用于构建抽象语法树（*语法分析*），主要有LL和LR两种。
LL算法：从左到右扫描，从左到右规约，

四则运算：

- TokenNumber
- Operator
- Whitespace
- LineTerminator

使用产生式定义四则运算

- 认为加法是由左右两个乘法组成的，可以连加
- 认为单独的数字是一种特殊的乘法。

词法分析代码：

```js
let regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g
let dict = ["Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"];

function* tokenize(source) {
    let result = null;
    let lastIndex = 0;
    while (true) {
        lastIndex = regexp.lastIndex;
        result = regexp.exec(source);
        if (!result) break;
        if (regexp.lastIndex - lastIndex > result[0].length) break;
        let token = {
            value: result[0],
            type: dict[result.indexOf(result[0], 1) - 1]
        }
        yield token;
    }
    yield {
        type: "EOF"
    }
}

let source = [];

for (const token of tokenize("1024 + 10 * 25")) {
    if (["Whitespace", "LineTerminator"].indexOf(token.type) < 0)
        source.push(token);
}

const TYPE_NUMBER = "Number";
const TYPE_EXP_MULTIPLICATIVE = "MultiplicativeExpression";
const TYPE_EXP_ADDITIVE = "AdditiveExpression";

function Expression(tokens) {
    return AdditiveExpression(tokens);
}

function AdditiveExpression(source) {
    if (source[0].type === TYPE_EXP_MULTIPLICATIVE) {
        let node = {
            type: TYPE_EXP_ADDITIVE,
            children: [source[0]]
        }
        source[0] = node;
        return AdditiveExpression(source);
    }

    if (source[0].type === TYPE_EXP_ADDITIVE && source[1] && source[1].type === "+") {
        let node = {
            type: TYPE_EXP_ADDITIVE,
            operator: "+",
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if (source[0].type === TYPE_EXP_ADDITIVE && source[1] && source[1].type === "-") {
        let node = {
            type: TYPE_EXP_ADDITIVE,
            operator: "-",
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if (source[0].type === TYPE_EXP_ADDITIVE)
        return source[0];
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}

function MultiplicativeExpression(source) {

    if (source[0].type === TYPE_NUMBER) {
        let node = {
            type: TYPE_EXP_MULTIPLICATIVE,
            children: [source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source);
    }
    if (source[0].type === TYPE_EXP_MULTIPLICATIVE && source[1] && source[1].type === "*") {
        let node = {
            type: TYPE_EXP_MULTIPLICATIVE,
            operator: "*",
            children: []
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if (source[0].type === TYPE_EXP_MULTIPLICATIVE && source[1] && source[1].type === "/") {
        let node = {
            type: TYPE_EXP_MULTIPLICATIVE,
            operator: "/",
            children: []
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if (source[0].type === TYPE_EXP_MULTIPLICATIVE)
        return source[0];
    return MultiplicativeExpression(source);
}

let exp = Expression(source);
console.log(exp);
```

语法分析



8

KMP

> 长串中找短的字符串（*pattern*）。名字来自于发明算法的三名计算机科学家的名字。 

1. 跳转表格
2. 模式匹配

9 

Wildcard


```js
let $ = Symbol("$");
class Tire {

    constructor() {
        this.root = Object.create(null);
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char])
                node[char] = Object.create(null);
            node = node[char];
        }

        if (!($ in node))
            node[$] = 0;
        node[$]++;
    }

    most() {
        let max = 0;
        let maxWord = null;

        let visit = (node, word) => {
            if (node[$] && node[$] > max) {
                max = node[$];
                maxWord = word;
            }

            for (const c in node) {
                visit(node[c], word + c);
            }
        }
        visit(this.root, "");
        console.log(maxWord, max);
    }
}

function generateWord(length) {
    let word = "";
    let randomChar = () => String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
    for (let i = 0; i < length; i++) {
        word += randomChar()
    }
    return word;
}

let trie = new Tire();
for (let i = 0; i < 100000; i++) {
    trie.insert(generateWord(4));
}

trie.most();
```

```js
function kmp(source, pattern) {
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1; j = 0;

        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else
                    i++;
            }
        }
    }

    {
        let i = 0, j = 0;
        while (i < source.length) {
            if (pattern[i] === source[i]) {
                ++i, ++j;
            } else {
                if (j > 0)
                    j = table[j];
                else
                    i++;
            }

            if (j === pattern.length)
                return true;

        }
        return false;
    }
}

console.log(kmp("Hello", "ll"));
```