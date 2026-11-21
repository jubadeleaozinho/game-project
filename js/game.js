class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen")
    this.gameScreen = document.querySelector("#game-screen")
    this.endScreen = document.querySelector("#end-screen")

    this.enemiesArr = []

    this.lives = 3
  }

  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"

    this.player = new Player()
  
    setInterval(() => { this.spawnEnemy()}, 2000)
    setInterval(() => {
         this.gameLoop()    
    }, 50)
  }

  spawnEnemy() {
    if (this.enemiesArr.length <= 2) this.enemiesArr.push(new Enemy())
  }

  gameLoop() {
    this.enemiesArr.forEach((enemy) => {
        enemy.enemyMove()
    })

    for (let i = 0; i < this.enemiesArr.length; i++) {
        this.checkCollision(this.player, this.enemiesArr[i])
    }

    bulletsArr.forEach((bullet) => {
        bullet.bulletMoving()
        this.checkBulletEnemyCollision(bullet)
    })
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
        this.lives -= 1
        console.log(this.lives)
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
                
                const removedEnemy = this.enemiesArr.splice(i, 1)
                removedEnemy[0].element.remove()
                return true;
            }
        }
        
    }
  

    

  endButton() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "none"
    this.endScreen.style.display = "flex"
  }
  
}
