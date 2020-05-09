POINT
====
# css
* 保留tag a（链接）的样式，但不执行实际操作  
`<a href="javascript:void(0)"/>`  
# html
* 改变网址却不需要刷新页面
    * pushState<br>
    pushState方法接受三个参数，依次为：
        * state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
        * title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
        * url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
        `window.history.pushState(null,null,'download?id=1');`  
    * replaceState<br>
    `window.history.replaceState(null,null,'download?id=1');`  
# web api
_https://developer.mozilla.org/zh-CN/docs/Web_
## window.history.pushState
## window.history.replaceState
## window.onpopstate
### 概述
* 每当处于激活状态的历史记录条目发生变化时,popstate事件就会在对应window对象上触发
* popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法)
* 当网页加载时,各浏览器对popstate事件是否触发有不同的表现,Chrome 和 Safari会触发popstate事件, 而Firefox不会
### 语法
`window.onpopstate = funcRef;`
* funcRef 是个函数名.
### popstate事件
```
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数. 
history.pushState({page: 1}, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({page: 2}, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({page: 3}, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```
