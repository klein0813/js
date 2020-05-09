const userController = require("./userController")
const util = require("../utils/util")

function index (req, res) {
    res.sendFile(util.getPublicPath() + "index.html")
}

module.exports = {
    index: index,
    login: userController.login,
    fingerprintCreate: userController.fingerprintCreate
}