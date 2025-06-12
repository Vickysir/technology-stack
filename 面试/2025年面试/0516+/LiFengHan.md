## 面试题

- 外包经验包括？音乐数据平台项目和学期总结报告平台这两个吗？

- react、路由、redux
- ES6 常用哪些， 可选链操作符知道吗？空值合并运算符`??`知道吗？与运算符`||`的区别
- flex 布局常用属性，两栏布局：左边定宽，右边自适应如何实现
- css-module、sass 区别
- 谈谈你在使用 Framer Motion 和 Recharts 实现动态图表时遇到的挑战和解决方案。
- antd 组件
- webpack、vite 配置
- 项目中提到使用 Docker 与 GitHub Actions 实现 CI/CD 流水线，能详细说明这个流程吗？（Docker Compose 配置）
- 描述一下你是如何使用 Git 进行版本控制，以及团队协作的工作流程。

## 笔试题

1. **性能优化**

   ```jsx
   // 以下代码存在性能问题，请进行优化并解释原因
   function ExpensiveComponent({ data }) {
     const [count, setCount] = useState(0);

     const processedData = data.map((item) => {
       return { ...item, processed: complexCalculation(item) };
     });

     return (
       <div>
         <button onClick={() => setCount(count + 1)}>Count: {count}</button>
         <ul>
           {processedData.map((item) => (
             <li key={item.id}>{item.processed}</li>
           ))}
         </ul>
       </div>
     );
   }
   ```

2. **TypeScript 类型挑战**

   ```typescript

   /**
    * 实现一个类型工具DeepReadonly<T>，使对象的所有属性及嵌套属性变为只读
    *
    * 示例：
    * type X = { a: { b: number }; c: string; }
    * type Expected = { readonly a: { readonly b: number }; readonly c: string; }
    * type Result = DeepReadonly<X> // 等于Expected
    *
    * /

    type DeepReadonly<T> = // 请实现此类型


   ```

3. **算法问题**

   ```javascript
   /**
    * 假设你正在开发音乐平台，需要实现一个函数来计算两首歌曲的相似度
    * 每首歌曲由一系列音符组成，相似度基于最长公共子序列
    * 请实现此函数，并分析时间和空间复杂度
    */

   /**
    * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
    *
    * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
    * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
    * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
    *
    * 示例 1：
    *
    * 输入：text1 = "abcde", text2 = "ace"
    * 输出：3
    * 解释：最长公共子序列是 "ace" ，它的长度为 3 。
   
   
    * 示例 2：
    *
    * 输入：text1 = "abc", text2 = "abc"
    * 输出：3
    * 解释：最长公共子序列是 "abc" ，它的长度为 3 。
    
   
    * 示例 3：
    *
    * 输入：text1 = "abc", text2 = "def"
    * 输出：0
    * 解释：两个字符串没有公共子序列，返回 0 。
    *
    *
    * 提示：
    *   1 <= text1.length, text2.length <= 1000
    *   text1 和 text2 仅由小写英文字符组成。
    */
   ```

## 笔试题答案

### 1. 性能优化

```jsx
function ExpensiveComponent({ data }) {
  const [count, setCount] = useState(0);

  // 使用 useMemo 缓存计算结果，只有当 data 变化时才重新计算
  const processedData = useMemo(() => {
    return data.map((item) => {
      return { ...item, processed: complexCalculation(item) };
    });
  }, [data]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ul>
        {processedData.map((item) => (
          <li key={item.id}>{item.processed}</li>
        ))}
      </ul>
    </div>
  );
}
```

**优化说明：**

1. 原代码问题：每次组件重新渲染时（例如点击按钮更新 count），都会重新执行 `data.map()` 和复杂计算 `complexCalculation()`，造成不必要的性能消耗。
2. 优化方法：使用 `useMemo` 钩子缓存计算结果，只有当依赖数组 `[data]` 中的值发生变化时，才会重新计算。
3. 当点击按钮改变 count 状态时，由于 data 没有变化，React 将复用之前缓存的 processedData 结果，避免重复计算。

**关于 useCallback 和 useEffect 的可行性分析：**

**三种方案比较**：

- **useMemo 方案**（最优）：

  - 直接缓存计算结果，避免重复计算
  - 无需额外的状态更新
  - 计算结果可以在渲染期间立即使用

- **useEffect 方案**：

  - 需要额外的状态(processedData)来存储计算结果
  - 引入额外的渲染周期：数据变化 → 渲染 → useEffect 执行 → 设置新状态 → 再次渲染
  - 可能导致闪烁问题，因为第一次渲染时 processedData 为空

- **useCallback 方案**：

  - 仅缓存函数定义，不缓存函数执行结果
  - 如果在 JSX 中调用该函数，仍会在每次渲染时执行计算
  - 实际上并未解决原始性能问题

因此，对于这个特定场景（缓存计算结果），useMemo 是最适合的选择。

