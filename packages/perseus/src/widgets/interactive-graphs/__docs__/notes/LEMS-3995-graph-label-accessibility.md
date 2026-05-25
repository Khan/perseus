<!-- STOPSHIP remove this file before landing, it's not useful long-term -->

# LEMS-3995 — Custom point labels for interactive graph accessibility

> **Read this first if you are picking this work up in a new session.**
> This doc captures the problem, the alternative solutions considered, the open questions answered during brainstorming, and the implementation plan agreed on. The POC referenced below already exists at branch `ivy/poc-interactive-graph-custom-point-name` (commit `abb6572146`) — extend it rather than start from scratch.

---

## TL;DR

**Goal:** Let content authors customize the screen-reader label for interactive points on a graph so the label matches the question prompt (e.g., "Point T at zero comma zero" instead of "Point 1 at zero comma zero").

**Approach (chosen):** Add an optional `pointLabels` array per interactive graph type. The editor surfaces a name field next to each coord input under "Start coordinates". Defaults are unchanged so existing content keeps working. Inline help in the editor educates authors.

**Branch:** `LEMS-3995/fix-graph-label-to-match-questions` (current)
**POC reference:** `ivy/poc-interactive-graph-custom-point-name` — implemented for `type === "point"` only; we'll extend.

---

## The bug

Interactive coordinate plane requires the user to plot a specific point. The written prompt says "Plot point T to complete the rectangle." JAWS 2026 announces:

> "Interactive elements colon point one at zero comma zero."

Expected:

> "Point T at zero comma zero."

The mismatch confuses screen-reader users since the announced label has no relationship to the prompt. The reporter notes "Point 1" appears generic and hard-coded across many assessments — confirmed; this affects every graph type that renders `MovablePoint` without an explicit `ariaLabel`.

### Reference question

- Three locked points labeled Q(-4, 5), R(4, 5), S(4, 2) form an incomplete rectangle.
- One interactive movable point starts at (0, 0); learner drags it to (-4, 2).
- Prompt: "Plot point T to complete the rectangle."

---

## Where the bug lives

`packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx:94-100`

```tsx
const pointAriaLabel =
    ariaLabel ||
    strings.srPointAtCoordinates({
        num: sequenceNumber,
        x: srFormatNumber(point[X], locale),
        y: srFormatNumber(point[Y], locale),
    });
```

`sequenceNumber` is just an index. The `ariaLabel` override exists but no graph type currently passes it through.

The string template comes from `packages/perseus/src/strings.ts:134` and `:829-833`:

> `"Point %(num)s at %(x)s comma %(y)s."`

`srPointAtCoordinates` is consumed by:
- `useControlPoint` (every `MovablePoint` instance — point, polygon vertices, line endpoints, angle rays, quadratic vertex, sinusoid points, exponential anchors, etc.)
- `getPointGraphDescription` (the `<InteractiveGraphSRTree>` summary for the entire graph)

---

## Solutions considered

### Path A — per-point custom names (chosen)
Add `pointLabels` to the interactive graph data schema, with the per-type shape mirroring `coords` / `startCoords` (tuple for fixed-arity types, array for variable; see "Schema decision (locked)" below). Each `MovablePoint` reads `pointLabels[i]` and constructs `ariaLabel`. Editor adds a text input next to each coord under "Start coordinates".

- Pros: directly fixes the bug; reuses the existing `ariaLabel` extension on `useControlPoint`; matches the POC's structure.
- Cons: authors must remember to set names; doesn't backfill existing content (mitigated by editor info text + per question 4).

### Path B — reuse locked labels by proximity
Match `LockedLabel`s to interactive points by coordinate or explicit link, auto-assigning `ariaLabel`.

- Rejected: out of scope (locked figures are explicitly excluded per question 1). Also doesn't help the reporter's example — the interactive point starts at (0,0) where there's no locked label.

### Path C — smarter default + opt-in single label
Drop the index when only one interactive point exists; offer a single `pointLabel` string.

- Rejected: only helps single-point graphs. Polygon vertices, angle rays, line endpoints still need per-point control.

---

## Open questions — answers

### Q1. Scope — which graph types?

**Decision:** All interactive graph types. **Locked figures are out of scope.**

Concretely, every graph type whose data schema has `coords` / `startCoords` and renders `MovablePoint`:

- `point`
- `polygon`
- `linear`, `ray`
- `linear-system`, `segment`
- `circle`
- `sinusoid`
- `exponential`
- `logarithm`
- `quadratic`
- `vector`
- `tangent`
- `angle`
- `absolute-value`

Schema lives in `packages/perseus-core/src/data-schema.ts:1109-1248+`. Each graph type is its own union member; the field will be added per type (see implementation plan).

### Q2. Idea #2 — separate / rename start-coords components

**Status:** Parked as a separate cleanup, NOT bundled with this fix.

