JQUERY
====

basis
----

* 介绍
  * jQuery是一个JavaScript函数库。
  * jQuery是一个轻量级的"写的少，做的多"的JavaScript库。
  * jQuery库包含以下功能：
    * HTML 元素选取
    * HTML 元素操作
    * CSS 操作
    * HTML 事件函数
    * JavaScript 特效和动画
    * HTML DOM 遍历和修改
    * AJAX
    * Utilities

提示： 除此之外，Jquery还提供了大量的插件

* jQuery 语法

  * 基础语法： `$(selector).action()`
  * 美元符号定义 `jQuery`
  * 选择符（`selector`）"查询"和"查找" `HTML` 元素 `jQuery` 的 `action()` 执行对元素的操作

* jQuery 选择器

|语法|描述|
|:---|:-------|
|$("p")|选取所有 &lt;p&gt; 元素|
|$("#test")|#id 选择器|
|$(".test")|.class 选择器|
|$("*")|选取所有元素|
|$(this)|选取当前 HTML 元素|
|$("p.intro")|选取 class 为 intro 的 &lt;p&gt; 元素|
|$("p:first")|选取第一个 &lt;p&gt; 元素|
|$("ul li:first")|选取第一个 &lt;ul&gt; 元素的第一个 &lt;li&gt; 元素|
|$("ul li:first-child")|选取每个 &lt;ul&gt; 元素的第一个 &lt;li&gt; 元素|
|$("[href]")|选取带有 href 属性的元素|
|$("a[target='_blank']")|选取所有 target 属性值等于 "_blank" 的 &lt;a&gt; 元素|
|$("a[target!='_blank']")|选取所有 target 属性值不等于 "_blank" 的 &lt;a&gt; 元素|
|$(":button")|选取所有 type="button" 的 &lt;input&gt; 元素 和 &lt;button&gt; 元素|
|$("tr:even")|选取偶数位置的 &lt;tr&gt; 元素|
|$("tr:odd")|选取奇数位置的 &lt;tr&gt; 元素|

* jQuery 常见 DOM 事件：

