# 目录

增加奇怪的知识点

<br>

## 2021 年

- [July](#July)<br>

  - [0709-Reat-文档](#0709-Reat-文档)<br>
  - [0712-Reat-文档](#0712-Reat-文档)<br>
    <br>

- [August](#August)<br>
  - [0820-Reat-文档](#0810-Reat-文档)<br>
    <br>

### July

#### 0709-Reat-文档

- 代码分割

  > 在应用中引入代码分割的最佳方式是通过动态 import() 语法,诸如 Webpack，Rollup 和 Browserify（factor-bundle）这类打包器支持自动进行代码分割

  > React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。

  > 但是 React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，推荐 Loadable Components 这个库

- context

  > Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

  > 但是官方也提醒——请谨慎使用，因为这会使得组件的复用性变差。

  > 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。

  > 这替代方案并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。

- 性能优化
  - 确保使用的是生产版本
  - 开发者工具里的分析器对组件进行分析
  - 虚拟化长列表，虚拟滚动
  - shouldComponentUpdate 和 React.PureComponent
    - 不可变数据的重要性
      - Object.assign
      - Immer 或 immutability-helper

#### 0712-Reat-文档

- Profiler API

  > 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”
  > Profiling 增加了额外的开支，所以它在生产构建中会被禁用

- 查看版本重大变更

  - v16.8 推出 Hooks
  - v17 没有什么大变更
  - 2021-06-08 发布了 React 18 的先行版的

## August

#### 0810-Reat-文档

- 错误边界

  > React 16 引入了一个新的概念 —— 错误边界。

  - 如何做

    - 使用 static getDerivedStateFromError() 渲染备用 UI
    - 使用 componentDidCatch() 打印错误信息

  - 应该注意（无法捕获的情况）

    - 事件处理
    - 异步代码
    - 服务端渲染
    - 它自身抛出来的错误（并非它的子组件）

  - 为什么需要
    - 组件内的 JavaScript 错误会导致 React 的内部状态被破坏，并且在下一次渲染时 产生 可能无法追踪的 错误
    - React 并没有提供一种在组件中优雅处理这些错误的方式，也无法从错误中恢复

#### 0811-web-template 源码阅读

- myApp 项目内置浅封装框架
  - 类的标识
    - private 私有属性，外部无法往往
    - static 静态属性，内部可以直接使用，外部用【类.XXX】

#### 0813-blacklake-foundation commit 知识点

- package.json 文件字段理解
  > main、module、typings 的作用
  - main
  - module
  - typings
