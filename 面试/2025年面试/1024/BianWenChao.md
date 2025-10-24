## 一、项目经验深度挖掘（25-30 分钟）

- 订单、余额（0.1+0.2 为什么不等于 0.3）
- 数字和字符串 在 +运算时，有什么表现？（隐式转换），如何避免隐式转换带来的问题？
- ## 什么是深拷贝？什么是浅拷贝？分别都有哪些方法？
- 用 == 运算符作比较会怎么返回？

  - console.log(obj == newObj) // true 浅拷
  - console.log(obj == newObj) // false 深拷

- 点击文档片段，定位原 pdf，高亮展示原片段如何实现的？
- 你觉得项目中还有哪些亮点？
- 遇到过什么难题？如何解决的？

### 3.1 AI 相关技术（重点考察）

**题目**: 你在宝信医药项目中实现了 RAG 问答系统，请详细描述技术实现方案？

**考察点**:

- 对 AI 技术的理解
- 实际项目的技术深度

**期望答案**:

- **RAG 架构**: 检索 + 生成
- **知识库构建**: 文档分块、向量化存储
- **检索优化**: 语义搜索、相关性排序
- **LLM 集成**: API 调用、提示词工程

**追问**:

- 如何处理大文档的分块策略？
- 如何优化检索的准确性和速度？
- 如何设计提示词来提升回答质量？
- 遇到哪些问题？如何解决的？
- 大文件上传 or 问答展示部分

### 3.2 实时通信技术

**题目**: 你在充电项目中使用了 WebSocket，请说明为什么要选这个方案，方案细节和遇到的问题？

**考察点**:

- 候选人提到了连接管理，断线重连，心跳检测机制，实现细节
- 对实时通信技术的理解，何时使用
- 问题解决能力

**期望答案**:

```javascript
class WebSocketManager {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.heartbeatInterval = null;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket 连接成功");
      this.reconnectAttempts = 0;
      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onclose = () => {
      console.log("WebSocket 连接关闭");
      this.stopHeartbeat();
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket 错误:", error);
    };
  }

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(
          `尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
        );
        this.connect();
      }, 2000 * this.reconnectAttempts);
    }
  }
}
```

**追问**:

- **消息可靠性**: 如何保证消息不丢失？如何处理消息重复？
- **性能优化**: 大量连接时如何优化？连接池管理策略？
- **错误处理**: 不同网络环境下的处理策略？降级方案？
- **安全考虑**: WebSocket 连接的安全性？如何防止恶意连接？
- **监控告警**: 如何监控连接状态？异常告警机制？
- **业务场景**: 充电状态实时更新的具体实现？数据同步策略？

---

## 二、基础能力考察（15-20 分钟）

### 2.1 JavaScript 核心概念

**引子**：实际项目开发中，有没有防抖、节流的应用场景？两者区别是什么？

```js
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**题目**: 在实现防抖的时候其实已经用到了闭包，能解释一下什么是闭包？
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

**注意：** 导致问题

- 闭包会导致函数中的变量无法被垃圾回收，可能造成内存泄漏。

**如何解决：**

- 赋值为 null，及时解除不再需要的引用
- 避免闭包滥用，不要把闭包赋值给全局变量或长生命周期对象，减少闭包的生命周期。
- 及时清理事件和定时器
- 只在必要时使用闭包，只在确实需要数据私有化或持久化时使用闭包，避免在循环或大对象中频繁创建闭包

---

### 2.2 typeof 类型判断 与 类型转换

**题目**: JavaScript 中如何判断变量类型
**追问**: 对于数组、对象、null，`typeof` 都返回 `"object"`，如何细分。
**更精确的类型判断：**

- 判断数组：`Array.isArray(arr)`
- 判断 null：`value === null`
- 判断对象：`typeof obj === 'object' && obj !== null && !Array.isArray(obj)`

**题目**: 我们有时候在运算符比较的时候会发生一些奇怪的现象，JavaScript 隐式转换通常发生的几种场景

**追问**: 如何避免隐式转换带来的问题

### 2.2 事件循环与异步编程