|鼠标事件|键盘事件|表单事件|文档/窗口事件|
|:-|:-|:-|:-|
|click - 点击|keypress - 键按下的过程|submit - 提交表单|.on('load',(fn)) - 加载完成时运行
|dblclick - 双击|keydown - 键被按下|change - 表单元素的值改变时|resize - 调整浏览器窗口大小
|mouseenter - 鼠标指针离开|keyup - 键被松开|focus - 获得焦点|scroll - 滚动
|mouseleave - 按下鼠标||blur - 失去焦点|.on('unload',(fn)|
|mouseup - 松开鼠标|
|hover - 模拟光标悬停|

* 事件方法语法

```js
$("p").click(function(){
    // 动作触发后执行的代码!!
});
```

```js
$(document).ready(function(){
    // 执行代码
});
// 等价于 =>
$(function(){
    // 执行代码
});
```

jQuery 效果
----

隐藏、显示、切换，滑动，淡入淡出，以及动画

* 隐藏和显示

  * 语法

  ```js
  $(selector).hide(speed,callback); // 隐藏
  $(selector).show(speed,callback); // 显示
  $(selector).toggle(speed,callback); // 切换 hide() 和 show() 方法

  // 可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。

  // 可选的 callback 参数是隐藏或显示完成后所执行的函数名称
  ```

  * 实例

  ```js
  $(document).ready(function(){
    $(".hidebtn").click(function(){
      $("div").hide(1000,"linear",function(){
        alert("Hide() 方法已完成!");
      });
    });
  });

  // 第二个参数是一个字符串，表示过渡使用哪种缓动函数。（jQuery自身提供"linear" 和 "swing"，其他可以使用相关的插件
  ```

* 淡入淡出

  * 语法

  ```js
  $(selector).fadeIn(speed,callback); // 淡入已隐藏的元素
  $(selector).fadeOut(speed,callback);  // 淡出可见元素
  $(selector).fadeToggle(speed,callback);  // 在 fadeIn() 与 fadeOut() 方法之间进行切换
  $(selector).fadeTo(speed,opacity,callback); // 允许渐变为给定的不透明度（值介于 0 与 1 之间）
  ```

* 滑动

  * 语法

  ```js
  $(selector).slideDown(speed,callback);  // 用于向下滑动元素
  $(selector).slideUp(speed,callback);  // 用于向上滑动元素
  $(selector).slideToggle(speed,callback);  // 可以在 slideDown() 与 slideUp() 方法之间进行切换
  ```

* 动画

  * 语法

  ```js
  $(selector).animate({params},speed,callback);

  // 必需的 params 参数定义形成动画的 CSS 属性
  // 默认情况下，所有 HTML 元素都有一个静态位置，且无法移动。
  // 如需对位置进行操作，要记得首先把元素的 CSS position 属性设置为 relative、fixed 或 absolute！
  ```

  * 实例

  ```js
  $(function(){
    $("button").click(function(){
      $("div").animate({
        left:'250px',
        height:'toggle',
        width:'+=150px'
      });
    });
  });
  // 可以把属性的动画值设置为 "show"、"hide" 或 "toggle"：

  // 当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left

  // 如果需要生成颜色动画，您需要从 jquery.com 下载 颜色动画 插件

  // 可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 += 或 -=
  ```

  * 停止动画

    * 语法

    ```js
    $(selector).stop(stopAll,goToEnd);

    // 可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

    // 可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。

    // 因此，默认地，stop() 会清除在被选元素上指定的当前动画
    ```

* Callback 方法

Callback 函数在当前动画 100% 完成之后执行

* 链(Chaining)

  * 通过 jQuery，可以把动作/方法链接在一起。

  * Chaining 允许我们在一条语句中运行多个 jQuery 方法（在相同的元素上）。

  * 实例

  ```js
  $("#p1").css("color","red").slideUp(2000).slideDown(2000);
  ```

HTML
----

* 获取内容
  * `text()` - 设置或返回所选元素的文本内容
  * `html()` - 设置或返回所选元素的内容（包括 HTML 标记）
  * `val()` - 设置或返回表单字段的值
  * 实例

  ```js
  $("#btn1").click(function(){
    alert("Text: " + $("#test").text());
  });
  $("#btn2").click(function(){
    alert("HTML: " + $(this).html());
  });
  ```

* 设置内容
  
  ```js
  $("#btn1").click(function(){
    $("#test1").text("Hello world!");
  });

  $("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
  });

  $("#btn3").click(function(){
    $("#test3").val("RUNOOB");
  });
  ```

* `text(), html(), val()` 回调函数 - 两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回所希望的字符串

  ```js
  $("#btn1").click(function(){
    $("#test1").text(function(i,origText){
        return "旧文本: " + origText + " 新文本: Hello world! (index: " + i + ")";
    });
  });
  ```

* 获取属性 - `attr()`
  
  ```js
  $("button").click(function(){
    alert($("#runoob").attr("href"));
  })
  ```

* 设置属性 - `attr()`

  ```js
  $("button").click(function(){
    $("#runoob").attr({
        "href" : "http://www.runoob.com/jquery",
        "title" : "jQuery 教程"
    });
  });

  // attr() 方法也允许同时设置多个属性
  ```

* `attr()` 回调函数 - 两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回所希望的字符串

  ```js
  $("button").click(function(){
  $("#runoob").attr("href", function(i,origValue){
      return origValue + "/jquery";
    });
  });
  ```

* 添加元素
  * `append()` - 在被选元素的结尾插入内容
  * `prepend()` - 在被选元素的开头插入内容
  * `after()` - 在被选元素之后插入内容
  * `before()` - 在被选元素之前插入内容
  * 这四个方法插入内容可为：`文本/HTML/新元素`
  * 实例 - `append(),prepend()` - 插入的内容`在被选元素中`

  ```js
  $("p").append(" <b>追加文本</b>。");
  $("p").prepend("在开头追加文本");
  ```

  * 实例 - `append(),prepend()` - 插入的内容`在被选元素外`

  ```js
  $("img").after("<i>之后</i>");
  $("img").before("在前面添加文本");
  ```

* 删除元素
  * `remove()` - 删除被选元素（及其子元素） - 删除 - 可接受一个参数，允许对被删元素进行过滤
  * `empty()` - 删除被选元素中所有子元素 - 清空
  * 实例

  ```js
  $("#div1").remove();
  $("p").remove(".italic");
  $("#div1").empty();
  ```

* 获取并设置 `CSS` 类
  * `addClass()` - 向被选元素添加一个或多个类
  * `removeClass()` - 从被选元素删除一个或多个类
  * `toggleClass()` - 对被选元素进行添加/删除类的切换操作
  * `css()` - 设置或返回样式属性
  * 实例

  ```js
  // .blue {color:blue;}
  $("button").click(function(){
    $("h1,h2,p").addClass("important blue");
    $("h1,h2,p").removeClass("blue");
    $("h1,h2,p").toggleClass("blue");
  });
  ```

  * `css()` 方法

  ```js
  css("propertyname"); // 返回指定的 CSS 属性的值
  $("p").css("background-color");

  css("propertyname","value"); // 设置 CSS 属性
  $("p").css("background-color","yellow");
  
  css({"propertyname":"value","propertyname":"value",...}); // 设置多个 CSS 属性
  $("p").css({"background-color":"yellow","font-size":"200%"});
  ```

  * 实例

  ```js
  $("p").css("background-color");
  ```

* 尺寸

  * `width()`
  * `height()`
  * `innerWidth()`
  * `innerHeight()`
  * `outerWidth()`
  * `outerHeight()`

  ![尺寸](./assert/image/img_jquerydim.gif)

遍历
----

* 遍历 - 祖先
  * `parent()` - 返回每个被选元素的直接父元素
  * `parents()` - 返回所有被选元素的所有祖先
  * `parentsUntil()` - 返回介于两个给定元素之间的所有祖先元素

  ```js
  $("span").parent().css({"border":"2px solid red"});
  $("span").parents("ul"); // 返回所有 <span> 元素的所有祖先，并且它是 <ul> 元素
  $("span").parentsUntil("div");
  // 返回介于 <span> 与 <div> 元素之间的所有祖先元素
  ```

* 遍历 - 后代
  * `children()` - 法返回被选元素的所有直接子元素
  * `find()` - 返回被选元素的后代元素，一路向下直到最后一个后代
  * 实例

  ```js
  $("div").children(); // 返回每个 <div> 元素的所有直接子元素
  $("div").children("p.1"); // 返回类名为 "1" 的所有 <p> 元素，并且它们是 <div> 的直接子元素
  $("div").find("span"); // 返回属于 <div> 后代的所有 <span> 元素
  ```

* 遍历 - 同胞(siblings)
  * `siblings()` - 返回被选元素的所有同胞元素
  * `next()` - 返回被选元素的下一个同胞元素
  * `nextAll()` - 返回被选元素的所有跟随的同胞元素
  * `nextUntil()` - 返回介于两个给定参数之间的所有跟随的同胞元素
  * `prev()` - 与上面的方法类似，只不过方向相反而已
  * `prevAll()`
  * `prevUntil()`

* 遍历- 过滤
  * `first()`, `last()` 和 `eq()`，它们允许您基于其在一组元素中的位置来选择一个特定的元素
  * `filter()` 和 `not()` 允许您选取匹配或不匹配某项指定标准的元素

  ```js
  // first() 方法 - 返回被选元素的首个元素
  $("div p").first(); // 选取首个 <div> 元素内部的第一个 <p> 元素
  // ast() 方法 - 返回被选元素的最后一个元素
  $("div p").last(); // 选择最后一个 <div> 元素中的最后一个 <p> 元素
  // eq() 方法 - 返回被选元素中带有指定索引号的元素
  $("p").eq(1); // 选取第二个 <p> 元素（索引号 1）
  // filter() 方法 - 不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回
  $("p").filter(".url"); // 返回带有类名 "url" 的所有 <p> 元素
  // not() 方法 - 返回不匹配标准的所有元素
  $("p").not(".url"); // 返回不带有类名 "url" 的所有 <p> 元素
  ```

AJAX
----

* `load()` 方法 - 从服务器加载数据，并把返回的数据放入被选元素中
  * 语法

  ```js
  $(selector).load(URL,data,callback);
  // 必需的 URL 参数规定您希望加载的 URL。
  // 可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。
  // 可选的 callback 参数是 load() 方法完成后所执行的函数名称。
  ```

* $.get(URL,callback);

* $.post(URL,data,callback);

* 实例

```js
$("button").click(function(){
  $.get("demo_test.php",function(data,status){
    alert("数据: " + data + "\n状态: " + status);
  });
});

$("button").click(function(){
    $.post("/try/ajax/demo_test_post.php",
    {
        name:"菜鸟教程",
        url:"http://www.runoob.com"
    },
    function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
})
```
