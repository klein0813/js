# map&parseInt

## map

* 语法: `array.map(function(currentValue,index,arr), thisValue)`
  * `function(currentValue, index, arr), 'index, arr'` 可选
  * `thisValue`，可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值

## parseInt

* 语法: `parseInt(string, radix)`
  * `radix` 可选，表示要解析的数字的基数。该值介于 `2 ~ 36` 之间，如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
  * 如果 `radix` 小于 2 或者大于 36，则 `parseInt()` 将返回 `NaN`
  * 如果 `radix` 为字符，会当成数字使用(`radix = parseInt(radix)`)

## 问题

  ```js
    var arr = ['1', '2', '3'];
    var r;
    r = arr.map(parseInt);
    console.log(r); // 1, NaN, NaN
  ```

  上述 map 过程实际是

  ```js
    parseInt("1", 0, arr)
    parseInt("2", 1, arr)
    parseInt("3", 2, arr)
  ```
  
  修改为

  ```js
    var arr = ['1', '2', '3'];
    var r;
    r = arr.map(num => parseInt(num));
    console.log(r); // 1, NaN, NaN
  ```
