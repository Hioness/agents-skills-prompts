---
name: lakebed
description: "Lakebed is an agent-native CLI and runtime for building small full-stack TypeScript apps called capsules. Use this skill when scaffolding, editing, or deploying a Lakebed capsule (server/index.ts, client/index.tsx, shared/, .env.lakebed.server), or when asked about Lakebed queries, mutations, endpoints, auth, indexes, the database API, object storage, runtime inspection, or deploy/claim workflows."
---

# Lakebed

## What Lakebed is

Lakebed is an agent-native CLI and runtime for building small full-stack TypeScript apps called **capsules**. Treat the capsule directory as the whole app: write the server contract, write the Preact client, run the Lakebed CLI, inspect runtime state, and deploy — without leaving code. Lakebed is the runtime, compiler, database, and hosting platform.

- Docs home: https://docs.lakebed.dev/
- Capsule API: https://docs.lakebed.dev/capsule-api/
- Database guide: https://docs.lakebed.dev/database/
- Database API v1 migration: https://docs.lakebed.dev/database-migration/
- Auth contract: https://docs.lakebed.dev/auth/
- Object storage: https://docs.lakebed.dev/storage/
- Reference: https://docs.lakebed.dev/reference/
- Machine-readable: `llms.txt` / `llms-full.txt` at the docs root.

## Hard rules (module boundaries)

- **No installing node modules.** Use the built-in `lakebed/server`, `lakebed/client`, and Lakebed-provided Preact modules. Write TypeScript for anything else.
- The Lakebed CLI is **not global**. Always run `npx lakebed [command]`.
- `server/*.ts` imports only from `lakebed/server` and pure relative files.
- `client/*.tsx` imports only from `lakebed/client` (plus `lakebed`-provided Preact modules).
- `shared/` must stay pure: no `lakebed/server`, `lakebed/client`, Preact, DOM APIs, Node built-ins, env values, or secrets.
- App code cannot import arbitrary npm packages, and capsule modules cannot use Node built-ins.
- Database calls are **async**. Await or directly return every `get`, `insert`, `update`, `delete`, `collect`, `take`, `first`, and `paginate`.
- **Queries are read-only.** Put writes in mutations or endpoints, and re-check ownership before updating/deleting user-owned rows.
- Declare indexes (`.index(name, fields)`) and query them with `withIndex`. Do **not** use legacy `where`, `orderBy`, `limit`, or `all`.
- Use `id("tableName")` for references to another Lakebed table. Keep external IDs (including `ctx.auth.userId`) as `string()`.
- Styling is via raw CSS or Tailwind classes in JSX. There is **no** CSS/PostCSS/Tailwind build pipeline.
- No file-based routing. Use the built-in client router from `lakebed/client`.
- All server env lives in `.env.lakebed.server`, read only through `ctx.env`. Never put secrets in `client/` or `shared/`.
- Server-only env syncs to a hosted deploy only after a claim.

## Capsule layout (v0)

```txt
server/index.ts       # schema, queries, mutations, external endpoints
client/index.tsx      # Preact UI entrypoint, exports App
shared/               # pure TypeScript shared by both sides
.env.lakebed.server   # optional server-only env
```

There is no `lakebed.config.ts` in v0. Favicons live at `favicon.svg` / `favicon.ico`, or set `favicon: "assets/icon.svg"` in `server/index.ts`. Static assets are limited to the favicon.

## Create & run

```sh
npx lakebed new my-app --template todo   # npx lakebed create is an alias
cd my-app
npx lakebed dev                          # serves on :3000 by default
```

New capsules get a git repo + initial commit unless created inside an existing git repo or `--no-git` is passed.

## Server contract

Every capsule exports a default `capsule()` from `server/index.ts`.

