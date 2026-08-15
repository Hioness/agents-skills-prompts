---
name: monospace-text
description: "Design system for academic Markdown-to-HTML reading pages: dark mode, JetBrains Mono typography, sidebar TOC, progress bar, callout boxes. Use when converting course readers, textbooks, or long-form essays into self-contained HTML."
---

# Monospace Text — Style Guide

Design system for converting academic Markdown into a self-contained dark-mode HTML reading page.

---

## 1. Design Concept

A quiet, focused offline reading experience. Dark background, monospace font, high-contrast. The aesthetic is deliberately personal — not optimised for maximum legibility at the cost of all else, but for a reading experience that feels worth spending time in.

---

## 2. Color

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d1117` | Page background |
| `--surface` | `#161b22` | Inset surfaces, callout boxes |
| `--border` | `#21262d` | Dividers and borders |
| `--text` | `#e2e8f0` | Body text |
| `--muted` | `#8b949e` | Secondary text, figure captions |
| `--accent` | `#58a6ff` | Links, activity callout border |
| `--heading` | `#ffa657` | h1, h2 headings |
| `--sub` | `#d4956a` | h3, h4 subheadings |
| `--purple` | `#d2a8ff` | Italic terms, titles |
| `--green` | `#3fb950` | Discussion callout border |
| `--highlight` | `#fbbf24` | Text selection highlight (`::selection` background) |

---

## 3. Typography

| Role | Family | Weight |
|---|---|---|
| Everything | JetBrains Mono | 400, 700, italic |

**Rules:**
- Monospace for all text: body, headings, labels, captions, code.
- No serif or sans-serif body text.

### Scale

```text
h1 (chapter title)    2rem       700
h2 (section)          1.5rem     700
h3 (subsection)       1.25rem    700
h4                    1.1rem     700
Body                  1rem       400
Small / captions      0.85rem    400
```

### Heading Colors
- `h1`, `h2`: `--heading` (`#ffa657`, warm orange)
- `h3`, `h4`: `--sub` (`#d4956a`, muted amber)

---

## 4. Layout

Two-column CSS Grid above 960px:
```css
display: grid;
grid-template-columns: 256px 1fr;
```

- **Left column**: sticky sidebar (TOC), `position: sticky; top: 2rem;`
- **Right column**: `<article>` content area

Below 960px: sidebar hidden, article full-width.

---

## 5. Components

### Table of Contents (Sidebar)

```html
<aside class="sidebar">
  <nav>
    <ul>
      <li><a href="#section-id">Section Title</a></li>
    </ul>
  </nav>
</aside>
```

- TOC lives as anchor links in the sticky sidebar.
- If source has a `## Contents`, extract links from it and **omit that section from the article**.
- Active section highlighting via `IntersectionObserver`.

### Progress Bar

```html
<div id="progress-bar"><div id="progress"></div></div>
```

```css
#progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--border);
  z-index: 100;
}
#progress {
  height: 100%;
  background: var(--accent);
  width: 0%;
  transition: width 0.1s;
}
```

- Updates width on scroll via JavaScript.

### Callout Boxes

**Activity callout** (blue border):
```html
<div class="callout callout--activity">
  <strong>Activity</strong> — description...
</div>
```

**Discussion callout** (green border):
```html
<div class="callout callout--discussion">
  <strong>Discussion</strong> — reflection prompt...
</div>
```

```css
.callout {
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-left: 3px solid;
  background: var(--surface);
}
.callout--activity { border-color: var(--accent); }
.callout--discussion { border-color: var(--green); }
```

### Figures

```html
<figure>
  <figcaption>
    <strong>Figure N</strong> — caption text
  </figcaption>
</figure>
```

- Reserve `<blockquote>` for actual quoted passages only.

### Section IDs

Every `h2`, `h3` must have an `id` for TOC linking. Generate by:
1. Strip leading numbers
2. Lowercase
3. Replace spaces/special chars with hyphens

---

## 6. Global Resets & Base

```css
:root {
  --bg:       #0d1117;
  --surface:  #161b22;
  --border:   #21262d;
  --text:     #e2e8f0;
  --muted:    #8b949e;
  --accent:   #58a6ff;
  --heading:  #ffa657;
  --sub:      #d4956a;
  --purple:   #d2a8ff;
  --green:    #3fb950;
  --highlight: #fbbf24;
}

/* Text selection */
::selection {
  background: var(--highlight);
  color: var(--bg);
}
::-moz-selection {
  background: var(--highlight);
  color: var(--bg);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  line-height: 1.7;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
```

**Font loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

---

## 7. Content Rules

### Heading semantics
- One `<h1>` only (the chapter title, inside `<header>`)
- `##` → `<h2>`, `###` → `<h3>`, `####` → `<h4>`
- Do not shift levels. Do not convert `##` to `<h1>`.

### Lists are lists
- Numbered/bulleted lists are `<ol>` or `<ul>`, never headings.

### Formatting integrity
- Preserve all italics, bold, lists.
- Do not summarise or truncate content.

---

## 8. Output Requirements

- Single, self-contained `.html` file.
- All text from source present — nothing summarised or truncated.
- Valid HTML.
- Include reading progress bar + active TOC JavaScript.
