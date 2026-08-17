---
name: hermes
description: "Design system for the Hermes aesthetic: dark teal/green palette, sharp corners, monospace typography, 1px hairline borders, classical painting textures. Use when building UI, web pages, or components in the Hermes style."
---

# Hermes Agent Style Guide

Full style guide. Copy CSS variables, component patterns, and layout rules from below.

---

## Color Palette

```text
Background (primary):    #0d1f1a  /* deep dark teal-black */
Background (secondary):  #112219  /* slightly lighter panel */
Background (card):       #0f1e18  /* card/grid cell bg */
Border:                  #1e3a2e  /* subtle green-tinted border */
Accent red (dot/mark):   #8b2020  /* muted crimson red */
Text primary:            #d4c9a8  /* warm off-white / parchment */
Text secondary:          #7a9e8a  /* muted sage green */
Text muted:              #3d6b55  /* dim label text */
Code bg:                 #0a1710  /* near-black for code blocks */
Code text:               #c8b99a  /* warm monospace text */
Button/tag bg:           #1a3328
Highlight (selection):   #5e1818  /* deep wine — text selection highlight */
```

---

## Typography

### Fonts
- **Display / Headings:** `"Bebas Neue"` or `"League Gothic"` — all caps, wide tracking
- **Body / UI Labels:** `"IBM Plex Mono"` or `"Courier Prime"` — monospace throughout
- **Everything is monospace or condensed display. No serifs, no sans-serif body text.**

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Scale

```css
--font-display: 'Bebas Neue', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;

--text-hero:    clamp(3rem, 8vw, 6rem);
--text-section: 0.75rem;
--text-body:    0.85rem;
--text-small:   0.7rem;
--text-code:    0.8rem;

--tracking-wide:  0.2em;
--tracking-wider: 0.35em;
```

### Rules
- All section headers and labels: `letter-spacing: 0.25em; text-transform: uppercase;`
- Hero title: `font-family: var(--font-display); line-height: 0.95;`
- All body copy, nav, code, labels: `font-family: var(--font-mono);`

---

## Layout

```css
--max-width: 1340px;
--grid-cols: repeat(3, 1fr);
--gap: 1px;
--section-pad: 2.5rem 2rem;
```

- Full-bleed dark background
- Content constrained to `max-width` centered
- Features grid: CSS Grid, 3 columns, separated by `1px` borders in `var(--border)`
- Sections separated by `1px` horizontal rules

---

## Components

### Navbar

```css
nav {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

nav .logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1;
  padding: 1rem 1.5rem;
  border-right: 1px solid var(--border);
}

nav a {
  padding: 1.5rem 2rem;
  border-right: 1px solid var(--border);
  color: var(--text-secondary);
  text-decoration: none;
}
```

### Hero Section

```css
.hero {
  text-align: center;
  padding: 6rem 2rem 4rem;
  position: relative;
}

.hero .eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  color: var(--text-primary);
  line-height: 0.95;
  margin-bottom: 1.5rem;
}

.hero p {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}
```

### Install Block

```css
.install-block {
  max-width: 520px;
  margin: 0 auto 1rem;
}

.install-block .label {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.install-block code {
  display: block;
  background: var(--code-bg);
  color: var(--code-text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--border);
}
```

### Terminal

```css
.terminal {
  background: #080f0c;
  border: 1px solid var(--border);
  outline: 1px solid var(--border);
  outline-offset: 2px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--code-text);
  padding: 1rem;
  min-height: 280px;
}

.terminal .titlebar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

.terminal .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-red);
}
```

- Three dots in the titlebar (macOS-style), muted red/gray/green
- **Double-border is signature**: `border` + `outline` with `outline-offset: 2px`

### Feature Grid

```css
.features {
  border-top: 1px solid var(--border);
}

.features .grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.feature-card {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.feature-card:nth-child(3n) {
  border-right: none;
}

.feature-card h3 {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.feature-card p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
```

### Footer Bar

```css
footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

footer .cell {
  padding: 1rem 1.5rem;
  border-right: 1px solid var(--border);
}

footer .cell:last-child {
  border-right: none;
}
```

---

## Decorative Elements

### Red Square Accents

Small dark red squares (~12px) placed as minimal decorative markers near section edges.

```css
.accent-marker {
  width: 12px;
  height: 12px;
  background: var(--accent-red);
  position: absolute;
}
```

- Opacity ~60%, never more than 2–3 visible at once
- Position near borders/corners, never centrally

### Background Texture & Vignette

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: url("data:image/svg+xml,...");
  opacity: 0.04;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(ellipse at center, transparent 60%, var(--bg-primary) 100%);
  opacity: 0.5;
}
```

---

## Global Resets & Base

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-primary:    #0d1f1a;
  --bg-secondary:  #112219;
  --bg-card:       #0f1e18;
  --border:        #1e3a2e;
  --accent-red:    #8b2020;
  --highlight:     #5e1818;
  --text-primary:  #d4c9a8;
  --text-secondary:#7a9e8a;
  --text-muted:    #3d6b55;
  --code-bg:       #0a1710;
  --code-text:     #c8b99a;
}

html, body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  line-height: 1.5;
}

a { color: inherit; text-decoration: none; }

/* Selection highlight — Deep Wine #5e1818 */
::selection, ::-moz-selection {
  background: var(--highlight);
  color: var(--text-primary);
}
```

---

## Design Principles

1. **Sharp corners everywhere** — zero border-radius
2. **1px hairline borders** as primary structural element
3. **Monospace for everything** except display headline
4. **Wide letter-spacing** on all labels and UI text
5. **Teal/green darkness** — dark forest green, not black
6. **Grid-as-structure** — layout defined by borders, not spacing
7. **Muted red** as sole accent
8. **No gradients, shadows, glows** — flat and austere
9. **Information density is a feature**
