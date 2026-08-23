---
name: html-presentation
description: "Produces a single-file HTML presentation with embedded light/dark themes (canonical dark, nocturne dark, sumi-ink-wash light). Picks a theme at random (50/50 light/dark) unless the user specifies one. Use when output exceeds ~100 lines in markdown or is meant to be read, explored, or shared — specs, plans, code reviews, research, prototypes, custom editors."
---

# HTML Presentation

## What this skill produces

A single-file HTML document with a navigable layout (collapsible
sidebar rail, section anchors, responsive column), full component library,
and one-click markdown export. Designed for complex, structured output that
has more than
one section — specs, plans, code reviews, research synthesis, prototypes,
design variants, parameter tuning, custom editors, and any output with
tabular, navigable, or multi-section content.

The skill now embeds **light and dark themes** as swappable shells. Unless
the user pins a theme, the agent picks one at random (coin-flip 50/50
light vs dark, then uniform within the pool) so repeated use doesn't get
boring.

When using this skill, also include a short markdown summary in the
conversation unless the user asks for HTML only.

## Authority boundary

This skill is three layers + theme pool with one authority per layer, zero overlap:

- `SKILL.md` — behavioural law, roles, policy, writing rules, archetypes,
  export contract, inheritance law, theme registry + picker. No hex values, no CSS.
- `html-presentation-style-guide.html` — visual law, component demonstrations,
  typography scale, spacing scale, full component CSS. Source of truth for how
  things look, not how to use them.
- `skeleton.html` — the bare template (canonical dark). Exact values, layout shell implementation,
  print block, accessibility wiring, clipboard wiring, `copyMarkdown()` logic.
  Single source of truth for how the canonical shell is built.
- `themes/` — theme pool: `themes/dark/*.html` and `themes/light/*.html`.
  Each file is a self-contained shell (its own `:root` tokens, fonts, layout
  variant). No theme depends on another skill.

A model generating HTML **always starts from the selected theme's HTML**
(`skeleton.html` for canonical, or one file from `themes/`). Replace the
marked `<!-- CONTENT BEGIN -->` ... `<!-- CONTENT END -->` region only.
Do not rewrite the shell. Do not inline hex; use the token classes.

## Token roles

The skeleton defines the token vocabulary; this file defines the roles.

- Background depth tokens (`--bg`, `--bg2`, `--bg3`, `--bg4`): page depth
  hierarchy. Default 4 levels, flexible 2–5 as needed — not 6, not 1.
- Text legibility tokens (`--fg`, `--fg2`, `--fg3`): headings and emphasis,
  body prose, meta and labels.
- Accent token (`--accent`): links, active rail states, title. Use once.
- Focus ring and print tokens: see `skeleton.html`.
- Semantic tokens (`--green`, `--red`, `--blue`, `--yellow`): diffs, badges,
  tags, warnings — state, not decoration.
- Structural tokens (`--border`, `--focus`, `--svg-stroke`, `--print-link`):
  dividers, arrows, print theme wiring.
- Selection (`--selection`): text selection highlight (`::selection` background).
- Optional (`--hl`, `--hl-bg`, `--num`): sparingly.

No invented aliases or one-off hex outside the selected shell's `:root`.
Style guide + skeleton share the same `:root` block. Theme shells declare
their own `:root` overrides (e.g. `--glow` for nocturne, `--paper`/`--ink`
for sumi) but keep the same role mapping.

## Layout shell

Collapsible left rail — free-floating (v2.1). The v2.0 horizontal top bar is
gone. The section index floats on the page background: no rail background, no
separator border — a conceptual sidebar, not a block. Layout is a grid:
`.shell` = `rail + (.content = main → footer)`, shell `max-width: 1360px`
centered. The rail is `position: sticky` at `260px`; one click on the `«`
toggle collapses it to a `56px` slim rail (numbers only) that keeps the
active-section highlight. Collapse state persists in `localStorage`. The
title wraps when long; the section list is vertically centered in the
viewport; version meta sits at the rail bottom. Content column centered at
`max-width: 960px`. All navigation handled by section anchor links and
`scroll-margin-top: 1rem` on `section` (no sticky top bar). Under `860px`
the rail becomes a static chip row above the content. SVG diagrams use
`.diagram-svg` with `min-width: 520px` so they scroll horizontally on
narrow screens.

