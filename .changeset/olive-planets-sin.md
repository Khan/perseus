---
---

The pre-publish check now verifies that every file an `exports` map points at
was actually built. It has to run after `pnpm build` and `pnpm build:types`.
