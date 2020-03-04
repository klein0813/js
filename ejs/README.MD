EJS
====

高效的嵌入式 JavaScript 模板引擎

引入
----

* 前端
  * `<script src="ejs.js"></script>`

* 后端
  * `npm install ejs`

* ejs.render

* `function render(template: string, data?: Data, opts?: Options & { async: false }): string;`
* `function render(template: string, data: Data | undefined, opts: Options & { async: true }): Promise<string>;`
* `function render(template: string, data: Data | undefined, opts: Options & { async?: never }): string;`
* `function render(template: string, data?: Data, opts?: Options): string | Promise<string>;`

```js
ejs.renderFile("./index.ejs", {name:'wzz'}, (err, str) => {
    console.log(err, str)
})

async function renderFile () {
    let str = await ejs.renderFile("./index.ejs", {name:'wzz'})
    console.log(str)
}
renderFile()
// ejs.Data 是对象
```

EJS-with-Express
----

```js nodejs
let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {name: 'FOO'});
});
```

* [EJS-with-Express](https://github.com/mde/ejs/wiki/Using-EJS-with-Express)
* [ejs-websit](https://ejs.bootcss.com/#docs)
* [examples & ejs-2.7.4.tar.gz](https://github.com/mde/ejs)
