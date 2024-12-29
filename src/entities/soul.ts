import { KAPLAYCtx } from "kaplay"
import { Player } from "./player"
import { COLORS } from "../consts/colors"
import { stamina } from "../components/stamina"
import { speed } from "../components/speed"
import { size } from "../components/size"
import { customRect } from "../components/custom-rect"
import { Enemy } from "../data/enemy"

export const addEnemy = (
    k: KAPLAYCtx,
    player: Player,
    enemyData: Enemy,
    pos = k.vec2(0, 0)
) => {
    const [width, height] = enemyData.rect.size
    const enemy = k.add([
        k.pos(pos),
        size(width, height, k),
        k.state("move", ["move", "dash", "attack"]),
        k.rect(width, height, {
            fill: true,
            radius: 22,
        }),
        // customRect(k, enemyData.rect),
        k.body(),
        k.area(),
        k.anchor("center"),
        stamina(100, k, true, k.rand(1, 3)),
        speed(80),
        k.named("enemy"),
    ])
    let dir
    enemy.onUpdate(() => {
        if (enemy.state == "move") dir = player.pos.sub(enemy.pos).unit()
        if (enemy.state === "move") enemy.move(dir.scale(enemy.getSpeed()))
        const random = k.rand(0, 100)
        const dist = player.pos.dist(enemy.pos)
        if (
            random < 10 &&
            enemy.getStamina() > 99 &&
            dist < enemyData.ferocity * 100 + 200
        ) {
            enemy.enterState("dash")
        }
        enemy.move(dir.scale(enemy.getSpeed()))
    })
    enemy.onStateEnter("dash", async () => {
        enemy.use(k.color(...COLORS[enemyData.rect.colorsChanges["dash"]]))
        enemy.changeSpeed(enemy.getBaseSpeed() * 8)
        enemy.setStamina(enemy.getStamina() - 99)
        console.log(player)
        dir = player.pos.sub(enemy.pos).unit()
        await k.wait(0.2)
        enemy.changeSpeed(enemy.getBaseSpeed())
        enemy.enterState("move")
        enemy.use(k.color(...COLORS[enemyData.rect.colorsChanges["move"]]))
    })
    enemy.onCollide("player", async (player: Player, col) => {
        enemy.enterState("attack")
        player.hurt(10)
        // enemy.use(k.color(...COLORS.darkRed))
        enemy.use(k.color(...COLORS[enemyData.rect.colorsChanges["attack"]]))
        // get the inverse direction of the player, to get a knockback effect
        const dir = player.pos.sub(enemy.pos).unit()
        // move the player in the opposite direction
        const knockbackDistance = 100
        const knockbackSteps = 10
        const knockbackStepDistance = knockbackDistance / knockbackSteps
        for (let i = 0; i < knockbackSteps; i++) {
            player.move(dir.scale(knockbackStepDistance))
            await k.wait(0.02)
        }
        enemy.use(k.color(...COLORS.cyan))
        enemy.enterState("move")
    })
}
