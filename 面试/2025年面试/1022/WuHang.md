- 项目介绍、参与度
- 遇到什么问题？如何解决的（独立解决问题的能力）

中国电信天翼视联有限公司

- 什么是 SSE ？
  - 如何建立连接
  - 数据流的格式与传输方式
  - SSE 的典型使用场景
- 与 websocket 的区别

黄浦区区政府

- 大屏项目需要注意什么？
- 介绍一下图表模版系统？
- 如何让图表自适应容器大小,图表的数据量超大怎么办？

基础

- 盒模型

JS

- 你知道的 ES6+特性，请说明 let、const、var 的区别

react

- 生命周期/Hooks，请说明 useEffect 的依赖数组的作用
- 组件之间的通信有几种方式？
- 请解释 React 中的虚拟 DOM 是什么？为什么需要虚拟 DOM？

- 对 TypeScript 的理解
- git 版本管理工具的基本操作

## 四、笔试

请实现一个简单的防抖/节流函数，并说明其应用场景？

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
