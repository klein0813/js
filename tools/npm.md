# NPM

## 常见命令

* npm init - 初始化项目，生成一个pakeage.json文件
  * init 时的参数

    ```text
      package name:                     项目名
      version:                          版本号
      description:                      项目的描述
      entry point:                      项目的入口文件
      test command:                     项目启动的时，用命令来执行脚本文件（默认为node app.js）
      git repository:                   项目的git的仓库地址
      keywirds:                         项目关键字
      author:                           项目作者
      license:                          发行项目需要的证书
    ```

* `npm install` - 根据 package.json 配置文件中的依赖配置，安装包到项目的 `node_modules` 目录中
  * `npm install(= npm i)`, 不会修改 package.json
  * `npm install -global(-global = -g)`，全局安装，安装后的包位于系统预设目录下
  * `npm install --save(--save = -S)`，安装包，并将依赖包名称添加到 package.json 文件 `dependencies(运行时依赖)` 键下
  * `npm install --save-dev(--save-dev = -D)`，安装包，并将依赖包名称添加到 package.json 文件 `devDependencies(开发时的依赖)` 键下
  * 正常使用 npm install时，会下载 dependencies 和 devDependencies 中的模块，当使用 `npm install --production` 或者注明 NODE_ENV 变量值为 production 时，只会下载 dependencies 中的模块

* `npm run script` - 执行 package.json 文件中，定义在字段 `script` 中的一个自定义的脚本命令(属性)
  * `&` 并行执行顺序，同时执行
  * `&&` 继发顺序，执行前面之后才可以执行后面
  * npm 脚本自带两个顺序钩子，`pre`' 和 `post`

    ```shell
      # "predev":"node test_one.js",
      # "dev":"node test_two.js",
      # "postdev":"node test_three.js"

      # 当执行 npm run dev 的时候默认就会执行

      npm run predev && npm run dev && npm run postdev
    ```

  * 获取当前正在运行的脚本名称 - npm 提供一个 `npm_lifecycle_event` 变量， 返回当前正在运行的脚本名称，可以配合顺序钩子使用

    ```js
      // npm run dev

      const target = process.env.npm_lifecycle_event;

      if(target === 'predev'){
        console.log('the process is predev')  
      }
      if(target === 'dev'){
        console.log('the process is dev')
      }
      if(target === 'postdev'){
        console.log('this process is postdev')
      }
    ```

  * 几个命令简写
    * `npm start === npm run start`
    * `npm stop === npm run stop`
    * `npm test === npm run test`
    * `npm restart === npm run stop && npm run restart && npm run start`
  
  * 使用 package.json 内部变量 - 借助 `npm_package_` 前缀

    ```js
      // package.json:
      {
        "name":"zzpzds",
        "script":"node test.js"
      }

      // test.js:
      console.log(process.env.npm_package_name) //zzpzds
    ```

## pakeage.json

```json
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "webpack demo",
    "main": "index.js",                                       //  项目的入口文件
    "scripts": {                                            //  npm提供给我们运行shell命令的入口
      "test": "node app.js"
    },
    "repository": {
      "type": "git",
      "url": "git+ssh"://git@github.com/klein0813/js.git
    },
    "keywords": [
      "webpack"
    ],
    "author": "klein",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/klein0813/js/issues"
    },
    "homepage": "https://github.com/klein0813/js#readme",    //  项目主页的网址
    "devDependencies": {                                   // 项目开发时所需依赖
      "webpack": "^4.43.0"
    },
    // dependencies:                     // 项目运行时必要依赖，
    // peerDependencies:                 // 针对特定版本开发
    // files:                            // 将软件包作为依赖项安装时要包含的条目
  }
```

## package-lock.json

* 由来

  `package.json` 文件只记录通过 `npm install` 方式安装的模块信息，而这些模块所依赖的其他子模块的信息不会记录；这种向新兼容依赖下载最新库包的时候都没有问题，可是因为 npm 是开源世界，各库包的版本语义可能并不相同，有的库包开发者并不遵循严格原则：相同大版本号的同一个库包，其接口符合兼容要求

* `package-lock.json` 文件锁定所有模块的版本号，包括主模块和所有依赖子模块
* 当执行 `npm install` 时， `node` 从 `package.json` 文件读取模块名，从 `package-lock.json` 文件中获取版本号，然后下载更新
