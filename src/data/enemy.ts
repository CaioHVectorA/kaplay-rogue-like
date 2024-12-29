import { CustomRectProps } from "../components/custom-rect"

type Ferocity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 // this represents the ferocity of the enemy
export type Enemy = {
    name: string
    life: number
    ferocity: Ferocity
    damage: number
    rarity: number
    rect: CustomRectProps
    description: string
    minDrop: number
    maxDrop: number
    speed: number
    states: string[]
    type: "SOULS" | "MONSTER" | "CONJURER" | "PATROL"
}
export const SimpleSoul = {
    name: "Alma simples",
    life: 100,
    ferocity: 1,
    description:
        "Almas das mais comuns. Dizem que são pessoas que se perderam no labirinto e não conseguiram sair",
    damage: 10,
    rarity: 1,
    rect: {
        colorsChanges: { move: "cyan", dash: "yellow", attack: "darkRed" },
        radius: 22,
        size: [80, 80],
    },
    minDrop: 1,
    maxDrop: 3,
    speed: 150,
    states: ["move", "dash", "attack"],
    type: "SOULS",
} satisfies Enemy
