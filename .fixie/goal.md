# Nest widget options under a single `options` prop in WidgetProps

## Task

> **WidgetProps redesign**
>
> The `WidgetProps` type which is shared by all Perseus widget components looks
> like this:
>
> ```ts
> export type WidgetProps<
>     TWidgetOptions,
>     TUserInput = Empty,
>     // Defines the arguments that can be passed to the `trackInteraction`
>     // function from APIOptions for this widget.
>     TrackingExtraArgs = Empty,
> > = TWidgetOptions & UniversalWidgetProps<TUserInput, TrackingExtraArgs>;
>
> type UniversalWidgetProps<TUserInput = Empty, TrackingExtraArgs = Empty> = {
>   userInput: TUserInput;
>   trackInteraction: (extraData?: TrackingExtraArgs) => void;
>   // ...
> }
> ```
>
> We want to change this to:
>
> ```ts
> export type WidgetProps<
>     TWidgetOptions,
>     TUserInput = Empty,
>     // Defines the arguments that can be passed to the `trackInteraction`
>     // function from APIOptions for this widget.
>     TrackingExtraArgs = Empty,
> > = {
>   options: TWidgetOptions;
>   userInput: TUserInput;
>   trackInteraction: (extraData?: TrackingExtraArgs) => void;
>   // ... remaining props from UniversalWidgetProps
> }
> ```
>
> That is, we want to stop spreading the widget options into the props, and have
> a single `options` prop. We can then get rid of `UniversalWidgetProps` and
> inline all its properties into WidgetProps.
>
> The goal is better type safety and easier-to-read code.
>
> Since there are over 30 widgets that need to be updated, please work **one
> widget at a time** to reduce risk. In order to do that, you will need to modify
> the `getWidgetProps` method of `class Renderer` to return the appropriate props
> format for each widget during the migration.

## Code analysis

**The type (`packages/perseus/src/types.ts:460-500`).**
- `WidgetProps<TWidgetOptions, TUserInput, TrackingExtraArgs>` is currently
  `TWidgetOptions & UniversalWidgetProps<TUserInput, TrackingExtraArgs>` — the
  widget's options are *intersected* (spread) into the same object as the
  universal props.
- `UniversalWidgetProps` holds the props every widget gets regardless of type:
  `userInput`, `handleUserInput`, `trackInteraction`, `widgetId`,
  `widgetIndex`, `alignment`, `static`, `graded`, `problemNum`, `apiOptions`,
  `keypadElement`, `onFocus`, `onBlur`, `findWidgets`, `reviewMode`,
  `showSolutions`, `linterContext`, `containerSizeClass`.
- Because it's an intersection, an option field whose name collides with a
  universal prop is silently shadowed (the universal prop wins, since it's
  listed after the spread in `getWidgetProps`). The new design removes this
  footgun by isolating options under `options`.

**Where props are built — `getWidgetProps`.**
- Two live copies exist, gated by the `perseus-renderer-upgrade` feature flag:
  `packages/perseus/src/renderer.old.tsx:521` and
  `packages/perseus/src/renderer.new.tsx:529`. `renderer.tsx` picks between
  them. **Both must be changed identically.**
- Today each returns `{...widgetProps, userInput, widgetId, widgetIndex, ...}`
  where `widgetProps = this.props.widgets[widgetId].options`. The spread is the
  thing we're removing.

**How props flow to the component.**
- `Renderer.render()` → `<WidgetContainer widgetProps={this.getWidgetProps(id)} />`.
- `WidgetContainer` (`packages/perseus/src/widget-container.tsx:177`) does
  `<WidgetType {...this.props.widgetProps} />`. It also reads a few fields off
  `widgetProps` directly: `alignment`, `apiOptions`, `static` (all universal —
  unaffected) and passes the whole object to
  `getWidgetSubType(type, this.props.widgetProps)`
  (`widget-container.tsx:101`). `getWidgetSubType`
  (`packages/perseus/src/widget-type-utils.ts:33`) reads *option* fields
  (`graph.type` for interactive-graph, `multipleSelect` for radio), so this
  call site depends on the spread and must eventually read from `.options`.

