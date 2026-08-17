---
name: terminal-brutalist
description: "Design system for the Terminal Brutalist aesthetic: dark monochrome palette, monospace UI chrome, zero border-radius, 1px hard borders, flat offset shadows, binary inversion hover states. Use when building UI in the Terminal Brutalist style."
---

# Terminal Brutalist — Style Guide

Full style guide. Copy CSS variables, component patterns, and layout rules from below.

---

## 1. Design Principles

1. **Monospace everywhere in the chrome.** All labels, headers, buttons, and metadata use a monospace stack. The system sans is reserved for body prose only — and prose is rare. The typeface signals: this is a tool, not a website.
2. **No border-radius. Ever.** Corners are always 90°. Soft rounding reads as approachable consumer software. Hard edges read as infrastructure. Every element — buttons, panes, overlays — is a rectangle.
3. **Offset shadows, not blurred.** The signature interactive element is a button with a flat offset shadow (`2px 2px 0 white`). On hover it shifts 1px toward the shadow; on active, it fully "presses" into the surface. This is the entire motion vocabulary of the system.
4. **Inversion as the only hover state.** Buttons invert — dark background becomes white, white text becomes dark. There is no intermediate color. The system is binary: off or on, dark or light.
5. **Color is semantic, not decorative.** The palette is near-monochrome. Color only enters through semantic states: green for additions, red for removals/danger. Never use color for branding, hierarchy, or decoration.
6. **Uppercase labels, no sentence case.** All UI chrome — headers, button labels, column titles, pane labels — is uppercase. This is visual discipline, not shouting. It reinforces the tool aesthetic.

---

## 2. Color Tokens

```css
:root {
  --bg:            #1a1a1a;
  --fg:            #ffffff;
  --muted:         #888888;
  --border:        #ffffff;
  --border-dim:    #444444;
  --pane-bg:       #111111;
  --danger:        #cc3333;

  /* Semantic diff states */
  --added-bg:        #1a2a1a;
  --added-fg:        #bbf7d0;
  --added-word-bg:   #14532d;
  --removed-bg:      #2a1a1a;
  --removed-fg:      #fecaca;
  --removed-word-bg: #521818;

  --bw: 1px;
  --mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  --sans: system-ui, -apple-system, sans-serif;
}
```

### Base Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#1a1a1a` | Page background |
| `--pane-bg` | `#111111` | Pane/panel interior — one step darker than page bg |
| `--fg` | `#ffffff` | Primary text, active borders |
| `--border` | `#ffffff` | Bright structural borders (1px) |
| `--muted` | `#888888` | Secondary text, metadata, hints |
| `--border-dim` | `#444444` | Subtle dividers, inactive borders |
| `--danger` | `#cc3333` | Destructive actions, error states |

### Semantic Diff States

| Token | Hex | Usage |
|---|---|---|
| `--added-bg` | `#1a2a1a` | Added line background |
| `--added-fg` | `#bbf7d0` | Added line text |
| `--added-word-bg` | `#14532d` | Word-level addition highlight |
| `--removed-bg` | `#2a1a1a` | Removed line background |
| `--removed-fg` | `#fecaca` | Removed line text |
| `--removed-word-bg` | `#521818` | Word-level removal highlight |

---

## 3. Typography

### Fonts

```css
--mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
--sans: system-ui, -apple-system, sans-serif;
```

- **Chrome (UI, buttons, labels, headers, code):** `var(--mono)` — always monospace
- **Body prose (rare):** `var(--sans)` — system sans-serif

### Type Scale

| Role | Size | Weight | Case | Notes |
|---|---|---|---|---|
| Page title | `1rem` | `900` | uppercase | `letter-spacing: -0.02em` |
| Overlay title | `0.9rem` | `900` | uppercase | |
| Pane header | `0.75rem` | `900` | uppercase | |
| Button label | `0.75rem` | `bold` | uppercase | |
| Textarea / code | `0.85rem` | `normal` | — | mono |
| Table content | `0.8rem` | `normal` | — | mono |
| Column headers | `0.7rem` | `900` | uppercase | `color: var(--muted)` |
| Meta / pane stats | `0.7rem` | `normal` | — | mono, muted |
| Line numbers | `0.7rem` | `normal` | — | mono, `#555` |
| Section labels | `0.65rem` | `900` | uppercase | `letter-spacing: 0.12em`, muted |
| Drop hints | `0.65rem` | `normal` | uppercase | `letter-spacing: 0.1em`, muted |

---

## 4. Layout

```css
.guide-body {
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 900px;
}

.page-header {
  border-bottom: var(--bw) solid var(--border);
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
}

.section-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  margin-bottom: 0.75rem;
  padding-bottom: 0.35rem;
  border-bottom: var(--bw) solid var(--border-dim);
}
```

---

## 5. Components

### Buttons

```css
button {
  background: var(--bg);
  color: var(--fg);
  border: var(--bw) solid var(--border);
  padding: 0.25rem 0.6rem;
  font-family: var(--mono);
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s ease;
  box-shadow: 2px 2px 0 var(--border);
  border-radius: 0;
  outline: none;
}

button:hover {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--border);
  background: var(--fg);
  color: var(--bg);
}

button:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

button:focus-visible {
  outline: 2px dashed var(--fg);
  outline-offset: 2px;
}
```

