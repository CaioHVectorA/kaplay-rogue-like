import { KAPLAYCtx, Vec2 } from "kaplay"

export function size(sizeX: number, sizeY: number, k: KAPLAYCtx) {
    let x = sizeX
    let y = sizeY
    let sizeVec2 = k.vec2(x, y)
    let center = k.vec2(x / 2, y / 2)
    let corners = {
        topLeft: k.vec2(0, 0),
        topRight: k.vec2(x, 0),
        bottomLeft: k.vec2(0, y),
        bottomRight: k.vec2(x, y),
    }
    return {
        id: "size",
        require: ["pos"],
        add() {},
        update() {},
        draw() {},
        destroy() {},
        inspect() {
            return `size: ${x}, ${y}`
        },
        getWidth() {
            return x
        },
        getHeight() {
            return y
        },
        getDimensions() {
            return sizeVec2
        },
        getCenter() {
            return (this.pos() as Vec2).add(center)
        },
        getCorners() {
            return {
                topLeft: (this.pos() as Vec2).add(corners.topLeft),
                topRight: (this.pos() as Vec2).add(corners.topRight),
                bottomLeft: (this.pos() as Vec2).add(corners.bottomLeft),
                bottomRight: (this.pos() as Vec2).add(corners.bottomRight),
            }
        },
    }
}
