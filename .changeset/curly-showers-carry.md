---
"@internal/build-settings": patch
---

Build each package's entry points from a single Vite config, so that a module
reachable from more than one of them is emitted once into a shared chunk
instead of being duplicated into every bundle that reaches it.
