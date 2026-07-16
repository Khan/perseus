# Add TypedSingleSelect and use it for all SingleSelect usages in perseus-editor

## Task

> # Typesafe SingleSelect component
>
> I want a typesafe version of the SingleSelect React component. It should render
> a dropdown for picking a value from a union of string literal types. The
> onChange callback should not need to typecheck its argument at runtime or cast
> it - the argument should be guaranteed to be a member of the union.
>
> There is an example implementation in commit fdde527.
>
> Update all SingleSelect usages in the perseus-editor package to use
> TypedSingleSelect.

## Code analysis

### The problem being solved

Wonder Blocks' `SingleSelect` (`@khanacademy/wonder-blocks-dropdown`) types its
`onChange` as `(selectedValue: string) => void` and its `selectedValue` as
`string`. Its options are declared as `<OptionItem value="..." label="..."/>`
children. Because the value type is just `string`, every call site that wants a
narrower union has to bridge the gap with a cast or a runtime parse. The repo's
`no-restricted-syntax` ESLint rule (`.eslintrc.js:310`) **bans `as` casts**, so
these sites carry `// eslint-disable-next-line no-restricted-syntax` suppressions
(many tagged `TODO(LEMS-2656): remove TS suppression`). The example commit lives
on a branch literally named `benc/fix-ts-suppressions`; removing those
suppressions is the point of this work.

`TypedSingleSelect` infers a union `ValueT` from the **keys of an `options`
object** and constrains `selectedValue` and `onChange` to that union, so no cast
or runtime check is needed at the call site.

### The example implementation (commit fdde527)

`packages/perseus-editor/src/components/typed-single-select.tsx` (53 lines):

```tsx
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// keys are option `value`s; values are the visible label. A falsey label
// hides that option from the dropdown.
type SelectOptions<ValueT extends string> = Record<
    ValueT,
    string | null | undefined | false
>;

interface OwnProps<ValueT extends string> {
    options: SelectOptions<ValueT>;
    selectedValue?: NoInfer<ValueT> | null | undefined;
    onChange: (selectedValue: NoInfer<ValueT>) => void;
}

export type Props<ValueT extends string> = OwnProps<ValueT> &
    Omit<PropsFor<typeof SingleSelect>, keyof OwnProps<string>>;

export function TypedSingleSelect<ValueT extends string>(props: Props<ValueT>) {
    return (
        <SingleSelect
            {...props}
            // eslint-disable-next-line no-restricted-syntax
            onChange={props.onChange as (selectedValue: string) => void}
        >
            {Object.entries(props.options).map(([key, value]) =>
                value ? (
                    <OptionItem key={key} value={key} label={String(value)} />
                ) : null,
            )}
        </SingleSelect>
    );
}
```

Key design points:
- `ValueT` is inferred from `options`' keys. `NoInfer` on `selectedValue`/
  `onChange` prevents those props from widening the inferred union.
- The single unavoidable cast is **internal** to the wrapper (WB's `onChange`
  wants `string`); call sites become cast-free.
- `Props` spreads through the rest of WB `SingleSelect`'s props
  (`placeholder`, `disabled`, `style`, `className`, `aria-labelledby`, etc.),
  which the call sites rely on.
- `NoInfer` is a native TS utility type; the repo is on TS 5.9.3 and already
  uses `NoInfer` (e.g. `perseus-core/.../general-purpose-parsers/defaulted.ts`).

Note: the example commit was based on an **older** `graph-type-selector.tsx`
than what is on `main` today (different option labels, ordering, and a
`showVector`/`isFeatureOn` gate that no longer exists). Treat the commit as a
pattern reference, **not** as content to copy verbatim — preserve each call
site's *current* options, labels, and ordering.

### The call sites (17 grep hits; 16 real, 1 false positive)

False positive — do NOT change:
- `components/__docs__/segmented-control.stories.tsx` — matches only because a
  Story export is *named* `SingleSelect`; it does not import WB `SingleSelect`.

Real usages, grouped by shape:

**A. Static string-literal unions where a cast can be fully removed:**
- `components/graph-type-selector.tsx` — 16 graph types. Currently
  `graphType: string` / `onChange: (newGraphType: string) => void`. See
  "graph-type-selector chain" below.
- `locked-figures/line-weight-select.tsx` — `StrokeWeight`
  (`"thin"|"medium"|"thick"`); removes `value as StrokeWeight`.
- `locked-figures/line-stroke-select.tsx` — `"solid"|"dashed"`; removes
  `onChange as any`.
- `locked-figures/locked-label-settings.tsx` — size `"small"|"medium"|"large"`;
  removes an `... as any` handler cast.
