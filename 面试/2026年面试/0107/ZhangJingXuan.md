# 简历阅读与面试题设计

## 候选人信息（已脱敏）

**基本信息：**

- 学历：本科（2022.09-2026.06，预计毕业）
- 学校：985 高校
- 专业：化学测量学与技术（跨学科背景）
- 工作年限：在校学生，有 3 个月全栈开发实习经验

**技术栈：**

- **前端：** HTML/HTML5, CSS/CSS3, JavaScript/ES6, React, React-Router, Redux, Ant Design, TanStack Query, Tailwind CSS, react-plotly.js, Mol\*（3D 分子可视化）
- **后端：** Flask, FastAPI, Next.js, TypeScript
- **数据库：** PostgreSQL, Drizzle ORM
- **机器学习：** Python, PyTorch, RAG, SQL
- **工程化：** webpack, Git, dumi, storybook
- **其他：** HTTP/TCP/IP 协议, Axure 原型设计

**项目经验：**

1. **AI 助教系统**（2023.07-2024.12）- 项目负责人，全栈开发
2. **2D 材料检测系统**（2024.01-2025.10）- 项目负责人，机器学习+前端可视化
3. **pKa 预测平台**（2025.06-2025.09）- 实习项目，全栈开发

**个人特点：**

- ✅ 跨学科背景，化学+计算机双重能力
- ✅ 项目经验丰富，担任多个项目负责人
- ✅ 技术栈全面，前端+后端+机器学习
- ✅ 有性能优化实践经验（光谱渲染优化 45%）
- ✅ 有全栈开发能力，独立完成后端服务
- ✅ 有工程化意识（Git 工作流、代码管理）
- ⚠️ 工作经验较少（仅 3 个月实习）
- ⚠️ 可能缺乏大型项目协作经验

---

## 技术能力分析

### 1. 技术栈分析

**前端能力：**

- **框架掌握：** React 生态熟练（React, Router, Redux, TanStack Query）
- **UI 库：** Ant Design 实际使用经验
- **性能优化：** 有实际优化经验（useCallback, 虚拟化, 渲染优化）
- **可视化：** react-plotly.js, Mol\* 3D 可视化
- **工程化：** webpack, dumi, storybook 了解

**后端能力：**

- **框架：** Flask → FastAPI 迁移经验（异步优化）
- **全栈：** Next.js + TypeScript 实践
- **数据库：** PostgreSQL + Drizzle ORM

**综合能力：**

- 跨领域能力（化学+计算机）
- 全栈开发能力
- 性能优化意识

### 2. 擅长领域

1. **React 生态开发** - 有多个项目实践经验
2. **性能优化** - 有具体优化案例和数据
3. **全栈开发** - 前后端都有实践经验
4. **数据可视化** - 光谱数据、3D 分子结构可视化
5. **工程化实践** - Git 工作流、代码管理

### 3. 个人特点

**优势：**

- 学习能力强（跨学科背景）
- 项目经验丰富（多个项目负责人）
- 技术栈全面
- 有实际优化经验

**待考察点：**

- 基础理论深度（JavaScript 核心原理）
- 复杂场景处理能力
- 团队协作经验
- 系统设计能力

---

## 考察重点与题型设计

### 考察重点

根据候选人特点，重点考察：

1. **JavaScript 基础** - 虽然会用 React，但需要考察 JS 核心原理理解
2. **React 深度** - 性能优化、hooks 原理、状态管理
3. **性能优化** - 既然有优化经验，可以深挖优化思路和方法
4. **全栈能力** - 前后端交互、数据流设计
5. **工程化** - Git、构建工具、代码规范
6. **算法基础** - 作为基础能力考察

### 题型分布（1 小时面试）

- **JavaScript 基础题：** 2-3 题（15 分钟）
- **React 框架题：** 3-4 题（20 分钟）
- **性能优化题：** 1-2 题（10 分钟）
- **全栈/工程化题：** 1-2 题（10 分钟）
- **算法题：** 1 题（15 分钟）

---

**待考察点：**

- 介绍一下，为什么那家公司只实习了 3 个月？怎么没有去大厂？
- 项目有哪些难点，亮点？
- 用 dumi, storybook 做了什么
- 前后端框架选择
- 你在项目中使用过 Next.js，请说明 Next.js 的 SSR 和 SSG 有什么区别？
  - **SSR（Server-Side Rendering）：** 每次请求时在服务端渲染，适合动态内容
  - **SSG（Static Site Generation）：** 构建时生成静态 HTML，适合静态内容，性能更好
