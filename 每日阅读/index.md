# 目录

增加奇怪的知识点

<br>

## 2021 年

- [7 月](#7月)<br>
  - [9 日 - Reat 官方文档](#9日)<br>
    <br>

### 7 月

#### 9 日 - Reat 官方文档

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
