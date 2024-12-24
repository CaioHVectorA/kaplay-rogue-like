import { GameObj, KAPLAYCtx } from "kaplay"

export type Component<T extends "obj" | "params" = "obj"> = (
    k: KAPLAYCtx,
    ...props: unknown[]
) => T extends "obj" ? GameObj : Parameters<typeof k.add<any>>[0]

// export const playerRect: Component = (k) => [
//     k.rect(32, 32),
//     k.pos(120, 80),
//     k.color(0.5, 0.5, 1),
//     k.center(),
//     "player",
//   ]; -> Parameters<typeof k.add<any>>[0]

// export const playerFn: Component = (k) =>
//     k.add([k.pos(120, 80), k.rect(60, 130, { fill: true }), k.area(), k.body()]);
// -> GameObj
