---
name: serif-text
description: "Design system for academic text-to-HTML e-reader pages: dark zinc palette, Lora serif body, Inter sans-serif headings, Tailwind CSS, TOC navigation. Use when converting Markdown or PDF text into polished reading HTML."
---

# Serif Text — Style Guide

Design system for converting academic Markdown or raw PDF text into polished, highly readable, self-contained HTML pages.

---

## 1. Design Concept

Distraction-free "E-Reader Night Mode" for studying long-form academic texts. Dark zinc/charcoal palette, highly legible serif font for body, clean sans-serif for UI headings.

---

## 2. Color

| Token | Value | Usage |
|---|---|---|
| `--readbg` | `#18181b` | Page background (Tailwind: `bg-readbg`) |
| `--readtext` | `#d4d4d8` | Primary body text |
| `zinc-100` | `#f4f4f5` | Headings |
| `zinc-200` | `#e4e4e7` | Subheadings, strong text |
| `zinc-400` | `#a1a1aa` | Secondary text, captions |
| `indigo-400` | `#818cf8` | Links, accent text |
| `indigo-300` | `#a5b4fc` | Link hover |
| `indigo-500` | `#6366f1` | Blockquote border |
| `--highlight` | `#818cf8` | Text selection highlight (`::selection` background) |
| `zinc-800` | `#27272a` | Borders, divider lines |
| `zinc-700` | `#3f3f46` | Card borders |

> **Selection highlight:** Indigo (`#818cf8`, token `--highlight`) is the official text-selection highlight color. The `::selection` pseudo-element uses `background: var(--highlight)` at ~60% opacity (`rgba(129,140,248,0.6)`) with zinc-100 text for legibility on the dark zinc background.

---

## 3. Typography

### Typefaces

| Role | Family | Weight |
|---|---|---|
| Body text | Lora (serif) | 400, 500, 600, italic |
| Headings, UI, labels | Inter (sans-serif) | 400, 500, 600 |

**Rules:**
- Serif (`Lora`) for all body copy, paragraphs, blockquotes.
- Sans-serif (`Inter`) for headings, labels, navigation, buttons, UI elements.
- Use `.ui-font` class for any sans-serif UI text.

### Scale

```text
h1 (title)            text-3xl / md:text-4xl    Inter 600
h2 (section)          text-2xl / md:text-3xl    Inter 500
h3 (subsection)       text-xl / md:text-2xl     Inter 500
h4                    text-lg                   Inter 500
Body                  text-[1.05rem]            Lora 400
Small / captions      text-sm                   Inter 400
Labels / eyebrows     text-sm uppercase         Inter 500
```

### Letter-spacing
- UI labels, eyebrows: `tracking-wide` / `tracking-wider`
- Section headings in TOC: `uppercase tracking-wider`

---

## 4. Layout

Single centered column:
```html
<div class="max-w-3xl mx-auto px-6 py-12 md:py-20">
  <!-- All content -->
</div>
```

- Max-width: `max-w-3xl` (768px)
- Padding: `px-6` mobile, generous `py-12 md:py-20` vertical

---

## 5. Tech Stack

- **Tailwind CSS** (CDN) + Typography plugin
- **Google Fonts**: Lora + Inter

```html
<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Lora', 'serif']
        },
        colors: {
          readbg: '#18181b',
          readtext: '#d4d4d8'
        }
      }
    }
  }
</script>
```

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

---

## 6. Components

### Header

```html
<header class="mb-12 border-b border-zinc-800 pb-8">
  <p class="ui-font text-indigo-400 font-medium tracking-wide text-sm uppercase mb-3">
    [Chapter label]
  </p>
  <h1 class="text-3xl md:text-4xl font-semibold text-zinc-100 leading-tight mb-4">
    [Title]
  </h1>
  <p class="ui-font text-zinc-400">By [Author]</p>
</header>
```

### Table of Contents

```html
<nav class="ui-font bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 mb-12">
  <h2 class="text-lg font-semibold text-zinc-200 mb-4 uppercase tracking-wider text-sm">
    Contents
  </h2>
  <ul>
    <li><a href="#section-id" class="text-indigo-400 hover:text-indigo-300">Section Title</a></li>
  </ul>
</nav>
```

- Only include if source has a "Contents" list.
- Styled as a UI card with translucent background.

### Main Content

```html
<main class="prose prose-invert prose-zinc max-w-none
  prose-headings:font-sans prose-headings:font-medium
  prose-a:text-indigo-400 hover:prose-a:text-indigo-300
  prose-blockquote:border-indigo-500 prose-blockquote:bg-zinc-800/30
  prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
  prose-p:leading-relaxed prose-p:text-[1.05rem]">
  <!-- Markdown content here -->
</main>
```

### Figures

```html
<figure class="my-8 pl-4 border-l-2 border-zinc-700 not-prose">
  <figcaption class="ui-font text-sm text-zinc-400 italic">
    <strong class="text-zinc-200 font-semibold not-italic">Figure 1</strong>
    Description...
  </figcaption>
</figure>
```

### Activity / Callout Boxes

```html
<div class="not-prose ui-font my-10 bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-6">
  <div class="flex items-center gap-2 mb-4 text-indigo-300 font-semibold uppercase tracking-wide text-sm">
    Activity <span class="text-zinc-400 normal-case font-normal">(Time estimate)</span>
  </div>
  <div class="text-zinc-300 text-sm space-y-3">
    <!-- Content -->
  </div>
</div>
```

---

## 7. Content Rules

### Raw PDF handling
- Clean up OCR errors.
- Remove page numbers, headers, footers.
- Infer logical heading structure.

### Heading structure
- Proper `<h1>` → `<h2>` → `<h3>` hierarchy.
- Every heading inside `<main>` gets a logical lowercase `id="..."` for TOC linking.

### Formatting integrity
- Preserve all italics, bold, lists.
- Do not summarise or truncate content.

---

## 8. What Doesn't Belong

- Pure white (`#ffffff`) or pure black (`#000000`) — warmth in the palette is load-bearing.
- Bright accent colors beyond indigo.
- System default fonts — always use Lora + Inter.
- External CSS files — everything must be self-contained in the HTML.
- Summary or truncation of source text.

---

## 9. Output Requirements

- Single `.html` from `<!DOCTYPE html>` to `</html>`.
- Output only raw HTML — no markdown fences, no commentary.
- All text from source present and intact.
