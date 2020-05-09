var fs = require("fs")
var rs = fs.createReadStream("input.txt")
var data = ''

rs.on('data', (chunk) => {
    data += chunk
})

rs.on('end', () => {
    console.log(data)
    console.log("数据读取完成")
})

