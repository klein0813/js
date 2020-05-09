var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err)
});

function add (value, key, field='', callback=(res)=>{}) {
    if (key.lastIndexOf("_set") > -1) {
        if (typeof field === "function") {
            callback = field
        }
        client.SADD(key, value, (err, reply) => {
            if (err) {
                console.error("err", err)
            }
            callback && callback(!!reply)
        });
    } else if (key.lastIndexOf("_hash") > -1) {
        client.HSET(key, field, value, (err, reply) => {
            if (err) {
                console.error("err", err)
            }
            console.log(reply)
            callback && callback(!!reply)
        });
    }
}

function remove (value, key, callback=(res)=>{}) {
    client.SREM(key, value, (err, reply) => {
        if (err) {
            console.error("err", err)
        }
        callback && callback(!!reply)
    });
}

function get (key, field=0, callback=(res)=>{}) {
    if (key.lastIndexOf("_set") > -1) {
        if (typeof field === "function") {
            callback = field
        }
        client.SMEMBERS(key, (err, replies) => {
            callback && callback(replies)
        })
    } else if (key.lastIndexOf("_hash") > -1) {
        client.HGET(key, field, (err, reply) => {
            if (err) {
                console.error("err", err)
            }
            callback && callback(reply)
        });
    }
}

// function get (key, field=0, callback=(res)=>{}) {
//     if (key.lastIndexOf("_set")) {

//     } else if (key.lastIndexOf("_hash")) {
//         client.HGET(key, field, (err, reply) => {
//             if (err) {
//                 console.error("err", err)
//             }
//             callback && callback(reply)
//         });
//     }
// }

// function remove (value, key="user_id_set") {
//     return new Promise((resolve) => client.SREM(key, value, (err, reply) => {
//         if (err) {
//             console.error("err", err);
//         }
//         resolve(reply)
//     }))
// }


// async function isExist (value, key="user_id_set") {
//     const res = await client.SISMEMBER(key, value, (err, reply) => {
//         if (err) {
//             //console.error(err);
//         }
//         return reply
//     });
//     return res;
// }

function isExist (value, key, field='', callback=(res)=>{}) {
    if (key.lastIndexOf("_set") > -1) {
        if (typeof field === "function") {
            callback = field
        }
        client.SISMEMBER(key, value, (err, reply) => {
            if (err) {
                console.error("err", err);
            }
            callback && callback(!!reply)
        });
    } else if (key.lastIndexOf("_hash") > -1) {
        client.HEXISTS(key, field, (err, reply) => {
            console.log(typeof key, typeof field, key, field)
            if (err) {
                console.error("err", err)
            }
            callback && callback(!!reply)
        });
    }
}

// const methodCallBack = (err, reply, callback) => {
//     if (err) {
//         console.error("err", err);
//     }
//     callback && callback(!!reply)
// }

// function isExist (value, key="user_id_set") {
//     return new Promise((resolve) => client.SISMEMBER(key, value, (err, reply) => {
//         if (err) {
//             //console.error(err);
//         }
//         resolve(!!reply)
//     })).then((res) => {
//         //console.log(res)
//         return res
//     })
// }

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     //console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         //console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });
// client.get("string key", redis.print);


// client.sadd("user_id_set", "sfgs", redis.print)
// client.sadd(["user_id_set", "bwrw"], redis.print)
// client.SMEMBERS("fingerprint_set", (err, replies) => {
//     console.log(replies + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     // client.quit();
// })
// getAll("fingerprint_set", (res) => {
//     console.log(res)
// })
// //console.log(client.SMEMBERS("user_id_set"))
// isExist('ert', "user_id_set", (res) => {
//     console.log(res)
// })
// remove('sfs').then((res) => {
//     //console.log(res)
// })
// removeUserId("bwrw")

// client.hset("hash key", "hashtest 1", "some value1", redis.print);
// client.hset("hash key", "hashtest 2", "some value2", redis.print);
// client.hkeys("hash key", function (err, replies) {
//     //console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         //console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });
module.exports = {
    add,
    remove,
    isExist,
    get
}