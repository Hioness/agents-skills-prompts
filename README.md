# prompts&config

This repository is the single source of truth for agent system prompts and skills. It covers three AI coding harnesses: **OpenCode**, **Pi**, and **omp**. Changes propagate to each harness through symlinks.

## Made for OpenCode

The agent prompts in this repository target **OpenCode**. They are OpenCode agent prompts, rules, and skills, not generic model instructions.

They come from two source prompts:

- The **KINGMODE** prompt that AI Code King made to improve open-source models.
- A **Karpathy skill** that someone else made to steer Gemini models.

Both shaped the `-KARP` prompts and `ARCHITECT`. The `-KARP` prompts are `SUPER-KARP` and `PLAN-KARP`.

These prompts mostly help dumber or older models. Many models in the present day do just as well, or better, with no prompt at all. Models like GLM-5.3 or DeepSeek-V4-Flash do not need them.

## Layout

| Path | What it holds |
|---|---|
| `opencode.json` | OpenCode project config: default agent, disabled built-ins, instructions |
| `.opencode/` | OpenCode per-project config: agent prompts and always-on instructions |

| Path | What it holds |
|---|---|
| `agent-system-prompts/` | Mirror of the opencode agent config: all five agents |
| `skills/` | Harness-agnostic skills |
| `chat-bg-prompts/` | Personal chat background prompts, not tracked |

## Skills

Skills live in `skills/<name>/`. Each skill has a `SKILL.md` file with a name and a description. The harness uses the description to decide when to trigger the skill.

| Skill | Purpose |
|---|---|
| html-presentation | Builds one dark-mode HTML file for specs, plans, code reviews, and prototypes |
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
| subagent-loops | Launches and parallelizes loop subagents for autonomous iteration work |
| sumi-ink-wash | Japanese sumi ink wash design system with washi paper and vermilion accents |

## Agent system prompts

| Agent | Purpose |
|---|---|
| architect | Opinionated senior engineer with HTML-first output for anything over 100 lines |
| super-karp | Behavioral guidelines from the LLM coding pitfalls that Karpathy describes |
| plan-karp | SUPER-KARP reoriented for plan mode: produce a plan, then stop |

| Agent | Purpose |
|---|---|
| loop | Autonomous subagent that cycles explore, plan, execute, and review until it reaches the goal |
| minimal | Bare-bones primary agent with no instructions |

The files in `agent-system-prompts/` mirror the agent config in `~/.config/opencode/agent/`. The files in `.opencode/agents/` are symlinks to them.

## Usage

### OpenCode in this repository

Clone the repository and run OpenCode inside it. OpenCode loads `opencode.json` and `.opencode/` from the project root automatically.

The config carries two pieces of advice:

- Disable the built-in `build` and `plan` agents. They are not good. Make `minimal` the default. Switch to `architect` or `plan-karp` in the TUI.

- Load extra instructions for the model. The config points at `~/.config/opencode/working-dir.md` (ignore outside repos) and `~/.config/opencode/skills/ste-writing/ste-always-on.md` (use STE in prose). Point the paths at `.opencode/working-dir.md` and `skills/ste-writing/ste-always-on.md` if you do not have those files.

The config carries no plugins and no MCP servers. Add your own in your personal config.

### OpenCode in your own config

Copy the pieces you want:

```sh
cp opencode.json ~/.config/opencode/opencode.json
cp -rL .opencode/agents ~/.config/opencode/
ln -s <repo>/skills/<name> ~/.config/opencode/skills/<name>
```

Then edit the two `instructions` paths in `opencode.json` to point at the files on your machine. The `-L` flag makes `cp` copy the symlinked prompts as real files. The `default_agent` and `agent` settings assume the agent files are present. Adjust them if you copy only part of the config.

### Other harnesses

Symlink a skill into the skill directory of your harness.

| Harness | Skill directory |
|---|---|
| OpenCode | `~/.config/opencode/skills/` |
| Pi | `~/.pi/agent/skills/` |
| omp | `~/.omp/agent/skills/` |

Example:

```sh
ln -s <repo>/skills/<name> ~/.config/opencode/skills/<name>
```

For agent prompts, copy the files into the agent directory of your harness. For OpenCode, that directory is `~/.config/opencode/agents/`.

## Not tracked

Some files stay out of version control. `chat-bg-prompts/` holds personal chat background prompts. `AGENTS.md` files hold internal configuration.

## License

Apache License 2.0. See the `LICENSE` file.
