const http = require("http")
const options = {
  host: 'localhost',
  port: 8888,
  path: '/index.html'
}
const callback = function (res) {
  let body = ''
  res.on("data", (data) => {
    body += data
  })
  res.on("end", () => {
    console.log(body)
  })
}
let req = http.request(options, callback)
req.end()