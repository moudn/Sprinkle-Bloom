# Framer code components & overrides

Two kinds of code here:

- **Components** (`FloatingBalloon.tsx`, `Marquee.tsx`) — things you drag onto the
  canvas as their own layer.
- **Overrides** (`Overrides.tsx`) — behaviors you attach to layers you've already
  designed (cards, images).

Everything uses `framer-motion`, which is built into Framer — nothing to install.

---

## Adding the code files

1. In your Framer project, open the **Assets** panel (left).
2. Next to **Code**, click **+** → **New Code File**.
3. Paste the contents of one `.tsx` file. Repeat for each file.

## Using the components

**FloatingBalloon** and **Marquee** show up in the **Insert** menu (and in Assets →
Code) once pasted.

- **FloatingBalloon** — drag it onto the hero, set its **Image** to a balloon PNG,
  then position/size the layer. Give each of the 6 balloons a slightly different
  **Duration** and **Delay** so they float out of sync. Suggested: durations
  6.5–8.6s, delays 0–0.9s.
- **Marquee** — place it full-width under the hero. Defaults already match the site
  (berry bar, white Parisienne text, −1.4° tilt). Edit the **Text/Rest** props to
  change wording.

## Using the overrides

1. Select a layer on the canvas.
2. In the right panel, scroll to the **Code** section → **+** → choose
   `Overrides.tsx` → pick the override.

| Override        | Apply to | Effect |
|-----------------|----------|--------|
| `withFloat`     | Each hero balloon (if you use plain Image layers instead of the component) | Gentle continuous float |
| `withFloatSlow` | The centre cake image | Slower, larger float |
| `withHoverLift` | Treat cards, cake-slice cards | Lifts on hover |
| `withTilt`      | Treat cards, cake-slice cards | Tips toward the cursor in 3D |
| `withBlob`      | The About Us image frame | Slowly morphs its rounded shape |

> Use **either** the `FloatingBalloon` component **or** a plain Image + `withFloat`
> override for the balloons — not both. The component is the quicker route.

---

## Notes

- **Scroll-in / fade-up** (section content appearing as you scroll) and the
  **wordmark words rising in on load** are best done with Framer's built-in
  **Appear** and **Scroll** animations — no code needed. Add an Appear animation to
  the section, set it to "Start in view", and stagger children.
- **Reduced motion:** Framer honors the visitor's OS "reduce motion" setting for its
  native animations. The code here loops gently and is fine, but if you want it to
  fully stop under reduced motion, wrap the `animate` in a check of
  `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- **Fonts in code:** the `Marquee` font defaults to `Parisienne`. If you're using
  the real Canva "Breathing" font, change the **Font** prop to its exact name once
  it's added to your project.
