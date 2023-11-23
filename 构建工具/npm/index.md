
### npm 包发布
```
npm login
npm publish

```
### npm 包 使用（安装）
```
 npm i XXX
```


### npm包更新
```
npm version patch
npm publish

```

### 升级指定包
```
yarn upgrade XXX
```


### npm cnpm yarn pnpm 的故事

1. cnpm
npm是node官方的包管理器，cnpm是个中国版的npm

命令 `npm install -g cnpm --registry=https://registry.npm.taobao.org`

2. npm的发展


|  node 版本   | npm 版本   |
|  ---------  | --------  |
| node v8     | npm v6    |
| node        | npm v5    |
| node v5 v6  | npm v3    |
| node v4     | npm v2    |


npm 是围绕着语义版本控制的思想而设计的
> 主版本号.次版本号.补丁版本号

    主版本号： 当API发生改变，并与之前的版本不兼容的时候
    次版本号： 当增加了功能，但是向后兼容的时候
    补丁版本号： 当做了向后兼容的缺陷修复的时候

    package.json某依赖的版本号如下：

    "5.0.3",   // 安装指定的5.0.3版本
    "~5.0.3",  // 安装5.0.X中最新的版本
    "^5.0.3"   // 安装5.X.X中最新的版本
    



- 上古时代（v2之前）的npm的安装策略并不是扁平化的，而是一层一层嵌套安装的，安装逻辑也是一个包一个包的装，速度慢。
- npm v3的版本将目录层级从嵌套变到扁平化，但如果出现同一个包不同版本的依赖，还是嵌套模式安装
- npm v5 引入 package.lock.json，默认自动添加 dependencies，无需手动加—S，提升了安装速度比yarn还是差点
- npm6 的出现加入了缓存，并且又进一步提升了速度，可以说直逼 yarn

3. yarn
解决npm早起出现的问题

- npm 的嵌套的依赖关系
- npm 通过语义化的版本号安装应用，你可以限制你安装模块的版本号，但是你无法限制你安装模块依赖的模块的版本号
- npm 按照顺序一个一个安装的安装方式

4. pnpm
 - 节省磁盘空间
 - 提升安装速度
 - symlinks解决幽灵依赖

[pnpm + lerna](https://mp.weixin.qq.com/s/pe3UZz_tWudIlAnWiA5yYg)