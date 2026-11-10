# Silence six sources of console noise in `pnpm test`

## Task

> Read .fixie/digs/2026-11-10-find-pnpm-test-console-log-sources.md and write a
> plan to fix issues 2, 4, 5, 6, 7, and 8. Do not address issues 1 or 3; they
> will be fixed on separate branches.

The issues, summarized from the dig:

2. `Received NaN for the y1/y2 attribute` from mafs `Line.ThroughPoints` in
   `locked-line.tsx`, because tests give a locked line two identical points
   (`interactive-graph.test.tsx:1574-1590`, and the editor's
   "getSaveWarnings returns an error when the graph is invalid" test in
   `interactive-graph-editor.test.tsx:568-590`).
4. React does not recognize the `keypadElement` prop: `number-line.tsx:669`
   passes it to `NumberInput`, which spreads unknown props onto `<input>`.
5. Missing `key` in a custom `react` rule in
   `simple-markdown/src/__tests__/simple-markdown.test.tsx` (~lines 3992 and
   4014-4016).
6. "Function components cannot be given refs" from `MockWidgetComponent` in
   `perseus/src/__tests__/widget-container.test.tsx`.
7. Expected-throw errors logged by
   `perseus-editor/src/preview/use-preview-presenter.test.ts:136-142`.
8. `console.log` progress output from `utils/internal/update-catalog-hashes.ts`
   during `utils/internal/update-catalog-hashes.test.ts`.

## Code analysis

- **Locked lines:** `LockedLine` (`perseus/src/widgets/interactive-graphs/
  locked-figures/locked-line.tsx`) renders a ray as a `Vector`, and a segment
  or line as a mafs `Line.Segment`/`Line.ThroughPoints` plus arrowheads. It
  computes arrowheads via `getIntersectionOfRayWithBox` and an angle from the
  two points; none of that is meaningful when the points coincide.
- The editor flags a zero-length locked line in `getSaveWarnings`, but the
  preview still renders it, so authors can reach this state.
- `getDefaultFigureForType("point")` (perseus-core) always returns
  `coord: [0, 0]`, which is why the interactive-graph test ends up with two
  identical points.
- **NumberInput:** `components/number-input.tsx` destructures the props it
  knows and spreads `restProps` onto `<input>`. `keypadElement` is not one of
  its props in a meaningful way; `number-line.tsx` passes it anyway.
- **simple-markdown:** `nestedOutput`/array rule output renders rule results
  as arrays, so each React rule must set `key={state.key}`, as the built-in
  rules do.
- **WidgetContainer** attaches a ref to the widget component. Real widgets are
  `forwardRef` components exposing a `Widget` handle via
  `useImperativeHandle` (see `widgets/dropdown/dropdown.tsx`).
- `usePreviewPresenter` throws when not in an iframe; the test asserts that.
  React/jsdom log render errors even when they are caught.
- `update-catalog-hashes.ts` is a CLI script that reports progress with
  `console.log`.

## Examples to follow

- `forwardRef` + `useImperativeHandle` widget shape:
  `packages/perseus/src/widgets/dropdown/dropdown.tsx:30,83`.

  ```tsx
  const MockWidgetComponent = React.forwardRef<Widget, Props>(
      function MockWidgetComponent({options: {text, fail = false}}, ref) {
          React.useImperativeHandle(ref, () => ({}));
          ...
      },
  );
  ```
- Silencing expected console output in one test:
  ```ts
  jest.spyOn(console, "error").mockImplementation(() => {});
  ```
  Search for existing uses of `jest.spyOn(console` to match local style
  (scoped to the single test or a `beforeEach`).
- Test structure follows CLAUDE.md (AAA comments, generators from
  `perseus-core/src/utils/generators`).

## Behavioral requirements

- After the change, the tests named above run without printing the messages
  in groups 2, 4, 5, 6, 7 and 8. Groups 1 and 3 are out of scope.
- **Issue 2 (production change):** `LockedLine` must not emit NaN attributes
  when its two points are equal. Render nothing for the line part (points
  with `showPoint1`/`showPoint2` may still render) — or a point; see open
  questions. Add a test in the locked-line/locked-figures tests covering
  coincident points, and fix `interactive-graph.test.tsx` to use two distinct
  points, since it only checks labels. The editor test keeps its zero-length
  line deliberately and should then be quiet.
- **Issue 4 (production change):** stop passing `keypadElement` from
  number-line to `NumberInput`; remove it from `NumberInput`'s props type if
  declared there. No change in rendered behavior. Replacing the `restProps`
  spread with an allowlist is optional and should be skipped unless it is
  small and safe.
- **Issues 5–8:** test-only changes. Do not change what the tests assert. For
  issue 8, mock `console.log` in `beforeEach`; asserting on calls is optional.
- Console mocks must be restored after each test (rely on Jest's
  `restoreMocks` config if set, otherwise restore explicitly).
- Add a changeset: `@khanacademy/perseus: patch` for the locked-line and
  number-line fixes. Nothing else ships.

## Open questions

- For coincident locked-line points, should `LockedLine` render nothing,
  a single point, or keep rendering the points only? Rendering only the
  optional endpoints seems least surprising.
  - It should render the points only.
- Should the same guard apply to rays (`kind === "ray"`), which also derive a
  direction from the two points? Probably yes, for consistency.
  - Yes, include tests for ray and also locked vectors if they don't have
    tests already.
- Should `NumberInput` switch to an explicit prop allowlist now, or in a
  follow-up?
  - Yes, explicitly list the props to be passed to the `<input>`.
