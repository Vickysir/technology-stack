# 前端开发实习生面试题

## 一、技术能力相关

- React 的生命周期，函数组件如何通过 useEffect 模拟部分生命周期行为。

- 还使用过哪些 React Hook？都是如何使用的
  useState：状态管理
  useEffect：副作用处理（如数据请求、订阅等）
  useContext：上下文
  useRef：引用 DOM 或保存变量
  useMemo：缓存计算结果
  useCallback：缓存函数
  useReducer：复杂状态管理
  useLayoutEffect：同步副作用
  useImperativeHandle：暴露实例方法

- React 组件之间是如何通讯的？
  父子组件：通过 props 传递数据和回调
  兄弟组件：通过提升状态到最近的共同父组件，或使用全局状态管理（如 Redux、Context）
  跨层级组件：使用 Context API
  非嵌套组件：可通过事件总线、全局状态等方式

- 在 React 中表单组件管理中，什么是受控组件？什么是非受控组件？

- TypeScript 常用的类型注解？可选属性？交叉类型？联合类型？
  string、number、boolean、any、unknown、void、never、object、Array<T>、T[]
- 什么是泛型？实现一个泛型支持属性全部加上可选

```ts
type Partial<T> = { [P in keyof T]?: T[P] }; // 属性全部加上可选

interface User {
  id: number;
  age: number;
  name: string;
}

type PartialUser = Partial<User>;
```

## 二、项目相关问题

### 1. TaskFlow 多视图任务管理平台

- react-router 路由传参的方式？

```
  路径参数：适合资源唯一标识（如详情页 id）
  查询参数：适合可选筛选、分页等
  state 传参：适合临时数据传递，不会出现在 URL 上
```

- 你在 TaskFlow 项目中是如何实现路由权限控制的？
- 讲一下你在项目中自定义排序、多条件筛选是什么功能？
- Axios 的二次封装主要解决了哪些问题，如何实现的？
- 知道 Axios 底层是如何实现的吗？XMLHttpRequest 的主要实现流程
- async/await 和 Promise 的关系
- js 事件循环的执行过程, 同步>异步，微任务(Promise)>宏任务（settimeout）

### 2. WanderGate 全域旅记管控平台

- 请介绍一下 WanderGate 项目的主要功能和你负责的模块，移动端 和 web ？
- 数据持久化有哪些方案？
- 封装很多 hook 组件，hook 的使用条件和规则是什么？都封了一些什么组件？
- 什么是重绘 和 回流，如何优化？

## 三、综合能力与软技能

- Git 版本管理工具的基本操作
  git rebase 和 git merge 的区别？
  git stash , pop 和 apply 的区别
- 请结合你的项目经历，谈谈你在团队协作中遇到的最大挑战，以及你是如何解决的。
- 你如何规划和拆解一个复杂的前端需求？请结合实际项目举例说明。
- 在学习新技术时，你通常采用哪些方法？遇到难题时如何自我驱动解决？

---

## 四、笔试

防抖

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function logDebounce() {
  console.log("防抖触发:", new Date().toLocaleTimeString());
}

const debouncedFn = debounce(logDebounce, 1000);

// 模拟高频触发，每 200ms 调用一次（如输入框输入）
let count = 0;
const interval1 = setInterval(() => {
  // logDebounce()  // 每 200 ms 输出1次 ，输出10次
  debouncedFn(); // 应该是在第 3s 时，输出1次
  count++;
  if (count > 10) clearInterval(interval1); // 触发 10 次后停止
}, 200);
```

节流

```js
function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

function logThrottle() {
  console.log("节流触发:", new Date().toLocaleTimeString());
}

const throttledFn = throttle(logThrottle, 1000);

// 模拟高频触发，每 200ms 调用一次（如 scroll 事件）
let count2 = 0;
const interval2 = setInterval(() => {
  throttledFn();
  count2++;
  if (count2 > 20) clearInterval(interval2); // 触发 20 次后停止
}, 200);
```

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
