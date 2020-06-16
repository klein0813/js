# WebSocket

## 简介
WebSocket是一种在单个TCP连接上进行全双工通信<a href="#1"><sup>[1]</sup></a>的协议，允许服务端主动向客户端推送数据，在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输；在HTML5<a href="#2"><sup>[2]</sup></a>中定义。

## 用于服务器与客户端之间的双工通信的现有技术
> 轮询
  * 无论传输中是否存在数据，定期向服务器发出请求
> 长轮询
  * 客户端和服务器将连接保持活动状态，直到获取某些数据或发生超时为止
> 流媒体
  * 服务器保持与客户端的连接处于打开状态并处于活动状态，直到并且直到获取了所需的数据为止。在这种情况下，可以说连接是无限打开的。流包括HTTP标头，这会增加文件大小，增加延迟。这可以被视为主要缺点
> 回发和AJAX

## 原理
* Web套接字连接是通过HTTP启动的；HTTP服务器通常将Web套接字握手<a href="#3"><sup>[3]</sup></a>解释为升级请求。
* Web套接字既可以是现有HTTP环境的补充插件，又可以提供添加Web功能所需的基础结构。
* 它依赖于更高级的全双工协议，该协议允许数据在客户端和服务器之间双向流动

## 启动步骤
* 客户端通过Web套接字握手进程建立连接。
* 该进程从客户端向服务器发送常规HTTP请求开始。
* 升级请求头。在此请求中，它通知服务器该请求是针对Web套接字连接的。
* Web套接字URL使用ws。它们还用于安全的Web套接字连接，等效于HTTP

## 优点
* 利用Web套接字的HTML5应用程序可在任何支持HTML5的网络浏览器上运行
* 通过单个连接（而不是两个）使用全双工来减少不必要的网络流量和延迟
* 通过代理和防火墙进行流传输，同时支持上游和下游通信

## 客户端 API

### WebSocket 构造函数

* `var aWebSocket = new WebSocket(url [, protocols]);`

  ```js
    var ws = new WebSocket('ws://localhost:8080');
  ```

* 返回一个 WebSocket 对象, 客户端就会与服务器进行连接

### WebSocket.readyState

* readyState属性返回实例对象的当前状态，共有四种。

  * CONNECTING：值为0，表示正在连接。
  * OPEN：值为1，表示连接成功，可以通信了。
  * CLOSING：值为2，表示连接正在关闭。
  * CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

### WebSocket.onopen

* 用于指定连接成功后的回调函数

  ```js
    ws.onopen = function () {
      ws.send('Hello Server!');
    }
  ```

* 如果要指定多个回调函数，可以使用addEventListener方法

  ```js
    ws.addEventListener('open', function (event) {
      ws.send('Hello Server!');
    });
  ```

### webSocket.onclose

* 用于指定连接关闭后的回调函数

  ```js
    ws.onclose = function(event) {
      var code = event.code;
      var reason = event.reason;
      var wasClean = event.wasClean;
      // handle close event
    };

    ws.addEventListener("close", function(event) {
      var code = event.code;
      var reason = event.reason;
      var wasClean = event.wasClean;
      // handle close event
    });
  ```

### webSocket.onmessage

* 用于指定收到服务器数据后的回调函数

  ```js
    ws.onmessage = function(event) {
      var data = event.data;
      // 处理数据
    };

    ws.addEventListener("message", function(event) {
      var data = event.data;
      // 处理数据
    });
  ```

* 服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）

  ```js
    ws.onmessage = function(event){
      if(typeof event.data === String) {
        console.log("Received data string");
      }

      if(event.data instanceof ArrayBuffer){
        var buffer = event.data;
        console.log("Received arraybuffer");
      }
    }
  ```

* 除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型

  ```js
    // 收到的是 blob 数据
    ws.binaryType = "blob";
    ws.onmessage = function(e) {
      console.log(e.data.size);
    };

    // 收到的是 ArrayBuffer 数据
    ws.binaryType = "arraybuffer";
    ws.onmessage = function(e) {
      console.log(e.data.byteLength);
    };
  ```

### webSocket.send()

* 用于向服务器发送数据
* 发送文本

  ```js
    ws.send('your message');
  ```

* 发送 Blob 对象
  
  ```js
    var file = document
      .querySelector('input[type="file"]')
      .files[0];
    ws.send(file);
  ```

* 发送 ArrayBuffer 对象
  
  ```js
    // Sending canvas ImageData as ArrayBuffer
    var img = canvas_context.getImageData(0, 0, 400, 320);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++) {
      binary[i] = img.data[i];
    }
    ws.send(binary.buffer);
  ```

### webSocket.onerror

* 用于指定报错时的回调函数

  ```js
    socket.onerror = function(event) {
      // handle error event
    };

    socket.addEventListener("error", function(event) {
      // handle error event
    });
  ```

### webSocket.bufferedAmount

* 表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束

  ```js
    var data = new ArrayBuffer(10000000);
    socket.send(data);

    if (socket.bufferedAmount === 0) {
      // 发送完毕
    } else {
      // 发送还没结束
    }
  ```

[实例](..\..\nodejs\basis\test\websocket\public\ws.html)

## 备注
[1] <a name="1">全双工通信, 又称为双向同时通信，即通信的双方可以同时发送和接收信息的信息交互方式</a><br>
[2] <a name="2">HTML5是用于开发和设计Web应用程序的强大框架。主要支柱包括Mark-up，CSS3和Javascript API</a><br>
[3] <a name="3">握手, 握手是确保服务器与其客户端同步的过程</a><br>
