# Interactive Graph — Screen-Reader String Reorganization: Implementation Plan

_Implements the "Reorganize files, keep the architecture" approach chosen in
`research.md` §3. Goal: break up the 642-line `screenreader-text.ts`, give each
graph's strings one obvious home, and remove the copy-pasted custom-label
boilerplate — without changing any user-facing string output._

Root: `packages/perseus/src/widgets/interactive-graphs/graphs/`

---

## Guiding principles

- **No behavior change.** Every string emitted to a screen reader must be
  byte-for-byte identical before and after. This is a pure refactor.
- **Incremental, reviewable steps.** One graph (or one concern) per commit. Run
  the relevant tests after each step before moving on. Tests are the safety net
  that proves "no behavior change."
- **Move, don't rewrite.** Relocate functions verbatim; only touch a body when
  the step explicitly calls for it (e.g. adopting `withCustomPointLabel`).

---

## Target file layout

Create a `strings/` feature folder under `graphs/` (replacing the empty
`graphs/screen-reader-text/` scaffold — delete that directory):

```
graphs/strings/
├── index.ts            # re-exports + getAnnouncementText routing switch
├── format-number.ts    # srFormatNumber, getPiMultiple
├── coord-quadrant.ts    # getCoordQuadrant, getQuadraticVertexString,
│                         #   getQuadraticPointString
├── custom-point-label.ts # withCustomPointLabel shared helper
├── circle.ts           # srCircleRadiusPointLabel, srCircleCenterLabel,
│                         #   describeCircleGraph
├── quadratic.ts        # srQuadraticPointLabel, describeQuadraticGraph
├── ray.ts              # srRayPointLabel, describeRayGraph
├── sinusoid.ts         # srSinusoidPointLabel, describeSinusoidGraph
├── exponential.ts      # srExponentialPointLabel, describeExponentialGraph
├── logarithm.ts        # srLogarithmPointLabel, describeLogarithmGraph
├── tangent.ts          # srTangentPointLabel, describeTangentGraph
├── absolute-value.ts   # srAbsoluteValuePointLabel, describeAbsoluteValueGraph
├── angle.ts            # srAnglePointLabel, describeAngleGraph
├── segment.ts          # srSegmentPointLabel, describeSegmentGraph
├── linear-system.ts    # srLinearSystemPointLabel, describeLinearSystemGraph
├── linear.ts           # describeLinearGraph (+ line-endpoint formatting)
├── vector.ts           # srVectorPointLabel, describeVectorGraph
├── point.ts            # describePointGraph
└── polygon.ts          # srPolygonLabel, describePolygonGraph
```

Plus, in the existing `graphs/utils.ts`:
- relocate `getQuadraticCoefficients` (from `quadratic.tsx`)
- relocate `getLengthOfSegment` (from `segment.tsx`)

> **Naming note:** `screen-reader-text/` is empty today; `research.md` proposes
> the name `strings/`. Confirm the folder name with the team before scaffolding
> — this plan assumes `strings/`.

---

## What lives where today (baseline)

- `screenreader-text.ts` (642 lines) holds: `getAnnouncementText` routing switch
  (22 cases), 15 per-graph `sr<Graph>PointLabel` builders, `formatLineEndpoints`,
  the quadrant/quadratic helpers (`getCoordQuadrant`, `getQuadraticVertexString`,
  `getQuadraticPointString`), and number formatting (`srFormatNumber`,
  `getPiMultiple`).
- Each `graphs/<graph>.tsx` holds a `describe<Graph>Graph` and/or a thin
  `get<Graph>GraphDescription` wrapper, consumed by that file's
  `render<Graph>Graph` (which returns `{graph, interactiveElementsDescription}`).
- `build-point-aria-label.ts` re-implements the custom-label fallback that the
  live builders also inline (~8 duplicated `typeof pointLabel === "string"`
  blocks, each with the same `TODO(LEMS-4206)` comment).

### Consumers that import from `screenreader-text.ts` (must be repointed)

- `stateful-mafs-graph.tsx` → `getAnnouncementText`
- `graphs/utils.ts`, `components/use-control-point.tsx`,
  `components/use-control-arrowhead.tsx`, `components/build-point-aria-label.ts`
  → `srFormatNumber`
