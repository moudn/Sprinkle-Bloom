# Sprinkle & Bloom — Framer Design Handoff

Everything you need to rebuild the site in Framer, matching the design we built
in code. Work top to bottom: set up the **styles** (colors + fonts) first, then
lay out each **section**, then drop in the **code components** for the animated
bits (see `components/`).

---

## 1. Brand colors

Add these in Framer under **Assets → Colors** (name them so you can reuse them).

| Name          | Hex        | Used for |
|---------------|------------|----------|
| Cream         | `#FCF5EA`  | Page background |
| Cream Deep    | `#F6E7D2`  | Alternating section backgrounds, footer |
| Card          | `#FFFDF8`  | Cards / form surfaces |
| Ink           | `#574039`  | Primary text (warm cocoa) |
| Ink Soft      | `#8C7568`  | Secondary text, captions |
| Berry         | `#C1506A`  | Primary accent — buttons, headings, links |
| Berry Deep    | `#A23C54`  | Button/link hover |
| Pink          | `#EEA9B4`  | The "&" in the wordmark, balloon pink |
| Pink Soft     | `#F8DEE1`  | Soft pink wash (disc backgrounds, hero) |
| Sage Soft     | `#E6EBD8`  | Soft green wash (a treat disc) |
| Butter        | `#F6E7C4`  | Warm yellow wash (a treat disc) |
| Gold          | `#D2A24E`  | Fine accent details (optional) |
| Line          | `rgba(87,64,57,0.14)` | Hairline borders, dividers |

**Page background** is a warm cream with three faint radial washes in the
corners (pink top-left, butter top-right, sage bottom-right). In Framer, set the
page background to Cream, then optionally add large, very-soft blurred circles
(Pink Soft / Butter / Sage Soft) pinned to those corners at low opacity.

---

## 2. Typography

Three type roles. **Important note on the fonts:** in the Canva mockup you used
**Best Swashed** (wordmark) and **Breathing** (headings). Those are Canva's own
fonts. In Framer:

1. Open the font picker and **search for "Best Swashed" and "Breathing"** — Framer's
   library is large and may have them. If they're there, use them directly.
2. If not, either **upload the font files** (Framer → font picker → *Add font* →
   upload `.woff2`/`.ttf`) if you have a license to use them on a website, or use
   the closest free substitutes below (what the code site uses).

| Role        | Canva font (your mockup) | Free substitute (in Framer/Google Fonts) |
|-------------|--------------------------|-------------------------------------------|
| Wordmark    | Best Swashed             | **Sansita Swashed** (Bold / 700) |
| Headings    | Breathing                | **Parisienne** |
| Body / UI   | Open Sauce               | **Open Sauce Sans** (Open Sauce One also works) |

> Open Sauce is open-source, so use the real thing — search "Open Sauce Sans".

### Type scale

| Style              | Font        | Size (desktop)         | Weight | Notes |
|--------------------|-------------|------------------------|--------|-------|
| Hero wordmark      | Wordmark    | ~110px (clamp 46→110)  | 700    | Berry, white outline/glow over the cake |
| Section title      | Headings    | ~64px (clamp 45→74)    | 400    | Berry, script |
| Treat name         | Headings    | ~32px                  | 400    | Ink |
| Slice name         | Headings    | ~27px                  | 400    | Berry |
| Overline / label   | Body        | 11.5px                 | 600    | UPPERCASE, letter-spacing 0.28em, Ink Soft |
| Body paragraph     | Body        | 16px, line-height 1.7  | 400    | Ink Soft |
| Hero tagline       | Body        | 17px                   | 400    | Ink Soft, max-width ~42 characters |
| Button label       | Body        | 13px                   | 600    | UPPERCASE, letter-spacing 0.12em |
| Nav link           | Body        | 13px                   | 600    | letter-spacing 0.08em |

Body text is `line-height: 1.7` and the page uses a comfortable, airy feel — keep
generous spacing.

---

## 3. Shape & shadow tokens

