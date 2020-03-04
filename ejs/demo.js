'use strict';

// 标签
let ejs = require('ejs');
let people = ['geddy&', 'neil', 'alex'];
let html1 = ejs.render('<% console.log(people.join(", ")); %>', {people: people});
let html2 = ejs.render('<%= people.join(", "); %>', {people: people});
let html3 = ejs.render('<%- people.join(", "); %>', {people: people});
console.log(html1) // 纯 JS
console.log(html2) // 特殊字符转义后的HTML
console.log(html3) // 原始 HTML

// ejs.renderFile("./index.ejs", {name:'wzz'}, (err, str) => {
//     console.log(err)
//     console.log(str)
// })

// async function renderFile () {
//     let str = await ejs.renderFile("./index.ejs", {name:'wzz'})

//     console.log(str)
// }
// renderFile()

// let tt = ejs.renderFile("./index.ejs", {name:'wzz'}, {async: false})
// console.log(tt)
/**
 * Promise {
  '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <title>Document</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '  wzz\n' +
    '</body>\n' +
    '</html>'
}
 */

let str = "Hello <%= include('./views/index.ejs', {name: name}); %>",
      fn = ejs.compile(str, {client: true});

const t = fn({name: 'John'}, null, function(path, d){ // include callback
  // path -> 'file'
  // d -> {person: 'John'}
  // Put your code here
  // Return the contents of file as a string
});
console.log(t)
