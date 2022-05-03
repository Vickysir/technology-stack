1. 命名

- 类名使用小写字母，以中划线分隔
- id 采用驼峰式命名
- scss 中的变量、函数、混合、placeholder 采用驼峰式命名

ID 和 class 的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称

2. 选择器
   a. css 选择器中避免使用标签名
   从结构、表现、行为分离的原则来看，应该尽量避免 css 中出现 HTML 标签，并且在 css 选择器中出现标签名会存在潜在的问题。

   b. 应该总是考虑直接子选择器
   很多前端开发人员写选择器链的时候不使用子选择器,而是使用后代选择器，有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能，需要匹配到 DOM 末端的选择器。因此，你应该总是考虑直接子选择器。
   不推荐：

   ```css
   .content .title {
     font-size: 2rem;
   }
   ```

   推荐：

   ```css
   .content > .title {
     font-size: 2rem;
   }
   ```

3. 每个选择器及属性独占一行

4. 尽量使用缩写属性

   ```css
   div {
     border-top-style: none;
     font-family: palatino, georgia, serif;
     font-size: 100%;
     line-height: 1.6;
     padding-bottom: 2em;
     padding-left: 1em;
     padding-right: 1em;
     padding-top: 0;
   }
   ```

   推荐：

   ```css
   div {
     border-top: 0;
     font: 100%/1.6 palatino, georgia, serif;
     padding: 0 1em 2em;
   }
   ```

5. 省略 0 后面的单位

   ```css
   div {
     padding-bottom: 0px;
     margin: 0em;
   }
   ```

   推荐：

   ```css
   div {
     padding-bottom: 0;
     margin: 0;
   }
   ```

6. 避免使用 ID 选择器及全局标签选择器防止污染全局样式

### LESS SCSS 规范

1. 代码组织
   将公共 less 文件放置在 style / less / common 文件夹，文件内部按以下顺序组织
   1、@import;
   2、变量声明;
   3、样式声明;

2. 避免嵌套层级过多
   将嵌套深度限制在 3 级。对于超过 4 级的嵌套，给予重新评估。这可以避免出现过于详实的 CSS 选择器。
   避免大量的嵌套规则。当可读性受到影响时，将之打断。推荐避免出现多于 20 行的嵌套规则出现
