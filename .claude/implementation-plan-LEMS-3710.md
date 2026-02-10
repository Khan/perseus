# LEMS-3710: Add Toggle for Showing Preview Unshuffled

## Context

Content creators using the Radio widget find the Edit tab sidebar preview unhelpful when choices are shuffled — it's hard to match shuffled preview choices back to the editor fields. They want the sidebar preview to default to unshuffled, with an option to see the shuffled view when needed. The Preview tab should always respect the `randomize` setting.

## Approach

### Core Idea

Add an ephemeral "Shuffle preview" toggle to `RadioEditor` that controls whether the Edit tab sidebar preview shuffles choices. The toggle state is communicated to the preview via a marker field in `serialize()` output, which `EditorPage.updateRenderer()` processes before sending data to the iframe.

### Why This Approach

- `serialize()` is the only channel between `RadioEditor` and the preview iframe
- `serialize()` is also used for saving — so we use a marker field that gets stripped on the save path
- No changes to core shuffle logic (`choiceTransform`, `radio.ff.tsx`, etc.)
- Fully editor-only change

## Implementation Steps

### Step 1: Add toggle UI and state to RadioEditor

**File:** `packages/perseus-editor/src/widgets/radio/editor.tsx`

- Add component state: `state = { showShuffledPreview: false }`
- Add a "Shuffle preview" `LabeledSwitch` immediately after the "Randomize order" switch
  - Disabled when `!this.props.randomize` or `isEditingDisabled`
  - Checked: `this.state.showShuffledPreview`
  - When toggled off or when randomize is turned off, reset to `false`
- Add `InfoTip` next to "Randomize order" explaining: "The editor preview shows choices unshuffled by default. Use 'Shuffle preview' to see the randomized order. The Preview tab always shows the randomized order when enabled."
- Follow the `LabeledSwitch + InfoTip` pattern from `decorative-toggle.tsx` (flex row with gap)

### Step 2: Add marker field to serialize()

**File:** `packages/perseus-editor/src/widgets/radio/editor.tsx`

- In `serialize()`, when `this.props.randomize && this.state.showShuffledPreview`, include `_showShuffledPreview: true` in the return value
- The real `randomize` field always reflects the true prop value (unchanged)
- Widen the return type to allow the extra field

### Step 3: Process marker in EditorPage.updateRenderer()

**File:** `packages/perseus-editor/src/editor-page.tsx`

- After `this.serialize()` on line 225, post-process the item:
  - Walk `item.question.widgets` entries
  - For any widget where `type === "radio"`:
    - If `options._showShuffledPreview` is truthy → leave `randomize` as-is, delete the marker
    - Otherwise → set `options.randomize = false` (default: unshuffled in editor preview)
- This ensures the Edit tab preview defaults to unshuffled unless the creator explicitly enables shuffle preview

### Step 4: Strip marker from save path

**File:** `packages/perseus-editor/src/editor-page.tsx`

- In `serialize()` (line 254), after serializing, walk widgets and remove `_showShuffledPreview` from any radio widget options
- This prevents the marker from ever being persisted to content data

### Step 5: Tests

**Files:**

- `packages/perseus-editor/src/widgets/__tests__/radio-editor.test.tsx` — Toggle UI behavior
- `packages/perseus-editor/src/__tests__/editor-page.test.tsx` (or similar) — Preview/save data processing

Test cases:

- Toggle renders and is disabled when randomize is off
- Toggle is enabled when randomize is on
- Toggle resets to false when randomize is turned off
- `serialize()` includes `_showShuffledPreview: true` only when both randomize and toggle are on
- `serialize()` does NOT include marker when toggle is off
- `updateRenderer()` sets `randomize: false` for radio widgets without the marker
- `updateRenderer()` leaves `randomize: true` for radio widgets with the marker
- Save path strips the marker field

## Key Files

| File                                                                                | Change                                               |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `packages/perseus-editor/src/widgets/radio/editor.tsx`                              | Add toggle, state, InfoTip, serialize marker         |
| `packages/perseus-editor/src/editor-page.tsx`                                       | Process marker in updateRenderer, strip in serialize |
| `packages/perseus-editor/src/widgets/image-editor/components/decorative-toggle.tsx` | Reference only (LabeledSwitch + InfoTip pattern)     |

## Verification

1. `pnpm --filter perseus-editor test` — editor unit tests pass
2. `pnpm test` — all tests across the monorepo pass (no regressions)
3. `pnpm tsc` — no type errors
4. `pnpm lint` — no linting issues (run `pnpm lint --fix` if any arise)
5. `pnpm storybook` — manual testing in the Radio widget editor:
    - Toggle Randomize on → sidebar preview should show unshuffled (default)
    - Toggle "Shuffle preview" on → sidebar preview should show shuffled
    - Toggle "Shuffle preview" off → sidebar preview returns to unshuffled
    - Toggle Randomize off → "Shuffle preview" should be disabled, preview unshuffled
    - Switch to Preview tab → choices should always be shuffled when Randomize is on

---

*Co-authored by Claude Opus 4.6*