**适合使用 useCallback 的场景示例：**

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  // 不使用 useCallback - 每次渲染都会创建新的函数实例
  // 导致 TodoList 组件不必要的重新渲染
  // const addTodo = (text) => {
  //   setTodos([...todos, { id: Date.now(), text }]);
  // };

  // 使用 useCallback 缓存函数定义
  const addTodo = useCallback((text) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text }]);
  }, []); // 空依赖数组，函数不依赖于任何变化的值

  return (
    <div>
      <h2>Todo 应用</h2>
      <button onClick={() => setCount(count + 1)}>计数器: {count}</button>

      {/* 传递缓存的回调函数给子组件 */}
      <TodoList todos={todos} addTodo={addTodo} />
    </div>
  );
}

// 使用 React.memo 优化子组件，只有当 props 变化时才重新渲染
const TodoList = React.memo(({ todos, addTodo }) => {
  console.log("TodoList 组件渲染");

  return (
    <div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
        placeholder="添加待办事项..."
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
});
```

**为什么需要缓存函数定义？**

1. **避免子组件不必要的重新渲染**：

   - 当父组件重新渲染时（例如 count 状态变化），如果不使用 useCallback，会创建新的 addTodo 函数实例
   - 即使函数行为完全相同，引用也不同（新的内存地址）
   - 当这个新函数作为 prop 传递给使用 React.memo 的子组件时，会导致子组件认为 props 已变化而重新渲染
   - 使用 useCallback 可以保持函数引用稳定，防止子组件不必要的重新渲染

2. **依赖项稳定性**：

   - 当函数被用作其他 Hooks 的依赖项时（如 useEffect、useMemo）
   - 不稳定的函数引用会导致这些 Hooks 频繁执行
   - useCallback 可确保依赖项稳定，减少不必要的副作用或计算

3. **事件处理器优化**：

   - 对于传递给原生 DOM 元素的事件处理函数，虽然 React 已做了优化
   - 但对于复杂组件树或自定义组件，缓存事件处理函数仍然重要

4. **性能关键场景**：
   - 在处理大型列表、复杂表单或频繁更新的 UI 元素时
   - 函数引用稳定性可以显著提高渲染性能

总之，useCallback 主要用于解决函数引用不稳定导致的性能问题，特别是当这些函数作为 props 传递给使用 React.memo 的子组件，或作为其他 Hooks 的依赖项时。

### 2. TypeScript 类型挑战

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};
```

**实现说明：**

1. 遍历对象 T 的所有键 K，并为每个属性添加 `readonly` 修饰符。
2. 对于每个属性值 T[K]，需要判断它是否为对象：
   - 如果是函数对象（Function），则保持原样不递归处理
   - 如果是普通对象，则递归调用 DeepReadonly<T[K]> 使其内部属性也变为只读
   - 如果是基本类型，则直接返回

这个类型工具可以将对象的所有属性及嵌套属性都设置为只读，实现了深层次的不可变性。

### 3. 算法问题 - 最长公共子序列 （medium）

```javascript
/**
 * 计算两个字符串的最长公共子序列长度
 * @param {string} text1 - 第一个字符串
 * @param {string} text2 - 第二个字符串
 * @return {number} - 最长公共子序列的长度
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 创建 DP 表，dp[i][j] 表示 text1[0...i-1] 和 text2[0...j-1] 的最长公共子序列长度
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  // 填充 DP 表
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // 如果当前字符相同，则最长公共子序列长度 +1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 否则取前面计算的最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 返回最终结果
  return dp[m][n];
}

/**
 * 计算两首歌曲的相似度
 * @param {string[]} song1 - 第一首歌的音符序列
 * @param {string[]} song2 - 第二首歌的音符序列
 * @return {number} - 相似度(0-1之间)
 */
function calculateSongSimilarity(song1, song2) {
  if (!song1.length || !song2.length) return 0;

  // 将音符数组转换为字符串，以便使用 LCS 算法
  const song1Str = song1.join("");
  const song2Str = song2.join("");

  // 计算最长公共子序列长度
  const lcsLength = longestCommonSubsequence(song1Str, song2Str);

  // 计算相似度：LCS长度 / 较长歌曲的长度
  const maxLength = Math.max(song1Str.length, song2Str.length);
  return lcsLength / maxLength;
}
```

**算法分析：**

1. **时间复杂度**：O(m×n)，其中 m 和 n 分别是两首歌曲音符序列的长度。

   - 需要填充一个 m+1 × n+1 的动态规划表，每个单元格的计算时间为 O(1)。

2. **空间复杂度**：O(m×n)

   - 需要一个 m+1 × n+1 的二维数组来存储中间结果。
   - 可以进一步优化为 O(min(m,n))，因为 DP 计算过程中只需要保留两行数据。

3. **正确性**：
   - 动态规划方法保证了找到最优解，因为它考虑了所有可能的子序列组合。
   - 通过将结果除以较长序列的长度，可以得到一个介于 0 和 1 之间的相似度值，表示两首歌曲的相似程度。
