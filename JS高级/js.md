## 目录

<br>

<!-- - [面向对象的JavaScript](#面向对象的JavaScript)<br> -->
<!-- - [原型、原型链](#原型、原型链)<br> -->
- [New字符运算的过程](#New字符运算的过程)<br>
<!-- - [封装](#封装)<br> -->
<!-- - [继承](#继承)<br> -->
<!-- - [多态](#多态)<br> -->
- [this指向](#this指向)<br>
- [call、apply和bind](#call、apply和bind)<br>
- [手写一个bind的实现](#手写一个bind的实现)<br>
<!-- - [闭包](#闭包)<br> -->
<!-- - [变量提升](#变量提升)<br> -->
<!-- - [执行上下文](#执行上下文)<br> -->
<!-- - [作用域、作用域链](#作用域、作用域链)<br> -->


<br>
<hr>
<br>

### New字符运算的过程

<br>

```js
// 构造函数
function Person( name ){     
    this.name = name; 
}
Person.prototype.getName = function(){     
    return this.name; 
};

// 模拟 New
const  objectFactory = function(){     
    var obj = new Object(),                           // 从Object.prototype上克隆一个空的对象  
    Constructor = [].shift.call( arguments );         // 取得外部传入的构造器，此例是Person
    obj.__proto__ = Constructor.prototype;            // 指向正确的原型    
    var ret = Constructor.apply( obj, arguments );    // 借用外部传入的构造器给obj设置属性    
    return typeof ret === 'object' ? ret : obj;       // 确保构造器总是会返回一个对象};
}

// 测试
const a = objectFactory( Person, 'sven' ); 
console.log( a.name );                                                // 输出：sven 
console.log( a.getName() );                                           // 输出：sven 
console.log( Object.getPrototypeOf( a ) === Person.prototype );       // 输出：true

```
<br>


> 通过这句`obj.__proto__ = Constructor.prototype`代码，我们让obj.__proto__指向Person.prototype，而不是原来的Object.prototype

<br>
<hr>
<br>

### this指向

<br>

<br>

> Javascript的this总是指向一个对象。而具体指向哪个对象，是在`运行时`基于函数的执行环境`动态绑定`的,而非声明时的环境

<br>

通常分为`4种`：

<br>

1. 作为对象的方法调用

<br>

> 此时，this指向该对象

<br>

```js
const obj = function(){
    a:1,
    getA:function(){
        console.log(this===obj);  // true
        console.log(this.a);      // 1
    }
}

obj.getA(); 
```

<br>

2. 作为普通函数调用

<br>

> 此时，this指向全局对象，在浏览器里，这个对象指向window对象

<br>

```js

window.name="globalName";

const obj = {
    name:"my obj",
    getName:function(){
        return this.name
    }
}

const getName = obj.getName();

console.log(getName) // my obj
```

<br>

再看这个

<br>

```js
window.name="globalName";

const obj = {
    name:"my obj",
    getName:function(){
        return this.name
    }
}

const getName = obj.getName;

console.log(getName()) // globalName
```

<br>

3. 作为构造器调用

<br>

> 当用 new 运算符调用函数时，该函数总会`返回一个对象`，通常情况下，构造器里的 this 就指向返回的这个对象

<br>

```js
    const MyClass=function(){
        this.name="my class"
    }

    const b = new MyClass();

    console.log(b.name) // my class
```

<br>

> 但是当构造函数`显式`的返回一个`object类型`的对象，运算结果是返回这个对象，而不是我们之前期待的this

<br>

```js 
    const MyClass=function(){
        
        this.name="my class";

        return {
            name:"new name" 
        }
    }

    const b = new MyClass();

    console.log(b.name) // new name
```

<br>

4. Function.prototype.call 或 Function.prototype.apply 调用

<br>

> call 和 apply 可以动态地 改变传入函数的 this

<br>

```js

var obj1 = { 
    name: 'sven',
    getName: function(){ 
        return this.name;
    } 
};
var obj2 = { 
    name: 'anne'
}

console.log(obj1.getName()) // sven
console.log(obj1.getName().call(obj2)) // anne

```

<br>
<hr>
<br>

### call、apply和bind

<br>

1. call 和 apply 的区别

<br>

> call 和 apply 的两个都可以`动态的改变this指向`，区别就在于`第二个参数`，apply传入的是一个数组。

<br>

> 在使用 call 和 apply 时，如果第一个参数为 `null` ，函数体内的 this 会指向默认的宿主对象，在浏览器里则是 `window`

<br>


2. 与bind的区别

<br>


> bind方法是事先把fn的this改变为我们要想要的结果，并且把对应的参数值准备好，以后要用到了，直接的执行即可，也就是说`bind同样可以改变this的指向`，但和apply、call不同就是`不会马上的执行`

<br>

#### 手写一个bind的实现

<br>

```js
Function.prototype.bind = function(){ 

    var self = this, // 保存原函数
    context = [].shift.call( arguments ),
    args = [].slice.call( arguments ); 

    return function(){ // 返回一个新的函数
        // 需要绑定的 this 上下文 // 剩余的参数转成数组
        return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) ); // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
        // 并且组合两次分别传入的参数，作为新函数的参数
    } 
};

var obj = {
     name: 'sven'
};
var func = function( a, b, c, d ){
    alert ( this.name );        // 输出:sven
    alert ( [ a, b, c, d ] )    // 输出:[ 1, 2, 3, 4 ]
}.bind( obj, 1, 2 ); 

func( 3, 4 );
```

<br>

3. call、apply与bind的用途

<br>

> “借用构造函数”，通过这种技术，可以实现一些类似继承的效果

<br>

```js

var A = function( name ){
    this.name = name;
};

var B = function(){
    A.apply( this, arguments );
};

B.prototype.getName = function(){
    return this.name;
}

var b = new B('sven')
console.log( b.getName() ); // 输出: 'sven'
```

<br>
<br>

### 闭包
var mult = (function(){
    var cache = {}; 

    var calculate=function(){ //封闭 calculate 函数
        var a=1; 
        for(var i=0,l=arguments.length;i<l;i++){
            a = a * arguments[i]; 
        }
        return a; 
    };

    return function(){
        var args = Array.prototype.join.call( arguments, ',' ); 
        if ( args in cache ){ 
            return cache[ args ]; 
        }
        return cache[ args ] = calculate.apply( null, arguments );
    } 
})();

console.log ( mult( 1,2,3 ) ); 
console.log ( mult( 1,2,3 ) );
### 作用域、作用域链
### 高阶函数
### 原型、原型链
### 继承
> JavaScript的对象最初都是由`Object.prototype`对象`克隆`而来的，但对象构造器的原型并不仅限于Object.prototype上，而是可以动态指向其他对象。这样一来，当对象a需要借用对象b的能力时，可以有选择性地把对象a的构造器的原型指向对象b，从而达到继承的效果。
### 面向对象的JavaScript
### 封装
### 继承
### 多态
### 变量提升

```javascript
var a=0;
console.log(a); // a=0


//变量提升 声明a 
// var a ;
console.log(a); // a=undefind
var a=0;
```
### 执行上下文