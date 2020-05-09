POINT
====
* router.push(location)===window.history.pushState
```
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
* router.replace(location)===window.history.replaceState
* router.go(n)===window.history.go
```
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
// 前进 3 步记录
router.go(3)
```