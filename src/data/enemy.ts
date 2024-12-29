import { CustomRectProps } from "../components/custom-rect"
import { SCALE } from "../consts/scale"

type Ferocity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 // this represents the ferocity of the enemy
export type Enemy = {
    name: string
    life: number
    ferocity: Ferocity
    damage: number
    rarity: number
    rect: CustomRectProps
    description: string
    stamina: number
    staminaProps?: {
        gainMultiplier: number
        distanceLimit: number
        frequency: number
    }
    minDrop: number
    maxDrop: number
    speed: number
    states: string[]
    inteligence: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    type: "SOULS" | "MONSTER" | "CONJURER" | "PATROL"
}
// the level affects the enemy's life, damage, and speed

export const SimpleSoul = {
    name: "Alma simples",
    life: 100,
    ferocity: 1,
    description:
        "Almas das mais comuns. Dizem que são pessoas que se perderam no labirinto e não conseguiram sair",
    damage: 10,
    rarity: 1,
    rect: {
        colorsChanges: { move: "lightGray", dash: "orange", attack: "darkRed" },
        radius: 6,
        size: [50, 50],
    },
    staminaProps: {
        distanceLimit: 100,
        frequency: 10,
        gainMultiplier: 1,
    },
    minDrop: 1,
    maxDrop: 3,
    inteligence: 1,
    stamina: 100,
    speed: 150,
    states: ["move", "dash", "attack"],
    type: "SOULS",
} satisfies Enemy

export const HighDomainSoul = {
    name: "Alma do alto domínio",
    life: 800,
    ferocity: 7,
    description:
        "Almas que eram muito poderosas em vida. É um contra argumento pra quem diz que não levamos nada em vida.",
    speed: 200,
    damage: 30,
    rarity: 3,
    inteligence: 6,
    maxDrop: 10,
    minDrop: 5,
    staminaProps: {
        distanceLimit: 600,
        frequency: 3,
        gainMultiplier: 6,
    },
    rect: {
        colorsChanges: {
            move: "lightGray",
            dash: "darkBlue",
            attack: "darkRed",
        },
        radius: 6,
        size: [80, 80],
    },
    stamina: 400,
    states: ["move", "dash", "attack"],
    type: "SOULS",
} satisfies Enemy

export const enemies = {
    "simple-soul": SimpleSoul,
    "high-domain-soul": HighDomainSoul,
}

export type EnemyWithLevel = Enemy & { level: number }
export const getEnemyWithLevel = (
    enemy: keyof typeof enemies,
    level: number
): EnemyWithLevel => {
    const base = enemies[enemy]
    return {
        ...base,
        life: base.life * level,
        damage: base.damage * level,
        speed: base.speed * level,
        rect: {
            ...base.rect,
            size: base.rect.size.map((v) => v * SCALE) as [number, number],
        },
        level,
    }
}