#### Variants

```css
/* Large / Primary CTA */
.btn-large {
  font-size: 0.9rem;
  padding: 0.4rem 1.8rem;
  box-shadow: 3px 3px 0 var(--border);
}
.btn-large:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border);
}
.btn-large:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}

/* Danger */
.btn-danger {
  border-color: var(--danger);
  color: var(--danger);
  box-shadow: 2px 2px 0 var(--danger);
}
.btn-danger:hover {
  background: var(--danger);
  color: var(--fg);
  box-shadow: 1px 1px 0 var(--danger);
}

/* Active / Selected */
.btn-active {
  background: var(--fg);
  color: var(--bg);
}
```

#### Toggle Group

```css
.btn-group {
  display: inline-flex;
  border: var(--bw) solid var(--border);
  box-shadow: 2px 2px 0 var(--border);
}

.btn-group button {
  box-shadow: none;
  border: none;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
}

.btn-group button:not(:last-child) {
  border-right: var(--bw) solid var(--border);
}

.btn-group button.active {
  background: var(--fg);
  color: var(--bg);
}

.btn-group button:hover {
  transform: none;
  background: var(--fg);
  color: var(--bg);
}
```

### Panes

```css
.pane {
  border: var(--bw) solid var(--border);
  background: var(--pane-bg);
}

.pane-header {
  border-bottom: var(--bw) solid var(--border);
  padding: 0.35rem 0.6rem;
  font-family: var(--mono);
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
}

.pane-meta {
  font-size: 0.7rem;
  color: var(--muted);
  font-weight: normal;
  text-transform: none;
}

.pane-body {
  padding: 0.6rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.6;
}
```

- Pane body is `var(--pane-bg)` — darker than the page
- Pane header reverts to `var(--bg)` — creates a recessed strip effect
- `focus-within` adds a bright white border
- `drag-over` converts border to dashed

### Diff / Status States

```css
.diff-strip {
  padding: 0.4rem 0.8rem;
  font-family: var(--mono);
  font-size: 0.8rem;
}

.strip-neutral {
  background: transparent;
  color: var(--fg);
  border: var(--bw) solid var(--border-dim);
}

.strip-added {
  background: var(--added-bg);
  color: var(--added-fg);
}

.strip-removed {
  background: var(--removed-bg);
  color: var(--removed-fg);
}

.strip-empty {
  background: #151515;
  color: #333;
}

.word-added {
  background: var(--added-word-bg);
  font-weight: bold;
  border-bottom: 1px dashed var(--added-fg);
}

.word-removed {
  background: var(--removed-word-bg);
  text-decoration: line-through;
  font-weight: bold;
  border-bottom: 1px dashed var(--removed-fg);
}
```

### Table

```css
.states-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--mono);
  font-size: 0.8rem;
}

.states-table th {
  text-align: left;
  padding: 0.3rem 0.6rem;
  border-bottom: var(--bw) solid var(--border);
  background: var(--bg);
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: var(--muted);
}

.states-table td {
  padding: 0.5rem 0.6rem;
  border-bottom: var(--bw) solid var(--border-dim);
  vertical-align: middle;
}

.states-table tr:last-child td {
  border-bottom: none;
}
```

---

## 6. Spacing & Borders

| Property | Value |
|---|---|
| Border width | `1px solid` — `var(--bw)` is always `1px`. Never thicker. |
| Border radius | `0` — no rounding anywhere |
| Page padding | `0.75rem` horizontal, `0.5rem` vertical |
| Header padding | `0.6rem 0.75rem` |
| Pane header padding | `0.35rem 0.6rem` |
| Button padding (sm) | `0.25rem 0.6rem` |
| Button padding (lg) | `0.4rem 1.8rem` |
| Grid gap (panes) | `0.75rem` |
| Main gap | `0.5rem` |
| Button shadow (sm) | `2px 2px 0 var(--border)` |
| Button shadow (lg) | `3px 3px 0 var(--border)` |

---

## 7. Motion Vocabulary

```css
/* Button press */
transition: all 0.1s ease;
/* hover: translate(1px,1px), shadow shrinks to 1px 1px 0 */
/* active: translate(2px,2px), shadow gone */

/* Inversion */
/* background/color swap on hover. No partial states. */

/* Expand-to-confirm */
/* Secondary button expands from max-width:0 */
/* Used for destructive confirmations */
```

**Rules:**
- No fades, slides, or entrance animations on content.
- Motion is reserved for direct interaction feedback.
- Collapse animations use `0.05s` if needed.

---

## 8. Global Reset & Base

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
```

---

## 9. What Doesn't Belong

- `border-radius` on any element
- Blurred/drop shadows (`box-shadow` with blur radius)
- Gradient fills
- Color used for branding, hierarchy, or decoration
- Sentence case in UI chrome
- Fades, slides, or entrance animations on content
- Hover states with intermediate colors (partial opacity/tints)
- Serif or non-monospace fonts in the UI chrome
- Border widths thicker than `1px`
