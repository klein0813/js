const net = require("net")

// net.Server 创建 TCP 服务器
const server = net.createServer((socket) => {
    socket.on('end', function() {
        console.log('客户端关闭连接');
    })
    socket.write('Hello World!\r\n')
    socket.pipe(socket)
})

// 监听 8888 端口
server.listen(8888, () => {
    console.log("server is listening")
})

// 当服务器调用 server.listen 绑定后会触发
server.on("listening", () => {
    console.log("server.listen 绑定成功")
})

// 当新连接创建后会被触发
server.on("connection", (socket) => {
    console.log("新连接创建后会被触发成功")
    console.log(socket.localAddress)
})

// 发生错误时触发。'close' 事件将被下列事件直接调用
server.on("error", (err) => {
    console.log("服务器关闭成功")
    console.log(err)
})

// 服务器关闭时会触发。注意，如果存在连接，这个事件不会被触发直到所有的连接关闭
server.on("close", () => {
    console.log("服务器关闭成功")
})