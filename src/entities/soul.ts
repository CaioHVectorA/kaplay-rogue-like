import { KAPLAYCtx } from "kaplay"
import { Player } from "./player"
import { COLORS } from "../consts/colors"
import { stamina } from "../components/stamina"
import { speed } from "../components/speed"
import { size } from "../components/size"
import { customRect } from "../components/custom-rect"
import { Enemy, EnemyWithLevel } from "../data/enemy"
import { logVector } from "../lib/log-vector"

export const addEnemy = (
    k: KAPLAYCtx,
    player: Player,
    {
        staminaProps: {
            distanceLimit = 100,
            frequency: staminaFrequency = 10,
            gainMultiplier = 1,
        },
        ...enemyData
    }: EnemyWithLevel,
    pos = k.vec2(0, 0)
) => {
    const [width, height] = enemyData.rect.size
    const enemy = k.add([
        k.pos(pos),
        size(width, height, k),
        k.state("move", ["move", "dash", "attack"]),
        k.rect(width, height, {
            fill: true,
            radius: enemyData.rect.radius,
        }),
        k.body(),
        k.area(),
        k.anchor("center"),
        stamina(enemyData.stamina, k, true, gainMultiplier || 1),
        speed(80),
        k.named("enemy"),
    ])
    const label = `${enemyData.name} - LvL ${enemyData.level}`
    enemy.add([
        k.text(label, {
            size: 16,
            align: "center",
        }),
        k.pos(-label.length * 5, -height / 2 - 40),
    ])
    let dir
    enemy.onUpdate(() => {
        if (enemy.state == "move") dir = player.pos.sub(enemy.pos).unit()
        if (enemy.state === "move") enemy.move(dir.scale(enemy.getSpeed()))
        const random = k.rand(0, 100)
        const dist = player.pos.dist(enemy.pos)
        if (
            random < staminaFrequency &&
            enemy.getStamina() > 99 &&
            dist < enemyData.ferocity * distanceLimit + 200
        ) {
            enemy.enterState("dash")
        }
        enemy.move(dir.scale(enemy.getSpeed()))
    })
    enemy.onStateEnter("dash", async () => {
        enemy.use(k.color(...COLORS[enemyData.rect.colorsChanges["dash"]]))
        enemy.changeSpeed(enemy.getBaseSpeed() * 8)
        enemy.setStamina(enemy.getStamina() - 99)
        // logVector([player.getPredictedPosition(0.2), player.pos])
        const rng = k.rand(0, 10 * enemyData.inteligence) // this rng can be 0 to 100 in the case of inteligence 10.
        if (rng < 30) {
            dir = player.pos.sub(enemy.pos).unit()
        } else {
            dir = player.getPredictedPosition(0.2).sub(enemy.pos).unit()
        }
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
        enemy.enterState("move")
    })
}
