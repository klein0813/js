const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const controller = require("./controller/indexController")

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const textParser = bodyParser.text({ extended: false })
function route (app) {
    app.use(cookieParser())

    app.use(/\/public\/.*.html/, (req, res) => {
        controller.index(req, res)
    })

    app.get("/index", (req, res) => {
        controller.index(req, res)
    })

    app.post("/login", urlencodedParser, async (req, res) => {
        let loginRes = await controller.login(req, res)
        if (!loginRes) {
            controller.index(req, res)
        }
    })

    app.post("/fingerprint", textParser, (req, res) => {
        controller.fingerprintCreate(req, res)
        res.send("ok")
    })
}

module.exports = { _route: route };