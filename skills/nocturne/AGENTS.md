# AGENTS.md — nocturne

## Origin

- **Original Model:** hy3-free
- **Original Directory Name:** nocturne
- **Original HTML File:** nocturne.html
- **Workshop Root:** `style-guides-preferred/` — single-file HTML design system style guides (SKILL.md + HTML implementation per theme)
- **Meta-skill Reference:** `~/.config/opencode/skills/html-presentation/` (canonical token system, 19 components, layout shell, writing rules, export contract)
- **Collection Context:** One of 9 themes in workshop; sibling `cyanotype-blueprint` (cyanotype navy) explores same model family opposite mood.
- **Organize/Review Date:** 2026-07-17

## Rename Rationale & Disambiguation

**Assigned folder:** `nocturne`
**Final decision:** Keep name `nocturne` — full directory remains `nocturne`, HTML remains `nocturne.html`.

**Rationale for keeping "nocturne":**

1. **Uniqueness in 9-set:** No other theme claims "nocturne". Checked against current workshop state after parallel reorganizations:
   - `parchment-blueprint` (light warm paper)
   - `editorial-broadsheet` (was editorial-broadsheet)
   - `sumi-ink-wash` (Japanese ink)
   - `cyanotype-blueprint` (navy cyanotype)
   - `nocturne` (this — dark violet)
   - `phosphor-terminal` (phosphor green CRT)
   - `field-notes` / `03-concrete-gallery`
   - `neon-hud` (was neon-hud, cyan/magenta void)
   No collision.

2. **Hy3-free pair semantics:** `hy3-free` produced two themes exploring mood extremes from one model — `blueprint` (daylight drafting, engineering) vs `nocturne` (night reading, luminous). The pair forms a clean day/night dichotomy. Changing to `violet-nocturne` would break that poetic symmetry and imply blueprint should also be qualified (e.g., cyanotype-blueprint).

3. **SKILL.md alignment:** Frontmatter already declares `name: nocturne` and description references "Nocturne aesthetic". Renaming would require SKILL.md edit and break existing contract.

4. **Alternatives considered:**
   - `violet-nocturne`: More specific to dominant accent `#c8b6ff` glow. Rejected — verbose, accent is implementation detail; "nocturne" already conveys violet through its visual language and SKILL description. Adds 7 chars without disambiguation benefit.
   - `midnight-nocturne`: Tautological — nocturne literally means night piece; "midnight" adds no information.
   - `nocturne-glow`: Emphasizes glow shadow effect but loses elegance; glow is a sub-feature, not the theme.
   - `nocturnal-violet`: Same info as violet-nocturne reversed, less searchable.

5. **Kebab-case, discoverability:** Short, memorable, evokes exact design trope (Chopin nocturne, Whistler). Meets workshop convention.

**If future nocturne variants appear** (e.g., amber-nocturne), this base can become `violet-nocturne` retroactively; until then minimal name is preferred per Occam.

## Visual Intent

- **Aesthetic:** Dark nocturnal violet glow — "Read it in the dark." Calm surface for 1am reading. Deep gray `#08090c` page with soft violet `#c8b6ff` luminous accent doing work bright color normally does. Atmospheric depth via two fixed radial gradients: top violet glow (6% opacity at 50% -10%) and bottom vignette (60% black).
- **Palette:**
  - Surfaces: `--bg #08090c` (page), `--bg2 #0d0f13` (panels/rail/cards), `--bg3 #121419` (code headers/hover)
  - Ink: `--fg #f4f1ea` (headings), `--fg2 #a7a39b` (prose, low contrast close to meta), `--fg3 #6b6760` (meta/labels/line numbers)
  - Glow: `--glow #c8b6ff`, `--glow-dim rgba(200,182,255,.12)` — single accent for links, active nav, function names, plan dots, recommendation border
  - Semantic fixed: `--amber #ffd9a0` (hl/warn), `--green #9ae6b4` (add), `--red #ff9aa8` (del), `--blue #a5c8ff` (info/hunk)
  - Lines: `--line rgba(255,255,255,.07)`, `--line-2 rgba(255,255,255,.13)`
- **Typography:** Fraunces op sz 9..144 400/500/600 (soft serif with optical sizing) for prose/display. JetBrains Mono 400/500/700 for everything structural (nav, labels, code, badges, tables, kbd). Serif prevents terminal fatigue on long prose.
- **Construction:**
  - Always dark, no toggle. Print renders white with violet #7c3aed.
  - Left-rail layout 230px, `position: sticky; top:0; height:100vh;` with 0.7rem mono nav links, active state violet glow-dim. Not skeleton's horizontal top nav — intentional variant documented as opt-in.
  - Rounded corners `--radius 10px` on all containers (code, cards, callouts, badges, diagrams) — sharp edges would break nocturnal mood.
  - Low contrast prose (`--fg2` close to `--fg3`), breathes via leading 1.8 and spacing, not contrast jumps.
  - Hairline dividers, glow shadows.
- **Components demonstrated in HTML:** 19 types per stat-grid — code-block with copy, diff-block dual numbers, file-tree, entity-card (.active left glow), callout (info/warn/danger), analysis grid (+ / −), option-header zero-padded, recommendation (full glow border), table-wrap, plan steps with dots, stat-grid/s Watch-grid, tags (deliverable/temp/debate/remove/done), badges (added/removed/modified/pending/draft/breaking), demo-area, diagram-wrap with .diagram-svg min-width 520px, kbd, hl inline amber.

**Intent:** Dark atmospheric reading — late-night coding docs, moody technical writing, elegant dark-mode presentations. Single luminous accent creates calm, focused surface where color is restrained and glow signals importance.

## Structure

```
nocturne/
├── SKILL.md                    ← design language spec (tokens, construction rules)
├── nocturne.html      ← self-contained implementation (19 components demoed)
├── AGENTS.md                   ← this file (origin, rename rationale, intent, date)
├── .gitignore                  ← temp/, OS files, logs
└── temp/                       ← gitignored scratch / review output
```

## Maintenance Notes

- HTML is self-contained single file: tokens in :root, Google Fonts preconnect for Fraunces + JetBrains Mono only external deps.
- Token system intentionally diverges from skeleton canonical (`--accent` → `--glow`, adds `--serif`/--mono) but keeps semantic mapping; this is a theme opt-in flex, not a violation.
- Left-rail nav (230px sticky) diverges from skeleton horizontal nav — intentional variant, requires its own IntersectionObserver (rootMargin -40% / -55%).
- Print block present and specific: light-on-white, glow becomes #7c3aed, semantic tints bumped, border colors to #ccc.
- If tokens change in HTML :root, sync SKILL.md token list exactly (no invented aliases).
- Export contract: single "copy markdown" in footer — no print/PDF/share buttons.
- `temp/` gitignored — review.md lives there per assignment.
