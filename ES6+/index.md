### promise 异步编程的异常捕获？

### 异步编程是否可以取消？

### [ECMAScript 攻略](https://www.processon.com/view/link/60a320615653bb3d82dc8e0d#map)

### ES2020

#### 空值合并运算符

1. 空值合并运算符

`??`提供了一种简短的语法，用来获取列表中第一个“已定义”的变量（译注：即值不是 null 或 undefined 的变量）。通常用来设置默认值

```
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个不是 null/undefined 的值
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

与`||`的区别：

- `??` 当左侧的操作数为 null 或者 undefined 时，返回右侧操作数
- `||` 当左侧的操作数为假值时（如 `""`和`0`时 ），返回右侧操作数
