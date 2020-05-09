const net = require("net")

// 返回一个新的 'net.Socket'，并连接到指定的地址和端口
let client = net.connect({port: 8888, host: "192.168.22.35"}, () => {
    console.log('连接到服务器！');  
})

// 成功建立 socket 连接时触发
client.on("connect", () => {
    console.log("连接成功")
})

// 当接收到数据时触发
client.on("data", (data) => {
    console.log("接收到信息：" + data.toString())
})

// 当 socket 空闲超时时触发，仅是表明 socket 已经空闲。用户必须手动关闭连接
client.on("timeout", () => {
    console.log("socket 已空闲")
})

// 当写缓存为空得时候触发。可用来控制上传。
client.on("drain", () => {
    console.log("写缓存为空")
})

// 当 socket 完全关闭时触发。参数 had_error 是布尔值，它表示是否因为传输错误导致 socket 关闭
client.on("close", (had_error) => {
    console.log(had_error)
    console.log("socket 完全关闭")
})

// 当 socket 另一端发送 FIN 包时，触发该事件。
client.on('end', function() { 
    console.log('end: 断开与服务器的连接');
 });

client.setTimeout(100, () => {
    console.log("client.setTimeout: socket 已空闲")
})
