import { KAPLAYCtx } from "kaplay"
import { COLORS } from "../consts/colors"

export function stamina(
    initial: number,
    k: KAPLAYCtx,
    addStaminaBar = false,
    gainMultiplier = 1
) {
    let stamina = initial
    let maxStamina = initial
    return {
        id: "stamina",
        require: [],
        add() {
            if (!addStaminaBar) return
            const width = this.getWidth()
            const height = this.getHeight()
            const baseBar = this.add([
                k.rect(initial, 10),
                k.pos(-width + 24, -height / 2 - 12),
                k.color(...COLORS.darkGray),
                k.layer("ui"),
                k.z(30),
            ])
            const staminaBar = this.add([
                k.rect(initial, 10, { fill: true }),
                k.pos(-width + 24, -height / 2 - 12),
                "staminaBar",
                k.color(...COLORS.darkRed),
                k.layer("ui"),
                k.z(30),
            ])
            staminaBar.onUpdate(() => {
                staminaBar.width = stamina
            })
        },
        update() {
            stamina = Math.min(stamina + 1 * gainMultiplier, maxStamina)
        },
        draw() {},
        destroy() {},
        inspect() {
            return `stamina: ${this.stamina}`
        },
        changeMaxStamina(amount: number) {
            maxStamina = amount
        },
        setStamina(amount: number) {
            stamina = amount
        },
        getStamina() {
            return stamina
        },
        getMaxStamina() {
            return maxStamina
        },
    }
}