**Rail structure:**
- Title: `scope / document-type` (e.g. `zeroclaw / spec`) — wraps, accent
- Toggle button (`«`/`»`, top-right): collapse to the 56px slim rail
- Numbered links (`00`, `01`, ...) to section anchors, vertically centered
- Meta at the bottom: version/date only — no export buttons in the rail

**Footer structure:**
- Left: document identifier and version
- Right: a single export action — "copy markdown" (no print button, no copy-link/share)

See `skeleton.html` for the exact markup. Theme shells may override rail
width/position (e.g. nocturne's 230px sticky left-rail, sumi's mokuroku
sidebar) — read the selected theme's HTML for its shell.

## Theme Registry

Themes are grouped by mode so the random picker can flip 50/50 light vs dark
even when counts are uneven. Each theme is a standalone HTML shell in `themes/`.

| Theme | File | Mode | Vibe |
|---|---|---|---|
| canonical | `skeleton.html` | dark | neutral dark, free-floating rail, Inter + JetBrains Mono |
| nocturne | `themes/dark/nocturne.html` | dark | deep gray `#08090c` + violet glow `#c8b6ff`, Fraunces + JetBrains Mono, 230px sticky left-rail |
| sumi-ink-wash | `themes/light/sumi-ink-wash.html` | light | washi paper `#f4eedd` + vermilion `#b8342a`, Shippori Mincho + JetBrains Mono, mokuroku sidebar |

Add new themes by dropping a self-contained HTML shell into `themes/dark/` or
`themes/light/` and adding one row here. No other skill needs to reference it.

## Theme Selection (random picker)

Pick the shell **before** reading any HTML. Load only the selected file.

1. **If user pinned a theme** — name (`nocturne`, `sumi`, `canonical`) or mode
   (`light`, `dark`, `use a light theme`) — filter to that pool/theme and pick
   uniformly within it. `shuf -i 1-N -n 1` if you have bash, otherwise an
   internal random choice. Honour the pin exactly.

2. **Otherwise (default — no preference):**
   a. Flip a coin: `shuf -i 1-2 -n 1` → `1` = dark pool, `2` = light pool. This
      keeps light/dark 50/50 even though the pools have different sizes today
      (dark=2, light=1). If a pool is empty, use the other.
   b. Pick uniformly within the chosen pool. Dark: `shuf -i 1-2 -n 1` → 1=canonical,
      2=nocturne. Light: only sumi-ink-wash today → no roll needed; when light
      gains more themes, `shuf -i 1-N -n 1` within light.
   c. Load only that file. Do not read the other theme shells.

3. **Announce the roll** in the chat summary: e.g. `Rolled 2/1 light → sumi-ink-wash`
   or `Flipped DARK (1/2) → nocturne`. One line is enough — don't list the whole registry.

Anti-repeat (optional but nice): if `temp/last-theme.txt` exists and the roll
matches it, re-roll once. Then `echo <theme> > temp/last-theme.txt`.

## Palette and theme contract

- Default palette is dark (canonical `skeleton.html`). Typography is two fonts (Inter for prose, JetBrains
  Mono for code/structure), hard limit. No gradients as default.
- Themes override palette by declaring their own `:root` tokens in their HTML shell.
  Which tokens they override and which rules they flex is documented in that shell's
  header comment. No cross-skill SKILL.md preamble needed.
- System-level rules always apply to all themes — writing rules, export
  contract, accessibility, and print. Theme-level rules (palette values, fonts,
  radius, background art, rail variant) may be overridden by the theme shell.

## Construction rules

