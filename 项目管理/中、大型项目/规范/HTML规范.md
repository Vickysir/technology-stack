1. 标签

- 自闭合（self-closing）标签，无需闭合 ( 例如： img input br hr 等 )；
- 可选的闭合标签（closing tag），需闭合 ( 例如：</li> 或 </body> )；
- 尽量减少标签数量；

2. Class 与 ID

- class 应以功能或内容命名，不以表现形式命名；
- class 与 id 单词字母小写，多个单词组成时，采用中划线-分隔；
- 使用唯一的 id 作为 Javascript hook, 同时避免创建无样式信息的 class；

```html
<!-- Not recommended -->
<div class="item-hook left contentWrapper"></div>

<!-- Recommended -->
<div id="item-hook" class="sidebar content-wrapper"></div>
```

3. 属性顺序 HTML 属性应该按照特定的顺序出现以保证易读性。

- id
- class
- name
- data-xxx
- src, for, type, href
- title, alt
- aria-xxx, role

```html
<a id="..." class="..." data-modal="toggle" href="###"></a>

<input class="form-control" type="text" />

<img src="..." alt="..." />
```

4. 嵌套
   <a>不允许嵌套 <div> 这种约束属于语义嵌套约束，与之区别的约束还有严格嵌套约束，比如<a>不允许嵌套 <a>。
   严格嵌套约束在所有的浏览器下都不被允许；而语义嵌套约束，浏览器大多会容错处理，生成的文档树可能相互不太一样。

   > 语义嵌套约束:

- <li>用于<ul>或 <ol>下；
- <dd>, <dt>用于<dl>下；
- <thead>,<tbody>, <tfoot>, <tr>, <td> 用于<table> 下；

  > 严格嵌套约束:

- inline-Level 元素，仅可以包含文本或其它 inline-Level 元素;
- <a>里不可以嵌套交互式元素<a>、<button>、<select>等;
- <p>里不可以嵌套块级元素<div>、<h1>~<h6>、<p>、<ul>/<ol>/<li>、<dl>/<dt>/<dd>、<form>等。
- 布尔值属性 HTML5 规范中 disabled、checked、selected 等属性不用设置值。

```html
<input type="text" disabled />

<input type="checkbox" value="1" checked />

<select>
  <option value="1" selected>1</option>
</select>
```

5. 样式表、脚本加载
   css 样式表在 head 标签内引用，js 脚本引用在 body 结束标签之前引用
