# ES6 常用语法面试题

## 目录

1. let/const 和 var
2. 箭头函数 this 指向，如何改变 this 的指向，什么区别
3. 扩展运算符 和 object.assign 是深拷贝还是浅拷贝
4. promise、async/await

---

### 什么是 Promise？

- Promise 链式调用、值传递，解决了什么问题？ 后来为什么又出现了 async/await

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

### js 的单线程与异步机制

- 同步代码（调用栈依次执行的代码，如变量赋值、函数调用）、异步代码（不会立即执行，而是放入相应的队列，如 setTimeout，Promise、IO 操作）
- 执行栈
- 宏任务（setTimeout、I/O 操作）与微任务（Promise.then/catch/finally），优先级（微>宏）
- 事件循环的执行过程

  执行过程: 1.执行同步代码(主线程) 2.清空微任务队列 3.执行一个宏任务 4.重复 2-3 步骤

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
