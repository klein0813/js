# Webpack

* 本质上，webpack 是一个现代 JavaScript 应用程序的`静态模块打包器`(module bundler)
* 工作方式：将项目视为一个整体，通过给定的入口（如：index.js），Webpack将从这个入口开始找到你的项目的所有依赖文件，使用 `loaders` 处理它们，最后打包为成一个或多个 bundle

## 概念

### 模块(modules)

* 在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为模块

### webpack 模块

> webpack 模块能够以各种方式表达它们的依赖关系，几个例子如下：

* ES2015 `import` 语句
* CommonJS `require()` 语句
* AMD `define` 和 `require` 语句
* css/sass/less 文件中的 `@import` 语句。
* 样式(`url(...)`)或 HTML 文件(`<img src=...>`)中的图片链接(image url)

### 支持的模块类型

webpack 通过 loader 可以支持各种语言和预处理器编写模块。loader 描述了 webpack 如何处理 非 `JavaScript(non-JavaScript) _模块_`，并且在 bundle 中引入这些依赖

loaders 列表 <https://www.webpackjs.com/loaders/>

## 入门 demo

### 前期准备

  1. `npm init` - 初始化项目，生成一个 pakeage.json文件
  2. `npm install --save-dev webpack` - 安装 Webpack 依赖包
  3. 创建文件夹 `public`(index.html，用来存放之后供浏览器读取的文件（包括使用 webpack 打包生成的 js 文件以及一个 index.html 文件）)`、app`(Greeter.js、main.js，用来存放原始数据和将写的 JavaScript 模块)

### 使用 Webpack

* webpack 可以在终端中使用

  ```shell
    # {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
    # {destination for bundled file}处填写打包文件的存放路径
    # 填写路径的时候不用添加{}
    # webpack {entry file} -o {destination for bundled file} --mode development
    # --mode development 可选，还可为production，默认是 development

    node_modules/.bin/webpack app/main.js -o public/bundle.js
  ```

  * 缺点：在终端中进行复杂的操作，是不太方便且容易出错的

  * 打包时控制台输出字段的含义如下

    ```text
      参数值:
        Version:      webpack版本
        time:         此次打包所花费的时间

      列表信息
        Asset:        打包此次生成的文件
        Size:         此次生成文件的大小
        Chunks:       此次打包的分块
        chunk Names:  此次打包的名称
    ```

* 通过配置文件来使用 Webpack

  * 定义一个配置文件，这个配置文件其实是一个简单的JavaScript模块(例如: [`webpack.config.js`](../../demo/webpack/webpack.config.js))，可以把所有的与打包相关的信息放在里面

  * 执行 `webpack --mode production`

* 更快捷的执行打包任务 - `npm` 引导任务执行

  * `package.json -> scripts` 中添加属性

> 生成Source Maps（使调试更容易）

* 找到出错了的地方，对应的你写的代码的位置
* `webpack.config.js` 中添加 `devtool` 选项，选项可为
  * `source-map`，在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的 source map，但是它会减慢打包速度
  * `cheap-module-source-map`,在一个单独的文件中生成一个不带列映射的 map,提高了打包速度,是使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便
  * `eval-source-map`,使用eval打包源文件模块，在同一个文件中生成干净的完整的 source map,这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，`在生产阶段则一定不要启用这个选项`
  * `cheap-module-eval-source-map`,兼并 `cheap-module-source-map` 和 `eval-source-map`

> 使用 webpack 构建本地服务器

* 让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果
* 在 webpack 中进行配置之前需要单独安装它作为项目依赖
  
  ```shell
    npm install --save-dev webpack-dev-server
  ```

* `webpack.config.js` 中添加 `devserver` 选项，选项可为
  * `contentBase` - 设置提供给服务器的目录，默认是根目录
  * `port` - 设置监听端口，默认 `8080`
  * `inline` - 设置为 `true` 时，当源文件改变时会自动刷新页面
  * [更多](https://www.webpackjs.com/configuration/dev-server/)

* `package.json -> scripts` 中添加 `"server": "webpack-dev-server --open"`

> `Loaders`

* 通过使用不同的 loader，webpack 有能力调用外部的脚本或工具，实现对不同格式的文件的处理

* `loaders` 配置
  * `test` - 一个用以匹配 loaders 所处理文件的拓展名的正则表达式（必须）
  * `loader` - loader 的名称（必须）
  * `include/exclude` - 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
  * `query` - 为 loaders 提供额外的设置选项（可选）

* [`babel`](../babel.md)

* 配置示例

  ```js
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env", "@babel/react"]
            }
          },
          exclude: /node_modules/
        }
      ]
    }
  ```

* demo install
  * `npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react`
  * `npm install --save react react-dom`

* babel 配置抽离，webpack 会自动调用 `.babelrc` 里的 babel 配置选项

* 一切皆模块 - 把所有的文件都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loader都可以被处理

* css loader
  * `css-loader` 使能够使用类似 `@import` 和 `url(...)` 的方法实现 `require()` 的功能
  * `style-loader` 将所有的计算后的样式加入页面中
  * `npm install --save-dev style-loader css-loader`
  * 通常情况下，css 会和 js打包到同一个文件中，并不会打包为一个单独的css文件
  * `note`: `在配置 loader 时，style-loader　应在 css-loader 之前`，或，`require('!style-loader!css-loader!./index.css')` 这样引入

* `css module`
  * `CSS modules` 的技术意在把 JS 的模块化思想带入 CSS 中来，通过 CSS 模块，所有的类名，动画名默认都只作用于当前模块
  * 配置

    ```js
      {
        loader: 'css-loader',
        options: {
          modules: true, // 指定启用css modules
          localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
        }
      }
    ```

* `CSS 预处理器`

TODO

> `插件（Plugins）`
> 缓存

vendor.js, 理论上可以来源于任何东西, 在 webpack 的使用场景而言，它通常存放那种不怎么改动的代码，第三方库之类的
