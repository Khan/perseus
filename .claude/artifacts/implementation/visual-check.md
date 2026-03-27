# Visual Check

## Expected Progress Report Output
- List the Figma node IDs examined and the states they represent
- For each state, list the color and font tokens found in Figma via `get_variable_defs`
- For each state, include the Figma screenshot from `get_design_context`
- Include the Storybook screenshot for the corresponding story
- List any discrepancies found between Figma and the rendered widget
- List any tokens present in Figma that are absent or different in the widget code

## GATE CHECK
**Before marking this step complete**: Every widget state that has a corresponding Figma design must be checked. Discrepancies must be recorded in the progress report even if they are pre-existing (i.e. not introduced by this migration). The goal is an accurate record, not a perfect score.

## Actions to Take

### 1. Find the widget's Figma page

The Perseus Widgets Figma file is: `https://www.figma.com/design/HlLQJqNeMTLenuDfkyzYzE/Perseus-Widgets`

The known page list is:
| Widget | Page ID |
|---|---|
| Choice | `2048:105` |
| Definition | `2330:1320` |
| Dropdown | `2322:1484` |
| Explanation | `2330:1319` |
| Expression | `2331:1337` |
| Image | `2284:105` |
| Interactive Graph | `9:3` |
| Label Image | `2485:4353` |
| Matcher | `2476:4165` |
| Math Keypad | `2393:270` |
| Number Line | `2496:7888` |
| Numeric Input | `2331:1338` |
| Sorter | `2468:1093` |
| Shared | `2493:7214` |

If the widget does not appear in this list, skip the Figma steps and note "No Figma design found" in the progress report.

### 2. Get the page structure

Call `get_metadata` with the widget's page ID to identify the top-level frames and their child state nodes:

```
get_metadata(fileKey: "HlLQJqNeMTLenuDfkyzYzE", nodeId: "<page-id>")
```

This returns a tree of frames and symbols. Look for nodes named with state labels (e.g. `State=Unanswered`, `State=Answered`, `State=Expanded`, `State=Correct`, `State=Incorrect`). Record the node ID for each state you find.

### 3. Extract design tokens for each state

For each state node ID, call `get_variable_defs`:

```
get_variable_defs(fileKey: "HlLQJqNeMTLenuDfkyzYzE", nodeId: "<state-node-id>")
```

This returns a flat map of token names to values, e.g.:
```json
{
  "semanticColor.core.background.instructive.default": "#5753fa",
  "1 - Core/Foreground/Neutral/Strong": "#191918",
  "Body/Font Size/xSmall": "12",
  "Weights/Medium": "500"
}
```

Focus on:
- Keys starting with `semanticColor.` or `1 - Core/` — these are color tokens
- Keys starting with `Body/Font Size`, `Body/Line Height`, `Weights/` — these are font tokens

Record all color and font token values found.

### 4. Get the Figma screenshot for each state

For each state node ID, call `get_design_context`:

```
get_design_context(fileKey: "HlLQJqNeMTLenuDfkyzYzE", nodeId: "<state-node-id>")
```

This returns a screenshot of that state. Save it in the progress report as a visual reference.

Note: `get_design_context` may fail for some nodes (complex components can error). If it fails, rely on `get_variable_defs` alone for that state.

### 5. Get the rendered Storybook screenshot

Navigate to the widget's initial-state regression story in Storybook. The story URL pattern is:

```
http://localhost:6006/?path=/story/widgets-[widget-name]-visual-regression-tests-initial-state--[story-name]
```

Take a screenshot using the Storybook MCP. If the widget has interaction states (e.g. a marker in the open/expanded state), also navigate to the interactions regression story and trigger the relevant play function.

### 6. Compare Figma tokens against widget code

For each color and font token found in step 3, check whether the widget code uses the equivalent `semanticColor` token:

- Figma token `semanticColor.core.background.instructive.default` → widget should use `semanticColor.core.background.instructive.default`
- Figma token `1 - Core/Background/Base/Default` → look up the equivalent `semanticColor` path in the conversion rules
- Figma font token `Body/Font Size/xSmall: 12` → widget should use the corresponding `font` token rather than a hardcoded value

For each token:
- **Match** — token in code matches Figma. Record as confirmed.
- **Mismatch** — token in code differs from Figma. Record the discrepancy and whether it was introduced by this migration or was pre-existing.
- **Missing** — a color or font is present in Figma but hardcoded or absent in the widget code. Record as a finding.

### 7. Compare screenshots visually

Look at the Figma screenshot and the Storybook screenshot side by side. Note any visible color or font differences not already captured by the token comparison. Pay particular attention to:
- States that could not be covered by `get_variable_defs` (e.g. hover, focus)
- Composite colors (shadows, overlays) that may not appear as named tokens