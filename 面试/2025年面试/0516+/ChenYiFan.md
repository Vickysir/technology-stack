## 一、面试题

1. 你在简历中提到熟悉 React 和 React 底层原理，请简要介绍 React 的虚拟 DOM 的工作机制，以及它是如何提升性能的？
   - 虚拟 DOM 通过“用 JS 对象描述 UI → diff 算法找差异 → 最小化真实 DOM 更新”这一流程，实现了高效的 UI 渲染和性能优化
2. 请谈谈你对 React 18 中 Fiber 架构的理解，它是如何实现任务优先级调度和异步渲染的？

   - Fiber 是 React 16 之后引入的一种新的协调引擎（Reconciliation Engine），它对虚拟 DOM 进行了更细粒度的拆分和管理。每个 Fiber 节点对应一个组件或元素，Fiber 架构的核心目标是让 React 的渲染过程变得可中断、可恢复、可分片，从而实现更灵活的任务调度和更流畅的用户体验。

3. 你在项目中除了使用了 useState 和 useEffect，还使用过其他哪些 hook？ 请分别说明它们的作用和使用场景
4. 你既做了 react 的项目，也做了 vue 的项目，能否简单对比一下 Vue3 和 React 的区别？生命周期？组件开发？数据通讯？
5. 你在 EasyChat 项目中用到了 WebSocket，请简述 WebSocket 与 HTTP 的区别，WebSocket 的心跳包如何实现？
6. 你在项目中做过性能优化，请举例说明你是如何定位和优化页面首屏渲染速度的？
7. 你了解 Webpack 和 Vite 的区别，请简要说明它们的构建原理和适用场景。
8. 你在项目中提到对 axios 进行了二次封装，请谈谈你是如何设计和实现的？遇到过哪些问题，如何解决的？
9. 请介绍一下你在团队协作中如何使用 Git 进行版本管理，有哪些最佳实践？

---

## 二、笔试题

1. 手写一个简化版的虚拟 DOM diff、响应式数据绑定、或实现 useState/useEffect 的核心逻辑，并解释

```js
// 1. 简化版 useState 实现
let state;
function useState(initialValue) {
  state = state === undefined ? initialValue : state;
  function setState(newValue) {
    state = newValue;
    // 这里可以触发组件重新渲染
    render();
  }
  return [state, setState];
}
/** 说明：
这里只实现了单一 state，真实 React 会用数组保存多个 state，并结合当前 hook 的调用顺序。
setState 会更新 state 并触发重新渲染（这里假设有 render 方法）。
*/

// 2. 简化版 useEffect 实现
let lastDeps;
function useEffect(callback, deps) {
  const hasNoDeps = !deps;
  const hasChanged = lastDeps
    ? !deps.every((dep, i) => dep === lastDeps[i])
    : true;
  if (hasNoDeps || hasChanged) {
    callback();
    lastDeps = deps;
  }
}
/** 说明：
这里只实现了依赖数组的浅比较，判断依赖是否变化。
真实 React 会处理清理函数、异步等复杂场景。
*/

// 3. 简单用法示例
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("count changed:", count);
  }, [count]);
  // ...渲染逻辑
}
/** 总结
这个实现只是演示核心思想：useState 通过闭包保存状态，useEffect 通过依赖数组判断是否执行副作用。
真实 React 的实现要复杂得多，包括多次调用、hook 顺序、清理副作用等。
*/
```

```js
// 简化版虚拟 DOM diff 实现

// 虚拟DOM结构
function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

// 渲染虚拟DOM到真实DOM
function render(vnode, container) {
  const el = document.createElement(vnode.type);
  for (let key in vnode.props) {
    el.setAttribute(key, vnode.props[key]);
  }
  vnode.children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      render(child, el);
    }
  });
  container.appendChild(el);
}

// 简单diff：只比较type和children（不处理key和复杂结构）
function diff(oldVNode, newVNode, parent) {
  if (!oldVNode) {
    // 新增节点
    render(newVNode, parent);
  } else if (!newVNode) {
    // 删除节点
    parent.removeChild(parent.childNodes[0]);
  } else if (oldVNode.type !== newVNode.type) {
    // 替换节点
    parent.replaceChild(
      render(newVNode, document.createElement("div")),
      parent.childNodes[0]
    );
  } else {
    // 递归diff子节点
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];
    for (let i = 0; i < newChildren.length; i++) {
      diff(oldChildren[i], newChildren[i], parent.childNodes[0]);
    }
  }
}
/** 说明：
这里只处理了最基础的 type 和 children 的比较，没有处理 key、属性变化等复杂情况。
真实 React 的 diff 算法更高效，能处理大量节点、key 优化等。 
*/
```

2. js 渲染机制（事件循环），变种系列

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

3. 回文数（Easy）

```
给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，121 是回文，而 123 不是。


示例 1：

输入：x = 121
输出：true


示例 2：

输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。


示例 3：

输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。


提示：

-231 <= x <= 231 - 1
```
