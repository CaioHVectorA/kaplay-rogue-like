import { KAPLAYCtx } from "kaplay"
import { PLAYER } from "../consts/player"
import { stamina } from "../components/stamina"
import { COLORS } from "../consts/colors"
let speed = PLAYER.BASE_SPEED
export const playerFn = (k: KAPLAYCtx) =>
    k.add([
        k.pos(120, 80),
        k.rect(PLAYER.WIDTH, PLAYER.HEIGHT, { fill: true }),
        k.area(),
        k.center(),
        k.body(),
        k.health(PLAYER.HEALTH_INITAL, 100),
        stamina(100),
    ])
type Player = ReturnType<typeof playerFn>
export const playerOnUpdate = (k: KAPLAYCtx, player: Player) => () => {
    if (k.mousePos().x < player.pos.x) {
        //@ts-ignore
        if (player.scale?.x === 1) {
            player.pos = k.vec2(player.pos.x + PLAYER.WIDTH, player.pos.y)
        }
        //@ts-ignore
        player.scale = k.vec2(-1, 1)
    } else {
        //@ts-ignore
        if (player.scale?.x === -1) {
            player.pos = k.vec2(player.pos.x - PLAYER.WIDTH, player.pos.y)
        }
        //@ts-ignore
        player.scale = k.vec2(1, 1)
    }
}

export const setupKeybindings = (
    k: KAPLAYCtx,
    player: ReturnType<typeof playerFn>
) => {
    k.onButtonDown("left", () => {
        player.move(-speed, 0)
    })

    k.onButtonDown("right", () => {
        player.move(speed, 0)
    })

    k.onButtonDown("up", () => {
        player.move(0, -speed)
    })

    k.onButtonDown("down", () => {
        player.move(0, speed)
    })

    k.onButtonPress("dash", async () => {
        if (player.getStamina() < 65) return
        speed = PLAYER.BASE_SPEED * 2
        await k.wait(0.1)
        speed = PLAYER.BASE_SPEED
        player.setStamina(player.getStamina() - 65)
    })
    k.onButtonDown("shoot", () => {})
}

export const healthBar = (k: KAPLAYCtx, player: Player) => {
    console.log(player.maxHP())
    const baseBar = k.add([
        k.rect(player.maxHP(), 20),
        k.pos(10, 10),
        k.color(0, 1, 0),
        k.layer("ui"),
    ])
    const healthBar = k.add([
        k.rect(player.hp(), 20),
        k.pos(10, 10),
        k.color(...COLORS.darkRed),
        k.layer("ui"),
        k.z(30),
    ])
    player.onHurt((a) => {
        healthBar.width = player.hp()
    })
    player.onHeal((a) => {
        healthBar.width = player.hp()
    })
}

export const staminaBar = (k: KAPLAYCtx, player: Player) => {
    const baseBar = k.add([
        k.rect(player.getMaxStamina(), 20),
        k.pos(10, 35),
        k.color(0, 0, 0),
        k.layer("ui"),
    ])
    const staminaBar = k.add([
        k.rect(player.getStamina(), 20),
        k.pos(10, 35),
        k.color(...COLORS.darkBlue),
        k.layer("ui"),
        k.z(30),
    ])
    staminaBar.onUpdate(() => {
        staminaBar.width = player.getStamina()
    })
}