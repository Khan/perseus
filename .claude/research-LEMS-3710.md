# LEMS-3710 Research: Radio Widget Shuffle Toggle

## Overview

This document captures research into how the Radio widget handles shuffling, how the Edit and Preview tabs differ architecturally, and what tooltip patterns exist in the editor.

## Shuffle Mechanics

### Core Shuffle Logic
- **`choiceTransform()`** in `packages/perseus/src/widgets/radio/util.ts` (lines 116-146) is the central orchestration function
- Applies three transforms in order:
  1. **Shuffle** (lines 140-141): If `randomize` is truthy, calls `shuffle(choicesWithMetadata, seed)`
  2. **Enforce ordering** (lines 96-113): Swaps True/False or Yes/No into canonical order
  3. **Move "None of the above" to end** (lines 74-94): Ensures `isNoneOfTheAbove` choice is always last

### Shuffle Utility
- `packages/perseus-core/src/utils/random-util.ts` (lines 34-51)
- Uses seeded RNG (Robert Jenkins' 32-bit integer hash) with Fisher-Yates algorithm
- Seed is computed as `problemNum + widgetIndex` in `radio.ff.tsx` (lines 182-183)

### Where Shuffling is Triggered
- **`Radio._mergePropsAndState()`** in `packages/perseus/src/widgets/radio/radio.ff.tsx` (lines 164-215)
- Calls `choiceTransform()` with the original choices, `randomize` flag, localized strings, and computed seed
- The shuffled `RadioChoiceWithMetadata[]` is passed down to `MultipleChoiceWidget`

### Choice IDs
- Choice IDs are stable/opaque identifiers that survive shuffling
- No "unshuffling by index" is needed — IDs carry the mapping
- `getUserInputFromSerializedState()` in `util.ts` (lines 52-72) extracts `selectedChoiceIds` from choice states

### Default Value
- `randomize` defaults to `false` in `packages/perseus-core/src/widgets/radio/index.ts` (line 25)

## Edit Tab vs Preview Tab Architecture

### Edit Tab (Sidebar Preview)
- **iframe-based rendering**
- `packages/perseus-editor/src/item-editor.tsx` (lines 236-250): Renders `IframeContentRenderer` inside `DeviceFramer`
- `packages/perseus-editor/src/editor-page.tsx` (lines 204-238): `updateRenderer()` serializes editor state and sends to iframe
- Always sends `reviewMode: true` (line 235)
- `problemNum` passed through from props (line 237)

### Preview Tab (ContentPreview)
- **Inline rendering** (no iframe)
- `packages/perseus-editor/src/content-preview.tsx` (lines 33-116)
- `problemNum` is hardcoded to `0` (line 81)
- `reviewMode` passed through as a prop
- Uses `UserInputManager` for state management

### Key Differences

| Signal | Edit Tab (iframe) | Preview Tab (ContentPreview) |
|--------|-------------------|------------------------------|
| `reviewMode` | Always `true` | Passed through |
| `problemNum` | From parent props | Hardcoded to `0` |
| Rendering | `IframeContentRenderer` + `ServerItemRenderer` | Inline `Renderer` + `UserInputManager` |

### Widget-Level Distinction
- The Radio widget receives `reviewMode`, `static`, `showSolutions`, `apiOptions.readOnly`
- There is **no `editMode` prop** on the widget — the Edit vs Preview distinction comes from `reviewMode` being set differently
- In `multiple-choice-widget.tsx` (line 362): `const isReviewMode = reviewMode || isStatic || showSolutions === "all"`

## Data Flow: Editor to Widget

```
RadioEditor (author choices, unshuffled)
    |
    v  serialize()
PerseusRadioWidgetOptions  { choices, randomize, ... }
    |
    v  stored in PerseusRenderer JSON
Renderer.getWidgetProps()  adds problemNum, widgetIndex, reviewMode
    |
    v
Radio (radio.ff.tsx)  _mergePropsAndState() -> choiceTransform() -> shuffle
    |
    v  shuffled RadioChoiceWithMetadata[]
MultipleChoiceWidget (multiple-choice-widget.tsx)
    |
    v  buildChoiceProps() -> ChoiceType[]
MultipleChoiceComponent  (renders the UI)
```

## Randomize Toggle in Editor

### Current Implementation
- **File:** `packages/perseus-editor/src/widgets/radio/editor.tsx` (lines 335-343)
- Uses `LabeledSwitch` component with label "Randomize order"
- No tooltip currently attached
- Import: `import LabeledSwitch from "../../components/labeled-switch";`

### LabeledSwitch Component
- **File:** `packages/perseus-editor/src/components/labeled-switch.tsx`
- Wraps `Switch` from `@khanacademy/wonder-blocks-switch`
- Uses `LabelSmall` or `LabelMedium` from `@khanacademy/wonder-blocks-typography`

## Existing Tooltip Patterns in Editor

### Pattern 1: LabeledSwitch + InfoTip (Best Precedent)
- **File:** `packages/perseus-editor/src/widgets/image-editor/components/decorative-toggle.tsx` (lines 51-65)
- `LabeledSwitch` and `InfoTip` as siblings in a flex row
- CSS: `display: flex; align-items: center; gap: var(--wb-sizing-size_040);`

### Pattern 2: Checkbox with InfoTip in Label
- **File:** `packages/perseus-editor/src/item-extras-editor.tsx` (lines 168-188)
- `InfoTip` nested inside `Checkbox` label prop

### Pattern 3: Standalone InfoTip
- **File:** `packages/perseus-editor/src/widgets/interactive-graph-editor/locked-figures/locked-figure-aria.tsx` (lines 39-51)
- `InfoTip` with multiline description next to a label

### InfoTip Component
- **Wrapper:** `packages/perseus/src/components/info-tip/index.tsx`
- **Core:** `packages/perseus/src/components/info-tip/info-tip-base.tsx` (lines 13-26)
- Uses `Tooltip` from `@khanacademy/wonder-blocks-tooltip` + `PhosphorIcon` question mark icon
- Import pattern: `const {InfoTip} = components;` (from `@khanacademy/perseus`)

## Key Files for Implementation

| Purpose | File |
|---------|------|
| Radio editor UI | `packages/perseus-editor/src/widgets/radio/editor.tsx` |
| Edit tab preview data | `packages/perseus-editor/src/editor-page.tsx` |
| Preview tab rendering | `packages/perseus-editor/src/content-preview.tsx` |
| Item editor (tab container) | `packages/perseus-editor/src/item-editor.tsx` |
| Shuffle logic | `packages/perseus/src/widgets/radio/util.ts` |
| Radio widget wrapper | `packages/perseus/src/widgets/radio/radio.ff.tsx` |
| InfoTip component | `packages/perseus/src/components/info-tip/info-tip-base.tsx` |
| LabeledSwitch component | `packages/perseus-editor/src/components/labeled-switch.tsx` |
| Decorative toggle (tooltip precedent) | `packages/perseus-editor/src/widgets/image-editor/components/decorative-toggle.tsx` |

---

*Co-authored by Claude Opus 4.6*