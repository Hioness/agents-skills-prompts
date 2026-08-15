---
name: nocturne
description: "Design system for the Nocturne aesthetic: deep-gray palette, violet luminous glow, Fraunces and JetBrains Mono typography. Use when building UI, web pages, or components in a dark nocturnal or elegant night-mode style."
---

# Nocturne

## When to use this style

Use the Nocturne style for dark, atmospheric reading experiences — late-night coding documents, moody technical writing, elegant dark-mode presentations, and any content that benefits from a calm, luminous surface with minimal contrast.

## When not to use this style

Avoid Nocturne for projector-based presentations or bright-room environments (low contrast washes out), dense operational dashboards (the nocturnal mood hinders quick scanning), print-first documents (the dark aesthetic is lost on paper), or any content requiring WCAG AA small-text compliance throughout (see contrast concession below).

## Visual Language

- **Color**: Deep gray (`#08090c`) background with soft violet (`#c8b6ff`) glow. Warm amber highlights, cool blue inflections. Three surface depths, three ink levels. A single accent color does all the work bright colors normally do.
- **Typography**: Fraunces (soft serif with optical sizing) for prose and display. JetBrains Mono for code, labels, nav, and all structural text. The serif keeps long technical prose from feeling like a terminal.
- **Key elements**: Persistent left-rail index (not a top nav), hairline dividers, `--radius: 10px` rounded corners, soft glow shadows on interactive elements, background-attachment fixed radial gradients for atmospheric depth.

## Token Override Preamble

Nocturne keeps canonical surface/ink naming (`--bg`/`--fg` stack) but overrides the following token roles and introduces evocative names for the atmospheric dark-violet metaphor:

- **`--glow`** (`#c8b6ff`) replaces canonical `--accent` — links, active nav items, code function names, section highlights, bordered recommendations, **and text-selection highlight (`::selection`)**. Paired with **`--glow-dim`** (12% opacity) for accent fills and backgrounds. For selection highlighting, `--glow` is used at 35% opacity (`rgba(200,182,255,.35)`) with `--fg` for legibility.
- **Canonical surface/ink tokens are unchanged**: `--bg`/`--bg2`/`--bg3` and `--fg`/`--fg2`/`--fg3` follow the canonical depth/legibility hierarchy with no evocative alias needed.
- **`--serif`** (Fraunces) replaces canonical `--sans` for prose and display headings. **`--mono`** (JetBrains Mono) handles all structural text, code, nav labels, badges, tables, and UI — the mono role is unchanged.
- **Semantic tokens** follow canonical roles as a fixed set: `--amber` (highlights/warnings), `--green` (additions/success), `--red` (deletions/errors), `--blue` (info/hunk headers).
- **Line tokens**: `--line` (7% white, `rgba(255,255,255,0.07)`) and `--line-2` (13% white) for dividers — more translucent than canonical defaults to maintain low-contrast nocturnal mood.
- **Structural tokens**: `--svg-stroke` (`#2a2a30`) for neutral diagram lines, `--focus` (violet 55%) for keyboard focus rings, `--radius` (10px) for container rounding.
- **No `--paper`/`--ink` aliases**: Surface and ink hierarchy already use canonical `--bg`/`--fg` naming and need no mapping.

**This theme requires the html-presentation meta-skill.** All system-level rules — writing rules, export contract, accessibility, reduced-motion, print contract — are inherited from the canonical meta-skill at `~/.config/opencode/skills/html-presentation/`. Running Nocturne standalone (without the meta-skill) will silently produce documents with a broken export contract and missing system-level rules.

## Construction Rules

