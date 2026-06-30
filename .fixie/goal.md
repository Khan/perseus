# Rewrite grapher Cypress tests for the Interactive Graph UI

## Task

> Graphers with a single available function type (other than quadratic)
> now render as Mafs-based Interactive Graphs rather than the legacy
> Graphie grapher.
>
> The tests in `packages/perseus/src/widgets/grapher/grapher.cypress.ts`
> drive the legacy `.graphie` DOM with mouse-based `dragTo`, neither of
> which exist in the Interactive Graph, so they are skipped until rewritten
> to interact with the Interactive Graph.
>
> TODO: unskip the tests and update them for the new UI. Work one test at a
> time because the failure mode is a timeout (making the suite very slow
> when many tests fail).

File: `packages/perseus/src/widgets/grapher/grapher.cypress.ts`

## Code analysis

### How the Grapher widget renders now

- `packages/perseus/src/widgets/grapher/grapher.tsx` — `Grapher.render()`
  calls `convertGrapherOptionsToInteractiveGraph(this.props)`.
  - If the result is **non-null**, it renders `<InteractiveGraph.widget>`
    (the Mafs-based UI), converting user input back and forth with
    `convertGrapherUserInputToInteractiveGraph` /
    `convertInteractiveGraphUserInputToGrapher`.
  - If the result is **null**, it falls back to `renderLegacyGrapher()`,
    which renders the old Graphie `FunctionGrapher` (the `.graphie` DOM with
    legacy `Interactive2` movable points/lines).
- `packages/perseus-core/src/widgets/grapher/to-interactive-graph.ts` —
  `convertGrapherOptionsToInteractiveGraph` returns `null` (i.e. stays on the
  legacy grapher) when **either**:
  - `availableTypes.length !== 1`, or
  - the single type is `"quadratic"` (a quadratic can't round-trip the
    Interactive Graph's 3-point input back to the grapher's 2-point input).

### Consequence for the 7 `describe` blocks in `grapher.cypress.ts`

Only graphers with a *single, non-quadratic* available type switched to the
new UI. Mapping each block to its rendering path:

| `describe` block (testdata question) | availableTypes | Renders | Needs rewrite? |
| --- | --- | --- | --- |
| absolute value (`absoluteValueQuestion`) | `["absolute_value"]` | **Interactive Graph** | **Yes** |
| exponential (`exponentialQuestion`) | `["exponential"]` | **Interactive Graph** (has asymptote) | **Yes** |
| linear (`linearQuestion`) | `["linear"]` | **Interactive Graph** | **Yes** |
| logarithm (`logarithmQuestion`) | `["logarithm"]` | **Interactive Graph** (has asymptote) | **Yes** |
| sinusoid (`sinusoidQuestion`) | `["sinusoid"]` | **Interactive Graph** | **Yes** |
| quadratic (`quadraticQuestion`) | `["quadratic"]` | Legacy Graphie | No — still passes as-is |
| complex (`multipleAvailableTypesQuestion`) | 5 types | Legacy Graphie | No — still passes as-is |

So **5 of the 7** blocks must be rewritten. The quadratic and complex
blocks still render the legacy `.graphie` DOM (the
`data-interactive-kind-for-testing` selectors and mouse `dragTo` still work
for them — confirmed `wrapped-ellipse.ts`/`wrapped-line.ts` still emit that
attribute), so leave them unchanged. The per-block "should not have answerful
data in answerless item" tests only inspect data, not the DOM — leave them
unchanged too.

