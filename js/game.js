class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen")
    this.gameScreen = document.querySelector("#game-screen")
    this.endScreen = document.querySelector("#end-screen")

    this.enemies = []
  }

  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"

    this.player = new Player()

    this.enemy = new Enemy() 
     setInterval(() => { this.spawnEnemy()}, 2000)
    setInterval(() => {
         this.gameLoop()    
    }, 50)

   
  }


  gameLoop() {
  
   
    this.enemies.forEach((enemy) => {
        enemy.enemyMove()
    })
    this.checkCollision(this.player, this.enemy);
  }

    spawnEnemy() {
    if (this.enemies.length <= 2) this.enemies.push(new Enemy())
  }

  checkCollision(player, enemy) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y) 
      {
        console.log("Collision")
        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "none"
        this.endScreen.style.display = "flex"
        }
    }
  
  endButton() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "none"
    this.endScreen.style.display = "flex"
  }
  
}
