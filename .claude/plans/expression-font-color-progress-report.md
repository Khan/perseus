# Expression Widget — Font & Color Conversion Progress Report

Widget: `expression`
Workflow: font-color
Date started: 2026-05-05

---

## Step 1 — Audit the Widget

### Commands run

```bash
# Find primitive color token usage
grep -r "color\." packages/perseus/src/widgets/expression/ --include="*.tsx" --include="*.ts" --include="*.css"

# Find hardcoded hex values
grep -rn "#[0-9a-fA-F]{3,6}" packages/perseus/src/widgets/expression/

# Find hardcoded rgb(a) values
grep -rn "rgba?\([^)]+\)" packages/perseus/src/widgets/expression/

# Check 4 font attributes
grep -rEn "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/expression/
```

All four commands returned no output.

### Files examined

- `expression.tsx` — StyleSheet has two rules: `mobileLabelInputWrapper` (`padding: "15px 4px 0"`) and `desktopLabelInputWrapper` (`margin: "5px 5px 0"`). No colors, no font attributes.
- `__docs__/expression.stories.tsx` — existing stories using `ServerItemRendererWithDebugUI` and test data items. No color/font declarations.
- All other files (`index.ts`, `expression.testdata.ts`, test files) contain no style declarations.

### Colors to be Tokenized

None found.

### Fonts to be Tokenized

None found.

---

## Step 2 — Create Regression Stories

### Research (Gate Check)

**Files examined for story creation research:**
- `packages/perseus/src/widgets/expression/expression.testdata.ts` — test data items using `generateExpressionOptions`, `generateExpressionWidget`, `generateExpressionAnswerForm`. Confirmed data uses `ServerItemRendererWithDebugUI` in the existing `expression.stories.tsx`.
- `packages/perseus-core/src/utils/generators/expression-widget-generator.ts` — `generateExpressionOptions`, `generateExpressionWidget`, `generateExpressionAnswerForm` generators verified.
- `packages/perseus-core/src/widgets/expression/index.ts` — default widget options: `answerForms: []`, `times: false`, `buttonSets: ["basic"]`, `functions: ["f", "g", "h"]`.
- `packages/perseus-core/src/data-schema.ts` — `PerseusExpressionWidgetOptions` and `PerseusExpressionAnswerForm` types verified. All fields confirmed.
- `packages/perseus/src/widgets/__testutils__/label-image-renderer-decorator.tsx` — reference decorator pattern using `ServerItemRendererWithDebugUI`.
- `packages/perseus/src/widgets/label-image/__docs__/label-image-initial-state-regression.stories.tsx` — reference initial state story structure.
- `packages/perseus/src/widgets/label-image/__docs__/label-image-interactions-regression.stories.tsx` — reference interactions story structure. Confirmed check button: `canvas.getByRole("button", {name: "Check answer"})`, clicked twice due to scoring quirk.
- `packages/perseus/src/testing/server-item-renderer-with-debug-ui.tsx` — confirmed check button has `aria-label="Check answer"`.
- `.storybook/modes.ts` — confirmed `themeModes` import and structure.
- `packages/perseus/src/widgets/__testutils__/story-decorators.tsx` — confirmed `rtlDecorator` export.

**Import paths verified:**
- `themeModes` from `"../../../../../../.storybook/modes"` (6 levels up from `expression/__docs__/`)
- `getWidget` from `"../../../widgets"`
- `expressionRendererDecorator` from `"../../__testutils__/expression-renderer-decorator"` (to be created)
- `rtlDecorator` from `"../../__testutils__/story-decorators"`
- Decorator imports: `@khanacademy/perseus-core`, `../../testing/server-item-renderer-with-debug-ui`

**Interaction pattern identified:**
- `canvas.getByRole("textbox")` finds the MathInput textarea (confirmed in `expression.test.tsx` which uses `screen.getByRole("textbox")` with `userEvent.type`)
- Check button: `canvas.getByRole("button", {name: "Check answer"})`, click twice for scoring
- Focus state: `input.focus()` directly on the textarea element

**Decorator choice:** `ServerItemRendererWithDebugUI` (Option B) — expression is a scorable widget, and interactions stories need a Check answer button to capture graded states. Consistent with the existing `expression.stories.tsx`.

**Story reasoning — initial state vs interactions:**

Initial state (no play function needed):
- `DefaultEmpty` — empty input, basic button set, `buttonsVisible` defaults to focused (buttons hidden). Captures base visual state.
- `WithVisibleLabel` — renders `BodyText` label above the input. Verifies label layout.
- `WithButtonsAlwaysVisible` — full button sets always shown. Captures the most visually complex static state (math keyboard buttons).
- `RightToLeftWithLabel` — RTL with visible label text. Label text and layout direction changes with RTL; math input is inherently LTR regardless.

Interactions (play function required):
- `FocusedWithButtons` — focus the textarea with `buttonsVisible: "focused"`. Captures focus ring AND buttons appearing on focus.
- `CorrectAnswerGraded` — type "123" (matching answer form), click Check twice → green correct state.
- `IncorrectAnswerGraded` — type "456" (non-matching), click Check twice → red incorrect state.

