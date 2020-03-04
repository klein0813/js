# DOM-EVENT

## 介绍

在Web中，JavaScript 网页上的事件机制不同于在其他环境中的事件机制

## 网页事件机制

```js
function onChange() {
  console.log("onChange")
}
```

### 事件处理器属性

```html
<button>Press me</button>
```

```js
let button = document.querySelectorAll("botton")[0]
button.onclick = onChange
```

### 行内事件处理器 - `请勿使用`

将编程逻辑与内容分离也会使站点对搜索引擎更加友好, 行内事件处理器函数需 `驼峰` 形式

```html
<button onclick="onChange()">Press me</button>
```

### `addEventListener()` 和 `removeEventListener()` - DOM L2

* 当使用 addEventListener 时，可用 removeEventListener 移除绑定的事件

```js
button = document.querySelectorAll("botton")[0]
button.addEventListener("click", onChange)
button.click = onChange

function onChange() {
  console.log("onChange")
  this.removeEventListener("click", onChange)
}
```

* 此中 `this` 为当前组件对象，上述实现了 `once` 功能

* 可以向同一类型的元素添加多个监听器

## [事件对象](https://www.w3school.com.cn/jsref/dom_obj_event.asp)

* e.target 表示　实际点击的元素;e.currentTarget 表示绑定事件的元素,等价于 this

```js
function onChange(e) {
  console.log(this === e.currentTarget) // true
  e.target.style.backgroundColor = "rgb(0,0,0)"
}
```

## 阻止默认行为

a 标签设置了 href 属性式会自动跳转， form 绑定了 onsubmit 时，点击会自动跳转等，均为默认行为

```js
form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
}
```

## 事件冒泡及捕获

### 捕获阶段和冒泡阶段

* 捕获阶段: 最外层 => 实际点击的元素
* 冒泡阶段: 实际点击的元素 => 最外层
* 在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册
  * 设置在捕获阶段注册事件处理程序 - 使用addEventListener()注册，并将可选的第三个属性设置为true[demo]("./code/capture_phase_registration _events.html")

### e.stopPropagation()

终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播

## JS浏览器事件循环机制
