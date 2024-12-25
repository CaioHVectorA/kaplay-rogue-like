export function speed(speed: number = 100) {
    let baseSpeed = speed
    return {
        id: "speed",
        require: [],
        add() {},
        update() {},
        draw() {},
        destroy() {},
        inspect() {
            return `speed: ${this.speed}`
        },
        changeSpeed(amount: number) {
            baseSpeed = amount
        },
        getSpeed() {
            return baseSpeed
        },
        getBaseSpeed() {
            return speed
        },
    }
}