- **Theme as copy-start.** Always begin from the selected theme's HTML (`skeleton.html` or `themes/*/*.html`). Replace the
  marked CONTENT block. Do not rewrite shell, head font imports, or JS helpers.
  When adding sections, add matching rail links (numbered `00`, `01`, ... in
  order) and keep the `#railToggle` wiring untouched (or the theme's equivalent
  toggle — e.g. sumi's `三`).
- **Code is plain by default.** Illustrative code uses `<pre><code>` in `--fg`,
  zero extra markup. No required per-token `.kw/.fn/.str/.cmt/.num/.op` spans.
  Wrap with those spans only when hand-highlighting a demo or an opt-in example.
  Component-local `copy` on code blocks is allowed; it is not document export.
- **Line numbers opt-in.** No line numbers by default. Add them in:
  - Diffs (always dual, old | new — the only justified dual-number location;
    acknowledged brittle; copy carefully).
  - Code blocks referenced by line number in prose that actually refer to lines.
- **Diagrams.** SVG via `.diagram-svg` with `min-width: 520px` for horizontal
  scroll on narrow screens. Tables for structured data. Use `--svg-stroke`
  token for neutral arrows.
- **Justify every element.** If removing it changes nothing for the reader,
  remove it. Section titles are nouns ("Migration Plan" not "Migrating the
  Database"). No hero language, no taglines, no marketing copy.
- **Mobile-responsive.** Not optional. All interactive elements require visible
  `:focus-visible` states via `var(--focus)`.
- **Accessibility.** `aria-hidden="true"` on visual-only line numbers (`.ln`,
  `.dl-nums`, `.dl-gut`). Honour `prefers-reduced-motion`. Clipboard must fall
  back to `execCommand('copy')` and surface failure feedback.
- **Print.** A `@media print` block lives once in each shell and handles
  light-on-white for any derived document. Tints are 12–16% on white
  (8% is near-invisible on paper). Base 8% on dark is intentional — background
  darkness compensates; the print bump is its known consequence, not a
  contradiction. Per-document print authorship is eliminated.
- **Export — one button, copy markdown.** Every interactive document has exactly
  one export control, in the footer: **"copy markdown"** (document source as
  markdown). Do NOT add print / PDF, copy link / copy URL / share, or
  copy as JSON / prompt / diff — dead weight the model tends to invent.
  The document is a two-way tool, not a dead page.
  The walker is recursive and descends `<section>` wrappers.

## Writing rules

- Section titles are nouns. Action goes in the prose below.
- Rail title format: `scope / document-type`.
- No hero language in tools. Developer document, not a landing page.
- Callouts are exceptional. One per section is the ceiling. If every section
  has a callout, none are exceptional.
- **Callouts annotate; recommendations conclude.** A callout is a warning or
  aside. A recommendation block (`.recommendation`) signals analysis is complete
  and a judgment has been reached. Don't conflate them.
- **Badges communicate change.** A badge is a state that could change. If it's
  static forever, it's a label — use `.tag`.
- Tag labels and badge labels must match their class name exactly. No invented
  labels ("new", "✓ clean", "current", "planned") — if a new word is needed,
  add it to the fixed vocabulary list explicitly (but rarely).
- Errors are instructions. Error states say what happened and how to fix it.
  Never "something went wrong."
- No lorem ipsum. All placeholder content must be plausible and domain-appropriate.
- Option numbers are zero-padded: `01`, `02`, `03` — not `1`, `2`, `3`.
- Analysis grids need real trade-offs. Don't manufacture pros/cons to fill the
  grid. If the decision is obvious, state it as a recommendation without the grid.
- Highlight sparingly. Use `.hl` for one load-bearing phrase per paragraph at most.

## Archetypes

Ten lines beat the whole token-precision apparatus for output quality. When
the task matches an archetype, structure the document after it:

| Archetype | Sections | Components |
| --- | --- | --- |
| Spec | `overview` + N sections, one callout each | `.table-wrap`, `<pre><code>`, `.option-header`, `.callout` |
| Code review | `audit` + per-file | `.diff-block` (dual numbers), `.entity-card`, `.badge added/removed/modified`, `.file-tree` |
| Migration plan | `scope` + `steps` | `.file-tree`, `.action-list`, `.plan`, `.callout warn` |
| Research synthesis | `question` + `options` | `.analysis`, `.option-header`, `.recommendation`, `.table-wrap` |
| Decision doc / ADR | `context` + `options` | `.option-header`, `.analysis`, `.demo-area`, `.recommendation` |
| Prototype sweep | `intent` + `variants` | `.demo-area`, `.comparison table`, `.recommendation` |
| Custom editor / dashboard | `controls` + `preview` | `.demo-area` (sandbox), `.stat-card`, `kbd` |

Each archetype is enumerable from this file without opening the style guide.
For class names and exact values, read the selected theme's HTML and
`html-presentation-style-guide.html`.

## Component reference

For the full component library (19 component types — `.file-list`, `.action-list`,
`.legend`, `.h2-badge`, tables, plus the 15 listed below), class names, and
exact values, **read the selected theme's HTML and the style guide at
`html-presentation-style-guide.html`**.

The style guide is itself an implementation of the system — every component
shown can be copied as-is. Key components:

- **Code blocks** (`.code-block`): `<pre><code>` by default (plain `--fg`),
  optional language label and copy button. Line numbers → opt-in `.cl/.ln/.lc`
  for line-referenced prose; no gutter by default.
- **Diff blocks** (`.diff-block`): Dual line numbers (old | new), hunk headers
  in `--blue`, semantic backgrounds at 8% opacity. Only justified dual-number
  location; acknowledged brittle.
- **Entity cards** (`.entity-card`): Container for a named thing being analysed.
  `.active` variant adds accent left border.
- **Callouts** (`.callout`): Left-border annotations. Variants: `.info`, `.warn`,
  `.danger`. Default is accent. One per section ceiling.
- **Recommendation** (`.recommendation`): Full accent border (not left-only).
  Signals concluded judgment. Use once at end of comparison/type of document.
- **Analysis grid** (`.analysis`): Two-column pros/cons with `+`/`−` glyphs.
  Use for genuine trade-offs with real competing considerations.
- **Option headers** (`.option-header`): Numbered N-way comparisons with
  `.option-num` (zero-padded) and `.option-title`.
- **Inline tags** (`.tag`): Fixed vocabulary — `deliverable`, `temp`, `debate`,
  `remove`, `done`. Label must equal class.
- **Inline highlight** (`.hl`): Subtle bg fill + brighter text for a phrase within
  prose. Not a callout, not a badge. One load-bearing clause per paragraph, not
  whole sentences.
- **Status badges** (`.badge`): Row-level state — `added`, `removed`, `modified`,
  `pending`, `draft`, `breaking`. Label must equal class.
- **File tree** (`.file-tree`): Directory structure with change indicators.
- **File groups** (`.file-list`): Flat file list inside entity cards.
- **Action list** (`.action-list`): Steps with typed dots (create/move/remove/ask/done).
- **Stat cards** (`.stat-card`): Summary metrics in a grid.
- **Plan/steps** (`.plan`): Ordered execution with completion indicators.
- **Keyboard shortcuts** (`kbd`): For shortcut documentation in spec docs.
- **Legend** (`.legend`): Dot-color precedes tagged lists.
- **Demo area** (`.demo-area`): Sandbox container with positioned label for
  illustrated or live examples.
- **H2 badge** (`.h2-badge`): Section-level status in an H2.

## Interaction protocol

This is a rule about how the assistant should respond in chat, not about the
HTML output. Separated here so the templating rules above are not intermingled:

- When using this skill, also include a short markdown summary in the
  conversation unless the user asks for HTML only.
- The markdown summary should state what was produced and where it was saved,
  not duplicate the entire document.
