# Rewrite NumericInput as a functional component

## Task

> Rewrite NumericInput as a functional component. Follow the pattern established
> by dropdown.tsx and number-line.tsx.

(from `packages/perseus/src/widgets/numeric-input/numeric-input.class.tsx`, line 51)

## Code analysis

The numeric-input widget is currently split across two files, a leftover from a
partial migration:

- **`numeric-input.class.tsx`** — the registered widget. A class component,
  `NumericInput`, that implements the `Widget` interface (`focus`, `blur`,
  `focusInputPath`, `blurInputPath`, `getInputPaths`, `getPromptJSON`,
  `getSerializedState`) by delegating focus/blur to a `Focusable` ref. Its
  `render()` does nothing but forward props to `NumericInputComponent`, adding a
  derived `answerForms` prop computed by `normalizeCorrectAnswerForms(answers)`.
  The file also exports the widget's `WidgetExports` default object plus the pure
  helpers `findPrecision`, `findCommonFractions`, `getCorrectUserInput`,
  `getStartUserInput`, `getUserInputFromSerializedState`, and
  `getOneCorrectAnswerFromRubric`.
- **`numeric-input.tsx`** — `NumericInputComponent`, a `forwardRef` functional
  component that renders the actual UI: `SimpleKeypadInput` when
  `apiOptions.customKeypad` is set (mobile), otherwise `InputWithExamples`
  (desktop). It owns the `isFocused` UI state, fires the
  `perseus:widget:rendered:ti` analytics event on mount via `useDependencies()`,
  and exposes `focus`/`blur` through `useImperativeHandle`.
- **`NumericInputProps`** lives in the class file and is shared by both
  components, with a standing TODO noting that only the inner component actually
  receives `answerForms`. `PropsFor` is asserted against
  `WidgetProps<PerseusNumericInputWidgetOptions, PerseusNumericInputUserInput>`
  to keep props in sync with the data schema.

Consumers of these modules:

- `index.ts` re-exports the default from `numeric-input.class`.
- `input-number/input-number.tsx` reuses `numericInput.widget` and several of its
  exported functions — the deprecated `input-number` widget is now rendered by
  numeric-input.
- `widget-ai-utils/numeric-input/prompt-utils.ts` types its argument as
  `React.ComponentProps<typeof numericInput.widget>`.
- `__docs__/numeric-input.stories.tsx` imports `{NumericInput}` only to give
  Storybook a `Meta<typeof NumericInput>` for argTypes; the stories themselves
  render through `ServerItemRendererWithDebugUI`.
- `numeric-input.test.ts` imports the default export plus `findCommonFractions`
  and `findPrecision`.

How renderers use the widget instance (relevant to what the ref must expose):

- `renderer.new.tsx`/`renderer.old.tsx` hold widget refs and call the optional
  `Widget` methods: `focus`, `getInputPaths`, `focusInputPath`, `blurInputPath`,
  `getSerializedState`, `getPromptJSON`. `blurPath()` reaches widgets through
  `blurInputPath`, never through a bare `blur()`; the class's public `blur()`
  appears to have no callers.

Reference for the target shape:

- **`dropdown.tsx`** and **`number-line.tsx`** are single-file functional
  widgets: a `forwardRef<WidgetHandle, Props>` component where `WidgetHandle` is
  a `Pick<Widget, ...>` of just the methods that widget implements, wired up with
  one `useImperativeHandle`. Both fire their mount analytics event inside the
  component (`useOnMountEffect`, or `withDependencies` + `useEffect` for
  dropdown) and export the `WidgetExports` object from the same file.

## Examples to follow

- `packages/perseus/src/widgets/number-line/number-line.tsx` — closest analogue:
  imperative methods collected in a single `useImperativeHandle` right after the
  hooks, `WidgetHandle` as a narrow `Pick<Widget, ...>`, helpers as module-level
  functions, `WidgetExports` at the bottom.
