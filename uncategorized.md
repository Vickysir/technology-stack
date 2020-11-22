[前端进阶之道指南](https://yuchengkai.cn/docs/frontend/)

- 箭头函数和普通函数的区别？
1. 语法更加简洁
2. 箭头函数没有自己的this，是定义时就确定了，继承他外层的执行环境的this，并且这个this不会再改变
3. call、apply、bind 都无法改变箭头函数的this指向
4. 箭头函数也不能作为构造函数，因为没有propetype
5. 箭头函数也没有arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
6. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
```javascript

function Fun(a){
    this.a = a;
}

let fun = new Fun(1);

{
    // new的执行过程
    var this = {} //定义一个空的this变量
    this.__proto__ = Fun.prototype //将实例对象的_proto_属性指向构造函数的原型
    Fun(1).call(this) //将实参带入构造函数，并将构造函数this的指向改为创建的this对象。
    return this //返回这个刚创建的this对象，并赋值给fun变量。
}
// 一般情况下，构造函数内不写返回值，返回这个this对象，
// 但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤

```


### 2020-10-28

- 新旧生命周期
- 生命周期为什么被取代？
- 15和16.0 的重大变更？ Fiber ？
- 浏览器渲染 html dom树 css om树 render树
- 浏览器缓存 关键字


### 2020-10-29
- 浏览器兼容性
- html5 和 css 的新特性
- Javascript原型
- 异步编程
- angularjs，node.js，mongodb


### 2020-10-30
- 了解MVVM、MVP、MVC架构模式；
- 对OOP、设计模式、数据结构和基础算法有一定了解
- linux常用操作
- docker、k8s

### 2020-11-02
- sql中的 where 和 on 有什么区别？

### 2020-11-03
- BFC 块级格式化上下文


### 2020-11-09
- 时间复杂度
- 空间复杂度
- [git常见使用](https://juejin.im/post/6891146425590087693?utm_source=gold_browser_extension#heading-9)

### 2020-11-22
- 防抖
> 在事件触发n秒后再触发回调，如果n秒内再次触发，则重新计时。只有最后执行一次
```javascript
function fn(f1,wait){
    let timer = null
    return function(){
        clearTimeout (timer);
        timer=setTimeInter(f1,wait);
    }
}
```

- 节流
> 高频事件触发时，n秒内只会执行一次，节流会稀释函数的执行频率
```javascript
function fn(f1,time){
    let canRun = true
    return function(){
        if(!canRun) return;
        canRun = false;
        setTimeout(()=>{
            f1();
            canRun = true;
        },time)
    }
}
```
### 什么是重绘、回流，如何优化？
> 一般来说，回流一定会导致重绘

1. 浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree。
2. 有了RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。

#### 回流
> 当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

##### 导致回流的操作：
- 浏览器的首次渲染
- 浏览器的尺寸发生变化
- 元素的尺寸，位置发生变化
- 元素内容变化
- 字体大小发生变化
- 激活伪类
- 添加或者删除某些可见的元素
- 查询某些属性或调用某些方法

#### 重绘
> 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

#### 如何避免
##### for css：
- 避免使用css表达式（calc）
- 避免多层嵌套
- 尽量在dom树的末端修改元素的class
- 将动画效果应用到position属性为absolute或fixed的元素上。
- 避免使用table布局

##### for js：
- 避免频繁操作样式，最好一次都写在class里
- 避免频繁操作dom，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
- display为none，不会触发回流和重绘
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流。否则会引起父元素及后续元素频繁回流。