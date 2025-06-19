- Vue3 + Pinia + Ant Design Vue + Vite

  - Vue3

    - vue 组件的生命周期？

      - created 和 mounted 最主要的区别是什么？
      - 哪个钩子可以访问到真实的 dom 元素？
        - mounted 之后都可以
      - 在 vue3 中的 setup()函数执行的时机呢？处于哪个生命周期？setup 里为什么不能使用 `this` ?
        - setup 执行时机是在组件实例创建之前, beforeCreate + created

    - 响应式

      - 在 vue3 中 ref 和 reactive 的区别
        - `.value`的作用是什么？为什么基本类型要用 ref 包裹？
          - ref 内部是如何实现的？
        - reactive 重新分配对象时，为什么会失去响应式？如何处理？
        - reactive 创建的响应式对象，vue 内部是如何处理嵌套对象的？
      - 在使用 watch 监视数据的变化，有哪些参数？
        - 为什么推荐监视数据改为一个`getter`函数， 什么是`getter`函数？
        - watch 与 watchEffect 的区别
        - 计算属性和侦听器有什么区别？何时使用计算属性，何时使用侦听器？
      - 标签的 ref 属性，可以用它干什么？
        - 为什么不直接给标签一个 id，通过 document.getElementByid 去获取 dom 元素（局部隔离）
        - 那么样式隔离是如何处理的呢？（style 加一个 scope 属性）
        - 那如果给组件身上加一个 ref，这个 ref 拿到的是什么？
          - 怎么能拿到组件的里的数据（需要在组件内部使用 defineExpose 出去）

    - 常见的组件通信的方式
      - 父子组件
        - 父子
        - 子父
        - 双向数据绑定
      - 跨组件通信
        - 依赖注入(provide/inject)
        - 事件总线
        - 状态管理
      - 其他
        - ref 引用
    - 选择通信方式的原则

      - 父子组件优先使用 props/emit
      - 跨多层组件优先考虑 provide/inject
      - 全局状态管理优先使用 Pinia
      - 避免过度使用事件总线,可能导致数据流向难以追踪

    - Pinia
      - 详细说一下 Pinia，如何定义一个 store 的基本结构
        - createPinia 创建 store
        - 如何修改数据（store 是选项式写法的话）
          - 直接修改
          - $patch 批量修改
          - actions 修改数据
        - 如何订阅 state 和 action 的变化
        - 关于 Pinia 的插件系统有什么用？可以举例一个插件的用途吗？

  - 从 0 到 1 搭建一个 Vue3 前端项目需要怎么做？如何设计？

    - 使用 TypeScript
    - Pinia 状态管理
    - Vue Router 路由
    - Vite 配置

      - 配置别名
      - 配置环境变量
      - 配置代理
        - 如何与环境变量，可以直接用脚本一键切换 feat、test、pro 环境
      - 其他配置构建选项

    - 集成常用工具库
      - HTTP 请求库 Axios
      - UI 组件库 Ant Design Vue
      - 工具库 lodash 等
    - 配置代码规范
      - ESLint 配置
      - 配置 Git Hooks（使用 husky）
    - 配置状态管理
    - 封装公共组件
    - 配置全局样式

    - 基础功能搭建
      - 封装 axios 请求
        - 如何在请求实例中统一处理取消逻辑（存在重复请求，则取消已发的请求）
          - CancelToken 或者 AbortController
        - 如果在业务需求中需要进行一连串的接口请求，如何用 Promise 实现一个超时中断
        - 如何手写一个 Promise.race
      - 配置路由守卫
        - 如何设置全局路由守卫 router.beforeEach
        - 如何设置独享守卫 beforeEnter
        - 如何设置组件内守卫
          - beforeRouteEnter 进入路由前需要预先加载必要数据，beforeRouteLeave 路由离开前如表单未保存时提示用户
        - 前两种执行顺序是怎样的？组件内守卫呢？

  ```
  src/
   ├── assets/        # 静态资源
   ├── components/    # 公共组件
   ├── views/         # 页面组件
   ├── router/        # 路由配置
   ├── stores/        # 状态管理
   ├── utils/         # 工具函数
   ├── api/           # API接口
   ├── styles/        # 全局样式
   └── App.vue        # 根组件
  ```

- 项目需要兼容移动端，响应式设计应该从哪些方面入手

- 主题定制
- 系统多语言

二、笔试题

1. 最长回文子序列 Medium (67.31%)
