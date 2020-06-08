# ES6

## let 和 const 命令

* 不存在变量提升/暂时性死区
* 不允许重复声明
* 块级作用域
  * 允许在块级作用域之中声明函数
  * 函数声明还会提升到所在的块级作用域的头部

>ES6 声明变量的六种方法

* ES5 只有两种声明变量的方法：var命令和function命令
* ES6 有 6 种声明变量的方法：另外两中 import 和 class

> 顶层对象

* var命令和function命令声明的全局变量，依旧是顶层对象的属性
* let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性

## 变量的解构赋值

> 数组的解构

```js
let [a, b, c] = [1, 2, 3];
```

* 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
* 解构赋值允许指定默认值
  * 只有当一个数组成员严格等于undefined，默认值才会生效（null 也不行）
  * 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

  ```js
    function f() {
      console.log('aaa');
    }
    let [x = f()] = [1];
  ```

  * let [x = y, y = 1] = [];     // ReferenceError: y is not defined
    * 逗号运算符，从左到右一次执行，执行上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明

> 对象的解构

```js
  let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
  let { foo: fo, bar: b } = { foo: 'aaa', bar: 'bbb' };
  // fo 'aaa', b 'bbb'
```

* 区别：数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

> 相同点

* 可以用于嵌套结构
* 默认值生效的条件是，对象的属性值严格等于undefined

> 注意点

