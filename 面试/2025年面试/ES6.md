# ES6 常用语法面试题

## 目录

1. let/const 和 var
2. 箭头函数 this 指向，如何改变 this 的指向，什么区别
3. 扩展运算符 和 object.assign 是深拷贝还是浅拷贝
4. promise、async/await

---

### let/const 和 var 的区别？

var 声明的变量会被提升到作用域顶部，但赋值不会提升。

**注意：**

- 变量提升 var
- 块级作用域（let/const）、全局作用域 var
- 重复声明 var

**最佳建议：**
优先使用 const：如果变量不需要重新赋值
其次使用 let：如果变量需要重新赋值
避免使用 var：因为其作用域和提升特性容易造成问题

### 箭头函数

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

### 什么是 Promise？

- Promise 链式调用、值传递，解决了什么问题？ 又出现了 async/await 什么区别

  ```javascript
  // then方法的值传递
  Promise.resolve(1)
    .then((value) => value + 1) // 2
    .then((value) => value * 2) // 4
    .then((value) => {
      console.log(value); // 4
    });
  ```

- 那么在链式调用时 Promise 的错误是如何处理的呢？

  ```javascript
  // 错误传播特性
  Promise.resolve()
    .then(() => {
      throw new Error("error1");
    })
    .then(() => {
      console.log("不会执行");
    })
    .catch((err) => {
      console.log(err); // Error: error1
      throw new Error("error2"); //追问： 如果不抛出这个异常呢？（下一个then就会执行，catch不会捕获到最上面的错误
    })
    .then(() => {
      console.log("不会执行");
    })
    .catch((err) => {
      console.log(err); // Error: error2
    });
  ```

- 比如说如何上面那个一连串的接口请求，但是我想实现一个超时中断，如何中断 Promise 链?

  ```javascript
  // Promise.race实现超时中断
  function timeoutPromise(promise, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout"));
      }, timeout);
    });
    return Promise.race([promise, timeoutPromise]);
  }
  ```

  ```javascript
  // 手写一个 Promise.race
  function myPromiseRace<T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  }
  ```

- 如何实现一个带并发限制的 Promise 调度器?
- Promise 在实际项目中的应用

  - 请求的重试机制
  - 并发请求的控制
  - 取消请求的实现

### JavaScript 引擎是单线程的，如何处理异步操作？（事件循环的执行机制）

- 同步代码（调用栈依次执行的代码，如变量赋值、函数调用）、异步代码（不会立即执行，而是放入相应的队列，如 setTimeout，Promise、IO 操作）
- 执行栈
- 宏任务（setTimeout、I/O 操作）与微任务（Promise.then/catch/finally），优先级（微>宏）
- 事件循环的执行过程

  执行过程: 1.执行同步代码(主线程) 2.清空微任务队列 3.执行下一个宏任务 4.重复 2-3 步骤

- 举个具体的例子

  ```javascript
  console.log("1"); // 同步

  setTimeout(() => {
    console.log("2"); // 宏任务
  }, 0);

  Promise.resolve().then(() => {
    console.log("3"); // 微任务
  });

  console.log("4"); // 同步

  // 输出顺序: 1 4 3 2
  ```

### 知道 node 和浏览器在实现 loop 时候的差别吗？
