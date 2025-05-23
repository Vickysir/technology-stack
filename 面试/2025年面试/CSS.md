# CSS 高频面试题

## 盒模型

盒模型包括 content（内容）、padding（内边距）、border（边框）、margin（外边距）。标准盒模型（content-box）和 IE 盒模型（border-box）区别在于宽高是否包含 padding 和 border。

## 盒模型类型

总结：
content-box：只包含内容，不包含 padding 和 border。
border-box：包含内容、padding 和 border。

```css
box-sizing: content-box; /* 标准盒模型 */
box-sizing: border-box; /* IE盒模型/现代推荐写法 */
```

## 选择器权重计算方式

权重从高到低：!important > 行内样式 > ID 选择器 > 类/伪类/属性选择器 > 标签选择器 > 通配符。权重用四位数表示：a,b,c,d。

## 脱离文档流的几种方式

浮动（float）
绝对定位（position: absolute）
固定定位（position: fixed）

## 清除浮动

常用方法：

- 父元素添加 `overflow: hidden;`，这种方法简单有效，适用于大多数场景，但如果子元素有超出父元素的内容会被裁剪。
- （推荐）使用伪元素 `::after { content: ""; display: table; clear: both; }`
- 添加空标签清除浮动（不推荐）,在浮动元素后面添加一个空的块级元素，并设置 clear: both;

```html
<div class="parent">
  <div class="float-child"></div>
  <div style="clear: both;"></div>
</div>
```

- 父元素设置 `clearfix` 类

```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.clearfix {
  zoom: 1; /* 兼容IE6/7 */
}
```

## BFC（块级格式化上下文）

BFC 是块级格式化上下文，是页面上的一块独立渲染区域。常用于清除浮动、避免外边距重叠等。

## 垂直居中的方案

- 行高法：`line-height` 等于高度
- flex 布局：`align-items: center; justify-content: center;`
- grid 布局：`place-items: center;`
- 绝对定位+transform：`top: 50%; left: 50%; transform: translate(-50%, -50%);`

## CSS3 的新特性

- 新增选择器
- 边框圆角（border-radius）
- 阴影（box-shadow, text-shadow）
- 过渡与动画（transition, animation）
- 弹性盒子（flex）
- 媒体查询

## CSS 动画和过渡

- 过渡（transition）：属性值在一段时间内平滑变化
- 动画（animation）：可定义关键帧，实现复杂动画

## 说说 em/px/rem/vh/vw 区别

- px：像素，绝对单位
- em：相对父元素字体大小
- rem：相对根元素字体大小
- vh/vw：相对视口高度/宽度的百分比

## flex 布局

弹性盒子布局，父元素设置`display: flex;`，可灵活排列子元素。常用属性：`flex-direction`、`justify-content`、`align-items`等。

## 两栏布局：左边定宽，右边自适应方案

- float + margin
- flex 布局：

```css
display: flex;
.left {
  width: 200px;
}
.right {
  flex: 1;
}
```

## 有哪些方式（CSS）可以隐藏页面元素

- `display: none;`
- `visibility: hidden;`
- `opacity: 0;`
- `position: absolute; left: -9999px;`
- `width: 0; height: 0; overflow: hidden;`

1. display: none;
   区别：元素彻底从文档流中移除，不占据空间，页面上完全不可见。
   优点：彻底隐藏，布局不会被影响，适合需要动态添加/移除元素的场景。
   缺点：元素及其子元素都无法被访问（如无法获取宽高、无法聚焦、无法被 assistive technology 读取）。
2. visibility: hidden;
   区别：元素不可见，但仍然占据原有空间，布局不会变化。
   优点：保留布局结构，适合需要“占位隐藏”的场景。
   缺点：虽然不可见，但仍可被 assistive technology 读取，且仍可响应事件（如 tab 聚焦）。
3. opacity: 0;
   区别：元素完全透明，不可见，但仍占据空间，仍可响应事件。
   优点：可用于动画渐隐渐现，保留布局和事件响应。
   缺点：虽然不可见，但仍可被点击、聚焦等，可能影响交互体验。
4. position: absolute; left: -9999px;
   区别：元素定位到视口外部，用户不可见，不占据原有空间。
   优点：常用于无障碍场景（如仅屏幕阅读器可见），元素仍可被 assistive technology 读取。
   缺点：如果内容过多，可能导致页面出现滚动条。
5. width: 0; height: 0; overflow: hidden;
   区别：元素尺寸为 0，内容被裁剪，不可见，不占据空间。
   优点：适合隐藏多余内容或图片懒加载等场景。
   缺点：内容完全不可见，且不易维护。
   总结：
   需要彻底隐藏且不占空间：display: none;
   需要隐藏但保留空间：visibility: hidden;
   需要动画或保留事件响应：opacity: 0;
   需要仅屏幕阅读器可见：position: absolute; left: -9999px;
   需要裁剪内容：width: 0; height: 0; overflow: hidden;
   根据实际需求选择合适的隐藏方式。

## 什么是重绘什么是回流？

回流：影响布局，代价较高，通常会引发重绘。
重绘：只影响外观，不影响布局，代价较低。

举例：改变元素的 color、background-color、visibility、outline 等属性，只会触发重绘。
举例：添加/删除元素、改变元素的尺寸、边距、内边距、边框、显示/隐藏、内容变化等，都会触发回流。回流通常会引发一次或多次重绘。

减少重绘和回流的核心思想是：减少 DOM 操作次数、合并操作、避免影响范围过大、优先使用不会引起回流的 CSS 属性。这样可以显著提升页面性能和用户体验。

## 如果要做优化，CSS 提高性能的方法有哪些？

- 合理使用选择器，避免层级过深
- 减少重绘和回流
- 合理使用合成层
- 压缩 CSS 文件，合并资源
- 使用 CSS 预处理器

## 画一条 0.5px 的线

在高分屏（如 Retina 屏）上，浏览器可以渲染出更细的线条,0.5px 能生效。但在普通屏幕上，0.5px 实际会被渲染为 1px

```css
border-bottom: 0.5px solid #000;
```

1. 使用 transform 缩放

```css
.line {
  height: 1px;
  background: #000;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}
```

2. 使用伪元素 + 缩放

```css
.line {
  position: relative;
}
.line::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #000;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}
```

3. 使用 SVG 或 background-image
   用 SVG 画一条线，或者用渐变背景模拟细线，适合更复杂的场景。

## 如何画一个三角形

```css
width: 0;
height: 0;
border-left: 10px solid transparent;
border-right: 10px solid transparent;
border-bottom: 10px solid #000;
```

width: 0; height: 0;
让元素本身没有宽高，所有可见部分都由边框撑开。
border-left 和 border-right 设置为透明且等宽，形成三角形的两侧。
border-bottom 设置为有色（如黑色），形成三角形的底边和填充色。
没有设置 border-top，所以上方是空的。
这种方法无需图片和 SVG，兼容性极好，性能高。
