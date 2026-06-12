# Interactive Graph — Screen-Reader String Logic: Research & Optimization Options

_Scope: where all the string / aria-label / screen-reader-description logic for the
`interactive-graphs` widget lives today, and three options for organizing it._

Root: `packages/perseus/src/widgets/interactive-graphs/`

---

## 1. Where the string logic lives today

There are **two parallel description systems** plus several supporting layers. Each
interactive graph (circle, quadratic, linear, …) is described to screen readers in
*two different ways*, built by *two different mechanisms* that live in *two different
places*:

| # | Layer | What it does | Where it lives |
|---|-------|--------------|----------------|
| 1 | **Translatable templates** | ~315 `sr*` keys (`srPointAtCoordinates`, `srInteractiveElements`, `srCircleRadius`, …) — the actual ICU-style string functions. | `packages/perseus/src/strings.ts` |
| 2 | **Value formatting** | `srFormatNumber`, `getPiMultiple`, `getCoordQuadrant` — turn numbers/coords into reader-friendly text (π multiples, quadrant names). | `graphs/screenreader-text.ts` |
| 3 | **Live announcements** (dynamic, on move) | `getAnnouncementText()` — a ~95-line `switch` over 22 announcement types, dispatching to ~15 per-graph helpers (`srQuadraticPointLabel`, `srRayPointLabel`, …). Read aloud when a user drags/keys a point. | `graphs/screenreader-text.ts` (642 lines) |
| 4 | **Static graph descriptions** (aria-label / aria-describedby) | Per-graph `describe<Graph>Graph` / `get<Graph>GraphDescription` functions returning the `interactiveElementsDescription`. Read on focus. | colocated inside each `graphs/*.tsx` |
| 5 | **Static point labels** (custom author labels) | `resolvePointLabel`, `buildPointAriaLabel`, `usePointAriaLabel` — resolve `pointLabels[i]` → "Point 1" / custom "T". | `graphs/components/build-point-aria-label.ts` |
| 6 | **Description container** | `SRDescInSVG` — renders the hidden `<foreignObject><span>` that `aria-describedby` points to. | `graphs/components/sr-description-within-svg.tsx` |
| 7 | **Aggregation / wiring** | `renderGraphElements` switch maps each graph type → its description; assembles `fullGraphAriaLabel`, `fullGraphAriaDescription`, keyboard-instruction strings. | `mafs-graph.tsx` |
| 8 | **Announcement plumbing** | `InteractiveGraphStateAnnouncement` union (22 variants) + reducer that builds the `stateAnnouncement` payload; `stateful-mafs-graph.tsx` calls `getAnnouncementText`. | `types.ts`, `reducer/interactive-graph-reducer.ts`, `stateful-mafs-graph.tsx` |
| 9 | **AI / LLM description** | `getPromptJSON` — a *third* description path, for AI tooling. | `widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` |

### Data flow at a glance

```
Static (on focus):
  graphs/<graph>.tsx  describe<Graph>Graph() ──> mafs-graph renderGraphElements switch
        │                                              │
        └─ build-point-aria-label (point labels)       └─> SRDescInSVG / aria-label
                                                            uses strings.ts + srFormatNumber

Live (on move):
  reducer ──> stateAnnouncement (types.ts union) ──> stateful-mafs-graph
                                                          │
                                                          └─> getAnnouncementText() switch
                                                                (screenreader-text.ts)
                                                                uses strings.ts + srFormatNumber
```

---

## 2. What makes it feel messy

1. **Two engines describing the same graph.** Static descriptions live *colocated*
   in each `graphs/*.tsx`; live announcements live *centralized* in
   `screenreader-text.ts`. The same "coord → label" intent is implemented twice per
   graph, in two styles, far apart.

2. **`screenreader-text.ts` is a 642-line grab-bag.** It mixes: the routing switch,
   ~15 per-graph label builders, number formatting (`srFormatNumber`/`getPiMultiple`),
   and quadrant math (`getCoordQuadrant`). These have very different reasons to change.

