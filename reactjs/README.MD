REACT
====

`React` 是一个声明式，高效且灵活的用于构建用户界面的 `JavaScript` 库。使用 `React` 可以将一些简短、独立的代码片段组合成复杂的 `UI` 界面，这些代码片段被称作`“组件”`

```js react
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)
```

* [在线编译工具 - CodePen](codepen.io)

  * 配置
    * `JavaScript Preprocessor - Babel`
    * `Add External Scripts/Pens - React, ReactDOM`

JSX
----

是一个 `JavaScript` 的语法扩展。在 `JSX` 中你可以任意使用 `JavaScript` 表达式，只需要用一个大括号把表达式括起来

* 在 `JSX` 中嵌入表达式 - 在大括号内放置任何有效的 `JavaScript` 表达式[#1](./basis/JSX.md/#jsx1)
* `JSX` 也是一个表达式[#2](./basis/JSX.md/#jsx2)
* `JSX` 特定属性[#3](./basis/JSX.md/#jsx3)
  * 使用引号，来将属性值指定为字符串字面量
  * 使用大括号，来在属性值中插入一个 `JavaScript` 表达式
* 使用 `JSX` 指定子元素[#4](./basis/JSX.md/#jsx4)
* `JSX` 防止注入攻击 - `React DOM` 在渲染所有输入内容之前，默认会进行转义[#5](./basis/JSX.md/#jsx5)
* `JSX` 表示对象 - `React` 元素[#6](./basis/JSX.md/#jsx6)

元素渲染
----

元素是构成 `React` 应用的最小砖块

```const element = <h1>Hello, world</h1>;```

`React` 元素是创建开销极小的普通对象，`ReactDOM` 会负责更新 `DOM` 来与 `React` 元素保持一致

* 将一个元素渲染为 `DOM` - 只需把它们一起传入 `ReactDOM.render()`

```html
<div id="root"></div>
```

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

* 更新已渲染的元素 - 创建新元素，使用 `ReactDOM` 重新渲染(`React` 元素是不可变对象)

* `React` 只更新它需要更新的部分 - `React` 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 `DOM` 达到预期的状态。

组件 & Props
----

组件是由元素构成的；组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

* 函数组件与 class 组件
  * 函数组件 - 接收唯一带有数据的 `“props”`（代表属性）对象与并返回一个 React 元素
  * class 组件，一般实现方式 `extends React.Component`
* 渲染组件 - 将 `JSX` 所接收的属性封装为 `props` 对象传递给组件

* Props 的只读性 - 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改

[demo]("./basis/component&props.js)

`State` & 生命周期
----

* `state` 允许 `React` 组件随用户操作、网络响应或者其他变化而动态更改输出内容

* `State` 的更新可能是异步的 - 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用

* `State` 的更新会被合并(不是覆盖) - 调用 `setState()` 的时候，`React` 会把你提供的对象`浅合并`到当前的 `state`

* [生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

[demo]("./basis/state&lifecycle.js)

事件处理
----

* React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同
  * React 事件的命名采用小驼峰式（camelCase），而不是纯小写
  * 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
  * 不能通过返回 false 的方式阻止默认行为

  ```html
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  <!-- => -->
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }

    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```

* 向事件处理程序传递参数

```html reactjs
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

* 自定义组件绑定事件 - 点击时不会执行，是作为 props 的一个属性传递给子组件

条件渲染
----

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI

* JSX 中内联条件渲染的方法 - 通过花括号包裹代码，可以在 JSX 中嵌入任何表达式
  * 与运算符 &&
  * 三目运算符
* 与运算符 &&

```js
<div>
  <h1>Hello!</h1>
  {
    unreadMessages.length > 0 &&
    <h2>
      You have {unreadMessages.length} unread messages.
    </h2>
  }
</div>

// 在 JavaScript 中, true && expression 总是会返回 expression, 而 false && expression 总是会返回 false
```

* 三目运算符 - 使用 JavaScript 中的三目运算符 condition ? true : false
* 阻止组件渲染 - render 方法直接返回 null，而不进行任何渲染, 并不会影响组件的生命周期

列表 & Key
----

* 渲染多个组件

```js
// 获取组件列表
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

//直接插入到元素中
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

* 基础列表组件 - 每个列表元素需分配一个 key 属性
* key - key 帮助 React 识别哪些元素改变了，比如被添加或删除
* 用 key 提取组件 - 元素的 key 只有放在就近的数组上下文中才有意义
* key 只是在兄弟节点之间必须唯一 - key 会传递信息给 React ，但不会传递给你的组件,即 props.key 无值
* 在 JSX 中嵌入 map()

```js
<ul>
  {
    numbers.map(
      (number) => <ListItem key={number.toString()}value={number} />
    )
  }
</ul>
```

表单
----

表单元素通常会保持一些内部的 state

* 受控组件

  在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state

  在 React 中，可变状态（mutable state）通常保存
  在组件的 state 属性中，并且只能通过使用 setState()来更新

  把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”

* textarea 标签 - 在 React 中，`<textarea>` 使用 value 属性代替

* select 标签 - React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性

* 处理多个输入 - 当需要处理多个 input 元素时，可以给每个元素添加 name 属性，让处理函数根据 `event.target.name` 的值选择要执行的操作

* 受控输入空值 - 在受控组件上指定 value 的 prop 可以防止用户更改输入

* 受控组件的替代品 - 非受控组件

* 成熟的解决方案 - [Formik](https://jaredpalmer.com/formik/docs/overview) - 也是建立在受控组件和管理 state 的基础之上

状态提升
----

通常，多个组件需要反映相同的变化数据，将共享状态提升到最近的共同父组件中去

* 在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”
* 如果某些数据可以由 props 或 state 推导得出，那么它就不应该存在于 state 中

组合 vs 继承
----

React 有十分强大的组合模式

* 包含关系

  有些组件无法提前知晓它们子组件的具体内容,使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中

Thinking In React
----

* 将设计好的 UI 划分为组件层级
* 用 React 创建一个静态版本
* 确定 UI state 的最小（且完整）表示
* 确定 state 放置的位置
* 添加反向数据流

无障碍
----

代码分割
----

* ...

* import() - 在应用中引入代码分割的最佳方式是通过动态 import() 语法
  
  ```js
  import("./math").then(math => {
    console.log(math.add(16, 26));
  });
  ```

* React.lazy

  React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）

  React.lazy 和 Suspense 技术还不支持服务端渲染。想要在使用服务端渲染的应用中使用，可使用库 Loadable Components

  ```js
  const OtherComponent = React.lazy(() => import('./OtherComponent'));

  function MyComponent() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    );
  }
  // fallback 属性接受任何在组件加载过程中你想展示的 React 元素
  // 多个懒加载组件
  <Suspense fallback={<div>Loading...</div>}>
    <section>
      <OtherComponent />
      <AnotherComponent />
    </section>
  </Suspense>
  ```

context
----

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言

需谨慎使用，因为这会使得组件的复用性变差

如果只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案

* `替代方案:`
  * 传递组件自身(组件组合)
  * 为子组件（children）封装多个单独的“接口（slots）

  ```js
  return (
      <PageLayout
        topBar={topBar}
        content={content}
      />
    );
  ```

  * render props

* API
  * React.createContext - 组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值

  ```js
  const MyContext = React.createContext(defaultValue);
  ```

  * Context.Provider

  ```js
  <MyContext.Provider value={/* 某个值 */}>
  ```

  Provider 接收一个 value 属性，传递给消费组件,多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据,当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染

  * Class.contextType

  ```js
  class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
      let value = this.context;
      /* 基于这个值进行渲染工作 */
    }
  }
  ```

  挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象,能使用 this.context 来消费最近 Context 上的那个值。可以在任何生命周期中访问到它，包括 render 函数中.

  * Context.Consumer

  ```js
  <MyContext.Consumer>
    {value => /* 基于 context 值进行渲染*/}
  </MyContext.Consumer>
  ```

  函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值

  * Context.displayName

  ```js
  const MyContext = React.createContext(/* some value */);
  MyContext.displayName = 'MyDisplayName';
  ```

  context 对象接受一个名为 displayName 的 property，类型为字符串

* 示例
  * 动态 Context

React 组件生命周期
----

* 状态
  * `Mounting` - 已插入真实 `DOM`
  * `Updating` - 正在被重新渲染
  * `Unmounting` - 已移出真实 `DOM`

* 生命周期的方法
  * `componentWillMount` - 在渲染前调用,在客户端也在服务端。
  * `componentDidMount` - 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的 `DOM` 结构，可以通过`this.getDOMNode()` 来进行访问。 如果你想和其他 `JavaScript` 框架一起使用，可以在这个方法中调用 `setTimeout`, `setInterval` 或者发送 `AJAX` 请求等操作(防止异步操作阻塞UI)。
  * `componentWillReceiveProps` - 在组件接收到一个新的 `prop` (更新后)时被调用。这个方法在初始化`render` 时不会被调用。
  * `shouldComponentUpdate` - 返回一个布尔值。在组件接收到新的 `props` 或者 `state` 时被调用。在初始化时或者使用 `forceUpdate` 时不被调用。
可以在你确认不需要更新组件时使用。
  * `componentWillUpdate` - 在组件接收到新的 `props` 或者 `state` 但还没有 `render` 时被调用。在初始化时不会被调用。
  * `componentDidUpdate` - 在组件完成更新后立即调用。在初始化时不会被调用。
  * `componentWillUnmount` - 在组件从 `DOM` 中移除之前立刻被调用。

React AJAX
----

* React 组件的数据可以通过 componentDidMount 方法中的 Ajax 来获取，当从服务端获取数据时可以将数据存储在 state 中，再用 this.setState 方法重新渲染 U

* 当使用异步加载数据时，在组件卸载前使用 componentWillUnmount 来取消未完成的请求

React Refs
----

* `React` 支持一种非常特殊的属性 `Ref`，可以用来绑定到 `render()` 输出的任何组件上。
* 这个特殊的属性允许你引用 `render()` 返回的相应的支撑实例（`backing instance`）

```js
<input ref="myInput" />

var input = this.refs.myInput;
var inputValue = input.value;
var inputRect = input.getBoundingClientRect();
```

[React 工具链](./TOOLS-CHAIN.MD)
----

[react-devtools 安装](https://www.cnblogs.com/shenwh/p/12067029.html)
----

* <https://github.com/facebook/react-devtools/tree/v3>
* npm install
* cd react-devtools-3\shells\chrome
* node build.js => \unpacked
