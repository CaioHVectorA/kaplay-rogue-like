import { KAPLAYCtx } from "kaplay"
import { Player } from "./player"
import { COLORS } from "../consts/colors"
import { stamina } from "../components/stamina"
import { speed } from "../components/speed"

export const addEnemy = (k: KAPLAYCtx, player: Player, pos = k.vec2(0, 0)) => {
    const enemy = k.add([
        k.rect(60, 60, { fill: true, radius: 22 }),
        k.color(...COLORS.cyan),
        k.pos(pos),
        k.body(),
        k.area(),
        k.anchor("center"),
        k.state("move", ["move", "dash"]),
        stamina(70),
        speed(200),
    ])
    enemy.onUpdate(async () => {
        const dir = player.pos.sub(enemy.pos).unit()
        enemy.move(dir.scale(enemy.getSpeed()))
        const random = k.rand(0, 100)
        if (random < 30) {
            if (enemy.getStamina() > 50) {
                enemy.changeSpeed(enemy.getBaseSpeed() * 2.0)
                enemy.setStamina(enemy.getStamina() - 50)
                await k.wait(0.4)
                enemy.changeSpeed(enemy.getBaseSpeed())
            }
        }
    })
}