**题目**: 请解释 JavaScript 的事件循环机制

**考察点**:

- 对 JavaScript 事件循环的理解
- 异步编程的执行顺序分析

**期望答案**:

分析下面代码的执行顺序？

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// 执行顺序：1 -> 4 -> 3 -> 2
```

**追问**: 有哪些例子属于宏任务（setTimeout、I/O 操作），哪些属于微任务（Promise.then/catch/finally），两者执行的优先级？

### 2.3 ES6+ 新特性

**题目**: 请说明什么是 Promise？ Promise、async/await 的区别？如何实现并发处理多个请求、超时中断

**考察点**:

- 对异步编程的理解
- 实际项目中的应用能力

**期望答案**:

- 两者写法的区别

```javascript
// Promise 链式调用
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then((response) => response.json());
}

// async/await 方式
async function fetchUserDataAsync(userId) {
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();

    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error("获取用户数据失败:", error);
  }
}
```

- 如何实现并发处理多个请求?

```javascript
// 并发处理多个请求
async function fetchMultipleUsers(userIds) {
  const promises = userIds.map((id) => fetch(`/api/users/${id}`));
  const responses = await Promise.all(promises);
  return Promise.all(responses.map((r) => r.json()));
}

// 手写一个 Promise.all
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    const len = promises.length;
    if (len === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (value) => {
          results[i] = value;
          count++;
          if (count === len) {
            resolve(results);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}
```

- 实现一个超时中断，如何中断 Promise 链?

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
        // 用 Promise.resolve 包装，确保即使不是 promise 也可以按 promise 处理
        Promise.resolve(promise).then(
          (value) => {
            // 只要有一个 promise 成功，就直接 resolve，race 立即结束
            resolve(value);
          },
          (error) => {
            // 只要有一个 promise 失败，就直接 reject
            reject(error);
          }
        );
      });
      // 注意：只要第一个 settle 的 promise 决定最终结果，后续的会被忽略
    });
  }
  ```

## 三、React 生态深度考察（20-25 分钟）

### 3.1 React 核心机制

**题目**: 能谈一下对 React 核心机制的理解吗？比如，请详细解释 React 的虚拟 DOM 和 Fiber 架构，以及它们如何提升性能？

**考察点**:

- 对 React 核心机制的理解
- 性能优化的思考

**期望答案**:

- **虚拟 DOM**: JavaScript 对象表示真实 DOM，通过 diff 算法找出变化
- **Fiber 架构**:
  - 可中断的渲染过程
  - 优先级调度
  - 时间切片技术
- **性能提升**:
  - 减少直接操作 DOM 的次数
  - 批量更新
  - 异步渲染

**追问**:

- 遍历数组时为什么不推荐使用 index 作为数组每一项的 key？
- 说明 useEffect 的依赖数组作用？

### 3.2 Hooks 深入应用

**题目**: useCallback 和 useMemo 的使用场景？

**考察点**:

- 实际开发中的应用能力

**追问**: 组件通信的几种方式？如何选择

### 3.3 状态管理方案

**题目**: 你在项目中使用了什么状态管理方案？请对比 Redux、Zustand、Context API 的优缺点？

**考察点**:

- 对状态管理方案的理解
- 技术选型的思考能力

**期望答案**:

- **Redux**:
  - 优点：可预测、调试工具完善、生态丰富
  - 缺点：样板代码多、学习曲线陡峭
- **Zustand**:
  - 优点：轻量级、API 简洁、TypeScript 友好
  - 缺点：生态相对较小
- **Context API**:
  - 优点：React 内置、简单易用
  - 缺点：性能问题、不适合复杂状态

**追问**: 什么时候需要引入状态管理？如何设计状态结构？

### 3.4 React 性能优化

**题目**: 请说明 React 中常见的性能优化手段，并结合你的项目经验举例？

**考察点**:

- 对 React 性能优化的理解
- 实际项目中的优化经验

**期望答案**:

- **组件优化**:
  - React.memo 避免不必要的重渲染
  - useMemo 缓存计算结果
  - useCallback 缓存函数引用
- **渲染优化**:
  - 虚拟滚动处理大量数据
  - 懒加载组件和路由
  - 避免在 render 中创建对象和函数
- **状态优化**:
  - 合理拆分组件状态
  - 使用 useReducer 管理复杂状态
  - 避免状态提升过度

**追问**: 如何排查 React 性能问题？React DevTools 的使用技巧？

### 3.5 错误边界与异常处理

**题目**: 请实现一个错误边界组件，并说明 React 中的错误处理策略？

**考察点**:

- 对 React 错误处理的理解
- 实际项目中的异常处理经验

**期望答案**:

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // 可以在这里上报错误到监控系统
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>{this.state.error && this.state.error.toString()}</details>
        </div>
      );
    }

    return this.props.children;
  }
}