**How each widget consumes options (the per-widget work).**
- Functional widgets destructure options straight off props, e.g. dropdown
  (`widgets/dropdown/dropdown.tsx:47`): `const {choices, placeholder,
  visibleLabel, ariaLabel, ...} = props`. Radio
  (`widgets/radio/radio-widget.tsx:78`) reads `props.choices`,
  `props.randomize`, `props.numCorrect`, etc.
- Class-ish widgets layer required overrides on top of `WidgetProps` via an
  `ExternalProps` alias, e.g. numeric-input
  (`widgets/numeric-input/numeric-input.class.tsx:22-39`):
  `type ExternalProps = WidgetProps<Options, UserInput>;` then
  `NumericInputProps = ExternalProps & { size: NonNullable<ExternalProps["size"]>, ... }`.
  Every `ExternalProps["<optionField>"]` lookup becomes
  `ExternalProps["options"]["<optionField>"]`. Expression
  (`widgets/expression/expression.tsx:58-67`) and others follow the same shape.
- Several widgets assert that parsed JSON options are assignable as props via
  `0 as any as WidgetProps<Options, UserInput> satisfies PropsFor<typeof W>`
  (numeric-input.class.tsx:59, grapher, orderer, interactive-graph, matrix,
  label-image, graded-group). These assertions currently work because options
  ARE the props; after the change they must construct the nested shape
  (`{options, userInput} satisfies PropsFor<...>`).
- `getSerializedState()` (deprecated, present in most widgets) spreads props:
  `const {userInput, ...rest} = props; return {...rest, ...}` (see
  radio-widget.tsx:137, mock-widget.tsx:79, dropdown.tsx:128). `...rest`
  currently includes the options; after the change it won't, so these need
  `...props.options` (or equivalent) to preserve output.
- AI utils: each widget's `getPromptJSON` reads option fields off the props
  object, e.g. `widget-ai-utils/dropdown/dropdown-ai-utils.ts:34`
  (`widgetData.choices`). Called as `_getPromptJSON(props)` /
  `_getPromptJSON({...props, choices}, props.userInput)`. These read from the
  props shape and must be updated per widget (read `widgetData.options.*`).

**Editors render widget previews too (secondary consumers).**
- Some editors build a partial `PropsFor<typeof Widget>` by spreading option
  fields flat and render the widget directly: categorizer-editor.tsx:50,
  grapher-editor.tsx:72, plotter-editor.tsx:515, table-editor.tsx:93,
  matrix-editor.tsx:74, expression-editor.tsx:295/488,
  interactive-graph-editor. When a widget is migrated, its editor preview must
  switch from flat option fields to `options: {...}`.

**Registration / scope.**
- 37 directories under `packages/perseus/src/widgets/`. Registered sets:
  `basic-widgets.ts` (Radio, InputNumber, NumericInput, Expression) and
  `extra-widgets.ts` (~29 more). Plus `mock-widget` (test-only) and
  `deprecated-standin`. ~68 files reference `WidgetProps<`.
- Most widget tests render through `renderQuestion`
  (`widgets/__testutils__/renderQuestion.tsx`), which goes through the real
  `Renderer` → `getWidgetProps`, so they need **no** changes as long as
  `getWidgetProps` emits the right shape for that widget. Only tests that
  construct a `WidgetProps` object by hand and render the component in isolation
  need updating (e.g. `widgets/radio/__tests__/radio-widget.test.tsx:54`'s
  `getBaseProps`).

**⚠️ Name-collision gotcha.** `PerseusOrdererWidgetOptions`
(`perseus-core/src/data-schema.ts:1758`) has a field literally named
`options` (`options: PerseusRenderer[]`), read as `this.props.options[index]`
(orderer.tsx:391/458/711). Under a naive "always add an `options` key" strategy
this field would be clobbered for the un-migrated orderer. This is the decisive
reason to switch the props *format per widget* (see below) rather than adding
`options` for everyone at once.

## Examples to follow

**A clean, small functional widget to pilot with — dropdown**
(`widgets/dropdown/dropdown.tsx`). Before:

```ts
type Props = WidgetProps<PerseusDropdownWidgetOptions, PerseusDropdownUserInput> & {
    dependencies: PerseusDependenciesV2;
};
// ...
const {choices = [], placeholder = "", visibleLabel, ariaLabel,   // options
       apiOptions, userInput, static: isStatic, trackInteraction, // universal
       handleUserInput, widgetId, dependencies} = props;
```

After (options nested; universal props stay top-level):

