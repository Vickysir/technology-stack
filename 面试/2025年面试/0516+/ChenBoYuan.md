## 一、面试题

1. 学术经历————讲授 html、css、js 课程，课程内容有什么？

   - 盒模型的分类及区别
   - css 选择器权重计算方式
   - 响应式设计应该从哪些方面入手？
   - 有哪些方式（CSS）可以隐藏页面元素,区别是什么？
   - 什么是重绘、什么是回流？上面哪些操作会触发重绘？哪些会回流？
     - visibility、opacity、overflow 只触发重绘，布局没有变化
     - display、position、位置、布局、尺寸变化会触发回流

2. React 部分
   - 在项目中 useEffect/useState 是如何使用的
   - 常见的 react hook 使用
   - 自己封了什么自定义组件？使用自定义 hook 有哪些规则？
   - 用了 localStorage，数据持久化的方案还有哪些？在 react 中，组件之间的数据沟通方式有哪些？
   - 请简要介绍一下 react 的原理，比如虚拟 Dom、diff 算法、React Fiber 谈谈你的理解
   - 工程化的了解，webpack 等打包工具的基本配置

## 二、笔试题

1. js 的事件循环

```js
function fn() {
  console.log("start");

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log("promise1");
    })
    .then(() => {
      console.log("promise2");
    });

  setTimeout(() => {
    console.log("setTimeout 100");
  }, 100);

  console.log("end");
}

// start
// end
// promise1
// promise2
// setTimeout 0
// setTimeout 100
```

```js
// 变种1 * ：async/await + Promise
async function fn1() {
  console.log("start");

  setTimeout(() => {
    console.log("setTimeout 0");
  }, 0);

  await Promise.resolve().then(() => {
    console.log("promise1");
  });

  console.log("await end");

  Promise.resolve().then(() => {
    console.log("promise2");
  });

  console.log("end");
}
// start
// promise1
// await end
// end
// promise2
// setTimeout 0
```

2. 算法————回文子串 （medium）

```

给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。

回文字符串 是正着读和倒过来读一样的字符串。

子字符串 是字符串中的由连续字符组成的一个序列。

示例 1：
输入：s = "abc"
输出：3
解释：三个回文子串: "a", "b", "c"

示例 2：
输入：s = "aaa"
输出：6
解释：6 个回文子串: "a", "a", "a", "aa", "aa", "aaa"

提示：

1 <= s.length <= 1000
s 由小写英文字母组成

```

【解题思路】

    - 中心扩展法：以每个字符（或字符间隙）为中心，向两边扩展，统计回文子串。时间复杂度 O(n²)，空间 O(1)。

    - 动态规划：用 dp[i][j] 表示 s[i...j] 是否为回文，状态转移方程是
    s[i] == s[j] 并且 (j - i < 2 或 dp[i+1][j-1] 为真)
    时间复杂度 O(n²)，空间 O(n²)。

2. 最长回文子串（扩展题）
