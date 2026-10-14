This repository contains skills and workflows that I have found useful when using agentic harnesses. I use them for work, for school, and for managing my computer. I also use them for side-projects that involve code, websites, or OSS forks that I start.

It is not a prescription. Obviously, you get to use these tools however you want, and modify them however you want. I found them useful in the way I set them up. I hope you do too.

## Made for OpenCode

The `opencode/` folder is the OpenCode config bundle. Copy it into `~/.config/opencode/`.

| File | What it does |
|---|---|
| `opencode.json` | The config: default agent, disabled built-ins, always-on instructions, and path permissions |
| `working-dir.md` | Always-on directive. Work only inside the current working directory |
| `agents/minimal.md` | Primary agent. No instructions |
| `agents/orchestrator.md` | Primary agent. Delegates work and picks a model per subagent |
| `agents/reviewer.md` | Subagent. Reviews changes and cannot edit |

The bundle no longer ships the ARCHITECT, SUPER-KARP, PLAN-KARP, or LOOP prompts. Modern models align well enough to work from a short prompt, and the orchestrator covers delegation. Earlier versions borrowed from the [KINGMODE prompt](https://github.com/aicodeking/yt-tutorial/blob/main/gemini-king-mode.md) and [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills).

### Agent topology

You talk to two agents. The rest work behind them.

| Agent | Mode | Role |
|---|---|---|
| `minimal` | primary | The default. A bare prompt for quick work |
| `orchestrator` | primary | Splits a task, picks a model per subagent, and verifies the result |
| `reviewer` | subagent | Read-only critic. The orchestrator calls it, never you |
| `explore` | subagent | Built-in. Fast read-only search |
| `general` | subagent | Built-in. General multi-step work |

### Permission model

The orchestrator leads, so it cannot edit code. That rule stops it from doing the work itself.

- `orchestrator`: it cannot edit files, except the model policy. It can run shell commands, so it can build and test. It may launch only `explore`, `general`, and `reviewer`.
- `reviewer`: it cannot edit files. It reports findings only.
- `minimal`: it has full tools, because you drive it directly.

### Model policy

The orchestrator picks a model for each subagent. It reads the model policy first. The policy maps a task role to a model and a fallback. It holds your intent; an approved list is a valid hard constraint, but the live list comes from the `opencode.models` tool. Write refs in full: `provider/model` or `provider/model#variant`.

The orchestrator reads the file in this order:

1. `.opencode/model-policy.md` in the current repo.
2. `~/.agents/model-policy.md`.

A project file replaces the global file. The two files do not merge.

Build the file with the `model-policy` skill. The skill lists the live models with `opencode models`, asks your priorities and constraints, and writes the file. Run it again to refresh. The `working-dir.md` directive allows the agent to read and write `~/.agents/model-policy.md`. It is the one path outside the working directory that the agent may touch.

If a ref is stale or malformed, the tool rejects it at spawn. The orchestrator picks a fallback from the policy and continues.

### When minimal is enough

Modern models align well enough to work from `minimal`. The heavy prompts are gone. This is the level where I stop adding instructions:

- Opus-4.5 +
- GPT-5.4 + (not 5.4-mini, 5.6-Luna is fine)
- Gemini-3.5 may still want more guidance (3.6+ may work, I have not tested)
- Kimi-K2.6 +
- GLM-5.2 +
- Deepseek-v4-flash-0731 +

## Repository layout

| Path | What it holds |
|---|---|
| `opencode/` | OpenCode-specific config bundle: `opencode.json`, the always-on `working-dir.md`, and the agent prompts in `agents/` |
| `skills/` | Harness-agnostic skills, one directory per skill |

Everything except the `opencode/` folder is harness-agnostic. One skill, `model-policy`, depends on OpenCode, because it reads the OpenCode model list.

## Skills

Skills live in `skills/<name>/`. Each skill is a directory with a `SKILL.md` file. The file has a name and a description. The harness reads the description to decide when to trigger the skill. Symlink the directory into `.agents/skills/`, and the skill just works.

| Skill | Purpose |
|---|---|
| html-presentation | One dark-mode HTML file for specs, plans, code reviews, and prototypes |
| lakebed | Agent-native CLI and runtime for small full-stack TypeScript apps called capsules |
| monospace-text | Dark academic reading pages with JetBrains Mono, sidebar TOC, and callout boxes |
| serif-codex | Converts academic Markdown into a dark-mode HTML reading page with a warm library aesthetic |

| Skill | Purpose |
|---|---|
| nocturne | Dark nocturnal design system with violet glow, Fraunces serif, and JetBrains Mono |
| nub | Skill for the nub CLI, a Rust-based all-in-one toolkit for Node.js |
| serif-text | Academic e-reader pages with Lora serif body and Inter sans-serif headings |
| ste-writing | Writes prose in ASD-STE100 Simplified Technical English to remove AI slop |

| Skill | Purpose |
|---|---|
| model-policy | Builds the file that maps task roles to models and fallbacks. OpenCode-specific |
| sumi-ink-wash | Japanese sumi ink wash design system with washi paper and vermilion accents |
| terminal-brutalist | Dark monochrome design system: zero border-radius, 1px hard borders, offset shadows |

Credits:

- [Theo](https://lakebed.dev/) built lakebed.
- nocturne is an alternative to html-presentation.
- The nub CLI lives at [nubjs.com](https://nubjs.com/).
- The original serif-text skill and implementation follow [this video](https://youtu.be/uJblcC4lKYw?si=ZtCOycYKkZ4iWFpJ), which I have since refined.

## Usage

### Skills in any harness

Skills use one universal layout. `.agents/skills/` holds project skills, and `~/.agents/skills/` holds global skills. The harnesses opencode, omp, pi, muse code, deepseek dsh, and codex read `SKILL.md` files from these folders natively.

Global install:

```sh
ln -s <path-to-repo>/skills/<name> ~/.agents/skills/<name>
```

Project install:

```sh
ln -s <path-to-repo>/skills/<name> <project>/.agents/skills/<name>
```

Claude does not read `.agents/`. It reads `.claude/skills/` and `~/.claude/skills/`, and its memory file is `CLAUDE.md` instead of `AGENTS.md`. Symlink the same skills into `~/.claude/skills/` if you use Claude.

Install only the skills you want.

### OpenCode config

The `.config/opencode/` and `.opencode/` folders hold OpenCode specifics. Skills live in `.agents/skills/`, not in these folders. The `opencode/` folder in this repo mirrors the global config. Copy the pieces into place:

```sh
mkdir -p ~/.config/opencode/agent
cp opencode/opencode.json ~/.config/opencode/opencode.json
cp opencode/working-dir.md ~/.config/opencode/working-dir.md
cp opencode/agents/*.md ~/.config/opencode/agent/
rm -f ~/.config/opencode/agent/{architect,super-karp,plan-karp,loop}.md
ln -s <path-to-this-repo>/skills/model-policy ~/.agents/skills/model-policy
```

Notes:

- `opencode.json` makes `minimal` the default and disables the built-in `build` and `plan` agents. Switch to `orchestrator` in the TUI when you want delegated work.
- `opencode.json` also allows reads under `~/.agents/**`. Global skills and the model policy file then load without a permission prompt.
- The `instructions` paths point at `~/.config/opencode/working-dir.md` (work only inside the working directory) and `~/.agents/skills/ste-writing/ste-always-on.md` (use STE in prose). Both files ship with this repo. `working-dir.md` is in `opencode/`, and the STE file ships with the `ste-writing` skill. Edit the paths if your files live elsewhere.
- The `model-policy` symlink lets the orchestrator build the policy on demand. Run the `model-policy` skill once after setup. It asks your priorities and writes the file. Without the symlink, the orchestrator tells you to build the policy by hand.
- The config carries no plugins and no MCP servers. Add your own.
- Copying overwrites any existing `opencode.json`. Back it up first if you have a personal config. The `default_agent` and `agents` settings assume the agent files are present. Adjust them if you copy only part of the config.

#### OpenCode permissions

OpenCode asks for approval when a tool touches a path outside the project working directory. Global skills in `~/.agents/skills/` are outside every project directory. The agent can load a skill. It gets a permission prompt when it reads the support files of the skill. These files are templates, scripts, and images. Add a `permissions` block to the global config to allow the skill folders:

```jsonc
{
  "permissions": [
    { "action": "external_directory", "resource": "~/.agents/**", "effect": "allow" },
    { "action": "external_directory", "resource": "<path-to-this-repo>/skills/**", "effect": "allow" }
  ]
}
```

Replace `<path-to-this-repo>` with the real clone path, for example `~/Projects/agents-skills-prompts`.

The entries in `~/.agents/skills/` are symlinks. OpenCode matches permission rules against the real target path of a symlink, not the symlink path. A rule for `~/.agents/**` alone does not cover symlinked skills. Add one rule per real location that your skills come from.

The rule set grants the same read and edit rights as the working directory. Add `edit` deny rules if you do not want agents to change skill files:

```jsonc
{
  "permissions": [
    { "action": "edit", "resource": "~/.agents/**", "effect": "deny" },
    { "action": "edit", "resource": "<path-to-this-repo>/skills/**", "effect": "deny" }
  ]
}
```

`opencode --auto` is a blunt alternative: it auto-approves every permission request instead.

## Installing with an agent

Paste this into your agent to install the repo:

> Clone `https://github.com/Hioness/agents-skills-prompts.git` to a directory of your choice.

> 1. **Skills:** for each skill in `skills/`, symlink the directory into `~/.agents/skills/` for a global install, or `.agents/skills/` for a project install. The harnesses opencode, omp, pi, muse code, deepseek dsh, and codex read skills from these folders. Install the ones you want, including `model-policy`.
> 2. **OpenCode config:** back up any existing `~/.config/opencode/opencode.json`, then copy `opencode/opencode.json` and `opencode/working-dir.md` into `~/.config/opencode/`, and `opencode/agents/*.md` into `~/.config/opencode/agent/` (create the `agent/` directory if needed). Remove the old `architect.md`, `super-karp.md`, `plan-karp.md`, and `loop.md` files if they are present.
> 3. **Paths:** the `instructions` in `opencode.json` reference `~/.config/opencode/working-dir.md` and `~/.agents/skills/ste-writing/ste-always-on.md`. Make sure both files exist: the working-dir copy from step 2 and the `ste-writing` skill symlink from step 1.
> 4. **OpenCode permissions:** opencode asks for approval when a tool touches a path outside the project working directory. Add a `permissions` block to `~/.config/opencode/opencode.json` with `external_directory` allow rules for `~/.agents/**` and `<path-to-this-repo>/skills/**` (the real clone path). The rules must name the real target paths of the symlinks, not the symlinks themselves. See "OpenCode permissions" in the README for the exact block and the optional `edit` deny rules.
> 5. **Model policy:** load the `model-policy` skill and interview the user. Ask about the budget shape, the hard constraints, the priorities, and the role map for the subagents. Then write `~/.agents/model-policy.md`. Do this even when the user does not ask about models.

Claude does not read `.agents/`. It reads `.claude/skills/` and `~/.claude/skills/`, and its memory file is `CLAUDE.md` instead of `AGENTS.md`. Symlink the skills into `~/.claude/skills/` if you use Claude.

## License

Apache License 2.0. See the `LICENSE` file.
