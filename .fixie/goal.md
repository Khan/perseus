# Rewrite the Matcher widget as a functional component

## Task

> TODO-NEXT: Rewrite Matcher as a functional component. Follow the examples
> set by dropdown.tsx and number-line.tsx.

(from `packages/perseus/src/widgets/matcher/matcher.tsx`, line 43)

## Code analysis

- **`packages/perseus/src/widgets/matcher/matcher.tsx`** exports a class
  `Matcher extends React.Component implements Widget`, wrapped by
  `withDependencies()` and exported in the `WidgetExports` object at the bottom
  of the file. It is registered in `extra-widgets.ts`.
- The widget renders a two-column `<table>`. Each column is a `<Sortable>`
  (`src/components/sortable.tsx`, still a class component) fed from
  `props.userInput.left` / `.right`.
- Local (non-user-input) state, all three pieces of which must survive the
  conversion as hook state:
  - `leftHeight` / `rightHeight`: measured by `Sortable`'s `onMeasure`
    callback; the max of the two is passed back down to both Sortables as a
    height constraint so the columns line up.
  - `texRendererLoaded`: until the math renderer has loaded, the widget renders
    a `CircularSpinner` plus a hidden dummy `<TeX>` (from `getDependencies()`)
    whose `onRender` callback flips the flag. This avoids layout shift, and is
    load-bearing for behavior: before it flips, user input reads as empty.
- **User input flows imperatively.** `Sortable` owns the order of its options;
  on change, Matcher reads both Sortables back via string refs
  (`this.refs.left.getOptions()`), and reports the result through
  `props.handleUserInput()` + `props.trackInteraction()`. The string refs (and
  their `@ts-expect-error` suppressions) should become typed `useRef<Sortable>`
  refs.
- **Imperative API consumed from outside the component:**
  - `getPromptJSON()` — part of the `Widget` interface, delegates to
    `widget-ai-utils/matcher/matcher-ai-utils`.
  - `moveLeftOptionToIndex()` / `moveRightOptionToIndex()` — test-only hooks
    that forward to `Sortable.moveOptionToIndex()`. Used by `matcher.test.tsx`
    and `serialize-matcher.test.tsx` via `renderer.findWidgets(...)`.
  - Matcher deliberately has **no** `getSerializedState`; the renderer falls
    back to the widget's options in that case (`renderer.new.tsx`), which
    `serialize-matcher.test.tsx` pins.
- Analytics: a `perseus:widget:rendered:ti` event fires once on mount via
  `props.dependencies.analytics`.
- `getStartUserInput` (shuffles via `shuffleMatcher`) and
  `getUserInputFromSerializedState` are module-level pure functions already and
  need no change.

## Examples to follow

- `packages/perseus/src/widgets/dropdown/dropdown.tsx` — canonical shape:

```tsx
const Matcher = forwardRef<Widget, Props>(function Matcher(props, ref) {
    const {strings} = usePerseusI18n();      // replaces contextType/this.context
    useImperativeHandle(ref, () => ({ getPromptJSON: () => _getPromptJSON(props), ... }));
    ...
});

const WrappedMatcher = withDependencies(Matcher);

export default {
    name: "matcher",
    widget: WrappedMatcher,
    ...
} satisfies WidgetExports<typeof WrappedMatcher>;
```

- `packages/perseus/src/widgets/number-line/number-line.tsx` — shows
  `useOnMountEffect()` (from `@khanacademy/wonder-blocks-core`) for the
  once-on-mount analytics event, typed `useRef` handles onto class-component
  children, and exposing an extra non-`Widget` method (`movePosition`) through
  `useImperativeHandle`.
- `packages/perseus/src/components/i18n-context.ts` — `usePerseusI18n()`.
- Test callsites to update: `matcher.test.tsx` and `serialize-matcher.test.tsx`
  currently annotate the widget instance with `import type {Matcher}`. Since
  the class goes away, either export a handle type from `matcher.tsx` and use
  it, or follow `number-line.test.ts`, which just destructures the result of
  `findWidgets` with no annotation.

## Behavioral requirements

- No observable behavior change. Existing snapshots in
  `packages/perseus/src/widgets/matcher/__snapshots__/` must still match; if
  the DOM changes at all, that is a bug in the conversion, not a snapshot to
  update.
- The spinner/hidden-`<TeX>` loading dance stays, including the property that
  user input reads as `{left: [], right: []}` until the math renderer signals
  it has rendered (pinned by "is scored incorrect if the math renderer hasn't
  loaded yet").
- Column heights stay synchronized: both Sortables receive a height constraint
  equal to the max measured height of the two.
- `moveLeftOptionToIndex` / `moveRightOptionToIndex` remain reachable through
  `renderer.findWidgets()`, and `getPromptJSON` keeps working
  (`matcher-ai-utils.test.tsx`).
- `getSerializedState` must remain absent from the widget's imperative handle
  so the renderer keeps falling back to widget options.
- The analytics `rendered:ti` event fires exactly once per mount, not on every
  re-render.
- No new `@ts-expect-error` or eslint suppressions; the conversion should
  remove the `react/no-string-refs` ones.
- Cell margin still depends on `apiOptions.isMobile` (8px mobile, 5px desktop).
- Add a changeset (`pnpm changeset`, patch to `@khanacademy/perseus`).

## Open questions

- Should the test-only `moveLeftOptionToIndex` / `moveRightOptionToIndex`
  methods survive at all, or should the tests be rewritten to drive the
  Sortables through the DOM (drag/keyboard) instead? Keeping them is the
  smaller, lower-risk change and is what this plan assumes.
      - Answer: keep them

- `serialize-matcher.test.tsx` documents that those moves "don't seem to do
  anything" for serialization. That's expected given the missing
  `getSerializedState`; leave it as-is.
    - Answer: confirmed.

## Checklist

- [x] Add a `MatcherHandle` type to `matcher.tsx` (the `Widget` interface plus
      `moveLeftOptionToIndex` / `moveRightOptionToIndex`), and use it to annotate
      the widget instances in `matcher.test.tsx` and `serialize-matcher.test.tsx`
      in place of `import type {Matcher}`. Tests still pass against the class.
- [x] Replace the string refs in the `Matcher` class with typed
      `React.createRef<Sortable>()` fields, dropping the `react/no-string-refs`
      and `@ts-expect-error` suppressions.
- [ ] Rewrite `Matcher` as a `forwardRef<MatcherHandle, Props>` functional
      component: `useState` for `leftHeight`/`rightHeight`/`texRendererLoaded`,
      `useRef<Sortable>` for the two columns, `usePerseusI18n()` for strings,
      `useOnMountEffect()` for the `rendered:ti` analytics event, and
      `useImperativeHandle` exposing `getPromptJSON`,
      `moveLeftOptionToIndex`, and `moveRightOptionToIndex` — and nothing else.
- [ ] Verify the existing matcher snapshots still match unmodified; if the DOM
      shifted, fix the component rather than the snapshot.
- [ ] Test: both Sortables receive a height constraint equal to the max of the
      two measured heights, including the initial zero-height case.
- [ ] Test: cell margin is 8px when `apiOptions.isMobile`, 5px otherwise.
      (confirm margin is already present in snapshots).
- [ ] Add a patch changeset for `@khanacademy/perseus` describing the
      class-to-function conversion.