- **Always dark.** The page is always dark — no light mode toggle. Print renders light-on-white. The `--bg` stack goes three deep: page → panels → code headers.
- **Left-rail layout.** A persistent left rail (230px) carries the section index. The rail is `position: sticky; top: 0; height: 100vh` so section status stays visible at all times. Single content column with generous padding. See Layout Shell Override below for full details.
- **Rounded corners.** `--radius: 10px` on code blocks, cards, callouts, buttons, tags, badges, diagrams. Sharp edges would break the nocturnal mood.
- **Glow accent.** `--glow` (#c8b6ff) is the single luminous accent — used for links, active nav items, code function names, active step dots, bordered recommendations, and text-selection highlight (`::selection`). It has a matching `--glow-dim` at 12% opacity for fills. Selection uses `--glow` at 35% opacity on `--fg`.
- **Low contrast.** `--fg2` (prose, `#a7a39b`) sits close to `--fg3` (meta, `#6b6760`). The page breathes via generous leading and spacing, not contrast jumps.
- **Atmospheric depth.** Body background uses two radial gradients: a top violet glow and a bottom vignette. `background-attachment: fixed` keeps the glow anchored.
- **Semantic color fixed set.** `--green` (additions), `--red` (deletions), `--blue` (info), `--amber` (highlights/warnings). Each at low-opacity fills.
- **Print.** `@media print` renders light-on-white. Glow becomes violet (`#7c3aed`). Semantic tints are bumped to remain visible.

### Accessibility & contrast concession

`--fg3` (`#6b6760`) on `--bg` (`#08090c`) computes to ~3.54:1 — below the WCAG AA threshold (4.5:1) for small text. This is an intentional design choice: `--fg3` is reserved exclusively for decorative meta — line numbers, labels, non-interactive index numbers. All functional text (navigation links, prose, headings, labels) uses `--fg2` (~7.92:1 on `--bg`) or `--fg` (~17.3:1). The page sets `color-scheme: dark` for correct UA styling. The active nav link carries `aria-current="true"` for assistive technology orientation.

## Getting Started

Nocturne is a theme for the **html-presentation meta-skill** (see `~/.config/opencode/skills/html-presentation/`). It is not a standalone system — the export contract, writing rules, reduced-motion, and print contract are inherited from the meta-skill and must be present for the theme to function correctly.

To create a new document, start from `nocturne.html` as the shell. The shell structure (`<head>`, `:root` tokens, sticky left-rail scaffold, `<footer>` with export button, and the script block with clipboard helpers + IntersectionObserver) is reusable. The **per-document content** you must replace: the rail's brand title, subtitle, and nav links (they must point to your document's sections), and all `<main>` content. Keep the component CSS tokens for consistent styling.

## Layout Shell Override

Nocturne replaces the canonical horizontal top nav with a **persistent left rail** (230px) for section navigation:

- **Rail**: `<aside class="rail">` positioned `sticky; top: 0; height: 100vh` with `overflow: auto`. Background `--bg2` with 1px `--line` right border. Contains brand title (`html-presentation / style-guide`), subtitle (`nocturne · redraft`), section links with zero-padded numbers, footer metadata (version, model, component count). The rail keeps section status visible at all times without competing with the reading column.
- **Content**: `<main>` occupies the remaining grid column in a `grid-template-columns: 230px 1fr` shell. Single centered column with generous padding. Max shell width is 1140px with auto horizontal margin.
- **Footer**: Canonical — single "copy markdown" export button right-aligned, document identifier left-aligned. No other export controls.
- **Landmarks**: Rail is `<aside>` with `<nav>` for the section index. `<main>` holds all content sections. `<footer>` holds the export control. Canonical landmark structure (nav → main → footer) is preserved; nav is relocated from top bar to sidebar.
- **Collapse at 860px**: The grid collapses to single column (`grid-template-columns: 1fr`). Rail becomes `position: static; height: auto` with a bottom `--line` border (right border removed). Nav links wrap horizontally with their own 1px `--line` borders and border-radius matching `--radius`.
- **Compact at 400px**: Rail padding reduces to 1rem/0.7rem, nav links shrink to 0.58rem, section number spans (`.n`) hide. Main padding reduces, h1/h2 font sizes drop, footer stacks vertically with full-width export button.
- **Print**: Rail is `display: none` — only the content column prints. Shell collapses to single column.
- **IntersectionObserver**: Section tracking uses `rootMargin: '-40% 0px -55% 0px'` to detect when a section enters the upper viewport, highlighting the corresponding rail link with `--glow` color on `--glow-dim` background.

## Token System

```css
/* Surfaces */
--bg:  #08090c;  /* page body */
--bg2: #0d0f13;  /* panels, cards, nav */
--bg3: #121419;  /* code headers, hover states */

/* Ink — legibility hierarchy */
--fg:  #f4f1ea;  /* headings, emphasis */
--fg2: #a7a39b;  /* body prose */
--fg3: #6b6760;  /* meta, line numbers, labels */

/* Glow & semantic */
--glow:     #c8b6ff;  /* accent, links, active */
--glow-dim: rgba(200,182,255,0.12);
--amber:    #ffd9a0;  /* highlights, warnings */
--green:    #9ae6b4;  /* additions, success */
--red:      #ff9aa8;  /* deletions, errors */
--blue:     #a5c8ff;  /* info, hunk headers */

/* Lines */
--line:   rgba(255,255,255,0.07);
--line-2: rgba(255,255,255,0.13);

/* Diagram / focus */
--svg-stroke: #2a2a30;  /* neutral diagram strokes */
--focus:      rgba(200,182,255,0.55);  /* focus ring */

/* Typography */
--serif: 'Fraunces', Georgia, serif;
--mono:  'JetBrains Mono', ui-monospace, monospace;

/* Borders */
--radius: 10px;
```

Use these token names exactly. Inventing aliases or one-off hex values breaks consistency across documents.

## Components

For the full component library (19 component types), class names, exact values, typography scale, spacing scale, and implementation details, **read the HTML file at `nocturne.html`**.

The HTML file is itself an implementation of the system — every component shown can be copied as-is.
