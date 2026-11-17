# Initialize new widgets' options from the core widget registry

## Task

> TODO-NEXT(benchristel): get rid of all these different ways of
> initializing widget options. We should probably standardize on getting the
> initial options from CoreWidgetRegistry.getDefaultWidgetOptions().

(from `packages/perseus-editor/src/editor.tsx`, line 659)

## Code analysis

- `Editor._addWidgetToContent()` in `packages/perseus-editor/src/editor.tsx`
  inserts widget syntax into the content and adds an entry to the widgets
  map. It picks the new widget's options in one of two ways:
  - the widget editor's optional static `initializeWidgetOptions(params)`,
    which receives `InitializeWidgetOptionsParams` (currently just the
    selected text), or else
  - the widget editor's static React `defaultProps`.
- Only `DefinitionEditor` implements `initializeWidgetOptions`. It copies
  `definitionLogic.defaultWidgetOptions` and sets `togglePrompt` to the
  selected text.
- Almost every widget editor's `defaultProps` is exactly
  `<widget>Logic.defaultWidgetOptions` from perseus-core (some spread it into
  a fresh object, which is equivalent). So the editor-side defaults already
  duplicate the logic-side defaults. The `interaction-editor/*` sub-editors
  and `interactive-graph-settings` have their own `defaultProps`, but they
  aren't widget editors and are out of scope.
- `getDefaultWidgetOptions(type)` in
  `packages/perseus-core/src/widgets/core-widget-registry.ts` reads
  `defaultWidgetOptions` from the registered `WidgetLogic`, returning `{}` for
  unregistered types. `applyDefaultsToWidget` in `apply-defaults.ts` already
  uses it.
- `registerCoreWidgets()` does **not** register `free-response`, although
  perseus-core has a `free-response` logic export and the editor has a
  `FreeResponseEditor`. Switching to the registry without fixing this would
  give new free-response widgets `{}` as options.
- Editors are looked up via `getEditor()` from the perseus widget registry;
  test-only widgets in `testing-widgets` may have editors with no
  corresponding core logic.
- `editor-page.test.tsx` covers the definition-widget path ("should call
  initializeWidgetOptions if available").

## Examples to follow

- `applyDefaultsToWidget` in
  `packages/perseus-core/src/widgets/apply-defaults.ts` is the existing
  consumer of `getDefaultWidgetOptions()`.
- The definition-widget test in `packages/perseus-editor/src/editor-page.test.tsx`
  shows how to drive widget insertion through the UI (select text, choose a
  widget from `editor__widget-select`, assert on `onChange`).

## Behavioral requirements

- Inserting any core widget from the editor's widget dropdown produces the
  same options as today (deep-equal to `<widget>Logic.defaultWidgetOptions`).
- Inserting a definition widget with text selected still uses the selection
  as `togglePrompt`; with no selection, `togglePrompt` stays at its default.
- Inserting a free-response widget still produces its default options (this
  requires either registering free-response in the core registry or
  otherwise covering it).
- New widgets' options must not share object identity with the registry's
  defaults, so later edits can't mutate the shared default object.
- `version` on the inserted widget is unchanged
  (`CoreWidgetRegistry.getCurrentVersion`).
- There is a single source of initial options per widget: the registry's
  `getDefaultWidgetOptions()`. The editor no longer reads a widget editor's
  `defaultProps` when inserting a widget.
- Recommended shape for context-dependent initialization: keep
  `initializeWidgetOptions` as an optional static hook, but change its
  signature to `(defaults, params: InitializeWidgetOptionsParams) => options`,
  where `defaults` is a copy of the registry defaults. Only
  `DefinitionEditor` implements it. The editor uses the hook's result when
  the hook exists, and the defaults otherwise. The current `||` fallback,
  which treats a falsy hook result as "use `defaultProps`", goes away; the
  hook's return type makes a falsy result impossible.
- Update the comment above `InitializeWidgetOptionsParams` in `editor.tsx` to
  describe the new hook contract.
- Before switching to the registry, settle free-response: check `git log`
  (and the KA webapp, if needed) for why `registerCoreWidgets()` omits it.
  If there's no deliberate reason, register it there. If there is, keep
  free-response working by having the editor fall back to the widget
  editor's `defaultProps` only when the registry has no logic for the type
  (`isWidgetRegistered()` is false). The same fallback then covers
  test-only widgets.

## Open questions

- Should the editors' `defaultProps` be removed entirely? They also act as
  React fallbacks when a stored widget is missing fields, so removing them
  may change rendering of old content. Perhaps limit this task to the
  insertion path and leave `defaultProps` for a follow-up.
  - Yes, remove defaultProps. Existing content is passed through the parsers
    in perseus-core before reaching the editors, so it will always have all
    required widget options.

## Checklist

- [ ] Check `git log` for why `registerCoreWidgets()` omits free-response;
      record the finding in a note at the top of this checklist
- [ ] If there's no deliberate reason, register free-response in
      `registerCoreWidgets()` (otherwise, plan the `isWidgetRegistered()`
      fallback to `defaultProps` and keep those `defaultProps` below)
- [ ] Test: inserting a core widget (e.g. dropdown) from the widget dropdown
      produces options deep-equal to `<widget>Logic.defaultWidgetOptions`
- [ ] Test: inserting a free-response widget produces
      `freeResponseLogic.defaultWidgetOptions`
- [ ] Test: inserted widget options don't share identity with the
      registry's defaults
- [ ] Change `_addWidgetToContent()` to take a copy of
      `getDefaultWidgetOptions(type)` and pass it to the new
      `initializeWidgetOptions(defaults, params)` hook when present; drop the
      `defaultProps` fallback and update the comment above
      `InitializeWidgetOptionsParams`
- [ ] Update `DefinitionEditor.initializeWidgetOptions` to the new
      signature, setting `togglePrompt` from the selection on `defaults`
- [ ] Test: inserting a definition widget with no selection leaves
      `togglePrompt` at its default (the existing test covers the
      with-selection case; update it for the new signature if needed)
- [ ] Test: the inserted widget's `version` matches
      `CoreWidgetRegistry.getCurrentVersion(type)`
- [ ] Remove `defaultProps` from widget editors whose defaults duplicate
      `<widget>Logic.defaultWidgetOptions`, a few editors per step, fixing
      any props types that relied on them
- [ ] Add a changeset for `@khanacademy/perseus-editor` (and
      `@khanacademy/perseus-core` if free-response registration changed)