* 结构对象时，不能将“{”至于句首，避免 JavaScript 将其解释为代码块
* 解构赋值允许等号左边的模式之中，不放置任何变量名
  * 虽然可能没有意义，但语法是合法的
* 字符串的解构赋值

  ```js
    const [a, b, c, d, e] = 'hello';
    a // "h"
    // length 是字符串的对象的 length 属性，len 是变量名
    let {length : len} = 'hello';
    len // 5
  ```

  * 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

    ```js
      let {toString: s} = 123;
      s === Number.prototype.toString // true
    ```

    * 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
    * 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
  * 函数参数支持解构

> 圆括号问题

* 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号

> 任何部署了 Iterator 接口的对象，都可以用for...of循环遍历

## 字符串的扩展

> 字符的 Unicode 表示法

* \uxxxx (范围：\u0000~\uFFFF)
* 将码点放入大括号

```js
  "\uD842\uDFB7"
  "\u{20BB7}"
  // "𠮷"

  "\u{41}\u{42}\u{43}"
  // "ABC"
```

> 字符串的遍历器接口

* for...of 能识别可大于0xFFFF的码点

> 直接输入 U+2028 和 U+2029

*
> JSON.stringify() 的改造

* 可能返回0xD800到0xDFFF之间的单个码点
* 如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串

> 模板字符串

* 增强版的字符串，用反引号（`）标识
* 可以用来定义多行字符串，或者在字符串中嵌入变量或函数，`${}`

> 标签模板

* 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数
* 变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推

> 模板字符串的限制

* 模板字符串默认会将字符串转义，导致无法嵌入其他语言

## 正则的扩展

## 数值的扩展

JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）

> 二进制和八进制表示法

* 0b（或0B）和0o

> Number.isFinite(), Number.isNaN()

* Number.isFinite() - 检查一个数值是否为有限的（finite），即不是Infinity
* 用来检查一个值是否为NaN

> Number.parseInt(), Number.parseFloat()

* 全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变
* 字符串转 int 或者 float

> Number.isInteger()

* 判断一个数值是否为整数
* 数值的精度超过限度，可能会误判

> Number.EPSILON - 表示 1 与大于 1 的最小浮点数之间的差 - 2.220446049250313e-16

```js
  Number.EPSILON === Math.pow(2, -52)
  // true
```

> 安全整数和 Number.isSafeInteger()

* 准确表示的整数范围: Number.MAX_SAFE_INTEGER / Number.MIN_SAFE_INTEGER
* -2^53 到 2^53 - 9007199254740992 到 -9007199254740992
* Number.isSafeInteger() - 判断一个整数是否落在这个范围之内
* 安全范围之外的计算，可能是不准确的，判断计算结果是否准确，参与的数的需要是安全的

```js
9007199254740995 - 10  // 9007199254740986
```

> Math 对象的扩展

* ES6 在 Math 对象上新增了 17 个与数学相关的方法
  * Math.trunc - 用于去除一个数的小数部分，返回整数部分
  * Math.sign - 符号函数(+0, -0, +1, -1, NaN)

> 指数运算符  `**`

* 一个特点是右结合，而不是常见的左结合

```js
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2 // 512
```

> BigInt 数据类型 [`ES2020`]

* 表示整数，没有位数的限制，任何位数的整数都可以精确表示
* BigInt 与普通整数是两种值，它们之间并不相等
* typeof运算符对于 BigInt 类型的数据返回bigint
* 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突

## 函数的扩展

> 函数参数的默认值

* 使用参数默认值时，函数不能有同名参数

```js
// 写法一  默认值是空对象，但是设置了对象解构赋值的默认值
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}
// 写法二  默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
```

* 如果非尾部的参数设置默认值，实际上这个参数是没法省略的，除非显式输入undefined
* 函数的 length 属性 - 返回没有指定默认值的参数个数

  ```js
    (function (a, b, c = 5) {}).length // 2
  ```

* 存在作用域

> rest 参数

* 形式为...变量名
* function add(...values)

> 严格模式

* 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

> name 属性

* 返回该函数的函数名

> 箭头函数

* 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
* 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
* 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

> 尾调用优化

* 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame）
* 所有的调用帧，就形成一个“调用栈”（call stack）
* 目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持
* 尾递归
  * 明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”
  * ES6 的尾调用优化只在严格模式下开启，正常模式是无效的
    * 在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
    * func.arguments：返回调用时函数的参数。
    * func.caller：返回调用当前函数的那个函数。
* 递归函数的改写
  * 柯里化
  * 循环可以用递归代替
* 尾递归优化的实现 - 减少调用栈
  * 蹦床函数（trampoline）可以将递归执行转为循环执行

  ```js
    // 返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题
    function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }
  ```

> 函数参数的尾逗号 [`ES2017`]

> Function.prototype.toString() [`ES2019` 有修改]

* toString()方法返回函数代码本身，以前会省略注释和空格
* 修改后的toString()方法，明确要求返回一模一样的原始代码

> catch 命令的参数省略 [`ES2019`]

## 数组的扩展

> 扩展运算符

* 扩展运算符（spread）是三个点（...）
* 只有函数调用时，扩展运算符才可以放在圆括号中
* 替代函数的 apply 方法
* 复制数组 - 浅拷贝
* 合并数组
* 与解构赋值结合
* 字符串 - 扩展运算符还可以将字符串转为真正的数组 - `[...'hello']`
* 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符

```js
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;

const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

// 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
const a3 = a1.concat(a2);    // 拷贝数组是浅拷贝
const a4 = [...a1, ...a2];   // 拷贝数组是浅拷贝

a3[0] === a1[0] // true
a4[0] === a1[0] // true

[a, ...rest] = list
const [first, ...rest] = [1, 2, 3, 4, 5];
```

> Array.from() - 产生新的数组

* 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
* 任何有length属性的对象，都可以通过Array.from方法转为数组
* Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
* 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3       // 没有 length, 返回 []
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```

> Array.of()

* 将一组值，转换为数组
* 弥补数组构造函数Array()的不足 - 参数个数的不同，会导致Array()的行为有差异

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

> 数组实例的 copyWithin()

* Array.prototype.copyWithin(target, start = 0, end = this.length)

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
```

> 数组实例的 find() 和 findIndex()

* find 参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员 // 数据/undefined
* findIndex 与 find 类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
* 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

> 数组实例的 fill()

* 用给定值，填充一个数组
* fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
* 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)

let arr = new Array(3).fill([]);
arr[0] = 1;
arr[1].push(5);
arr
// [1, [5], [5]]
```

