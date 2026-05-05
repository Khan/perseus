# Figma Token Lookup

## Expected Progress Report Output
- The widget's Figma page ID
- All CSS color states found in the widget code
- All Figma state nodes found, with their node IDs
- A mapping of each code state to its closest Figma state
- The color tokens extracted per state via `get_variable_defs`
- A final token mapping table (one row per color found in the audit)
- Code states with no Figma counterpart, flagged for design

## GATE CHECK
**Before proceeding to the color conversion step**: The progress report must have a completed token mapping table with a target token and source (Figma or mapping table) for every color found in the audit.

## Actions to Take

### 1. Find the widget's Figma page

The Perseus Widgets Figma file is: `https://www.figma.com/design/HlLQJqNeMTLenuDfkyzYzE/Perseus-Widgets`

Look up the widget's page ID in the table in `visual-check.md`.

If the widget is **not in the table**, record "No Figma design found" in the progress report and proceed using the mapping table in `color-conversion-rules.md` for all conversions.

### 2. Get the page structure

Call `get_metadata` with the widget's page ID to identify state nodes:

```
get_metadata(fileKey: "HlLQJqNeMTLenuDfkyzYzE", nodeId: "<page-id>")
```

Look for nodes named with state labels (e.g. `State=Unanswered`, `State=Answered`, `State=Expanded`). Record the node ID for each state node found.

### 3. Map code states to Figma states

Read the widget's StyleSheet to list all CSS states that involve color (e.g. `markerFilled`, `markerCorrect`, `markerIncorrect`).

For each code state, identify the closest matching Figma state node. Record code states that have no Figma counterpart — these are gaps to flag for design.

### 4. Extract color tokens from each Figma state

For each state node, call `get_variable_defs`:

```
get_variable_defs(fileKey: "HlLQJqNeMTLenuDfkyzYzE", nodeId: "<state-node-id>")
```

Focus on:
- Keys starting with `semanticColor.` — use these directly as the target token
- Keys starting with `1 - Core/` — look up the equivalent `semanticColor` path in `color-conversion-rules.md`

### 5. Build the token mapping table

For each color found in the audit (Step 1), determine the target token using this priority order:

1. **Figma specifies the token** → use it. Figma is the source of truth.
2. **No Figma state covers this color** → use the mapping table in `color-conversion-rules.md`, then verify with `semantic-check.md`.

Record the result in the progress report as a table:

| Hardcoded value | CSS property | Figma state | Target token | Source |
|---|---|---|---|---|
| `#ECF3FE` | `backgroundColor` | Answered | `semanticColor.core.background.instructive.default` | Figma |
| `rgba(33,36,44,0.32)` | `background` | No Figma state | `semanticColor.core.border.neutral.default` | Mapping table |

### 6. Flag code states with no Figma coverage

For any code state with no corresponding Figma state, record it in the progress report as:

> **Design gap:** `[state name]` in `[file]` — no Figma state found. Token chosen from mapping table. Recommend design adds this state to the Figma widget page.