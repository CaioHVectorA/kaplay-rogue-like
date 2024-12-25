import { ButtonsDef } from "kaplay/dist/declaration/app"

export const buttonConfig = {
    buttons: {
        left: {
            keyboard: ["left", "a"],
            gamepad: ["dpad-left"],
        },
        right: {
            keyboard: ["right", "d"],
            gamepad: ["dpad-right"],
        },
        up: {
            keyboard: ["up", "w"],
            gamepad: ["dpad-up"],
        },
        down: {
            keyboard: ["down", "s"],
            gamepad: ["dpad-down"],
        },
        dash: {
            keyboard: "shift",
            gamepad: "rshoulder",
        },
        shoot: {
            keyboard: ["space"],
            mouse: "left",
            gamepad: ["east", "rtrigger"],
        },
    },
} as ButtonsDef
