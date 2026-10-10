---
name: model-policy
description: "Build or refresh the model policy that maps a task role to a model and a fallback. Use when the user asks about models, changes a provider, or when the policy file does not exist."
---

# model-policy

The model policy is a small file. It maps a task role to a model and a
fallback. It records what the user wants. It does not hold a frozen list of
models. The `models` tool holds the live list.

The orchestrator reads the file before it picks a model for a subagent. This
skill builds and refreshes the file. It is OpenCode-specific.

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
file. Use the `question` tool for each step. Give a sensible default, so the
user can accept it and move on.

1. Find the models. Run `opencode models`. Group the result by provider.
2. Ask the target. Global `~/.agents/model-policy.md`, or a project
   `.opencode/model-policy.md`?
3. Ask the budget shape. Flat subscriptions, metered keys, a local server, or
   a mix?
4. Ask the hard constraints. Which data stays local? Is there an approved
   model list? Is there a daily spend cap?
5. Ask the priorities. Rank cost, speed, quality, and privacy.
6. Ask the role map. For each role, offer the available models as choices.
   The roles are orchestrator, search, implementation, review, bulk, and
   sensitive.
7. Ask the behavior. When does the agent escalate? Who may swap models, the
   user or the orchestrator?
8. Write the file. Fill each field in `template.md`.
9. Show the file. Offer a refresh.

## Refresh

Run the setup again. Keep the notes and the constraints. Update the model IDs
and the `refreshed` date. Remove a model that no longer appears in
`opencode models`.

## The hands-off path

Some users do not care about models. If the user gives no preference, write a
short file with one default per role. Pick a strong model for implementation
and review, a fast one for search and bulk, and a local model for sensitive
data when one exists. Ask no more than three questions.

## Rules

- Never invent a model ID. Use a name from `opencode models`.
- Write a constraint only when the user states it.
- Keep the file short.
- Do not write secrets into the file. Use model names only.
- Leave usage logging off unless the user asks for it.
