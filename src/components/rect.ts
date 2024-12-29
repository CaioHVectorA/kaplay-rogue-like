import { PLAYER } from "../consts/player"

export const rectFactory = (
    k,
    pos: [number, number] = [PLAYER.WIDTH / 2, 0],
    s: number = PLAYER.WIDTH / 2,
    color: [number, number, number] = [0.5, 0.5, 0.5]
) => [
    k.rect(s, s),
    k.pos(k.vec2(...pos)),
    k.color(...color),
    k.center(),
    "player",
]
