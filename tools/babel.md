# Babel

`babel` - 是编写下一代 JavaScript 的编译器

## 主要特性

* 支持 `ES2015+`
* 支持 `JSX` 和 `React`
* 支持用户插件

## 功能简述

babel 的功能在于`代码转译`，具体一点，即将目标代码转译为能够符合期望语法规范的代码。在转译的过程中，babel 内部经历了 `解析 - 转换 - 生成` 三个步骤

* `babel-loader` 是一个 npm 包，它使得 webpack 可以通过 babel 转译 JavaScript 代码
* `babel-core` 负责`解析`
* 具体的`转换`和`生成`步骤则交给各种插件（`plugin`）和预设（`preset`）来完成
