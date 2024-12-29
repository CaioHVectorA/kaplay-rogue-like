import { KAPLAYCtx, Vec2 } from "kaplay"
import { Player } from "../entities/player"
import { COLORS } from "../consts/colors"
import { logVector } from "../lib/log-vector"

type ShooterProps = {
    atkSpeed: number
    bulletSpeed: number
    bulletDamage: number
    bulletSize?: Vec2
    burst?: number
    // linear burst is a line of bullets, multiple burst is a spread of bullets, bunch bullet is like a row of burst bullets
    burstMode: "LINEAR" | "MULTIPLE" | "BUNCH" | "NONE"
    burstTimeout?: number
    bunchBurstRows?: number
}
export function shooter(
    isNPCEnemy: boolean = true,
    playerObj: Player,
    props: ShooterProps = {
        atkSpeed: 60,
        bulletSpeed: 200,
        bulletDamage: 10,
        burstMode: "LINEAR",
        burstTimeout: 10,
        bunchBurstRows: 3,
    },
    k: KAPLAYCtx
) {
    // add atk speed, bullet speed, bullet damage, bullet size on params
    // add some tags

    // TODO: add automatic approach to NPC non enemy(ally)
    let atkSpeed = props.atkSpeed
    let shotCooldown = 0
    const canShoot = () => {
        if (isNPCEnemy) {
            return shotCooldown === 0
        }
        return k.isMousePressed() && shotCooldown === 0
    }
    return {
        id: "shooter",
        require: [],
        add() {},
        update() {
            shotCooldown = Math.max(0, shotCooldown - 1)
            if (canShoot()) {
                this.shoot()
            }
        },
        draw() {},
        destroy() {},
        inspect() {
            return `atkSpeed: ${atkSpeed}`
        },
        shoot() {
            shotCooldown = atkSpeed
            if (isNPCEnemy) {
                const bulletDir = playerObj.pos.sub(this.pos).unit()
                const bullet = k.add([
                    k.pos(this.pos),
                    k.move(bulletDir, props.bulletSpeed || 300),
                    k.rect(props.bulletSize.x || 30, props.bulletSize.y || 50),
                    k.color(...COLORS.brass),
                    // k.body(),
                    // k.area(),
                    k.anchor("center"),
                ])
                return
            } else {
                const bulletDir = k.mousePos().sub(playerObj.pos).unit()
                console.log(playerObj.scale)
                let corner: Vec2 = k.vec2(
                    this.getCorners().topRight.x,
                    this.getCorners().topRight.y + 32
                )
                //@ts-ignore
                if (playerObj.scale.x === -1)
                    corner = k.vec2(
                        this.getCorners().topLeft.x - playerObj.getWidth(),
                        this.getCorners().topLeft.y + 32
                    )
                logVector(corner)
                const bullet = k.add([
                    k.rect(50, 20),
                    k.color(...COLORS.roseGold),
                    k.pos(corner),
                    // k.body(),
                    k.area(),
                    k.anchor("center"),
                    k.move(bulletDir, props.bulletSpeed || 300),
                    "bullet",
                    "playerBullet",
                    k.rotate(bulletDir.angle()),
                ])
                bullet.on("update", () => {})
            }
            // add bullet
        },
    }
}
