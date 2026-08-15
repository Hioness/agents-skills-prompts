# AGENTS.md — sumi-ink-wash

## Original Model

- **Model:** `glm-5.2`
- **Model family:** GLM (Zhipu AI)
- **Generation context:** Part of a batch where `glm-5.2` produced 3 wildly different skins to test the visual range from one model. The skins: broadsheet newsprint, neon-hud cyberpunk, and sumi ink wash.

## Original Names

- **Workshop dir:** `sumi-ink-wash/` (in `style-guides-preferred/`)
- **HTML file:** `sumi-ink-wash.html`
- **SKILL.md name field:** `sumi` (short, stripped)

## New Name

- **New directory:** `sumi-ink-wash/`
- **New HTML file:** `sumi-ink-wash.html`
- **Rationale:** Original `sumi` is technically correct (Japanese sumi-e) but too terse.

1. **Discoverability:** `sumi` alone is ambiguous — Japanese surname, ink stick, minimalist buzzword. Added qualifiers improve the search hit for the intended aesthetic "Japanese ink wash on washi paper".

2. **Descriptiveness:** SKILL.md itself says "washi-paper palette, ink-wash hierarchy, Shippori Mincho typography, vermilion accent" and "Japanese ink-wash or zen-minimal style". The new name encodes all three signals: `sumi` (cultural origin), `ink` (material), `wash` (technique). It mirrors how `editorial-broadsheet` expanded `broadsheet`, and how `parchment-blueprint` expanded `blueprint`.

3. **Uniqueness in collection:** No other theme uses "sumi", "washi", or "ink-wash". Check against peers: editorial-broadsheet (newsprint), neon-hud (cyberpunk HUD), parchment-blueprint (light blueprint), cyanotype-blueprint (cyanotype navy), nocturne, phosphor-terminal, field-notes, concrete-gallery. The 2-blueprint pair already disambiguates as parchment vs cyanotype. Zero overlap.

4. **Alternatives considered:**

| Option | Verdict | Reason |
|---|---|---|
| `sumi-ink` | Rejected | Keeps lineage, minimal, but "ink" alone does not convey the wash technique, still slightly vague |
| `washi-ink` | Rejected | Emphasizes paper substrate, loses the "sumi" keyword users would query, ambiguous with other Japanese paper aesthetics (origami, chiyogami) |
| `ink-wash` | Rejected | Generic technique without a Japanese marker, easy to confuse with Western watercolor wash |

| Option | Verdict | Reason |
|---|---|---|
| `washi-ink-wash` | Rejected | Redundant (washi already implies paper), longer |
| `zen-ink` | Rejected | Too broad (zen could be rock garden, enso, etc.), not specific to the ink-load hierarchy |

5. **Prefix strip:** The rename drops the `glm-5.2-*` prefix, matching the sibling renames `neon-hud` and `editorial-broadsheet`. This AGENTS.md preserves the model lineage. The directory name should signal aesthetic, not provenance. Keeping the prefix would be inconsistent and verbose (`sumi-ink-wash-ink-wash` 21 chars).

Decision: `sumi-ink-wash`.

## Workshop Origin

- **Workshop root:** `/style-guides-preferred/` (sandbox)
- **Assignment:** Organize for standalone git repo + critical review.

- **Meta-skill:** `html-presentation`. It defines the construction rules and the token system (bg/fg/accent/focus/border). It also defines the 19-component library and the layout shell (nav → main → footer). It defines 21 writing rules and the export contract (single "copy markdown" in footer). Canonical files live in `~/.config/opencode/skills/html-presentation/`: `SKILL.md`, `skeleton.html`, `html-presentation-style-guide.html`, `AGENTS.md` v2.0.

- **Collection peers at review time:** the peers are parchment-blueprint (light parchment blueprint), editorial-broadsheet (newsprint), and neon-hud (cyberpunk HUD). Peers: cyanotype-blueprint (cyanotype navy), nocturne (dark violet), phosphor-terminal (CRT phosphor green). Peers: field-notes (topo survey), concrete-gallery (brutalist). This theme is `sumi-ink-wash` (Japanese sumi-e ink wash). The names editorial-broadsheet and neon-hud come from earlier renames.

## Visual Intent

Sumi Ink Wash implements the v2.0 component library as washi paper + sumi ink + vermilion seal.

- **Background:** washi paper `#f4eedd` base (`--paper`), depth `#ece6d3` (`--paper2`) and `#e3ddc8` (`--paper3`). Radial gold wash `rgba(184,153,104,0.06)` sits at top, plus SVG turbulence grain at 0.5 opacity multiply. This is the only theme with a literal paper texture.

- **Ink hierarchy:** 5-level ink-load (濃→薄): `--ink0` `#14110e` structural, `--ink1` `#2b2722` heavy, `--ink2` `#4d463d` body prose. `--ink3` `#7a7062` labels/meta, `--ink4` `#a9a292` line numbers/wash. It mirrors traditional sumi concentration.

- **Accent:** one vermilion seal `#b8342a` (`--vermilion`) — hanko stamps, links, active nav, stat-card top rule, footer rule. Deep `#7a2418` for keywords, wash `rgba(184,52,42,0.07)` for badges/callouts. Rare second gold `#b89968` for warnings/modified, moss `#6e7d3e` one-off for strings.

- **Typography:** `Shippori Mincho` 400/500/700/800 for prose/display/drop cap/spine, `JetBrains Mono` for structural — 2-face hard limit. Vertical `writing-mode: vertical-rl` for spine numbers (hortatory, not body).

- **Motifs:** brush-stroke SVG rule under h2 (wavy path mimicking sumi stroke), left brush callout (4px wavy vermilion SVG). Enso-like ink dot before h3, square hanko badges with inset paper border + -3deg rotation, 「 」 corner brackets on tags. Gold brushed `.hl` (linear-gradient transparency), drop cap 3.6rem float.

- **Components:** 19 types — entity-card `.active` with vermilion left inset, stat-cards with vermilion top tick. Code blocks on inkstone `--paper3` with dashed line-num rule, diff blocks vermilion/gold, file-tree with washi bg. Plan timeline with 済 seal done-state, analysis yin/yang with ○/×, recommendation with 済 stamp top-right.

- **Interaction:** sticky nav hides on scroll down >10px via rAF, reappears on scroll up, IntersectionObserver active, reduced-motion kill. Clipboard with execCommand fallback, copyMarkdown walks main.children (not recursive — v1.x style vs skeleton v2.0 recursive walker).

Intended usage: zen interfaces, meditation apps, poetry readers, tea-ceremony UIs. It fits contexts where restraint, negative space, and ink-load hierarchy matter.

## Date & Provenance

- **Original creation date in HTML footer:** 2026-07-15 (v1.0)
- **Organize/review date:** 2026-07-17
- **Workshop:** `style-guides-preferred` — single-file self-contained HTML design system style guides
- **Prepared for:** standalone git repo (SKILL.md, <name>.html, AGENTS.md, .gitignore, temp/)

## Maintenance

- If tokens change in HTML `:root`, sync the SKILL.md token list. It is currently out of sync. SKILL.md lists `--bg`, `--ink-heavy`, and others that do not exist. HTML uses `--paper`, `--ink0-4`, `--vermilion`, and `--gold`.

- Keep the HTML self-contained, with no external CSS except the Google Fonts preconnect for Shippori Mincho + JetBrains Mono.
- `temp/` is in .gitignore. It holds scratch review/output only.
- If renaming SKILL.md frontmatter, set `name: sumi-ink-wash`. Update the html reference in the Components section (it points to `sumi-ink-wash.html`).
