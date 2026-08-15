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

If you doubt this, or if the task clearly belongs in a different directory than the one you started in, stop and tell the user. Say it in simple, direct terms. State what you expected to find, where you looked, and which directory the task actually needs.