// 使用方式
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

**追问**: 错误边界能捕获哪些错误？如何设计全局错误处理方案？

---

## 四、进阶能力考察（15-20 分钟）

### 4.1 性能优化

**题目**: 请说明前端性能优化的常见手段，并结合你的项目经验举例？

**考察点**:

- 性能优化的实际经验
- 技术方案的思考深度

**期望答案**:

- **代码层面**:
  - 虚拟滚动
  - 防抖节流
  - 懒加载
- **资源优化**:
  - 代码分割
  - 图片优化
  - CDN 加速
- **渲染优化**:
  - 减少重排重绘
  - 使用 transform 替代 position
  - 避免频繁的 DOM 操作

**追问**: 如何监控和测量性能？React 中如何优化组件渲染？

### 4.2 工程化实践

**题目**: 你在项目中使用了 Docker 和 Kubernetes，请说明前端工程化的最佳实践？

**考察点**:

- 对工程化的理解
- DevOps 实践经验

**期望答案**:

- **构建优化**: Webpack 配置、代码分割
- **部署策略**: 蓝绿部署、滚动更新
- **监控告警**: 错误监控、性能监控
- **CI/CD**: 自动化测试、自动化部署

### 4.3 代码实现题

**题目**: 请实现一个深拷贝函数，并说明如何处理循环引用？

**考察点**:

- 代码实现能力
- 对复杂问题的解决思路

**期望答案**:

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 处理基本类型
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const clonedArray = [];
    hash.set(obj, clonedArray);
    obj.forEach((item) => {
      clonedArray.push(deepClone(item, hash));
    });
    return clonedArray;
  }

  // 处理普通对象
  const clonedObj = {};
  hash.set(obj, clonedObj);

  Object.keys(obj).forEach((key) => {
    clonedObj[key] = deepClone(obj[key], hash);
  });

  return clonedObj;
}
```

## 五、算法笔试题目（力扣经典题）

**题目**: 找出字符串中第一个匹配项的下标

---

## 面试评分标准

### 优秀（90-100 分）

- 基础扎实，概念清晰，能深入讲解技术原理
- 有丰富的实际项目经验，能详细描述技术实现
- 具备性能优化和工程化思维
- 对 AI 技术有深入理解和实践经验
- 学习能力强，技术视野开阔

### 良好（80-89 分）

- 基础较好，能回答大部分问题
- 有一定的项目经验，能描述基本实现
- 对新技术有了解和学习意愿
- 具备基本的工程化意识

### 一般（70-79 分）

- 基础一般，概念不够清晰
- 项目经验较少，描述不够深入
- 学习能力有待提升
- 工程化思维不足

### 待提升（60-69 分）

- 基础薄弱，概念模糊
- 缺乏实际项目经验
- 学习能力不足
- 技术视野狭窄

---

## 面试建议

1. **重点关注**: 候选人的 AI 相关项目经验，特别是 RAG 系统的实现细节
2. **深入挖掘**: 在实习项目中的具体贡献和技术难点
3. **评估潜力**: 作为硕士在读生，重点关注学习能力和技术成长潜力
4. **技术匹配**: 评估与团队技术栈的匹配度，特别是 React 和 AI 技术
5. **追问策略**: 根据回答质量决定是否深入，避免过度追问基础问题