```ts
import { boolean, capsule, endpoint, json, mutation, query, string, table, text, id } from "lakebed/server";

export default capsule({
  schema: {
    todos: table({
      text: string(),
      done: boolean().default(false),
      ownerId: string()
    }).index("by_owner", ["ownerId"])
  },

  queries: {
    todos: query(async (ctx) =>
      ctx.db.todos
        .withIndex("by_owner", (q) => q.eq("ownerId", ctx.auth.userId))
        .order("desc")
        .collect()
    )
  },

  mutations: {
    addTodo: mutation(async (ctx, text: string) => {
      await ctx.db.todos.insert({ text, done: false, ownerId: ctx.auth.userId });
    }),

    setTodoDone: mutation(async (ctx, id: string, done: boolean) => {
      const todo = await ctx.db.todos.get(id);
      if (!todo || todo.ownerId !== ctx.auth.userId) return; // re-check ownership
      await ctx.db.todos.update(id, { done });
    })
  },

  endpoints: {
    webhook: endpoint({ method: "POST", path: "/webhooks/incoming" }, async (ctx, req) => {
      if (req.headers.get("x-webhook-secret") !== ctx.env.WEBHOOK_SECRET) {
        return text("unauthorized", { status: 401 });
      }
      const payload = await req.json<{ body: string }>();
      await ctx.db.todos.insert({ text: payload.body, done: false, ownerId: "webhook" });
      return json({ ok: true });
    })
  }
});
```

Handlers receive `ctx`:
- `ctx.auth` — current guest or Google identity (`userId`, `displayName`, `picture`, `email`, `isGuest`, `isAuthenticated`, `provider`; client-only `isLoading`).
- `ctx.db` — async table access.
- `ctx.env` — server-only values from `.env.lakebed.server`.
- `ctx.log` — structured logs (`ctx.log.info("msg", { ... })`).

**Server authority pattern:** queries decide which rows the client can read; mutations validate input before writing and re-check ownership before changing existing rows; client code never writes tables directly. Anonymous deploys run bundled server JavaScript in a restricted source runtime, so ordinary JS authorization checks stay authoritative — do not weaken auth to pass a build.

## Data API

- Field helpers: `string()`, `boolean()`, `id("table")`, `.default(value)` on a field, `.index(name, fields)` on a table.
- Every stored row implicitly has `id`, `createdAt`, `updatedAt`.
- Table methods are async. Use `withIndex(name, range)`, then `order("asc" | "desc")`, then one terminal: `collect()`, `take(count)`, `first()`, or `paginate(options)`. Direct `get`, `insert`, `update`, `delete` are also awaited.
- **Indexes:** every index has an implicit `createdAt, id` suffix for deterministic ordering. Range queries use an equality prefix then one of `gt`, `gte`, `lt`, `lte` on the next index field. `by_creation` exists on every table for unfiltered creation-order feeds. Queries cannot full-scan; if you filter/sort by a field, declare an index for it.
- **Relationships:** use `id("table")` fields + bounded application-level traversal (no SQL joins). Many-to-many uses an explicit join table with indexes for both directions.
- **Consistency:** queries get a read-only repeatable snapshot; mutations/endpoints commit atomically, read their own writes, and serialize per deploy; worker failure/timeout/quota/store errors roll back.

```ts
// composite index + range
.withIndex("by_owner_done", (q) => q.eq("ownerId", ctx.auth.userId).eq("done", true)).order("desc").collect()
// unfiltered feed
ctx.db.todos.withIndex("by_creation").order("desc").take(50)
```

## Client contract

Export `App` from `client/index.tsx`. Use `useQuery`, `useMutation`, `usePaginatedQuery`; call them by the names defined in `server/index.ts`.

