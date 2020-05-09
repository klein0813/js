const net = require("net")

// console.log("worker-" + process.pid + " is working")
// process.on("message", (msg, data) => {
//     console.log(typeof data)
//     if (msg === "socket" && typeof data === "object") {
//         console.log(process.pid)
//         setTimeout(() => {
//             data.write("worker " + process.pid)
//         }, 2000)
//     }
// })

process.on("message", (msg, data) => {
    if (msg === "server" && typeof data === "object") {
        data.on("connection", (socket) => {
            socket.write("worker " + process.pid)
        })
    } else if (msg === "socket" && typeof data === "object") {
        data.write("masterWorker " + process.pid)
    }
})

// process.send("Hello World from child process " + process.pid)