# Color Token Migration Research

Research summary covering Wonder Blocks color documentation, the Core color mapping Confluence page, and two example PRs demonstrating the color-to-semantic-color conversion pattern.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

---

## 1. Wonder Blocks Storybook — Semantic Color Docs

**URL:** https://khan.github.io/wonder-blocks/?path=/docs/foundations-using-color--docs

The Storybook page is a live token table that renders all `semanticColor` tokens with their CSS variable names and hex values. The shell page itself doesn't contain readable content via scraping (it's a Storybook SPA), but the source stories file documents the usage pattern clearly:

### Core usage pattern

```ts
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

const styles = {
    background: semanticColor.core.background.base.subtle,
    border: semanticColor.core.border.neutral.default,
    color: semanticColor.core.foreground.neutral.strong,
};
```

### Key rule from the docs

> Please avoid using primitive colors or hardcoded hex values since these won't be themable!

Semantic colors are the **only** tokens that support theming (e.g. Shape Your Learning / ThunderBlocks dark mode). Using `color.blue` directly will not theme correctly.

---

## 2. Core Colors Confluence Page

**URL:** https://khanacademy.atlassian.net/wiki/spaces/WB/pages/4049666283/Core

This is the canonical reference mapping legacy primitive color tokens (and raw hex values) to semantic tokens. It covers three contexts — Background, Border, and Foreground — and three theme columns: SYL Light, SYL Dark, and Legacy.

For migration purposes, the **Legacy column** is what currently exists in the codebase. The **SYL Light** column is the `semanticColor` token that replaces it (the default/light theme).

### Background Tokens

| Legacy token | Hex | Semantic token |
|---|---|---|
| `color.offWhite` | `#F7F8FA` | `semanticColor.core.background.base.subtle` |
| `color.white` | `#FFFFFF` | `semanticColor.core.background.base.default` |
| `color.fadedBlue16` | `#DAE6FD` | `semanticColor.core.background.base.strong` |
| `color.fadedBlue8` | `#EDF3FE` | `semanticColor.core.background.instructive.subtle` |
| `color.blue` | `#1865F2` | `semanticColor.core.background.instructive.default` |
| `color.activeBlue` | `#1B50B3` | `semanticColor.core.background.instructive.strong` |
| `color.fadedOffBlack8` | `#ededee` | `semanticColor.core.background.neutral.subtle` |
| `color.fadedOffBlack72` | `#5F6167` | `semanticColor.core.background.neutral.default` |
| `color.offBlack` | `#21242C` | `semanticColor.core.background.neutral.strong` |
| `color.fadedRed8` | `#FCEEEC` | `semanticColor.core.background.critical.subtle` |
| `color.red` | `#D92916` | `semanticColor.core.background.critical.default` |
| `color.activeRed` | `#9E271D` | `semanticColor.core.background.critical.strong` |
| `color.fadedGreen8` | `#EBF8EC` | `semanticColor.core.background.success.subtle` |
| `color.green` | `#00A60E` | `semanticColor.core.background.success.default` |
| `color.activeGreen` | `#0b7c18` | `semanticColor.core.background.success.strong` |
| `color.fadedGold8` | `#FFF9EB` | `semanticColor.core.background.warning.subtle` |
| `color.fadedGold24` | `#FFECC2` | `semanticColor.core.background.warning.default` |
| `color.gold` | `#FFB100` | `semanticColor.core.background.warning.strong` |
| `color.transparent` | — | `semanticColor.core.background.disabled.subtle` |
| `color.fadedOffBlack8` | `#ededee` | `semanticColor.core.background.disabled.default` |
| `color.fadedOffBlack16` | `#DBDCDD` | `semanticColor.core.background.disabled.strong` |
| `color.offBlack50` | `#909296` | `semanticColor.core.background.overlay.default` |

### Border Tokens

