class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen")
    this.gameScreen = document.querySelector("#game-screen")
    this.endScreen = document.querySelector("#end-screen")
    
  }


  startGame() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "flex"

    this.player = new Player()

  }
  
  
}
