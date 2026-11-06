# Investigate React act() warnings in tests

> When I run `pnpm test`, a lot of console errors are printed about updates to React components
> that are not wrapped in `act()`. The errors look like:
>
> ```
> An update to <component> inside a test was not wrapped in act(...)
> ```
>
> Investigate why these errors happen and suggest a fix for each error. Ignore
> the other console logs that are printed by `pnpm test`.

## Report

All tests pass, but 13 test files print act() warnings, about 60 warnings in
all. Every warning comes from a state update that React sees outside an
`act()` scope. The updates have five causes:

1. The test calls an imperative method (`focus()`) directly instead of through
   `act()` or `userEvent`.
2. The test advances Jest fake timers outside `act()`.
3. A component schedules a `setTimeout` or a Promise during render or mount,
   and the callback runs after the test's last `act()` has returned.
4. Popper (used by Wonder Blocks `Tooltip` and dropdowns) recomputes its
   position in a microtask after mount.
5. The test's `afterEach` runs timers after the test has finished but before
   RTL unmounts the component.

The fix is almost always in the test: wrap the call in `act()`, or wait for
the async work to settle with `await act(async () => {})` or `waitFor`. Two
of the causes (Plotter and Sortable) also show up in several unrelated tests,
so a fix in a shared helper would help more than per-test patches.

I got these results by running `pnpm test` and grouping each warning by the
test file that printed it (Jest prints a file's console output under its
`PASS` line). The table lists them in the order they appeared.

| Test file | Component | Count | Cause |
|---|---|---|---|
| `perseus/src/__tests__/server-item-renderer.test.tsx` | `TooltipAnchor`, `Tooltip` | 4 | 2 |
| `perseus/src/widgets/label-image/__tests__/label-image.test.ts` | `Popper` | 4 | 4 |
| `perseus/src/widgets/input-number/input-number.test.ts` | `Popper` | 4 | 4 |
| `perseus/src/widgets/expression/expression.test.tsx` | `InnerMathInput` | 2 | 1 |
| `perseus/src/widgets/sorter/old/sorter.test.tsx` | `Sortable` | 2 | 3 |
| `perseus/src/components/scrollable-view.test.tsx` | `ScrollControls`, `ScrollableArea` | 11 | 5 |
| `perseus/src/widgets/plotter/plotter.test.tsx` | `Plotter` | 8 | 3 |
| `perseus/src/widgets/plotter/serialize-plotter.test.ts` | `Plotter` | 1 | 3 |
| `perseus/src/widget-ai-utils/phet-simulation/prompt-utils.test.ts` | `PhetSimulation` | 1 | 3 |
| `perseus-editor/src/widgets/image-editor/image-editor.test.tsx` | `ScrolllessNumberTextField` | 12 | 1 |
| `perseus-editor/src/article-editor.test.tsx` | `Plotter` | 1 | 3 |
| `perseus-editor/src/editor-page-snapshot.test.tsx` | `Plotter` | 1 | 3 |
| `perseus-editor/src/widgets/plotter-editor/plotter-editor.test.tsx` | `Plotter` | 3 | 3 |

### server-item-renderer.test.tsx: `jest.runAllTimers()` outside act

Lines 517 and 588 call `jest.runAllTimers()` bare. The pending timers include
Wonder Blocks `TooltipAnchor`'s hover/focus delay (the tooltip in
`numeric-input/input-with-examples.tsx`). When it fires, it calls
`TooltipAnchor._setActiveState`, which calls `setState` on `TooltipAnchor` and
then `Tooltip`.

Fix: wrap the timer flush.

```ts
act(() => jest.runAllTimers());
```

### expression.test.tsx: `expression.focus()` outside act

