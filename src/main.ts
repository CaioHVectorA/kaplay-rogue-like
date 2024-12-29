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
import { buttonConfig } from "./consts/button.config"
import { addEnemy } from "./entities/soul"
import { SimpleSoul } from "./data/enemy"

const k = kaplay(buttonConfig)
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
addEnemy(k, player, SimpleSoul)
// addEnemy(k, player, k.vec2(200, 200))
setupKeybindings(k, player)
healthBar(k, player)
staminaBar(k, player)
player.onUpdate(playerOnUpdate(k, player))
