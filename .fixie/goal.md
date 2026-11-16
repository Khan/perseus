# Rename scorePerseusItem to scoreUserInputMap

## Task

> TODO: this should be named differently -
> it's scoring UserInput, not a PerseusItem; also it doesn't take a PerseusItem

(from `packages/perseus-score/src/score.ts`, line 63, in the doc comment of
`scorePerseusItem()`; the TODO has since been removed)

## Code analysis

- `scorePerseusItem()` in `packages/perseus-score/src/score.ts` takes a
  `PerseusRenderer` (an item's `question`, not a whole `PerseusItem`), a
  `UserInputMap` and a locale, and returns a `PerseusScore` plus per-widget
  scores. It is pure.
  - It finds scoreable widgets via `getScoreableWidgets()`, scores them with
    `scoreWidgetsFunctional()` (validator first, then scorer, from the widget
    registry), and merges the results with `flattenScores()` and
    `combineScoreWithWidgetScores()`.
  - Its doc comment still says "score a Perseus item", which is the wording
    the TODO objected to.
- It is part of the public API of `@khanacademy/perseus-score`
  (re-exported from `src/index.ts`), and webapp calls it by name.
- Excluding CHANGELOGs, about 36 files mention it, roughly 170 times. They
  include `score.test.ts`, `packages/perseus/src/renderer.tsx`,
  `packages/perseus/src/util/scoring.testutils.ts`,
  `packages/perseus/src/testing/item-renderer-hooks.tsx`, many widget
  `*.test.ts(x)` and `*.spec.ts` files, `__docs__/getting-started.mdx`,
  `__docs__/introduction.mdx` and
  `.agents/skills/playwright-component-testing/SKILL.md`. CHANGELOG entries
  are historical and must not change.
- Because of the number of call sites, do the rename with the LSP rename
  operation (or an equivalent symbol-aware rename), then fix up the `.mdx`
  and `SKILL.md` text by hand. `.agents/skills` may be write-protected in the
  sandbox; if so, note it in `.fixie/debug.md`.

## Examples to follow

- Keep the old name as a deprecated alias in `score.ts`, exported from
  `index.ts` next to the new name:

  ```ts
  /** @deprecated Use {@link scoreUserInputMap} instead. */
  export const scorePerseusItem = scoreUserInputMap;
  ```

- Changeset (see CLAUDE.md), `.changeset/<three-random-words>.md`:

  ```markdown
  ---
  "@khanacademy/perseus-score": minor
  "@khanacademy/perseus": patch
  ---

  Rename `scorePerseusItem` to `scoreUserInputMap`; the old name is kept as a
  deprecated alias
  ```

  `perseus-score` is `minor` because it adds an export. Other packages whose
  files change only have internal renames, so they get `patch`. This one
  changeset also covers the removed TODO in `score.ts`.

## Behavioral requirements

- The new name is `scoreUserInputMap`: it scores a whole renderer's
  `UserInputMap`, unlike per-widget scorers, which take a single `UserInput`.
- The function's behavior and signature stay the same. Its doc comment is
  rewritten to say it scores a `UserInputMap` against a `PerseusRenderer`,
  not a Perseus item.
- `scoreUserInputMap` is exported from `@khanacademy/perseus-score`.
- `scorePerseusItem` stays exported as a `@deprecated` alias so webapp keeps
  working; a later major release can remove it.
- Every in-repo caller, including `scoring.testutils.ts` and
  `item-renderer-hooks.tsx`, plus the docs and skill files, uses the new
  name. Only the alias itself (and a test that it is the same function, if
  one is added) mentions the old name.

## Open questions

- Should `scoreWidgetsFunctional`, whose name is also unclear, be renamed in
  the same change?
- Should the `perseusRenderData` parameter be renamed (e.g. to `renderer`)
  to match `PerseusRenderer` terminology?
