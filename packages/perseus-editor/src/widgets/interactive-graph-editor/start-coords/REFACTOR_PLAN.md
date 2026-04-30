# Start-Coords Cleanup Refactor Plan

## Goal

Reduce duplication across the 11 `start-coords-*.tsx` files in
[packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/](.)
by extracting two shared components and consolidating CSS modules.

## Scope

Single PR. Branch: `LEMS-XXXX/start-coords-cleanup` (ticket ID TBD).

Three logical changes, executed as separate commits within one PR for review
clarity and bisect-friendliness:

1. CSS consolidation
2. `<CoordInputTile>` extraction
3. `<AsymptoteInput>` extraction

## Non-goals

- Migrating remaining Aphrodite consumers to CSS modules (Phase 2 of the
  CSS-strategy unification). Out of scope; defer.
- Extracting an `<EquationDisplay>` wrapper. The block is 3 lines of JSX —
  not worth a component.
- Coord-array mutation utilities. Inline `[value, startCoords[1]]` is
  shorter and clearer than a util call.
- Generic `StartCoordsComponentProps<T>` type alias. Saves 2 lines per
  file at the cost of indirection.
- Refactoring the `start-coords-settings.tsx` switch dispatcher.

---

## Commit 1: CSS consolidation

**Changes — add** `start-coords-shared.module.css` with shared classes:

- `.tile` — background, margin, padding, border-radius (no flex props)
- `.row` — `display: flex; flex-direction: row; align-items: center`
- `.textFieldWrapper` — fixed width for asymptote inputs
- `.equationSection` — top margin
- `.equationBody` — neutral background, border, padding, smaller font

**Update** consumers to import from the shared module:

- [start-coords-exponential.tsx](start-coords-exponential.tsx)
- [start-coords-logarithm.tsx](start-coords-logarithm.tsx)
- [start-coords-tangent.tsx](start-coords-tangent.tsx)

**Delete:**

- `start-coords-exponential.module.css`
- `start-coords-logarithm.module.css`
- `start-coords-tangent.module.css`

**Watch-out:** the Aphrodite `.tile` definitions (in line/sinusoid/etc.)
use the tile *as* a flex row. The CSS-modules `.tile` is a column
container with `.row` children. Do not add flex props to the shared
`.tile` — those callers stay on Aphrodite for this PR.

**Verification:** Storybook visual parity for exponential, logarithm,
tangent stories.

---

## Commit 2: `<CoordInputTile>` extraction

**Add** [coord-input-tile.tsx](coord-input-tile.tsx):

```tsx
type Props = {
    label: string;
    coord: Coord;
    onChange: (coord: Coord) => void;
};
```

Renders a `<View className={sharedStyles.tile}>` containing a bold
`BodyText` label, a `Strut`, and a `CoordinatePairInput`.

**Migrate** consumers one at a time, deleting their local Aphrodite
`.tile` definition as each migrates:

1. [start-coords-line.tsx](start-coords-line.tsx)
2. [start-coords-sinusoid.tsx](start-coords-sinusoid.tsx)
3. [start-coords-tangent.tsx](start-coords-tangent.tsx)
4. [start-coords-quadratic.tsx](start-coords-quadratic.tsx)
5. [start-coords-angle.tsx](start-coords-angle.tsx)
6. [start-coords-absolute-value.tsx](start-coords-absolute-value.tsx)
7. [start-coords-point.tsx](start-coords-point.tsx)
8. [start-coords-multiline.tsx](start-coords-multiline.tsx)

**Watch-out:** `start-coords-multiline.tsx` wraps tiles inside a
`PerseusEditorAccordion`. The new tile component must not assume
top-level positioning — keep spacing/positioning concerns in the parent.

**Verification:**
[start-coords-settings.test.tsx](start-coords-settings.test.tsx) covers
each consumer through the dispatcher. Run after each migration. No new
unit-test file for `CoordInputTile` — pure presentational, fully covered
by parent tests, matching the existing convention (no consumer has its
own `*.test.tsx`).

---

## Commit 3: `<AsymptoteInput>` extraction

**Add** [asymptote-input.tsx](asymptote-input.tsx):

```tsx
type Props = {
    axis: "x" | "y";
    value: number;
    onChange: (value: number) => void;
};
```

Owns the local `useState`/`useEffect`/NaN-validation pattern and renders
the `Asymptote {axis} =` label plus `ScrolllessNumberTextField`.

**Migrate:**

- [start-coords-exponential.tsx](start-coords-exponential.tsx) — replace
  lines 30–59 (state/effect/handler) and 92–101 (markup)
- [start-coords-logarithm.tsx](start-coords-logarithm.tsx) — analogous

The parent's `onChange` callback still constructs the fresh
`{coords: [coords[0], coords[1]], asymptote: newValue}` object. The
inner component just calls `onChange(parsedFloat)`.

