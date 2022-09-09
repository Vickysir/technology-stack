[开始你的版本控制](http://note.youdao.com/s/GKxmMBDV)

### git config 配置

- 仓库级别 local 【优先级最高】
- 用户级别 global【优先级次之】
- 系统级别 system【优先级最低】

```
git config --local -l 查看仓库配置
git config --global -l 查看用户配置
git config --system -l 查看系统配置

git config -l 查看所有的配置信息
```

设置账户、邮箱

```
git config --global user.name 'XXX'
git config --global user.email 'XXX@xx.com'
```
