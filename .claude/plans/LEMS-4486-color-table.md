## Color changes

Affects the **function type selector buttons** in the Grapher widget — the row of buttons a learner uses to pick a function type on a "Learner Picks Type" graph. Rendered by `ButtonGroup` at [`grapher.tsx:571`](packages/perseus/src/widgets/grapher/grapher.tsx#L571); all colors live in [`button-group.tsx:112-146`](packages/perseus/src/components/button-group.tsx#L112-L146).

Before, every value was a hardcoded literal, so it resolved identically in both themes — that's the bug: there was no variable for SYL dark mode to swap.

| Button state | Property | Before (both themes) | After — light | After — syl-dark | Token |
|---|---|---|---|---|---|
| Resting | background | `#ffffff` | `#ffffff` | `#252531` | `core.background.base.default` |
| Resting | border | `#cccccc` | `#dbdcdd` | `#4A4C53` | `core.border.neutral.subtle` |
| Resting | text | *(inherited)* | `#21242c` | `#EDEDEE` | `core.foreground.neutral.strong` |
| Hover | background | `#cccccc` | `#ededee` | `#4A4C53` | `core.background.neutral.subtle` |
| Selected | background | `#dddddd` | `#edf3fe` | `#222149` | `core.background.instructive.subtle` |
| Disabled | background | `#ededee`¹ | `#ededee` | `#4A4C53` | `core.background.disabled.default` |

¹ Disabled was already tokenized before this change (PR #3787) — listed for completeness only.

Also: border width `1px` → `border.width.thin`, corner radius `3px` → `border.radius.radius_040` (`4px`; there is no 3px token).

### Two notes for reviewers

**Selected changes appearance in light mode** — grey `#dddddd` → pale blue `#edf3fe`. Deliberate: `core.background.neutral.subtle` would have been closer to the old grey, but it resolves to `#4A4C53` in dark mode, identical to the hover background, making selected and hover indistinguishable. Pale blue matches the repo's established selected/active treatment (`sortable.tsx:872-921` `dragging`, `keypad-button.tsx:119` `pressed`, `segmented-control.module.css`).

**Selected uses `.subtle`, not `.default` + knockout text** — unlike the recent label-image fix. `ButtonGroup` exposes a `selectedButtonStyle` prop, and [`expression-editor.tsx:636-645`](packages/perseus-editor/src/widgets/expression-editor/expression-editor.tsx#L636-L645) passes overrides that set **only** `backgroundColor`. A saturated base + knockout white text would leave that white text stranded on the override's pale background — a contrast failure in the expression editor. `.subtle` keeps the default text color and stays compatible with all existing overrides.

### Verification

Token values resolve to `""` under jsdom (see `grapher.test.ts:51-56`), so unit tests cannot confirm color. Checked visually in Storybook via the **Theme → syl-dark** toolbar option. Note `syl-dark` is not in `themeModes` (`.storybook/modes.ts:29-32`), so Chromatic does not cover dark mode for this component.