import kaplay, { GameObj } from "kaplay"
import {
    healthBar,
    playerFn,
    playerOnUpdate,
    setupKeybindings,
    staminaBar,
} from "./entities/player"
import { rectFactory } from "./components/rect"
import { PLAYER } from "./consts/player"
import { health } from "kaplay/dist/declaration/components"

const k = kaplay({
    buttons: {
        left: {
            keyboard: ["left", "a"],
            gamepad: ["dpad-left"],
        },
        right: {
            keyboard: ["right", "d"],
            gamepad: ["dpad-right"],
        },
        up: {
            keyboard: ["up", "w"],
            gamepad: ["dpad-up"],
        },
        down: {
            keyboard: ["down", "s"],
            gamepad: ["dpad-down"],
        },
        dash: {
            keyboard: "shift",
            gamepad: "rshoulder",
        },
        shoot: {
            keyboard: ["space"],
            mouse: "left",
            gamepad: ["east", "rtrigger"],
        },
    },
})
// const { onKeyDown } = kaplay();

k.loadRoot("./") // A good idea for Itch.io publishing later
// k.loadSprite("bean", "sprites/bean.png");

const player = playerFn(k)
player.add(rectFactory(k))
player.add(
    rectFactory(
        k,
        [0, PLAYER.HEIGHT - PLAYER.WIDTH / 2],
        PLAYER.WIDTH / 2,
        [0.5, 0.5, 1]
    )
)
setupKeybindings(k, player)
healthBar(k, player)
staminaBar(k, player)
player.onUpdate(playerOnUpdate(k, player))