| Token         | Value |
|---------------|-------|
| Radius        | 22px (cards, inputs) |
| Radius large  | 34px (form box, big panels) |
| Pill radius   | 999px (buttons) |
| Shadow (card) | x0 y22 blur46 spread-22, color `rgba(87,64,57,0.35)` |
| Shadow (soft) | x0 y14 blur30 spread-18, color `rgba(87,64,57,0.30)` |
| Card border   | 1px, Line color |

**Buttons**
- *Primary:* Berry fill, white text, pill shape, soft shadow. Hover → Berry Deep,
  lift up 3px + scale 1.03.
- *Ghost:* transparent, Berry text, 2px Berry border, pill. Hover → Berry fill,
  white text, lift.
- Padding ~ `0.95rem 2.1rem`. Small variant ~ `0.6rem 1.35rem`.

---

## 4. Layout & sections

Container: **max-width 1200px**, side padding `clamp(20px, 4vw, 48px)`, centered.
Section vertical padding: `clamp(56px, 8vw, 104px)`.

Set up **three Framer breakpoints**: Desktop (1200+), Tablet (~810), Phone (~390).
The rule of thumb everywhere: multi-column on desktop → **single column, centered**
on phone.

### 4.1 Header / Nav (sticky)
- Left: logo "Sprinkle Bloom" in the **Wordmark** font, Berry color.
- Right: text links **Home · Our Treats · About Us**, then an **Order** primary
  button.
