```
MAIN-3/                    # 项目根目录
├── .fleet/                # Fleet IDE 配置
├── .husky/                # Git hooks 配置
├── .idea/                 # IntelliJ IDEA 配置
├── .vscode/               # VS Code 配置
├── build/                 # 构建输出目录
├── i18n/                  # 国际化资源
├── node_modules/          # 依赖包
├── public/                # 静态资源
├── scripts/               # 构建脚本
├── src/                   # 源代码
│   ├── components/        # 共享组件
│   └── page/              # 业务模块
└── 各种配置文件             # 项目配置文件
```

各种配置文件

```
构建和开发配置:
    vite.config.ts - Vite 配置
    tsconfig.json - TypeScript 配置
    commitlint.config.js - 提交信息规范配置
    build.sh - 构建脚本
代码质量控制:
    .eslintrc - ESLint 配置
    .prettierrc - Prettier 配置
    .babelrc - Babel 配置
包管理:
    package.json - 项目依赖和脚本
    yarn.lock - Yarn 锁定文件
```

```
核心框架:
    "react": "^17.0.2"
    "react-router-dom": "^5.2.0"
    "antd": "4.24.14",

    "react-redux": "^7.2.4",

    /** 对 create-react-app 的默认配置进行自定义 */
    react-app-rewired      2.1.8
    customize-cra          1.0.0

    Webpack 作为构建工具
    Vite
    RSbuild

开发工具:
    TypeScript             4.2.4
    ESLint + Prettier
    Husky 用于 Git hooks
    Commitlint 用于提交信息规范

构建和部署:
    Webpack      用于构建
    build.sh
    notice.sh
    nginx.conf   Nginx 配置
    gitlab.ci    流水线

路由：
    1.路由守卫
    2.收藏
    3.菜单分级（一、二、三级），前、后台管理菜单
    4.动态菜单，自定义页面，自定义对象（列表，新建、编辑、详情、复制、导入、日志）

请求：
    1.
国际化：
    1.

start：

    1.全局的智能提示的枚举字典 lookup
    2.根据 YApi 或 Swagger 的接口定义生成 TypeScript 或 JavaScript 的接口类型及其请求函数代码 yapi-to-typescript
    3.

```
