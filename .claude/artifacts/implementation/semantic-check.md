# Semantic Check

## Expected Progress Report Output
- For each converted token, document:
  - The token that was changed and the file it's in
  - What the element is and what it's doing in context
  - Why the chosen semantic token is (or is not) a confident match
  - Any judgment calls or remaining uncertainty
- Provide an updated table from step 5.

## GATE CHECK
**Before marking this step complete**: Every converted token must have a documented semantic justification in the progress report — not just a mapping table match. The table tells you what the color becomes in the SYL theme; this step asks whether the *meaning* of the new token fits the *purpose* of that color in the UI.

## Actions to Take

For each token converted in Step 5, ask:

1. **What is this element doing?**
   - Is it a background fill, a border, a text color, an icon?
   - What state is it communicating — default, active, correct, incorrect, disabled, decorative?

2. **Does the semantic category fit?**
   - `instructive` — user is being guided or is in an interactive selection state
   - `success` — something is correct or complete
   - `critical` — something is wrong or needs attention
   - `neutral` — default, subdued, or decorative
   - `disabled` — element is not interactable
   - `knockout` — element appears on a colored background and needs to contrast against it

3. **Does the intensity fit?**
   - `subtle` — light tint, background wash, or secondary indicator
   - `default` — standard use of that semantic color
   - `strong` — filled, solid, or emphasized use of that semantic color

4. **Does the namespace fit the CSS property?**
   - `background` / `backgroundColor` → use `background` namespace (exception: decorative separators/dividers may use `border` namespace)
   - `border`, `outline` → use `border` namespace
   - `color`, `fill`, `stroke` → use `foreground` namespace

Flag any token where you cannot confidently answer all four questions. Record your reasoning in the progress report regardless of confidence level.

