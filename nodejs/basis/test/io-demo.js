var fs = require("fs");

var data2 = fs.readFile('input.txt', (err, data) => {
    if (err) return console.error(err)
    console.log(data.toString())
})

var data1 = fs.readFileSync('input.txt')
console.log(data1.toString());

console.log("程序执行结束!");