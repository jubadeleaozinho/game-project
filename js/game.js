class Game {
  constructor() {
    /* DOM ELEMENTS */
    this.startScreen = document.querySelector("#start-screen")
    this.gameScreen = document.querySelector("#game-screen")
    this.endScreen = document.querySelector("#end-screen")
    this.winScreen = document.querySelector("#win-screen")
    this.lifeContainer = document.querySelector(".life")
    this.policeStars = document.querySelector(".police-stars")

    this.enemiesArr = []
    this.enemyInterval = null
    this.defeatedPolice = 0
    this.boss = null
    this.bossDamage = 0

    this.bulletsArr = []
    this.gameLoopInterval = null
    this.life = 100
    this.tookHit = false

    /* DIFFICULTY LEVELS */ 
    this.oneStarWantedLevel = false
    this.twoStarWantedLevel = false
    this.threeStarWantedLevel = false
    this.fourStarWantedLevel = false
    this.fiveStarWantedLevel = false
    this.sixStarWantedLevel = false
  }

  spawnEnemy() {
    this.enemiesArr.push(new Enemy())
  }

  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"
    this.endScreen.style.display = "none"
    this.winScreen.style.display = "none"
    this.lifeContainer.textContent = this.life + "♥"
    this.player = new Player()
    this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 3000)
    this.gameLoopInterval = setInterval(() => {
         this.gameLoop()    
    }, 50)
  }

  gameLoop() {
    /* PRODUCE ENEMIES AND CHECK IF THEY HIT THE PLAYER */
    this.enemiesArr.forEach((enemy) => {
        enemy.enemyMove()})
    for (let i = 0; i < this.enemiesArr.length; i++) {
        this.checkCollision(this.player, this.enemiesArr[i])}

    /* MAKE BULLETS MOVE AND CHECK COLLISIONS AGAINST ENEMIES AND THE FINAL BOSS */
    for (let i = this.bulletsArr.length - 1; i >= 0; i--) {
        const bullet = this.bulletsArr[i]
        bullet.bulletMoving()

      if (this.checkBulletEnemyCollision(bullet) || this.checkBulletBossCollision(bullet)) {
        bullet.element.remove()
        this.bulletsArr.splice(i, 1)

      if (this.bossDamage >= 10) {
        this.boss.defeated()
        this.boss = null
        this.winGame()}
      }
    }

    /* POLICE WANTED STAR SYSTEM: ADD DIFFICULTY BY LEVEL */
    this.getPoliceStars()

    if (this.defeatedPolice >= 3 && !this.oneStarWantedLevel) {
      this.oneStarWantedLevel = true
      this.enemiesArr.forEach(enemy => {
      enemy.speed += 2 })
      console.log("One star wanted level! Enemies will now run faster")
    }

    if (this.defeatedPolice >= 6 && !this.twoStarWantedLevel) {
      this.twoStarWantedLevel = true
      clearInterval(this.enemyInterval)
      this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 2500)
      console.log("Two star wanted level! Enemies will now spawn more often")
    }

    if (this.defeatedPolice >= 9 && !this.threeStarWantedLevel) {
      this.threeStarWantedLevel = true
      this.enemiesArr.forEach(enemy => {
      enemy.speed += 0.5 })
      console.log("Three star wanted level! Enemies will now run even faster")
    }

    if (this.defeatedPolice >= 12 && !this.fourStarWantedLevel) {
      this.fourStarWantedLevel = true
      clearInterval(this.enemyInterval)
      this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 2250)
      console.log("Four star wanted level! Enemies will now spawn more often")
    }

    if (this.defeatedPolice >= 15 && !this.fiveStarWantedLevel) {
      this.fiveStarWantedLevel = true
      this.enemiesArr.forEach(enemy => {
      enemy.speed += 0.5 })
    }

    if (this.defeatedPolice >= 18 && !this.sixStarWantedLevel) {
      this.sixStarWantedLevel = true
      clearInterval(this.enemyInterval)
      this.enemyInterval = setInterval(() => { this.spawnEnemy()}, 3200)
      this.boss = new Boss()
      setTimeout(() => {
      this.boss.bossEnters()
      this.boss.bossMove()
      }, 2000)
    }
  }

  /* END OF GAME LOOP */

  /* COLLISION CHECKS */
  checkCollision(player, enemy, enemyIndex) {
    if (this.tookHit) return
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y) 
      {
        console.log("Collision")
        this.enemiesArr.splice(enemyIndex, 1)
        enemy.element.remove()
        this.life -= 8
        this.lifeContainer.textContent = this.life + "♥"
        console.log(this.life)
        this.tookHit = true
        setTimeout(() => {
        this.tookHit = false
        }, 500)
      }
        if (this.life <= 0) {
          this.gameOver()
        }
  }

  checkBulletEnemyCollision(bullet) {
    for (let i = 0; i < this.enemiesArr.length; i++) {
      if (bullet.x < this.enemiesArr[i].x + this.enemiesArr[i].width &&
          bullet.x + bullet.width > this.enemiesArr[i].x &&
          bullet.y < this.enemiesArr[i].y + this.enemiesArr[i].height &&
          bullet.y + bullet.height > this.enemiesArr[i].y)
            {console.log("Bullet collided with enemy")
              this.enemiesArr[i].element.remove()
              this.enemiesArr.splice(i, 1)
              this.defeatedPolice += 1
              return true;
            }
    }
      return false;
  }

  checkBulletBossCollision(bullet) {
    if (!this.boss) return
    if (bullet.x < this.boss.x + this.boss.width &&
        bullet.x + bullet.width > this.boss.x &&
        bullet.y < this.boss.y + this.boss.height &&
        bullet.y + bullet.height > this.boss.y)
        {console.log("Bullet collided with BOSS")
          this.bossDamage += 2
          return true
        }
    return false
  }

  /* POLICE STAR SYSTEM */
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
      case 18:
        this.policeStars.textContent = "★★★★★★"
    }
  }
  
  /* END OF THE GAME SCENARIOS */
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

  winGame() {
    console.log("You won!")
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "none"
    this.endScreen.style.display = "none"
    this.winScreen.style.display = "flex"
    clearInterval(this.enemyInterval)
    clearInterval(this.gameLoopInterval)
  }


  restartGame() {
    clearInterval(this.gameLoopInterval)
    clearInterval(this.enemyInterval)

    this.enemiesArr.forEach(enemy => enemy.element.remove())
    this.bulletsArr.forEach(bullet => bullet.element.remove())
    if (this.boss) this.boss.element.remove()
    if (this.player) this.player.element.remove()

    this.enemiesArr = []
    this.bulletsArr = []
    this.boss = null

    this.life = 100
    this.tookHit = false
    this.defeatedPolice = 0
    this.bossDamage = 0
    this.oneStarWantedLevel = false
    this.twoStarWantedLevel = false
    this.threeStarWantedLevel = false
    this.fourStarWantedLevel = false
    this.fiveStarWantedLevel = false
    this.sixStarWantedLevel = false
    this.policeStars.textContent = "☆☆☆☆☆☆"

    this.startGame()
}
}
