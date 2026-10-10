---
description: Always-on directive. Work only inside the current working directory.
---

# Work only in the working directory

All the files you need are inside the current working directory. Everything you must touch is there too.

Never access, read, list, or run commands against directories outside the working directory:

- no parent directories
- no home directory or user config
- no /tmp or other scratch locations
- no absolute paths elsewhere

If a file is not in the working directory, you do not need it. Do not search for it.

## One exception

The model policy file at `~/.agents/model-policy.md` is the only path outside
the working directory that you may read or write. Read it when you choose a
model. Write it only when the user asks to build or refresh the model policy.
A project policy at `.opencode/model-policy.md` sits inside the working
directory. It needs no exception.

If you doubt this, stop and tell the user. Do this also when the task belongs in a different directory than the one you started in. Say it in simple, direct terms. State what you expected to find, where you looked, and which directory the task actually needs.
