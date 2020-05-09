// 获取 events 模块
var events = require('events')
// events 模块的 emitter 对象, EventEmitter 的核心就是事件触发与事件监听器功能的封装
var emitter = new events.EventEmitter()
// 监听器(函数)
var connectHander = () => {
    console.log('连接成功。')
    emitter.emit('data')
}
var dataHander = () => {
    console.log('数据接收成功。')
}
var connectHander1 = () => {
    console.log("connectHander1 执行成功")
}

// 将 connectHander 监听器绑定给 事件 connect
emitter.on('connect', connectHander)
emitter.on('data', dataHander)
// 将 connectHander1　添加到事件 connect 的监听器数组的尾部
emitter.addListener('connect', connectHander1)
// 触发 connect 事件
emitter.emit('connect')
console.log(emitter.listenerCount('connect'))
// 移除 connect 事件的 connectHander　监听器
emitter.removeListener('connect', connectHander1)
console.log(emitter.listenerCount('connect'))

console.log("程序执行完毕。")
