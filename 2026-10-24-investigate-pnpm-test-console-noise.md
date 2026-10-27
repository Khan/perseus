# Investigate console noise from `pnpm test`

> The `pnpm test` command prints a lot of console logs and warnings. Please investigate what is causing these, identify any repeated antipatterns in the code, and suggest fixes.

## Report

A full `pnpm test` run (576 suites, all passing) printed 137 console
messages: 123 `console.error` and 14 `console.log`. Almost all of them are
React development warnings, and they fall into a small number of groups:

| Count | Warning | Main source |
|------:|---------|-------------|
| ~50 | `An update to X inside a test was not wrapped in act(...)` | tests that change state outside RTL helpers, or let async work finish after the test ends |
| ~38 | `validateDOMNesting: <div>/<p>/<figure>/… cannot appear as a descendant of <p>` | the Renderer wrapping block widgets in a `<p>` |
| 21 | `Encountered two children with the same key, choice-1-1-1-1-1` | `radio-editor.test.tsx` fixtures |
| 14 | `console.log` with emoji | `utils/internal/update-catalog-hashes.test.ts` |
| 5 | Uncaught errors logged by React/ErrorBoundary | `image.test.ts`, `use-preview-presenter.test.ts` |
| ~10 | assorted: unknown DOM props, NaN attributes, missing keys, refs on function components | see below |

React deduplicates most warnings per component per test file, so these
counts understate how often each problem happens.

There are four repeated antipatterns worth fixing. In order of value:

1. **Tests act on the DOM or timers outside `act()`.** The most common cases
   are `element.focus()` before a `userEvent` call, and
   `jest.runOnlyPendingTimers()` in `afterEach`.
2. **Async component work outlives the test.** Promises and timeouts in
   Plotter, Sortable, and Wonder Blocks' Popper/Tooltip resolve after the
   test's last assertion.
3. **The Renderer emits a block widget inside a `<p>`.** This is a
   production bug, not just test noise. The output is invalid HTML.
4. **Fixtures and mocks are incomplete.** Duplicate IDs, a `jest.fn()` with
   no return value, and similar gaps make components crash or misbehave. In
   at least one case this makes a test pass for the wrong reason.

The fix with the most leverage is to make unexpected console output fail
the suite, using `jest-fail-on-console` or a `console.error` spy in
`config/test/test-setup.ts`, after cleaning up the existing cases. Without
that, the noise will grow back.

### Method

```
pnpm test --silent=false > $TMPDIR/test.log 2>&1
```

Each `console.*` block was attributed to the most recent `PASS <file>`
line (Jest prints a suite's buffered console output right after its
result). I then followed the component and test-file stack frames inside
each warning.

### 1. `act(...)` warnings: state changes outside act

**`element.focus()` before userEvent.** In
`packages/perseus-editor/src/widgets/image-editor/image-editor.test.tsx`
(lines 931, 961, 991, 1023), each test does:

```ts
const scaleField = screen.getByRole("spinbutton", {name: "Scale"});
scaleField.focus();               // ← outside act
await userEvent.clear(scaleField);
```

The raw `focus()` fires `onFocus` in `ScrolllessNumberTextField`
(`packages/perseus-editor/src/components/scrollless-number-text-field.tsx:76`),
which calls `setWipValue` and `setFocused` outside act. This produces 12
warnings. `userEvent.clear` and `userEvent.click` already focus the element,
so the fix is to delete the `.focus()` calls, or to replace them with
`await userEvent.click(field)`. Use a `userEvent.setup()` instance, as
CLAUDE.md recommends.

**Running timers in `afterEach`.**
`packages/perseus/src/components/scrollable-view.test.tsx:130` calls
`jest.runOnlyPendingTimers()` in `afterEach`, which flushes ScrollControls'
polling interval outside act and produces 11 warnings. Wrap the call in
`act(() => jest.runOnlyPendingTimers())`, or call `unmount()` (RTL's
`cleanup`) before flushing so no component is left to update. The
`document.body.innerHTML = ""` reset in the same hook also bypasses React's
unmount, so it leaves mounted roots behind. RTL's automatic cleanup already
handles this.

**Async work that finishes after the test.**

