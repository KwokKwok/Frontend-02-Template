const layout = require('./layout');
const css = require('css');

let currentToken = null;
let currentAttribute = null;

let stack = [{ type: "document", children: [] }];
let currentTextNode = null;

let rules = [];
function addCSSRules(text) {
    let ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

// 简单选择器,1.class，2.id，3.tagname
function match(element, selector) {
    if (!selector || !element.attributes)
        return false;

    switch (selector.charAt(0)) {
        case '#':
            {
                let attr = element.attributes.filter(item => item.name === "id")[0]
                return attr && attr.value === selector.replace('#', '')
            }
        case '.':
            {
                let attr = element.attributes.filter(item => item.name === "class")[0]
                return attr && attr.value.split(' ').indexOf(selector.substring(1)) > 0;
            }
        default:
            return element.tagName === selector;
    }
}

function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(" ");
    for (const part of selectorParts) {
        switch (part.charAt[0]) {
            case '#':
                p[1] += 1;
                break;
            case '.':
                p[2] += 1;
                break;
            default:
                p[3] += 1;
                break;
        }
    }
    return p;
}

function compareSpecificity(p1, p2) {
    for (let i = 0; i < 4; i++) {
        if (p1[i] == p2[i])
            continue;
        return p1[i] - p2[i];
    }
    return 0;
}

function computeCSS(element) {
    let elements = stack.slice().reverse();
    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    for (const rule of rules) {
        let selectorParts = rule.selectors[0].split(" ").reverse();

        if (!match(element, selectorParts[0]))
            continue;

        let matched = false;

        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }

        if (j >= selectorParts.length) {
            matched = true;
        }

        if (matched) {
            // console.log(`Element ${element.tagName} matched rule '${rule.selectors[0]}'`);
            let sp = specificity(rule.selectors[0]);

            let computedStyle = element.computedStyle;
            for (const declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else {
                    if (compareSpecificity(sp, computedStyle[declaration.property].specificity) >= 0) {
                        computedStyle[declaration.property].value = declaration.value;
                        computedStyle[declaration.property].specificity = sp;
                    }
                }

            }
            console.log(element.computedStyle);
        }
    }
}

function emit(token) {
    let top = stack[stack.length - 1];

    if (token.type === "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: [],
        };
        element.tagName = token.tagName;
        for (let p in token) {
            if (p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p],
                })
            }
        }

        computeCSS(element);

        top.children.push(element);
        element.parent = top;
        if (!token.isSelfClosing) {
            stack.push(element);
        }
        currentTextNode = null;
    } else if ((token.type === "endTag")) {
        if ((top.tagName !== token.tagName)) {
            throw new Error("Tag start end dosen't match");
        } else {
            if (top.tagName === "style") {
                addCSSRules(top.children[0].content);
            }
            layout(top);
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type === "text") {
        if (currentTextNode === null) {
            currentTextNode = {
                type: "text",
                content: "",
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol("EOF")

function data(c) {
    if (c === "<") {
        return tagOpen;
    } else if (c === EOF) {
        emit({ type: "EOF", });
        return;
    } else {
        emit({
            type: "text",
            content: c,
        })
        return data;
    }
}

function tagOpen(c) {
    if (c === "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: "",
        }
        return tagName(c);
    } else {
        return
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: "",
        }
        return tagName(c)
    } else if (c === ">") {

    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/" || c === ">" || c === EOF) {
        return afterAttributeName(c);
    } else if (c === "=") {

    } else {
        currentAttribute = {
            name: "",
            value: "",
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
        return afterAttributeName(c);
    } else if (c === "=") {
        return beforeAttributeValue;
    } else if (c === "\u0000") {

    } else if (c === '"' || c === "'" || c === "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
        return beforeAttributeValue;
    } else if (c === "\"") {
        return doubleQuotedAttributeValue;
    } else if (c === "\'") {
        return singleQuotedAttributeValue;
    } else if (c === ">") {

    } else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === "\u0000") {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === "\u0000") {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return singleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === "\u0000") {

    } else if (c === '"' || c === "'" || c === "<" || c === "=" || c === "`") {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === "=") {
        return beforeAttributeValue;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: "",
        }
        return attributeName(c);
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data
    } else if (c === EOF) {
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c === "EOF") {

    } else {

    }
}

module.exports.parse = function (html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
}