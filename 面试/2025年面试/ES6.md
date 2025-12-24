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

**js 渲染机制（事件循环），变种系列**

```js
function fn() {
  console.log("start");

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log("promise1");
    })
    .then(() => {
      console.log("promise2");
    });

  setTimeout(() => {
    console.log("setTimeout 100");
  }, 100);

  console.log("end");
}
// start
// end
// promise1
// promise2
// setTimeout 0
// setTimeout 100
```

```js
// 变种1 * ：async/await + Promise
async function fn1() {
  console.log("start");

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  await Promise.resolve().then(() => {
    console.log("promise1");
  });

  console.log("await end");

  Promise.resolve().then(() => {
    console.log("promise2");
  });

  console.log("end");
}
// start
// promise1
// await end
// end
// promise2
// setTimeout 0
```

```js
// 变种2 ***：Promise 嵌套
function fn2() {
  console.log("start");

  new Promise((resolve) => {
    console.log("promise1");
    resolve();
  })
    .then(() => {
      console.log("then1");
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("setTimeout in promise");
          resolve();
        }, 0);
      });
    })
    .then(() => {
      console.log("then2");
    });

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  console.log("end");
}
// start
// promise1
// end
// then1
// setTimeout 0
// setTimeout in promise
// then2

// 1. 首先执行同步代码：
//      打印 "start"
//      创建第一个 Promise，执行其执行器函数，打印 "promise1"，并立即 resolve
//      打印 "end"
// 2. 此时：
//      微任务队列中：有第一个 then 的回调
//      宏任务队列中：只有一个 setTimeout（来自代码最后的 setTimeout）
// 3. 执行第一个 then 的回调：
//      打印 "then1"
//      创建并返回一个新的 Promise，这个 Promise 的执行器函数中有一个 setTimeout
//      这个 setTimeout 被放入宏任务队列
// 4. 此时：
//      微任务队列为空
//      宏任务队列中有两个 setTimeout：
//        第一个是代码最后的 setTimeout
//        第二个是第一个 then 中 Promise 的 setTimeout
// 5. 执行宏任务队列中的第一个 setTimeout（来自代码最后的 setTimeout）：
//      打印 "setTimeout 0"
// 6. 执行宏任务队列中的第二个 setTimeout（来自第一个 then 中的 Promise）：
//      打印 "setTimeout in promise"
//      这个 Promise resolve
// 7. 由于第一个 then 返回的 Promise 被 resolve，第二个 then 的回调被放入微任务队列
// 8. 执行第二个 then 的回调：
//      打印 "then2"
```

```js
// 变种3 ** ：async 函数中的同步代码
async function fn3() {
  console.log("start");

  const promise = new Promise((resolve) => {
    console.log("promise1");
    resolve();
  });

  console.log("before await");

  await promise;

  console.log("after await");

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  Promise.resolve().then(() => {
    console.log("promise2");
  });

  console.log("end");
}
// start
// promise1
// before await
// after await
// end
// promise2
// setTimeout 0
```

```js
// 变种4 ** ：复杂的 Promise 链
function fn4() {
  console.log("start");

  Promise.resolve()
    .then(() => {
      console.log("promise1");
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("setTimeout in promise1");
          resolve();
        }, 0);
      });
    })
    .then(() => {
      console.log("promise2");
      return Promise.resolve().then(() => {
        console.log("promise3");
      });
    })
    .then(() => {
      console.log("promise4");
    });

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  console.log("end");
}
// start
// end
// promise1
// setTimeout 0
// setTimeout in promise1
// promise2
// promise3
// promise4
```

### 知道 node 和浏览器在实现 loop 时候的差别吗？
