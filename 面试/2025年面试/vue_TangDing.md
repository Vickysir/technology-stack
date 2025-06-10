- Vue3 + Pinia + Ant Design Vue + Vite
    - Vue3
    - 从0到1搭建一个Vue3前端项目需要怎么做？如何设计？
        - 使用TypeScript
        - Vue Router 路由
        - Pinia 状态管理
            - 为什么要使用状态管理？
            - 如何使用Pinia存储、读取、修改数据（store是选项式写法的话）
                - 直接修改
                - $patch 批量修改
                - actions 修改数据
  
        - Vite 配置
            - 配置别名
            - 配置环境变量
            - 配置代理
                - 如何与环境变量，可以直接用脚本一键切换feat、test、pro环境
            - 其他配置构建选项    

        - 集成常用工具库
            - HTTP请求库 Axios
                - 如何在请求实例中统一处理取消逻辑（存在重复请求，则取消已发的请求）
                    - CancelToken 或者 AbortController
                - 如果在业务需求中需要进行一连串的接口请求，如何用Promise实现一个超时中断
                - 如何自己实现一个Promise.race

            - UI组件库  Ant Design Vue
            - 工具库 lodash等
        - 配置代码规范
            - ESLint配置
            - 配置 Git Hooks（使用husky）

        - 基础功能搭建
            - 封装axios请求
            - 配置路由守卫
                - 如何设置全局路由守卫
                - 如果在进入路由前需要预先加载必要数据，路由离开前如表单未保存时提示用户，应该如何设置组件内守卫

            - 配置状态管理
            - 封装公共组件
            - 配置全局样式
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
    
