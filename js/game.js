class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen")
    this.gameScreen = document.querySelector("#game-screen")
    this.endScreen = document.querySelector("#end-screen")

    this.lifeContainer = document.querySelector(".life")
    this.policeStars = document.querySelector(".police-stars")

    this.enemiesArr = []
    this.defeatedPolice = 0

    this.twoStarWantedLevel = false
    this.threeStarWantedLevel = false
    this.fourStarWantedLevel = false

    this.life = 100

    this.enemyInterval = null
    this.gameLoopInterval = null
    
  }

  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"
    this.lifeContainer.textContent = this.life + "♥"
    this.player = new Player()
  
    this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 3000)

    this.gameLoopInterval = setInterval(() => {
         this.gameLoop()    
    }, 50)
  }

  spawnEnemy() {
    this.enemiesArr.push(new Enemy())
  }


  gameLoop() {
    
    this.enemiesArr.forEach((enemy) => {
        enemy.enemyMove()
    })

    for (let i = 0; i < this.enemiesArr.length; i++) {
        this.checkCollision(this.player, this.enemiesArr[i])
    }

    bulletsArr.forEach((bullet, i) => {
        bullet.bulletMoving()
        if (this.checkBulletEnemyCollision(bullet)) {
            bullet.element.remove()
            bulletsArr.splice(i, 1)
        }
    })
    this.getPoliceStars()

    if (this.defeatedPolice >= 3 && !this.twoStarWantedLevel) {
      this.twoStarWantedLevel = true
      clearInterval(this.enemyInterval)
      this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 2800)
    }

    if (this.defeatedPolice >=6 && !this.threeStarWantedLevel) {
      this.threeStarWantedLevel = true
      this.enemiesArr.forEach(enemy => {
        enemy.speed += 2
        console.log("Enemy goes faster!")
      })
    }

    if (this.defeatedPolice >=9 && !this.fourStarWantedLevel) {
      this.fourStarWantedLevel = true
      clearInterval(this.enemyInterval)
      this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 2500)
    }
  }

  checkCollision(player, enemy, enemyIndex) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y) 
      {
        console.log("Collision")
        this.enemiesArr.splice(enemyIndex, 1)
        enemy.element.remove()
        this.life -= 10
        this.lifeContainer.textContent = this.life + "♥"
        console.log(this.life)
        }

        if (this.life <= 0) {
            this.gameOver()
        }
    }

   /* checkBulletEnemyCollision(bullet, enemy) {
            if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y) {
            console.log("Bullet collided with Enemy")}
        }
    */

    checkBulletEnemyCollision(bullet) {
        for (let i = 0; i < this.enemiesArr.length; i++) {
            if (
            bullet.x < this.enemiesArr[i].x + this.enemiesArr[i].width &&
            bullet.x + bullet.width > this.enemiesArr[i].x &&
            bullet.y < this.enemiesArr[i].y + this.enemiesArr[i].height &&
            bullet.y + bullet.height > this.enemiesArr[i].y
            ){
                console.log("Bullet collided with enemy")
                
                this.enemiesArr[i].element.remove()
                this.enemiesArr.splice(i, 1)
                this.defeatedPolice += 1
                return true;
            }
        }
        return false;
        
    }

  getPoliceStars() {
    switch (this.defeatedPolice) {
      case 3:
        this.policeStars.textContent = "★☆☆☆☆☆"
        break;
      case 6:
        this.policeStars.textContent = "★★☆☆☆☆"
        break;
      case 9:
        this.policeStars.textContent = "★★★☆☆☆"
        break;
      case 12:
        this.policeStars.textContent = "★★★★☆☆"
        break;
      case 15:
        this.policeStars.textContent = "★★★★★☆"
        break;
    }

  }
  
  endButton() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "none"
    this.endScreen.style.display = "flex"
    clearInterval(this.enemyInterval)
    clearInterval(this.gameLoopInterval)
  }

  gameOver() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "none"
    this.endScreen.style.display = "flex"
    clearInterval(this.enemyInterval)
    clearInterval(this.gameLoopInterval)
  }
  
}