> 数组实例的 entries()，keys() 和 values()

* keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历

> 数组实例的 includes() [`ES2016`] - true/false

* 某个数组是否包含给定的值，与字符串的includes方法类似
* 该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始
* Map 结构的has方法，是用来查找键名的
* Set 结构的has方法，是用来查找值的

```js
[NaN].indexOf(NaN)
// -1
[NaN].includes(NaN)
// true
```

> 数组实例的 flat()，flatMap()

* flat() - 嵌套的数组“拉平”
* flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组
* 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
* flatMap() - 方法对原数组的每个成员执行一个函数,然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组
* flatMap() 只能展开一层数组

> 数组的空位

* 数组的空位指，数组的某一个位置没有任何值
* 空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点

```js
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```

* ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位
* ES6 则是明确将空位转为undefined
* Array.from方法会将数组的空位，转为undefined
* 扩展运算符（...）也会将空位转为undefined
* copyWithin()会连空位一起拷贝
* fill()会将空位视为正常的数组位置
* for...of循环也会遍历空位
* map方法遍历，空位是会跳过的
* entries()、keys()、values()、find()和findIndex()会将空位处理成undefined
* 由于空位的处理规则非常不统一，所以建议避免出现空位

> Array.prototype.sort() 的排序稳定性

* 常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。不稳定排序的主要缺点是，多重排序时可能会产生问题
* ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定

## 对象的扩展

> 属性的简洁表示法

* 直接写入变量和函数，作为对象的属性和方法
* 简写的对象方法不能用作构造函数，会报错

> 属性名表达式

* ES6 允许字面量定义对象，表达式作为对象的属性名，即把表达式放在方括号内

```js
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
  ['b']: 1,
  'c': 2,
  d: 3
};
```

* 表达式还可以用于定义方法名

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
obj['hello']()  // hi
```

* 属性名表达式与简洁表示法，不能同时使用，会报错

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };
```

* 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心

> 方法的 name 属性

```js
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"

const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```

* bind方法创造的函数，name属性返回bound加上原函数的名字，同函数的 name 属性
* Function构造函数创造的函数，name属性返回anonymous，同函数的 name 属性
* 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述

> 属性的可枚举性和遍历

属性的可枚举性

* 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为
* Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,      //称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性
//    configurable: true
//  }
```

* 有四个操作会忽略enumerable为false的属性
  * for...in循环：只遍历对象自身的和继承的可枚举的属性。
  * Object.keys()：返回对象自身的所有可枚举的属性的键名。
  * JSON.stringify()：只串行化对象自身的可枚举的属性。
  * Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
* ES6 规定，所有 Class 的原型的方法都是不可枚举的

属性的遍历

* for...in
  * 只遍历对象自身的和继承的可枚举的属性（不含 Symbol 属性）
* Object.keys(obj)
  * Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
* Object.getOwnPropertyNames(obj)
  * Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
* Object.getOwnPropertySymbols(obj)
  * Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名
* Reflect.ownKeys(obj)
  * Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

* 遵守同样的属性遍历的次序规则
  * 首先遍历所有数值键，按照数值升序排列。
  * 其次遍历所有字符串键，按照加入时间升序排列。
  * 最后遍历所有 Symbol 键，按照加入时间升序排列

> super 关键字

* ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象
* super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
  * 只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法
* JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）


> 对象的扩展运算符[`ES2018`]

* 解构赋值
  * 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面
  * 扩展运算符的解构赋值，不能复制继承自原型对象的属性
  * 扩展运算符的解构赋值，只能读取对象自身的属性
  * 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
* 扩展运算符
  * 用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
  * 数组是特殊的对象，所以对象的扩展运算符也可以用于数组
  * 如果扩展运算符后面是一个空对象，则没有任何效果
  * 如果扩展运算符后面不是对象，则会自动将其转为对象
  * 对象的扩展运算符等同于使用Object.assign()方法

  ```js
    // 写法一
    const clone1 = {
      __proto__: Object.getPrototypeOf(obj),
      ...obj
    };

    // 写法二
    const clone2 = Object.assign(
      Object.create(Object.getPrototypeOf(obj)),
      obj
    );

    // 写法三
    const clone3 = Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    )
  ```

  * 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式

  ```js
    const obj = {
      ...(x > 1 ? {a: 1} : {}),
      b: 2,
    };
  ```

  * 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的

> 链判断运算符 `?.` [`ES2020`]

* 左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined
* 链判断运算符有三种用法
  * obj?.prop // 对象属性
  * obj?.[expr] // 同上
  * func?.(...args) // 函数或对象方法的调用

```js
  a?.b
  // 等同于
  a == null ? undefined : a.b

  a?.[x]
  // 等同于
  a == null ? undefined : a[x]

  a?.b()
  // 等同于
  a == null ? undefined : a.b()

  a?.()
  // 等同于
  a == null ? undefined : a()
