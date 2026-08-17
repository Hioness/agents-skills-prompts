# prompts&config

This repository contains skills and workflows that I have found useful when using agentic harnesses. I use them for work, for school, and for managing my computer. I also use them for side-projects that involve code, websites, or OSS forks that I start.

It is not a prescription. Obviously, you get to use these tools however you want, and modify them however you want. I found them useful in the way I set them up. I hope you do too.

## Made for OpenCode

The `opencode/` folder is specific config for opencode.

- `opencode.json` contains the project config: the default agent, disabled built-in agents, and the extra instructions each agent loads.
- `agents/` contains the five agent prompts: `architect.md`, `super-karp.md`, `plan-karp.md`, `loop.md`, and `minimal.md`.

The [KINGMODE prompt](https://github.com/aicodeking/yt-tutorial/blob/main/gemini-king-mode.md) and [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) inspired the agents' prompts. Those prompts are ARCHITECT, SUPER-KARP, and PLAN-KARP. The LOOP agent also adds insight from several articles on loops and YouTube guides by popular agentic engineers. The default minimal agent prompt is not based on these sources.

These prompts mostly help dumber or older models. Many models in the present day do just as well, or better, with no prompt at all. I would say this is the earliest cutoff point to ignore the prompts and use minimal. This matches the vibes I have seen online. Your results may vary:

- Opus-4.5 +
- GPT-5.4 + (not 5.4-mini, 5.6-Luna is fine)
- Gemini-3.5 still needs them (3.6+ may work, I have not tested)
- Kimi-K2.6 +
- GLM-5.2 +
- Deepseek-v4-flash-0731 +

## Repository layout

| Path | What it holds |
|---|---|
| `opencode/` | OpenCode-specific config bundle: `opencode.json`, the always-on `working-dir.md`, and the five agent prompts in `agents/` |
| `skills/` | Harness-agnostic skills, one directory per skill |

Everything except the `opencode/` folder is harness-agnostic. The one skill tied to a specific harness is `subagent-loops`, marked as OpenCode-specific in the charts below.

## Skills

Skills live in `skills/<name>/`. Each skill is a directory with a `SKILL.md` file. The file has a name and a description. The harness reads the description to decide when to trigger the skill. Symlink the directory into `.agents/skills/`, and the skill just works.

| Skill | Purpose |
|---|---|
| html-presentation | One dark-mode HTML file for specs, plans, code reviews, and prototypes |
| ironvale | Industrial design system: chamfered rectangles, cream-on-dark, Space Mono + Barlow Condensed |
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
| subagent-loops | Launches and parallelizes loop subagents for autonomous iteration work. OpenCode-specific |
| sumi-ink-wash | Japanese sumi ink wash design system with washi paper and vermilion accents |
| terminal-brutalist | Dark monochrome design system: zero border-radius, 1px hard borders, offset shadows |

Credits:

- [Theo](https://lakebed.dev/) built lakebed.
- nocturne is an alternative to html-presentation.
- The nub CLI lives at [nubjs.com](https://nubjs.com/).
- The original serif-text skill and implementation follow [this video](https://youtu.be/uJblcC4lKYw?si=ZtCOycYKkZ4iWFpJ), which I have since refined.

## Agent system prompts

The five agent prompts live in `opencode/agents/`. See [Made for OpenCode](#made-for-opencode) above for where they came from.

| Agent | Purpose |
|---|---|
| architect | Opinionated senior engineer with HTML-first output for anything over 100 lines |
| super-karp | Behavioral guidelines from the LLM coding pitfalls that Karpathy describes |
| plan-karp | A write and edit limited version of SUPER-KARP. It prevents the model from touching code when you only want to chat or plan |

| Agent | Purpose |
|---|---|
| loop | Autonomous subagent that cycles explore, plan, execute, and review until it reaches the goal |
| minimal | Bare-bones primary agent with no instructions |

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
```

Notes:

- `opencode.json` disables the built-in `build` and `plan` agents and makes `minimal` the default. Switch to `architect` or `plan-karp` in the TUI when you want guidance.

- The `instructions` paths point at `~/.config/opencode/working-dir.md` (work only inside the working directory) and `~/.agents/skills/ste-writing/ste-always-on.md` (use STE in prose). Both files ship with this repo. `working-dir.md` is in `opencode/`, and the STE file ships with the `ste-writing` skill. Edit the paths if your files live elsewhere.

- The config carries no plugins and no MCP servers. Add your own.

- Copying overwrites any existing `opencode.json`. Back it up first if you have a personal config. The `default_agent` and `agent` settings assume the agent files are present. Adjust them if you copy only part of the config.

## Installing with an agent

Paste this into your agent to install the repo:

> Clone `https://github.com/Hioness/agents-skills-prompts.git` to a directory of your choice.

> 1. **Skills:** for each skill in `skills/`, symlink the directory into `~/.agents/skills/` for a global install, or `.agents/skills/` for a project install. The harnesses opencode, omp, pi, muse code, deepseek dsh, and codex read skills from these folders. Install the ones you want.
> 2. **OpenCode config:** back up any existing `~/.config/opencode/opencode.json`, then copy `opencode/opencode.json` and `opencode/working-dir.md` into `~/.config/opencode/`, and `opencode/agents/*.md` into `~/.config/opencode/agent/` (create the `agent/` directory if needed).
> 3. **Paths:** the `instructions` in `opencode.json` reference `~/.config/opencode/working-dir.md` and `~/.agents/skills/ste-writing/ste-always-on.md`. Make sure both files exist: the working-dir copy from step 2 and the `ste-writing` skill symlink from step 1.

Claude does not read `.agents/`. It reads `.claude/skills/` and `~/.claude/skills/`, and its memory file is `CLAUDE.md` instead of `AGENTS.md`. Symlink the skills into `~/.claude/skills/` if you use Claude.

## License

Apache License 2.0. See the `LICENSE` file.
