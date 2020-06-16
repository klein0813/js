// Greeter.js
// var config = require('./config.json'); // webpack3.*/webpack2.*已经内置可处理JSON文件

// module.exports = function() {   // CommonJS规范
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };

// ES6 语法
import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