| Legacy token | Hex | Semantic token |
|---|---|---|
| `color.fadedBlue` | `#B5CEFB` | `semanticColor.core.border.instructive.subtle` |
| `color.blue` | `#1865F2` | `semanticColor.core.border.instructive.default` |
| `color.activeBlue` | `#1B50B3` | `semanticColor.core.border.instructive.strong` |
| `color.fadedOffBlack16` | `#dbdcdd` | `semanticColor.core.border.neutral.subtle` |
| `color.fadedOffBlack50` | `#909296` | `semanticColor.core.border.neutral.default` |
| `color.fadedOffBlack72` | `#5F6167` | `semanticColor.core.border.neutral.strong` |
| `color.fadedRed24` | `#F6CCC7` | `semanticColor.core.border.critical.subtle` |
| `color.red` | `#D92916` | `semanticColor.core.border.critical.default` |
| `color.activeRed` | `#9E271D` | `semanticColor.core.border.critical.strong` |
| `color.fadedGreen24` | `#c2eac5` | `semanticColor.core.border.success.subtle` |
| `color.green` | `#00A60E` | `semanticColor.core.border.success.default` |
| `color.activeGreen` | `#0b7c18` | `semanticColor.core.border.success.strong` |
| `color.fadedGold24` | `#FFECC2` | `semanticColor.core.border.warning.subtle` |
| `color.gold` | `#FFB100` | `semanticColor.core.border.warning.default` |
| `color.activeGold` | `#b8840e` | `semanticColor.core.border.warning.strong` |
| `color.transparent` | — | `semanticColor.core.border.disabled.subtle` |
| `color.fadedOffBlack16` | `#DBDCDD` | `semanticColor.core.border.disabled.default` |
| `color.faded0ffBlack32` | `#B8B9BB` | `semanticColor.core.border.disabled.strong` |
| `color.white` | `#FFFFFF` | `semanticColor.core.border.knockout.default` |

### Foreground Tokens

| Legacy token | Hex | Semantic token |
|---|---|---|
| `color.fadedBlue` | `#B5CEFB` | `semanticColor.core.foreground.instructive.subtle` |
| `color.blue` | `#1865F2` | `semanticColor.core.foreground.instructive.default` |
| `color.activeBlue` | `#1B50B3` | `semanticColor.core.foreground.instructive.strong` |
| `color.fadedOffBlack64` | `#717378` | `semanticColor.core.foreground.neutral.subtle` |
| `color.fadedOffBlack72` | `#5F6167` | `semanticColor.core.foreground.neutral.default` |
| `color.offBlack` | `#21242C` | `semanticColor.core.foreground.neutral.strong` |
| `color.fadedOffBlack16` | `#DBDCDD` | `semanticColor.core.foreground.disabled.subtle` |
| `color.faded0ffBlack32` | `#B8B9BB` | `semanticColor.core.foreground.disabled.default` |
| `color.fadedOffBlack50` | `#909296` | `semanticColor.core.foreground.disabled.strong` |
| `color.fadedRed` | `#F3BBB4` | `semanticColor.core.foreground.critical.subtle` |
| `color.red` | `#D92916` | `semanticColor.core.foreground.critical.default` |
| `color.activeRed` | `#9E271D` | `semanticColor.core.foreground.critical.strong` |
| `color.fadedGreen24` | `#C2EAC5` | `semanticColor.core.foreground.success.subtle` |
| `color.green` | `#00A60E` | `semanticColor.core.foreground.success.default` |
| `color.activeGreen` | `#0b7c18` | `semanticColor.core.foreground.success.strong` |
| `color.fadedGold24` | `#FFECC2` | `semanticColor.core.foreground.warning.subtle` |
| `color.gold` | `#FFB100` | `semanticColor.core.foreground.warning.default` |
| `color.activeGold` | `#b8840e` | `semanticColor.core.foreground.warning.strong` |
| `color.white` | `#FFFFFF` | `semanticColor.core.foreground.knockout.default` |

---

## 3. PR #2899 — Definition Widget Color Conversion

**URL:** https://github.com/Khan/perseus/pull/2899
**Title:** [Color - NAW] Refactor Definition widget to use semantic colors

This PR migrated a single widget (`packages/perseus/src/widgets/definition/definition.tsx`) as an early example of the pattern. It also added Chromatic regression stories.

### What changed

**Import change:**
```diff
- import {color} from "@khanacademy/wonder-blocks-tokens";
+ import {font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
```

