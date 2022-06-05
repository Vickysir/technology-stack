<!--
 * @Author: your name
 * @Date: 2021-04-01 15:35:41
 * @LastEditTime: 2022-06-05 18:18:31
 * @LastEditors: Vicky Yu
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/IDE/VScode.md
-->

### 📘📘📘 快捷键

#### 打开设置

使用 `ctrl + ，`

#### 搜索功能

- `command + F`：当前文件中搜索；
- `command + shift + F`：文件夹中搜索；

#### 编辑功能

- `command + 单击`： 跳转至方法定义；
- `command + d`: 批量更改变量
- `command + p`：打开最近的文件；
- `alt + 单击`：在单击出插入光标；
- `command + alt + [`：折叠当前代码块；
- `command + alt + ]`：展开当前代码块；
- `command + k + 0`：折叠/打开所有代码块，查看代码时，容易理清逻辑；
- `command + c`：复制当前行；
- `command + x`：剪切当前行；
- `command + del`：删除当前行；
- `alt + shift + f`：格式化代码；
- `alt + up/down`: 移动选中的行;

#### 折叠 or 展开

可以先使用 `ctrl + shift + p` 搜索 Folder 命令

- 全部折叠 `ctrl + K ctrl + 0`
- 全部展开 `ctrl + K ctrl + j`

- 当前部分折叠 `ctrl + K ctrl + [`
- 当前部分展开 `ctrl + K ctrl + ]`

#### 转化大小写

可以先使用 `ctrl + shift + p` 搜索 相关 命令

- TransformToUppercase 全部大写
- TransformToLowercase 全部小写

### 📘📘📘 常用插件

1. Eslint：根据 eslint 配置，校验代码风格；
2. Git Blame：审查代码或者查看代码变动时，能清楚地定位到对应的开发者；
3. Prettier: 与 Eslint 系统工作，保证代码正确地缩进、换行；
4. Code Spell Checker:检查拼写错误，避免变量命名、方法命名出现拼写错误；
5. GitLens：快速查看 git 历史
6. Todo Tree：目录中的 TODO 一览无遗；TODO Highlight：文件中的 TODO 高亮易见
7. Thunder Client:轻量级的 REST API 客户端，与 Postman 类似；
8. Code Runner:执行选中代码块，方便简单测试代码；
9. ES7+ React/Redux/React-Native snippets
10. live server
11. Chrome debugger

#### 其他

- 韭菜盒子 : 看股票基金
- 小霸王: 小游戏

### 📘📘📘 建议配置

1. 自动导入
   打开自动导入功能

```
"javascript.suggest.autoImports": true
```

2. 自动修改导入
   在文件重命名或者移动时，自动修改导入

```
"javascript.updateImportsOnFileMove.enabled": "always"
```

3. 开启彩虹括号

```
"editor.bracketPairColorization.enabled": true
```

### 📘📘📘 同步配置

> 如何在新电脑上快速同步 vscode 插件和配置

```
vscode_sync 的token: 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
GitHub Gist ID: 4842bfa09545f3cd3619fe657a0d53b3
```
