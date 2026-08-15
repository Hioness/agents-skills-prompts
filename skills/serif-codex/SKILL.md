---
name: serif-codex
description: Converts academic Markdown into a self-contained dark-mode HTML reading page with a warm classical library aesthetic. Source Serif 4 body, Inter UI, terracotta accent, drop caps, pull quotes, and optional scholarly cards. Use for essays, course readers, chapters, and long-form academic texts.
---

# MD → Site: Serif-Codex

Convert academic Markdown into a polished, self-contained HTML reading page with a warm, classical library aesthetic.

## Design Philosophy

A quiet, focused reading environment inspired by candlelit manuscripts and scholarly editions. Dark warm charcoal background, legible serif body, clean sans-serif for structure, terracotta accents, and classical typographic details (drop caps, section dividers, pull quotes).

**Default output is a single centered column.** Do not add sidebars, TOC sidebars, margin annotations, or card components unless the user explicitly requests them.

## Tech Stack

- Vanilla CSS (no frameworks)
- **Google Fonts**: Source Serif 4 (body), Inter (headings, UI, labels)
- Single self-contained `.html` file

## Design Tokens

```css
:root {
  --accent:        #c97a68;   /* terracotta */
  --accent-light:  #4a3530;
  --accent-subtle: #2f2522;
  --bg-ivory:      #1c1917;   /* warm near-black */
  --bg-stone:      #252220;
  --bg-cool:       #22201d;
  --text-charcoal: #ddd8d0;
  --text-muted:    #9a9288;
  --border-subtle: #383430;
  --content-max:   740px;
}
```

## Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[TITLE]</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  font-size: 18px;
}

body {
  font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  background: var(--bg-ivory);
  color: var(--text-charcoal);
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}

:root {
  --accent: #c97a68;
  --accent-light: #4a3530;
  --accent-subtle: #2f2522;
  --bg-ivory: #1c1917;
  --bg-stone: #252220;
  --bg-cool: #22201d;
  --text-charcoal: #ddd8d0;
  --text-muted: #9a9288;
  --border-subtle: #383430;
  --content-max: 740px;
}

.page-wrapper {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}

h1, h2, h3, h4 {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
}

.doc-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-charcoal);
  margin-bottom: 0.3rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.doc-subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.doc-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  font-style: italic;
}

.section-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-charcoal);
  margin: 3rem 0 1rem;
  padding-top: 0.5rem;
}

.subsection-heading {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-charcoal);
  margin: 2rem 0 0.75rem;
}

p {
  margin-bottom: 1.1rem;
  font-size: 1.05rem;
  line-height: 1.8;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  color: #e08a78;
  text-decoration: underline;
}

/* Drop cap */
.drop-cap::first-letter {
  float: left;
  font-size: 3.8rem;
  line-height: 0.8;
  padding-right: 0.5rem;
  padding-top: 0.1rem;
  font-weight: 700;
  color: var(--accent);
}

/* Pull quote */
.pull-quote {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  border-left: 4px solid var(--accent);
  background: var(--accent-subtle);
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.65;
  color: var(--text-charcoal);
  border-radius: 0 6px 6px 0;
}

.pull-quote-attribution {
  display: block;
  margin-top: 0.6rem;
  font-size: 0.8rem;
  font-style: normal;
  color: var(--text-muted);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

/* Section divider */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0;
  color: var(--border-subtle);
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-subtle);
}

.section-divider-dot {
  margin: 0 1rem;
  font-size: 0.5rem;
}

/* Header */
.doc-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-subtle);
}

.doc-header .chap-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

::selection {
  background: #c97a68;
  color: #1c1917;
}

::-moz-selection {
  background: #c97a68;
  color: #1c1917;
}

