import { Component } from "./component.type"

export const rectFactory: Component<"params"> = (
    k,
    pos: [number, number] = [30, 0],
    s: number = 30,
    color: [number, number, number] = [0.5, 0.5, 0.5]
) => [
    k.rect(s, s),
    k.pos(k.vec2(...pos)),
    k.color(...color),
    k.center(),
    "player",
]