- AI 使用程度
- 如何学习

## 面试题（层层递进）

### 一、JavaScript 基础（初级 → 中级）

#### 题目 1：闭包与作用域（初级）

**题目：** 请解释以下代码的输出，并说明原因：

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
```

**期望答案：**

- 输出：`3, 3, 3`
- 原因：var 声明的变量没有块级作用域，所有 setTimeout 回调共享同一个 i，当回调执行时 i 已经是 3
- 解决方案：
  - 使用 let（块级作用域）
  - 使用闭包保存 i 的值
  - 使用 IIFE

**进阶追问：** 如果改成 let，输出是什么？为什么？

**答案：**

```javascript
// 使用let
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出: 0, 1, 2
  }, 100);
}
// let在每次循环都会创建新的块级作用域，每个setTimeout回调捕获的是不同的i值
```

---

#### 题目 2：Event Loop（中级）

**题目：** 请说出以下代码的执行顺序：

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

**期望答案：**

- 执行顺序：`1, 4, 3, 2`
- 解释：
  - 同步代码：1, 4
  - 微任务（Promise.then）：3
  - 宏任务（setTimeout）：2
  - 微任务优先级高于宏任务

**进阶追问：** 如果 Promise.then 里再嵌套 Promise 和 setTimeout，执行顺序是什么？

**答案：**

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
  Promise.resolve().then(() => {
    console.log("4");
  });
  setTimeout(() => {
    console.log("5");
  }, 0);
});

console.log("6");
// 输出: 1, 6, 3, 4, 2, 5
// 微任务队列清空后才会执行宏任务
```

---

#### 题目 3：this 指向（中级）

**题目：** 请说明以下代码的输出：

```javascript
const obj = {
  name: "obj",
  fn1: function () {
    console.log(this.name);
  },
  fn2: () => {
    console.log(this.name);
  },
};

obj.fn1(); // ?
obj.fn2(); // ?

const fn3 = obj.fn1;
fn3(); // ?
```

**期望答案：**

- `obj.fn1()` → `'obj'`（普通函数，this 指向调用者 obj）
- `obj.fn2()` → `undefined`（箭头函数，this 指向外层作用域，可能是 window/global）
- `fn3()` → `undefined`（函数独立调用，this 指向全局对象，严格模式下是 undefined）

**进阶追问：** 如何让 fn3 输出'obj'？

**答案：**

```javascript
// 方法1: bind
const fn3 = obj.fn1.bind(obj);
fn3(); // 'obj'

// 方法2: call/apply
obj.fn1.call(obj); // 'obj'
obj.fn1.apply(obj);

// 方法3: 箭头函数（但会丢失this动态性），可以增加入参结合bind/call/apply改变this指向
const fn3 = () => {
  obj.fn1(); // 直接调用 obj.fn1()，this 指向 obj
};
fn3(); // 'obj'
```

---

### 二、React 框架（中级 → 高级）

#### 题目 4：setState 同步/异步（中级）

**题目：** setState 是同步的还是异步的？请分析以下代码的输出：

```javascript
// 类组件示例
class Component extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    console.log("before:", this.state.count); // ?
    this.setState({ count: this.state.count + 1 });
    console.log("after:", this.state.count); // ?
  };
}

// 函数组件示例
function FunctionComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("before:", count); // ?
    setCount(count + 1);
    console.log("after:", count); // ?
  };
}
```

**期望答案：**

**核心结论：** setState 调用是同步的，但 state 更新是异步的（React 会进行批处理优化）。

**详细说明：**

1. **类组件中的 setState：**
   - setState 调用立即返回，但 state 不会立即更新
   - React 会将多个 setState 调用进行批处理（batching）
   - 在事件处理函数中，多次 setState 会被合并

```javascript
class Component extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    console.log("before:", this.state.count); // 0
    this.setState({ count: this.state.count + 1 });
    console.log("after:", this.state.count); // 仍然是 0（异步更新）

    // 多次 setState 会被合并
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    // 结果：count 只增加 1，因为三次 setState 被合并了
  };
}
```

2. **函数组件中的 useState：**
   - setState 行为与类组件类似
   - 使用函数式更新可以避免闭包问题

```javascript
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("before:", count); // 0
    setCount(count + 1);
    console.log("after:", count); // 仍然是 0

    // ✅ 使用函数式更新
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // 结果：count 增加 3
  };
}
```

3. **批处理机制：**
   - React 17：在事件处理函数中会批处理，但在 setTimeout、Promise 等异步回调中不会
   - React 18：自动批处理所有更新（包括异步回调）

