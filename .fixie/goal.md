# Eliminate console noise from `pnpm test` and fail on new warnings

## Task

> TODO-NEXT: do the work suggested above.

(from `2026-10-24-investigate-pnpm-test-console-noise.md`, line 243)

"The work suggested above" is the "Suggested order of work" in that report.
The report has file and line references for every item; read it first. This
plan refines that order as follows:

1. **Fix the false-passing GIF tests (§4).** `image.test.ts` mocks
   `decodeGifFrames: jest.fn()` and only gives it a resolved value inside the
   GIF `describe` block. `explore-image-modal.test.tsx:27` does the same, and
   `explore-image-modal-content.tsx:62` calls `.then` on the result in the
   same way. Give the mock a default resolved value in both files, and check
   each test outside the GIF blocks for the same false pass: it should assert
   that the component rendered before asserting that something is absent.
2. **Reproduce, then fix, the block-widget-in-`<p>` bug (§2).** The report
   did not confirm the cause. Start with a failing unit test for
   `splitBlockWidgetsFromParagraphs` using the parse tree of the
   `image.testdata.ts` content (`"[[☃ image 1]]\n\n====="`), plus a test for
   a widget whose content alignment differs from its default. Fix whichever
   gap the tests expose. If the splitter already handles the image content
   correctly, the warning comes from elsewhere: trace it with a Renderer-level
   test (e.g. the nested caption/title Renderer emitting `<p>` inside
   `<figure>`/`<figcaption>`) and fix it there. Render image captions and
   titles so a `<figcaption>` never contains a `<p>`.
3. **Mechanical test cleanups (§1, §3).** Remove the `.focus()` calls, make
   the radio fixture IDs unique, wrap timer flushes in `act`, and await async
   settles for Plotter, Sortable, Popper/Tooltip, InnerMathInput, and
   PhetSimulation.
4. **Silence intended output locally (§4, §5)** in
   `use-preview-presenter.test.ts` and `update-catalog-hashes.test.ts`.
5. **Fix the smaller one-offs (§6):** `testId` and `keypadElement` forwarded
   onto DOM elements, NaN `y1` attributes, missing keys, and the
   `MockWidgetComponent` ref. Any that turn out to need a non-trivial
   production change go on the allowlist in step 6 instead, with a comment
   explaining why.
6. **Fail on console output.** Add a check in `config/test/test-setup.ts`
   (or `jest-fail-on-console`) that fails the test on `console.error` or
   `console.warn`, with an explicit allowlist for whatever remains from
   steps 1–5. Land this last, once the suite is clean.

## Code analysis

- **Global test setup:** `config/test/test-setup.ts` runs before every suite.
  It turns on fake timers in a global `beforeEach`, installs jsdom shims,
  and logs unhandled rejections via `console.error`. This is where a
  fail-on-console hook belongs.
- **Renderer paragraph output:** `Renderer.outputMarkdown`
  (`packages/perseus/src/renderer.tsx`) wraps each paragraph in a `<p>`.
  `Util.splitBlockWidgetsFromParagraphs` (`packages/perseus/src/util.ts`)
  runs first to lift block widgets out of paragraphs, using
  `isBlockWidgetNode`, which consults only the widget type's default
  alignment. `WidgetContainer` decides inline vs. block from the item's
  actual `alignment`, so the two can disagree. The splitter only looks at
  direct children of top-level paragraphs.
- **Image widget:** renders caption/title through a nested `Renderer`, which
  emits its own `<p>`. Both `image.tsx` and `explore-image-modal-content.tsx`
  call `decodeGifFrames(url).then(...)` for GIFs.
- **Widget generators:** `packages/perseus-core/src/utils/generators` builds
  test fixtures (e.g. `generateRadioChoice`), which the radio-editor test
  helpers should use instead of hand-rolled choices with a shared ID.
- **Script under test:** `utils/internal/update-catalog-hashes.ts` logs its
  progress with `console.log`.

## Examples to follow

- Fixtures built with generators:
  `packages/perseus/src/widgets/expression/expression.testdata.ts`.
- Test structure (AAA, `userEvent.setup()`): the example in `CLAUDE.md`.
  With the global fake timers, set up userEvent as
  `userEvent.setup({advanceTimers: jest.advanceTimersByTime})`; grep for
  this pattern in existing tests.
- Silencing expected errors locally:

  ```ts
  jest.spyOn(console, "error").mockImplementation(() => {});
  ```

- Flushing timers under act:

  ```ts
  afterEach(() => {
      act(() => jest.runOnlyPendingTimers());
  });
  ```

## Behavioral requirements

- After step 6, `pnpm test` passes and prints no `console.error` or
  `console.warn` output except for patterns on an explicit allowlist. Each
  allowlist entry has a comment saying why it can't be fixed yet.
- A new test that triggers an unallowlisted `console.error` or
  `console.warn` fails.
- Tests that silence expected output do so locally (per test), not globally,
  and where practical assert on the message.
- No test touched by step 1 can pass because the component crashed: each one
  asserts that the component rendered before asserting an absence.
- For top-level paragraphs, Renderer output never places a block widget
  inside a `<p>`, and image captions/titles never place a `<p>` inside
  `<figcaption>` or `<figure>`. Widgets nested inside `strong`, tables, or
  columns are out of scope. If they produce warnings, allowlist them.
- Production rendering of inline widgets is unchanged. Snapshot changes from
  the `<p>` fix should be reviewed and limited to removing invalid nesting.
- Each step lands as a separate, reviewable commit, with a changeset for any
  change to published package code. That includes the Renderer/splitter and
  caption fixes (step 2) and any production fixes from step 5.

## Open questions

- Use the `jest-fail-on-console` package, or a hand-written spy in
  `test-setup.ts`? The latter avoids a new dependency.
  - Use a hand-written spy. Here is how it is implemented in Khan
    Academy's frontend codebase — use this approach if possible.
    ```ts
    // We push an error onto the current test's suppressedErrors.
    // This may seem counterintuitive but according to the jest code,
    // the suppressedErrors state contains errors from matchers that can fail
    // tests, and from trying this out, we can see that it does exactly what we
    // want.
    //
    // If we just threw an error, it seems to assign the error to the incorrect
    // test case, whereas this does not.
    //
    // The downside here is that Wallaby passes in spite of this error.
    // TODO: Work out a way to make this work in Wallaby too.
    expect
        .getState()
        .suppressedErrors.push(
            new Error(
                `Unhandled console.${type} call.\n` +
                "If you expect this call, then suppress it using " +
                `jest.spyOn(console, "${type}").mockImplementation(); ` +
                "otherwise, fix the test or code under test to no longer " +
                `result in this console.${type} call.\n\n` +
                formattedMessage,
            ),
        );
    ```
- Should `console.log` also fail tests, or only `error`/`warn`?
  - Yes, all console interactions should fail tests. `debug` too.
- Is it acceptable for `isBlockWidgetNode` to honor content alignment, if
  step 2 shows that's the cause? This changes the layout of existing content
  whose alignment disagrees with the widget default (arguably fixing it).
  - Yes. If the widget would be inline by default but is explicitly configured
    as a block widget, then `isBlockWidgetNode` should treat it as a block
    widget.
