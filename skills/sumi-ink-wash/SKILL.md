---
name: sumi-ink-wash
description: "Design system for the Sumi Ink Wash aesthetic: washi-paper palette, 5-level ink-load hierarchy, Shippori Mincho typography, vermilion hanko seal accent, paper grain texture. Use when building UI, web pages, or components in a Japanese sumi-ink-wash or zen-minimal style."
---

# Sumi Ink Wash

## When to use this style

When the output calls for a calm, minimal, ink-on-paper aesthetic inspired by Japanese sumi-e brush painting — zen interfaces, meditation apps, poetry readers, tea-ceremony UIs, or any context where restraint, negative space, and ink-load hierarchy convey elegance.

## Visual Language

- **Color**: Washi paper `#f4eedd` background. Ink tones span the ink-load hierarchy from dilute wash `#a9a292` (`--ink4`) to deepest `#14110e` (`--ink0`). Accent is traditional vermilion `#b8342a` for stamp/seal moments.
- **Selection highlight**: `--vermilion` (`#b8342a`) is the official text-selection highlight color. The `::selection` pseudo-element uses vermilion background with washi-paper text for a stamped-ink feel.
- **Typography**: Shippori Mincho for headings and body, JetBrains Mono for code and data.
- **Key elements**: Generous whitespace, ink-load hierarchy (thicker strokes for importance), sumi washes for backgrounds, vermilion seal/stamp accent, vertical rhythm inspired by Japanese calligraphy scrolls.

## Construction Rules

- Page background is washi paper `#f4eedd` — warm, off-white, never pure white.
- Text follows ink-load hierarchy: the most important content gets the deepest ink (`#14110e`, `--ink0`), heavy prose `#2b2722`, body prose `#4d463d`, labels `#7a7062`, light wash `#a9a292`.
- Borders are thin, dark lines — like sumi brush strokes. Use `1px solid` with ink colors.
- Corners are near-sharp: `0px` on cards and containers, up to `3px` on tiny stamps and badges, `50%` only for circular dots and seal glyphs. No drop shadows — depth is ink-load weight (inset stamp rings and the narrow-screen nav overlay are the only exceptions).
- Vermilion (`#b8342a`) is used sparingly — like a hanko stamp. Reserve for accent elements: active states, important badges, the single call-to-action.
- Vertical `writing-mode` is acceptable for decorative or short-form content but never for body text.
- The navigation shell is a mokuroku (目録) sidebar: kanji + label rows, with the active entry marked by a thin vermilion edge and a pale wash. It collapses to a kanji-only spine with the catalog title written vertically down the edge — the spine text is always the literal 目録 glyphs, the same fixed title as the expanded header, never a section kanji, row label, or document name. Toggle is the vermilion 三 button. In the collapsed rail, hovering fans out every label as an unrolled paper tab; open/close animates with an overshoot ease and a staggered label cascade.
- Generous padding and margin — whitespace is structural, not empty.
- Code blocks sit on the inkstone — `--paper3` (`#e3ddc8`) — with a thin border.

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
- **Border-radius:** Near-sharp — `0px` on containers, up to `3px` on stamps/badges, `50%` only for circular dots and seal glyphs.
- **Box-shadow:** No drop shadows; depth is carried by ink-load weight. Inset 1px rings draw hanko stamp borders, and the narrow-screen nav overlay casts one soft shadow.
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

- **Mokuroku sidebar (navigation):** collapsible catalog rail (目録). Expanded: 目録 title + document label, kanji + mono label rows, active entry gets a thin vermilion edge and a pale wash. Collapsed: kanji-only spine with the vertical 目録 title — the static catalog title, identical glyphs to the expanded header, never a section or row kanji — and a small version seal at the foot; hovering fans out every label as an unrolled paper tab (instant side-legend, click-through). Persists state via localStorage; open/close uses an overshoot ease with a staggered label cascade; on narrow screens the rail is a hidden overlay with a floating 三 toggle and backdrop. Copy this component's shell markup, CSS, and JS verbatim from `sumi-ink-wash.html`; per document only the nav rows, nav-title, seal text, and meta-text change.

For the full component showcase and live examples, see `sumi-ink-wash.html` in this directory.
