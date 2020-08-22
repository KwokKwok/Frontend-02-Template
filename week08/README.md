**作业整理在文末。NOTE.md和README.md内容一致。*
# 重学HTML，浏览器API（*Week 08*）

## 一、HTML

- 从GML（通用标记语言）到SGML（标准通用标记语言）。SGML因为其复杂，而难以普及。它可以用来定义标记语言。
    - HTML是SGML的一种应用。
    - XML是为了简化SGML出现的。
- HTML用来表示我的页面是要是什么样子，最初是由排版语言发展过来，表示我哪里的字体、缩进要有变化，哪里要有分段。
- HTML标准由W3C维护，实际的标准由几个大的浏览器厂商推动。这些厂商会对自己的浏览器做出改进，增加功能。在各个厂商互相接受、互相融合，形成标准，最后由W3C以文字确定下来。最新的HTML标准为HTML5，并在继续改进中。


### DTD和namespace

**DTD，规定实现浏览器的时候不得访问。*

#### DTD中的实体定义

> *DTD中最重要的内容*

需要特别注意的：

- nbsp，会把两个词连成了一个词，**不建议使用**。可以使用css的white-space控制空格显示。
- amp*，`&`
- gt*，`>`
- lt*，`<`
- quot*，`"`
- copy，`©`

#### namespace

namespace: 除了XML，还有MathML、SVG

### HTML语义化

语义化标签：

- header 表示章节的头部，可以包含标题、logo、搜索表单等。并不仅仅表示页面头部，一些独立的章节尾部也可以用header表示。
- footer 表示章节尾部，可以写一些版权信息、链接等。并不仅仅表示页面尾部。
- nav 表示页面中的导航。任何导航性质的内容都可以放到nav中，可以是多个。
- aside 表示和主要内容不相关的内容，如侧边栏，广告等
- article 表示一个独立的可重复的结构，一般可能包含header和foot标签，可嵌套
- section 表示文档中的一个区域或一节，一般会带标题，相邻的section是有关系的，不像article是独立的。
- em 语义上的强调，默认斜体
- strong 重要性的强调，默认粗体
- cite，表出处，文章作者什么的，默认斜体
- q，加引号
- code，代码
- pre，完整保留
- 图文，figure，figcaption，img
- hgroup，标题组

### HTML语法

合法的写法：

1. Element
1. Text
1. Comment，`<!-- -->`
1. DocumentType，HTML5就是`HTML`
1. ProcessingInstruction，`<?a 1?>`表示把1给预处理器a
1. CDATA，文本节点，不需要考虑转义问题

字符引用语法：

1. `&#161;`，#+ASCII码的方式
1. `&amp;`

## 二、浏览器API

### DOM

主要分为四个系列：

- traversal系列，访问DOM树节点的自动迭代工具（*废弃*）
- 节点api
    - Element比较多，所有的namespace都会产生一个Element的子类。注意`HTMLAnchorElement`
    - 导航类操作有针对Node的，但是常用针对Element的。可以让我们根据元素的父子关系和临近关系在DOM树上自由移动查找元素。
    - 修改操作，根据了最小化API的原则。`appendChild`，`insertBefore`、`removeChild`、`replaceChild`
    - 高级API
        - `compareDocumentPosition`比较两个节点关系，返回值是位掩码，需要再次计算。
        - `contains`，是否包含
        - `isEqualNode`，两个节点是否相同，会比较类型、内容等。`isSameNode`废弃，可以用`===`代替
        - `cloneNode`，复制，可以指定深拷贝。
- 事件api（*事件先从外到内捕获后从内到外冒泡；在目标元素上是按照注册先后调用的，不区分先捕获后冒泡*）
    - 捕获
    - 冒泡
    - 阻止事件传播，stopPropagation()、stopImmediatePropagation()（*后续注册的相同事件处理逻辑也不再被执行*）
    - 阻止默认行为，比如复选框的勾选等。preventDefault()
- [Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range) api
    - 节点的增删都会触发重排。意味着操作多个节点会进行多次重排。
    - DOM是一个living collection，文档结构改变时会自动更新
    - 在往DOM里插入fragment时，会直接将fragment内的所有元素自动插入。
    - Range的创建：`new Range() / setXXX()`或者`document.getSelection().getRangeAt(0)`
    - Range做DOM操作：`range.extractContents()`（*取出*）和`range.insertNode()`（*在range的位置插入*）

### CSSOM

使用`document.styleSheets`获取

使用：

- cssRules
- insertRule("p {color:pink;}",0)
- removeRule(0)

CSSStyleRule是其中最重要的

使用CSSOM的好处：

- 批量修改，性能较好
- `getComputedStyle(elt,pseudoElt)`，可以获取伪元素，方便修改伪元素的表现

