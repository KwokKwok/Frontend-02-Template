学习笔记

LL 算法

8

KMP

> 长串中找短的字符串（*pattern*）。名字来自于发明算法的三名计算机科学家的名字。 

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