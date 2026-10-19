# Sorter Widget Refactor — MVP Prototype

The goal is to prototype a refactored Sorter widget.

## Sources

Read these before writing code. Where they conflict, stop and ask; do not pick one.

- `packages/perseus/src/widgets/fill-in-the-blank/notes/drag-and-drop-overview.md`:
  a markdown summary of the shared drag-and-drop design requirements, with repo
  grounding. Prefer it over the PDF.
- `packages/perseus/src/widgets/sorter/design/Overview.pdf`: design requirements
  expected of all drag-and-drop widgets.
- `packages/perseus/src/widgets/sorter/design/Sorter.pdf`: design requirements
  expected of the Sorter widget. Note: the Figma embed on page 1 failed to export
  (it shows a CloudFront 403 error), so ignore that frame.
- `packages/perseus/src/widgets/sorter/design/Sorter.png`: a visual design of the
  final Sorter widget (Scale-style: three blanks in a row, a legend labeled
  "Lowest"/"Highest", and a "Choices" bank).

## Scope

- The goal IS NOT to implement the entire widget right now
- The goal IS to implement an MVP
- We are trying to support only existing Sorter content and behavior
- No schema should change
- No changes to the parser should be needed
- We will not meet all requirements outlined in the documents
- We will use the requirements as a guideline for making the MVP
- We will aim to use existing components as needed (see "Existing code to reuse")
- For now, completely ignore the timeline and sentence variants

## Existing behavior to be aware of

Facts about the current implementation that the new one must account for:

- Widget options (`PerseusSorterWidgetOptions`, `perseus-core/src/data-schema.ts`):
  `correct: string[]`, `layout: "horizontal" | "vertical"`, `padding: boolean`.
  There are no legend, variant, or label fields.
- User input (`PerseusSorterUserInput`, `perseus-core/src/validation.types.ts`):
  `{options: string[]; changed: boolean}`. `options` is the full list of card
  strings in the learner's current order.
- `getStartUserInput` (`sorter/index.ts`) seeds `options` with
  `shuffleSorter(options, problemNum)`.
- Scoring (`perseus-score/src/widgets/sorter/score-sorter.ts`) deep-equals
  `userInput.options` against `correct`.
- Validation (`validate-sorter.ts`) only checks `changed`.
- Content with more than `SORTER_MAX_CARDS` (10) cards renders `DeprecatedStandin`
  and is auto-awarded the point (`exceedsCardLimit`).
- More than `SORTER_MAX_HORIZONTAL_CARDS` (5) cards forces the vertical layout.
- The widget fires a `perseus:widget:rendered:ti` analytics event on mount.
- `SorterHandle` exposes `moveOptionToIndex` (deprecated, used by tests),
  `getPromptJSON`, and `getSerializedState` (deprecated).
- `sorterLogic.accessible` is `false` (`perseus-core/src/widgets/sorter/index.ts`).

## Existing code to reuse

Shared drag-and-drop components live in `packages/perseus/src/components/drag-and-drop/`.
No widget consumes them in production yet; Sorter is the first.

- `choice-bank.tsx` — `ChoiceBank`
- `answer-tile/` — `AnswerTile`
- `blank/` — `BlankComponent`
- `dnd-action-menu/` — `DndActionMenu`
- `perseus-dnd-provider.tsx` — `PerseusDndProvider`
- `tile-placements.ts` — pure placement transitions (`placeTile`, `clearBlank`,
  `remainingUses`); already models the FITB/Sorter one-tile-per-blank, swap-to-bank behavior
- `use-tile-move-actions.ts` — move/clear actions shared by drag and menu paths
- `drag-ids.ts` — drag id helpers
- `temp-strings.ts` — temporary untranslated strings (`tempDndStrings`)

Test data: `packages/perseus-core/src/utils/generators/sorter-widget-generator.ts`.

## Decisions

### Data model
- The choice bank's initial display order is the shuffled `userInput.options` from
  `getStartUserInput`.
- `correct` never contains duplicate strings, so a tile's string can identify it.
- Track in-progress placements in the component's internal state.
- When every blank is filled, call `handleUserInput` with `options` set to the placed
  tiles in blank order and `changed: true`.
