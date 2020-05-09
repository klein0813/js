const util = require("../utils/util")
const redis = require("../redis")
const uuidv1 = require('uuid/v1');

async function login (request, response) {
    let fingerprint = util.getCookieByKey(request, "fingerprint")
    if (!fingerprint) {
        return false
    }

    await redis.isExist(fingerprint, "fingerprint_set", (res) => {
        if (!res) {
            return false
        }

        let userid = util.getCookieByKey(request, "userid")
        if (!userid) {
            let user = {
                name: request.body.name,
                password: request.body.password,
                id: uuidv1()
            }
            response.cookie('userid', util.encode4Cookies(user.id), { maxAge:7200 * 000,  path: '/',  httpOnly: true })
        }
        redis.get("users_hash", fingerprint, (res) => {
            if (!res) {
                redis.add(util.encode4Cookies(user), "users_hash", fingerprint)
            } else {
                let user = util.decode4Cookies(res)

                if (user.password !== request.body.password) {
                    response.send(JSON.stringify({ code: 200, message: "accountId is not exist or password is incorrect" }))
                }
            }
            response.sendFile(util.getPublicPath() + "/room.html")
        })
    })
    return true
}

function fingerprintCreate (req, res) {
    let body = JSON.parse(req.body)
    let value = body.value
    // console.log(value)
    redis.add(value, "fingerprint_set")
    res.cookie('fingerprint', util.encode4Cookies(value), { maxAge: 7200 * 000,  path: '/',  httpOnly: true })
}

module.exports = {
    login,
    fingerprintCreate
}