- 17 `graphs/*.tsx` files → `srFormatNumber`, `srCircleCenterLabel`,
  `srCircleRadiusPointLabel`, quadrant/quadratic helpers
- `graphs/screenreader-text.test.ts` → `getAnnouncementText`, `getCoordQuadrant`,
  `getPiMultiple`, `srFormatNumber`

### Test files importing `describe*`/`get*Description` (import paths change)

`circle.test.tsx`, `linear.test.tsx`, `linear-system.test.tsx`, `ray.test.tsx`,
`segment.test.tsx`, `quadratic.test.tsx`, `vector.test.tsx`.

---

## Phased implementation

### Phase 0 — Scaffold and lowest-level extraction (no graph logic yet)

1. **Delete** the empty `graphs/screen-reader-text/` directory; **create**
   `graphs/strings/`.
2. **`strings/format-number.ts`** — move `srFormatNumber` and `getPiMultiple`
   verbatim from `screenreader-text.ts`. Re-export both from
   `screenreader-text.ts` temporarily (so nothing else breaks yet).
3. **`strings/coord-quadrant.ts`** — move `getCoordQuadrant`,
   `getQuadraticVertexString`, `getQuadraticPointString` verbatim; these import
   `srFormatNumber` from `./format-number`. Re-export from `screenreader-text.ts`
   temporarily.
4. Run `pnpm --filter perseus test graphs/screenreader-text.test.ts` and
   `pnpm tsc` — green before proceeding.

> The temporary re-exports keep the blast radius at zero during the move; they
> are removed in Phase 5 once all imports point at the new files.

### Phase 1 — Shared custom-label helper

1. **`strings/custom-point-label.ts`** — add:
   ```ts
   // Resolves the x/y formatting and the "custom author label overrides the
   // semantic label" fallback shared by every live point builder and by
   // build-point-aria-label. Returns the custom-label string when the author
   // set one, otherwise undefined so the caller applies its semantic label.
   // TODO(LEMS-4206): remove once translation keys accept custom labels.
   function withCustomPointLabel(
       state: {pointLabel: string | number; x: number; y: number},
       strings: PerseusStrings,
       locale: string,
   ): {x: string; y: string; customLabel: string | undefined}
   ```
   It centralizes the `srFormatNumber(x)/srFormatNumber(y)` pair and the
   `typeof pointLabel === "string"` → `srPointAtCoordinates` block.
2. Update `build-point-aria-label.ts` (`buildPointAriaLabel`) to use this helper
   so the two homes for custom-label logic become one.
3. Run `build-point-aria-label.test.ts` — green.

### Phase 2 — Move per-graph live builders, one graph per step

For **each** graph below, in its own commit:

1. Create `strings/<graph>.ts`; move that graph's `sr<Graph>PointLabel` (and any
   graph-specific local helper like `formatLineEndpoints` → into `linear.ts` or a
   shared spot) from `screenreader-text.ts`.
2. Replace the inlined custom-label block with `withCustomPointLabel`.
3. Update `screenreader-text.ts`'s `getAnnouncementText` `case` to import and
   call the relocated builder.
4. Move that graph's `screenreader-text.test.ts` cases into a colocated
   `strings/<graph>.test.ts` (or keep them under the routing test until Phase 6).
5. Run the graph's tests + `screenreader-text.test.ts`.

Order (simplest first to build confidence): `vector`, `ray`, `exponential`,
`logarithm`, `tangent`, `absolute-value`, `linear-system`, `segment`, `angle`,
`sinusoid`, `circle` (`srCircleRadiusPointLabel`/`srCircleCenterLabel`),
`quadratic`, `polygon`.

### Phase 3 — Relocate the two circular-import-risk math helpers

Do this **before** moving the quadratic/segment `describe` functions (Phase 4).

1. Move `getQuadraticCoefficients` from `quadratic.tsx` → `graphs/utils.ts`.
   Update importers: `quadratic.tsx`, `quadratic.test.tsx`.
2. Move `getLengthOfSegment` from `segment.tsx` → `graphs/utils.ts`. Update
   `segment.tsx`.
3. Run `quadratic.test.tsx`, `segment.test.tsx`, `utils.test.ts`, `pnpm tsc`.