```tsx
import {
  ErrorBoundary, Link, Route, Router, Routes,
  SignInWithGoogle, navigate, signInWithGoogle, signOut,
  useAuth, useLocation, useMutation, useNavigate, useParams, usePaginatedQuery, useQuery
} from "lakebed/client";
import { cleanTodoText, type Todo } from "../shared/todo";

export function App() {
  const auth = useAuth();
  const todos = useQuery<Todo[]>("todos");
  const addTodo = useMutation<[text: string], void>("addTodo");

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const text = cleanTodoText(String(new FormData(event.currentTarget).get("text") ?? ""));
    if (!text) return;
    await addTodo(text);
    (event.currentTarget as HTMLFormElement).reset();
  }
  // ...
}
```

- `useQuery("name")` subscribes to a server query. `useMutation<TArgs, TResult>("name")` returns a promise; await it when the UI must wait for the write.
- `usePaginatedQuery("name", args, { initialNumItems })` exposes `page`, `loadMore()`, `isDone`, `reset()`. The server query takes a trailing `pagination: { cursor: string | null; numItems: number }` arg applied to `.paginate(...)`.
- `useAuth()`: use `auth.isLoading` to avoid flashing signed-out UI while the session is confirmed.
- `<SignInWithGoogle />`, `signInWithGoogle()`, `signOut()` — built-in Google auth, no OAuth config needed.
- Router: `<Router>`, `<Routes>`, `<Route path="/" .../>`, `<Route path="/items/:id" .../>`, `<Route path="*" .../>`, `<Link to="...">`, `useParams()`, `useLocation()`, `useNavigate()`, `navigate()`. Paths are app-relative in dev and on hosted subdomains. If a `GET` endpoint and a client route share a path, the endpoint answers direct HTTP requests first.
- Styling: Tailwind classes in JSX only. No CSS modules/PostCSS/Tailwind config.
- `createClient<typeof app>()` is available for non-React/standalone usage (see storage example).

## Auth & env

- Every app starts with **guest auth** (works with zero setup).
- Local guest identity (global): `npx lakebed auth as alice`. Per-tab identity: append `?lakebed_guest=alice` (or `bob`) to the app URL.
- Google sign-in is first-party in dev and hosted apps; `ctx.auth.userId` is one immutable key across deploy hostnames (a generated URL and a custom domain resolve to the same `userId`). `ctx.auth.userId === ctx.auth.subject` for authenticated identities. Never key data on `email` or `identityAliases` — always on `userId`.
- Server-only env in `.env.lakebed.server` (`OPENAI_API_KEY=sk-...`). Read via `ctx.env.*`. `npx lakebed dev` loads it locally; hosted sync is replace-based and only after a claim. Not exposed to client or anonymous artifacts.

## Object storage

Built-in user file storage (avatars, attachments). Bytes go browser ↔ runner ↔ S3-compatible bucket; they never pass through your queries/mutations/endpoints. No server-side `ctx.storage` in this version; reads are just URLs.

```ts
const { key, url } = await client.storage.upload(file, { public: true }); // file = File|Blob
await client.storage.delete(key);
```

- `key` is `"public/<id>"` or `"private/<id>"`; store it if you want to delete later. `url` is absolute and usable directly (e.g. `<img src={url} />`).
- Public objects readable by anyone with the URL (id is an unguessable capability). Private objects require a signed-in user of the deploy; keep private keys in your DB tied to ownership.
- Uploads/deletes require a real verified Google account (guests cannot upload locally either — dev relaxes this). Blocked types: executables, HTML, scripts, etc. (`415 blocked_type`). Limits: 5 MiB/file, 100 MiB/dev total (`413`).
- HTTP surface (client SDK handles these): `POST /storage` (`?lakebed_token=&public=true`), `GET /storage/public/<id>`, `GET /storage/private/<id>`, `DELETE /storage/{public,private}/<id>`.
- Not included: presigned URLs, multipart/resumable/streaming uploads, public listing, image transforms. Store returned `key` in your own tables for indexing/authorization.

## Runtime inspection

While `npx lakebed dev` is running (default `--port 3000`):

