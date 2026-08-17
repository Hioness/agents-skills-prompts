---
name: nub
description: "Use when working with nub (https://nubjs.com), the Rust-based all-in-one toolkit that replaces node, tsx, npm, pnpm, npx, nvm, nodemon, and dotenv-cli — running TS/JSX files, package scripts, CLI packages, installs, Node version management, and file watching."
---

# Nub skill

Use this skill when working with [nub](https://nubjs.com), the Rust-based all-in-one toolkit for Node.js.

Nub is a single binary that replaces several Node.js tools:

- `nub <file>` — runs TypeScript/JSX files on stock Node (replaces `node`, `tsx`, `ts-node`, `dotenv-cli`)
- `nub run <script>` — runs package.json scripts (replaces `npm run`, `pnpm run`)
- `nubx` / `nub exec` / `nub dlx` — runs local or remote CLI packages (replaces `npx`, `pnpm exec`, `pnpm dlx`)
- `nub install` / `add` / `remove` / `update` — package manager (replaces `npm`, `pnpm`, `bun install`)
- `nub node` — manages Node versions (replaces `nvm`, `fnm`, `volta`)
- `nub watch` — file watcher with auto-restart (replaces `nodemon`, `tsx watch`)
- `nub pm` — Corepack-style package-manager shims
- `nub config` — get/set persistent configuration
- `nub upgrade` — update the Nub binary

## Core mental model

**Nub augments Node.js; it does not replace it.** Your code runs on the real `node` binary. Nub transpiles TypeScript/JSX in memory using `oxc`, registers Node module hooks, loads `.env` files, and polyfills/unflags modern APIs. There is no `nub` runtime, no `nub:*` module namespace, no `@nub/*` API, and no `nub` field in `package.json`.

- Node version floor for augmentation: **Node 18.19+**.
- To drop all Nub augmentation and run plain Node: `nub --node <file>` or set `NODE_COMPAT=1`.
- Nub is a drop-in for `node` flags and `pnpm` package-manager spellings, not for `npm` spellings.

## File runner: `nub <file>`

Run a file directly. No build step or `tsconfig.json` is required, but `tsconfig.json#paths` is respected if present.

```bash
nub index.ts
nub app.tsx
nub --inspect server.ts --port 3000
nub watch src/server.ts
nub --node script.js     # no augmentation, still uses pinned Node version
nub --env-file=.env.ci test.ts
nub -                    # read code from stdin
```

Supported extensions: `.js`, `.cjs`, `.mjs`, `.jsx`, `.ts`, `.mts`, `.cts`, `.tsx`.

Everything after the file is forwarded to the script as `process.argv`.

### What is enabled automatically

- TypeScript (including `enum`, `namespace`, parameter properties, decorators, `emitDecoratorMetadata`)
- JSX/TSX (configured by `tsconfig.json`)
- `using` / `await using` explicit resource management
- `.env`, `.env.local`, `.env.[NODE_ENV]` loading with `${VAR}` expansion
- Extensionless imports resolved to `.ts`/`.tsx`/`.js`/`.jsx`
- Data-file imports: `.json`, `.json5`, `.jsonc`, `.yaml`, `.yml`, `.toml`, `.txt`
- Polyfills/unflags: `Temporal`, `URLPattern`, `RegExp.escape`, `Promise.try`, `Float16Array`, `Error.isError`, `navigator.locks`, `reportError`, `WebSocket`, `EventSource`, `node:sqlite`, `vm.Module`, `localStorage`, `Worker`, WebAssembly module imports

### Important caveats

- Types are **stripped, not checked**. Run `tsc --noEmit` separately for type checking.
- Files inside `node_modules` are never transpiled.
- `--env-file=<path>` disables automatic `.env*` discovery.
- `--no-env-file` wins over `--env-file`.
- `NODE_ENV` is clamped to `development`, `production`, or `test` for file selection. Use `APP_ENV` for custom modes.
- A `.env` file cannot set `NODE_ENV` (ignored with a warning).
- In `test` mode, `.env.local` is skipped.
- `nub watch` re-reads `.env` files on restart only on Node 20.6+.
- Source maps are disabled on Node 26.2.x due to a Node regression.

### `nub watch`

```bash
nub watch src/server.ts
nub --watch src/server.ts
```

Watches the entrypoint and its transitive imports. Also watches `package.json`, `tsconfig.json` chain, and `.env*` files.

## Script runner: `nub run`

```bash
nub run build
nub run test --watch
nub run -r --filter "@org/*" test
nub run -r --parallel --no-bail test
nub run -r --resume-from @org/api --stream build
nub run --silent build
nub run "/^build:/"          # run build:js, build:css, etc. concurrently
```

- `<script>` is a key in `package.json#scripts`.
- `nub build` is **not valid**. Always use `nub run build`.
- No `--` separator is required: `nub run test --watch` works.
- Nub flags go before the script; everything after the script is forwarded to it.
- Runs `pre<script>` and `post<script>` lifecycle hooks unless `--ignore-scripts` is used.
- Full `npm_*` environment variables are set.

### Workspace flags

| Flag | Meaning |
|------|---------|
| `-r`, `--recursive` | Run in every workspace package |
| `-F <sel>`, `--filter <sel>` | pnpm-style package selector; repeatable |
| `--workspace <name>` | npm-style member selector |
| `-w`, `--workspace-root` | Target only the workspace root |
| `--include-workspace-root` | Add root to recursive set |
| `--parallel` | Run concurrently, ignore topo order |
| `--sequential` | One package at a time |
| `--workspace-concurrency <N>` | Cap concurrency (`0` = CPU count) |
| `--no-bail` | Run all selected, report failures at end |
| `--resume-from <pkg>` | Skip topo predecessors of a package |
| `--stream` | Interleaved, prefixed live output |
| `--aggregate-output` | Buffer per-package output |
| `--reporter <default\|silent\|ndjson>` | Output format |
| `--if-present` | Skip packages (or single run) that lack the script |
| `--ignore-scripts` | Skip `pre`/`post` hooks |
| `--no-check`, `--no-install` | Skip dependency-freshness check |

### Filter examples

```bash
nub run -r --filter @org/api dev
nub run -r --filter "...@org/web" build   # @org/web + its dependencies
nub run -r --filter "@org/web..." build   # @org/web + its dependents
nub run -r --filter "[main]" test         # changed since main
nub run -r --filter './packages/*' --filter '!@org/legacy' build
```

## Package runner: `nubx`, `nub exec`, `nub dlx`

### `nubx` — local first, registry fallback

```bash
nubx eslint . --fix
nubx vitest run --coverage
nubx -y cowsay@1.5.0 "hi"
```

- Resolves from `node_modules/.bin`, walking up to the workspace root.
- Local hit: executed directly, no extra Node wrapper.
- Local miss: prompts to fetch from the registry. Fails closed in CI/non-TTY — use `-y` or `--yes` to consent up front.
- Pinned versions are remembered indefinitely; floating versions re-confirm after a day.

### `nub exec` — local only

```bash
nub exec tsc --noEmit
nub exec -r --filter "@org/*" vitest run
nub exec --node prisma generate
```

- Same resolution as `nubx`, but **never fetches** from the registry.
- On a miss, prints an install hint and exits `127`.

### `nub dlx` — explicit fetch

```bash
nub dlx create-vite my-app
nub dlx -p @angular/cli ng new my-app
nub dlx -p cowsay -c 'cowsay hi | tr a-z A-Z'
```

- Downloads the package to a throwaway project and runs it.
- Works in CI because invocation itself is the consent.
- Skips lifecycle scripts unless `--allow-build=<pkg>` is passed.

### Common flags for bin runners

| Flag | Meaning |
|------|---------|
| `--node` | Disable Nub augmentation (still uses pinned Node) |
| `--no-check` | Skip dependency-freshness check |
| `-p <spec>`, `--package <spec>` | Use a package whose name differs from the bin |
| `-y`, `--yes` | (`nubx` only) consent to registry fetch |
| `-c <cmd>`, `--shell-mode` | (`nub dlx` only) run a shell one-liner |
| `-q`, `--quiet` | Suppress fetch progress |
| `--no-install`, `--no` | (`nubx` only) refuse registry fetch |

Disable implicit `nubx` fetch prompt permanently:

```bash
nub config set exec.implicitDlx never
nub config set exec.implicitDlx prompt
```

## Package manager: `nub install`

Nub is a pnpm-compatible package manager powered by the [Aube](https://github.com/jdx/aube) engine. It detects the incumbent package manager and reads/writes the existing lockfile in place.

```bash
nub install
nub install --frozen-lockfile
nub ci
nub add react
nub add -E -D --save-catalog react
nub add --allow-build=esbuild esbuild
nub remove lodash
nub update react
nub update -L react
nub dedupe
nub dedupe --check
```

### Incumbent detection

Nub picks the package manager from, in order:

1. `package.json#packageManager`
2. `package.json#devEngines.packageManager`
3. Lockfile on disk

Supported lockfiles:

| Incumbent | Lockfile | Read/Write |
|-----------|----------|------------|
| npm | `package-lock.json` v1/v2/v3, `npm-shrinkwrap.json` | read + write |
| pnpm | `pnpm-lock.yaml` v9 | read + write |
| Bun | `bun.lock` | read + write |
| Yarn | `yarn.lock` classic + Berry | read-only |
| Nub | `nub.lock` | read + write |

Two lockfiles with no `packageManager`/`devEngines` declaration is a hard error (`ERR_NUB_LOCKFILE_AMBIGUOUS`). Fix by declaring the incumbent or removing the stale lockfile.

### Important install flags

| Flag | Meaning |
|------|---------|
| `--frozen-lockfile` | Fail if lockfile is out of date |
| `-P`, `--prod` | Skip devDependencies |
| `-D` | Add/remove devDependency |
| `-E`, `--exact` | Exact version |
| `-O`, `--optional` | Optional dependency |
| `-g` | Global install |
| `--ignore-scripts` | Skip lifecycle scripts |
| `--no-optional` | Skip optionalDependencies |
| `--offline`, `--prefer-offline` | Cache-first installs |
| `--lockfile-only` | Update lockfile only |
| `--node-linker <isolated\|hoisted>` | Layout; isolated is default |
| `--registry <URL>` | Custom registry |
| `-C`, `--dir <DIR>` | Run as if in another directory |
| `-F`, `--filter` | Workspace member selector |
| `-r`, `--recursive` | All workspace packages |
| `--reporter`, `--silent`, `-s`, `--loglevel` | Output control |

### Add/update flags

| Flag | Meaning |
|------|---------|
| `--save-peer` | peerDependency |
| `--save-catalog` | Add to default catalog |
| `--save-catalog-name=<name>` | Add to named catalog |
| `--allow-build=<pkg>` | Approve lifecycle scripts for package |
| `--deny-build=<pkg>` | Deny lifecycle scripts |
| `--dangerously-allow-all-builds` | Approve all (not for CI) |
| `--lockfile-only` | Update lockfile only |
| `--no-save` | Do not update `package.json` |
| `-L`, `--latest` | Bump past manifest range |

### Workspace/catalog

- `pnpm-workspace.yaml` globs, `catalog:`, and `workspace:` protocol are supported.
- `nub add --save-catalog <pkg>` writes to the default catalog.
- Member selection uses pnpm-style `--filter`/`-F` and `-r`/`--recursive`.

### Important caveats

- `bun.lockb` binary lockfile is rejected.
- `pnpm-lock.yaml` v6/v5.4 is declined; re-lock under pnpm 9+.
- `yarn.lock` is read-only; use Yarn for mutations.
- `node-linker=pnp` is refused.
- Default isolated layout breaks phantom (undeclared) dependencies. Use `node-linker=hoisted` to opt out.
- Global store is at `~/.local/share/nub/store/v1`. Use `enableGlobalVirtualStore=false` or `nub ci` for self-contained CI/Docker trees.
- `nub update --depth` is parsed for pnpm compat but ignored.
- `nub ci` deletes `node_modules` and installs strictly from the lockfile.

## Security defaults

Nub is hardened against supply-chain attacks by default:

- **Lifecycle scripts denied by default.** Postinstall scripts run only if explicitly approved.
- **OSV advisory check.** Queries `api.osv.dev` for malicious packages. `MAL-*` hits are hard errors (`ERR_NUB_MALICIOUS_PACKAGE`).
- **Provenance downgrade guard.** Refuses a version with weaker attestation than an earlier version (`ERR_NUB_TRUST_DOWNGRADE`).
- **Minimum release age.** Default 24 hours (`minimumReleaseAge=1440`). Fresh releases fail closed unless excluded.
- **Build jail.** `paranoid=true` sandbox build scripts on macOS/Linux.

### How to approve builds

```bash
nub approve-builds
nub add --allow-build=esbuild esbuild
nub install --dangerously-allow-all-builds
```

### Configure in `.npmrc`

```ini
# lower or disable the release-age window
minimum-release-age=0
minimumReleaseAgeExclude[]=my-org/*

# trust policy
trustPolicy=off
trustPolicyExclude[]=tailwind-merge
trustPolicyIgnoreAfter=20160

# advisory checks
advisoryCheck=warn

# build approvals
allowBuilds.esbuild=true
```

### Approval via package.json

For pnpm projects:

```json
{
  "pnpm": {
    "onlyBuiltDependencies": ["esbuild"],
    "allowBuilds": ["better-sqlite3"],
    "neverBuiltDependencies": ["some-pkg"]
  }
}
```

For Bun projects, use `trustedDependencies`. For neutral Nub projects, use an `allowBuilds` map in `package.json` or workspace yaml.

## Node version manager: `nub node`

```bash
nub node which          # print resolved Node path
nub node install        # install the project's pinned Node
nub node install 26
nub node install lts 20.11.0
nub node ls             # list cached versions
nub node uninstall 20   # remove a cached version
nub node pin 26         # write .node-version
```

### Version resolution precedence

1. `NODE_EXECUTABLE` (absolute path; hard override)
2. `package.json#devEngines.runtime` node entry
3. `.node-version`
4. `.nvmrc`
5. `package.json#engines.node`
6. Nothing pinned — use `node` on PATH, or download `latest` if no Node exists

### Caveats

- `nub node install` skips PATH-available versions; it does not copy them into Nub's cache.
- `nub node uninstall` refuses to remove the version the cwd resolves to.
- Pin files inside `node_modules` are ignored.
- `nub run` and `nub exec` do **not** provision Node; they use whatever is already resolved.
- `nub <file>` auto-provisions the pinned Node.

## Package manager shims: `nub pm`

Replaces Corepack. After one-time setup, bare `npm`, `pnpm`, `yarn`, and `npx`/`pnpx` commands dispatch to the project's pinned version.

```bash
nub pm use pnpm@9.15.4
nub pm shim
pnpm install    # now runs the pinned pnpm via the shim

nub pm unshim   # remove shims and PATH block
```

### How it works

- `nub pm shim` creates `~/.nub/shims` and prepends a PATH block to your shell profile.
- Shims are hardlinks to the `nub` binary. `nub` uses `argv0` to know which PM it is impersonating.
- The shim detects the project pin, provisions the exact version from the registry, and runs it.
- In a pinned project, a mismatched PM command exits nonzero and suggests the correct command.
- Transparent verbs (`npx`, `pnpx`, `init`, `create`, `dlx`, `exec`) and global installs pass through to the system tool.
- Bun is not shimmed.

## Configuration: `nub config`

Get or set Nub settings. Nub stores its own settings separately from `.npmrc`.

```bash
nub config get exec.implicitDlx
nub config set exec.implicitDlx never
nub config set exec.implicitDlx prompt
```

Common settings:

| Key | Effect |
|-----|--------|
| `exec.implicitDlx` | `never` disables `nubx` registry fallback prompt; `prompt` enables it |

Use `--location project` to scope a setting to the current project, or `--local` to write to the workspace yaml.

## `nub upgrade`

Update the Nub binary to the latest release.

```bash
nub upgrade
```

## Project setup patterns

### Pin Node and the package manager

```bash
nub node pin 26
nub pm use pnpm@9.15.4
nub pm shim
```

### `.env` files

```bash
# .env
APP=acme
DATABASE_URL=postgres://localhost/${APP}_dev
```

`nub server.ts` loads `.env` automatically. Use `APP_ENV` for custom modes; `NODE_ENV` is clamped to `development`/`production`/`test`.

### `tsconfig.json` paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@db": ["src/db/index.ts"]
    }
  }
}
```

Nub resolves these through Node's module hooks.

### Workspaces

Use `pnpm-workspace.yaml` or `package.json#workspaces`. Select members with `--filter` and `-r`.

