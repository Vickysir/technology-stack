[前端进阶之道指南](https://yuchengkai.cn/docs/frontend/)

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


### 2020-11-22 （黑湖科技，笔试）
- 虚拟dom
- webpack 中 source map 的使用
- 节流和防抖，代码实现
- 重绘 和 回流，如何优化？
- Hooks 解决了什么问题？自定义hook实现


### 2020-11-24 （黑湖科技，1面）
- HOC 和 自定义的hook有什么区别?
- webpack 中 loader 和 plugin 的区别？
- node 负载均衡
- express 和 koa ，egg 和 nest 技术选型,区别?



### 2020-11-24 （美味不用等，1面）
- transform、transition、translate、animate分别是什么？如何使用？
- background-origin 是什么？ background-size的值有哪些？
- sql 什么是左连接，什么是右连接
- 箭头函数和普通函数的区别？
- for in 和 for of 的区别，是否能遍历到原型链上的属性？
- ES6的新语法有哪些？
- 类的静态属性，如何访问？
- typescript中私有属性和保护属性有什么区别？
- React的新旧生命周期？，新的生命周期getDerivedStateFromProps如何使用？
- Redux的工作流？
- git rebase 和 git merge 的区别？
- git 如果才能拉取到指定的某一次提交?

### 2020-11-24 （黑湖科技，2面）
- 闭包
- React的生命周期
- 跨域的解决方案

------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------

### 防抖
> 在事件触发n秒后再触发回调，如果n秒内再次触发，则重新计时。只有最后执行一次
```javascript
function fn(f1,wait){
    let timer = null
    return function(){
        clearTimeout (timer);
        timer=setTimeOut(f1,wait);
    }
}
```

### 节流
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



### 箭头函数和普通函数的区别？
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

### 判断数组、字符串的方法
- typeof 
    > typeof是javascript原生提供的判断数据类型的运算符，它会返回一个表示参数的数据类型的字符串
    问题：无法区分数组、null、function，他们返回的都是object。

- toString
    > 另一个行之有效的方法就是使用Object.prototype.toString方法来判断，每一个继承自Object的对象都拥有toString的方法。

- instanceof
    > instanceof运算符可以用来判断某个构造函数的prototype属性所指向的對象是否存在于另外一个要检测对象的原型链上。
