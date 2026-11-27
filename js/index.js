const startBtn = document.querySelector("#start-button")
const endBtn = document.querySelector("#end-button")

let game
let bulletsArr = []
let canShoot = true

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
    if (e.key === "ArrowRight" && canShoot === true) {
        console.log("shooting")
        game.player.shoot()
        canShoot = false
    setTimeout(() => {
        canShoot = true;
      }, 2000);
      }
})


endBtn.addEventListener("click", () => {
    game.endButton()
})

})