```ts
type Props = WidgetPropsV2<PerseusDropdownWidgetOptions, PerseusDropdownUserInput> & {
    dependencies: PerseusDependenciesV2;
};
// ...
const {choices = [], placeholder = "", visibleLabel, ariaLabel} = props.options;
// Universal props keep reading from `props` — and keep their own inline defaults.
const {apiOptions = ApiOptions.defaults, userInput = {value: 0},
       static: isStatic = false, trackInteraction, handleUserInput,
       widgetId, dependencies} = props;
```

**A hand-built props object in a test — radio**
(`widgets/radio/__tests__/radio-widget.test.tsx:54`). The flat `getBaseProps`
factory (options + universal fields mixed) becomes:

```ts
const getBaseProps = (overrides?) => ({
    options: {numCorrect, hasNoneOfTheAbove, multipleSelect, countChoices,
              deselectEnabled, choices: baseChoices, choiceStates, randomize: false},
    trackInteraction: jest.fn(),
    widgetId: "radio-1",
    // ...remaining universal props unchanged...
    userInput: {selectedChoiceIds: []},
    ...overrides,
});
```

**An `ExternalProps`-style widget — numeric-input**
(`widgets/numeric-input/numeric-input.class.tsx:22`). `ExternalProps["size"]`
lookups become `ExternalProps["options"]["size"]`; the
`... satisfies PropsFor<typeof NumericInput>` assertion constructs the nested
shape.

**The renderer branch point — `getWidgetProps`** (mirror in both
`renderer.old.tsx` and `renderer.new.tsx`). See the "Behavioral requirements"
for the recommended per-widget branching shape.

## Behavioral requirements

- **No behavior change for learners or content.** The rendered output, scoring,
  serialization, and AI-prompt JSON for every widget must be identical before
  and after each step. This is a pure refactor.
- **Migrate one widget at a time, each step independently shippable.** After
  each widget's step, the full suite (`pnpm tsc`, `pnpm test`, lint) must pass
  with a mix of migrated and un-migrated widgets coexisting.
- **`getWidgetProps` returns the format appropriate to each widget.** Because of
  the orderer `options` collision, do NOT add an `options` key for every widget
  at once. Instead branch: for a migrated widget return
  `{options: widgetOptions, userInput, ...universalProps}`; for an un-migrated
  widget keep the current `{...widgetOptions, userInput, ...universalProps}`.
  Both renderers must branch identically. (See Open questions for *how*
  getWidgetProps should decide which widgets are migrated.)
- **Universal props stay at the top level** in both formats: `userInput`,
  `handleUserInput`, `trackInteraction`, `widgetId`, `widgetIndex`,
  `alignment`, `static`, `graded`, `problemNum`, `apiOptions`, `keypadElement`,
  `onFocus`, `onBlur`, `findWidgets`, `reviewMode`, `showSolutions`,
  `linterContext`, `containerSizeClass`. Only the widget-specific options move
  under `options`.
- **Each per-widget step is self-contained** and updates, for that one widget:
  its `Props`/`ExternalProps` type, the component body (read `props.options.*`),
  any `satisfies PropsFor<...>` assertion, its `getSerializedState`, its
  `getPromptJSON` AI-util, its **option-field default values** (relocate inline
  destructuring defaults and `static defaultProps` option fields so they still
  apply to `props.options` — see "How are default props handled?" below), its
  corresponding editor preview (if the editor renders the widget directly), and
  any hand-built-props unit tests. Also flip that widget's entry in the
  getWidgetProps decision (set/flag).
- **Audit each widget's option field names against the reserved universal prop
  names** before/while migrating it. `orderer` has `options`; verify none of
  the others collide with `userInput`, `apiOptions`, `static`, `alignment`,
  `graded`, etc. Where a collision was previously being silently shadowed by a
  universal prop, migrating fixes it — confirm the widget didn't depend on the
  shadowing.
- **Final cleanup (once all widgets are migrated), as its own step(s):**
  - Delete the transitional legacy type and rename the new type to
    `WidgetProps`; delete `UniversalWidgetProps`, inlining its members into
    `WidgetProps` (per the task).
  - Remove the branch from both `getWidgetProps` methods so they always emit the
    `options` shape.
  - Update `WidgetContainer`: `getWidgetSubType(type, this.props.widgetProps)` →
    read from `this.props.widgetProps.options`; keep universal-field reads
    (`alignment`, `apiOptions`, `static`) unchanged.
  - Update `widget-container.tsx`'s `widgetProps: WidgetProps<...>` type and any
    remaining `WidgetProps<any, PerseusWidgetOptions>` annotations.
