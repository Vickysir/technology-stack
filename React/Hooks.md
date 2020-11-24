### 常见的Hooks及使用（v16.8新特性）

1. useState 是允许你再函数组件中使用state，而不必将其转化为 class组件。
```javascript
    let [count,setcount]=useState(0); //返回一个state，以及更新state 的函数
```

2. useEffect 可以让你在函数组件中执行副作用操作，可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
```javascript

    //同 componentDidUpdate 生命周期，每次都会更新
    useEffect(()=>{
        //doing something
    })
    
    //同 componentDidMount, 不依赖任何一个props、state的变化，只会在初始化的时候触发一次
    useEffect(()=>{
        //doing something
    },[])
    
    //同 componentDidUpdate 生命周期，依赖count的变化，才会更新
    useEffect(()=>{
        //doing something
    },[count])
    
    //如果有return的话， 函数会执行清理的操作，会执行一次componentDidMount 和 componentWillUnmount 生命周期
    useEffect(()=>{
        //doing something
        
        return ()=>{}
        
    },[])
    
```

3.useRef 可以获取子组件的实例；可以获取dom；可以保存任何值；

```javascript

import React, { useRef, useState, useEffect } from 'react'; 

export default () => {
    
    // 使用 useRef 创建 inputEl 
    const inputEl = useRef(null);

    const [text, updateText] = useState('');

    // 使用 useRef 创建 textRef 
    const textRef = useRef();

    useEffect(() => {
        // 将 text 值存入 textRef.current 中
        textRef.current = text;
        console.log('textRef.current：', textRef.current);
    });

    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.value = "Hello, useRef";
    };

    return (
        <>
            {/* 保存 input 的 ref 到 inputEl */}
            <input ref={ inputEl } type="text" />
            <button onClick={ onButtonClick }>在 input 上展示文字</button>
            <br />
            <br />
            <input value={text} onChange={e => updateText(e.target.value)} />
        </>
    );

}

```

4. useContext 允许跨组件通信
5. useReducer 是useState的替代方案，用来处理更复杂可复用的逻辑
6. useImperativeHandle 用于向父组件公开某些属性和方法
7. useCallback 用于性能优化，避免组件重复渲染，返回的是一个函数引用
8. useMemo 用于性能优化，避免组件重复渲染，返回的是一个值
9. useLayoutEffct 与 useEffect 类似，它会在所有的 DOM 变更之后同步调用 effect，会阻塞渲染；
10. useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。
11. 自定义hook，可以将组件逻辑提取到可重用的函数中