3. **Copy-pasted boilerplate.** Almost every `sr<Graph>PointLabel` repeats:
   - `const x = srFormatNumber(state.x, locale); const y = …`
   - the identical *"custom author label overrides …"* block guarding
     `typeof state.pointLabel === "string"` — duplicated ~8× with the same
     `TODO(LEMS-4206)` comment verbatim.

4. **Inconsistent naming.** `describeCircleGraph`, `describeLinearGraph`,
   `describeRayGraph`, `describeQuadraticGraph`, `describeVectorGraph` vs.
   `getPointGraphDescription`, `getSegmentGraphDescription`,
   `getLinearSystemGraphDescription`. Some files have **both** a `describe*` and a
   thin `get*Description` wrapper (e.g. circle).

5. **Weak typing at the boundary.** `describe*Graph` returns an untyped
   `Record<string, string>`; callers pick keys by string.

6. **Two homes for "custom label" logic.** Static path uses
   `build-point-aria-label.ts`; live path re-inlines the same fallback in
   `screenreader-text.ts`.

7. **Orphaned scaffolding.** `graphs/screen-reader-text/` is an empty directory.

8. **A third, unrelated description path** (`interactive-graph-ai-utils`) doesn't
   reuse any of the above.

---

## 3. Chosen approach — Reorganize files, keep the architecture (low risk)

Keep the two-engine model, just make it tidy and DRY.

- Create a `strings/` feature folder (reuse the empty `screen-reader-text/`
  directory's place), and split the 642-line `screenreader-text.ts` into:
  - `format-number.ts` (`srFormatNumber`, `getPiMultiple`),
  - `coord-quadrant.ts` (`getCoordQuadrant`, quadratic vertex/point helpers),
  - **one file per graph for that graph's unique strings** — e.g.
    `circle.ts`, `quadratic.ts`, `ray.ts`, `sinusoid.ts`, … each holding that
    graph's `sr<Graph>PointLabel` / label builders **and that graph's
    `describe<Graph>Graph` static-description function** (see below). **Do not**
    dump them all in a single `announcements.ts`.
  - a thin `announcements.ts` (or `index.ts`) that keeps `getAnnouncementText`
    as just the routing `switch`, delegating each `case` to the matching per-graph
    file above.
- **Move the per-graph `describe<Graph>Graph` / `get<Graph>Description` functions
  out of `graphs/*.tsx` and into the matching `strings/<graph>.ts` file.** This is
  safe and desirable: all 8 are pure `(state, i18n) => strings` functions with no
  React hooks or JSX, so they don't belong in a component file, and it puts both the
  static (on-focus) and live (on-move) text for a graph in one place. Their only
  consumers are the graph component itself (one-way import) and the graph's test
  file (update the import path). **Watch for circular imports:** two describe
  functions call helpers defined locally in their `.tsx` —
  `describeQuadraticGraph` → `getQuadraticCoefficients` (in `quadratic.tsx`) and
  `getSegmentGraphDescription` → `getLengthOfSegment` (in `segment.tsx`). Relocate
  those two pure-math helpers to `graphs/utils.ts` in the same pass. The other six
  graphs only depend on `strings.*`, `./utils`, or `../reducer`, so no cycle.
- Extract the duplicated *"custom author label override"* + `x/y` formatting into
  one shared helper (`withCustomPointLabel(state, strings, locale, fallbackFn)`),
  used by both the live builders and `build-point-aria-label.ts` so the two homes
  for custom-label logic become one.
- Standardize naming: pick `describe<Graph>Graph` everywhere; delete the redundant
  `get*Description` wrappers.
- Give `describe*Graph` a typed return instead of `Record<string, string>`.

**Pros:** quick, mechanical, low blast radius; immediately breaks up the 642-line
file, removes the copy-paste, and gives each graph's strings an obvious home.
**Cons:** the static/live split and the routing `switch` remain — this organizes the
existing architecture rather than replacing it.
