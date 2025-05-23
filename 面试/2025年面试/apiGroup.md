- 过往项目中有什么亮点？遇到的最大的困难时什么如何解决的？

- 什么是 Promise？

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

- js 的单线程与异步机制

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

  - 知道 node 和浏览器在实现 loop 时候的差别吗？

- 移动端如何做适配

- 如何解决用户疯狂点击提交按钮？

  - 什么是防抖？什么是节流？
  - 假如防 1s，但是后端返回的又比较慢，用户在这个期间又点击了很多次？防抖是不是没有用了应该怎么办？
  - 如果项目中有很多地方都需要这么处理怎么办？

- 系统多语言方案

  - 方案本身是什么？
  - 业务方如何接入？
  - 后续迭代过程中，新需求产生的需要翻译的地方，如何优化这个 SOP

- Vue3

  - 响应式原理
    - 生命周期
    - 组件通信
    - setup 里为什么不能使用 `this` 了
    - 指令
      - 单向数据

        - `v-bind:value`,可简写`:value`

      - 双向数据绑定
        `v-model`
  - 组件设计

    - composition API 和 Options API 相比，优势是什么？它是如何更好的解决逻辑复用和代码组织的问题？

      - setup 定义数据、方法，函数式编程
      - 数据和方法要分别在 data、mathod 中定义
      - setup 里的数据还需处理响应式的问题，data 定义时是自带响应式

    - ref 和 reactive 的区别？为什么有时候要用 ref 包裹对象？

      - ref 定义基本类型数据
      - reactive 定义对象类型的数据

      区别

      - ref 创建的变量，必须用`.value`,可以使用插件自动添加`.value`
      - reactive 重新分配对象时，会失去响应式，所以可以使用`Object.assign`去整体替换
      - 在使用 watch 监视响应式数据时，reactive 默认开启深度监视，ref 定义的对象类型的数据需要手动开启

    - watch 监视数据的变化，有哪些参数？可以监视哪些种情况（ref2 种，reactive1 种）
      - 三个参数，监视数据，回调函数，监视配置参数，如`deep`,`immediate`会立刻开始监视
      - 在监视 ref 定义的数据时，什么时候新旧 value 一致，什么时候不一致？为什么？
        - 监视对象类型的数据，需开启深度监视，然后在修改某个属性时新旧一致，修改整个对象时，有新旧之分
      - 监视 reactive 定义的数据时，只监听某一个属性应该怎么办？
        - 把监视数据改为一个`getter`函数，需要深度监视再开启`deep`
        - 不用`getter`不是也可以监视到吗？为什么非要用呢？
          - 整个对象变化是监视不到的
    - watchEffect

      - 监视处理副作用
      - 与 watch 的区别，无需指定依赖，自动识别

    - toRefs/toRef 是用来解构 reactive 对象的，使其解构出来的值夜具备响应式能力
      - Pinia 提供的 storeToRef 有什么区别
    - 为什么我们不直接使用我们定义的方法函数，而是要使用 computed
      - 缓存
    - 如何能修改 computed 的计算属性呢
      - `get()`，`set()`
    - 标签的 ref 属性
      - 为什么不直接给标签一个 id，通过 document.getElementByid 去获取 dom 元素（局部隔离）
      - 那么样式隔离是如何处理的呢？（style 加一个 scope 属性）
      - 那如果给组件身上加一个 ref，这个 ref 拿到的是什么？
        - 怎么能拿到组件的里的数据（需要在组件内部使用 defineExpose 出去）