Findings from the codebase audit:

- **Absolute value already has its own component** with semantic labels — `start-coords-absolute-value.tsx` uses "Vertex" and "Arm". (My earlier reading was inverted.)
- The generic "Point 1" / "Point 2" editor labels appear in: `start-coords-line.tsx`, `start-coords-angle.tsx`, `start-coords-sinusoid.tsx`, `start-coords-quadratic.tsx`, `start-coords-multiline.tsx`, `start-coords-logarithm.tsx`, `start-coords-exponential.tsx`, `start-coords-point.tsx` (used by point AND polygon).
- Tests in `start-coords-settings.test.tsx` hard-code these strings (lines 115, 116, 178-179, 200-201, 277-278, 490-491, 554-555).

**Why parked:** these editor labels are NOT what the screen reader announces. Renaming them does not fix the bug. The accessibility fix should ship on its own.

**Why it still gets partially solved for free:** once authors enter custom names, the editor displays the custom name (e.g., "Point T:") instead of "Point 1:" — same UX win without a separate refactor. The POC already does this in `start-coords-point.tsx`.

A future ticket can replace generic "Point 1"/"Point 2" with semantic labels where they exist (e.g., angle: "Endpoint A" / "Vertex" / "Endpoint B"; quadratic: "Vertex" / "Point on curve 1" / "Point on curve 2"). Out of scope here.

### Q3. i18n impact

Minimal.

- Translation key stays the same (`srPointAtCoordinates`). Only the parameter type widens from `number` to `number | string`.
- Existing content (numeric `num`): no change in announced output.
- New content with named points: `"Point T at zero comma zero"` works in every locale because `%(num)s` is plain substitution; no pluralization or gender agreement on the parameter.
- No casting needed at call sites — current callers still pass numbers.
- **Content-translation note (workflow, not technical):** `pointLabels` is content data, not a translation string. If an English item ships with `pointLabels: ["T"]`, translators need to update both the prompt AND `pointLabels` if their locale uses different letter conventions. Add a one-line note in the rollout / release notes.

The POC widens the type at `packages/perseus/src/strings.ts:134`:
```ts
- num: number;
+ num: number | string;
```

### Q4. Existing content migration

**Decision:** Don't migrate. Add an inline editor info banner so authors learn about the feature when they next edit an item.

Treatment: small static help text under the "Start coordinates" section, e.g.:

> *"Tip: Name your points (e.g., 'T') so screen readers announce them the same way as the question prompt."*

Always-visible, no conditional logic, no nag.

---

## Naming: `pointLabels`

