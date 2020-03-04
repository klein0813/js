# 补充

## 1. npx - npm 5.2+ 附带的 package 运行工具

## 2. `<element tabindex="number">`

规定元素的 tab 键控制次序（1 是第一个）

## 3. `Object Rest/Spread Properties for ECMAScript`

* Rest Properties

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

* Spread Properties

```js
let n = { x, y, ...z };
n; // { x: 1, y: 2, a: 3, b: 4 }
```

## 深/浅合并

* 浅, 合并一层
* 深, 递归合并直最里一层
* ES 的合并为浅合并
* `Object.assign` 为浅合并

## 箭头函数和普通函数的区别

* 箭头函数不绑定 `arguments`，取而代之用 `rest` 参数...解决

```js
(()=>{console.log(arguments)})(1,2,3)
// 报错：Uncaught ReferenceError: arguments is not defined

// => 修改
((...arguments)=>{console.log(arguments)})(1,2,3)

```

* 箭头函数不支持 `yield`，因此箭头函数不能用作 `Generator` 函数

* 箭头函数不绑定 `this`，会捕获其所在的上下文的 `this` 值，作为自己的 `this` 值

```js
var obj = {
  a: 10,
  b: () => {
    console.log(this.a); // undefined
    console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
  },
  c: function() {
    console.log(this.a); // 10
    console.log(this); // {a: 10, b: ƒ, c: ƒ}
  }
}
obj.b();
obj.c();

// 修改
var obj = {
  a: 10,
  b: function () {
    return () => (this.a)
  }
}
obj.b()() //10

// 一个有趣的例子
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
```

* 箭头函数通过 `call()` 或 `apply()` 方法调用一个函数时，只传入了一个参数，对 `this` 并没有影响

```js
var obj = {
  a: 10,
  b: function(m) {
    var h = (m) => (m + this.a)
    var n = {
      a: 20
    }

    return h.call(n, m)
  }
}

obj.b(1)
```

* 箭头函数没有原型属性

```js
let func = () => {return 12}
func.property // undefined
```

## 词法作用域

* 词法作用域中使用的域,是变量在代码中声明的位置所决定的,遇到既不是形参也不是函数内部定义的局部变量的变量时,去函数声明时的作用域链查询.嵌套的函数可以访问在其外部声明的变量.

* 函数在定义的时候决定了函数的作用域,JavaScript 采用词法作用域(静态作用域).静态作用域关心函数在何处被定义.

## `call()` 或 `apply()`

* 每个函数都包含两个非继承而来的方法： `call()` 和 `apply()`
* 在 `JavaScript` 中，`call` 和 `apply` 作用是一样的，都是为了改变某个函数运行时的上下文 `（context）` 而存在的，换句话说，就是为了改变函数体内部 `this` 的指向

```js
function fruits(){}
fruits.prototype = {
    color: "red",
    say: function(){
        console.log("My color is " + this.color);
    }
};

var another = {
    color: "yellow"
};

var apple = new fruits;
apple.say();                //My color is red
apple.say.call(another);    //My color is yellow
apple.say.apply(another);   //My color is yellow
```

* 区别 - 参数书写方式不同

`call(this, arg1, arg2, arg3, arg4);`

`apply(this, [args]);`

## this

* 在方法中，`this` 表示该方法所属的对象

```js
'use strict'
let demo = {
  a: 10,
  b: function() {
    return function() {
      console.log(this)
    }
  }
}

demo.b() //　其值是一个方法，没有执行，即返回的方法中的 this 没有被赋值；方法中的 this 为方法执行时　所属的对象
```

## Function.prototype.bind()

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this

```js
// 域1
var demo = {
  // 域2
  a: 10,
  b: function() {
    // 域3
    return function() {
      console.log(this.a)
    }
  }
}

demo.b()() // undefine

// => 修改

var demo = {
  a: 10,
  b: function() {
    return function() {
      console.log(this.a)
    }
  }.bind(this)
}

demo.b()() // 10
```

## 原型

```js
function Demo(){}
Demo.prototype.print = function(){console.log(this.pv)}
Demo.prototype.pv = 0
let demo = new Demo
demo.print() // 0
demo.print.call({pv: 10}) //10
```

## ES6函数参数解构

```js
var elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

elements.map(({ length }) => length);// [8, 6, 7, 9]
elements.map(({ length: lengthFooBArX }) => lengthFooBArX);// [8, 6, 7, 9]
elements.map(({ 'length': lengthFooBArX }) => lengthFooBArX);// [8, 6, 7, 9]

// length 是属性名，每个字符串都有一个 length 的属性
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
```
