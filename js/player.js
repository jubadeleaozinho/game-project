class Player {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen")
    this.element = document.createElement("div")
    this.x = 0
    this.y = 300
    this.width = 150
    this.height = 150
    this.image = "./assets/IMAGES/GTDOGGO.png"
    this.isJumping = false
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

    this.isJumping = true

    const startY = this.y
    const jumpHeight = 120
    const upDuration = 600
    const downDuration = 600

    const upInterval = setInterval(() => {
      this.y -= jumpHeight / (upDuration / 100)
      this.element.style.top = `${this.y}px`
    }, 100)

    setTimeout(() => {
      clearInterval(upInterval)

    const downInterval = setInterval(() => {
      this.y += jumpHeight / (downDuration / 100)
      this.element.style.top = `${this.y}px`
    }, 100)

    setTimeout(() => {
      clearInterval(downInterval)
      this.y = startY
      this.element.style.top = `{this.y}px`
      this.isJumping = false
    }, downDuration)

    }, upDuration)
  }

  }




