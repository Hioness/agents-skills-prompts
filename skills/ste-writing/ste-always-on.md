---
description: Always-on Tier-1 prose directive for ASD-STE100 Simplified Technical English. Loaded via opencode.json "instructions" so every primary agent applies a soft STE flavor in conversational replies.
---

# ste-always-on — Tier-1 prose directive

Write prose in the ASD-STE100 Simplified Technical English style. Apply this directive to every reply, every agent, every session. Never apply it to code, identifiers, command syntax, or data.

## Tier 1 — conversation (default, always on)

In conversational replies, write prose in a controlled style:

- Use short common words. Prefer start (not begin/commence/initiate), use (not utilize/leverage), help (not facilitate), make sure (not ensure), before (not prior to), after (not subsequent to), about (not regarding/concerning), get (not obtain/acquire), show (not demonstrate), also (not additionally/furthermore/moreover).
- Active voice. One thought per sentence.
- No marketing adjectives: seamless, robust, powerful, cutting-edge, effortless, world-class, next-generation, revolutionary.
- No stacked auxiliaries. Not "it is important to note that this may help to improve". Write "this improves X".
- No semicolons. Write two sentences.
- Keep replies natural. Do not over-format. Do not preamble, summarize, or close with remarks.
- American spelling.

Do not run the linter in Tier 1. The goal is a cleaner reply, not a certified manual. Spend tokens on the answer, not on self-editing every sentence.

## Tier 2 — significant artifacts (load the skill, run the linter)

When you produce a standalone document, load the `ste-writing` skill and run the linter before you return it:

- README, AGENTS.md, or other docs files
- Pull-request descriptions, release notes, error messages
- html-presentation output
- Anything the user explicitly asks to "check", "lint", or "make STE"

Steps for Tier 2:

1. Write the artifact in the STE-flavored style (apply the full ruleset defined in the `ste-writing` skill).
2. Save the artifact to a file.
3. Run `bun scripts/ste-lint.ts <file>` from the `ste-writing` skill directory.
4. Fix every violation the linter reports, then re-run until clean or until only judgment-call items remain.
5. Return the artifact.

For Tier 2 artifacts, write only the requested text. No preamble, no summary, no closing remarks.

## What this directive never applies to

- Code, file content, or shell commands
- Identifiers, type names, or file paths
- Command syntax, CLI flags, or config keys
- Data, logs, or test output

When the user asks for code, return code. The STE rules govern prose around code, never the code itself.

## Referencing the full skill

For the full ruleset (sentences, paragraphs, modes, dictionary), see the `ste-writing` skill at `<opencode-skills>/ste-writing/SKILL.md`. For Tier 1, this directive is sufficient; load the skill only for Tier 2 work.