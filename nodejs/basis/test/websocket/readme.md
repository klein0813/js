# CHAT ROOM

## 逻辑

用户可以随时更换昵称，且昵称可重复

## issue

### 如何标记用户

#### 前端

* 前端纯 js 不能获取设备的 UUID/GUID
* 可以尝试web指纹识别技术

```text
fingerprintjs2
https://github.com/Valve/fingerprintjs2

纯前端实现的浏览器指纹采集器，通过获取浏览器中所有能获取到的信息(部分通过base64转成String)，最后生成出md5，用于该用户在该设备上的唯一标识码，官方宣称准确度高达99.5%
```

#### 后端

* 使用设备的UUID/GUID 来标识用户, 同一设备登录的用户视为同一用户，限制同一设备的用户数量
标记方式：machineId + "_platform" + base64(platform)
* 潜在问题：设备重装, 设备ID会发生变化
* nodejs 安装 `npm install node-machine-id`

```js
import {machineId, machineIdSync} from 'node-machine-id';

// Asyncronous call with async/await or Promise

async function getMachineId() {
    let id = await machineId();
    ...
}

machineId().then((id) => {
    ...
})

// Syncronous call

let id = machineIdSync()
// id = c24b0fe51856497eebb6a2bfcd120247aac0d6334d670bb92e09a00ce8169365
let id = machineIdSync({original: true})
// id = 98912984-c4e9-5ceb-8000-03882a0485e4
```

[node-machine-id](https://www.npmjs.com/package/node-machine-id)

### 授权验证

### hash cookies

### cookie 不支持中文

* 加密：cookie的值　转为 Buffer，再 base64 转为字符
* 解密：unescape, 再 base64 转为 Buffer，再转为cookie的值

```js
Buffer.from(JSON.stringify(user)).toString("base64") //加密

JSON.parse(Buffer.from(unescape(s), 'base64')) //解密
```

### 添加监控脚本－－如果 server 断了，可自动尝试重连