- **Plotter** (`packages/perseus/src/widgets/plotter/plotter.tsx:618`)
  measures category heights with `Promise.all(...).then(() => setState(...))`.
  Every test that mounts a Plotter gets a warning when the promise resolves:
  `plotter.test.tsx`, `serialize-plotter.test.tsx`,
  `plotter-editor.test.tsx`, `editor-page-snapshot.test.tsx`, and
  `article-editor.test.tsx` (14 warnings). Tests that render a Plotter
  should end with `await waitFor(...)` on something that appears after
  measurement. Alternatively, a shared helper can `await act(async () => {})`
  after rendering to flush microtasks.
- **Sortable** (`widgets/sorter/old/sorter.test.tsx`) updates from a
  `setTimeout`, which is visible as `Timeout.task` in the stack. Advance fake
  timers inside `act`.
- **Popper / Tooltip / TooltipAnchor** (Wonder Blocks) in
  `label-image.test.ts`, `input-number.test.ts`, and
  `server-item-renderer.test.tsx:517,588` position themselves
  asynchronously after they open. Use `await screen.findBy…` for the popover
  content instead of `getBy…`.
- **InnerMathInput** (`expression.test.tsx:525`, `renderer.test.tsx:406`)
  and **PhetSimulation** (`widget-ai-utils/phet-simulation/prompt-utils.test.ts`)
  follow the same pattern.

Note that `config/test/test-setup.ts:51` turns on fake timers globally in
`beforeEach`. That makes timer-driven updates easy to leave pending, and
`userEvent` must be set up with `advanceTimers: jest.advanceTimersByTime`
to cooperate with fake timers. A shared `renderAndSettle` helper, or a
documented convention, would prevent the problem from recurring.

### 2. `validateDOMNesting`: block content inside `<p>`

This group is the largest after the act warnings. It appears in 17 suites,
including `image.test.ts`, `group.test.tsx`, `renderer.test.tsx`, `blank`,
`numeric-input`, `input-number`, `graded-group-set`, `answer-tile`, and the
`widget-ai-utils/*` tests. A typical stack trace is:

```
<div> cannot appear as a descendant of <p>
  at div
  at WidgetContainer (widget-container.tsx)
  at p
  at QuestionParagraph
  at Renderer (renderer.tsx:280)
```

`Renderer.outputMarkdown` (`packages/perseus/src/renderer.tsx:966`) wraps
each markdown paragraph in `<p className="deprecated-perseus-container">`.
`Util.splitBlockWidgetsFromParagraphs` (`util.ts:207`) is supposed to pull
block widgets out first, but it has two gaps:

- `isBlockWidgetNode` (`util.ts:97`) asks `isInlineWidget(widgetType)` with
  no alignment, so it uses only the widget's *default* alignment.
  `WidgetContainer` (`widget-container.tsx:119`) passes the item's actual
  `alignment`. A widget whose default is inline but whose content says
  `block`, or the reverse, ends up classified one way by the splitter and
  the other way by the container. The container then renders a `<div>`
  inside the `<p>`.
- The function's doc comment says it only handles direct children of
  top-level paragraphs, so widgets nested in `strong`, tables, or columns
  are not split.

There is a second variant inside the image widget: the image's caption and
title are rendered with a nested `Renderer`, and that nested Renderer emits
its own `<p>` inside `<figure>`/`<figcaption>`. The warnings in `image.test.ts`
and `group.test.tsx` about `<p>` inside `<p>` and `<figure>` inside `<p>`
come from this nesting. They mean the outer image widget was itself placed
inside a `<p>`. In `image.testdata.ts:9` the widget is alone in its
paragraph (`"[[☃ image 1]]\n\n====="`), so I expected the splitter to
handle it. I didn't confirm which of the gaps above applies here. Add a
failing unit test for `splitBlockWidgetsFromParagraphs` using the parse
tree of that exact content, then pass the node's alignment, or use the same
predicate as `WidgetContainer`. Captions should be rendered inline, or
inside a `<div>`, so a `<figcaption>` never contains a `<p>`.

Because browsers repair invalid `<p>` nesting by closing the paragraph
early, this bug can change the DOM that learners see. It is worth fixing for
its own sake, not only to quiet the tests.

