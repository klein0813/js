if ("WebSocket" in window) {
    console.log("您的浏览器支持 WebSocket!");
    var ws = new WebSocket("ws://192.168.22.35:8888");
    ws.onopen = function() {
        addPTag("连接成功...", "chat-list")
        console.log("数据发送中...");
    };
    ws.onmessage = function (evt) {
        let data = JSON.parse(evt.data);
        let received_msg = ''
        if (data.type === "chat") {
            received_msg += data.name + ":\r\n" + data.message
        } else if (data.type === "enter") {
            received_msg += data.name + " " + data.message
            addPTag(data.name, "user-list")
        }
        console.log("数据已接收...");
        addPTag(received_msg, "chat-list")
    };
    ws.onclose = function() { 
        console.log("连接已关闭..."); 
    };
} else {
    console.log("您的浏览器不支持 WebSocket!");
}

function addPTag (text, className) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    var element = document.getElementsByClassName(className)[0];
    element.appendChild(para);
}

function formSubmit () {
    var input = document.getElementById('input');
    var text = input.value.trim();
    console.log('[chat] ' + text);
    if (text) {
        input.value = '';
        ws.send(text);
    }
}