- Starts transparent; after scrolling ~40px it gets a `rgba(252,245,234,0.9)`
  background with a blur and a subtle bottom shadow. (Framer: use a Scroll effect
  or the sticky nav's "on scroll" variant.)
- Phone: collapse links into a hamburger → overlay menu.

### 4.2 Hero (the important one)
Full height (~96vh), centered. A **square stage** (~560px, or 88vw on small
screens) holds three layers:
1. **The cake** — `strawberry-cake.png`, centered, ~64% of the stage width.
   Gentle continuous float.
2. **Six balloons** circling the cake (pink, red, coral × 2 each), each floating
   independently. Positions (relative to the stage):
   - top-left, top-right, mid-left (slightly outside), mid-right (slightly
     outside), bottom-left, bottom-right.
   - Use the **FloatingBalloon** code component for these.
3. **The wordmark** "Sprinkle **&** Bloom" overlaid across the *middle* of the
   cake, a little wider than the cake, centered. Berry color, the "&" in Pink.
   Give it a **white outline + soft glow** so it stays readable over the cake
   (in Framer: text shadow, or place a soft cream blurred ellipse behind it).

Below the stage: the **tagline** then two buttons (**Order a Custom Cake**
primary, **See Our Treats** ghost). A small "Scroll" hint with a thin animated
line can sit at the very bottom.

### 4.3 Marquee ribbon
A full-width **Berry** bar, rotated about **−1.4°** and scaled slightly so its
ends bleed off-screen. White **script** text scrolling left continuously, pausing
on hover:
> Custom Cakes ✦ Baked with Love ✦ Small-Batch Magic ✦ Fresh Every Morning ✦
Use the **Marquee** code component (or Framer's built-in Ticker).

### 4.4 Our Treats (specials trio)
Centered head: overline **"Sprinkle Bloom Specials"** + script title **"Our
Treats"**. Then **3 cards** in a row (stack on phone). Each card = Card surface,
rounded 34px, soft border/shadow, containing:
- a **circular tinted disc** with the treat image floating on it
  (disc colors: card 1 Pink Soft, card 2 Sage Soft, card 3 Butter),
- the **treat name** (script),
- a small **uppercase note**.

| # | Image             | Name                 | Note          |
|---|-------------------|----------------------|---------------|
| 1 | berry-tart.png    | Mixed Berry Tart     | Summer Fruits |
| 2 | macarons.png      | Macarons             | Petits Fours  |
| 3 | cupcake.png       | Customised Cupcakes  | Made Your Way |

Card hover: lift up ~10px + image scales/tilts slightly. (Optional: wrap in the
**TiltCard** component for a 3D tilt-toward-cursor effect.)

### 4.5 Cakes, cakes and Cakes!
**Cream Deep** background. Two columns:
- **Left copy:** overline **"Signature Flavours"**, script title **"Cakes, cakes
  and Cakes!"**, two paragraphs (below), an **Order Your Cake** primary button.
- **Right:** a **2×2 grid** of slice cards (image + script name).

| Image           | Name        |
|-----------------|-------------|
| tres-leches.png | Tres Leches |
| ube-cream.png   | Ube Cream   |
| tiramisu.png    | Tiramisu    |
| red-velvet.png  | Red Velvet  |

Paragraph 1:
> Our premade cake selection features four distinctive flavours from all over the
> world, made fresh every morning by our talented bakers using high-quality
> ingredients.

Paragraph 2:
> And if you'd like your cake to feel a little more special and unique to you, we
> can bake and decorate one fully customised — just tell us what you'd love, and
> we'll handle the rest.

On phone: copy on top, grid below (still 2×2, or 1 column).

### 4.6 About Us
Two columns:
- **Left:** the cake image inside a **morphing blob** shape (an organic rounded
  shape whose corner radii slowly animate). Use `strawberry-cake.png` (or
  `cupcake.png`).
- **Right:** overline **"Our Story"**, script title **"About Us"**, three
  paragraphs, a ghost **Read Our Story** button.

Paragraphs:
> Sprinkle & Bloom began in a tiny kitchen with a big whisk and a bigger
> imagination. We believe every celebration deserves a baked treat that makes
> people smile before they even take a bite.

> Everything is handmade in small batches with real butter, fresh fruit, and a
> generous handful of love.

> From birthday unicorns to elegant wedding florals, we pour a little joy into
> every crumb — because life is sweet, and so are you.

### 4.7 Footer
**Cream Deep** background. A centered **row of little treats/balloons**
(macarons, balloon-pink, cupcake, balloon-red, berry-tart — alternate ones nudged
up a few px). Below: the **wordmark** "Sprinkle & Bloom", a row of text social
links (**Instagram · Pinterest · Facebook · TikTok**), and a small copyright line:
> © 2026 Sprinkle & Bloom Bakery. Baked with love.

---

## 5. Motion / animation summary

Framer does a lot of this natively (**Appear** and **Scroll** effects, plus the
**Ticker** component). Use code components only where noted.

| Element              | Motion | How in Framer |
|----------------------|--------|---------------|
| Hero balloons        | Continuous gentle float (bob up/down + slight rotate), each staggered | **FloatingBalloon** component |
| Hero cake            | Slow float | FloatingBalloon with big amplitude/slow speed, or an Appear loop |
| Wordmark             | Words rise & fade in on load | Framer **Appear** animation (stagger) |
| Marquee              | Continuous horizontal scroll, pause on hover | **Marquee** component or Ticker |
| Cards (treats/slices)| Lift on hover; optional 3D tilt toward cursor | Framer hover variant; **TiltCard** for tilt |
| Section content      | Fade + rise as it scrolls into view | Framer **Scroll into view** appear effect |
| About image          | Morphing blob shape | **BlobImage** component (or animate an SVG mask) |
| Background           | Occasional balloon drifting up the page | optional; can skip in Framer |

Keep it gentle — soft easing, nothing fast or bouncy. And Framer respects
**reduced motion**; leave that on.

---

## 6. Suggested build order in Framer

1. Create the **color styles** and **text styles** (section 1–2).
2. Build the **nav** and **footer** once, make them components, reuse on every page.
3. Build the **hero** (this is the centerpiece — get the cake + wordmark +
   balloons layered right).
4. Add the **Our Treats**, **Cakes**, **About** sections.
5. Drop in the **code components** for balloons / marquee / tilt (see
   `components/README.md`).
6. Set up the **Tablet** and **Phone** breakpoints (stack columns, shrink the
   wordmark, hide 2 of the 6 balloons on phone).
7. Wire the nav links and the **Order** button to a Contact/Order page with a form.

Pages to make: **Home**, **Our Treats**, **About Us**, **Order** (contact form).
