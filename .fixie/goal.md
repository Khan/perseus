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

- Keep the old name as a deprecated alias in `index.ts`, exported next to the
  new name:

  ```ts
  /** @deprecated Use {@link score} instead. */
  export const scorePerseusItem = scoreUserInputMap;
  ```

- Changeset (see CLAUDE.md), `.changeset/<three-random-words>.md`:

  ```markdown
  ---
  "@khanacademy/perseus-score": minor
  "@khanacademy/perseus": major
  ---

  Rename `scorePerseusItem` to `scoreUserInputMap`; the old name is kept as a
  deprecated alias
  ```

  `perseus-score` is `minor` because it adds an export. `perseus` is major
  because we'll be removing the `score` method of Renderer (see below).

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
  - Remove the export of `scoreWidgetsFunctional` from `perseus-score` and
    delete the deprecated `score` method on Renderer that calls it. Nothing
    uses the `score` method anymore. Then rename `scoreWidgetsFunctional` to
    `scoreWidgets`.
- Should the `perseusRenderData` parameter be renamed (e.g. to `renderer`)
  to match `PerseusRenderer` terminology?
  - No, leave the parameter name as-is.

## Checklist

- [x] Rename `scorePerseusItem` to `scoreUserInputMap` across the repo with a
      symbol-aware (LSP) rename, leaving CHANGELOGs untouched
- [x] Rewrite the doc comment of `scoreUserInputMap` to say it scores a
      `UserInputMap` against a `PerseusRenderer`
- [x] Export `scorePerseusItem` from `perseus-score`'s `index.ts` as a
      `@deprecated` alias of `scoreUserInputMap` (the deprecation note should
      link to `scoreUserInputMap`, not `score`)
- [x] Update `getting-started.mdx` and `introduction.mdx` to use the new name
- [x] Update `.agents/skills/playwright-component-testing/SKILL.md` to use
      the new name, or note in `.fixie/debug.md` if it is write-protected
- [ ] Delete the deprecated `score` method on Renderer and any tests of it
- [ ] Stop exporting `scoreWidgetsFunctional` from `perseus-score`
- [ ] Rename `scoreWidgetsFunctional` to `scoreWidgets` (symbol-aware rename)
- [ ] Grep for leftover mentions of `scorePerseusItem` and
      `scoreWidgetsFunctional` outside CHANGELOGs and the alias, and fix them
- [ ] Add the changeset (`perseus-score` minor, `perseus` major), mentioning
      the removal of Renderer's `score` method
