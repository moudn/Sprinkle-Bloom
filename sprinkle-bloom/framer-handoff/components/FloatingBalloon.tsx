import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

/**
 * FloatingBalloon
 * ---------------
 * A watercolor balloon (or any image) that gently floats up and down with a
 * soft rotate. Place several around the hero cake and give each a different
 * Duration / Delay so they drift out of sync.
 *
 * Usage in Framer:
 *   1. Assets → + → Code File, paste this in.
 *   2. Drag the "FloatingBalloon" component onto the canvas.
 *   3. Set its Image to a balloon PNG and tweak Float / Duration / Delay.
 *   4. Size/position the layer on the canvas as usual.
 */
export function FloatingBalloon(props: any) {
    const { image, amplitude, rotate, duration, delay, style } = props
    const src = typeof image === "string" ? image : image?.src

    return (
        <motion.img
            src={src}
            alt=""
            draggable={false}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
                userSelect: "none",
                filter: "drop-shadow(0 14px 16px rgba(87,64,57,0.16))",
                ...style,
            }}
            animate={{ y: [0, -amplitude, 0], rotate: [-rotate, rotate, -rotate] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
    )
}

FloatingBalloon.defaultProps = {
    amplitude: 16,
    rotate: 4,
    duration: 7,
    delay: 0,
}

addPropertyControls(FloatingBalloon, {
    image: { type: ControlType.ResponsiveImage, title: "Image" },
    amplitude: {
        type: ControlType.Number,
        title: "Float",
        min: 0, max: 60, step: 1, unit: "px",
        defaultValue: 16,
    },
    rotate: {
        type: ControlType.Number,
        title: "Rotate",
        min: 0, max: 20, step: 0.5, unit: "°",
        defaultValue: 4,
    },
    duration: {
        type: ControlType.Number,
        title: "Duration",
        min: 1, max: 20, step: 0.5, unit: "s",
        defaultValue: 7,
    },
    delay: {
        type: ControlType.Number,
        title: "Delay",
        min: 0, max: 10, step: 0.1, unit: "s",
        defaultValue: 0,
    },
})
