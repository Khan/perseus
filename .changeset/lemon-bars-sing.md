---
"@khanacademy/perseus-core": major
---

Remove the `@khanacademy/perseus-core/item-splitting` entry point.

It existed for a CI check that esbuilds `src/index.item-splitting.ts` from
source and diffs the bundle between the base branch and a PR. Nothing imported
the published subpath, so the entry is gone from `exports` entirely and the
build no longer emits a bundle or a declaration for it. The source file stays,
so that check is unaffected.

Publishing it was actively harmful: Rollup emits one self-contained bundle per
export entry, so `dist/index.item-splitting.js` carried its own copy of the
core widget registry, separate from the barrel's. Registering widgets through
one was invisible to the other, and `splitPerseusItem` reached through the
subpath threw "Core widget registry accessed before initialization!" for any
item containing a widget.

Import `splitPerseusItem` from `@khanacademy/perseus-core` instead.
