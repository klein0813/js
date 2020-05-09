const net = require("net")
const childProcess = require("child_process")
const cpunum = require("os").cpus().length - 1

let workers = []
for (let i = 0; i < cpunum; i++) {
    workers.push(childProcess.fork("worker.js"))
}

let server = net.createServer((socket) => {
    socket.write("Hello, every body")
})


// 2. 一个 master 监听端口， 分发客户端连接给 worker
server.listen(8888, () => {
    console.log("Listening port: 8888")
})

// let cur = 0
// server.on("connection", (socket) => {
//     workers[cur].send("socket", socket);
//     cur = (cur + 1) % cpunum
// })

const http = require('http')
const httpServer = http.createServer((req, res) => {
  // 利用setTimeout模拟处理请求时的操作耗时
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Request handled by worker-' + process.pid)
  }, 10)
}).listen(8889)


// 3. 一个 master 创建　server，　多个　worker　监听同一个端口
for (let i = 0; i < workers.length; i++) {
    workers[i].send("server", server)
    workers[i].on("exit", ((i) => {
        return () => {
            console.log("child process " +  i + " exit")
            workers[i] = childProcess.fork("worker.js")
            workers[i].send("server", server)
            console.log("child process " +  workers[i].pid + " created")
        }
    })(i))
}

masterWorker = childProcess.fork("worker.js")
server.on("connection", (socket) => {
    masterWorker.send("socket", socket)
})

// 1
// let worker = childProcess.fork("worker.js")
// worker.on("message", (msg) => {
//     console.log(msg)
//     console.log("message from worker")
// })
// worker.send("hello world")