Note: as currently committed, the file has **no `skip` markers** and is
unchanged from `main`. The 5 affected blocks therefore currently fail/time
out against the new UI. The first implementation step is to skip them (per
the task's "work one test at a time" guidance), then unskip + rewrite one at
a time.

### How the legacy tests interact (what must be replaced)

```ts
const GRAPHIE = ".perseus-widget-grapher > .graphie-container > .graphie-container > .graphie";
const POINTS = "[data-interactive-kind-for-testing=movable-point] > svg > ellipse";
const LINES  = "[data-interactive-kind-for-testing=movable-line] > svg > path";
// ...
cy.get(GRAPHIE).should("exist").then((node) => {
    const {left, top} = node[0].getBoundingClientRect();
    cy.get(POINTS).eq(0).dragTo({x: left + 360, y: top + 180}); // pixel math
});
```

`dragTo` (defined in `config/cypress/support.ts`) fires
`mousedown`/`mousemove`/`mouseup`. None of `.graphie`, the legacy point/line
selectors, or pixel-based mouse-drag apply to the Mafs graph.

### How the Interactive Graph (Mafs) UI is structured

- Movable point handle — `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx`:
  an SVG `<g data-testid="movable-point__focusable-handle" role="button"
  tabIndex={0} aria-label="…">`. The `aria-label` encodes the live
  coordinates, e.g. `"Vertex point at 0 comma 0."`, `"Point on arm at 2 comma
  2."`, or the generic `"Point N at x comma y."`.
- Movable asymptote handle (exponential/logarithm) —
  `graphs/components/movable-asymptote.tsx`: `<g data-testid="movable-asymptote"
  role="button" tabIndex={0} aria-label="…">`. Rendered **before** the two
  points (see `exponential.tsx`), so in DOM order the asymptote handle is the
  first `button`, then point 1, then point 2.
- Interaction is **keyboard-driven**: focus a handle, then press
  Arrow keys. `graphs/use-draggable.ts` wires `@use-gesture/react`'s `useDrag`
  with keyboard support. With `snapStep = [1, 1]` (all these questions use it),
  **one arrow press moves the focused handle by exactly one grid unit** in that
  direction (some graphs use an object-form constraint that skips a same-x
  collision, e.g. `getAbsoluteValueKeyboardConstraint`, but still ~1 unit/press).
- The whole graph is wrapped in an ARIA `figure` (`screen.findByRole("figure")`)
  — useful as a "rendered" wait condition.
- Starting coordinates when grapher passes `coords: null` come from
  `reducer/initialize-graph-state.ts` (`getLineCoords`, `getAbsoluteValueCoords`,
  `getSinusoidCoords`, etc.). These are deterministic. Example: linear defaults
  to `[[-5, 5], [5, 5]]` (from `defaultLinearCoords` normalized over the
  `[-10,10]` range). The asymptote defaults come from the model's
  `defaultAsymptote`.

### Target answers (from each question's `correct` in `grapher.testdata.ts`)

The conversion preserves point order, so interactive-graph point index `i`
corresponds to grapher `coords[i]`. For a **correct** answer, move the handles
to the question's `correct` coords/asymptote; for an **incorrect** answer, move
to any clearly-different coords.

- absolute value: vertex → `(8, 1)`, arm → `(7, 3)`
- exponential: asymptote → `y = 5`; point 1 → `(0, 3)`; point 2 → `(1, -1)`
- linear: `(0, 5)` and `(3, 0)`
- logarithm: asymptote → `x = -6` (vertical); point 1 → `(-4, -3)`; point 2 → `(-5, -7)`
- sinusoid: `(1, 3)` and `(0, -1)`

### Scoring / verification (unchanged)

`renderQuestionWithCypress` (`packages/perseus/src/testing/render-question-with-cypress.tsx`)
returns `getRenderer`. The assertion stays the same shape as today:

```ts
cy.then(() => {
    const userInput = getRenderer().getUserInputMap();
    const score = scorePerseusItemTesting(answerful.question, userInput);
    expect(score).toStrictEqual({ /* earned 1/1 or 0/1 */ });
});
```

## Examples to follow

- **The existing legacy blocks in the same file** (`grapher.cypress.ts`,
  quadratic + complex) — keep using them as the template for test *structure*
  (answerful/answerless `data.forEach`, the "should not have answerful data"
  test, the `scorePerseusItemTesting` assertion block). Only the
  *interaction* (the `cy.get(GRAPHIE)…dragTo(...)` part) changes.
- **Keyboard interaction model** —
  `packages/perseus/src/widgets/interactive-graphs/interactive-graph.test.tsx`
  (≈ lines 326–394) drives these exact graph types via the keyboard:
  ```ts
  await userEvent.tab();                  // focus first handle
  await userEvent.keyboard("{arrowup}{arrowright}");
  // then score with scorePerseusItemTesting(question, renderer.getUserInputMap())
  ```
  Translate this idiom to Cypress.
- **Point selectors / aria-labels** —
  `graphs/absolute-value.test.tsx` shows the role/`aria-label` conventions
  (`screen.getByRole("button", {name: "Vertex point at 0 comma 0."})`, etc.)
  that the Cypress selectors should target.
- **Cypress keyboard / real-events** — `config/cypress/support.ts` already
  imports `cypress-real-events`, which provides `cy.realPress("ArrowRight")`
  and `cy.realClick()` for OS-level events that reliably reach
  `@use-gesture`'s listeners.

### Suggested interaction shape (Cypress)

```ts
// Wait for the Mafs graph to render.
cy.findByRole("figure").should("exist");

// Focus a point by its accessible name (robust to DOM order) …
cy.findByRole("button", {name: /vertex point/i}).focus();
// … or by test id + index: cy.get('[data-testid=movable-point__focusable-handle]').eq(0)

// Move one grid unit per press. Prefer reading the live aria-label to compute
// how many presses are needed, or press a fixed count from the known start
// coords. Use cypress-real-events for reliability:
cy.realPress("ArrowRight"); // repeat as needed
```

A robust helper worth writing: read the handle's `aria-label`, parse the
`"… at X comma Y."` coordinates, compute the delta to the target, and press
the right number of arrow keys in each axis (looping until the label matches
the target). This avoids hard-coding start positions.

## Behavioral requirements

- Each rewritten `it` must exercise the **Interactive Graph** UI (no
  `.graphie`, no legacy point/line selectors, no mouse `dragTo`) and produce
  the same score assertion as the legacy version it replaces — `earned: 1` for
  the "correctly answerable" case and `earned: 0` for the "incorrectly
  answerable" case, for **both** the `answerful` and `answerless` items.
- Cover all 5 affected blocks: absolute value, exponential, linear,
  logarithm, sinusoid — including moving the **asymptote** handle for
  exponential and logarithm.
- Leave the quadratic and complex (multi-type) blocks and all "should not have
  answerful data in answerless item" tests unchanged; they must keep passing.
- Work incrementally to avoid slow timeout cascades: skip the 5 affected
  blocks first, then unskip + rewrite **one `describe`/`it` at a time**,
  confirming each passes before moving to the next. No `.skip` or `.only`
  markers may remain when the work is complete.
- Tests must be deterministic — no flakiness from pixel math, animation
  timing, or off-by-one grid steps. Drive movement in graph units (arrow
  presses / aria-label-driven deltas), not pixels.
- Remove the now-unused `GRAPHIE`/`POINTS`/`LINES` constants and the
  `@ts-expect-error … dragTo` suppressions only if no remaining (legacy) block
  uses them; the quadratic/complex blocks still need them, so they likely stay.
- Keep test titles describing the observable outcome (e.g. "is correctly
  answerable", "is incorrectly answerable").
- `pnpm cypress:ci` (component run) must pass; `pnpm tsc` must stay clean.

## Open questions

- **Does `@use-gesture` keyboard-drag respond under Cypress component
  testing, and via which API?** This is the biggest risk and should be a
  first-step spike. Candidates, in order of expected reliability:
  `cy.realPress("ArrowRight")` (cypress-real-events, OS-level) >
  `cy.get(handle).trigger("keydown", {key: "ArrowRight"})` >
  `cy.focused().type("{rightarrow}")`. Confirm one works end-to-end on a
  single test before rewriting the rest.
- If keyboard movement proves unworkable in Cypress, is **pointer-based
  dragging** via `cy.realMouseDown/realMouseMove/realMouseUp` (which emit the
  pointer events `useDrag` listens for) an acceptable fallback, accepting the
  less-deterministic pixel math?
    - Answer: yes, but prefer keyboard movement over mouse
- Should these remain **Cypress** tests at all? Equivalent keyboard-driven
  coverage already exists as fast, deterministic RTL tests in
  `interactive-graph.test.tsx`, and a grapher-level RTL test could live in
  `grapher.test.ts`. The task says to rewrite the Cypress tests, so the plan
  assumes Cypress — but flag whether porting to RTL (and deleting the Cypress
  blocks) is preferable.
    - Answer: keep it in Cypress. Some of the tests are for cases that have not
      changed ("quadratic" and "complex graph question"), so we need to keep those tests.
- Confirm the exact **default start coordinates** for each graph type as
  produced by `initialize-graph-state.ts` for these questions (range
  `[-10,10]`, step `[1,1]`), or commit to the aria-label-driven "press until
  target" approach so start positions don't need to be hard-coded.
    - Answer: Use the aria labels
- For absolute value, confirm which handle is point index 0 (vertex) vs 1
  (arm) and that moving to the `correct` coords in that order grades as
  correct (the same-x keyboard constraint may require ordering the moves to
  avoid a transient collision).
    - Answer: vertex is index 0. moving to the `correct` coords in that order grades as correct.

## Notes

The following tests are for behavior that has not changed (still using the legacy Grapher UI).
They should not need to be updated.

- `describe("quadratic graph", () => {`
- `describe("complex graph question", () => {`
