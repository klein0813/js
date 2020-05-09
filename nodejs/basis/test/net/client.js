const net = require("net")
let maxConnectionCount = 10

while(--maxConnectionCount) {
    net.connect({
        port: 8888,
        host: "192.168.22.35"
    }).on("data", (data) => {
        console.log(data.toString())
    })
}

