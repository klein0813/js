# ES6

## Symbol

> 概述

* ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值
* 七种数据类型: undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）
* Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型
* Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的
* Symbol 值不能与其他类型的值进行运算，会报错
* Symbol 值可以显式转为字符串或者boolean值

> Symbol.prototype.description

```js
  // sym的描述就是字符串foo
  const sym = Symbol('foo');

  // 读取描述
  String(sym)      // Symbol(foo)
  sym.toString()   // Symbol(foo)
  sym.description  // foo
```

* `ES2019` 提供了一个实例属性 `description`， 直接返回 Symbol 的描述

> 作为属性名的 Symbol

* 用于对象的属性名，能保证不会出现同名的属性
* Symbol 值作为对象属性名时，不能用点运算符 - `点运算符后面总是字符串`
* Symbol 值作为属性名时，该属性还是公开属性，不是私有属性

> 实例：消除魔术字符串

* `魔术字符串`指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值
* 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替
* 常用的消除魔术字符串的方法，就是把它写成一个变量
* 如果值对于逻辑并不重要，可以将之用 Symbol 代替

```js
  const shapeType = { triangle: Symbol() };
```

> 属性名的遍历

* `Object.getOwnPropertySymbols()`
  * 遍历获取 Symbol 值只能通过该方法获取
  * 该方法返回一个数组，成员是当前对象的所有用作属性名的 `Symbol` 值

> Symbol.for()，Symbol.keyFor()

* Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol,它们的区别是，前者会被登记在全局环境中供搜索，后者不会

* Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key

* Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行

  ```js
    Symbol.for("bar") === Symbol.for("bar")
    // true
    Symbol("bar") === Symbol("bar")
    // false

    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined
  ```

> 内置的 Symbol 值

* 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法

* Symbol.hasInstance
  * 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法

  ```js
    class Even {
      static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
      }
    }

    // 等同于
    const Even = {
      [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
      }
    };

    1 instanceof Even // false
    2 instanceof Even // true
    12345 instanceof Even // false
  ```

* 对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开
  * 数组的默认行为是可以展开
  * 类似数组的对象正好相反，默认不展开
  * Symbol.isConcatSpreadable属性也可以定义在类里面

  ```js
    let arr1 = ['c', 'd'];
    ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
    arr1[Symbol.isConcatSpreadable] // undefined

    let arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = false;
    ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

    let obj = {length: 2, 0: 'c', 1: 'd'};
    ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

    obj[Symbol.isConcatSpreadable] = true;
    ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

    class A1 extends Array {
      constructor(args) {
        super(args);
        this[Symbol.isConcatSpreadable] = true;
      }
    }
    class A2 extends Array {
      constructor(args) {
        super(args);
      }
      get [Symbol.isConcatSpreadable] () {
        return false;
      }
    }
    let a1 = new A1();
    a1[0] = 3;
    a1[1] = 4;
    let a2 = new A2();
    a2[0] = 5;
    a2[1] = 6;
    [1, 2].concat(a1).concat(a2)
    // [1, 2, 3, 4, [5, 6]]
  ```

* Symbol.species - 指向一个构造函数。创建衍生对象时，会使用该属性
* Symbol.match - 当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值

  ```js
    String.prototype.match(regexp)
    // 等同于
    regexp[Symbol.match](this)

    class MyMatcher {
      [Symbol.match](string) {
        return 'hello world'.indexOf(string);
      }
    }

    'e'.match(new MyMatcher()) // 1
  ```

* Symbol.replace - 指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值

  ```js
    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);

    'Hello'.replace(x, 'World') // ["Hello", "World"]
  ```

  * Symbol.replace方法会收到两个参数，第一个参数是replace方法正在作用的对象，上面例子是Hello，第二个参数是替换后的值，上面例子是World。

* Symbol.search - 指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值
* Symbol.split - 指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值
* Symbol.iterator - 指向该对象的默认遍历器方法
* Symbol.toPrimitive - 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值
* Symbol.toStringTag - 在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串
* Symbol.unscopables - 该对象指定了使用with关键字时，哪些属性会被with环境排除

## Set 和 Map 数据结构

> Set - 类似于数组，但是成员的值都是唯一的，没有重复的值

* 基本用法
  * 向 Set 加入值的时候，不会发生类型转换
  * Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身
  * 初始化 - 接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数
* Set 实例的属性和方法
  * 属性
    * Set.prototype.constructor - 构造函数，默认就是Set函数
    * Set.prototype.size - 返回Set实例的成员总数
  * 方法
    * Set.prototype.add(value) - 添加某个值，返回 Set 结构本身
    * Set.prototype.delete(value) - 删除某个值，返回一个布尔值，表示删除是否成功
    * Set.prototype.has(value) - 返回一个布尔值，表示该值是否为Set的成员
    * Set.prototype.clear() - 清除所有成员，没有返回值
* 遍历操作
  * Set.prototype.keys()：返回键名的遍历器
  * Set.prototype.values()：返回键值的遍历器
  * Set.prototype.entries()：返回键值对的遍历器
  * Set.prototype.forEach()：使用回调函数遍历每个成员
    * Set 结构的键名就是键值
    * 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构

> WeakSet - 结构与 Set 类似，也是不重复的值的集合

* WeakSet 的成员只能是对象，而不能是其他类型的值
* WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
* 不可遍历
* Set 实例的属性和方法
  * 构造函数
  * WeakSet.prototype.add(value)
  * WeakSet.prototype.delete(value)
  * WeakSet.prototype.has(value)

> Map - “值—值”的对应

Object 结构提供了“字符串—值”的对应


