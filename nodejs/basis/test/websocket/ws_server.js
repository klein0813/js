const websocket = require("ws")
const util = require("./utils/util")
const redis = require("redis")
const redisClient = redis.createClient();

let wsServer = websocket.Server
let wss = new wsServer({port: 8888})

wss.on("connection", (ws) => {
    let userid = util.getCookieByKey(ws.upgradeReq, "userid");
    let data = {
        type: 'enter',
        userId: userid,
        message: "加入聊天室",
        names: names,
    }
    ws.on("message", (msg) => {
        console.log("received: " + msg.toString())
        data.type = "chat"
        data.message = msg.toString()
        broadcast(data, ws)
    })
    broadcast(data, ws)
})

broadcast = (data, ws) => {
    wss.clients.forEach((client) => {
        if (data.type === "enter" && client === ws) {
            data.message = "welcome to here"
        }
        client.send(JSON.stringify(data))
    })
}
