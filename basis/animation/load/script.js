const jspath = "./js/rain_drops.js"
const csspath = "./css/rain_drops.css"

let cssele =  document.createElement("link")
cssele.setAttribute("rel", "stylesheet")
cssele.setAttribute("type", "text/css")
cssele.setAttribute("href", csspath);
document.head.appendChild(cssele)

let jsele= document.createElement("script")
jsele.setAttribute("type", "text/javascript")
jsele.setAttribute("src", jspath);
document.head.appendChild(jsele)