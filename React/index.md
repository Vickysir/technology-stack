### 声明式 UI 、 命令式 UI （vue/angular/react）

    有点面向过程，面向结果的意思。

    命令式:得一步一步教他，如何去做
    声明式:告诉他，我要什么，而不去管他如何实现的

    React ： 通过 JSX语法，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

### 组件化

    组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。

    react： 从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素
            如何理解容器组件和无状态组件组件
            如何使用类组件和函数组件
    vue：
    angular：

### Learn Once, Write Anywhere

### 虚拟 dom

### diff 算法

### 15 和 16.0 的重大变更？ Fiber ？

### HOC 和 自定义的 hook 有什么区别?

### 对路由的理解，hash 路由和 history 的区别？

> 浏览器地址带#的是 hash 路由

```
location.pathname
//url的路径部分，从/开始，比如https://www.baidu.com/s?ie=utf-8，那么 pathname = '/s'了,从端口后，问号之前的字段

location.search
// 查询参数，从?开始；比如 https://www.baidu.com/s?ie=utf-8 那么 search = '?ie=utf-8'

location.hash
// hash是页面中的一个片段，从 # 开始的，比如 https://www.baidu.com/#/a/b 那么返回值就是："#/a/b"

window.history.pushState(state, title, url)
// state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
// title：标题，基本没用，一般传 null
// url：设定新的历史记录的 url。新的 url 与当前 url 的 origin 必须是一樣的，否则会抛出错误。url可以是绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state, title, url)
// 与 pushState 基本相同，但她是修改当前历史记录，而 pushState 是创建新的历史记录

```
