### 发展过程
<br/>

one：

    - 静态文件（npm run build 构建项目） =》
    - 连接远程服务器，上传，解压缩 =》
    - 配置 nginx =》
    - 发布

<br/>

two：

    - 执行代码扫描eslint =》
    - 执行单元测试 =》
    - 提交git仓库 =》
    - 连接远程服务器，拉取代码，npm run build 执行 构建项目

<br/>

CI/CD:

    - 监听git代码仓库的变更 =》
    - 自动对代码进行测试和构建，反馈运行结果 =》
    - 将集成后的代码部署到相应的环境中

<br/>
<br/>


### 各大平台

<br/>

gitlab：

    - 编写脚本配置文件
    - 在服务器安装runner
    - 根据token把脚本和runner对应起来

github：

    - 在仓库，actions里编写workflow文件
    - 配置Secrets