- **Follow repo test conventions** (CLAUDE.md): AAA, widget generators for test
  data, requirement-style test titles. Prefer not to add new tests for a pure
  refactor beyond what's needed to keep hand-built-props tests compiling.
- **Changeset:** add a changeset (patch — internal type-only refactor, no
  public API/behavior change) per repo release process.

## Open questions

- **How should `getWidgetProps` decide a widget is migrated?** Two reasonable
  options:
  (a) a shared constant `Set<string>` of migrated widget type names, imported by
  both renderers (simplest, one place to flip per widget); or
  (b) a boolean flag on the widget export (e.g. `usesOptionsProp: true` on
  `WidgetExports`), looked up via the widget registry (self-documenting,
  colocated with the widget, but touches the shared `WidgetExports` type). Both
  are removed in the final cleanup. Recommendation: (a) for minimal surface
  area, unless the team prefers colocating migration state on the widget.
    - Answer: Option (a) but use an array, not a Set — it's simpler and the
      lookup is likely faster for the small number of elements we're dealing
      with.

- **Transitional type name.** Recommend keeping `WidgetProps` as the existing
  (spread) shape untouched and introducing `WidgetPropsV2` (nested `options`)
  for migrated widgets, then renaming `WidgetPropsV2` → `WidgetProps` and
  deleting the old one in the final step. This keeps every intermediate step
  compiling without touching un-migrated widgets. Alternative (rename existing
  → `LegacyWidgetProps` up front) requires touching all 30+ files immediately
  and is rejected as riskier. Confirm the naming preference.
    - Answer: Use WidgetPropsV2 as suggested.

- **Migration order.** Suggested: pilot with a simple, self-contained
  functional widget (e.g. `dropdown`, `iframe`, `sorter`, or `phet-simulation`)
  to nail the pattern (component + serialized-state + AI-util + editor + tests +
  renderer branch), then proceed through the remaining functional widgets, then
  the class components (`categorizer`, `grapher`, `image`, `matcher`,
  `numeric-input`, `python-program`, `video`, plus test-only `mock-widget`) and
  the `ExternalProps`-with-required-overrides widgets (`numeric-input`,
  `expression`), saving the highest-risk / most-nested ones (`interactive-graph`,
  `expression`, `group`/`graded-group`/`graded-group-set`) for when the pattern
  is well established. Save `orderer` for after the pattern is proven, given its
  `options`-field collision. Confirm whether a specific order/priority is
  desired.
    - Answer: suggested order sounds good.

- **`getSerializedState` is pervasive (~20 widgets) and relies on the spread.**
  Almost all use `const {userInput, ...rest} = props; return {...rest, ...}`,
  where `...rest` picks up the options. Migrating each of these means replacing
  `...rest` with the widget's `...props.options` (minus any fields the method
  already handles). It's deprecated, so confirm we still want byte-identical
  serialized output rather than simplifying/removing it during this refactor.
    - Answer: preserve behavior (best effort) using `...props.options`.