**Inline style conversions:**
```diff
- color: color.blue,
+ color: semanticColor.core.foreground.instructive.default,

- borderBottom: `2px solid ${color.blue}`
+ borderBottom: `2px solid ${semanticColor.core.border.instructive.default}`
```

**StyleSheet conversions (also included font token migration):**
```diff
  tooltipBody: {
-     color: color.offBlack,
-     fontSize: 20,
-     fontWeight: 500,
-     lineHeight: "30px",
+     color: semanticColor.core.foreground.neutral.strong,
+     fontSize: font.body.size.medium,
+     fontWeight: font.weight.medium,
+     lineHeight: font.body.lineHeight.large,
  },
```

### Key patterns from this PR

- The same legacy `color.blue` maps differently depending on CSS property: `foreground.instructive.default` for `color:` and `border.instructive.default` for `borderColor:`/`border:`.
- Context matters: the CSS property name determines which of the three semantic contexts (`foreground`, `background`, `border`) to use.
- Both Aphrodite `StyleSheet.create()` objects and inline `style={{}}` objects are migrated the same way.

---

## 4. PR #3246 — Bulk Migration in Perseus and Perseus-Editor

**URL:** https://github.com/Khan/perseus/pull/3246
**Title:** [WB-1998.2] Migrate color to semanticColor in perseus

This PR is the large-scale migration covering 30 files across `packages/perseus` and `packages/perseus-editor`. It references the Confluence Core mapping page and the WB docs as the source of truth.

### Patterns observed across all 30 files

**Import pattern — single named export replaced:**
```diff
- import {color} from "@khanacademy/wonder-blocks-tokens";
+ import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

// aliased imports are handled the same way:
- import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
+ import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

// multiple specifiers — only color is replaced:
- import {color, sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
+ import {semanticColor, sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
```

**Specific conversions observed in PR #3246 diffs:**

| Legacy | CSS context | Semantic |
|---|---|---|
| `color.white` / `wbColor.white` | `backgroundColor` | `semanticColor.core.background.base.default` |
| `color.offWhite` | `background` | `semanticColor.core.background.base.subtle` |
| `color.white50` | `background` | `semanticColor.core.background.base.subtle` |
| `color.white` | `fill` / `stroke` | `semanticColor.core.foreground.knockout.default` |
| `color.offBlack8` / `color.fadedOffBlack8` | `backgroundColor` | `semanticColor.core.background.neutral.subtle` |
| `color.offBlack16` / `color.fadedOffBlack16` | `backgroundColor` | `semanticColor.core.border.neutral.subtle` (see note) |
| `color.offBlack16` / `color.fadedOffBlack16` | `border`/`borderTop`/`borderBottom` | `semanticColor.core.border.neutral.subtle` |
| `color.offBlack32` / `color.fadedOffBlack32` | `border` | `semanticColor.core.border.neutral.subtle` |
| `color.offBlack50` / `color.fadedOffBlack50` | `borderColor` | `semanticColor.core.border.neutral.default` |
| `color.offBlack64` / `color.fadedOffBlack64` | `color` | `semanticColor.core.foreground.neutral.subtle` |
| `color.offBlack` | `color` | `semanticColor.core.foreground.neutral.strong` |
| `color.blue` | `color` | `semanticColor.core.foreground.instructive.default` |
| `color.blue` | `border` | `semanticColor.core.border.instructive.default` |
| `color.fadedBlue8` | `backgroundColor` | `semanticColor.core.background.instructive.subtle` |
| `color.fadedBlue16` | `backgroundColor` | `semanticColor.core.background.instructive.subtle` |
| `color.red` | `color` | `semanticColor.core.foreground.critical.default` |
| `color.red` | `borderColor` | `semanticColor.core.border.critical.default` |
| `color.fadedRed8` / `color.fadedRed16` | `backgroundColor` | `semanticColor.core.background.critical.subtle` |
| `color.fadedGreen8` / `color.fadedGreen16` | `backgroundColor` | `semanticColor.core.background.success.subtle` |
| `color.offWhite` (used as outline on swatches) | `outline` | `semanticColor.focus.inner` |
| `color.blue` (used as focus ring) | `border` for focused state | `semanticColor.focus.outer` |
| `color.offBlack16` (default/unfocused border) | `border` | `semanticColor.core.border.neutral.subtle` |