```

* 注意点
  * 短路机制
    * 链判断运算符一旦为真，右侧的表达式就不再求值

  ```js
    a?.[++x]
    // 等同于
    a == null ? undefined : a[++x]
  ```

  * delete 运算符

  ```js
    delete a?.b
    // 等同于
    a == null ? undefined : delete a.b
  ```

  * 括号的影响
    * 如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响
  * 报错场合
  ```js
    // 构造函数
    new a?.()
    new a?.b()

    // 链判断运算符的右侧有模板字符串
    a?.`{b}`
    a?.b`{c}`

    // 链判断运算符的左侧是 super
    super?.()
    super?.foo

    // 链运算符用于赋值运算符左侧
    a?.b = c
  ```

> Null 判断运算符 - `??` [`ES2020`]

* 读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值

```js
  const headerText = response.settings.headerText || 'Hello, world!';

  const animationDuration = response.settings?.animationDuration ?? 300;
```

## 对象的新增方法

> Object.is()

* 运用了“Same-value equality”（同值相等）算法

```js
  +0 === -0 //true
  NaN === NaN // false

  Object.is(+0, -0) // false
  Object.is(NaN, NaN) // true
```

> Object.assign(target, source1, source2)

* 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
* 方法的第一个参数是目标对象，后面的参数都是源对象
* 后面的属性会覆盖前面的属性
* 如果只有一个参数，Object.assign会直接返回该参数
* 如果只有一个参数，Object.assign会直接返回该参数
* 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错
* 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果
  * 因为只有字符串的包装对象，会产生可枚举属性
* 只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
* 属性名为 Symbol 值的属性，也会被Object.assign拷贝

> Object.getOwnPropertyDescriptors()

* ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）
* ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象
* 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题
  * Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法


> __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

* JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法
* 只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的
* 用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替
* Object.setPrototypeOf()
  * 作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身

  ```js
    // 格式
    Object.setPrototypeOf(object, prototype)

    // 用法
    const o = Object.setPrototypeOf({}, null);

    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    obj.x // 10
    obj.y // 20
    obj.z // 40
  ```
  
  * 用于读取一个对象的原型对象

  ```js
    function Rectangle() {
      // ...
    }
    const rec = new Rectangle();
    Object.getPrototypeOf(rec) === Rectangle.prototype
    // true
    Object.setPrototypeOf(rec, Object.prototype);
    Object.getPrototypeOf(rec) === Rectangle.prototype
    // false
    Object.getPrototypeOf(1) === Number.prototype // true
    Object.getPrototypeOf('foo') === String.prototype // true
    Object.getPrototypeOf(true) === Boolean.prototype // true
  ```

> Object.keys()，Object.values()，Object.entries()
  
* ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
* ES2017 Object.values()，Object.entries()

> Object.fromEntries()

* Object.entries()的逆操作，用于将一个键值对数组转为对象

```js
  Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
  ])
  // { foo: "bar", baz: 42 }
```
