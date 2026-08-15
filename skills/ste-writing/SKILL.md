---
name: ste-writing
description: 'Write prose in ASD-STE100 Simplified Technical English to remove "AI slop". Two tiers by output type: in normal conversation, write in the STE-flavored style as a light guideline (no linter); for significant standalone artifacts (READMEs, AGENTS.md, docs, PR/release text, html-presentation files, or when the user asks to check/lint), apply the full ruleset and run the linter to double-check. Use when asked to make writing not sound like AI, make docs clear or plain, or enforce a controlled writing style. Never apply to code, identifiers, or command syntax.'
---

# ste-writing

ASD-STE100 Simplified Technical English removes "AI slop": marketing adjectives, stacked auxiliaries, passive voice, long sentences. This skill runs in two tiers. Pick the tier by the **output type**, not by the user's tone.

## Tier 1 — Conversation (default)

In normal chat replies, write in the STE-flavored style as a soft guideline:

- Use short common words. Prefer start, use, help, show, get, about, before, after.
- Active voice. One thought per sentence.
- No marketing adjectives (seamless, robust, powerful, cutting-edge, effortless…).
- No semicolons. Drop the em dash only if the user dislikes it.
- Keep replies natural. Do not over-format.

Do **not** run the linter here. The goal is a cleaner reply, not a certified manual. Spend tokens on the answer, not on self-editing every sentence.

## Tier 2 — Significant artifacts (lint on demand)

When you produce a standalone document, run the linter before you return it:

- README, AGENTS.md, or other docs files
- Pull-request descriptions, release notes, error messages
- html-presentation output
- Anything the user explicitly asks to "check", "lint", or "make STE"

Workflow:
1. **Review the contents first.** Draft the prose you want the reader to read, in the STE-flavored style (full ruleset below). Get the words right before you touch any markup.
2. **Then build the code around the content.** Wrap the approved prose in HTML, a template, or whichever structure the artifact needs. For an html-presentation, write the body text, headings, and captions here, then generate the surrounding markup and styles.
3. Save the artifact to a file.
4. Run `bun scripts/ste-lint.ts <file>`. The linter reads **prose only**. It strips fenced code blocks and inline code, so it never flags code, tags, attributes, or identifiers. Do not soften your code to satisfy it.
5. Fix every prose violation the linter reports, then re-run until clean (or until only judgment-call items remain).
6. Return the artifact.

## Rules (full set — for Tier 2, and for strict mode)

WORDS
- One name for one thing. Do not call the same item by two names.
- Short common word: start (not begin/commence/initiate), use (not utilize/leverage), help (not facilitate), make sure (not ensure), before (not prior to), after (not subsequent to), about (not regarding/concerning), get (not obtain/acquire), show (not demonstrate), also (not additionally/furthermore/moreover).
- One meaning per word. "fall" means to move down, not to decrease.
- No marketing adjectives: seamless, robust, powerful, cutting-edge, effortless, world-class, next-generation, revolutionary.
- American spelling.

VERBS
- Active voice. "the parser reads the file", not "the file is read by the parser".
- A verb for an action. "analyze the log", not "perform an analysis of the log".
- No stacked auxiliaries. Not "it is important to note that this may help to improve". Write "this improves X".
- No "-ing" main verb where a simple tense works.

SENTENCES
- One instruction per sentence. Max 20 words (instruction), max 25 (descriptive).
- No contractions. Use articles: a, an, the, this, these.

PUNCTUATION
- No semicolons. Write two sentences.
- The em dash is not banned by STE; drop it only if the user asks.

STRUCTURE
- One topic per paragraph, max six sentences.
- For steps, use a numbered vertical list, one action per item, imperative form. Put a condition before its command.

For Tier 2 artifacts, write only the requested text. No preamble, no summary, no closing remarks. In conversation (Tier 1), answer normally.

## Modes

- **STE-flavored** (default for Tier 2): apply the sentence, paragraph, active-voice, and no-phrasal-verb discipline; relax the dictionary lockdown so the text keeps enough range to read naturally.
- **strict** (opt-in only): procedures, runbooks, safety text, error messages — apply every rule and both length caps. Use only when the user asks for strict, or the content is safety-critical.

## Reference

- Full standard (Issue 9): `reference/spec/` — `01-part-1-writing-rules.md` (the rules) and `02-part-2-dictionary.md` (the approved-word list). Index in `reference/spec/README.md`.
- Heuristic anti-slop linter: `scripts/ste-lint.ts` — `bun scripts/ste-lint.ts <file>` scores violations per 100 words (lower = cleaner). For Tier 2, run it and fix what it flags.
- Original Python version: `temp/ste-lint.py` (kept for reference).

Free official standard (do not paste it in full; it is copyrighted): https://asd-ste100.org
