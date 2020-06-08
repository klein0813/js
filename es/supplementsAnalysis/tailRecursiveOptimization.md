
# 尾递归优化

> 蹦床函数

* 一直调用，直到返回值不是一个函数为止
* 返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题
* 是把封装函数储存在堆里面，利用堆这个容量更大但读取时间更慢的储存形式来替代栈这个容量小但读取时间快的储存形式，`用时间来换取空间`

```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);    // bind不会立刻执行，而是返回一个函数
  } else {
    return x;
  }
}

trampoline(sum(1, 100000))
```

## 尾递归优化实现

例：
```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    console.log(0)
    if (!active) {
      active = true;
      console.log(-1)
      while (accumulated.length) {
        console.log(-2)
        value = f.apply(this, accumulated.shift());  // apply 和 call 会立即执行，apply 数组参数
        console.log(-3)
      }
      active = false;
      console.log(-4)
      return value;
    }
    console.log(-5)
  };
}

var sum = tco(function(x, y) {
  console.log(-6)
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1,2)
0
-1
-2
-6
0
-5
-3
-2
-6
0
-5
-3
-2
-6
-3
-4
3
```

tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层

上一次递归，将本身的参数给 accumulated 之后，由于 active 是 true，不会进入 if 而结束。由于 accumulated 有值，继续 while 循环，进入下一次递归

递归所需要的数据不再是放在调用栈里，而是使用闭包，存放

尝试：

nf(n) = (n-1)f(n-1) + (n-2)f(n-2), f(1) = 1, 求 f(10)

```js
function func1 (n) {
  let count = 0
  return (function func2(a = 0, b = 1){
    count++
    if (n <= 1) {
      return b
    } else {
      n--
      return func2(b, ((count - 1) * a + count * b) / (count + 1))
    }
  })()
}

func1 (10)
```
