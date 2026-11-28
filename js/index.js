const startBtn = document.querySelector("#start-button")
const endBtn = document.querySelector("#end-button")
const restartBtn = document.querySelector("#restart-game-button")

let game
let canShoot = true

/* START NEW GAME */ 
window.addEventListener("load", () => {
startBtn.addEventListener("click", () => {
    game = new Game()
    game.startGame()
})

/* JUMP CONTROL */ 
document.addEventListener("keydown", (e) => {
    if (!game) return
    if (e.key === " ") {
      console.log("jumping")
      game.player.jump()
    }
})

/* SHOOT CONTROL */ 
document.addEventListener("keydown", (e) => {
    if (!game) return
    if (e.key === "ArrowRight" && canShoot === true) {
        console.log("shooting")
        game.player.shoot()
        canShoot = false
    setTimeout(() => {
        canShoot = true;
      }, 4000);
      }
})

/* SHORTCUT TO BOSS TEST */ 
document.addEventListener("keydown", (e) => {
    if (!game) return
    if (e.key === "ArrowUp") {
        game.defeatedPolice = 18
        console.log("BOSS TEST")
    }
})

/* END GAME BUTTON */ 
endBtn.addEventListener("click", () => {
    game.endButton()
})

/* RESTART GAME BUTTON */ 
restartBtn.addEventListener("click", () => {
    if (!game) return
    canShoot = true
    game.restartGame()
})

})

