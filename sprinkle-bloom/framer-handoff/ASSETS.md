# Assets — ready to upload to Framer

All images are transparent PNGs (watercolor illustrations). Upload them in Framer
via **Assets → Media** (or just drag them onto the canvas). They're already
cleanly named. Everything here lives in `framer-handoff/assets/`.

| File                  | What it is                        | Where it's used |
|-----------------------|-----------------------------------|-----------------|
| `strawberry-cake.png` | Layered strawberry cream cake     | Hero centerpiece; About Us image |
| `berry-tart.png`      | Mixed berry tart                  | Our Treats card 1; footer row |
| `macarons.png`        | Stacked pastel macarons           | Our Treats card 2; footer row |
| `cupcake.png`         | Cupcake with cherry               | Our Treats card 3; footer row; About alt |
| `tres-leches.png`     | Tres leches slice                 | Cakes grid |
| `ube-cream.png`       | Ube cream slice (purple)          | Cakes grid |
| `tiramisu.png`        | Tiramisu slice                    | Cakes grid |
| `red-velvet.png`      | Red velvet slice                  | Cakes grid |
| `balloon-pink.png`    | Pink balloon                      | Hero + footer |
| `balloon-coral.png`   | Coral balloon                     | Hero |
| `balloon-red.png`     | Red balloon                       | Hero + footer |

## Tips
- These are the same source files as the code site, so the look carries over 1:1.
- In Framer, set each image's **Fit** to *Contain* so the transparent art isn't
  cropped.
- For the balloons in the hero, keep them as separate image layers so each can
  have its own floating animation (see `components/FloatingBalloon.tsx`).
- If you want a higher-resolution version of any illustration later, regenerate/
  export it from your original source at 2× and replace the file — the names can
  stay the same.