```javascript
// React 17：不会批处理
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // 触发两次渲染
}, 1000);

// React 18：自动批处理
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // 只触发一次渲染 ✅
}, 1000);
```

**如何获取更新后的值？**

```javascript
// 方法1: 使用 useEffect（函数组件）
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count updated:", count); // 获取最新值
  }, [count]);
}

// 方法2: 使用回调函数（类组件）
class Component extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 }, () => {
      console.log("count updated:", this.state.count); // 获取最新值
    });
  };
}

// 方法3: 使用 flushSync 强制同步更新（React 18）
import { flushSync } from "react-dom";

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1);
  });
  // 此时 count 已经更新
  console.log(count); // 最新值
}
```

**进阶追问：** 为什么 React 要将 setState 设计成异步的？

**答案：**

1. **性能优化：** 批处理可以减少不必要的渲染，提高性能
2. **状态一致性：** 确保在同一个事件循环中，多个 setState 调用后，组件只渲染一次
3. **用户体验：** 避免中间状态的闪烁，保证 UI 更新的流畅性
4. **并发特性：** React 18 的并发特性需要可中断的更新，异步机制支持优先级调度

---

#### 题目 5：性能优化（中级 → 高级）

**题目：** 你在简历中提到优化了光谱渲染性能（110ms → 60ms），请说明：

1. 你是如何定位性能瓶颈的？
2. 使用了哪些优化手段？
3. 如果现在有一个长列表（10000 条数据），如何优化渲染性能？

**期望答案：**

**1. 性能定位方法：**

- React DevTools Profiler
- Chrome Performance 面板
- 使用 performance API 测量
- 分析调用栈和火焰图

**2. 优化手段：**

- useCallback 优化函数引用
- useMemo 缓存计算结果
- 虚拟滚动（虚拟化）
- 减少不必要的重渲染
- 代码分割和懒加载

**3. 长列表优化方案：**

```javascript
import { useMemo, useCallback } from "react";

// 方案1: 虚拟滚动（推荐）
import { FixedSizeList } from "react-window";

function LongList({ items }) {
  const Row = useCallback(
    ({ index, style }) => {
      const item = items[index];
      return <div style={style}>{item.name}</div>;
    },
    [items]
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

// 方案2: 分页/无限滚动
function LongList({ items }) {
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const visibleItems = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page]);

  return (
    <>
      {visibleItems.map((item) => (
        <Item key={item.id} data={item} />
      ))}
      <button onClick={() => setPage((p) => p + 1)}>Load More</button>
    </>
  );
}

// 方案3: 使用React.memo避免不必要的重渲染
const Item = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});
```

**进阶追问：** 虚拟滚动的原理是什么？

**答案：**

- 只渲染可视区域内的 DOM 元素
- 通过计算滚动位置，动态更新渲染的 item 范围
- 使用绝对定位和 transform 来模拟滚动
- 保持总高度不变，但实际 DOM 节点数量固定

---

#### 题目 6：状态管理（中级）

**题目：** 你在项目中使用过 Redux，请说明：

1. 什么情况下需要使用 Redux？
2. Redux 的数据流是怎样的？

**期望答案：**

**1. Redux 使用场景：**

- 多个组件需要共享状态
- 状态逻辑复杂，需要集中管理
- 需要时间旅行调试
- 需要状态持久化

**2. Redux 数据流：**

```
用户操作 → Action Creator → Action → Dispatch → Reducer → Store (State) → Component (UI)
   ↑                                                                              ↓
   └─────────────────────────────── Subscribe (监听) ────────────────────────────┘


数据流时序图

时间线：
1. 用户点击按钮
   ↓
2. 组件调用 dispatch(increment())
   ↓
3. Store 接收 Action，调用 Reducer
   ↓
4. Reducer 根据 Action 计算新 State
   ↓
5. Store 更新 State
   ↓
6. Store 通知所有订阅者（组件）
   ↓
7. 组件重新渲染，显示新 State
   ↓
8. 用户看到更新后的 UI
```

**3. 跨组件通信：**
如果多个组件需要共享数据，可以考虑：

- Context API（简单场景）
- 状态提升到父组件
- Redux（复杂场景）

**进阶追问：** Redux 和 Context API 的区别？如何选择？

**答案：**

- **Redux：** 有中间件、时间旅行、更好的性能优化、适合大型应用
- **Context API：** 简单、内置、适合中小型应用、但可能导致不必要的重渲染，问题 2：没有中间件支持处理异步操作，需要在组件内部处理，问题 3：调试困难没有 DevTools
- **选择：** 简单状态用 Context，复杂状态用 Redux 或 Zustand

