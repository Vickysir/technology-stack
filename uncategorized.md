<!--
 * @Author: your name
 * @Date: 2021-02-06 15:34:39
 * @LastEditTime: 2021-04-09 13:38:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/uncategorized.md
-->

### CJS、AMD、CMD、UMD ES Modules 规范

#### CommonJS (CJS)

- Node.js 采用的模块规范
- 同步加载模块
- 使用 `require()` 引入模块，`module.exports` 导出模块
- 主要用于服务器端

#### AMD (Asynchronous Module Definition)

- 异步加载模块
- RequireJS 实现了 AMD 规范
- 使用 `define()` 定义模块，`require()` 加载模块
- 适用于浏览器端

#### CMD (Common Module Definition)

- SeaJS 推广的规范
- 异步加载模块
- 与 AMD 类似，但推崇依赖就近
- 使用 `define()` 定义模块，`require` 加载模块

#### UMD (Universal Module Definition)

- 通用模块定义
- 兼容 AMD、CommonJS 和全局变量
- 可同时在浏览器和服务器端使用
- 常用于需要跨平台的库

#### ES Modules (ESM)

- JavaScript 官方标准模块系统
- 静态导入导出，支持动态导入
- 编译时就确定模块的依赖关系
- 浏览器原生支持，Node.js 也支持

```js
// 导出
export const name = 'value'
export default function() {}
// 导入
import { name } from './module.js'
import defaultExport from './module.js'
import as module from './module.js'
// 动态导入
import('./module.js').then(module => {
// 使用模块
})
```