### 3. Duplicate React keys in radio-editor tests

All 21 instances of `Encountered two children with the same key,
choice-1-1-1-1-1` come from
`packages/perseus-editor/src/widgets/radio-editor/radio-editor.test.tsx`
(lines 332, 496, 522, 549, 581, 615, 649). The helpers at lines 49–57 return
the same ID every time:

```ts
function getCorrectChoice(): PerseusRadioChoice {
    return {content: "", correct: true, id: mockIds[0]};
}
```

Four choices built from these helpers share one ID, and the editor keys
rows by `choice.id` (`radio-editor.tsx:357`). Use
`generateRadioChoice` from `perseus-core/src/utils/generators` with distinct
IDs, or give the helpers an `id` parameter. Besides the noise, the shared
keys make React reuse rows across choices, so these tests don't exercise
realistic data.

### 4. Real errors hidden by ErrorBoundary or `toThrow`

- **`image.test.ts:571`, "does not render a zoom image button for gif
  images".** The file mocks `decodeGifFrames: jest.fn()` (line 30), but only
  the GIF `describe` block at line 1102 gives it a resolved value. This test
  sits outside that block, so `decodeGifFrames(url).then` (`image.tsx:75`)
  throws `Cannot read properties of undefined (reading 'then')`. The widget's
  ErrorBoundary catches the error and renders nothing. **The test passes
  only because the widget crashed**: no widget means no zoom button. Set
  `mockResolvedValue` in a top-level `beforeEach`, and assert that the image
  rendered before asserting that the button is absent.
- **`use-preview-presenter.test.ts:140`** expects a throw. React still logs
  the uncaught error and "The above error occurred in <TestComponent>".
  This is expected. Silence it locally with
  `jest.spyOn(console, "error").mockImplementation(() => {})` inside that
  test.

### 5. Script output in `update-catalog-hashes.test.ts`

The 14 `console.log` lines ("✅ Updated N package.json files", "🔮 Would
update…") are the normal output of `utils/internal/update-catalog-hashes.ts`.
Either spy on `console.log` in that test, which would also let it assert on
the messages, or inject a logger into the function.

### 6. Smaller one-offs

- **`testId` passed to a DOM element** (`image.test.ts`,
  `explore-image-modal.test.tsx`). Some component spreads a WB-style
  `testId` prop onto a raw element. It should be renamed to `data-testid`,
  or the element should be a WB component.
- **`keypadElement` passed to a DOM element** (`number-line.test.ts`).
  `NumberInput` (`components/number-input.tsx:73`) forwards
  `keypadElement` from `NumberLine` (`number-line.tsx:239`) onto an
  `<input>`. Destructure it out before spreading the rest of the props.
- **`Received NaN for the y1 attribute`**
  (`interactive-graph.test.tsx`, `interactive-graph-editor.test.tsx:573`).
  A line is drawn from an incomplete or degenerate fixture. Check the
  fixture and guard the coordinate computation.
- **Missing `key`** (`simple-markdown.test.tsx`, `group.test.tsx`) comes
  from "Check the render method of `Renderer`" and from a top-level `<p>`.
  Some output path returns arrays without keys.
- **Function components cannot be given refs**
  (`__tests__/widget-container.test.tsx:28`). The test's
  `MockWidgetComponent` should use `React.forwardRef`, because
  `WidgetContainer` attaches a ref.

### Suggested order of work

1. Fix the image GIF mock (§4). It is a false-passing test.
2. Fix `splitBlockWidgetsFromParagraphs` alignment handling (§2), starting
   with a failing test. It is a production HTML bug.
3. Mechanical test cleanups: remove the `.focus()` calls (§1), make the
   radio fixture IDs unique (§3), wrap timer flushes in `act`, and await
   async settles for Plotter and Popper.
4. Spy on `console.log` and `console.error` where the output is intended
   (§4, §5).
5. Add `jest-fail-on-console`, or an equivalent `console.error` and
   `console.warn` spy in `config/test/test-setup.ts` that throws, so new
   warnings fail CI. If some warnings can't be fixed right away, allow them
   with an explicit list of known patterns.