**Files created:**
1. `packages/perseus/src/widgets/__testutils__/expression-renderer-decorator.tsx` — uses `ServerItemRendererWithDebugUI`
2. `packages/perseus/src/widgets/expression/__docs__/expression-initial-state-regression.stories.tsx` — 4 stories: `DefaultEmpty`, `WithVisibleLabel`, `WithButtonsAlwaysVisible`, `RightToLeftWithLabel`
3. `packages/perseus/src/widgets/expression/__docs__/expression-interactions-regression.stories.tsx` — 3 stories: `FocusedWithButtons`, `CorrectAnswerGraded`, `IncorrectAnswerGraded`

---

## Step 3 — Pre-Push Quality Checks — Regression Stories

- `pnpm lint` — PASS (3 prettier trailing-newline errors auto-fixed by running `pnpm prettier . --write`)
- `pnpm tsc` — PASS (no output, exit 0)
- `pnpm test` — PASS (480 suites, 6583 passed, 38 skipped, 0 failures)

> **User action required for interaction stories:** Run `pnpm storybook` locally and verify the `FocusedWithButtons`, `CorrectAnswerGraded`, and `IncorrectAnswerGraded` play functions complete without errors (green checkmarks in Addons → Interactions tab). Verify `FocusedWithButtons` shows the input focused with buttons visible, `CorrectAnswerGraded` shows the green correct state, and `IncorrectAnswerGraded` shows the red incorrect state.

**Post Storybook Review — Stories Revised:**

User feedback after reviewing stories in Storybook:
- `RightToLeftWithLabel` — removed; RTL doesn't meaningfully change the expression widget layout (math input stays LTR regardless)
- `WithButtonsAlwaysVisible` (initial state) — removed; the keypad popup doesn't visually show in the initial state canvas
- `CorrectAnswerGraded` / `IncorrectAnswerGraded` — removed; these only change the debug score footer, not the widget itself, which is not content-representative
- `FocusedWithButtons` — renamed to `FocusedInput`; shows focus ring state on the math input border
- Added 4 keypad tab stories to interactions: `KeypadOpenNumbersTab`, `KeypadOpenOperatorsTab`, `KeypadOpenGeometryTab`, `KeypadOpenExtrasTab`

**Research for revised stories:**
- Examined `packages/perseus/src/components/math-input.tsx` — desktop MathInput renders a WonderBlocks `Popover` containing a `DesktopKeypad`. Popover content renders into a React portal. Toggle button has `aria-label="open math keypad"` / `"close math keypad"`.
- Examined `packages/math-input/src/components/keypad/keypad.tsx` — uses WonderBlocks `Tabs` with tabs: Numbers (always), Operators (prealgebra/logarithms), Geometry (trig), Extras (extraKeys)
- Examined `packages/math-input/src/components/keypad/utils/get-available-tabs.tsx` — confirmed tab availability logic
- Examined keypad tests — tabs are queried with `getByLabelText("Operators")` etc. (tabs have `aria-label` set)
- Portal elements queried via `within(document.body).getByLabelText(...)`; `within` imported from `"storybook/test"`

**Revised file contents:**

`expression-initial-state-regression.stories.tsx` — 2 stories:
- `DefaultEmpty` — empty input, no label
- `WithVisibleLabel` — with visible label

`expression-interactions-regression.stories.tsx` — 5 stories:
- `FocusedInput` — focus textbox, shows blue focus ring
- `KeypadOpenNumbersTab` — click open button, Numbers tab (default) visible
- `KeypadOpenOperatorsTab` — open, click Operators tab (prealgebra/logarithms buttons)
- `KeypadOpenGeometryTab` — open, click Geometry tab (trig buttons)
- `KeypadOpenExtrasTab` — open, click Extras tab (x, y variable buttons)

**Quality checks after revision:**
- `pnpm lint` — PASS (trailing newlines fixed by prettier)
- `pnpm tsc` — PASS (exit 0, no errors)
- `pnpm test` — PASS (480 suites, 6583 passed, 38 skipped, 0 failures)

**Final story additions (scope expanded to cover MathInput and KeypadInputWithInterface colors):**

Research findings:
- `KeypadInput` (mobile, `packages/math-input/src/components/input/math-input.tsx`) has `backgroundColor: "white"` (hardcoded — migration target), plus semantic border/text colors
- Desktop `MathInput` hover state: `semanticColor.action.primary.progressive.hover.background` on the toggle icon fill — not yet covered
- Mobile stories require `apiOptions.customKeypad: true` — updated decorator to pass `parameters?.apiOptions` to `ServerItemRendererWithDebugUI`
- Text in field cannot be initial state (no `initialUserInput` support in `ServerItemRendererWithDebugUI`) — must be interaction story

Files changed:
- `expression-renderer-decorator.tsx` — added `apiOptions={parameters?.apiOptions}` pass-through
- `expression-initial-state-regression.stories.tsx` — added `MobileInputDefault` (uses `parameters.apiOptions: {customKeypad: true}`)
- `expression-interactions-regression.stories.tsx` — added `IconButtonHovered`, `WithTextInField`, `MobileInputFocused`

**Final story count:**
- Initial state: `DefaultEmpty`, `WithVisibleLabel`, `MobileInputDefault`
- Interactions: `FocusedInput`, `KeypadOpenNumbersTab`, `KeypadOpenOperatorsTab`, `KeypadOpenGeometryTab`, `KeypadOpenExtrasTab`, `IconButtonHovered`, `WithTextInField`, `MobileInputFocused`

**Quality checks after final additions:**
- `pnpm lint` — PASS
- `pnpm tsc` — PASS
- `pnpm test` — PASS (480 suites, 6583 passed, 38 skipped, 0 failures)