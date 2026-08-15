# AGENTS.md — sumi-ink-wash

## Original Model

- **Model:** `glm-5.2`
- **Model family:** GLM (Zhipu AI)
- **Generation context:** Part of a batch where `glm-5.2` produced 3 wildly different skins (broadsheet newsprint, neon-hud cyberpunk, sumi ink wash) to test visual range from a single model.

## Original Names

- **Workshop dir:** `sumi-ink-wash/` (in `style-guides-preferred/`)
- **HTML file:** `sumi-ink-wash.html`
- **SKILL.md name field:** `sumi` (short, stripped)

## New Name

- **New directory:** `sumi-ink-wash/`
- **New HTML file:** `sumi-ink-wash.html`
- **Rationale:**

  Original `sumi` is technically correct (Japanese sumi-e) but too terse:

  1. **Discoverability:** `sumi` alone is ambiguous — Japanese surname, ink stick, minimalist buzzword. Added qualifiers improve search hit for the intended aesthetic "Japanese ink wash on washi paper".
  2. **Descriptiveness:** SKILL.md itself says "washi-paper palette, ink-wash hierarchy, Shippori Mincho typography, vermilion accent" and "Japanese ink-wash or zen-minimal style". New name encodes all three signals: `sumi` (cultural origin), `ink` (material), `wash` (technique). Mirrors how `editorial-broadsheet` expanded `broadsheet` and `parchment-blueprint` expanded `blueprint`.
  3. **Uniqueness in collection:** No other theme uses "sumi", "washi", "ink-wash". Check against peers:
     - `editorial-broadsheet` (newsprint)
     - `neon-hud` (cyberpunk HUD)
     - `parchment-blueprint` (light blueprint)
     - `cyanotype-blueprint` (cyanotype navy) — the 2-blueprint collision pair already disambiguated as parchment vs cyanotype
     - `nocturne`, `phosphor-terminal`, `field-notes`, `concrete-gallery`
     Zero overlap.
  4. **Alternatives considered:**
     - `sumi-ink` — keeps lineage, minimal, but "ink" alone doesn't convey wash technique, still slightly vague.
     - `washi-ink` — emphasizes paper substrate over cultural term; loses `sumi` keyword that users would actually query. Also ambiguous with other Japanese paper aesthetics (origami, chiyogami).
     - `ink-wash` — generic technique without Japanese marker; could be confused with Western watercolor wash.
     - `washi-ink-wash` — redundant (washi already implies paper), longer.
     - `zen-ink` — too broad (zen could be rock garden, enso, etc.); not specific to ink-load hierarchy.
  5. **Prefix strip:** `glm-5.2-*` prefix dropped, matching sibling renames `neon-hud` and `editorial-broadsheet`. Model lineage preserved here in AGENTS.md; directory name should signal aesthetic not provenance. Keeping prefix would be inconsistent and verbose (`sumi-ink-wash-ink-wash` 21 chars).

  Decision: `sumi-ink-wash`.

## Workshop Origin

- **Workshop root:** `/style-guides-preferred/` (sandbox)
- **Meta-skill:** `html-presentation` — defines construction rules, token system (bg/fg/accent/focus/border), 19 component library, layout shell (nav → main → footer), 21 writing rules, export contract (single "copy markdown" in footer). Canonical files in `~/.config/opencode/skills/html-presentation/` (`SKILL.md`, `skeleton.html`, `html-presentation-style-guide.html`, `AGENTS.md` v2.0).
- **Assignment:** Organize for standalone git repo + critical review.
- **Collection peers at review time:**
  - `parchment-blueprint` — light parchment blueprint
  - `editorial-broadsheet` — newsprint (was `editorial-broadsheet`)
  - `neon-hud` — cyberpunk HUD (was `neon-hud`)
  - `cyanotype-blueprint` — cyanotype navy
  - `nocturne` — dark violet
  - `phosphor-terminal` — CRT phosphor green
  - `field-notes` / `field-notes` — topo survey
  - `concrete-gallery` / `concrete-gallery` — brutalist
  - **this → `sumi-ink-wash`** — Japanese sumi-e ink wash

## Visual Intent

Sumi Ink Wash implements the v2.0 component library as **washi paper + sumi ink + vermilion seal**:

- **Background:** washi paper `#f4eedd` base (`--paper`), depth `#ece6d3` (`--paper2`) and `#e3ddc8` (`--paper3`). Radial gold wash `rgba(184,153,104,0.06)` at top, plus SVG turbulence grain at 0.5 opacity multiply — only theme with literal paper texture.
- **Ink hierarchy:** 5-level ink-load (濃→薄): `--ink0` `#14110e` structural, `--ink1` `#2b2722` heavy, `--ink2` `#4d463d` body prose, `--ink3` `#7a7062` labels/meta, `--ink4` `#a9a292` line numbers/wash. Mirrors traditional sumi concentration.
- **Accent:** one vermilion seal `#b8342a` (`--vermilion`) — hanko stamps, links, active nav, stat-card top rule, footer rule. Deep `#7a2418` for keywords, wash `rgba(184,52,42,0.07)` for badges/callouts. Rare second gold `#b89968` for warnings/modified, moss `#6e7d3e` one-off for strings.
- **Typography:** `Shippori Mincho` 400/500/700/800 for prose/display/drop cap/spine, `JetBrains Mono` for structural — 2-face hard limit respected. Vertical `writing-mode: vertical-rl` for spine numbers (hortatory, not body).
- **Motifs:** brush-stroke SVG rule under h2 (wavy path mimicking sumi stroke), left brush callout (4px wavy vermilion SVG), enso-like ink dot before h3, square hanko badges with inset paper border + -3deg rotation, 「 」 corner brackets on tags, gold brushed `.hl` (linear-gradient transparency), drop cap 3.6rem float.
- **Components:** 19 types — entity-card `.active` with vermilion left inset, stat-cards with vermilion top tick, code blocks on inkstone `--paper3` with dashed line-num rule, diff blocks vermilion/gold, file-tree with washi bg, plan timeline with 済 seal done-state, analysis yin/yang with ○/×, recommendation with 済 stamp top-right.
- **Interaction:** sticky nav hides on scroll down >10px via rAF, reappears on scroll up, IntersectionObserver active, reduced-motion kill, clipboard with execCommand fallback, copyMarkdown walks main.children (not recursive — v1.x style vs skeleton v2.0 recursive walker).

Intended usage: zen interfaces, meditation apps, poetry readers, tea-ceremony UIs, any context where restraint, negative space, ink-load hierarchy convey elegance.

## Date & Provenance

- **Original creation date in HTML footer:** 2026-07-15 (v1.0)
- **Organize/review date:** 2026-07-17
- **Workshop:** `style-guides-preferred` — single-file self-contained HTML design system style guides
- **Prepared for:** standalone git repo (SKILL.md, <name>.html, AGENTS.md, .gitignore, temp/)

## Maintenance

- If tokens change in HTML `:root`, sync SKILL.md token list (currently out of sync — SKILL.md lists `--bg`, `--ink-heavy` etc. that don't exist; HTML uses `--paper`, `--ink0-4`, `--vermilion`, `--gold`).
- Keep HTML self-contained — no external CSS except Google Fonts preconnect for Shippori Mincho + JetBrains Mono.
- `temp/` is gitignored — scratch review/output only.
- If renaming SKILL.md frontmatter, set `name: sumi-ink-wash` and update html reference in Components section (currently still points to `sumi-ink-wash.html`).
