# Creating a New Widget

Model a new widget on `dropdown`: `git ls-files '*dropdown*'`, run from the
repo root, lists its files in every package. Create the matching files for the
new widget, leaving out scoring and validation if it isn't scorable. Every new
widget needs `__docs__/a11y.mdx` documenting its accessibility, even though
many older widgets don't have one yet.

Then register it, in dependency order:
1. `perseus-core`: options type in `data-schema.ts` (`PerseusWidgetTypes`),
   user input type in `validation.types.ts` (`UserInputRegistry`), parsers in
   `perseus-parsers/widgets-map.ts` and `user-input-map.ts`, widget logic in
   `widgets/core-widget-registry.ts`, and exports in `index.ts`.
2. `perseus-score`: `widgets/widget-registry.ts`, if scorable.
3. `perseus`: `extra-widgets.ts` (or `basic-widgets.ts` for core widgets).
4. `perseus-editor`: `all-editors.ts`, importing the editor's folder.
5. `perseus-linter`: `rules/all-rules.ts`, if the widget has a lint rule.
