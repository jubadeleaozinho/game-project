class Enemy {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen")
    this.element = document.createElement("div")
    this.element.className = "enemy";
    this.x = 900
    this.y = 320
    this.width = 60
    this.height = 150
    this.image = "./assets/IMAGES/policeman.gif"

    this.element.style.position = "absolute"
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.top = `${this.y}px`
    this.element.style.left = `${this.x}px`

    this.element.style.backgroundImage = `url("${this.image}")`
    this.element.style.backgroundPosition = `center`
    this.element.style.backgroundSize = `cover`

    this.gameScreen.appendChild(this.element)

    this.speed = Math.floor((Math.random() * 6) + 2)

  }

  enemyMove() {
    this.x -= this.speed
    this.element.style.left = `${this.x}px`
  }

 
}

