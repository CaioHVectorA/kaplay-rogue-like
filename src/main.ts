import kaplay, { GameObj } from "kaplay"
import { HEIGHT, playerFn, playerOnUpdate, WIDTH } from "./components/player"
import { rectFactory } from "./components/rect"

const k = kaplay()
// const { onKeyDown } = kaplay();
const BASE_SPEED = 440
let speed = BASE_SPEED
k.loadRoot("./") // A good idea for Itch.io publishing later
// k.loadSprite("bean", "sprites/bean.png");

const player = playerFn(k)
player.add(rectFactory(k))
player.add(rectFactory(k, [0, HEIGHT - WIDTH / 2], WIDTH / 2, [0.5, 0.5, 1]))
player.onUpdate(playerOnUpdate(k, player))
const staminaBar = k.add([
    k.rect(150, 20),
    k.pos(10, 10),
    k.color(0, 0, 0),
    k.layer("ui"),
])
k.onKeyDown(["left", "a"], () => {
    player.move(-speed, 0)
})

k.onKeyDown(["right", "d"], () => {
    player.move(speed, 0)
})

k.onKeyDown(["up", "w"], () => {
    player.move(0, -speed)
})

k.onKeyDown(["down", "s"], () => {
    player.move(0, speed)
})

k.onKeyDown("shift", async () => {
    speed = BASE_SPEED * 2
    await k.wait(0.08)
    speed = BASE_SPEED
})
k.onClick(() => k.addKaboom(k.mousePos()))