@media print {
  .page-wrapper { max-width: 100%; padding: 0; }
  body { background: #fff; font-size: 12pt; }
}

@media (max-width: 767px) {
  .page-wrapper { padding: 1.5rem 1rem 4rem; }
  .doc-title { font-size: 1.6rem; }
  .section-heading { font-size: 1.25rem; }
}
</style>
</head>
<body>

<div class="page-wrapper">

  <header class="doc-header">
    <div class="chap-label">[CHAPTER LABEL]</div>
    <h1 class="doc-title">[TITLE]</h1>
    <div class="doc-subtitle">[SUBTITLE]</div>
    <div class="doc-meta">[AUTHOR / META]</div>
  </header>

  <!-- Content here -->

</div>

</body>
</html>
```

## Default Content Rules

### Single centered column
- Output is one centered content column (`max-width: 740px`)
- No left TOC sidebar, no right margin column, no sidebars by default

### Header
- One `<header class="doc-header">` containing:
  - `<div class="chap-label">` (module/chapter label)
  - `<h1 class="doc-title">` (main title)
  - `<div class="doc-subtitle">` (optional)
  - `<div class="doc-meta">` (author, word count, date)

### Headings
- `#` → `<h1>` (only in header)
- `##` → `<h2 class="section-heading">`
- `###` → `<h3 class="subsection-heading">`
- Every `##` and `###` gets a lowercase `id` for linking: e.g. `#the-argument`

### Paragraphs
- All body paragraphs are plain `<p>`
- First paragraph of each major section gets `<p class="drop-cap">` (drop cap)
- Preserve italics and bold

### Pull quotes
Use `<blockquote class="pull-quote">` for significant quoted passages, with optional attribution:

```html
<div class="pull-quote">
  "Quoted text..."
  <span class="pull-quote-attribution">&mdash; Author, <em>Source</em></span>
</div>
```

### Section dividers
Place between major sections:

```html
<div class="section-divider"><span class="section-divider-dot">&#9670;</span></div>
```

### Lists
- Use real `<ul>` and `<ol>` elements
- Do not convert lists to headings

### Links
- External links keep their `href`
- Color defaults to terracotta accent

### References
A references section is fine to include when the source has one. Style with the standard paragraph format.

## Optional Components

**Only use these if the user explicitly asks for them.** Do not invent cards, sidebars, or marginalia unprompted.

### Reading card (primary source excerpt)

```html
<div class="reading-card">
  <div class="reading-label">Reading N — <em>Source</em> ref</div>
  <div class="reading-text">
    <p>Quoted passage...</p>
  </div>
</div>
```

Add this CSS if used:

```css
.reading-card {
  background: var(--bg-stone);
  border-left: 4px solid var(--accent);
  border-radius: 0 6px 6px 0;
  margin: 2rem 0;
  padding: 1.5rem 1.75rem;
}

.reading-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 1rem;
}

.reading-text { font-style: italic; line-height: 1.8; }
.reading-text p { font-size: 0.98rem; }
```

### Definition card

```html
<div class="def-card">
  <div class="def-term">Term</div>
  <div class="def-desc">Definition text.</div>
</div>
```

Add this CSS if used:

```css
.def-card {
  background: var(--accent-subtle);
  border-left: 3px solid var(--accent);
  border-radius: 0 6px 6px 0;
  padding: 0.75rem 1rem;
  margin: 2rem 0;
}

.def-term {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.def-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-charcoal);
}
```

### Character card

```html
<div class="char-card">
  <div class="char-card-header">
    <div class="char-avatar" aria-hidden="true">S</div>
    <div>
      <div class="char-name">Socrates</div>
      <div class="char-dates">c.469&ndash;399 BCE</div>
    </div>
  </div>
  <div class="char-desc">Short description.</div>
  <div class="char-portrayal">Optional portrayal note.</div>
</div>
```

Add this CSS if used:

```css
.char-card {
  background: var(--bg-cool);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 1rem;
  margin: 2rem 0;
}

.char-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.char-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.char-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-charcoal);
}

.char-dates {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.char-desc, .char-portrayal {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-charcoal);
  margin-bottom: 0.4rem;
}

.char-portrayal {
  font-style: italic;
  color: var(--text-muted);
}
```

### Argument / objection card

```html
<div class="argument-card">
  <div class="argument-title">Argument: Title</div>
  <div class="premise"><strong>P1</strong> &ensp;First premise.</div>
  <div class="premise"><strong>P2</strong> &ensp;Second premise.</div>
  <div class="arrow-row">&#8595;</div>
  <div class="conclusion">&there4; Conclusion.</div>
</div>
```

Add this CSS if used:

```css
.argument-card {
  background: var(--bg-cool);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 1rem;
  margin: 2rem 0;
  font-family: 'Inter', sans-serif;
}

.argument-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.premise {
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--text-charcoal);
  margin-bottom: 0.4rem;
  padding-left: 0.5rem;
}

.arrow-row {
  text-align: center;
  color: var(--accent);
  font-size: 1.1rem;
  padding: 0.3rem 0;
  font-weight: 700;
}

.conclusion {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-charcoal);
  padding: 0.5rem 0.5rem 0;
  border-top: 1px solid var(--border-subtle);
  margin-top: 0.25rem;
}
```

### TOC (only if requested)

If the user asks for a table of contents, render it as a simple centered list near the top of the document rather than a sidebar:

```html
<nav class="toc" aria-label="Table of contents">
  <div class="toc-title">Contents</div>
  <ul>
    <li><a href="#section-one">Section One</a></li>
    <li><a href="#section-two">Section Two</a></li>
  </ul>
</nav>
```

## Output

Single `.html` from `<!DOCTYPE html>` to `</html>`. Output only raw HTML — no markdown fences, no commentary. Preserve all source text; do not summarise or truncate.