- `locked-figures/locked-line-settings.tsx` — kind `"line"|"ray"|"segment"`;
  removes an `... as any` handler cast.
- `widgets/numeric-input-editor.tsx` — textAlign `"left"|"center"|"right"`
  (matches `data-schema.ts:1665`). One `SingleSelect`; the other selects in this
  file are already `SegmentedControl` and are out of scope.

**B. Static/dynamic unions from a shared constant (removable via explicit type arg):**
- `locked-figures/color-select.tsx` — `LockedFigureColor` from
  `lockedFigureColorNames`; removes `onChange as any`. Options carry a
  `leftAccessory` (`<ColorSwatch/>`) — see open question on `OptionItem` extras.
- `locked-figures/locked-ellipse-settings.tsx` — `LockedFigureFillType` from
  `Object.keys(lockedFigureFillStyles)`; removes `... as any`.
- `locked-figures/locked-polygon-settings.tsx` — fillStyle, same as ellipse;
  removes `... as any`.

**C. `match`-value selects with a pre-existing semantic hack (see open questions):**
- `widgets/interactive-graph-editor/components/angle-answer-options.tsx` —
  `"exact"|"congruent"`.
- `widgets/interactive-graph-editor/components/vector-answer-options.tsx` —
  `"exact"|"congruent"`.
- `widgets/interactive-graph-editor/components/polygon-answer-options.tsx` — has
  three selects: numSides (numeric strings + `"unlimited"`), snapTo
  (`"grid"|"angles"|"sides"`, some options conditional), and match
  (`"exact"|"congruent"|"approx"|"similar"`).

**D. Numeric-string counts (parsed back to a number; no existing cast to remove):**
- `widgets/interactive-graph-editor/components/segment-count-selector.tsx` —
  `"1".."6"`, built with `_.range`, converted via `+newValue`.
- `widgets/interactive-graph-editor/components/graph-points-count-selector.tsx` —
  `"0".."6"` + `UNLIMITED`, converted via `parsePointCount`.
  For these, `ValueT` is effectively `string`; converting is consistency-only
  (no type-safety win, but no regression either).

**E. Dynamic options + a separate, unrelated cast that stays:**
- `components/alignment-select.tsx` — options mapped from
  `supportedAlignments: ReadonlyArray<Alignment>`. Its `onChange` builds a
  synthetic `React.ChangeEvent<HTMLSelectElement>` (with its own `as` cast) to
  satisfy the parent's event-shaped `onChange`. TypedSingleSelect narrows the
  *value*, but that synthetic-event cast is a distinct concern and will remain.
- `locked-figures/locked-function-settings.tsx` — two selects: directionalAxis
  (`"x"|"y"`, no current cast) and exampleCategory (dynamic categories,
  `onChange={setExampleCategory}`, no current cast).

### The graph-type-selector chain (end-to-end type-safety win)

`GraphTypeSelector` is consumed only by
`widgets/interactive-graph-editor/interactive-graph-editor.tsx` (~line 474),
which passes an `onChange` cast `as any` (TODO(LEMS-2656)) whose real signature
is `(type: Required<InteractiveGraphProps>["userInput"]["type"]) => void`.
Fully typing this requires narrowing `GraphTypeSelectorProps.graphType` and
`onChange` from `string` to the graph-type union; only then can the parent's
`as any` be removed. `selectedValue` is fed `this.props.graph?.type ?? default`,
which is already that union — so this narrowing is sound.

Note the direct-pass subtlety: because `selectedValue?: NoInfer<ValueT>`, a
call site whose local value is typed `string` (wider than the inferred union)
will NOT typecheck. The component's own prop types must be narrowed to the
union (as above) for the wrapper to accept them.

## Examples to follow

- **The wrapper pattern**: commit `fdde527` (reproduced above). Place the new
  file at `packages/perseus-editor/src/components/typed-single-select.tsx`.
- **Local typed-wrapper precedent**:
  `packages/perseus-editor/src/components/segmented-control.tsx` — a hand-rolled,
  fully-typed single-select-style wrapper in the same directory, with a
  `{value, label}[]` options model. Its test
  (`components/segmented-control.test.tsx`) is the model for the new component's
  test: `@testing-library/react` + `@testing-library/user-event`, AAA structure,
  outcome-focused `it` titles.