### CSSOM View

> 与浏览器最终渲染的内容相关

需要注意的内容：

1. `window`的各种宽高信息，DPR
1. window api
    - window.open()，可以对新打开的window调用下面的方法。
    - moveTo()
    - moveBy()
    - resizeTo()
    - resizeBy()
1. 布局相关
    - getClientRects()，获取生成的所有盒
    - getBoundingClientRect()，获取整个区域的盒。常用

### 其他浏览器API

标准化组织

1. khronos(*OpenGL/WebGL*)
1. ECMA (*ECMAScript*)
1. WHATWG(*HTML*)
    - 从W3C分出去的
    - living standards，放一个最新的版本
1. W3C(*webaudio*)
    - 分为IG（*兴趣组*）/CG（*社区组*）/WG（*工作组*）

## 作业：整理浏览器API

分类：

1. ECMA
    - [ECMA 262 global object](https://tc39.es/ecma262/#sec-global-object)
    - [ECMA 402 Intl](https://www.ecma-international.org/ecma-402/7.0/index.html#intl-object)
1. WHATWG
    - [Console](https://console.spec.whatwg.org/)
    - [HTML-window](https://html.spec.whatwg.org/#the-window-object)
    - [HTML-interface](https://html.spec.whatwg.org/#all-interfaces)
    - [Encoding](https://encoding.spec.whatwg.org/)
    - [fetch](https://fetch.spec.whatwg.org/#fetch-api)
    - [Notification和ServiceWorker](https://notifications.spec.whatwg.org/#service-worker-api)
    - [Storage](https://storage.spec.whatwg.org/)
    - [URL](https://url.spec.whatwg.org/#api)
    - [XHR](https://xhr.spec.whatwg.org/#interface-xmlhttprequest)
    - [DOM](https://dom.spec.whatwg.org/)
1. W3C
    - Working Draft
        - [CSSOM](https://drafts.csswg.org/cssom/)
        - [CSSOM View](https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface)
        - [实时通信-WebRTC](https://w3c.github.io/webrtc-pc/)
        - [ServiceWorker](https://w3c.github.io/ServiceWorker/v1/)
        - [元素可见性-IntersectionObserver](https://w3c.github.io/IntersectionObserver/)
        - [音频处理-Web Audio](https://webaudio.github.io/web-audio-api/#APIOverview)
        - [乐器数字接口-Web MIDI](https://webaudio.github.io/web-midi-api/)
        - [VR/AR支持-Web XR](https://immersive-web.github.io/webxr/)
        - [加密媒体扩展-EME](https://w3c.github.io/encrypted-media/)
        - [基本几何-Geometry](https://drafts.fxtf.org/geometry/)
        - [投屏-Presentation API](https://w3c.github.io/presentation-api/)
        - [媒体源扩展-MSE](https://w3c.github.io/media-source/)
        - [屏幕方向](https://w3c.github.io/screen-orientation/)
        - [摄像头](https://w3c.github.io/mediacapture-image/)
        - [支付-Payment Request](https://w3c.github.io/payment-request/)
        - [USB（**CG*）](https://wicg.github.io/webusb/)
        - [蓝牙（**CG*）](https://webbluetoothcg.github.io/web-bluetooth/)
        - [离线同步-SyncManager（**CG*）](https://wicg.github.io/background-sync/spec/#sync-manager-interface)

    - Recommendation
        - [IndexedDB](https://www.w3.org/TR/IndexedDB/#async-api)
        - [SVG](https://www.w3.org/TR/SVG11/)
    - 其他
        - [分布于多个阶段的Performance系列](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)
1. khronos
    - [WebGL](https://www.khronos.org/registry/webgl/specs/latest/2.0/)
1. 其他
    - `webkit`开头的浏览器私有属性系列
    - `on`开头的事件系列
1. 未整理的...


代码：

```js
let names = Object.getOwnPropertyNames(window);
let filterStart = (start) => {
    names = names.filter(item => !item.startsWith(start));
}

let check = function () {
    let raw = Object.getOwnPropertyNames(window);
    return propArray => {
        let resultSet = new Set();
        propArray.forEach(item => resultSet.add(item));
        resultSet.forEach(prop => {
            if (raw.indexOf(prop) < 0)
                console.error(`属性${prop}不存在，请确认`)
        })
        names = names.filter(item => !resultSet.has(item));
        return resultSet;
    }
}();

// node相关
names = names.filter(e => {
    try {
        return !(window[e].prototype instanceof Node)
    } catch (error) {
        return true;
    }
}).filter(e => e != "Node");

// ECMA 262 #18 The Global Object：https://tc39.es/ecma262/#sec-global-object
let ecma262 = check(["globalThis", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Number", "Object", "Proxy", "Promise", "RangeError", "ReferenceError", "RegExp", "Set", "String", "Symbol", "SyntaxError", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URIError", "WeakMap", "WeakSet", "JSON", "Math", "Reflect", "escape", "unescape"]);

let ecma402 = check(["Intl"]);

let tc39Proposal = check(["BigInt", "BigInt64Array", "BigUint64Array"])


// whatwg 

let whatwg = check([
    // https://console.spec.whatwg.org/
    ...['console'],
    // https://html.spec.whatwg.org/#the-window-object
    ...["window", "self", "document", "name", "location", "history", "customElements", "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar", "status", "close", "closed", "stop", "focus", "blur", "frames", "length", "top", "opener", "parent", "frameElement", "open", "navigator", "applicationCache", "alert", "alert", "confirm", "prompt", "print", "postMessage", "postMessage"],
    // https://html.spec.whatwg.org/#all-interfaces
    ...["ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp", "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "CloseEvent", "CustomElementRegistry", "DOMParser", "DOMStringList", "DOMStringMap", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DedicatedWorkerGlobalScope", "Document", "DragEvent", "ElementInternals", "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection", "HTMLAnchorElement", "HTMLAreaElement", "HTMLAudioElement", "HTMLBRElement", "HTMLBaseElement", "HTMLBodyElement", "HTMLButtonElement", "HTMLCanvasElement", "HTMLDListElement", "HTMLDataElement", "HTMLDataListElement", "HTMLDetailsElement", "HTMLDialogElement", "HTMLDirectoryElement", "HTMLDivElement", "HTMLElement", "HTMLEmbedElement", "HTMLFieldSetElement", "HTMLFontElement", "HTMLFormControlsCollection", "HTMLFormElement", "HTMLFrameElement", "HTMLFrameSetElement", "HTMLHRElement", "HTMLHeadElement", "HTMLHeadingElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement", "HTMLInputElement", "HTMLLIElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLLinkElement", "HTMLMapElement", "HTMLMarqueeElement", "HTMLMediaElement", "HTMLMenuElement", "HTMLMetaElement", "HTMLMeterElement", "HTMLModElement", "HTMLOListElement", "HTMLObjectElement", "HTMLOptGroupElement", "HTMLOptionElement", "HTMLOptionsCollection", "HTMLOutputElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLPictureElement", "HTMLPreElement", "HTMLProgressElement", "HTMLQuoteElement", "HTMLScriptElement", "HTMLSelectElement", "HTMLSlotElement", "HTMLSourceElement", "HTMLSpanElement", "HTMLStyleElement", "HTMLTableCaptionElement", "HTMLTableCellElement", "HTMLTableColElement", "HTMLTableElement", "HTMLTableRowElement", "HTMLTableSectionElement", "HTMLTemplateElement", "HTMLTextAreaElement", "HTMLTimeElement", "HTMLTitleElement", "HTMLTrackElement", "HTMLUListElement", "HTMLUnknownElement", "HTMLVideoElement", "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent", "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "SubmitEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState", "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator"],
    // https://encoding.spec.whatwg.org/
    ...["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"],
    // https://fetch.spec.whatwg.org/#fetch-api
    ...["fetch", "Headers", "Request", "Response"],
    // https://notifications.spec.whatwg.org/#service-worker-api
    ...["Notification", "ServiceWorker", "ServiceWorkerRegistration"],
    // https://storage.spec.whatwg.org/
    ...["caches", "indexedDB", "Storage", "StorageManager", "StorageEvent", "localStorage", "sessionStorage"],
    // https://url.spec.whatwg.org/#api
    ...["URL"],
    // https://xhr.spec.whatwg.org/#interface-xmlhttprequest
    ...["XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload", "FormData", "ProgressEvent"],
    // https://dom.spec.whatwg.org/
    ...["Event", "CustomEvent", "EventTarget", "AbortController", "AbortSignal", "NodeList", "HTMLCollection", "MutationObserver", "MutationRecord", "Node", "Document", "DOMImplementation", "DocumentType", "DocumentFragment", "ShadowRoot", "Element", "NamedNodeMap", "Attr", "CharacterData", "Text", "CDATASection", "ProcessingInstruction", "Comment", "AbstractRange", "StaticRange", "Range", "NodeIterator", "TreeWalker", "NodeFilter", "DOMTokenList", "XPathResult", "XPathExpression", "XPathEvaluator"],
    ...["MediaStreamTrackEvent", "MediaStreamTrack", "MediaStreamEvent", "MediaStream", "DecompressionStream", "CompressionStream", "CanvasCaptureMediaStreamTrack", "WritableStreamDefaultWriter", "WritableStream", "CountQueuingStrategy", "WritableStreamDefaultController", "ByteLengthQueuingStrategy", "TransformStream", "TransformStreamDefaultController", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "ReadableStreamDefaultController", "ReadableStream"],
])

// webaudio https://webaudio.github.io/web-audio-api/#APIOverview
let webaudio = check(["AudioContext", "AudioNode", "AnalyserNode", "AudioBuffer", "AudioBufferSourceNode", "AudioDestinationNode", "AudioParam", "AudioListener", "AudioWorklet", "AudioWorkletNode", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode", "PannerNode", "PeriodicWave", "OscillatorNode", "StereoPannerNode", "WaveShaperNode", "ScriptProcessorNode", "AudioProcessingEvent"])

// IDB https://www.w3.org/TR/IndexedDB    https://www.w3.org/TR/IndexedDB/#index-defined-here
let IndexDBs = check(["IDBRequest", "IDBFactory", "IDBVersionChangeEvent", "IDBDatabase", "IDBObjectStore", "IDBIndex", "IDBKeyRange", "IDBCursor", "IDBTransaction", "IDBCursorWithValue", "IDBOpenDBRequest"]);

// svgs  https://www.w3.org/TR/SVG11/types.html   https://www.w3.org/TR/SVG11/coords.html
let svgs = check(["SVGElement", "SVGAnimatedBoolean", "SVGAnimatedString", "SVGStringList", "SVGAnimatedEnumeration", "SVGAnimatedInteger", "SVGNumber", "SVGAnimatedNumber", "SVGNumberList", "SVGAnimatedNumberList", "SVGLength", "SVGAnimatedLength", "SVGLengthList", "SVGAnimatedLengthList", "SVGAngle", "SVGAnimatedAngle", "SVGColor", "SVGICCColor", "SVGRect", "SVGAnimatedRect", "SVGUnitTypes", "SVGStylable", "SVGLocatable", "SVGTransformable", "SVGTests", "SVGLangSpace", "SVGExternalResourcesRequired", "SVGFitToViewBox", "SVGZoomAndPan", "SVGViewSpec", "SVGURIReference", "SVGCSSRule", "SVGRenderingIntent",
    "SVGPoint", "SVGPointList", "SVGMatrix", "SVGTransform", "SVGTransformList", "SVGAnimatedTransformList", "SVGPreserveAspectRatio", "SVGAnimatedPreserveAspectRatio"])

// performance https://developer.mozilla.org/zh-CN/docs/Web/API/Performance
filterStart("Performance");

// MIDI https://webaudio.github.io/web-midi-api/
filterStart("MIDI");

// WebUSB https://wicg.github.io/webusb
filterStart("USB");

// WebXR https://immersive-web.github.io/webxr/
filterStart("XR");

// WebBluetooth https://webbluetoothcg.github.io/web-bluetooth/
filterStart("Bluetooth");

// https://w3c.github.io/encrypted-media/
filterStart("MediaKey");

// presentation https://w3c.github.io/presentation-api/
filterStart("Presentation");

// CSSOM https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface https://drafts.csswg.org/cssom/  https://drafts.csswg.org/cssom
let cssoms = check(["matchMedia", "screen", "moveTo", "moveBy", "resizeTo", "resizeBy", "innerWidth", "innerHeight", "scrollX", "pageXOffset", "scrollY", "pageYOffset", "scroll", "scroll", "scrollTo", "scrollTo", "scrollBy", "scrollBy", "screenX", "screenLeft", "screenY", "screenTop", "outerWidth", "outerHeight", "devicePixelRatio",
    "MediaList", "StyleSheet", "CSSStyleSheet", "StyleSheetList", "LinkStyle", "CSSRuleList", "CSSRule", "CSSStyleRule", "CSSImportRule", "CSSGroupingRule", "CSSMediaRule", "CSSPageRule", "CSSMarginRule", "CSSNamespaceRule", "CSSStyleDeclaration"])
filterStart("CSS");

// https://drafts.fxtf.org/geometry/
filterStart("DOM")

// webkits
filterStart('webkit');

// https://wicg.github.io/background-sync/spec/#sync-manager-interface
filterStart("SyncManager");

// https://w3c.github.io/media-source/

let mediaSources = check(["MediaSource", "SourceBuffer", "SourceBufferList"])

// https://w3c.github.io/screen-orientation/
filterStart("ScreenOrientation");

// https://w3c.github.io/mediacapture-image/
let mediacaptureImages = check(["ImageCapture", "PhotoCapabilities", "PhotoSettings", "MediaSettingsRange"]);

// w3c webRTC
filterStart("RTC")

// on events
filterStart("on")

// WebGL
filterStart("WebGL")

console.log(names);
```