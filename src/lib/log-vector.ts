import { Vec2 } from "kaplay"
export function logVector(vector: Vec2 | Vec2[]) {
    if (Array.isArray(vector)) {
        vector.forEach((v, i) => {
            console.log(`${++i}:: x: ${v.x}, y: ${v.y}`)
        })
        return
    }
    console.log(`x: ${vector.x}, y: ${vector.y}`)
}