### Phase 4 — Move static `describe*Graph` functions, one graph per step

For **each** graph, in its own commit:

1. Move `describe<Graph>Graph` from `graphs/<graph>.tsx` into
   `strings/<graph>.ts` (next to its live builder). These are pure
   `(state, i18n) => strings` functions — no hooks/JSX — so they belong here.
2. **Delete the redundant `get<Graph>GraphDescription` wrapper.** Have the
   `render<Graph>Graph` function call `describe<Graph>Graph(...)` and read the
   `interactiveElement`-style key directly. (Graphs with both today: circle,
   angle, quadratic, polygon, linear, ray, vector. Graphs with only `get*`:
   linear-system, segment, point.) Standardize on `describe<Graph>Graph`
   everywhere.
3. Update the graph's `.tsx` import (now `from "./strings/<graph>"`).
4. Update test imports in the affected `*.test.tsx` files (see list above) to the
   new path.
5. Verify no circular import: each `strings/<graph>.ts` may import only
   `format-number`, `coord-quadrant`, `custom-point-label`, `strings.ts`,
   `../utils`, `../../reducer`, and `../types` — **not** the `.tsx` component.
6. Run that graph's `.test.tsx`.

### Phase 5 — Typed return for `describe*Graph`

1. Replace each `describe<Graph>Graph`'s `Record<string, string>` return with an
   explicit object type (e.g. `CircleGraphDescription` with named keys like
   `srCircleGraph`, `srCircleShape`, `srCircleInteractiveElement`). Define the
   type in the same `strings/<graph>.ts`.
2. Fix any now-surfaced key-access type errors at call sites.
3. `pnpm tsc`.

### Phase 6 — Thin the routing switch & clean up

1. Move `getAnnouncementText` into `strings/index.ts` as **only** the routing
   `switch`, each `case` delegating to a per-graph file. Keep the
   `UnreachableCaseError` default.
2. Remove the temporary re-exports left in `screenreader-text.ts` (Phase 0); if
   the file is now empty, delete it and repoint its last importers
   (`stateful-mafs-graph.tsx`, etc.) to `strings/...`.
3. Split `screenreader-text.test.ts` so each graph's announcement tests sit in
   `strings/<graph>.test.ts`, and number/quadrant tests sit in
   `strings/format-number.test.ts` / `strings/coord-quadrant.test.ts`. Keep one
   `strings/index.test.ts` (or `announcements.test.ts`) for the routing switch
   itself (e.g. the `UnreachableCaseError` default).
4. Update `mafs-graph.tsx` imports if any description helper paths changed.

### Phase 7 — Final verification

```bash
pnpm --filter perseus test packages/perseus/src/widgets/interactive-graphs
pnpm tsc
pnpm lint --fix && pnpm prettier . --write
pnpm knip   # confirm no orphaned exports / dead files remain
```

Manually spot-check in Storybook with a screen reader (or the a11y addon) that
on-focus descriptions and on-move announcements are unchanged for circle,
quadratic, polygon, and one of the line graphs.

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| **Circular imports** when `describe*` moves out of `.tsx` (quadratic→coeffs, segment→length). | Phase 3 relocates both helpers to `utils.ts` first. Enforce the import allow-list in Phase 4 step 5. |
| **Silent string drift** during a move. | Move verbatim; rely on existing `screenreader-text.test.ts` + per-graph tests as the byte-for-byte oracle. Run after every step. |
| **`withCustomPointLabel` changes output.** | Vector intentionally has *no* custom-label block (tail uses `num: 1`) — do **not** route vector through the custom-label early-return. Verify against `vector` tests. |
| **Broad import churn** (20+ files). | Temporary re-exports (Phase 0) decouple the moves from the repoint; do the repoint mechanically and lean on `pnpm tsc`. |
| **Test-file moves lose coverage.** | Move test cases, don't rewrite; confirm the suite count is preserved before/after. |

## Out of scope (explicitly not addressed)

- The static/live two-engine split and the routing `switch` remain (per §3 this
  is reorganization, not replacement).
- The AI/LLM description path (`interactive-graph-ai-utils.ts`) is left as-is.
- Resolving the `TODO(LEMS-4206)` translation-key work — the custom-label
  fallback is consolidated, not removed.
