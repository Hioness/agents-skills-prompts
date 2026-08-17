---
name: ironvale
description: "Design system for the Ironvale aesthetic: industrial artifact style, chamfered rectangles, cream-on-dark palette, Space Mono + Barlow Condensed typography, dynamic SVG barcodes. Use when building UI, web pages, or components in the Ironvale Automation style."
---

# Ironvale Automation — Style Guide

Full style guide. Copy CSS variables, component patterns, and layout rules from below.

---

## 1. Design Concept

**Industrial Artifact.** Every element should feel *printed*, *stamped*, or *fabricated* — not designed in a browser. Borrows from physical documents: spec sheets, work orders, admission tickets, equipment nameplates. Ornament is earned, not decorative.

---

## 2. Color

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0f0e0d` | Page background |
| `--cream` | `#e3d3b5` | Primary text, card fills |
| `--ink` | `#18160e` | Text on cream, card borders |
| `--dim` | `#2c2924` | Dividers, inactive structure |
| `--muted` | `rgba(227,211,181,0.38)` | Secondary labels, nav links |
| `--russet` | `rgba(170,120,65,0.50)` | Text selection highlight (`::selection`) only |

**Rules:**
- Never use pure white or pure black. Warmth in `--cream` and `--bg` is load-bearing.
- Contrast lives in the cream-on-dark / ink-on-cream flip. No third contrast axis.
- No accent colors. The `--russet` token is the sole exception — it exists exclusively for `::selection` / text highlighting and is never used as a design accent.

---

## 3. Typography

### Typefaces

| Role | Family | Weight |
|---|---|---|
| Body, UI | Space Mono | 400, 700 |
| Display, numerals | Barlow Condensed | 700, 900 |

**Space Mono** handles all running copy, labels, nav, buttons.
**Barlow Condensed** reserved for large-format display only. Never below ~1.5rem.

### Scale

```text
Hero display       clamp(4.5rem, 9vw, 7rem)    Barlow Condensed 900
Section heading    clamp(1rem, 2.5vw, 1.45rem)  Space Mono 700
Card title         0.77rem                       Space Mono 700
Body / description 0.65rem                       Space Mono 400
Label / eyebrow    0.57rem                       Space Mono 700
```

### Letter-spacing

```text
Display             0.04em
Section labels      0.22–0.32em
Nav / buttons       0.15–0.16em
Body copy           0.10em
```

### Case
All UI text is uppercase. Body descriptions inside cards can be mixed case, but labels, nav, buttons, metadata, headings are strictly `UPPERCASE`.

---

## 4. Shape Language

The defining shape is the **chamfered rectangle** — corners cut at 45°, not rounded.

```css
/* Large — tickets, CTA blocks */
clip-path: polygon(
  20px 0%, calc(100% - 20px) 0%,
  100% 20px, 100% calc(100% - 20px),
  calc(100% - 20px) 100%, 20px 100%,
  0% calc(100% - 20px), 0% 20px
);

/* Small — service cards, tags */
clip-path: polygon(
  12px 0%, calc(100% - 12px) 0%,
  100% 12px, 100% calc(100% - 12px),
  calc(100% - 12px) 100%, 12px 100%,
  0% calc(100% - 12px), 0% 12px
);
```

**Rules:**
- Never use `border-radius`.
- Chamfer scales with component: `20px` for full-width, `12px` for cards. Range: 8px–24px.
- Card/ticket borders: `1.5px solid var(--ink)`. Not 1px, not 2px.

---

## 5. Spacing

Base unit is `0.4rem` (~6.4px). All spacing is a multiple of this.

```text
Within a component   0.4–1.6rem
Between components   2.4–3.5rem
Section padding      4–6rem vertical, 3rem horizontal
Max content width    1100px (services), 900px (CTA, single column)
```

Horizontal rules inside components: `margin: 0.55rem 0` explicitly.

---

## 6. Components

### Ticket

Primary container. Three structural zones:

```text
┌──────────────────────────────────────────┐
│ MONOGRAM │ BODY                  │ STUB  │
│          │ ─ Name                │       │
│          │ ─ Tagline             │ Year  │
│          │ ─ Meta                │       │
├──────────────────────────────────────────┤
│ BARCODE                          │ ICON  │
└──────────────────────────────────────────┘
```

- **Monogram:** Large single letter, Barlow Condensed 900. Visual anchor.
- **Body:** Three tiers separated by `1.5px` rules — name, tagline, meta.
- **Stub:** Fixed width (`68px`). Year/serial or geometric icon.
- **Barcode row:** Dynamic SVG barcode, full-width minus stub.

Cream-on-dark at page level. Don't invert.

### Service Card

Three-part vertical: head / body / foot. Head has numbered category label + title. Footer has two metadata tags (location, tier). Separated by `1px solid var(--ink)` rules.

Scroll entrance via `IntersectionObserver` at `threshold: 0.1` with staggered `transitionDelay`.

### Stat Strip

Full-width, centered flex row. Each stat: large Barlow Condensed numeral + small spaced label. Divided by `1px solid var(--dim)` verticals. Mobile: collapse to 2×2 grid, drop verticals.

### Buttons

```text
Ghost button    — border: 1px solid var(--dim), color: var(--muted)
                  Hover: border + text → var(--cream)

Solid button    — background: var(--ink), color: var(--cream)
                  Hover: opacity 0.8
```

No shadows, gradients, transforms on hover. Color transitions at `0.2s`.

---

## 7. Motion

```text
Entrance (hero)      fadeUp — opacity 0→1, translateY 14px→0, 0.7s ease
Entrance (scroll)    opacity 0→1, translateY 18px→0, 0.5–0.6s ease
Stagger delay        0.1s per card
Hover transitions    0.2s — color/opacity only, no movement
```

No parallax. No continuous animation. No bouncy easing.

---

## 8. Barcodes

Functional decoration — Code-128-style bar/space rhythm, rendered dynamically via SVG.

- `preserveAspectRatio="none"` — fills container
- Rerender on `resize`
- Hero barcode: `50px` tall. Footer barcode: `26px` tall.

Never use static barcode images.

---

## 9. Copy Tone

The site speaks like a spec sheet, not a startup.

```text
✓   COMMISSION A SYSTEM
✓   FULL-TIME OPERATION
✓   99.7% UPTIME GUARANTEED
✓   PLC & HMI SYSTEMS
✓   PRECISION FOR MODERN INDUSTRY

✗   We help businesses scale smarter.
✗   Let's build something together.
✗   Next-gen solutions for your workflow.
```

**Rules:**
- Prefer nouns over verbs.
- Operational vocabulary over marketing.
- Numbers carry authority: `200+`, `99.7`, `24/7`.
- No exclamation marks. Ever.

---

## 10. What Doesn't Belong

- Rounded corners or `border-radius`
- Drop shadows (`box-shadow`)
- Gradient fills
- Hero imagery / photography
- Bright accent colors
- Mixed typeface choices beyond the two above
- Lowercase UI labels
- Animated logos or looping motion
- Cards with hover lift/float effects
