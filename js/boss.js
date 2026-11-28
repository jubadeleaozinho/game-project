class Boss {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen")
    this.element = document.createElement("div")
    this.element.className = "boss";
    this.x = this.gameScreen.offsetWidth
    this.y = this.gameScreen.offsetHeight - 200
    this.width = 100
    this.height = 200
    this.image = "assets/IMAGES/finalboss.gif"

    this.element.style.position = "absolute"
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.top = `${this.y}px`
    this.element.style.left = `${this.x}px`

    this.element.style.backgroundImage = `url("${this.image}")`
    this.element.style.backgroundPosition = `center`
    this.element.style.backgroundSize = `cover`

    this.gameScreen.appendChild(this.element)

    this.bossEntered = false
    this.alive = true
}

bossEnters(onDone) {
    if (this.bossEntered) return

    const targetX = this.gameScreen.offsetWidth - this.width - 100
    const speed = 30
    const intervalTime = 30

    const enterInterval = setInterval(() => {
        this.x -= speed
        this.element.style.left = `${this.x}px`

        if (this.x <= targetX) {
            clearInterval(enterInterval)
            this.x = targetX
            this.element.style.left = `${this.x}px`
            this.bossEntered = true   
            if (onDone) onDone()      
        }
    }, intervalTime)
}

bossMove() {
    const startY = this.y
    const speed = 60
    const intervalTime = 800
    const jumpHeight = 200

    const goUp = () => {
        if (!this.alive) return 
        const upInterval = setInterval(() => {
            this.y -= speed
            this.element.style.top = `${this.y}px`

            if (this.y <= startY - jumpHeight) {
            clearInterval(upInterval)
            goDown()}
        }, intervalTime)
    }

    const goDown = () => {
        if (!this.alive) return 
        const downInterval = setInterval(() => {
            this.y += speed
            this.element.style.top = `${this.y}px`

            if (this.y >= startY) {
            clearInterval(downInterval)
            this.y = startY
            this.element.style.top = `${this.y}px`
            goUp()}
        }, intervalTime)
    }
    goUp()
}

defeated() {
this.alive = false
this.element.remove()
}

}