---

#### 题目 7：React 原理（高级）

**题目：** 请说明：

1. React 的 diff 算法原理
2. 为什么要引入 Fiber 架构？
3. 函数组件和类组件的区别？

**期望答案：**

**1. Diff 算法：**

- 同层比较，不跨层
- 通过 key 优化列表 diff
- 类型不同直接替换
- 相同类型比较属性

**2. Fiber 架构：**

- 解决同步渲染阻塞问题
- 可中断、可恢复的渲染
- 优先级调度
- 支持并发特性（Suspense、Concurrent Mode）

**3. 函数组件 vs 类组件：**

```javascript
// 函数组件（推荐）
function Component(props) {
  const [state, setState] = useState(0);
  useEffect(() => {}, []);
  return <div>{state}</div>;
}

// 类组件
class Component extends React.Component {
  state = { count: 0 };
  componentDidMount() {}
  render() {
    return <div>{this.state.count}</div>;
  }
}

// 区别：
// - 函数组件更简洁
// - Hooks只能在函数组件使用
// - 类组件有this绑定问题
// - 函数组件性能更好（无实例）
```

---

### 三、工程化工具（中级 → 高级）

#### 题目 8：Webpack 配置与优化（中级）

**题目：** 你在项目中使用过 webpack，请说明：

1. Webpack 的核心概念有哪些？
2. 如何优化 webpack 的构建性能？
3. 如何配置代码分割（Code Splitting）？

**期望答案：**

**1. Webpack 核心概念：**

- **Entry（入口）：** 指定打包的入口文件
- **Output（输出）：** 指定打包后的文件输出位置
- **Loader（加载器）：** 处理非 JS 文件（CSS、图片等）
- **Plugin（插件）：** 执行更广泛的任务（优化、压缩等）
- **Module（模块）：** 一切皆模块
- **Chunk（代码块）：** 代码分割后的块

```javascript
// webpack.config.js 基本配置
module.exports = {
  // 入口
  entry: "./src/index.js",

  // 输出
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // 清理输出目录
  },

  // 模块处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

**2. Webpack 构建性能优化：**

```javascript
// 优化方案
module.exports = {
  // 1. 使用缓存
  cache: {
    type: "filesystem", // 文件系统缓存
  },

  // 2. 优化解析
  resolve: {
    extensions: [".js", ".jsx", ".json"], // 减少文件查找
    alias: {
      "@": path.resolve(__dirname, "src"), // 路径别名
    },
    modules: [path.resolve(__dirname, "node_modules")], // 指定模块查找路径
  },

  // 3. 排除不需要处理的文件
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules
      },
    ],
  },

  // 4. 使用多进程构建
  // 安装 thread-loader
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "thread-loader", // 多进程
          "babel-loader",
        ],
      },
    ],
  },

  // 5. 优化压缩
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 并行压缩
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
          },
        },
      }),
    ],
  },

  // 6. 代码分割
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

**3. 代码分割（Code Splitting）：**

```javascript
// 方案1: 入口分割
module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
};

// 方案2: 动态导入（推荐）
// 在代码中使用
import("./utils/helper").then((module) => {
  module.doSomething();
});

// 或使用 React.lazy
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// 方案3: SplitChunksPlugin 配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all", // 所有类型的 chunk
      minSize: 20000, // 最小 chunk 大小
      maxSize: 244000, // 最大 chunk 大小
      cacheGroups: {
        // 第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          reuseExistingChunk: true,
        },
        // 公共代码
        common: {
          name: "common",
          minChunks: 2, // 至少被 2 个 chunk 引用
          priority: 5,
          reuseExistingChunk: true,
        },
        // React 相关
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          priority: 20,
        },
      },
    },
  },
};
```

**进阶追问：** Webpack 的构建流程是什么？Loader 和 Plugin 的区别？

**答案：**

**Webpack 构建流程：**

1. **初始化阶段：** 读取配置，初始化 Compiler 对象
2. **编译阶段：**
   - 从入口开始，递归解析依赖
   - 对每个模块执行对应的 Loader
   - 生成 AST（抽象语法树）
3. **优化阶段：**
   - 执行 Plugin
   - 代码分割、压缩等优化
4. **输出阶段：**
   - 生成最终文件
   - 写入输出目录

**Loader vs Plugin：**

