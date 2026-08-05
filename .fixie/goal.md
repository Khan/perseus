# Rewrite the Table widget as a functional component

## Task

> rewrite Table as a functional component, following the patterns in dropdown.tsx.

(from `packages/perseus/src/widgets/table/table.tsx`, line 61)

## Code analysis

- **The widget:** `Table` in `packages/perseus/src/widgets/table/table.tsx`
  - A class component implementing the `Widget` interface (`packages/perseus/src/types.ts`).
    Every method of `Widget` is optional; the renderer feature-detects them on the ref.
  - Renders a `<table>`: a header row of `Renderer`s (or, in the editor, of `props.Editor`s),
    then one `<input>` per cell of `props.userInput`.
  - On mobile (`apiOptions.customKeypad`) it swaps the `<input>` for `SimpleKeypadInput`
    and passes `keypadElement` through. `SimpleKeypadInput` is a class with
    `focus()`/`blur()` (it implements `Focusable`), not a DOM node — hence the
    `ReactDOM.findDOMNode` calls.
  - Stateless with respect to user input: cell edits are cloned, mutated, and pushed
    up via `handleUserInput` + `trackInteraction`. The renderer feeds the new value
    back down through `userInput`.
  - `headerRefs` is written but never read; it can go away.
- **Imperative surface** (called by `Renderer` on the widget ref — see
  `renderer.new.tsx`/`renderer.old.tsx`): `focus`, `focusInputPath`, `blurInputPath`,
  `getInputPaths`, `getDOMNodeForPath`, `getSerializedState`. Table has no
  `getPromptJSON` (there's no `widget-ai-utils/table`), so don't add one.
  - Focus paths for Table are `[row, column]` string pairs. The module-level
    `getInputPath`/`getRefForPath` helpers are already pure and can be reused as-is.
  - If a widget omits `getDOMNodeForPath`, the renderer falls back to the widget
    container's DOM node. Table's per-cell implementation is finer-grained than that,
    so keep it.
- **Editor coupling:** `packages/perseus-editor/src/widgets/table-editor.tsx` renders
  `Table` directly with the extra props `editableHeaders`, `Editor`, and `onChange`
  (typed here as `EditorProps`), and reuses `handleUserInput` to edit the *answers*.
  It types its prop bag as `Partial<PropsFor<typeof Table>>`, so the exported
  component type must stay usable with `PropsFor`.
- **Registration:** the default export is a `WidgetExports` object; `widget: Table`.
  Table is `hidden` and deprecated in favor of markdown tables.
- **Tests:** `table.test.tsx` (render/answer/score/snapshot, answerful vs answerless),
  `serialize-table.test.ts`, `test-util.ts` (`generateTableRenderer`),
  `table.stories.tsx`, plus committed snapshots in `__snapshots__/`.

## Examples to follow

- `packages/perseus/src/widgets/numeric-input/numeric-input.tsx` — the closest
  precedent: a `forwardRef` widget that owns text inputs, branches on
  `apiOptions.customKeypad`, and exposes `focus`/`focusInputPath`/`blurInputPath`/
  `getInputPaths`/`getSerializedState` through `useImperativeHandle`.
- `packages/perseus/src/widgets/dropdown/dropdown.tsx` — the pattern named in the
  TODO: destructure props at the top, plain function handlers, `useImperativeHandle`
  for the `Widget` methods, `usePerseusI18n()` instead of `contextType`.
- `.changeset/numeric-input-functional-component.md` — the shape of the changeset
  to write (`patch`, "Internal: ...", and call out any method that disappears).

Sketch:

```tsx
const Table = forwardRef<Widget, Props>(function Table(props, ref) {
    const {strings} = usePerseusI18n();
    const cellRefs = useRef(new Map<string, HTMLInputElement | Focusable>());

    useImperativeHandle(ref, () => ({
        focus() { ... focus cell (0, 0) ...; return true; },
        focusInputPath(path) { cellRefs.current.get(getRefForPath(path))?.focus(); },
        blurInputPath(path) { ... },
        getInputPaths() { ... },
        getDOMNodeForPath(path) { ... },
        getSerializedState() { ... },
    }));
    ...
});
```

## Behavioral requirements

- No user-visible change: same DOM (`table.perseus-widget-table-of-values.non-markdown`,
  `thead`/`th`, `tbody`/`td`, `<input type="text">`), same `width: 80px` inline style
  for the keypad inputs, same disabled behavior under `apiOptions.readOnly`.
  The committed snapshots should not need regeneration; if they do, that's a signal
  the markup drifted.
- `onFocus`/`onBlur` still fire with the cell's `[row, column]` path, and edits still
  call `handleUserInput` followed by `trackInteraction`.
- The renderer's focus APIs keep working for both desktop `<input>` and mobile
  `SimpleKeypadInput` cells: `focus()` lands on cell (0, 0),
  `focusInputPath`/`blurInputPath` act on the addressed cell, `getInputPaths` returns
  every cell in row-major order, `getDOMNodeForPath` returns a DOM node for a cell.
- `ReactDOM.findDOMNode` should be gone (it's deprecated and disallowed in modern
  React); get DOM nodes from refs instead.
- The editor experience is unchanged: editable headers, and typing in a cell edits
  the answer.
- Keep the widget's user input flowing through props — no local copy of cell values.
- Add a changeset (`patch`, `@khanacademy/perseus`) describing the internal change and
  any imperative method whose behavior or existence changed.
- Tests: keep the existing suite green and add coverage for the imperative handle
  (focus/blur by path, `getInputPaths`), since those paths are the ones the rewrite
  is most likely to break.

## Open questions

- `getDOMNodeForPath` for keypad cells: attaching a ref to the cell's wrapper
  (`<td>` or a span) is the straightforward findDOMNode-free option, but it returns
  the wrapper rather than the input. Is that acceptable to the callers
  (mobile scroll-into-view), or should the keypad case expose its input element?
    - Answer: expose the input element. This task is refactoring only, no behavior changes.

- Should Table also gain a `perseus:widget:rendered:ti` analytics event on mount
  (as dropdown/matrix/numeric-input have) or stay analytics-free given it's a hidden,
  deprecated widget? Adding it would require wrapping in `withDependencies`, which
  changes the type the editor sees.
    - Answer: No analytics.

- The `EditorProps` (`Editor`, `editableHeaders`, `onChange`) are editor-only and
  not part of the widget options. Leave them on `Props` as they are, or is untangling
  them in scope?
    - Answer: Leave them on props; they are not widget options.

## Checklist

Steps 1–4 characterize the current class behavior, so the rewrite in step 5 has a
safety net. They should pass before and after the conversion.

- [x] Test: `focus()` on the widget ref focuses the cell at path `["0", "0"]`.
- [x] Test: `focusInputPath(["1", "0"])` focuses that cell, and `blurInputPath`
      on the same path blurs it.
- [x] Test: `getInputPaths()` returns every cell path in row-major order for a
      2×3 table.
- [x] Test: `getDOMNodeForPath(["0", "1"])` returns the `<input>` element for
      that cell — both with and without `apiOptions.customKeypad`.
      (Note: with `customKeypad` the cell is a `SimpleKeypadInput`, which renders
      no `<input>`; the test asserts the element with `role="textbox"` instead.)
- [x] Rewrite `Table` as a `forwardRef` function component: destructure props,
      plain handlers, `usePerseusI18n()` for `strings`, a `useRef` map of cell
      refs keyed by `getRefForPath`, and `useImperativeHandle` exposing `focus`,
      `focusInputPath`, `blurInputPath`, `getInputPaths`, `getDOMNodeForPath`,
      and `getSerializedState`. Drop the unused `headerRefs`.
- [x] Add a changeset (`patch`, `@khanacademy/perseus`) noting the internal
      conversion and that `getDOMNodeForPath` no longer uses `findDOMNode`.

Do the following in a separate commit from the above changes:

- [ ] Get DOM nodes from refs instead of `ReactDOM.findDOMNode`: have
  `SimpleKeypadInput` cells expose their `<input>` element to the ref map so
  `getDOMNodeForPath` returns the input in both keypad and non-keypad cases.
