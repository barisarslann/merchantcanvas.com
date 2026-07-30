# Workspace Boundary

This repository has a strict write boundary.

## Allowed write scope

- Agents may create, edit, move, or delete files only inside:
  `F:\Shopify\merchantcanvas.com`
- This boundary includes all commands, scripts, tools, patches, Git operations,
  generated files, caches, temporary files, and delegated work.

## Outside the repository

- Everything outside `F:\Shopify\merchantcanvas.com` is strictly read-only.
- Agents may inspect or read external files and repositories when necessary.
- Agents may copy information or file contents from an external location into
  this repository, provided that the external source itself is not changed.
- Agents must never create, edit, rename, move, overwrite, or delete anything
  outside this repository.
- Agents must never run mutating Git operations in another repository. This
  includes `fetch`, `pull`, `checkout`, `switch`, `reset`, `clean`, `add`,
  `commit`, `merge`, `rebase`, `push`, tag changes, branch changes, and stash
  changes.
- Read-only Git commands against another repository are allowed, such as
  `status`, `log`, `show`, `diff`, `grep`, `rev-parse`, and `ls-tree`.

## Enforcement

- Before any write or destructive command, resolve the target path and confirm
  that it is inside `F:\Shopify\merchantcanvas.com`.
- Do not use an outside directory for temporary output. Put task-specific
  temporary files inside this repository and remove them when finished.
- Do not infer permission to modify a related project, sibling repository, app,
  or dependency from a task in this repository.
- A request involving another project may use that project only as a read-only
  reference. If completing the task would require changing it, stop and report
  the boundary instead of making the change.
- Any sub-agent or delegated process must receive and obey this same boundary.

This rule applies regardless of whether an outside change appears helpful,
safe, reversible, or necessary for the task.
