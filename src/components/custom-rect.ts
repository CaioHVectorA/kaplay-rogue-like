import { KAPLAYCtx } from "kaplay"
import { COLORS } from "../consts/colors"
export type CustomRectProps = {
    // color: keyof typeof COLORS
    colorsChanges: Record<string, keyof typeof COLORS>
    radius: number
}
export function customRect(
    k: KAPLAYCtx,
    props: CustomRectProps = { colorsChanges: {}, radius: 0 }
) {
    let width = this.getWidth()
    let height = this.getHeight()
    const { colorsChanges, radius } = props
    const stateChanging: [string, string][] = []
    const states = Object.keys(colorsChanges) // ["idle", "active", "hover"]
    const stateColors = Object.values(colorsChanges) // ["red", "blue", "green"]
    // stateChanging = [["active", "red"], ["hover", "blue"], ["idle", "green"]] - this is the expected output
    states.forEach((state, index) => {
        stateColors.forEach((color, colorIndex) => {
            if (index == colorIndex) return
            stateChanging.push([state, color])
        })
    })
    return {
        id: "customRect",
        require: ["pos", "size", "state"],
        add() {
            this.use([k.rect(width, height, { fill: true })])
            stateChanging.forEach(([state, color]) => {
                this.onStateEnter(state, () => {
                    this.use(
                        k.color(...(COLORS[color] as [number, number, number]))
                    )
                })
            })
        },
        update() {},
        draw() {},
        destroy() {},
        inspect() {
            return `customRect: ${width}, ${height}`
        },
    }
}
