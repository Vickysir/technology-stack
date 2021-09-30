<!--
 * @Author: your name
 * @Date: 2021-04-08 09:34:29
 * @LastEditTime: 2021-04-08 10:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/中、大型项目/index.md
-->
### 涉及技术点
- 主题切换
- 国际化
- 组件化
- 方法库

### 监控运维
- 自动报告程序中的错误和异常 如：sentry 
- [性能优化关键指标](https://mp.weixin.qq.com/s/4-Lnz59EH4tQpP1YnyVvfQ)

### 系统
- [微前端实践](https://mp.weixin.qq.com/s/GvXuKsp2OAmpv_isH2836A)

### gitflow
先来一张分支模型图
<img src="../images/gitflow.png" />

#### 简单概括

> master 生产主分支,发布到生产环境使用这个分支,由hotfix或者release分支合并过来，不直接提交代码。

> develop 主开发分支 , 基于master分支克隆，由feature分支合并过来，一般不直接提交代码。

> feature 功能开发分支 , 基于develop分支克隆 , 主要用于新需求新功能的开发，同时存在多个。

> release 预发布分支 , feature分支合并到develop之后 , 从develop分支克隆，测试完成后合并到master并打上版本号，同时也合并到develop。

> hotfix 补丁分支 , 基于master分支克隆 , 主要用于对线上的版本进行BUG修复,完成后合并到master分支和develop分支,并打上版本号。

[git flow详细](https://juejin.cn/post/6844903997589946382)

### git提交规范
```
feat: 新增产品功能
fix: 修复 bug
docs: 文档的变更
style: 不改变代码功能的变动(如删除空格、格式化、去掉末尾分号等)
refactor: 重构代码。不包括 bug 修复、功能新增
perf: 性能优化
test: 添加、修改测试用例
build: 构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置
ci: 修改了 CI 配置、脚本
chore: 对构建过程或辅助工具和库的更改,不影响源文件、测试用例的其他操作'
revert: 回滚 commit
```