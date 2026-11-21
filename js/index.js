const startBtn = document.querySelector("#start-button")
const endBtn = document.querySelector("#end-button")

let game
let bulletsArr = []

window.addEventListener("load", () => {
startBtn.addEventListener("click", () => {
    game = new Game()
    game.startGame()
})

document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      console.log("jumping")
      game.player.jump()
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        console.log("shooting")
        game.player.shoot()
    }
})

endBtn.addEventListener("click", () => {
    game.endButton()
})

})