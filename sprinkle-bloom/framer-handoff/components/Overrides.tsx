import type { ComponentType } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Code Overrides for Sprinkle & Bloom
 * -----------------------------------
 * Overrides add behavior to layers you've designed on the canvas — no need to
 * rebuild them in code. Select a layer → right panel → Code → pick this file
 * and the override name.
 *
 *   withFloat      → gentle continuous float (hero balloons, the cake)
 *   withFloatSlow  → a slower, larger float (good for the big centre cake)
 *   withHoverLift  → lifts up on hover (treat / cake-slice cards)
 *   withTilt       → tips toward the cursor in 3D on hover (cards)
 *   withBlob       → slowly morphs the corner radius (the About Us image)
 */

/* Continuous gentle float — apply to each hero balloon. */
export function withFloat(Component): ComponentType {
    return (props: any) => (
        <Component
            {...props}
            animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
    )
}

/* Slower, bigger float — nice for the large centre cake. */
export function withFloatSlow(Component): ComponentType {
    return (props: any) => (
        <Component
            {...props}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
    )
}

/* Lift on hover — apply to the treat and cake-slice cards. */
export function withHoverLift(Component): ComponentType {
    return (props: any) => (
        <Component
            {...props}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    )
}

/* 3D tilt toward the cursor on hover — apply to cards for a "picked up" feel. */
export function withTilt(Component): ComponentType {
    return (props: any) => {
        const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
        const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })

        const onMove = (e: React.MouseEvent) => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 12)
            rx.set(((e.clientY - r.top) / r.height - 0.5) * -12)
        }
        const reset = () => {
            rx.set(0)
            ry.set(0)
        }

        return (
            <Component
                {...props}
                onMouseMove={onMove}
                onMouseLeave={reset}
                style={{
                    ...props.style,
                    transformPerspective: 800,
                    rotateX: rx,
                    rotateY: ry,
                }}
            />
        )
    }
}

/* Morphing organic blob — apply to the About Us image frame. */
export function withBlob(Component): ComponentType {
    return (props: any) => (
        <Component
            {...props}
            style={{ ...props.style, overflow: "hidden" }}
            animate={{
                borderRadius: [
                    "46% 54% 52% 48% / 52% 46% 54% 48%",
                    "54% 46% 48% 52% / 46% 54% 46% 54%",
                    "50% 50% 54% 46% / 54% 48% 52% 46%",
                    "46% 54% 52% 48% / 52% 46% 54% 48%",
                ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
    )
}
