# AGENTS.md — nocturne

## Origin

- **Original Model:** hy3-free
- **Original Directory Name:** nocturne
- **Original HTML File:** nocturne.html
- **Workshop Root:** `style-guides-preferred/` — single-file HTML design system style guides (SKILL.md + HTML implementation per theme)

- **Meta-skill Reference:** `~/.config/opencode/skills/html-presentation/` (canonical token system, 19 components, layout shell, writing rules, export contract)
- **Collection Context:** One of 9 themes in the workshop. Sibling `cyanotype-blueprint` (cyanotype navy) explores the same model family in the opposite mood.
- **Organize/Review Date:** 2026-07-17

## Rename Rationale & Disambiguation

**Assigned folder:** `nocturne`
**Final decision:** Keep name `nocturne` — full directory remains `nocturne`, HTML remains `nocturne.html`.

**Rationale for keeping "nocturne":**

1. **Uniqueness in 9-set:** No other theme claims "nocturne". Checked against current workshop state after parallel reorganizations:
   Siblings: `parchment-blueprint` (light warm paper), `editorial-broadsheet` (newsprint), `sumi-ink-wash` (Japanese ink), `cyanotype-blueprint` (navy cyanotype).
   Siblings: `nocturne` (this — dark violet), `phosphor-terminal` (phosphor green CRT), `field-notes` / `03-concrete-gallery`, `neon-hud` (cyan/magenta void).
   No collision.

2. **Hy3-free pair semantics:** `hy3-free` produced two themes from one model. The themes explore mood extremes: `blueprint` (daylight drafting, engineering) and `nocturne` (night reading, luminous). The pair forms a clean day/night dichotomy. Changing to `violet-nocturne` would break that poetic symmetry. It would also imply that `blueprint` needs a qualifier (for example, cyanotype-blueprint).

3. **SKILL.md alignment:** Frontmatter already declares `name: nocturne`. The description references the "Nocturne aesthetic". Renaming would require a SKILL.md edit and break the existing contract.

4. **Alternatives considered:**

| Option | Verdict | Reason |
|---|---|---|
| `violet-nocturne` | Rejected | More specific to the glow accent `#c8b6ff`, verbose, accent is an implementation detail, "nocturne" already conveys violet, no added benefit |
| `midnight-nocturne` | Rejected | Tautological, "nocturne" literally means night piece, "midnight" adds no information |
| `nocturne-glow` | Rejected | Emphasizes the glow shadow effect, loses elegance, glow is a sub-feature not the theme |
| `nocturnal-violet` | Rejected | Same info as `violet-nocturne` reversed, less searchable |

It adds 7 characters without a disambiguation benefit.

5. **Kebab-case, discoverability:** Short and memorable. It evokes the exact design trope (Chopin nocturne, Whistler). It meets the workshop convention.

**If future nocturne variants appear** (for example, amber-nocturne), this base can become `violet-nocturne` retroactively. Until then, keep the minimal name per Occam.

## Visual Intent

- **Aesthetic:** Dark nocturnal violet glow — "Read it in the dark." Calm surface for 1am reading. A deep gray `#08090c` page uses a soft violet `#c8b6ff` luminous accent. The accent does the work that a bright color normally does. Two fixed radial gradients add depth: top violet glow (6% opacity at 50% -10%) and bottom vignette (60% black).

- **Palette:**
  - Surfaces: `--bg #08090c` (page), `--bg2 #0d0f13` (panels/rail/cards), `--bg3 #121419` (code headers/hover)
  - Ink: `--fg #f4f1ea` (headings), `--fg2 #a7a39b` (prose, low contrast close to meta), `--fg3 #6b6760` (meta/labels/line numbers)
  - Glow: `--glow #c8b6ff`, `--glow-dim rgba(200,182,255,.12)` — one accent for links, active nav, function names, plan dots, recommendation border
  - Semantic fixed: `--amber #ffd9a0` (hl/warn), `--green #9ae6b4` (add), `--red #ff9aa8` (del), `--blue #a5c8ff` (info/hunk)
  - Lines: `--line rgba(255,255,255,.07)`, `--line-2 rgba(255,255,255,.13)`

- **Typography:** Fraunces op sz 9..144 400/500/600 (soft serif with optical sizing) for prose/display. JetBrains Mono 400/500/700 for everything structural (nav, labels, code, badges, tables, kbd). Serif prevents terminal fatigue on long prose.

- **Construction:**

  - **Always dark:** no toggle. Print renders white with violet `#7c3aed`.

  - **Left-rail layout:** 230px, `position: sticky; top:0; height:100vh;`, 0.7rem mono nav links, active state violet glow-dim. This is not the horizontal top nav of the skeleton. It is an intentional variant, documented as opt-in.

  - **Rounded corners:** `--radius 10px` on all containers (code, cards, callouts, badges, diagrams). Sharp edges would break the nocturnal mood. Hairline dividers, glow shadows.

  - **Low contrast prose:** (`--fg2` close to `--fg3`) breathes via leading 1.8 and spacing, not contrast jumps.

- **Components demonstrated in HTML:** 19 types per stat-grid. These include code-block with copy, diff-block dual numbers, file-tree, and entity-card (.active left glow). Other types: callout (info/warn/danger), analysis grid (+ / −), option-header zero-padded, recommendation (full glow border), table-wrap, plan-step dots, stat-grid/s Watch-grid. Also: tags (deliverable/temp/debate/remove/done) and badges (added/removed/modified/pending/draft/breaking). More: demo-area, diagram-wrap with .diagram-svg min-width 520px, kbd, and hl inline amber.

**Intent:** Dark atmospheric reading — late-night coding docs, moody technical writing, clean dark-mode presentations. A single luminous accent creates a calm, focused surface. Color stays restrained, and glow signals importance.

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

- The HTML file is self-contained, with tokens in `:root`. Google Fonts preconnect for Fraunces + JetBrains Mono is the only external dependency.

- The token system diverges from the skeleton canonical (`--accent` → `--glow`, adds `--serif`/`--mono`). It keeps the semantic mapping. This is a theme opt-in flex, not a violation.

- The left-rail nav (230px sticky) diverges from the skeleton horizontal nav. It is an intentional variant. It needs its own IntersectionObserver (rootMargin -40% / -55%).

- The print block is present and specific: light-on-white, glow becomes `#7c3aed`, semantic tints bump up, border colors to `#ccc`.

- If tokens change in HTML `:root`, sync the SKILL.md token list exactly (no invented aliases).
- Export contract: single "copy markdown" in the footer — no print/PDF/share buttons.
- `temp/` is in .gitignore, and `review.md` lives there per assignment.
