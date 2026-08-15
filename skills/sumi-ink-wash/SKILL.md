---
name: sumi-ink-wash
description: "Design system for the Sumi Ink Wash aesthetic: washi-paper palette, 5-level ink-load hierarchy, Shippori Mincho typography, vermilion hanko seal accent, paper grain texture. Use when building UI, web pages, or components in a Japanese sumi-ink-wash or zen-minimal style."
---

# Sumi

## When to use this style

When the output calls for a calm, minimal, ink-on-paper aesthetic inspired by Japanese sumi-e brush painting — zen interfaces, meditation apps, poetry readers, tea-ceremony UIs, or any context where restraint, negative space, and ink-load hierarchy convey elegance.

## Visual Language

- **Color**: Washi paper `#f4eedd` background. Ink tones span a hierarchy from light gray (`#8a8070`) to jet black (`#1a1a1a`). Accent is traditional vermilion (`#cc3333`) for stamp/seal moments.
- **Selection highlight**: `--vermilion` (`#b8342a`) is the official text-selection highlight color. The `::selection` pseudo-element uses vermilion background with washi-paper text for a stamped-ink feel.
- **Typography**: Shippori Mincho for headings and body, JetBrains Mono for code and data.
- **Key elements**: Generous whitespace, ink-load hierarchy (thicker strokes for importance), sumi washes for backgrounds, vermilion seal/stamp accent, vertical rhythm inspired by Japanese calligraphy scrolls.

## Construction Rules

- Page background is washi paper `#f4eedd` — warm, off-white, never pure white.
- Text follows ink-load hierarchy: the most important content gets the darkest ink (`#1a1a1a`), secondary gets medium (`#4a4238`), tertiary is light wash (`#8a8070`).
- Borders are thin, dark lines — like sumi brush strokes. Use `1px solid` with ink colors.
- Corners are sharp. No border-radius. No shadows.
- Vermilion (`#cc3333`) is used sparingly — like a hanko stamp. Reserve for accent elements: active states, important badges, the single call-to-action.
- Vertical `writing-mode` is acceptable for decorative or short-form content but never for body text.
- Generous padding and margin — whitespace is structural, not empty.
- Code blocks use a light ink-wash background (`#e8e0cc`) with a thin charcoal border.

## Token Override Preamble

This theme replaces the meta-skill's default dark palette with a **washi-paper and sumi-ink** light palette. All tokens below override the skeleton defaults. The evocative names (washi paper, ink-load hierarchy, vermilion seal) are the primary authoring vocabulary; the canonical aliases link them to the meta-skill token roles.

### Evocative to canonical mapping

| Evocative | Hex / value | Canonical alias | Role |
|---|---|---|---|
| `--paper` | `#f4eedd` | `--bg` | Page body — warm off-white washi |
| `--paper2` | `#ece6d3` | `--bg2` | Cards, nav, code headers |
| `--paper3` | `#e3ddc8` | `--bg3` | Code body, tables, inkstone block |
| `--ink0` | `#14110e` | `--fg` | Headings, structural text, emphasis |
| `--ink1` | `#2b2722` | `--fg2` | Heavy prose, secondary text |
| `--ink2` | `#4d463d` | `--fg3` | Body prose — main reading weight |
| `--vermilion` | `#b8342a` | `--accent` | Links, active nav, hanko seals, CTAs, `::selection` background |
| `--gold` | `#b89968` | `--yellow` | Warnings, modified status, cautions |
| `--gold-bg` | `rgba(184,153,104,0.08)` | `--yellow-bg` | Gold fill for badges and callouts |
| `--moss` | `#6e7d3e` | `--green` | String values in code, additions |
| `--moss-bg` | `rgba(110,125,62,0.08)` | `--green-bg` | Moss fill for badges |
| `--border` | `rgba(20,17,14,0.16)` | `--border` | All dividers, card borders |
| `--focus` | `rgba(184,52,42,0.45)` | `--focus` | Keyboard focus ring (vermilion) |

> **Extended hierarchy:** Ink tones `--ink3` (`#7a7062`, labels/meta) and `--ink4` (`#a9a292`, line numbers/wash) go beyond the canonical `--fg3` for deeper ink-load gradation. `--vermilion-deep` (`#7a2418`) is an internal variant for code keywords. `--brush` (`rgba(20,17,14,0.55)`) and `--border-wash` (`rgba(20,17,14,0.08)`) are decorative structural tokens without canonical equivalents. These extensions are allowed as ink-load hierarchy is the theme's defining characteristic.

### Rules flexed

- **Palette:** Light washi paper (`#f4eedd`) background replaces dark base. Paper grain via SVG turbulence noise overlay at 0.5 opacity multiply.
- **Typography:** Shippori Mincho (serif) for body and headings replaces Inter. JetBrains Mono retained for code and structural text.
- **Border-radius:** Sharp (`0px`) everywhere — no rounding.
- **Box-shadow:** None — depth carried by ink-load weight, not shadows.
- **Decoration:** Brush-stroke SVG rules under h2, hanko stamp badges with paper inset and -3deg rotation, vermilion seal motifs, gold brushed `.hl` highlights.

## Token System

All tokens are defined in `sumi-ink-wash.html` `:root`. Use these evocative names exactly; do not invent aliases or one-off hex values.

**Washi paper (depth hierarchy):**
- `--paper`: `#f4eedd` — page body
- `--paper2`: `#ece6d3` — cards, nav, code headers
- `--paper3`: `#e3ddc8` — code body, tables

**Ink-load hierarchy (6 levels):**
- `--ink0`: `#14110e` — headings, structural, emphasis
- `--ink1`: `#2b2722` — heavy prose
- `--ink2`: `#4d463d` — body prose
- `--ink3`: `#7a7062` — labels, meta
- `--ink4`: `#a9a292` — line numbers, dilute wash

**Accent (vermilion seal):**
- `--vermilion`: `#b8342a` — accent, links, active states, hanko stamps, `::selection` background
- `--vermilion-deep`: `#7a2418` — code keywords
- `--vermilion-bg`: `rgba(184,52,42,0.07)` — vermilion fill for badges

> **Selection highlight:** `--vermilion` is also the official text-selection color. `::selection` uses `background: var(--vermilion)` with `color: var(--paper)` — vermilion ink stamped onto washi paper.

**Rare second accent (tea-gold):**
- `--gold`: `#b89968` — warnings, modified status
- `--gold-bg`: `rgba(184,153,104,0.08)` — gold fill

**Semantic:**
- `--moss`: `#6e7d3e` — string syntax, additions
- `--moss-bg`: `rgba(110,125,62,0.08)` — moss fill
- `--focus`: `rgba(184,52,42,0.45)` — keyboard focus ring (vermilion)
- `--border`: `rgba(20,17,14,0.16)` — all dividers and card borders
- `--border-wash`: `rgba(20,17,14,0.08)` — lighter decorative borders
- `--brush`: `rgba(20,17,14,0.55)` — brush-stroke SVG paths

**Structural:**
- `--mono`: `'JetBrains Mono','Menlo',monospace` — code and structural font stack
- `--serif`: `'Shippori Mincho','Hiragino Mincho ProN','Songti SC',serif` — body and display font stack

Use these token names exactly. Inventing aliases or one-off hex values breaks consistency across documents.

## Components

For the full component showcase and live examples, see `sumi-ink-wash.html` in this directory.
