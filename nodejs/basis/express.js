const express = require("express")
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use("/test/public", express.static('public'))
app.use(cookieParser())
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get("/cookie", (req, res) => {
    res.cookie('haha', 'name1=value1&name2=value2', {maxAge:10*1000,  path:'/',  httpOnly:true })
    res.end("OK")
})

app.get("/login", (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html")
})

app.post("/login", urlencodedParser, (req, res) => {
    // 输出 JSON 格式
    console.log(req.body)
    var response = {
        "name":req.body.name,
        "password":req.body.password
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

const cpuNum = require('os').cpus().length
console.log(cpuNum)

const server = app.listen(8888, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
})