## Migration from common tools

### From `tsx` / `ts-node`

- `tsx file.ts` → `nub file.ts`
- `tsx watch file.ts` → `nub watch file.ts`
- Keep `tsc --noEmit` in CI.

### From `npm run` / `pnpm run`

- `npm run build` / `pnpm run build` → `nub run build`
- `nub run test --watch` works without `--`.
- `npm test` / `pnpm test` → `nub run test` (no bareword shortcut).

### From `npx` / `pnpm exec`

- `npx eslint .` → `nubx eslint .`
- `pnpm exec tsc` → `nub exec tsc`
- `pnpm dlx create-vite` → `nub dlx create-vite`
- In CI, use `nubx -y <tool>` or `nub dlx <tool>`.

### From `npm` / `pnpm` / `bun install`

- `npm install` / `pnpm install` / `bun install` → `nub install`
- `npm add` / `pnpm add` → `nub add`
- Nub infers the lockfile and updates it in place.
- Approve native builds with `nub approve-builds`.

### From `nvm` / `fnm` / Corepack

- `nvm use` → `nub node pin 26`
- `corepack enable` → `nub pm shim`
- Keep `.nvmrc` if other tools need it; Nub reads it too.

## Common errors and fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `WARN_NUB_IGNORED_BUILD_SCRIPTS` | Build scripts denied by default | `nub approve-builds` or `--allow-build=<pkg>` |
| `ERR_NUB_MALICIOUS_PACKAGE` | OSV advisory hit | Remove the package, or set `advisoryCheck=warn` in `.npmrc` |
| `ERR_NUB_TRUST_DOWNGRADE` | Provenance attestation weakened | `trustPolicy=off` or `trustPolicyExclude[]=<pkg>` in `.npmrc` |
| `ERR_NUB_NO_MATURE_MATCHING_VERSION` | Package too new for `minimumReleaseAge` | Lower `minimum-release-age` or exclude the package |
| `ERR_NUB_LOCKFILE_AMBIGUOUS` | Two lockfiles, no `packageManager`/`devEngines` | Declare incumbent with `nub pm use <pm>` or remove stale lockfile |
| `ERR_NUB_LOCKFILE_DECLARATION_MISMATCH` | `packageManager` says one PM, lockfile says another | Align the declaration or the lockfile |
| Node 18.19 floor error | Nub augmentation needs Node 18.19+ | Pin a newer Node: `nub node pin 22` |
| `nub build` rejected | Missing `run` subcommand | Use `nub run build` |

