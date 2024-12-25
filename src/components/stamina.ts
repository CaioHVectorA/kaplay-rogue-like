export function stamina(initial: number) {
    let stamina = initial
    let maxStamina = initial
    return {
        id: "stamina",
        require: [],
        add() {},
        update() {
            stamina = Math.min(stamina + 1, maxStamina)
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
