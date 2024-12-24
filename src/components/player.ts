import { KAPLAYCtx } from "kaplay"
import { Component } from "./component.type"
export const WIDTH = 60
export const HEIGHT = 130
export const playerFn = (k: KAPLAYCtx) =>
    k.add([
        k.pos(120, 80),
        k.rect(WIDTH, HEIGHT, { fill: true }),
        k.area(),
        k.center(),
        k.body(),
    ])

export const playerOnUpdate =
    (k: KAPLAYCtx, player: ReturnType<typeof playerFn>) => () => {
        if (k.mousePos().x < player.pos.x) {
            //@ts-ignore
            if (player.scale?.x === 1) {
                player.pos = k.vec2(player.pos.x + WIDTH, player.pos.y)
            }
            //@ts-ignore
            player.scale = k.vec2(-1, 1)
        } else {
            //@ts-ignore
            if (player.scale?.x === -1) {
                player.pos = k.vec2(player.pos.x - WIDTH, player.pos.y)
            }
            //@ts-ignore
            player.scale = k.vec2(1, 1)
        }
    }
