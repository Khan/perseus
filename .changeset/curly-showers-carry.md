---
"perseus-build-settings": patch
---

Build all of a package's entry points together so that modules shared between
them are emitted once. Previously each entry point was bundled on its own, so
importing `@khanacademy/perseus/strings` gave you a different copy of
`strings.ts` than the main bundle used.
