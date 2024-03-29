<!--
 * @Author: your name
 * @Date: 2021-03-26 10:47:05
 * @LastEditTime: 2021-03-26 10:52:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/Git/gitignore/index.md
-->
### gitignore忽略.DS_Store文件
1. 创建gitignore文件，写入.DS_Store和*/.DS_Store
```js
//创建gitignore隱藏文件 
touch .gitignore 

//编辑文件，加入指定文件
vim .gitignore 
```
2. 经常在其他文件夹下面也都会生成.DS_Store文件，所以我们需要全局ignore该文件 创建.gitignore_global步骤同一，然后修改它
```js
 .vi ~/.gitignore_global 

//在gitignore_global中写入：

.DS_Store 
*/.DS_Store 

```
3. 执行
```js
git config --global core.excludesfile ~/.gitignore_global
```

4. 若检查发现修改中仍然有.DS_Store文件，则可能原因是在早期的提交中就已将.DS_Store文件提交到repository了。如果一个文件已经被提交，那么就算这个文件已经被写到gitignore文件中，它的修改仍然会被追踪到。
所以我们需要手动将repository中的.DS_Store文件移除，可以使用以下命令移除：
```js
//移除当前文件夹下的.DS_Store文件
git rm --cached .DS_Store

//移除文件夹下的所有.DS_Store文件
find . -name .DS_Store -print0 | xargs -0 git rm --ignore-unmatch

```
然后最后再检查一下会发现已经搞定了😊