Field name is **`pointLabels`** (renamed from POC's `pointNames`).

Compatibility audit against the existing locked-figures schema (`packages/perseus-core/src/data-schema.ts:1012-1107`):

| Existing field | Type | Purpose | Collision with `pointLabels`? |
| --- | --- | --- | --- |
| `labels` on every `Locked*Type` | `LockedLabelType[]` | Visible TeX labels rendered at coordinates | No — different name, different shape |
| `ariaLabel?` on every `Locked*Type` | `string` | Screen-reader override for the *whole* figure | No — different scope (per-figure vs per-vertex) |

If we later extend per-vertex aria labels to locked polygons or locked points, `pointLabels` carries the same meaning and is safe to reuse there. No collision risk now or in plausible future work.

## Implementation plan — 7 PRs

Sequenced so the web-app team only takes one schema/data-shape update (PR 1), and each subsequent PR is a focused, end-to-end behavior change. The POC at `ivy/poc-interactive-graph-custom-point-name` is reference material for the pattern — we are NOT extending it directly. PRs are written from scratch on top of `main`.

### Schema-first rationale

PR 1 is pure data-shape (no behavior). Three reasons:

1. **Decouples reviewer concerns.** Schema PR is reviewed for "does this type shape make sense across the union?" — not behavior correctness. Different head-space, faster approval.
2. **Web app integration is one-shot.** Schema-only changes are additive type widenings. The web app's mirror types update once, type-check passes, deploy. PRs 2–7 only ship behavior — no schema re-litigation.
3. **Avoids per-PR schema drift.** No window where some types have `pointLabels` and others don't. All types have the field from day one; behavior lights up gradually.

The "ships dead code" concern is real but small — `pointLabels` is additive and observably a no-op until PR 2 reads it. Mitigated by landing PR 2 close behind PR 1.

### Schema decision (locked)

Add `pointLabels` per graph-type union member that has interactive points. The shape mirrors `coords` / `startCoords` for that type, so the parser rejects mismatched arities up front:

| Coord shape | Graph types | `pointLabels` type | Parser |
| --- | --- | --- | --- |
| `trio(...)` (3 points) | `angle`, `quadratic` | `[string, string, string]` | `optional(trio(string, string, string))` |
| `pair(...)` (2 points) | `linear`, `ray`, `vector`, `absolute-value` | `[string, string]` | `optional(pair(string, string))` |
| variable / special | `point`, `polygon`, `segment`, `linear-system`, `sinusoid`, `exponential`, `tangent`, `logarithm`, `circle` | `string[]` | `optional(array(string))` |

Authors can use `""` (empty string) at any index to keep the numeric default for that point — `buildPointAriaLabel` (PR 2) treats falsy entries as "use default".

(Considered: a uniform `pointLabels?: string[]` everywhere. Rejected on PR 1 review — the parser shape should match `coords` / `startCoords` for the same type, so 4 labels for an angle's 3 points fails parse instead of silently misaligning. Also considered: shared base type / top-level widget options. Rejected: larger blast radius and breaks the "graph-type-specific config" pattern.)

---

### PR 1 — Schema + i18n only

**Goal:** Establish data shape across all interactive graph types. No state, no helpers, no rendering, no editor. The web app's only data-shape stop.

**Files:**
- `packages/perseus-core/src/data-schema.ts` — add `pointLabels` to all 14 interactive `PerseusGraphType<X>` union members: `PerseusGraphTypeAngle`, `PerseusGraphTypeCircle`, `PerseusGraphTypeLinear`, `PerseusGraphTypeLinearSystem`, `PerseusGraphTypePoint`, `PerseusGraphTypePolygon`, `PerseusGraphTypeQuadratic`, `PerseusGraphTypeRay`, `PerseusGraphTypeSegment`, `PerseusGraphTypeSinusoid`, `PerseusGraphTypeTangent`, `PerseusGraphTypeExponential`, `PerseusGraphTypeLogarithm`, `PerseusGraphTypeVector`, `PerseusGraphTypeAbsoluteValue`. Skip `PerseusGraphTypeNone`. Per-type shape mirrors `coords` / `startCoords` (see "Schema decision (locked)" above).
- `packages/perseus-core/src/parse-perseus-json/perseus-parsers/interactive-graph-widget.ts` — accept `pointLabels` in the parser. Use `trio(string, string, string)` for `angle` / `quadratic`, `pair(string, string)` for `linear` / `ray` / `vector` / `absolute-value`, and `array(string)` for the rest.
- `packages/perseus/src/strings.ts` — widen `srPointAtCoordinates` `num` from `number` to `number | string`.

**JSDoc for the schema field.** Use the same one-liner on every type to match the existing `coords` / `startCoords` comment style:

```ts
/** Custom screen-reader labels for each interactive point (overrides default "Point N"). */
pointLabels?: <type>;
```

The field type varies per graph type — see the "Schema decision (locked)" table above.

**Changeset:** patch entry. Note: "additive — no behavior change yet; behavior follows in subsequent PRs."

**Risk:** minimal. Type widenings + optional field additions only.

---

### PR 2 — Foundation + point graph (load-bearing)

**Goal:** Establish the reusable infrastructure AND demonstrate it on `point` graphs. After this PR ships, the LEMS-3995 reference question is fixed.

**Foundation work (one-time setup; PRs 3–7 don't repeat any of this):**

1. **State plumbing.** Add `pointLabels?: string[]` to `InteractiveGraphStateCommon` in `packages/perseus/src/widgets/interactive-graphs/types.ts`. All graph state types extend this — so the field appears on all of them automatically. Update the reducer / initial-state code to read `pointLabels` from props into state. **Take-2 fix:** add `pointLabels` to the `reinitialize` effect's deps array in `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` (alongside `startCoords`, `numPoints`, etc.). Without this dep, props-side label changes never re-trigger `initializeGraphState`, so the editor preview's SR-tree summary keeps reading the stale initial labels. The reinit action already pulls `graph.pointLabels` from props — only the trigger was missing.

2. **`buildPointAriaLabel` helper** colocated with `useControlPoint` (or a sibling util file). Signature roughly:
   ```ts
   const buildPointAriaLabel = (
       pointLabels: string[] | undefined,
       index: number,
       point: vec.Vector2,
       strings: PerseusStrings,
       locale: string,
   ): string | undefined => {
       const customLabel = pointLabels?.[index];
       // Take-2 hardening: also fall back for truthy non-strings so malformed
       // hand-authored JSON that bypasses the parser doesn't announce e.g.
       // "Point 42 at...". The parser at parseInteractiveGraphWidget is the
       // primary line of defense; this is defense-in-depth.
       if (typeof customLabel !== "string" || !customLabel) return undefined;
       return strings.srPointAtCoordinates({
           num: customLabel,
           x: srFormatNumber(point[0], locale),
           y: srFormatNumber(point[1], locale),
       });
   };
   ```
   Returns `undefined` when no usable label — `useControlPoint` already falls back to the numeric default in that case.

3. **Extend `CoordInput` with an optional `pointLabel` prop bundle.** `CoordInput` (`packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/coord-input.tsx`) is the high-level "labeled coord row" used by most start-coords editors. Adding a single optional prop here gives PRs 3–7 the editor capability for free.

   ```tsx
   interface CoordInputProps {
       label: string;
       coord: Coord;
       onChange: (coord: Coord) => void;
       /**
        * Optional screen-reader name for the point. When provided, an inline
        * `label [TextField]` block is rendered alongside the coord pair. The
        * placeholder reflects the default numeric announcement so authors
        * know what the screen reader says when no name is entered.
        */
       pointLabel?: {
           value: string | undefined;
           placeholder: string;
           onChange: (newLabel: string) => void;
       };
   }
   ```

   **Layout (revised during PR 2 review):** the planned single-row layout (`Point 1:  name [_]  x [_]  y [_]`) overflowed the ~336 px usable width of the editor panel. The shipped implementation renders **two stacked rows** when `pointLabel` is present:

   ```
   Point 1:
   label [____]   x [____]  y [____]
   ```

   Heading on row 1, `label [_]  x [_]  y [_]` on row 2. Callers that don't pass `pointLabel` keep the original `Point N:   x [_]  y [_]` single-row appearance — no regression for the other start-coords editors. Spacing is driven by CSS `gap` with Wonder Blocks sizing tokens (no `Strut` / `spacing` imports). The TextField is `--wb-sizing-size_480` (~48 px) wide — narrow on purpose because most authors enter a single letter. Visible label inside the row 2 block is the literal word `label`; the input's `aria-label` is `"<heading> name"` (e.g. `"Point 1 name"`) so existing `getByRole("textbox", {name: "Point 1 name"})` test queries stay valid.

   We do NOT extend the lower-level `CoordinatePairInput` — it's used elsewhere in perseus-editor and should stay focused on x/y entry.

4. **Per-type-aware editor handler.** In `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx`, add `changePointLabels` and serialization that work for every graph type with a `pointLabels` field. The handler discriminates on `graph.type` and reshapes the editor input to the per-type tuple/array shape required by the schema (see "Schema decision (locked)" above). **Critically, the handler must update both `graph` and `correct`** — the editor preview renders the widget with `correct` as its `userInput`, so the rendered aria-labels (and the `InteractiveGraphSRTree` panel that reads them off the DOM) only update when `correct.pointLabels` does. The mirror is gated on `correct.type === graph.type`; the mismatch path is the LEMS-3903 recovery case where `correct` is forwarded unchanged. PRs 3–7 must not need to touch this file.

5. ~~**Inline help text** under the "Start coordinates" heading in `start-coords-settings.tsx`. Always-visible `<BodyText>` line, e.g., *"Tip: Name your points (e.g., 'T') so screen readers announce them the same way as the question prompt."*~~ **Dropped before merge.** Only `point` graphs expose the label field in PR 2 (polygon shares `start-coords-point.tsx` but is gated off until PR 3), so a global tip would mislead authors of every other graph type. The tip is deferred to a tooltip on the per-row label field once PRs 3–7 land — see the **Follow-up work** section below.

> **Why `CoordInput` and not a new wrapper:** earlier drafts proposed a `<LabeledCoordInput>` helper subcomponent. Dropped — `CoordInput` is already the "labeled coord row" component, and adding a second (point) label next to its existing row label is a natural extension. Avoids creating a new file, and most start-coords editors already import `CoordInput`. The lower-level `CoordinatePairInput` stays general-purpose for its other consumers.

**Point graph implementation (the demonstrating consumer):**

6. `packages/perseus/src/widgets/interactive-graphs/graphs/point.tsx` — for each `MovablePoint`, pass `ariaLabel={buildPointAriaLabel(state.pointLabels, i, point, strings, locale)}`.
7. `getPointGraphDescription` — route the per-point lines in the SR-tree summary through `buildPointAriaLabel` (with `?? srPointAtCoordinates({num: index + 1, ...})` as the numeric-default fallback). **Take-2 refactor:** earlier drafts inlined `pointLabels?.[index] || (index + 1)` here; that worked for falsy entries but let truthy non-strings (`42`) leak through, diverging from the MovablePoint handle's aria-label path. Routing both surfaces through the helper means they share defensive rules (empty-string slot, missing index, non-string entry) and there's one source of truth for "what's a usable label".
8. `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-point.tsx` — refactored to use the shared `CoordInput` with the new `pointLabel` prop, so the point editor reuses the same row component as every other start-coords editor. (Note: the planned "match the single-row layout" wording is outdated — the layout is now two stacked rows when `pointLabel` is present, per item 3 above.)
9. Tests:
   - Render: `pointLabels: ["T"]` ⇒ `MovablePoint` exposes `aria-label="Point T at 0 comma 0"`.
   - Editor: typing in the label field calls `onChangePointLabels` with the right array shape.
   - Default: no `pointLabels` set ⇒ existing announcement unchanged.
   - `CoordInput` unit test: renders TextField only when `pointLabel` prop is present; default rendering unchanged.
   - `changePointLabels` handler tests assert **both `graph` and `correct`** carry the reshaped `pointLabels` so the SR tree updates in lockstep with the editor field. Includes a LEMS-3903 mismatch case (`graph.type !== correct.type`) where `correct` is forwarded unchanged.
   - **Take-2 additions:**
     - Helper unit test: `pointLabels: [null, undefined, 42]` falls back to undefined at every index (locks in the `typeof` guard against malformed hand-authored JSON).
     - SR-tree summary: `pointLabels: ["", "T"]` (the editor's encoding for "only the second point labeled") announces *"Point 1 at 0 comma 0. Point T at 1 comma 1."*
     - SR-tree summary: `pointLabels: [42, "T"]` (a truthy non-string) falls back to the numeric default for index 0 (locks in the consistency between the two aria-label surfaces — both go through the helper now).
     - `stateful-mafs-graph` rerender: render with no labels → assert `Point 1 at...` on both the focusable handle and the SR-tree summary → rerender with `pointLabels: ["T"]` on both `graph` and `correct` → assert both surfaces flip to `Point T at...` on the same render. Locks in the reinit-deps fix.
10. Storybook: **before/after pair of stories** under `__docs__/interactive-graph.stories.tsx` on the LEMS-3995 reference question (3 locked points Q/R/S, 1 interactive point):
    - `PointWithCustomLabel` — `pointLabels: ["T"]`; announces *"Point T at …"*.
    - `PointWithDefaultLabel` — same prompt, `pointLabels` omitted; announces *"Point 1 at …"* (kept on purpose as a before-image / regression reference). `pointWithDefaultLabelQuestion` was added late in PR 2's review cycle so the pair ships together.
11. Changeset.

**Risk:** medium — load-bearing PR. Worth extra reviewer eyes on the helper API and state plumbing.

---

### PRs 3–7 — Common pattern (apply per graph-type group)

Each of these follows the same step-by-step checklist. **No PR in this group touches `data-schema.ts`, the parser, `strings.ts`, `InteractiveGraphStateCommon`, `interactive-graph-editor.tsx`'s handler/serialization, `CoordInput`, the start-coords-shared CSS module, or the helper functions.** They only touch the per-type render and start-coords files (and tests/stories), plus a one-line widening of the `type === "point"` gate in `start-coords-settings.tsx` to include the newly-wired graph type.

Implicit guarantees PRs 3–7 inherit from PR 2 (no extra work required):
- The shared `CoordInput` automatically renders the two-row layout (`Point N:` heading on top, `label [_]  x [_]  y [_]` below) whenever its caller passes `pointLabel`.
- `changePointLabels` already mirrors the reshaped labels onto both `graph` and `correct`, so the editor preview and the `InteractiveGraphSRTree` panel will update in lockstep without any per-type handler changes.

#### Common pattern checklist

**Step 1 — Render side (perseus)**
- [ ] In `packages/perseus/src/widgets/interactive-graphs/graphs/<type>.tsx`, replace each `MovablePoint` call to pass `ariaLabel={buildPointAriaLabel(state.pointLabels, i, point, strings, locale)}`.
- [ ] Update the per-type `getXxxGraphDescription` function (the `<InteractiveGraphSRTree>` summary) so it uses `pointLabels` for the same announcement.

**Step 2 — Editor side (perseus-editor)**
- [ ] In `start-coords/start-coords-<type>.tsx`, add `pointLabels?: string[]` and `onChangePointLabels?` to props. For each existing `CoordInput` call, pass the new `pointLabel` prop bundle:
  ```tsx
  pointLabel={
      onChangePointLabels && {
          value: pointLabels?.[i],
          placeholder: `${i + 1}`,
          onChange: (newLabel) => updatePointLabel(i, newLabel),
      }
  }
  ```
  Where `updatePointLabel` is a small helper that updates `pointLabels[i]` and calls `onChangePointLabels`.
- [ ] In `start-coords-settings.tsx`, pass `pointLabels` and `onChangePointLabels` from `props` to the new graph type's child component (one-line addition in the switch).

**Step 3 — Tests**
- [ ] Render: `pointLabels: ["X"]` ⇒ correct `aria-label` on the focusable handle.
- [ ] Editor: typing in the name field calls `onChangePointLabels` with the right array shape.
- [ ] Default: no `pointLabels` ⇒ existing announcement unchanged.
- [ ] Existing assertions on "Point 1:" / "Point 2:" editor labels stay green (placeholder behavior).
- [ ] **Use `it(...)` for new test cases, not `test(...)`** (per `CLAUDE.md` testing guidelines). Group with `describe(...)`. Don't touch pre-existing `test(...)` calls in the same file — only enforce this for the NEW cases this PR adds.

**Step 4 — Storybook**
- [ ] Add or update a story under `__docs__/interactive-graph.stories.tsx` (or per-graph-type story file) demonstrating `pointLabels`.

**Step 5 — Changeset**
- [ ] `pnpm changeset` — patch entry, link LEMS-3995.

#### PR 3 — Polygon

- Schema: covered by PR 1.
- Render: `polygon.tsx`.
- Editor: polygon already shares `start-coords-point.tsx` (PR 2). The only editor change is widening the `type === "point"` gate in `start-coords-settings.tsx` to also include `polygon` (one line) so polygon now receives `pointLabels` / `onChangePointLabels` from the parent.
- ~3 files.

#### PR 4 — Lines (linear, ray, vector)

- Render: `linear.tsx`, `ray.tsx`, `vector.tsx`.
- Editor: extend `start-coords-line.tsx` once (shared by all three). Pass `pointLabels` / `onChangePointLabels` for each type in `start-coords-settings.tsx`.
- ~5 files.

#### PR 5 — Multi-line (linear-system, segment)

- Render: `linear-system.tsx`, `segment.tsx` (or wherever multi-line render lives).
- Editor: extend `start-coords-multiline.tsx` once (shared by both).
- ~3 files.

#### PR 6 — Curves (quadratic, sinusoid, tangent, exponential, logarithm)

- Render: 5 graph files.
- Editor: extend `start-coords-{quadratic,sinusoid,tangent,exponential,logarithm}.tsx` (one-off per type — these don't share editor components).
- ~10 files.

#### PR 7 — Special shapes (angle, circle, absolute-value)

- Render: `angle.tsx`, `circle.tsx`, `absolute-value.tsx`.
- Editor: extend `start-coords-angle.tsx`, `start-coords-circle.tsx`, `start-coords-absolute-value.tsx` — these already use semantic *row labels* ("Vertex", "Center", "Radius point", "Arm") which stay as-is. The new TextField sits next to the existing coord input with the same numeric placeholder pattern used elsewhere.
- ~6 files.

PRs 3–7 are independent and can be developed in parallel after PR 2 lands.

---

## Verification commands

```bash
# Lint changed files only
pnpm lint packages/perseus packages/perseus-core packages/perseus-editor

# Format
pnpm prettier . --check

# Types
pnpm tsc

# Targeted tests
pnpm test packages/perseus/src/widgets/interactive-graphs
pnpm test packages/perseus-editor/src/widgets/interactive-graph-editor
pnpm --filter perseus-core test

# Full suite before PR
pnpm test
```

Manual verification:
1. `pnpm storybook`, open the new story.
2. Use Storybook a11y addon or screen reader (VoiceOver / JAWS) to confirm announcement matches "Point T at 0 comma 0".
3. Confirm default behavior unchanged for stories without `pointLabels`.

---

## Follow-up work

- **Rename `srPointAtCoordinates`'s `num` parameter to `pointLabel`.** PR 2 review feedback flagged that `num` is a poor name now that the parameter accepts string labels — and it's actively misleading because `num` is reserved file-wide for plural selection (see comments at `strings.ts:8-9` and `:640-641`), but `srPointAtCoordinates` is *not* plural-selected. A clean rename touches: the type signature at `strings.ts:138`, the source message at `:832` (placeholder `%(num)s` → `%(pointLabel)s`), the English impl at `:1546`, and all 6 call sites (`point.tsx:223`, `polygon.tsx:703`, `screenreader-text.ts:13`, `use-control-arrowhead.tsx:78`, `use-control-point.tsx:96`, `build-point-aria-label.ts:25`), plus mock strings. **Why deferred:** translators have produced locale strings keyed on `%(num)s`; renaming the source placeholder without updating every translation in lockstep leaves the substitution broken at runtime in non-English locales. Needs coordination with the i18n team to update locale files atomically. Prefer the name `pointLabel` over the reviewer's suggested `label` so it aligns with the existing `pointLabels` schema field, `buildPointAriaLabel` helper, and `CoordInput`'s `pointLabel` prop bundle. Out of scope for PR 2; track as a focused refactor PR after PRs 3–7 land.
- **Editor warning for malformed hand-authored `pointLabels`.** The parser at `parseInteractiveGraphWidget` already rejects non-string entries at content-load time (e.g. `pointLabels: [null, "T"]`), and `buildPointAriaLabel` was hardened in PR 2's review to also fall back to the numeric default on any `typeof !== "string"` entry. The remaining gap is editor-side: an author hand-editing a content file with a malformed `pointLabels` sees a generic parse failure rather than a friendly "use `""` to keep the numeric default" message. Add a `validatePointLabels` check inside `validateGraphSettings` (`components/interactive-graph-settings.tsx:345`) that flags non-string entries and per-type arity mismatches; the result feeds into the existing `valid: true | string` channel that already surfaces graph-config errors via `<div className="perseus-error">{valid}</div>` (`interactive-graph-editor.tsx:481`). Best landed after PR 7 so the validator covers every graph type in one place rather than per-type.
- **Author-facing tooltip for the point-label field.** PR 2 originally placed an always-visible "Tip: Name your points (e.g., 'T') so screen readers announce them the same way as the question prompt" line under the global "Start coordinates" heading, but dropped it before merge — only `point` graphs expose a label field in PR 2, so a global tip would mislead authors of other graph types. Once PRs 3–7 land and every interactive graph has a label field, add the tip back as a tooltip (Wonder Blocks `Tooltip`) anchored on each label `TextField` (or on the heading) so the guidance shows in-place where authors can act on it. Skip the always-visible body text — a tooltip avoids cluttering the editor while still discoverable.
- **Align visible label and aria-label.** The TextField currently renders the literal word `label` next to it but exposes `aria-label="Point N name"` (kept for backwards compat with existing test queries from early PR 2 drafts). A small follow-up can rename the aria-label to `"Point N label"` and update the 6 test queries in one shot — cosmetic only.
- **Reclaim the now-unused `.tile-row` CSS class.** After the PR 2 layout switch to a stacked `.tile`, `CoordInput`'s `pointLabel`-absent branch also moved to `.tile`. `.tile-row` in `start-coords-shared.module.css` is no longer referenced by any TSX consumer — safe to remove in a follow-up cleanup. (Left in place during PR 2 to keep the diff focused on the bug fix.)

## Risk register

| Risk | Mitigation |
| --- | --- |
| Authors forget to set `pointLabels` → bug recurs silently | Tooltip on the point-name field (see Follow-up work); consider follow-up: a content-linter rule that flags interactive graphs without `pointLabels` |
| Translation drift — `pointLabels` not updated when prompt is translated | Release-notes call-out; future: add to translator-facing tooling |
| Schema change cascades across many graph-type files | Scope incrementally per Phase 3; each graph-type renderer is independent |
| Existing tests assert on "Point 1:" editor labels | Tests will continue to pass when `pointLabels` is empty; no breakage expected |
| `srPointAtCoordinates` `num` type widening | Type-safe via `number \| string`; no call-site changes for existing usages |
| Editor preview + SR tree desync when typing a label | PR 2's `changePointLabels` writes the reshaped labels to both `graph` and `correct`; gated on `correct.type === graph.type` (mismatched-type case is the LEMS-3903 recovery path). Locked in by handler tests asserting both keys land. |
| Two-row tile overflows even on extra-narrow editors | `.inputs-row` uses CSS `gap` plus a deliberately narrow `.point-label-field` (`size_480` ≈ 48 px). If overflow recurs in a tighter container, drop the visible "label" word and rely on the placeholder + aria-label instead. |
| Editor preview's SR tree stuck on stale labels after typing in the label field | **Take-2:** Add `pointLabels` to `stateful-mafs-graph.tsx`'s `reinitialize` effect deps so the reducer state re-syncs from props. Locked in by `stateful-mafs-graph.test.tsx` `"re-renders aria-labels and the SR-tree description when pointLabels changes"`. |
| Truthy non-string `pointLabels` entry (`pointLabels: [42, "T"]`) announces *"Point 42 at…"* | **Take-2:** Helper guard widened to `typeof customLabel !== "string" || !customLabel`. SR-tree summary path also routed through the helper so both aria-label surfaces share the rule. Parser rejects this at content-load anyway; the runtime guard is defense-in-depth. |

---

## Files at a glance

**Schema / strings:**
- `packages/perseus-core/src/data-schema.ts`
- `packages/perseus-core/src/parse-perseus-json/perseus-parsers/interactive-graph-widget.ts`
- `packages/perseus/src/strings.ts`

**Render side (perseus):**
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx` (already supports `ariaLabel`)
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/build-point-aria-label.ts` (PR 2 — helper; take-2 hardened guard to `typeof !== "string" || !customLabel`)
- `packages/perseus/src/widgets/interactive-graphs/graphs/{point,polygon,linear,quadratic,sinusoid,exponential,logarithm,tangent,vector,angle,absolute-value,circle}.tsx`
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx`
- `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` (PR 2 take-2 — added `pointLabels` to `reinitialize` effect deps)
- `packages/perseus/src/widgets/interactive-graphs/utils.ts`

**Editor (perseus-editor):**
- `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx` (PR 2 — `changePointLabels` with `graph` + `correct` dual write)
- `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/coord-input.tsx` (PR 2 — `pointLabel` prop bundle, two-row layout)
- `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-shared.module.css` (PR 2 — `.inputs-row`, `.label-field`, `.point-label-field` classes)
- `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-settings.tsx`
- `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-{point,line,multiline,angle,sinusoid,quadratic,exponential,logarithm,tangent,circle,absolute-value}.tsx`
- `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-settings.test.tsx`

**Tests / stories:**
- `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx`
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts`

---

## Decisions log

| Decision | Why |
| --- | --- |
| Path A (per-point custom names) over Path B (reuse locked labels) or Path C (smarter default) | Direct fix, full author control, locked-figure scope explicitly excluded, multi-point graphs need per-point control |
| Apply across all interactive graph types, not just `point` | Bug isn't point-specific; "Point 1" appears anywhere `MovablePoint` is rendered without `ariaLabel` |
| Keep idea #2 (semantic editor labels) as a separate ticket | Editor labels aren't announced; renaming doesn't fix the bug; bundling delays the accessibility fix |
| Don't migrate existing content; use editor info banner instead | Per user; lower risk, ramps adoption naturally |
| Field name `pointLabels` (renamed from POC's `pointNames`) | Matches `LockedLabel` / aria vocabulary; no collision with locked-figure `labels` or `ariaLabel` fields |
| Default value remains numeric ("1", "2", …); type is `string` for opt-in letters | Most authors keep numeric defaults; only some override with letters. Editor pre-fills numeric placeholders, authors override when they want "T", "Q", etc. |
| Schema: add per-graph-type union member (Option 1) | Type-safe, minimal blast radius |
| Extend existing `CoordInput` with optional `pointLabel` prop bundle (vs. inline TextField per editor or new `<LabeledCoordInput>` wrapper) | `CoordInput` is already the "labeled coord row"; adding a point label is a natural extension. No new file; most start-coords editors already use it. `CoordinatePairInput` stays general-purpose for its other consumers. |
| Refactor `start-coords-point.tsx` from `CoordinatePairInput` → `CoordInput` | Aligns the point editor's layout with every other start-coords editor; removes the only inconsistency in the editor surface |
| Two-row tile when `pointLabel` is present (heading on row 1, `label [_]  x [_]  y [_]` on row 2) | Discovered mid-PR-2 review: the planned single-row layout (`Point 1:  name [_]  x [_]  y [_]`) overflowed the ~336 px usable width of the editor panel. Stacking keeps `Point N:` in its usual position while leaving the inputs row enough room. Callers without `pointLabel` keep the original single-row look. |
| `changePointLabels` writes to both `graph` and `correct` | Caught mid-PR-2 review: the editor preview renders the widget with `correct` as its `userInput`, so the rendered aria-labels (and the `InteractiveGraphSRTree` that reads them off the DOM) only update when `correct.pointLabels` does. Graph-only writes leave the SR tree stuck on "Point 1". Mirror is gated on `correct.type === graph.type`; mismatch is the LEMS-3903 recovery path. |
| Drop `Strut`/`spacing` imports in `CoordInput`; use CSS `gap` with Wonder Blocks sizing tokens | Per Wonder Blocks deprecation guidance — `Strut` is on the way out. CSS `gap` with `var(--wb-sizing-size_NNN)` tokens (`_060`, `_120`) gives the same visual spacing without the deprecated component. |
| **Take-2:** Harden `buildPointAriaLabel`'s guard from `if (!customLabel)` to `if (typeof customLabel !== "string" || !customLabel)` | Defense-in-depth against malformed hand-authored JSON that bypasses the parser. The parser already rejects non-string entries, but the helper can be reached via in-memory state or test fixtures that skip parsing. The empty-string clause is still load-bearing — `typeof "" === "string"`, so the editor's `""` "use default" convention requires `!customLabel` too. |
| **Take-2:** Route `getPointGraphDescription` through `buildPointAriaLabel` instead of inlining `pointLabels?.[i] \|\| (i + 1)` | Both aria-label surfaces (MovablePoint handle, SR-tree summary) now share the helper's defensive rules. Previously, the helper caught truthy non-strings but the inlined `||` in the summary path let them through, so the two surfaces could disagree on whether a custom label was usable. One source of truth eliminates that asymmetry. |
| **Take-2:** Add `pointLabels` to `stateful-mafs-graph.tsx`'s `reinitialize` effect deps | Caught during manual editor testing: typing "T" in the label field flipped the MovablePoint handle's `aria-label` (which reads props directly) but not the SR-tree summary (which reads `state.pointLabels` from the reducer). Reducer state only re-initializes when a listed dep changes; `pointLabels` wasn't listed even though `startCoords` was. Adding it as a dep (matched by reference, fresh array per keystroke) makes `reinitialize` fire and `initializeGraphState:46` already pulls the new value from props. |
