const url = require("url")

function route (pathname, method) {
    const query = url.parse(pathname, true)
    console.log(JSON.stringify(query))
    console.log("访问路径是：" + pathname)
    console.log("访问方法是：" + method)
}

module.exports.route = route