| 特性         | Loader                   | Plugin                          |
| ------------ | ------------------------ | ------------------------------- |
| **作用时机** | 模块加载时               | 整个构建过程                    |
| **功能**     | 转换文件（如 JSX → JS）  | 执行更广泛的任务                |
| **使用方式** | 在 module.rules 中配置   | 在 plugins 数组中配置           |
| **示例**     | babel-loader, css-loader | HtmlWebpackPlugin, TerserPlugin |

```javascript
// Loader 示例：转换文件
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: "babel-loader", // 将 JSX 转换为 JS
      },
    ],
  },
};

// Plugin 示例：执行任务
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 生成 HTML 文件
    }),
  ],
};
```

---

### 四、全栈/工程化（中级）

#### 题目 10：Git 工作流（中级）

**题目：** 你提到掌握了 Git 工作流，请说明：

1. 常见的 Git 工作流有哪些？
2. 如何解决合并冲突？
3. 如何回退到之前的某个提交？

**期望答案：**

**1. Git 工作流：**

- **Git Flow：** master/develop/feature/hotfix 分支模型
- **GitHub Flow：** 简单的 master + feature 分支
- **GitLab Flow：** 带环境分支的流程

**2. 解决合并冲突：**

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 如果有冲突，Git会标记冲突文件
# 3. 手动解决冲突（编辑文件，保留需要的代码）
# 4. 标记冲突已解决
git add <conflicted-file>

# 5. 完成合并
git commit
```

**3. 回退提交：**

```bash
# 方法1: reset（危险，会丢失提交）
git reset --hard <commit-hash>  # 硬回退
git reset --soft <commit-hash>  # 软回退（保留更改）

# 方法2: revert（安全，创建新提交）
git revert <commit-hash>

# 方法3: 查看历史
git log --oneline
git checkout <commit-hash>  # 临时查看
```

---

### 五、算法题（中级）

#### 题目 11：算法题 - 最长递增子序列（10 分钟）

**难度**: ⭐⭐⭐

**题目来源**: LeetCode 300. 最长递增子序列

**题目描述**：

```
给你一个整数数组 nums，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

示例 1：
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4。

示例 2：
输入：nums = [0,1,0,3,2,3]
输出：4

示例 3：
输入：nums = [7,7,7,7,7,7,7]
输出：1

要求：
1. 实现算法
2. 分析时间复杂度
3. 是否有优化空间？能否降到O(n log n)？
```

**解法 1：动态规划（O(n²)）**

```javascript
function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1); // dp[i] 表示以nums[i]结尾的最长递增子序列长度

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}
```

**时间复杂度**: O(n²)
**空间复杂度**: O(n)

**解法 2：动态规划 + 二分查找（O(n log n)）**

```javascript
function lengthOfLIS(nums) {
  const tails = []; // tails[i] 表示长度为i+1的递增子序列的最小末尾元素

  for (const num of nums) {
    let left = 0,
      right = tails.length;

    // 二分查找：找到第一个 >= num 的位置
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}
```

**时间复杂度**: O(n log n)
**空间复杂度**: O(n)

---

## 面试总结

### 评估维度

根据候选人的回答，从以下维度评估：

1. **基础能力（30%）：**

   - JavaScript 核心概念理解
   - 作用域、闭包、this、Event Loop
   - 数据结构与算法基础

2. **框架能力（30%）：**

   - React 原理理解
   - Hooks 使用熟练度
   - 性能优化实践经验
   - 状态管理方案选择

3. **工程化能力（20%）：**

   - Git 工作流
   - 构建工具理解
   - 代码规范意识

4. **全栈能力（10%）：**

   - 前后端交互设计
   - API 设计能力
   - 数据库使用

5. **学习能力（10%）：**
   - 跨学科背景体现的学习能力
   - 问题解决思路
   - 技术选型理由

### 面试建议

**优势：**

- 项目经验丰富，有实际优化案例
- 技术栈全面，全栈能力
- 学习能力强

**关注点：**

- 基础理论深度（需要深入考察 JS 核心）
- 复杂场景处理（大型项目经验）
- 系统设计能力（架构思维）

**建议：**

- 如果基础扎实，可以重点考察 React 深度和性能优化
- 如果基础一般，需要加强 JS 核心原理的学习
- 建议补充大型项目协作经验

---

## 备注

- 所有候选人信息已脱敏处理
- 题目难度根据候选人经验调整（在校学生+3 个月实习）
- 面试时间控制在 1 小时，可根据实际情况调整题目数量
- 算法题可根据候选人表现选择不同难度
