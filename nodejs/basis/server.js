const http = require("http")
const querystring = require('querystring')
const url = require("url")
const util = require('util')
const fs = require("fs")
const router = require("./router") 
console.log(typeof process.env.npm_package_config_env)
console.log(process.env.npm_package_name)
console.log(process.env.npm_config_env)
// request.on 是异步方法

var postHTML = 
  '<html><head><meta charset="utf-8"><title>Node.js</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>'

// http.createServer((request, response) => {
//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-type': 'text/plain'})
//     // query: [Object: null prototype] { a: '1', b: '2' }
//     // let a = url.parse(request.url)
//     // query: 'a=1&b=2'

//     // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
//     console.log(1)
//     let postData = ''
//     request.on('data', function(chunk){    
//         postData += chunk;
//         console.log(-1)
//     })
//     console.log(2)
 
//     // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
//     request.on('end', function(){
//         console.log(-2)
//         postData = querystring.parse(postData);
//         response.end(util.inspect(postData));
//     })
//     console.log(postData)
//     console.log(3)
//     router.route(request.url, request.method)

//     // response.end("Hello World!")
// }).listen(8888)


// const server = function server (req, res) {
//     console.log(12)
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'})
//     let body = ''
//     req.on("data", (chunk) => {
//         body += chunk
//     })

//     req.on("end", () => {
//         body = querystring.parse(body)

//         if (body.name && body.url) {
//             res.write(util.inspect(body))
//         } else {
//             res.write(postHTML)
//         }
//         res.end()
//     })
// }

const server = (req, res) => {
    // 解析请求，包括文件名
    var pathname = url.parse(req.url).pathname;

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substr(1), (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("File not found")
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.write(data.toString())
        }
        res.end()
    })
}
http.createServer(server).listen(8888)
console.log('Server running at http://127.0.0.1:8888/')

// 分析Node.js 的 HTTP 服务器：

// 第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
// 接下来我们调用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。
