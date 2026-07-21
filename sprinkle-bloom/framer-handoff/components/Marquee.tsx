import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

/**
 * Marquee
 * -------
 * The scrolling ribbon under the hero. A colored bar (rotate it slightly so the
 * ends bleed off-screen) with looping script text.
 *
 * Tip: Framer also has a built-in **Ticker** component that does this natively
 * with pause-on-hover — use that if you prefer no code. This component is here
 * for full control over the tilt and styling.
 */
export function Marquee(props: any) {
    const {
        text, separator, duration, background, color,
        fontFamily, fontSize, tilt, style,
    } = props

    const unit = `${text} ${separator} `
    const run = unit.repeat(6)

    return (
        <div
            style={{
                overflow: "hidden",
                width: "100%",
                background,
                transform: `rotate(${tilt}deg) scale(1.04)`,
                padding: "14px 0",
                ...style,
            }}
        >
            <motion.div
                style={{
                    display: "flex",
                    width: "max-content",
                    whiteSpace: "nowrap",
                    color,
                    fontFamily,
                    fontSize,
                    letterSpacing: "0.02em",
                }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
                <span>{run}</span>
                <span aria-hidden="true">{run}</span>
            </motion.div>
        </div>
    )
}

Marquee.defaultProps = {
    text: "Custom Cakes",
    separator: "✦ Baked with Love ✦ Small-Batch Magic ✦ Fresh Every Morning",
    duration: 30,
    background: "#C1506A",
    color: "#FFFFFF",
    fontFamily: "Parisienne, cursive",
    fontSize: 20,
    tilt: -1.4,
}

addPropertyControls(Marquee, {
    text: { type: ControlType.String, title: "Text", defaultValue: "Custom Cakes" },
    separator: {
        type: ControlType.String,
        title: "Rest",
        defaultValue: "✦ Baked with Love ✦ Small-Batch Magic ✦ Fresh Every Morning",
    },
    duration: {
        type: ControlType.Number, title: "Speed",
        min: 5, max: 80, step: 1, unit: "s", defaultValue: 30,
    },
    background: { type: ControlType.Color, title: "Bar", defaultValue: "#C1506A" },
    color: { type: ControlType.Color, title: "Text color", defaultValue: "#FFFFFF" },
    fontFamily: { type: ControlType.String, title: "Font", defaultValue: "Parisienne, cursive" },
    fontSize: {
        type: ControlType.Number, title: "Size",
        min: 10, max: 60, step: 1, unit: "px", defaultValue: 20,
    },
    tilt: {
        type: ControlType.Number, title: "Tilt",
        min: -8, max: 8, step: 0.1, unit: "°", defaultValue: -1.4,
    },
})
