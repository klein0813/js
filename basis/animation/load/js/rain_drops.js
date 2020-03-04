function createCircle() {
  let circle = document.createElement("div")
  circle.classList.add('circle')
  circle.style.top = Math.random() * innerHeight + 'px'
  circle.style.left = Math.random() * innerWidth + 'px'

  document.getElementById("app").appendChild(circle)

  setTimeout(()=>{
    circle.remove()
  }, 3000)
}

setInterval(()=>{
  createCircle()
}, 100)
