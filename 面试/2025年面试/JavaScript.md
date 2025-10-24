# JavaScript 高频面试题

## 目录

1. typeof 类型判断
2. 类型转换
3. 闭包
4. 原型与原型链
5. 原型继承和 Class 继承
6. 模块化
7. 事件机制
8. 箭头函数
9. JS 内存泄露如何检测？场景有哪些？
10. async/await 异步总结
11. Promise 异步总结
12. Event Loop 执行机制过程

---

## 1. typeof 类型判断

`typeof` 是 JavaScript 中用于判断变量类型的运算符。常见返回值有：`"undefined"`、`"boolean"`、`"number"`、`"string"`、`"object"`、`"function"`、`"symbol"`、`"bigint"`。

**注意点：**

- `typeof null` 返回 `"object"`，这是历史遗留问题。
- `typeof function() {}` 返回 `"function"`。
- 对于数组、对象、null，`typeof` 都返回 `"object"`，无法细分。

**更精确的类型判断：**

- 判断数组：`Array.isArray(arr)`
- 判断 null：`value === null`
- 判断对象：`typeof obj === 'object' && obj !== null && !Array.isArray(obj)`

## 2. 类型转换

JavaScript 中的类型转换分为**显式转换**和**隐式转换**。

**显式转换：**

- 转字符串：`String(value)` 或 `value.toString()`
- 转数字：`Number(value)`、`parseInt(value)`、`parseFloat(value)`
- 转布尔值：`Boolean(value)`

**隐式转换：**

- 运算符（如 `+`、`-`、`==`）会触发隐式转换
- `+` 运算符遇到字符串会优先转为字符串
- `==` 会进行类型转换后再比较

**常见例子：**

```js
console.log("5" + 2); // '52'
console.log("5" - 2); // 3
console.log(1 == "1"); // true
console.log(Boolean(0)); // false
console.log(Number("123abc")); // NaN
```

---

## 3. 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。常见于函数嵌套的场景。闭包可以"记住"并访问定义时的作用域，即使函数在其作用域之外执行。

**作用：**

- 保护变量不被外部直接访问（数据私有化）
- 保持某些变量的持久性（如计数器）

**示例：**

```js
function makeCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**注意：**

- 闭包会导致函数中的变量无法被垃圾回收，可能造成内存泄漏。

**如何解决：**

- 赋值为 null，及时解除不再需要的引用
- 避免闭包滥用，不要把闭包赋值给全局变量或长生命周期对象，减少闭包的生命周期。
- 及时清理事件和定时器
- 只在必要时使用闭包，只在确实需要数据私有化或持久化时使用闭包，避免在循环或大对象中频繁创建闭包

---

## 4. 原型与原型链

JavaScript 中每个对象都有一个原型对象（`__proto__`），对象可以通过原型链继承属性和方法。

**原型链：**

- 对象查找属性时，先在自身查找，找不到会沿着原型链向上查找，直到 `Object.prototype`，再到 `null`。

**示例：**

```js
function Person() {}
Person.prototype.sayHello = function () {
  console.log("Hello");
};
const p = new Person();
p.sayHello(); // Hello
```

---

## 5. 原型继承和 Class 继承

**原型继承：**

- 通过构造函数和原型对象实现继承。

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.say = function () {
  console.log(this.name);
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
```

**Class 继承（ES6）：**

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name);
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}
```

---

## 6. 模块化

模块化是指将代码拆分为独立、可复用的模块，每个模块内部封装实现，只暴露接口。

**常见方案：**

- CommonJS（Node.js）：`require`、`module.exports`
- ES6 Module：`import`、`export`
- AMD、CMD（浏览器端）

**示例：**

```js
// ES6
export function add(a, b) {
  return a + b;
}
import { add } from "./math.js";
```

---

## 7. 事件机制

JavaScript 事件机制包括事件捕获、事件冒泡和事件委托。

- **事件冒泡**：事件从最内层目标元素向外层父元素依次触发。
- **事件捕获**：事件从最外层父元素向目标元素传递。
- **事件委托**：利用事件冒泡，将事件绑定在父元素，通过判断事件目标实现对子元素的管理。

**示例：**

```js
document.body.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    // 事件委托
  }
});
```

---

## 8. 箭头函数

箭头函数是 ES6 新增的函数写法，语法更简洁，并且不绑定自己的 `this`，`arguments`，`super` 或 `new.target`。

**示例：**

```js
const add = (a, b) => a + b;
```

**注意：**

- 箭头函数的 `this` 指向定义时的外层作用域。
- 不能作为构造函数（不能用 `new`）。
- 没有 `arguments` 对象。

普通函数（使用 function 关键字声明的函数）的 this 值则取决于函数如何被调用，它可以指向调用它的对象、全局对象（在非严格模式下）或 undefined（在严格模式下）。

---

## 9. JS 内存泄露如何检测？场景有哪些？

**检测方法：**

- 使用浏览器开发者工具（如 Chrome DevTools）中的 Memory 面板，进行快照对比、查找未释放的对象。
- 监控页面内存占用变化。

**常见场景：**

- 全局变量未释放
- 闭包引用导致变量无法回收
- DOM 元素被 JS 引用，移除后未解除引用
- 定时器、事件监听未清理

---

## 10. async/await 异步总结

`async/await` 是基于 Promise 的语法糖，使异步代码写法更接近同步。

**特点：**

- `async` 函数返回 Promise
- `await` 后面跟 Promise，等待其 resolve 后再继续执行
- 可以用 try/catch 捕获异常

**示例：**

```js
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
```

---

## 11. Promise 异步总结

Promise 是异步编程的一种解决方案，代表一个未来才会结束的操作。

**三种状态：**

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）

**基本用法：**

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});
p.then((result) => console.log(result));
```

**链式调用、异常捕获：**

```js
p.then((res) => {
  /* ... */
}).catch((err) => {
  /* ... */
});
```

---

## 12. Event Loop 执行机制过程

Event Loop（事件循环）是 JavaScript 执行异步代码的机制。

**流程：**

1. 执行主线程同步代码（宏任务）
2. 检查微任务队列（如 Promise.then、MutationObserver），全部执行完
3. 渲染页面
4. 执行下一个宏任务（如 setTimeout、setInterval、I/O）

**示例：**

```js
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
// 输出顺序：1 4 3 2
```

---
