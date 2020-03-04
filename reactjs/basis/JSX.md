JSX
====

* <span id="jsx1">嵌入表达式</span>

```js
{
  const name = 'Josh Perez';
  const element = <h1>Hello, {name}</h1>;

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
```

* <span id="jsx2">是一个表达式</span>

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

```

* <span id="jsx3">特定属性</span>

```js
const element = <div tabIndex="0"></div>;

const element = <img src={user.avatarUrl}></img>;
```

* <span id="jsx4">使用 JSX 指定子元素</span>

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

* <span id="jsx5">JSX 防止注入攻击</span>

```js
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

* <span id="jsx6">JSX 表示对象</span>

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// => 等价于
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
// =>　注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