- `changed` is `false` whenever any blank is empty. This includes clearing a blank
  after every blank was filled: call `handleUserInput` with `changed: false` then.
  `options` keeps the previous full list.
- A partly filled answer is invalid (no Check button). `validate-sorter.ts` may
  change if needed. Because `changed` is `false` whenever a blank is empty, the
  existing `changed` check may already cover this.
- When the widget mounts with `changed: true` (e.g. restored state), the blanks
  start filled from `userInput.options`.

### Layout and design
- Scale is the only variant for now. Timeline and Sentence are out of scope.
- Ignore the legend.
- Honor `layout`, except when there are more than `SORTER_MAX_HORIZONTAL_CARDS`
  cards: then force the vertical orientation (same as today).
- Ignore `padding`.
- Behavior: match what the current Sorter can do, which is drag-and-drop.
- Responsive orientation switching and image height presets are out of scope.

### Parity with the current widget
- The new implementation supports `getPromptJSON` and `getSerializedState`.
  It drops `moveOptionToIndex`; tests use user interactions instead.
- Keep the `perseus:widget:rendered:ti` analytics event.
- Keep the `exceedsCardLimit` → `DeprecatedStandin` path.

### Switch
- The switch is a feature flag, `dnd-widget-sorter`, checked in `sorter.tsx` with
  `isFeatureOn(props, "dnd-widget-sorter")`. This follows the Fill in the Blank
  pattern (`dnd-widget-fitb`).
- Off by default, so production keeps the old implementation.
- Register it everywhere `dnd-widget-fitb` is registered:
  - `packages/perseus-core/src/feature-flags.ts` (`PerseusFeatureFlags`)
  - `packages/perseus/src/testing/feature-flags-util.ts`
  - `packages/perseus-editor/src/testing/feature-flags-util.ts` (a test util only;
    the editor itself doesn't change)
- Stories and tests reach the new implementation through the switcher with the flag
  on, so they exercise the real renderer (user input, validation, scoring):
  - Tests: pass `apiOptions: {flags: getFeatureFlags({"dnd-widget-sorter": true})}`
    to `renderQuestion`.
  - Stories: set `globals: {featureFlags: ["dnd-widget-sorter"]}`.

### Boundaries
- Make the minimum changes needed to get the new implementation started.
- The external API must not change: the data schema stays stable and the editor
  doesn't change.
- The shared drag-and-drop components may be changed as needed.

## Tasks

Do these in order, and stop for review after step 1.

1. **Move the legacy implementation.** Add
   `packages/perseus/src/widgets/sorter/old/` with everything the legacy
   implementation needs (component, tests, snapshots, test data, Cypress tests,
   stories), so the folder is self-contained and can be deleted once the new
   implementation is the default. This step is a pure move: no behavior change,
   and all existing sorter tests pass.
2. **Add the switch.** `packages/perseus/src/widgets/sorter/sorter.tsx` will be
   made to switch between the implementations using the `dnd-widget-sorter` feature
   flag (see Decisions → Switch).
3. **Build the new implementation.** Add
   `packages/perseus/src/widgets/sorter/new/`, which will contain the new
   implementation, its tests, and its stories.
4. **Tests.** Cover the new implementation: it renders, it can be interacted with
   (drag-and-drop), and so on. Render with the flag on through `renderQuestion`.
   Follow the Testing Guidelines in the repo `CLAUDE.md` (AAA, generators).
5. **Stories.** Old stories live in `old/` and new stories in `new/`. File names must
   end in `.stories.tsx` (or `.stories.ts`) to match the Storybook glob in
   `.storybook/main.ts`. The new implementation needs an interactive story;
   new stories set `globals: {featureFlags: ["dnd-widget-sorter"]}`.

## Done criteria

- `pnpm tesc`, `pnpm tsc`, `pnpm fixc`, and `pnpm knip` pass
- Existing sorter tests pass against `old/`
- The new implementation has tests and an interactive story

## Working rules

- If the docs, the schema, or this file conflict, or a decision isn't covered here,
  add it to Outstanding Questions and ask. Do not guess.

## Outstanding Questions

None.
