class Player {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen")
    this.element = document.createElement("div")
    this.x = 0
    this.y = 300
    this.width = 150
    this.height = 150
    this.image = "./assets/IMAGES/GTDOGGO.png"

    this.element.style.position = "absolute"
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.top = `${this.y}px`
    this.element.style.left = `${this.x}px`

    this.element.style.backgroundImage = `url("${this.image}")`
    this.element.style.backgroundPosition = `center`
    this.element.style.backgroundSize = `cover`

    this.gameScreen.appendChild(this.element)

  }

  jump() {
    if (this.y >= 10) {
      this.y -= 20
      this.element.style.top = `${this.y}px`
    }
  }
  
  }