```sh
npx lakebed db list --port 3000
npx lakebed db dump --port 3000          # bounded inspection view
npx lakebed db export --port 3000 --out backup.json   # full atomically-written backup
npx lakebed logs --port 3000
```

For deployed apps, pass a deploy id/URL instead of `--port`:

```sh
npx lakebed inspect <deploy-id-or-url>
npx lakebed db dump <deploy-id-or-url>
npx lakebed db export <deploy-id-or-url> --out backup.json
npx lakebed logs <deploy-id-or-url>
```

Run hosted inspection from the capsule directory so the CLI finds `lakebed.json` or `.lakebed/deploy.json` and sends developer auth. Local state is in-memory and resets when `npx lakebed dev` restarts. Hosted inspection is private by default.

## Deploy

```sh
npx lakebed deploy          # anonymous deploy works first
```

- Anonymous deploys disable hosted server env and outbound server-side `fetch`, but preserve server handler control flow in the source runtime. Claim the deploy (`npx lakebed claim`) when you need hosted env or outbound fetch, then run `npx lakebed deploy` again.
- Owned deploy: run `npx lakebed auth login` before first deploy; commit the generated root `lakebed.json` (contains only `deployId`). CI: `npx lakebed token create --name github-actions` (deploy-scoped) or `--personal` (owner-wide) → supply as `LAKEBED_TOKEN`. With a custom `--api`, set `LAKEBED_TOKEN_API` to the exact canonical origin.
- `npx lakebed deploy --public-inspect` only for demos where public data/logs are intentional.
- Reserved subdomain after claim: `npx lakebed domains add my-app.lakebed.app` (reserved names like `api`, `admin`, `docs`, `www` are blocked). Hosted on `lakebed.app` subdomains.
- Unclaimed anonymous deploys expire and are eventually deleted; claim to keep.

## Database API v1 migration

For older capsules using `where`/`orderBy`/`limit`/`all` or synchronous DB calls:
1. Add `async` to every handler using `ctx.db`; await or return every `get`/`insert`/`update`/`delete`/`collect`/`take`/`first`/`paginate`.
2. Replace `where(...)` → declared `.index(...)` + `withIndex(...)`.
3. `orderBy(f, dir)` → index traversal + `order(dir)`. `all()` → `collect()`; `limit(n).all()` → `take(n)`; single-row → `first()`; unbounded lists → `paginate(...)`.
4. Preserve all validation and ownership re-checks. Indexes improve lookup; they don't replace auth.
5. After editing: `npx lakebed build . --target anonymous --json` and fix every diagnostic.

## Examples (patterns to copy)

- **todo** — per-user rows, ownership checks, checkbox mutation (`setTodoDone` fetches row + checks `ownerId`), `clearDone` deletes only the user's completed rows. Run: `npx lakebed dev examples/todo`.
- **guestbook** — shared feed; author metadata (`authorId`, `authorName`, `authorPicture`) taken from `ctx.auth`, never client-submitted; `withIndex("by_creation").order("desc").take(50)`.

Test multiple local identities with `?lakebed_guest=alice` / `?lakebed_guest=bob`.

## Current limits

- One server entry (`server/index.ts`) and one client entry (`client/index.tsx`).
- Relative imports, `lakebed/server`, `lakebed/client`, and Lakebed-provided Preact modules only. No arbitrary npm, no Node built-ins.
- Local state resets on `npx lakebed dev` restart.
- User uploads use built-in object storage; `lakebed dev` keeps them in memory and resets.
- Anonymous deploys disable outbound server-side `fetch`; non-empty `.env.lakebed.server` requires a claimed deploy to sync.
- Static assets limited to the favicon. Hosted deploys served on `lakebed.app` subdomains.

## AGENTS.md notice

Capsules generated by `bunx lakebed new` include an `AGENTS.md` (mirrored as `CLAUDE.md`) with capsule-specific instructions. **Read it before changing files in the capsule.** It restates the hard rules above and any capsule-local conventions.
