<!--
 * @Author: your name
 * @Date: 2021-04-09 13:36:40
 * @LastEditTime: 2021-04-09 13:38:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/职业规划/2020年面试/index.md
-->

## 目录

<br>

[前端进阶之道指南](https://yuchengkai.cn/docs/frontend/)<br>
[大厂面经](https://juejin.cn/post/6844904154675183623)<br>
[基础部分](https://juejin.cn/post/6947860760840110088?utm_source=gold_browser_extension#heading-50)<br>

<br>
<hr>
<br>

### 2020-10-28

- 新旧生命周期
- 生命周期为什么被取代？
- 15 和 16.0 的重大变更？ Fiber ？
- 浏览器渲染 html dom 树 css om 树 render 树
- 浏览器缓存 关键字

### 2020-10-29

- 浏览器兼容性
- html5 和 css 的新特性
- Javascript 原型
- 异步编程
- angularjs，node.js，mongodb

### 2020-10-30

- 了解 MVVM、MVP、MVC 架构模式；
- 对 OOP、设计模式、数据结构和基础算法有一定了解
- linux 常用操作
- docker、k8s

### 2020-11-02

- sql 中的 where 和 on 有什么区别？

### 2020-11-03

- BFC 块级格式化上下文

### 2020-11-09

- 时间复杂度
- 空间复杂度
- [git 常见使用](https://juejin.im/post/6891146425590087693?utm_source=gold_browser_extension#heading-9)

### 2020-11-22 （BL科技，笔试）

- 虚拟 dom
- webpack 中 source map 的使用
- 节流和防抖，代码实现
- 重绘 和 回流，如何优化？
- Hooks 解决了什么问题？自定义 hook 实现

### 2020-11-24 （BL科技，1 面）

- HOC 和 自定义的 hook 有什么区别?
- webpack 中 loader 和 plugin 的区别？
- node 负载均衡
- express 和 koa ，egg 和 nest 技术选型,区别?

### 2020-11-24 （美味不用等，1 面）

- transform、transition、translate、animate 分别是什么？如何使用？
- background-origin 是什么？ background-size 的值有哪些？
- sql 什么是左连接，什么是右连接
- 箭头函数和普通函数的区别？
- for in 和 for of 的区别，是否能遍历到原型链上的属性？
- ES6 的新语法有哪些？
- 类的静态属性，如何访问？
- typescript 中私有属性和保护属性有什么区别？
- React 的新旧生命周期？，新的生命周期 getDerivedStateFromProps 如何使用？
- Redux 的工作流？
- git rebase 和 git merge 的区别？
- git 如果才能拉取到指定的某一次提交?

### 2020-11-24 （BL科技，2 面）

- 闭包
- React 的生命周期
- 跨域的解决方案

<br>
<hr>
<br>

### 防抖

> 在事件触发 n 秒后再触发回调，如果 n 秒内再次触发，则重新计时。只有最后执行一次

```javascript
function fn(f1, wait) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeOut(f1, wait);
  };
}
```

### 节流

> 高频事件触发时，n 秒内只会执行一次，节流会稀释函数的执行频率

```javascript
function fn(f1, time) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      f1();
      canRun = true;
    }, time);
  };
}
```

### 箭头函数和普通函数的区别？

1. 语法更加简洁
2. 箭头函数没有自己的 this，是定义时就确定了，继承他外层的执行环境的 this，并且这个 this 不会再改变
3. call、apply、bind 都无法改变箭头函数的 this 指向
4. 箭头函数也不能作为构造函数，因为没有 propetype
5. 箭头函数也没有 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
6. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

```javascript
function Fun(a) {
  this.a = a;
}

let fun = new Fun(1);

{
  // new的执行过程
  var this = {}; //定义一个空的this变量
  this.__proto__ = Fun.prototype; //将实例对象的_proto_属性指向构造函数的原型
  Fun(1).call(this); //将实参带入构造函数，并将构造函数this的指向改为创建的this对象。
  return this; //返回这个刚创建的this对象，并赋值给fun变量。
}
// 一般情况下，构造函数内不写返回值，返回这个this对象，
// 但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤
```

### 判断数组、字符串的方法

- typeof
  > typeof 是 javascript 原生提供的判断数据类型的运算符，它会返回一个表示参数的数据类型的字符串
  > 问题：无法区分数组、null、function，他们返回的都是 object。


- toString
  > 另一个行之有效的方法就是使用 Object.prototype.toString 方法来判断，每一个继承自 Object 的对象都拥有 toString 的方法。需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文

```javascript
    const a = ["Hello", "Howard"];
    const b = { 0: "Hello", 1: "Howard" };
    const c = "Hello Howard";
    Object.prototype.toString.call(a); //"[object Array]"
    Object.prototype.toString.call(b); //"[object Object]"
    Object.prototype.toString.call(c); //"[object String]"

    // 可以用写一个方法来判断数组是否为数组
    const isArray = (something)=>{
        return Object.prototype.toString.call(something) === '[object Array]';
    }

    cosnt a = [];
    const b = {};
    isArray(a);//true
    isArray(b);//false
```

    > 前提是：如果一个对象的toString方法没有被重写过的话


- constructor

    > 实例化的数组拥有一个constructor属性，这个属性指向生成这个数组的方法。

```javascript
    const a = [];
    console.log(a.constructor);//function Array(){ [native code] }


    const o = {};
    console.log(o.constructor);//function Object(){ [native code] }
    const r = /^[0-9]$/;
    console.log(r.constructor);//function RegExp() { [native code] }
    const n = null;
    console.log(n.constructor);//报错
```
    >  constructor属性也是可以改写的


- instanceof

  > instanceof 运算符可以用来判断某个构造函数的 prototype 属性所指向的對象是否存在于另外一个要检测对象的原型链上。

```javascript
    const a = [];
    const b = {};
    console.log(a instanceof Array); //true
    console.log(a instanceof Object); //true,在数组的原型链上也能找到Object构造函数
    console.log(b instanceof Array); //false
```


- isArray,用 Array 对象的 isArray 方法判断。

  > 当参数为数组的时候，isArray 方法返回 true，当参数不为数组的时候，isArray 方法返回 false。

```javascript
    const a = [];
    const b = {};
    Array.isArray(a); //true
    Array.isArray(b); //false
```

    > Array.isArray 是 ES5 标准中增加的方法，部分比较老的浏览器可能会有兼容问题，所以为了增强健壮性，建议还是给 Array.isArray 方法进行判断，增强兼容性，重新封装的方法如下：

```javascript
    if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
    }
```
