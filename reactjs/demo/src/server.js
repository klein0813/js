const WebSocket = require("ws")


function start(port = 8888) {
  const Server = WebSocket.Server
  let wss = new Server({port: port, maxPayload: 2})

  wss.on("connection", (ws) => {
    ws.send({
      type: 'prompt',
      msg: 'connected successfully'
    })
    if (wss.clients.size < 1) {
      ws.send({
        type: 'prompt',
        msg: 'please wait for a minute...'
      })
    } else {
      ws.send({
        type: 'prompt',
        msg: 'game is starting...'
      })
    }
    ws.on("message", (msg) => {
      let data = msg.toString()
      console.log("data", data)
      sendMessage({
        type: 'message',
        msg: data
      }, ws)
    })
  })
}

function sendMessage (data, ws) {
  wss.clients.forEach((client) => {
    if (client !== ws) {
      client.send(data)
    }
  })
}

module.export = {
  start: start
}
