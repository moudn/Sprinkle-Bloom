# Sprinkle & Bloom — Framer handoff pack

Everything you need to rebuild the bakery site in Framer.

```
framer-handoff/
├── DESIGN-SPEC.md        ← colors, fonts, section layouts, copy, animation list
├── ASSETS.md             ← what each image is and where it's used
├── assets/               ← the watercolor PNGs, ready to upload to Framer
└── components/
    ├── README.md         ← how to add & use the code below
    ├── FloatingBalloon.tsx  ← floating balloon component (hero)
    ├── Marquee.tsx          ← scrolling ribbon component
    └── Overrides.tsx        ← hover-lift, 3D tilt, float, morphing-blob overrides
```

## Start here
1. Read **DESIGN-SPEC.md** and set up your color + text styles in Framer.
2. Upload the images from **assets/** (see ASSETS.md for what's what).
3. Build the sections top-to-bottom (nav → hero → treats → cakes → about → footer).
4. Add the code from **components/** for the animated bits.

The live code version of the site still exists in this repo as a working
reference — open `sprinkle-bloom/index.html` if you want to see any interaction
in action while you rebuild it in Framer.