- `packages/perseus/src/widgets/dropdown/dropdown.tsx` — the minimal version of
  the same pattern.
- `packages/perseus/src/widgets/expression/expression.tsx` — an already-migrated
  widget that manages a focusable input ref and exposes `focus`/`blur` through
  `useImperativeHandle`, like numeric-input needs to.

Target skeleton:

```tsx
type Props = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
>;

type WidgetHandle = Pick<
    Widget,
    | "focus"
    | "focusInputPath"
    | "blurInputPath"
    | "getInputPaths"
    | "getPromptJSON"
    | "getSerializedState"
>;

const NumericInput = forwardRef<WidgetHandle, Props>(
    function NumericInput(props, ref) {
        const inputRef = useRef<Focusable>(null);
        // ...analytics on mount, isFocused state, handlers...
        useImperativeHandle(ref, () => ({ /* ... */ }));
        return /* SimpleKeypadInput or InputWithExamples */;
    },
);

export default {
    name: "numeric-input",
    displayName: "Numeric input",
    widget: NumericInput,
    isLintable: true,
    // ...getCorrectUserInput, getStartUserInput, etc.
} satisfies WidgetExports<typeof NumericInput>;
```

Migration bookkeeping, from commit `1d19cca263` ("Rewrite number-line widget as
a functional component"):

```md
---
"@khanacademy/perseus": patch
---

Internal: the Numeric Input widget is now a functional component.
```

## Behavioral requirements

- The two components collapse into one file. `numeric-input.class.tsx` goes
  away; the widget lives in `numeric-input.tsx`, and every importer
  (`index.ts`, `input-number.tsx`, `prompt-utils.ts`, the stories, the tests) is
  updated. No module should be left re-exporting from a deleted path.
- Observable behavior is unchanged: same rendered DOM (mobile keypad vs. desktop
  `InputWithExamples`), same focus ring driven by the internal `isFocused`
  state, same `handleUserInput`/`trackInteraction`/`onFocus`/`onBlur` calls, and
  the same single `perseus:widget:rendered:ti` analytics event fired once per
  mount (not on every prop change).
- The ref exposes exactly the `Widget` methods the renderers use. `focus()`
  keeps returning `true`; `getInputPaths()` keeps returning `[[]]`.
- `getSerializedState()` keeps its current output shape verbatim — see
  `serialize-numeric-input.test.ts`, which pins `answerForms: []`, a defaulted
  `labelText`, the omission of `answers`, and the injected `currentValue`.
- `answerForms` is derived inside the component from `props.answers` rather than
  being a prop, so the props type is plain
  `WidgetProps<PerseusNumericInputWidgetOptions, PerseusNumericInputUserInput>`
  and the `NumericInputProps`/`PropsFor` TODO is resolved rather than carried
  forward.
- The deprecated `input-number` widget continues to render and score exactly as
  before, since it shares this component.
- `getPromptJSON` keeps producing the same `NumericInputPromptJSON`; its
  `prompt-utils.ts` argument type must still resolve to the widget's props.
- Add a changeset (`patch` on `@khanacademy/perseus`) describing the change as
  internal.

## Open questions

- The class's public `blur()` has no apparent callers (renderers go through
  `blurInputPath`). Drop it from the handle, or keep it for safety? Dropping it
  is the tidier choice and matches number-line, which exposes only what the
  renderers call.
    - Answer: remove `blur()`. Only methods on the `Widget` interface need to
      be implemented, and `blur()` is not part of that interface.

- The Storybook `Meta<typeof NumericInput>` currently points at the class purely
  to derive argTypes. Does pointing it at the `forwardRef` component still give
  Storybook usable prop inference, or should the stories be typed off the widget
  options instead?
    - Answer: Storybook should work just fine with a functional component.
      Don't make changes to the stories unless there are errors you need to
      fix.

- Should `findPrecision`/`findCommonFractions` (exported only for tests) move to
  `utils.ts`, where the widget's other pure helpers already live?
    - Answer: no, this is out of scope.
