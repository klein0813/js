// const http = require("http")
// const url = require("url")
// const fs = require("fs")
const express = require("express")
const router = require("./router.js")
const app = express()
// const server = (req, res) => {
//     // 解析请求，包括文件名
//     var pathname = url.parse(req.url).pathname;

//     // 输出请求的文件名
//     console.log("Request for " + pathname + " received.");
//     fs.readFile(pathname.substr(1), (err, data) => {
//         if (err) {
//             res.writeHead(404, {'Content-Type': 'text/html'});
//             res.write("File not found")
//         } else {
//             if (pathname.lastIndexOf('public') > -1) {
//                 let type = pathname.substring(pathname.lastIndexOf('.') + 1)
//                 res.writeHead(200, {'Content-Type': 'text/' + type})
//             }

//             res.write(data.toString())
//         }
//         res.end()
//     })
// }
// http.createServer(server).listen(9999)
router._route(app)
app.use("/public", express.static('public'))
app.use("/", (req, res) => {
    res.send(JSON.stringify({ code: 404, message: "Page Not Found" }))
})

const server = app.listen(9999, function () {
 
    let host = server.address().address
    let port = server.address().port

    console.log("Server running at http://%s:%s", host, port)
})
