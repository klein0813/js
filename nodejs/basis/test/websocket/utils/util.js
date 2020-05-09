const Cookies = require('cookies')

function getAbsoluteBasePath () {
    let lastIndex = __dirname.lastIndexOf("/utils")
    return __dirname.substring(0, lastIndex + 1)
}

function getPublicPath () {
    return getAbsoluteBasePath() + "public/"
}

function getCookieByKey (obj, key) {
    if (!obj) {
        return null
    }
    let s = ''
    if (typeof obj === 'string') {
        s = obj
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null)
        s = cookies.get(key)
    }
    if (s) {
        try {
            let decode_data = decode4Cookies(s)
            return decode_data
        } catch (e) {
            // ignore
            console.log(e);
        }
    }
    return null
}

function decode4Cookies (data) {
    if (data) {
        let decode_data = Buffer.from(unescape(data), 'base64')
        try {
            decode_data = JSON.parse(decode_data)

        } catch (e) {
            decode_data = decode_data.toString()
        }
        return decode_data
    }
    return null
}

function encode4Cookies (data) {
    if (data) {
        let typeofData = typeof data
        if (typeofData === "object") {
            data = JSON.stringify(data)
        }
        try {
            let decode_data = Buffer.from(data).toString("base64")
            return decode_data
        } catch (e) {
            console.log(e);
        }
    }
    return null
}

module.exports = {
    getAbsoluteBasePath,
    getPublicPath,
    getCookieByKey,
    encode4Cookies,
    decode4Cookies
}