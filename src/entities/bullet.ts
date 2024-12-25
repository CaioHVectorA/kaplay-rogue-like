import { KAPLAYCtx } from "kaplay"
import { Player } from "./player"
import { COLORS } from "../consts/colors"

export const addBullet = (k: KAPLAYCtx, player: Player) => {
    const bullet = k.add([
        k.rect(40, 40),
        k.color(...COLORS.roseGold),
        k.pos(player.pos),
        k.body(),
        k.area(),
        k.anchor("center"),
        k.state("move", ["move"]),
    ])
    bullet.onUpdate(() => {
        console.log("dsjkldajkl")
        const dir = k.mousePos().sub(player.pos).unit()
        bullet.move(dir.scale(200))
    })
}