- **The reference conversion**: the `graph-type-selector.tsx` half of commit
  `fdde527` shows children-→-`options`-object mechanics (with the caveat above
  that today's labels/order differ).
- **Existing editor-component tests** to keep green and to mirror when covering
  the converted files: `locked-figures/locked-line-settings.test.tsx`,
  `locked-ellipse-settings.test.tsx`, `locked-label-settings.test.tsx`,
  `locked-function-settings.test.tsx`, `locked-polygon-settings.test.tsx`.

## Behavioral requirements

- **New component** `TypedSingleSelect` renders a WB `SingleSelect`; `options`
  is a `Record<ValueT, string | null | undefined | false>` where keys are option
  values and truthy values are labels. `selectedValue` and `onChange` are typed
  to the union `ValueT` inferred from the `options` keys (or supplied explicitly
  as `TypedSingleSelect<SomeUnion>`).
- **`onChange` receives a value guaranteed to be a member of `ValueT`** — no
  runtime `parse`/`isFailure` check and no cast at the call site. Any residual
  cast lives *inside* the wrapper only.
- **Falsey label hides the option** (preserves the `showVector && "Vector"`
  idiom) so options can be conditionally shown without leaving the object model.
- **Pass-through props**: callers can still set `placeholder`, `disabled`,
  `style`, `className`, `aria-label`/`aria-labelledby`, `key`, etc.; these
  forward to the underlying `SingleSelect`.
- **No user-visible behavior change** at any converted call site: same option
  set, same labels, same ordering, same selected value, same emitted result
  (including numeric parsing in the count selectors and the synthetic-event
  shape in `alignment-select`). Conditional options (e.g. polygon snapTo hiding
  `angles`/`sides` for unlimited sides) keep their conditions.
- **Cast/suppression removal is the success signal**: every
  `no-restricted-syntax` suppression and `TODO(LEMS-2656)` that existed *only* to
  paper over `SingleSelect`'s `string` value type should be gone — including the
  `as any` in `interactive-graph-editor.tsx` for `GraphTypeSelector.onChange`.
  Casts that exist for an *independent* reason (alignment-select's synthetic
  event; the `match`/`"exact"` hack — see open questions) may remain but must be
  called out.
- **All 16 real usages converted**; the story file is left untouched.
- **Type-checks, lint, and tests pass**: `pnpm tsc`, `pnpm fixc`, and the
  affected package tests (`pnpm tesc`) are green. The new component has unit
  tests (renders options, reflects `selectedValue`, calls `onChange` with the
  chosen value, hides falsey-label options).
- **Accessibility unchanged**: existing label associations
  (`aria-labelledby`/`aria-label`, `<BodyText tag="label">` wrappers) are
  preserved; no `div[role=...]` substitutes introduced.

## Open questions

- **The `"exact"` match hack (angle/vector/polygon).** Today the option value
  `"exact"` is not a valid `match` value (`undefined` means exact matching); the
  code casts `newValue as ...["match"]` with a TODO explaining the fall-through.
  With `TypedSingleSelect`, `onChange` yields `"exact" | "congruent" | ...`,
  which still isn't assignable to the `match` field. Options: (a) keep a
  documented cast at these sites (narrowest change, preserves the known hack),
  or (b) map `"exact" → undefined` before writing `match` (removes the cast and
  the hack, but is a behavioral/semantics change worth confirming). Recommend
  (a) unless we explicitly want to also close LEMS-2656's `match` hack here.
    - Answer: use a switch statement to convert the selected value to a valid
      `match` value. Use `UnreachableCaseError` to prove the switch is
      exhaustive. Do not cast.

- **Dynamic options and the `Object.fromEntries` widening.** Building `options`
  from an array/`Object.keys` yields a `Record<string, ...>`, so `ValueT`
  infers to `string` and no narrowing is gained. To keep type safety for
  color-select, the fill selects, and alignment-select, supply the type
  argument explicitly (`TypedSingleSelect<LockedFigureColor>` etc.) so
  `options` must cover the union. Confirm this explicit-type-arg approach is
  acceptable versus writing each `options` object as a literal.
    - Answer: Rewrite the `Object.keys` cases to use a separate, explicit
      options object.

- **`OptionItem` extras (`leftAccessory`).** `color-select.tsx` renders a
  `<ColorSwatch/>` via `OptionItem`'s `leftAccessory`. The current wrapper's
  `options` model only carries a label string. Either extend the wrapper's
  option value to allow richer content, or leave `color-select` on raw
  `SingleSelect`. Which do we want? (If extending, keep the label-string form
  working for the other 15 sites.)
    - Answer: Extend the option value to have a type like `string | {label: string, leftAccessory: ReactNode}`.

- **Should `TypedSingleSelect` get a Storybook story?** The repo convention adds
  stories for components in `components/`; the task doesn't ask for one.
    - Answer: No story.

- **Changeset.** perseus-editor is published; a `pnpm changeset` (patch) is
  normally required. Confirm whether this internal-only refactor needs one.
    - Answer: Generate a patch-release changeset.
