# Toy Browser之请求与DOM解析

> 基于Node.js的环境实现一个简单的Toy Browser来学习浏览器原理

浏览器原理总览：

- URL。通过网络请求指定URL得到Http响应，然后可以从中解析出Http的响应体body。即HTML。
- 通过对HTML进行解析，得到DOM。
- 对DOM进行CSS计算，得到DOM with css。
- 进行布局，得到DOM with position 
- 之后进行渲染成Bitmap进行绘制

知识：

1. 网络请求与响应
    - 简单对协议进行说明。IP、TCP、HTTP，分别处于网络层、传输层、应用层
    - 特别分析了HTTP
        - Http请求，一个带换行符(*规定使用\r\n*)的长字符串
            - `<Request Line> ::= <方法>" "<路径>" "<Http版本>`
            - `<Headers> ::= (<Key>":"<Value>"\r\n")+`
            - `<Body> ::= <依赖Content-type值的字符串>`
        - Http响应。body内容由headers控制，课程使用[chunked编码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)(仅在Http1.1中提供，分块指示，最后以一个长度为0的块结尾)
            - `<Status line> ::= <Http版本>" "<Http状态码>" "<Http状态描述>`
            - `<Headers>::= (<Key>":"<Value>"\r\n")+`
            - `<Chunked Body> ::=(<块长度的十六进制>"\r\n"<块>"\r\n")+"0\r\n"`
1. 状态机（FSM）
    - 每个状态都是一个机器（纯函数），都知道下一个状态是什么
    - Moore状态机，下一个状态确定。Mealy状态机，根据输入决定下一个状态。课程使用Mealy状态机
    - 重要的是状态机的写法，体现在课程的练习和作业中。


对Http部分的具体处理：
1. Http请求的实现
    - 设计一个Http类，请求方式、端口等都可以有缺省值
    - Content-Type是必须的，需要有默认值
    - body是k-v格式，依据不同的Content-Type做对应的编码处理
    - 生成Content-Length
1. Http响应的解析
    - 使用ResponseParser，解析出响应码、响应消息、Headers
    - 使用不同的BodyParser，解析出响应体（*HTML*）
1. HTML解析成DOM