> **Note on `offBlack16` as `backgroundColor`:** When `offBlack16` is used for `backgroundColor` in a horizontal rule (height: 1) or divider, it was mapped to `semanticColor.core.border.neutral.subtle` rather than the background namespace — this is intentional because visually it's acting as a border/divider.

**The `semanticColor.focus.inner/outer` pattern:**

Focus ring colors use a dedicated namespace:
- `semanticColor.focus.outer` = `color.blue` (the outer focus ring color)
- `semanticColor.focus.inner` = `color.white` (the inner/gap color, also used for swatch outlines)

---

## 5. Wonder-Blocks Codemod Transform

**File:** `wb-codemod/transforms/migrate-color-to-semantic-color.ts` in wonder-blocks PR #2847

This is an AST-based jscodeshift transform that automates the migration. It is the authoritative machine-readable expression of the mapping rules.

### How the transform works

1. Finds files importing `color` from `@khanacademy/wonder-blocks-tokens`
2. Replaces the `color` import specifier with `semanticColor`
3. For each `color.X` member expression, determines the CSS context by walking up the AST to find the enclosing object property key name
4. Selects the correct semantic path from a lookup table based on `(colorName, cssPropertyContext)`
5. Builds a new chained member expression (e.g. `semanticColor.core.foreground.instructive.default`)
6. If context cannot be determined, the transform leaves the token as `semanticColor.X` (partial migration, must be resolved manually)

### Context determination rules

The transform uses these CSS property name → context mappings:

| CSS property | Context |
|---|---|
| `color`, `fill`, `stroke`, anything containing `textColor` | `foreground` |
| `background`, `backgroundColor`, `backgroundImage`, anything containing `background` | `background` |
| `border`, `borderColor`, `borderTopColor`, `borderBottomColor`, `borderLeftColor`, `borderRightColor`, and all logical border variants, `outline`, `outlineColor`, anything containing `border` | `border` |

### Complete color mapping table from the codemod

This is the full `COLOR_TO_SEMANTIC_MAPPING` from the transform source:

#### Instructive (blue)

| Legacy | Foreground | Background | Border |
|---|---|---|---|
| `color.blue` | `core.foreground.instructive.default` | `core.background.instructive.default` | `core.border.instructive.default` |
| `color.fadedBlue` | `core.foreground.instructive.subtle` | `core.background.instructive.subtle` | `core.border.instructive.subtle` |
| `color.activeBlue` | `core.foreground.instructive.strong` | `core.background.instructive.strong` | `core.border.instructive.strong` |
| `color.fadedBlue8` | `core.foreground.instructive.subtle` | `core.background.instructive.subtle` | `core.border.instructive.subtle` |
| `color.fadedBlue16` | `core.foreground.instructive.subtle` | `core.background.base.strong` | `core.border.instructive.subtle` |

#### Neutral (gray/black)

| Legacy | Foreground | Background | Border |
|---|---|---|---|
| `color.offBlack` | `core.foreground.neutral.strong` | `core.background.neutral.strong` | `core.border.neutral.strong` |
| `color.fadedOffBlack8` / `offBlack8` | `core.foreground.neutral.subtle` | `core.background.neutral.subtle` | `core.border.neutral.subtle` |
| `color.fadedOffBlack16` / `offBlack16` | `core.foreground.disabled.subtle` | `core.background.neutral.subtle` | `core.border.neutral.subtle` |
| `color.fadedOffBlack32` / `offBlack32` | `core.foreground.disabled.default` | `core.background.disabled.strong` | `core.border.neutral.subtle` |
| `color.fadedOffBlack50` / `offBlack50` | `core.foreground.disabled.strong` / `neutral.default` | `core.background.neutral.default` | `core.border.neutral.default` |
| `color.fadedOffBlack64` / `offBlack64` | `core.foreground.neutral.subtle` | `core.background.neutral.default` | `core.border.neutral.default` |
| `color.fadedOffBlack72` / `offBlack72` | `core.foreground.neutral.default` | `core.background.neutral.default` | `core.border.neutral.default` |