The test "returns true from focus() and succeeds even if called before the
DOM ID is assigned" (line 503) calls `expression.focus()`. That reaches
`InnerMathInput.focus` (`components/math-input.tsx:294-297`), which focuses
the MathQuill textarea (which triggers React's `onFocus`) and then calls
`setState({focused: true})`. Both produce a warning.

Fix:

```ts
const focused = act(() => expression.focus());
```

`act` returns the callback's return value for synchronous callbacks, so the
assertion on `focused` still works. The sibling test just above already does
this.

### image-editor.test.tsx: `field.focus()` outside act

The scale tests (lines 931, 961, 991, 1023) call `scaleField.focus()` on the
raw DOM element. `ScrolllessNumberTextField`'s `onFocus` handler
(`perseus-editor/src/components/scrollless-number-text-field.tsx:76-78`)
calls `setWipValue` and `setFocused`, so each test prints two warnings.

Fix: focus through user-event, which RTL wraps in act:

```ts
await userEvent.click(scaleField);
```

`act(() => scaleField.focus())` also works, but `userEvent.click` is closer
to what a user does.

### label-image.test.ts and input-number.test.ts: Popper's async update

`react-popper`'s `usePopper` runs Popper's `forceUpdate` through
`@popperjs/core`'s `debounce`, which defers it to a microtask. The callback
then calls `flushSync(() => setState(...))` (`react-popper/lib/cjs/usePopper.js:63-64`).
The microtask runs after `render()`'s `act()` has returned, so React warns.
In `label-image` the Popper belongs to `AnswerPill` (`label-image/answer-pill.tsx`);
in `input-number` it belongs to the `Tooltip` in `numeric-input/input-with-examples.tsx`.
Neither stack trace has a test-file frame, because the update runs from the
microtask queue.

Fix: after rendering (or after the interaction that opens the popper), let
the microtask settle inside act:

```ts
renderQuestion(...);
await act(async () => {});
```

Many widgets render a Tooltip, so it would be worth giving `renderQuestion`
(`perseus/src/__testutils__/render-question.tsx`) an async counterpart that
does this, or flushing in a shared helper. That fixes this case and the
Plotter and PhetSimulation cases below at once. Making `renderQuestion`
itself async would mean changing every caller, so a separate helper is
probably easier to adopt.

### Plotter: `Promise.all(...).then(setState)` after mount

`Plotter` (`perseus/src/widgets/plotter/plotter.tsx:618-629`) measures its
category labels asynchronously and calls `self.setState({categoryHeights})`
when the promises resolve. The `_isMounted` guard stops the update after
unmount, but not between the end of `render()` and the end of the test.
This one source accounts for warnings in five test files (`plotter.test.tsx`,
`serialize-plotter.test.ts`, `article-editor.test.tsx`,
`editor-page-snapshot.test.tsx` and `plotter-editor.test.tsx`).

Fix in the tests: `await act(async () => {})` after each render of a Plotter,
or wait for something that depends on `categoryHeights`. The shared helper
described above is the easiest way to cover all five files.

### PhetSimulation: async `componentDidMount`

`PhetSimulation.componentDidMount` (`phet-simulation/phet-simulation.tsx:83-85`)
awaits `updateSimState`, which awaits `fetch` and `showLocaleWarning` before
calling `setState` (line 143). In `widget-ai-utils/phet-simulation/prompt-utils.test.ts`,
the test renders the widget and reads its prompt JSON synchronously, so the
`setState` lands after the test has moved on. `phet-simulation.test.ts`
already avoids this by awaiting the update.

Fix: after `renderQuestion(...)` in that test, `await act(async () => {})`
(or `await waitFor(...)` on something the update changes, as the
phet-simulation tests do).

### sorter/old/sorter.test.tsx: `setTimeout` in `Sortable.componentDidUpdate`

`Sortable.componentDidUpdate` (`perseus/src/components/sortable.tsx:557-573`)
schedules `measureItems()` with `setTimeout(..., 0)` whenever item sizes have
been reset, and `measureItems` calls `setState` (line 624). The tests use
real timers, so the timeout fires on its own after the test's last act. The
trace shows jsdom's `Timeout.task` with no test frame.

Fix: in the affected tests, wait for the measurement inside act, e.g.
`await act(async () => { await new Promise((r) => setTimeout(r, 0)); })`,
or switch the file to fake timers and call `act(() => jest.runOnlyPendingTimers())`
after each interaction that resets the items. A cleaner long-term fix is the
TODO at line 568 (use the Wonder Blocks timing API), which would make the
timer cancellable and easy to drive from tests.

### scrollable-view.test.tsx: timers flushed in `afterEach`

`ScrollControls` polls its scroll target on an interval
(`perseus/src/components/scrollable-view.tsx`, `setScrollState` at line 266).
The file's `afterEach` (lines 119-132) calls `jest.runOnlyPendingTimers()`
before switching back to real timers. Jest runs `describe`-level `afterEach`
hooks before RTL's global cleanup, so the components are still mounted and
each pending poll calls `setScrollState` outside act. That is 11 warnings,
about one per test.

Fix: either wrap the call:

```ts
act(() => jest.runOnlyPendingTimers());
```

or unmount first by calling RTL's `cleanup()` at the start of the
`afterEach`. Unmounting clears the interval, so no state updates are left to
flush. `document.body.innerHTML = ""` in the same hook removes the DOM
without unmounting React, so it does not help here; `cleanup()` makes it
unnecessary.
