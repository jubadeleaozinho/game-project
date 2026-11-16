const startBtn = document.querySelector("#start-button")

let game

window.addEventListener("load", () => {
startBtn.addEventListener("click", () => {
    game = new Game()
    game.startGame()
})

document.addEventListener("keydown", (e) => {
    console.log("e.key")
    if (e.key === " ") {
      game.player.jump()
    }
})

})