## When not to use nub

- You depend on **Bun/Deno runtime APIs** (`Bun.serve`, `bun:test`, `Deno.*`).
- You need a **built-in bundler, test runner, or dev server**.
- You require **Yarn Berry write support** today.
- You want **npm-compatible CLI spellings** for the package manager.
- You are on an unsupported platform (ARM32, exotic libc without a mirror).

## Quick reference

```bash
# run
nub index.ts
nub watch src/server.ts

# scripts
nub run build
nub run -r --filter @org/api test

# bins
nubx eslint .
nub exec tsc --noEmit
nub dlx create-vite my-app

# packages
nub install
nub add -D typescript
nub remove lodash
nub update -L react
nub ci
nub approve-builds

# node
nub node pin 26
nub node install
nub node which

# shims
nub pm use pnpm@9.15.4
nub pm shim
nub pm unshim

# config
nub config set exec.implicitDlx never

# upgrade
nub upgrade

# escape hatch
nub --node script.js
NODE_COMPAT=1 nub script.js
```

## Useful links

- Docs: https://nubjs.com/docs
- Runtime: https://nubjs.com/docs/runtime
- Runner: https://nubjs.com/docs/runner
- Package manager: https://nubjs.com/docs/install
- Node versions: https://nubjs.com/docs/node
- FAQ: https://nubjs.com/docs/faq
- Repository: https://github.com/nubjs/nub
