---
name: model-policy
description: "Build or refresh the model policy for subagent models. Use during OpenCode config setup. Use it also when the user asks about models, when a provider changes, or when the policy file is absent."
---

# model-policy

The model policy is a small file. It maps a task role to a model and a
fallback. It records what the user wants. It holds no live model list of its
own; the `opencode.models` tool holds that. It may still hold an approved
list as a hard constraint.

## When to run

Run this skill during OpenCode config setup, before the orchestrator runs.
Run it even when the user does not ask about models. Run it again when the
user asks about models, when a provider changes, or when the policy file is
absent.

The orchestrator reads the file before it picks a model for a subagent. This
skill builds and refreshes the file. It is OpenCode-specific.

The OpenCode `working-dir.md` directive allows the agent to read and write
`~/.agents/model-policy.md`. It is the one path outside the working directory
that the agent may touch.

## Where the file lives

The orchestrator reads the file in this order:

1. `.opencode/model-policy.md` in the current repo.
2. `~/.agents/model-policy.md`.

Use a project file when one repo needs its own models. Use the global file as
the default for every repo. A project file replaces the global file. The two
files do not merge.

## File format

The format is Markdown. Start from `template.md` in this skill. Keep the file
under about 60 lines.

The file holds two kinds of content:

- **Constraints** are hard. A privacy rule, an approved list, and a spend cap
  are constraints. The agent must obey them.
- **Preferences** are soft. A role picks a first model and a fallback. The
  agent may swap within a role when a model fails.

## Setup

Ask for the hard facts first. Then ask for the preferences. Then write the
file. Ask each question with the `question` tool. Do not write the file from
defaults alone, unless the user picks the hands-off path. Give a sensible
default for each question, so the user can accept it and move on.

1. Find the models. Run `opencode models`. Group the result by provider.
2. Ask the target. Global `~/.agents/model-policy.md`, or a project
   `.opencode/model-policy.md`?
3. Ask the budget shape. Flat subscriptions, metered keys, a local server, or
   a mix?
4. Ask the hard constraints. Which data stays local? Is there an approved
   model list? Is there a daily spend cap?
5. Ask the priorities. Rank cost, speed, quality, and privacy.
6. Ask the role map. For each role, offer the available models as choices.
   The roles are orchestrator, search, bulk, implementation, implementation
   (complex), design, review, review (fourth opinion), and sensitive.
7. Ask the behavior. When does the agent escalate? Who may swap models, the
   user or the orchestrator?
8. Write the file. Fill each field in `template.md`.
9. Show the file. Offer a refresh.

## Refresh

Run the setup again. Keep the notes and the constraints. Update the model IDs,
the variants, and the `refreshed` date. Remove a model that no longer appears
in `opencode models`, and check each variant with the `opencode.models` tool.

## The hands-off path

Some users do not care about models. If the user gives no preference, write a
short file with one default per role. Pick a strong model for implementation
and review, a fast one for search and bulk, and a local model for sensitive
data when one exists. Confirm the defaults in one question, then write the
file.

## Rules

- Never invent a model ID. Use a name from `opencode models` or the
  `opencode.models` tool.
- Write model refs in full: `provider/model` or `provider/model#variant`.
  Bare model IDs are rejected at spawn.
- Write a constraint only when the user states it.
- Keep the file short.
- Do not write secrets into the file. Use model names only.
- Leave usage logging off unless the user asks for it.