#### Critical (red)

| Legacy | Foreground | Background | Border |
|---|---|---|---|
| `color.red` | `core.foreground.critical.default` | `core.background.critical.default` | `core.border.critical.default` |
| `color.activeRed` | `core.foreground.critical.strong` | `core.background.critical.strong` | `core.border.critical.strong` |
| `color.fadedRed8` | `core.foreground.critical.subtle` | `core.background.critical.subtle` | `core.border.critical.subtle` |
| `color.fadedRed16` | `core.foreground.critical.subtle` | `core.background.critical.subtle` | `core.border.critical.subtle` |
| `color.fadedRed24` | `core.foreground.critical.subtle` | `core.background.critical.subtle` | `core.border.critical.subtle` |

#### Success (green)

| Legacy | Foreground | Background | Border |
|---|---|---|---|
| `color.green` | `core.foreground.success.default` | `core.background.success.default` | `core.border.success.default` |
| `color.activeGreen` | `core.foreground.success.strong` | `core.background.success.strong` | `core.border.success.strong` |
| `color.fadedGreen8` / `fadedGreen16` / `fadedGreen24` | `core.foreground.success.subtle` | `core.background.success.subtle` | `core.border.success.subtle` |

#### Warning (gold)

| Legacy | Foreground | Background | Border |
|---|---|---|---|
| `color.gold` | `core.foreground.warning.default` | `core.background.warning.default` | `core.border.warning.default` |
| `color.activeGold` | `core.foreground.warning.strong` | `core.background.warning.strong` | `core.border.warning.strong` |
| `color.fadedGold8` / `fadedGold16` / `fadedGold24` | `core.foreground.warning.subtle` | `core.background.warning.subtle` | `core.border.warning.subtle` |

#### Base (white/offWhite)

| Legacy | Foreground | Background | Border |
|---|---|---|---|
| `color.white` | `core.foreground.knockout.default` | `core.background.base.default` | `core.border.knockout.default` |
| `color.offWhite` | `core.foreground.knockout.default` | `core.background.base.subtle` | `core.border.knockout.default` |

#### Special

| Legacy | All contexts |
|---|---|
| `color.eggplant` | `khanmigo.primary` |
| `color.fadedEggplant8` | `khanmigo.secondary` |
| `color.purple` | `mastery.primary` |

#### Colors with NO semantic mapping (codemod skips these)

- `color.darkBlue`
- `color.teal`
- `color.fadedPurple8`
- `color.fadedPurple16`
- `color.fadedPurple24`
- `color.white64`

These must be handled manually or left as primitive tokens for now.

---

## Summary: Key Rules for Manual Conversion

1. **Always import `semanticColor` from `@khanacademy/wonder-blocks-tokens`** — never import `color` directly.

2. **Determine context from the CSS property:**
   - Text/icon → `foreground`
   - Fill/background → `background`
   - Border/outline → `border`

3. **Determine semantic category from the color's meaning:**
   - Blue family → `instructive`
   - Gray/black family → `neutral` (or `disabled` for the faded variants)
   - Red family → `critical`
   - Green family → `success`
   - Gold family → `warning`
   - White/offWhite → `base` or `knockout`

4. **Determine intensity:**
   - Fully saturated (`color.blue`, `color.red`, etc.) → `default`
   - Faded/light variants (`fadedBlue8`, `fadedRed8`, etc.) → `subtle`
   - Active/dark variants (`activeBlue`, `activeRed`, etc.) → `strong`

5. **Use `semanticColor.focus.outer` for focus ring borders and `semanticColor.focus.inner` for the inner/gap/outline color** (replaces `color.blue` and `color.white` in focus contexts respectively).

6. **`color.white` used as a background defaults to `semanticColor.core.background.base.default`** — the `knockout.default` variant in the background namespace doesn't exist; `knockout` only exists for foreground and border.

7. **When a color is used for a 1px height divider/rule**, use `border.neutral.subtle` even if the CSS property is `backgroundColor` — the semantic intent is a divider/border.