- **Does the class-renderer `getWidgetProps` return-type annotation need to be
  loosened during transition?** It's currently `WidgetProps<any, any,
  PerseusWidgetOptions>`; while it emits two shapes it may need a union or a
  looser annotation. Treat as an implementation detail unless it forces an API
  change.
    - Answer: it's fine to loosen this type to `any` during the migration if
      needed, but we should change it back to a real type once all widgets are
      migrated.

- **How are default props handled?** There are two independent default-value
  mechanisms, and only the first is affected by nesting the runtime props.

  1. **Render-time component defaults (perseus package) — AFFECTED.**
     `getWidgetProps` spreads the persisted options straight through —
     `const widgetProps = this.props.widgets[widgetId].options; return {...widgetProps, ...}`
     (`renderer.old.tsx:521`, `renderer.new.tsx:529`). Authored JSON frequently
     omits option fields, so widgets rely on component-level defaults to fill the
     gaps at render time. Two forms exist:
       - *Inline destructuring defaults* on functional widgets, e.g. dropdown's
         `const {choices = [], placeholder = ""} = props;` (dropdown.tsx:47).
       - *React `static defaultProps`* on many class-style widgets — e.g.
         numeric-input, matrix, orderer, table, number-line, interactive-graph,
         image, grapher, interaction, molecule, sorter, group, graded-group,
         graded-group-set, cs-program, definition, plotter, matcher, categorizer,
         iframe, explanation, python-program, and measurer. Treat this as
         illustrative, not a checklist: grep `static defaultProps` under
         `packages/perseus/src/widgets` for the current set and audit each widget
         as you migrate it (the per-widget migration step already requires this).
         Most mix **option fields** (e.g. numeric-input
         `size`/`coefficient`/`answerForms`/`labelText`, matrix
         `matrixBoardSize`/`prefix`/`suffix`, matcher `labels`/`orderMatters`,
         iframe `allowFullScreen`/`allowTopNavigation`) with **universal props**
         (`apiOptions`, `linterContext`, `problemNum`, `alignment`) and sometimes
         **userInput** (orderer, matrix, cs-program — note orderer has *two*
         `static defaultProps`: the internal `Card` sub-component's, which is
         option/universal only, and the `Orderer` widget's at orderer.tsx:336,
         which includes `userInput`). A few carry one kind only: measurer's is all
         option fields (`box`/`image`/`showProtractor`/…), while free-response's is
         `userInput`-only and therefore unaffected by the nesting.

     `WidgetExports` has no `defaultProps` field (`types.ts`), so defaults live on
     the component, not the export.

     **The trap.** React applies `defaultProps` (and inline destructuring defaults
     apply) at the *top level* of props. Today a missing `matrixBoardSize` is
     filled because the component reads `props.matrixBoardSize`. After nesting, the
     component reads `props.options.matrixBoardSize`, but React still only fills the
     top-level `props.matrixBoardSize`, which nothing reads — so the default
     silently stops applying and the field is `undefined`. **You cannot fix this by
     nesting the defaults under an `options` key in `static defaultProps`:**
     `getWidgetProps` always sets `options` to a defined (if partial) object, and
     React only substitutes a default when the *whole* prop is `undefined` — it
     does not deep-merge — so a `static defaultProps.options` would never be applied
     to a partial options object.

     **Resolution (per migrated widget).** Relocate the *option-field* defaults so
     they apply to the nested `options`; leave universal-prop and `userInput`
     defaults in `static defaultProps` (they stay top-level and keep working):
       - Functional widgets: **split** the destructure — don't redirect it
         wholesale. Read the *option* fields (with their inline defaults) from
         `props.options`, but keep the *universal* props (with their inline
         defaults) reading from `props`. dropdown (dropdown.tsx:47) destructures
         both kinds in one statement — `choices = []`/`placeholder = ""` alongside
         `apiOptions = ApiOptions.defaults`, `userInput = {value: 0}`,
         `static: isStatic = false` — so pointing the whole statement at
         `props.options` would read those universal props from `props.options`
         (where they don't exist) and let their defaults silently clobber the real
         values. Use the two-statement pattern in the "Examples to follow" section
         above (the dropdown example).
       - Class widgets: apply the option defaults inside the component when it reads
         options — destructure with defaults so both missing properties and
         explicitly-undefined properties get the default.

       (`getWidgetProps` could instead merge the option defaults into the `options`
       object it builds, but that pushes per-widget knowledge into the shared
       renderer — prefer the component-local approach.)

     Before relocating, confirm the default is actually reachable for that widget
     (authored JSON can omit the field). If the parser already populates it for
     every persisted widget, the entry is dead code and can be dropped; otherwise
     preserve it. Either way this must not change rendered behavior — cover with the
     widget's existing tests.

  2. **Editor authoring defaults (perseus-editor package) — NOT affected.** When an
     author inserts a widget, `editor.tsx` sets
     `newWidgets[id] = {options: startWidgetOptions || defaultProps, ...}`
     (editor.tsx:674-688), where `defaultProps` is the *editor* component's
     `static defaultProps` (e.g. `dropdown-editor.tsx:40`,
     `static defaultProps = dropdownLogic.defaultWidgetOptions`) and
     `startWidgetOptions` comes from an optional `initializeWidgetOptions()`. Their
     shared source of truth is `defaultWidgetOptions` in
     `perseus-core/src/widgets/<widget>/index.ts`. These defaults become the
     persisted, still-flat `widgetInfo.options` in the renderer JSON — the data
     schema and the editor's own (flat) prop shape do NOT change, so the default
     *definitions* need no edits. (These authoring defaults are distinct from the
     render-time component defaults above and are often not identical — don't try to
     unify them in this refactor.) The only editor-side change is already captured
     under "Editors render widget previews": when a migrated widget is rendered for
     a preview, that call site must build the nested `{options: {...}}` shape instead
     of spreading flat option fields (matrix-editor even does `{...this.props}` today).

    - Answer: Only the render-time component defaults are in scope. Add a step to
      each per-widget migration to relocate that widget's option-field defaults
      (inline destructuring or `static defaultProps`) so they apply to
      `props.options`, keeping universal/`userInput` defaults top-level; do NOT nest
      defaults under an `options` key in `static defaultProps` (React won't apply
      it). Editor authoring defaults in perseus-core and the flat JSON schema are
      unchanged; the editor-preview call-site update is already part of the Editors
      step.

## Checklist

Each per-widget item below is a single atomic step: after it, `pnpm tsc`,
`pnpm test`, and lint must all pass with migrated and un-migrated widgets
coexisting. Migrating **one widget** means doing all of the following *for that
widget*, in one commit:

1. Point its `Props`/`ExternalProps` type at `WidgetPropsV2` instead of
   `WidgetProps`.
2. Read option fields from `props.options.*` in the component body (split the
   destructure so universal props keep reading from `props`).
3. Relocate that widget's **option-field** defaults (inline destructuring
   defaults and/or the option-only slice of `static defaultProps`) so they apply
   to `props.options`; leave universal/`userInput` defaults top-level. Drop any
   default the parser already guarantees (dead code); otherwise preserve it.
4. Update any `... satisfies PropsFor<typeof W>` assertion to build the nested
   `{options, userInput} satisfies ...` shape.
5. Update `getSerializedState` (`...rest` → `...props.options`) to preserve
   byte-identical output.
6. Update the widget's `getPromptJSON` AI-util to read `widgetData.options.*`.
7. Update the editor preview call-site (if the editor renders the widget
   directly) to pass `options: {...}` instead of flat option fields.
8. Update any hand-built-`WidgetProps` unit tests for that widget.
9. Add the widget's type name to the shared `MIGRATED_WIDGETS` array (flips the
   `getWidgetProps` branch for it).
10. Audit the widget's option field names against the reserved universal prop
    names (`userInput`, `apiOptions`, `static`, `alignment`, `graded`, etc.);
    confirm the widget didn't rely on a field being shadowed.

### Scaffolding

- [x] Add `WidgetPropsV2<TWidgetOptions, TUserInput, TrackingExtraArgs>` to
      `types.ts` — nest options under `options`, keep all universal members
      top-level (leave existing `WidgetProps`/`UniversalWidgetProps` untouched).
- [x] Add a shared `MIGRATED_WIDGETS: ReadonlyArray<string> = []` module;
      branch both `getWidgetProps` methods (`renderer.old.tsx`,
      `renderer.new.tsx`) on `MIGRATED_WIDGETS.includes(widgetInfo?.type)` —
      emit `{options: widgetProps, ...universal}` when migrated, else the current
      `{...widgetProps, ...universal}`; loosen both return types to `any` for the
      transition. With the array empty, behavior is unchanged — verify the suite
      passes.
- [x] In `widget-container.tsx`, make the subtype lookup transition-safe:
      `getWidgetSubType(type, this.props.widgetProps.options ?? this.props.widgetProps)`
      (universal-field reads `alignment`/`apiOptions`/`static` stay as-is).
- [x] Add a changeset (patch — internal type-only refactor, no public
      API/behavior change).

### Pilot widgets

Migrate these **one at a time**, stopping after each step for the user to
review and commit the changes.

- [x] Migrate `dropdown` to `WidgetPropsV2` (pilot; functional widget with
      inline destructuring defaults).
- [x] Migrate `radio` to `WidgetPropsV2` (second pilot; update the hand-built
      `getBaseProps` factory in `radio-widget.test.tsx`; subtype lookup already
      handled by scaffolding).

### Remaining functional widgets

Migrate these **one at a time**, stopping after each step for the user to
review and commit the changes.

- [x] Migrate `phet-simulation` to `WidgetPropsV2`.
- [x] Migrate `iframe` to `WidgetPropsV2`.
- [x] Migrate `sorter` to `WidgetPropsV2`.
- [x] Migrate `definition` to `WidgetPropsV2`.
- [ ] Migrate `explanation` to `WidgetPropsV2`.
- [ ] Migrate `deprecated-standin` to `WidgetPropsV2`.
- [ ] Migrate `free-response` to `WidgetPropsV2` (its `defaultProps` is
      `userInput`-only, so no option-field defaults to relocate).
- [ ] Migrate `video` to `WidgetPropsV2`.
- [ ] Migrate `image` to `WidgetPropsV2`.
- [ ] Migrate `molecule` to `WidgetPropsV2`.
- [ ] Migrate `measurer` to `WidgetPropsV2`.
- [ ] Migrate `number-line` to `WidgetPropsV2`.
- [ ] Migrate `plotter` to `WidgetPropsV2` (update its editor preview).
- [ ] Migrate `cs-program` to `WidgetPropsV2`.
- [ ] Migrate `python-program` to `WidgetPropsV2`.
- [ ] Migrate `interaction` to `WidgetPropsV2`.
- [ ] Migrate `input-number` to `WidgetPropsV2`.

### Class / `ExternalProps` widgets

Migrate these **one at a time**, stopping after each step for the user to
review and commit the changes.

- [ ] Migrate `categorizer` to `WidgetPropsV2` (update its editor preview).
- [ ] Migrate `matcher` to `WidgetPropsV2`.
- [ ] Migrate `matrix` to `WidgetPropsV2` (update its editor preview).
- [ ] Migrate `grapher` to `WidgetPropsV2` (update its editor preview and
      `satisfies PropsFor` assertion).
- [ ] Migrate `table` to `WidgetPropsV2` (update its editor preview).
- [ ] Migrate `numeric-input` to `WidgetPropsV2` (`ExternalProps["<field>"]` →
      `ExternalProps["options"]["<field>"]`; rebuild the `satisfies PropsFor`
      assertion into the nested shape).
- [ ] Migrate `expression` to `WidgetPropsV2` (same `ExternalProps` pattern;
      update its editor preview).

### Highest-risk / nested widgets

Migrate these **one at a time**, stopping after each step for the user to
review and commit the changes.

- [ ] Migrate `label-image` to `WidgetPropsV2` (update `satisfies PropsFor`
      assertion).
- [ ] Migrate `interactive-graph` to `WidgetPropsV2` (update `satisfies PropsFor`
      assertion and `interactive-graph-editor` preview; subtype lookup already
      handled by scaffolding).
- [ ] Migrate `group` to `WidgetPropsV2` (renders a nested `Renderer`).
- [ ] Migrate `graded-group` to `WidgetPropsV2` (update `satisfies PropsFor`
      assertion).
- [ ] Migrate `graded-group-set` to `WidgetPropsV2`.

### Special cases (do last)

Migrate these **one at a time**, stopping after each step for the user to
review and commit the changes.

- [ ] Migrate `orderer` to `WidgetPropsV2` — ⚠ its options include a field named
      `options` (`this.props.options[index]` → `this.props.options.options[index]`);
      it has two `static defaultProps` (the `Card` sub-component's and the widget's
      `userInput`-bearing one) — relocate only the option-field defaults.
- [ ] Migrate `mock-widget` (test-only) to `WidgetPropsV2`.

### Final cleanup

- [ ] Remove the branch from both `getWidgetProps` methods (always emit the
      `options` shape) and delete the `MIGRATED_WIDGETS` module.
- [ ] Simplify the `widget-container.tsx` subtype lookup to
      `getWidgetSubType(type, this.props.widgetProps.options)` and update the
      `widgetProps` prop type (and any lingering
      `WidgetProps<any, PerseusWidgetOptions>` annotations).
- [ ] Rename `WidgetPropsV2` → `WidgetProps` across the repo; delete the old
      spread `WidgetProps` and `UniversalWidgetProps` (inlining its members into
      `WidgetProps`); restore the real return type on both `getWidgetProps`
      methods.
- [ ] Search for `LEMS-4354` and ensure all matching TODOs are addressed.
