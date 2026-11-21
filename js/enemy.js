class Enemy {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen")
    this.element = document.createElement("div")
    this.x = 450
    this.y = 300
    this.width = 60
    this.height = 150
    this.image = "./assets/IMAGES/policeman.png"

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

  enemyMove() {
    this.x -= 5
    this.element.style.left = `${this.x}px`
  }

 
}