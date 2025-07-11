### 项目经验

- 过往的负责前端项目或者模块，都是什么类型？具体功能讲一下？
- 过往项目中有什么亮点？遇到的最大的困难时什么如何解决的？（调试代码）
- 技术栈

### Vue3

- 响应式原理

  - 指令
    - 常见指令
      - 条件渲染指令 v-if、v-show
      - 列表渲染指令 v-for
      - 属性绑定指令 v-bind （单向）
      - 事件绑定指令 v-on
      - 双向数据绑定指令 v-model

  - 生命周期
    - setup 里为什么不能使用 `this` ?
      - 在 vue3 中的 setup()函数执行的时机呢？处于哪个生命周期？
        - setup 执行时机是在组件实例创建之前, beforeCreate + created
      - 选项式 API 执行时处于哪个生命周期？
        - beforeCreate 和 created 之间

    - 哪个钩子可以访问到真实的 dom 元素？
      - mounted 之后都可以

    - 当通过 v-show，v-if 去控制一个组件显示隐藏时，会触发什么生命周期
      - v-if 是直接删除dom，触发卸载
      - v-show 只是隐藏起来了

    - 父子组件的生命周期
      - 先渲染子的周期
      - 最后解析App.vue组件里的生命周期


- 组件设计

  - composition API 和 Options API 相比，优势是什么？它是如何更好的解决逻辑复用和代码组织的问题？

    - setup 定义数据、方法，函数式编程
    - 数据和方法要分别在 data、mathod 中定义
    - setup 里的数据还需处理响应式的问题，data 定义时是自带响应式
    - 自定义hooks，将data和mathod封装在一个ts或js文件里然后通过export导出，可以直接在组件中使用，这样发挥 composition API 的优势

  - 如何声明响应式状态
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

  - 和计算属性什么区别
  - 为什么我们不直接使用我们定义的方法函数，而是要使用 computed
    - 缓存
  - 如何能修改 computed 的计算属性呢
    - `get()`，`set()`
  - toRefs/toRef 是用来解构 reactive 对象的，使其解构出来的值夜具备响应式能力
    - toRef用来解构单个对象的某个属性，toRefs解构整个对象
    - Pinia 提供的 storeToRef 有什么区别

  - 如果需要直接访问底层 DOM 元素怎么办？
    - 标签的 ref 属性
    - 为什么不直接给标签一个 id，通过 document.getElementByid 去获取 dom 元素（局部隔离）
    - 那么样式隔离是如何处理的呢？（style 加一个 scope 属性）
    - 那如果给组件身上加一个 ref，这个 ref 拿到的是什么？
      - 怎么能拿到组件的里的数据（需要在组件内部使用 defineExpose 出去）
  - 什么是插槽？ slot
    - 组件能够接收任意类型的 JavaScript 值作为 props，但组件要如何接收模板内容呢？
    - 插槽内容可以是任意合法的模板内容，不局限于文本。例如我们可以传入多个元素，甚至是组件
    - 使用插槽使组件更加灵活和具有可复用性
    - 渲染作用域
      - 插槽内容可以访问到父组件的数据作用域
      - 插槽内容无法访问子组件的数据

- 组件通信

  - 父子组件
    - 父子 props
    - 子父 1.回调函数（defineProps）；2.给子组件绑定自定义事件（defineEmit）
  - 跨组件通信
    - 依赖注入(provide/inject)
    - 事件总线
    - 状态管理
    - mitt 订阅触发，有点像自定义事件
  - 双向数据绑定
   - 如何自己实现一个 v-modal 的 input组件呢
      - defineProps 接收数据，实现数据呈现到页面，自定义事件defineEmit实现页面上修改数据
      - vue2 `:value`,`@input 事件`
      - vue3 `:moudleValue`,`@update:moudleValue`
      -`v-moudle:pwd`
  - 其他

    - ref 引用

  - 选择通信方式的原则

    - 父子组件优先使用 props/$emit
    - 跨多层组件优先考虑 provide/inject
    - 全局状态管理优先使用 Pinia
    - 避免过度使用事件总线,可能导致数据流向难以追踪

  - Pinia
    - 详细说一下 Pinia，如何定义一个 store 的基本结构
      - createPinia 创建 store
      - 如何存储、读取数据
      - 如何修改数据（store 是选项式写法的话）
        - 直接修改
        - $patch 批量修改
        - actions 修改数据
      - 如何订阅 state 和 action 的变化
      - 关于 Pinia 的插件系统有什么用？可以举例一个插件的用途吗？

- 对路由的理解
  - 导航区（RouterLink：to/activeClass）、展示区（RouterView）
  - 路由器
  - 路由规则
  - 形成一个个组件

  - 路由器的工作模式
    - history路由
    - hash路由，路径带`#` 
  - 嵌套路由
  - 路由传参
    - query
      - 使用useRouter接收参数
    - params
      - 使用useRouter接收参数
      - 路由path里增加占位 `/:id/`
      - 参数必要性,可以使用问好 `/:id/:content?`
      - 参数不能传数组
    - 路由的props配置
        - 使用defineProps接收参数
        - 将路由的params作为props传给组件
          `props:true`
        - 也可以通过一个函数返回路由的 query
        - `props:(router)=>router.qurry`
  - 路由replace属性
    - RouterLink 上有一个replace，用于替换当前路由不能前进不能后退
    - push 追加历史记录（默认）
  - 编程式路由导航（如何脱离RouterLink实现路由跳转）
    - useRouter
    -`router.push()`
    - `:to="{}"` to的对象传参
    - 使用场景：只有在某些情况下执行跳转，如8点开始秒杀

  - 路由重定向
    `redirect` 指定重定向要跳转的组件
  
### 从 0 到 1 搭建项目

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

### 系统方案

- 如何解决用户疯狂点击提交按钮？

  - 什么是防抖？什么是节流？
  - 假如防 1s，但是后端返回的又比较慢，用户在这个期间又点击了很多次？防抖是不是没有用了应该怎么办？
  - 如果项目中有很多地方都需要这么处理怎么办？

- 主题定制
- 系统多语言方案

  - 方案本身是什么？
  - 业务方如何接入？
  - 后续迭代过程中，新需求产生的需要翻译的地方，如何优化这个 SOP
