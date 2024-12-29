import { KAPLAYCtx } from "kaplay"
import { COLORS } from "../consts/colors"
export type CustomRectProps = {
    // color: keyof typeof COLORS
    colorsChanges: Record<string, keyof typeof COLORS>
    radius: number
    size: [number, number]
}
export function customRect(
    k: KAPLAYCtx,
    props: CustomRectProps = { colorsChanges: {}, radius: 0, size: [30, 30] }
) {
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
        require: ["pos", "state"],
        add() {
            this.add([
                k.rect(props.size[0], props.size[1], {
                    fill: true,
                    radius: props.radius,
                }),
            ])
            stateChanging.forEach(([state, color]) => {
                this.onStateEnter(state, () => {
                    this.use(
                        k.color(...(COLORS[color] as [number, number, number]))
                    )
                })
            })
            this.use(
                k.color(
                    ...(COLORS[Object.values(colorsChanges)[0]] as [
                        number,
                        number,
                        number
                    ])
                )
            )
        },
        update() {},
        draw() {},
        destroy() {},
        inspect() {
            return `customRect: ${30}, ${30}`
        },
    }
}
