## Color Conversion Rules

## Expected Progress Report Output
- List all initial files accessed for research and the insights found from those files
- List all tokens that were converted and the files they were in
- List any tokens that require manual handling
- List any tokens that were tricky or that required you to make decisions based on information not provided in the docs
  - Include the reasoning behind the decisions and/or why they were tricky and how that affected your reasoning

## GATE CHECK
**Before creating any files**: Update the progress report with the research you've done so far (files examined, test data discovered, import paths
verified, interaction patterns identified).

### Determining context from CSS property

| CSS property | Context |
|---|---|
| `color`, `fill`, `stroke`, anything with `textColor` | `foreground` |
| `background`, `backgroundColor`, `backgroundImage` | `background` |
| `border`, `borderColor`, `borderTop/Bottom/Left/Right`, `outline` | `border` |

### Token mapping shorthand

| Legacy token | Foreground | Background | Border |
|---|---|---|---|
| `color.blue` | `core.foreground.instructive.default` | `core.background.instructive.default` | `core.border.instructive.default` |
| `color.activeBlue` | `core.foreground.instructive.strong` | `core.background.instructive.strong` | `core.border.instructive.strong` |
| `color.fadedBlue` / `fadedBlue8` / `fadedBlue16` | `core.foreground.instructive.subtle` | `core.background.instructive.subtle` | `core.border.instructive.subtle` |
| `color.offBlack` | `core.foreground.neutral.strong` | `core.background.neutral.strong` | `core.border.neutral.strong` |
| `color.fadedOffBlack64` / `offBlack64` | `core.foreground.neutral.subtle` | `core.background.neutral.default` | `core.border.neutral.default` |
| `color.fadedOffBlack72` / `offBlack72` | `core.foreground.neutral.default` | `core.background.neutral.default` | `core.border.neutral.default` |
| `color.fadedOffBlack16` / `offBlack16` | `core.foreground.disabled.subtle` | `core.background.neutral.subtle` | `core.border.neutral.subtle` |
| `color.fadedOffBlack32` / `offBlack32` | `core.foreground.disabled.default` | `core.background.disabled.strong` | `core.border.neutral.subtle` |
| `color.fadedOffBlack50` / `offBlack50` | `core.foreground.disabled.strong` | `core.background.neutral.default` | `core.border.neutral.default` |
| `color.fadedOffBlack8` / `offBlack8` | `core.foreground.neutral.subtle` | `core.background.neutral.subtle` | `core.border.neutral.subtle` |
| `color.red` | `core.foreground.critical.default` | `core.background.critical.default` | `core.border.critical.default` |
| `color.activeRed` | `core.foreground.critical.strong` | `core.background.critical.strong` | `core.border.critical.strong` |
| `color.fadedRed8` / `fadedRed16` / `fadedRed24` | `core.foreground.critical.subtle` | `core.background.critical.subtle` | `core.border.critical.subtle` |
| `color.green` | `core.foreground.success.default` | `core.background.success.default` | `core.border.success.default` |
| `color.activeGreen` | `core.foreground.success.strong` | `core.background.success.strong` | `core.border.success.strong` |
| `color.fadedGreen8` / `fadedGreen16` / `fadedGreen24` | `core.foreground.success.subtle` | `core.background.success.subtle` | `core.border.success.subtle` |
| `color.gold` | `core.foreground.warning.default` | `core.background.warning.default` | `core.border.warning.default` |
| `color.activeGold` | `core.foreground.warning.strong` | `core.background.warning.strong` | `core.border.warning.strong` |
| `color.fadedGold8` / `fadedGold16` / `fadedGold24` | `core.foreground.warning.subtle` | `core.background.warning.subtle` | `core.border.warning.subtle` |
| `color.white` | `core.foreground.knockout.default` | `core.background.base.default` | `core.border.knockout.default` |
| `color.offWhite` | `core.foreground.knockout.default` | `core.background.base.subtle` | `core.border.knockout.default` |

All tokens are accessed as `semanticColor.[path]`, e.g. `semanticColor.core.foreground.instructive.default`.

### Special cases

- **Focus rings:** `color.blue` → `semanticColor.focus.outer` (outer ring), `color.white` → `semanticColor.focus.inner` (inner gap)
- **1px divider using `backgroundColor`:** Use `semanticColor.core.border.neutral.subtle` — the semantic intent is a border, not a background
- **`color.eggplant`** → `semanticColor.khanmigo.primary`
- **`color.purple`** → `semanticColor.mastery.primary`

### Colors with NO semantic mapping — handle manually

`color.darkBlue`, `color.teal`, `color.fadedPurple*`, `color.white64`

**Full mapping table:** `.claude/artifacts/research/color-token-migration-research.md`
