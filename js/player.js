class Player {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen")
    this.element = document.createElement("div")

    this.element.className = "player";
    this.x = 0
    this.y = 390
    this.width = 100
    this.height = 100
    this.image = "./assets/IMAGES/GTDOGGO.gif"
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

  /* JUMP METHOD */ 
  jump() {
    if (this.isJumping) return
    this.isJumping = true

    const startY = this.y
    const upDuration = 600
    const lingerDuration = 480
    const downDuration = 600

    const upInterval = setInterval(() => {
      this.y -= 50
      this.element.style.top = `${this.y}px`
    }, 100)

    setTimeout(() => {
      clearInterval(upInterval)

      setTimeout(() => {
        const downInterval = setInterval(() => {
        this.y += 50
        this.element.style.top = `${this.y}px`
        }, 100)

        setTimeout(() => {
        clearInterval(downInterval)
        this.y = startY
        this.element.style.top = `${this.y}px`
        this.isJumping = false
        }, downDuration)
      }, lingerDuration)
    }, upDuration)
  }

  /* SHOOT METHOD */ 
  shoot() {
    let bulletX = this.x + 20; 
    let bulletY = this.y + 20; 
    let newBullet = new Bullet(bulletX, bulletY);
    game.bulletsArr.push(newBullet);
  }
}


class Bullet {
  constructor(x, y) {
    this.element = document.createElement("div")
    this.gameScreen = document.querySelector("#game-screen")
    this.gameScreen.append(this.element)
    this.element.className = "bullet"

    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = 5;

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.image = "./assets/IMAGES/fireball.gif"
    this.element.style.backgroundImage = `url("${this.image}")`
    this.element.style.backgroundPosition = `center`
    this.element.style.backgroundSize = `cover`

    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  bulletMoving() {
    this.x += this.speed;
    this.element.style.left = `${this.x}px`;
  }
}


