- 过往项目中有什么亮点？遇到的最大的困难时什么如何解决的？

- 什么是Promise？   
    - Promise 链式调用、值传递，解决了什么问题？ 后来为什么又出现了 async/await
        ```javascript
            // then方法的值传递
            Promise.resolve(1)
                .then(value => value + 1)  // 2
                .then(value => value * 2)  // 4
                .then(value => {
                    console.log(value);  // 4
                });
        ```

    - 那么在链式调用时Promise的错误是如何处理的呢？
        ```javascript
            // 错误传播特性
            Promise.resolve()
                .then(() => {
                    throw new Error('error1');
                })
                .then(() => {
                    console.log('不会执行');
                })
                .catch(err => {
                    console.log(err);  // Error: error1
                    throw new Error('error2'); //追问： 如果不抛出这个异常呢？（下一个then就会执行，catch不会捕获到最上面的错误
                })
                .then(() => {
                    console.log('不会执行');
                })
                .catch(err => {
                    console.log(err);  // Error: error2
                });
        ```
   
    - 比如说如何上面那个一连串的接口请求，但是我想实现一个超时中断，如何中断Promise链? 

        ```javascript
        // Promise.race实现超时中断
        function timeoutPromise(promise, timeout) {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                reject(new Error('Timeout'));
                }, timeout);
            });
            return Promise.race([promise, timeoutPromise]);
        }
        ```

    - 如何实现一个带并发限制的Promise调度器?
    - Promise在实际项目中的应用
        - 请求的重试机制
        - 并发请求的控制
        - 取消请求的实现



- js的单线程与异步机制
    - 同步代码（调用栈依次执行的代码，如变量赋值、函数调用）、异步代码（不会立即执行，而是放入相应的队列，如setTimeout，Promise、IO操作）
    - 执行栈
    - 宏任务（setTimeout、I/O操作）与微任务（Promise.then/catch/finally），优先级（微>宏）
    - 事件循环的执行过程

        执行过程:
            1.执行同步代码(主线程)
            2.清空微任务队列
            3.执行一个宏任务
            4.重复2-3步骤

    - 举个具体的例子

        ```javascript
            console.log('1');  // 同步

            setTimeout(() => {
                console.log('2');  // 宏任务
            }, 0);

            Promise.resolve().then(() => {
                console.log('3');  // 微任务
            });

            console.log('4');  // 同步

            // 输出顺序: 1 4 3 2
        ```
    - 知道node 和浏览器在实现 loop 时候的差别吗？

- 移动端如何做适配

- 如何解决用户疯狂点击提交按钮？
    - 什么是防抖？什么是节流？
    - 假如防1s，但是后端返回的又比较慢，用户在这个期间又点击了很多次？防抖是不是没有用了应该怎么办？
    - 如果项目中有很多地方都需要这么处理怎么办？

- 系统多语言方案
    - 方案本身是什么？
    - 业务方如何接入？
    - 后续迭代过程中，新需求产生的需要翻译的地方，如何优化这个SOP
 