**Watch-out:** preserve the `StatefulMafsGraph` reference-equality
contract documented at
[start-coords-exponential.tsx:50–54](start-coords-exponential.tsx#L50-L54)
— the parent must spread coords on every change so `startCoords` always
gets a new reference. The inner component doesn't need to know about
this; it's a parent-side concern.

**Verification:**

- Mid-keystroke typing (e.g. `-`, `-3`, `-3.`) must not reset the field.
- Asymptote drag-handle still updates the field correctly when the user
  drags the asymptote on the graph.
- Manual Storybook check on both exponential and logarithm stories.

No new unit-test file — the typing-state behavior is exercised through
the existing parent tests, and adding a dedicated test would only
duplicate the `useState`/`useEffect` integration the existing tests
already cover end-to-end.

---

## Conventions for the new files

Following [CLAUDE.md](../../../../../../CLAUDE.md) and existing patterns in
this directory:

- **Import order:** external → internal package (`@khanacademy/*`) →
  relative (`../../../components/*`) → CSS module → `import type` last.
- **Default export:** `export default ComponentName` (matches all
  existing `start-coords-*.tsx` files).
- **No file extensions in imports.**
- **`Coord` type:** import from `@khanacademy/perseus` (matches existing
  files), not from `@khanacademy/perseus-core`.

### `<CoordInputTile>` label markup

Existing files are inconsistent: line/sinusoid/etc. use
`<BodyText size="medium" weight="bold" tag="span">` (all defaults except
`weight`), while exponential uses `<BodyText weight="bold">` (no
explicit size/tag). These render identically. The new component should
pick `<BodyText weight="bold" tag="span">` (omit redundant `size` since
`medium` is the default) and apply uniformly.

### `<AsymptoteInput>` label markup

Preserve `tag="label"` on the `BodyText` wrapping the asymptote field
(see [start-coords-exponential.tsx:92](start-coords-exponential.tsx#L92)).
This is semantic HTML — the bold text labels the input — and must not
silently change to `span`.

## Interactive-graph-specific conventions

Verified against
[new-graph-type.md](../../../../../perseus/src/widgets/interactive-graphs/__docs__/notes/new-graph-type.md)
(in `packages/perseus/src/widgets/interactive-graphs/__docs__/notes/`)
and existing patterns in this directory tree:

- **Test selectors use visible text and ARIA roles, not `data-testid`.**
  [start-coords-settings.test.tsx](start-coords-settings.test.tsx) queries
  with `screen.getByText("Point 1:")` and `getByRole("spinbutton", ...)`.
  The new components must keep label text and input semantics intact so
  existing assertions continue to pass; no `data-testid` props needed.
- **Editor strings are English-only.** No `usePerseusI18n` calls in the
  start-coords directory today — these are author-facing controls, not
  student-facing. Hardcoded `"Asymptote x = "` etc. is correct.
- **Don't refactor the `start-coords-settings.tsx` switch.**
  `new-graph-type.md` documents this switch as the canonical integration
  point for new graph types; restructuring it would break the
  documented onboarding path. Already in non-goals — re-confirmed.
- **`axis: "x" | "y"` vs `orientation: "horizontal" | "vertical"`.** The
  graph-side asymptote components
  (`graphs/components/movable-asymptote.tsx`) use `orientation`, but for
  this *editor input* the label literally reads `Asymptote {axis} =`,
  so `axis` is the more direct prop. Documenting the divergence so it
  doesn't read as inconsistency at review time.
- **File naming.** New files use kebab-case without the `start-coords-`
  prefix (`coord-input-tile.tsx`, `asymptote-input.tsx`) because they
  are not graph-type-specific. Consistent with sibling non-graph-type
  files in this folder (`util.ts`, `types.ts`).

## Open question: test the new components directly?

The plan currently says no new `*.test.tsx` files. Worth a second look
for `<AsymptoteInput>`:

- **For:** It owns non-trivial state logic (local string state, sync
  `useEffect`, NaN/empty-string guards, `parseFloat` conversion). A
  focused test pinning the typing-state behavior would catch
  regressions that parent integration tests might miss.
- **Against:** The same `useState`/`useEffect`/validation pattern lives
  uncovered today in two separate copies — extracting it doesn't make
  the code less tested than it is now, and parent tests do exercise
  it end-to-end.

Default to no new test file unless review surfaces a specific concern.
`<CoordInputTile>` is purely presentational and clearly doesn't warrant
its own test.

## Estimated impact

- **LOC removed:** ~200 net (3 CSS files, repeated tile/asymptote markup,
  Aphrodite `.tile` blocks)
- **Files added:** 3 (`start-coords-shared.module.css`,
  `coord-input-tile.tsx`, `asymptote-input.tsx`)
- **Files deleted:** 3 (per-component CSS modules)
