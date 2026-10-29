---
name: wonder-blocks
description: >
  Implements user interfaces using the Wonder Blocks (WB) design system — Khan Academy's
  React component library. Use this skill whenever the user asks you to build, modify,
  or review UI components in a project that uses Wonder Blocks, even when similar
  usage patterns already exist in the codebase; mentions any WB package
  (e.g. wonder-blocks-button, wonder-blocks-modal, wonder-blocks-tokens); wants to use
  or map WB tokens for colors/spacing/typography (including translating Figma designs to
  WB components and tokens); or asks how to do something "the Wonder Blocks way".
  If the user is building any kind of form, layout, modal, button, dropdown, or
  typography treatment in a WB-enabled codebase, this skill applies — even if
  they don't explicitly say "Wonder Blocks". Do NOT trigger for debugging
  TypeScript errors, writing tests, setting up Storybook stories, or fixing
  CI/lint issues in WB packages.
---

# Wonder Blocks UI Implementation

Wonder Blocks is Khan Academy's React component library (`@khanacademy/wonder-blocks-*`).
All components are TypeScript-friendly and follow WAI-ARIA
accessibility patterns.

## Implementation workflow

If the Figma MCP or WB Storybook MCP is used, use each for its purpose:

- **Figma MCP** — design specs and layout intent. Start here.
- **WB Storybook MCP** — source of truth for component APIs. Never guess prop names or token paths.
- **This skill** — foundations and general best practices for using the design system.

If the WB Storybook MCP is not available, refer to the type definitions for WB components
to learn more about the API.

> **IMPORTANT:** This skill is required even when similar patterns already exist in the
> codebase. Do not skip it because you found a nearby file to copy from.

---

## Package quick-reference

| Package | Key exports |
| --- | --- |
| `wonder-blocks-core` | `View` |
| `wonder-blocks-tokens` | `semanticColor`, `sizing`, `border`, `boxShadow`, `font`, `breakpoint` |
| `wonder-blocks-typography` | `BodyText`, `Heading` |
| `wonder-blocks-button` | `Button`, `ActivityButton` |
| `wonder-blocks-link` | `Link` |
| `wonder-blocks-clickable` | `Clickable`, `ClickableBehavior` |
| `wonder-blocks-icon-button` | `IconButton`, `ActivityIconButton`, `ConversationIconButton` |
| `wonder-blocks-icon` | `Icon`, `PhosphorIcon` |
| `wonder-blocks-form` | `TextField`, `TextArea`, `Checkbox`, `CheckboxGroup`, `Choice`, `RadioGroup` |
| `wonder-blocks-labeled-field` | `LabeledField` |
| `wonder-blocks-dropdown` | `SingleSelect`, `MultiSelect`, `ActionMenu`, `Combobox`, `OptionItem`, `ActionItem`, `SeparatorItem` |
| `wonder-blocks-modal` | `ModalLauncher`, `OnePaneDialog`, `FlexibleDialog`, `DrawerLauncher`, `DrawerDialog` |
| `wonder-blocks-accordion` | `Accordion`, `AccordionSection` |
| `wonder-blocks-badge` | `Badge`, `StatusBadge`, `GemBadge`, `StreakBadge`, `DueBadge`, `NeutralBadge` |
| `wonder-blocks-banner` | `Banner` |
| `wonder-blocks-popover` | `Popover`, `PopoverContent`, `PopoverContentCore` |
| `wonder-blocks-progress-spinner` | `CircularSpinner` |
| `wonder-blocks-switch` | `Switch` |
| `wonder-blocks-tabs` | `ResponsiveTabs`, `ResponsiveNavigationTabs` |
| `wonder-blocks-tooltip` | `Tooltip`, `TooltipContent` |
| `wonder-blocks-theming` | Theme providers |

## Styling with CSS modules

New code uses CSS modules (`*.module.css`). Older code uses aphrodite
(`StyleSheet.create`). When you're already changing a component's styling and
the conversion is mechanical, migrate its styles to CSS modules in a separate
commit from the behavior change. Don't migrate files you aren't otherwise
changing, or styles that override WB components (see below). For an example,
see `packages/perseus-editor/src/components/coordinate-pair-input.tsx` and its
`.module.css`.

```tsx
import {View} from "@khanacademy/wonder-blocks-core";

import styles from "./my-component.module.css";

const MyComponent = () => <View className={styles.container}>...</View>;
```

```css
.container {
    padding: var(--wb-sizing-size_160);
    background-color: var(--wb-semanticColor-core-background-base-default);
}
```

- Tokens are CSS custom properties: the token path with dots replaced by dashes,
  prefixed with `--wb-` (`sizing.size_160` → `var(--wb-sizing-size_160)`).
- WB components keep their own styles in aphrodite, which wins over a CSS module
  class. Until that changes, mark each declaration that overrides a WB component
  `!important`, with the comment
  `/* TODO(LEMS-3686): Remove the !important once Wonder Blocks is in the shared layer. */`.
- Props that take per-part style objects (e.g. `styles={{root: ...}}`) can't use
  CSS modules yet; pass a style object there.
- When Perseus upgrades to a Wonder Blocks version that ships CSS-module styles,
  update the two points above (LEMS-3686).
- Avoid applying too many custom styles to a Wonder Blocks component. Layout related properties
are okay like `margin`, but prefer using props for choosing supported variants.
- Prompt the user to reach out to the Wonder Blocks team if many styles need to
be overridden. This may mean there is a limitation with the component.

## Design tokens

Always reach for tokens rather than hardcoded values. The two main namespaces:

**`semanticColor`** — the right choice for most UI work. Tokens like
`semanticColor.core.background.base.default`, `semanticColor.core.foreground.neutral.strong`,
`semanticColor.core.border.neutral.default`, `semanticColor.feedback.success.subtle.background`.
These automatically adapt to themes. Use these values with the appropriate CSS properties.

In CSS modules, write each token below as a custom property (see "Styling with
CSS modules" above). Don't use the deprecated `spacing` and `color` tokens;
use `sizing` and `semanticColor`.

**`sizing`** — Use `sizing` tokens for spacing. These values use `rem` values so
they scale with the font size. 1rem = 10px

**`border`** — Always use border tokens instead of hardcoded pixel values.

- Radius: `border.radius.radius_040`, `border.radius.radius_full`, etc.
- Width: `border.width.thin`, `border.width.medium`, `border.width.thick`

```css
/* ✅ correct */
border: var(--wb-border-width-thin) solid var(--wb-semanticColor-core-border-neutral-default);
border-radius: var(--wb-border-radius-radius_040);

/* ❌ avoid */
border: 1px solid var(--wb-semanticColor-core-border-neutral-default);
border-radius: 4px;
```

**`boxShadow`** — `boxShadow.low`, `boxShadow.mid`, `boxShadow.high`.

**`font`** — Always use font tokens instead of hardcoded values for weight, size, and line-height.

- Weight: `font.weight.regular`, `font.weight.bold`
- Size: `font.body.size.medium`, `font.heading.size.large`, etc.
- Line height: `font.body.lineHeight.medium`, etc.

```css
/* ✅ correct */
font-weight: var(--wb-font-weight-bold);

/* ❌ avoid */
font-weight: 700;
```

**Responsive layout** — prefer a container query when the layout depends on the
space the component gets rather than on the viewport. Perseus renders inside host
pages whose layout it doesn't control. For an example, see
`packages/perseus/src/widgets/graded-group/graded-group-answer-bar.module.css`.

```css
.container {
    container-type: inline-size;
}

/* breakpoint.width.smMin is 568px */
@container (width < 568px) {
    .content {
        flex-direction: column;
    }
}
```

Use a media query only when the layout truly depends on the viewport. CSS custom
properties can't be used in `@media` or `@container`, so write the value from
`breakpoint.width` / `breakpoint.mediaQuery` by hand and name the token in a
comment.

## Typography

Use `Heading` and `BodyText` components from `@khanacademy/wonder-blocks-typography`. Use the `tag` prop to make sure it is using the correct semantics. `Heading` defaults to `h2` and `BodyText` defaults to `p`.

Use heading sizes to establish visual hierarchy — a page title should be visually larger than a section heading, which should be larger than a subsection heading. Match the `size` prop to the heading's place in the hierarchy, not just its semantic level.  The `tag` prop can create an accessible heading hierarchy in order regardless of style.

```tsx
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";

// Page title — largest
<Heading size="large" tag="h1">Settings</Heading>
// Section heading — smaller than page title
<Heading size="medium" tag="h2">Account</Heading>
// Subsection — smaller still
<Heading size="small" tag="h3">Profile</Heading>
<BodyText>Description text</BodyText>
<BodyText size="small" tag="span">Inline note</BodyText>
```

## Icons

WB uses Phosphor icons. Import icon assets from `@phosphor-icons/core` and use
with the WB `PhosphorIcon` from `@khanacademy/wonder-blocks-icon`.

```tsx
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
// Import specific icon assets from @phosphor-icons/core
import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

<PhosphorIcon icon={magnifyingGlassIcon} size="medium" />

```

For custom svg icons or specific icon components from the `@khanacademy/wonder-blocks-icon`
package like `GemIcon` or `StreakIcon`, use the `Icon` component.

```tsx
import {Icon, GemIcon} from "@khanacademy/wonder-blocks-icon";
import ExampleIcon from "icon.svg";

<Icon size="medium"><GemIcon /></Icon>
<Icon size="medium"><ExampleIcon /></Icon>
```

## Layout

Use `View` from `@khanacademy/wonder-blocks-core` instead of plain `div` for flex containers.

- `View` renders `display: flex; flex-direction: column` by default.
- Use the `tag` prop for semantic HTML: `<View tag="main">`, `<View tag="section">`, `<View tag="nav">`, `<View tag="ul">`, etc.

```tsx
import {View} from "@khanacademy/wonder-blocks-core";

<View style={styles.container}>
  <View tag="header" style={styles.header}>...</View>
  <View tag="main">...</View>
</View>
```

## Components

- Use components from Wonder Blocks as much as possible and prefer them over native browser elements or custom components.
- Avoid using these components:
  - Strut, Spring, MediaLayout
  - LabelXSmall, LabelSmall, LabelMedium, LabelLarge, HeadingXSmall, HeadingSmall, HeadingMedium, HeadingLarge, Body, BodySerif, BodySerifBlock, BodyMonospace, Tagline, Title, Caption, Footnote
  - LabeledTextField
- When using Wonder Blocks components, prioritize using props rather than using custom styles to override behaviours. Custom styles for layout purposes such as `margin`, `padding` or `gap` are acceptable.
- If there is something that the Wonder Blocks component does not currently support, pause and prompt the user to reach out to the #wonder-blocks team to let them know of this limitation. Do this instead of implementing a custom component by default.

## Accessibility

- Always pass `aria-label` to `IconButton` and any `Clickable` with non-text content.
- Use WB LabeledField for form fields — they wire up `htmlFor`/`id` and `aria-describedby` automatically.
- For overlays, `ModalLauncher` and `DrawerLauncher` handles focus trapping and restoration automatically.
- The Wonder Blocks components will often implement aria attributes for accessible patterns. Only add aria attributes when the prop docs instructs you to.
- Use the `tag` prop when needed to ensure correct semantics. Check the default and allowed tags for a component first.
- For custom components, style `:focus-visible` with the `semanticColor.focus.outer` / `inner` tokens.

## Motion

- For WB components that support animations, pass the user's reduced motion preference into the `animated` prop.

## Responsiveness

- UI should scale based on screen width and zoom level. Use `sizing` tokens (rem-based) for spacing that should scale correctly with browser zoom.
- Avoid fixed pixel widths on containers — prefer `max-inline-size`, percentages, or flex-based sizing so content reflows at smaller screen widths.
- The interface should not be horizontally scrollable. Use container queries (or `breakpoint` values in media queries) to adapt layouts at smaller sizes (e.g., switching from row to column). Tables are an exception and may scroll horizontally when their content requires it.

## Internationalization

- Always use logical CSS properties to support RTL languages. Nothing checks `.module.css` files for this yet (ESLint only checks older aphrodite styles).

  | Physical (avoid) | Logical (use) |
  | --- | --- |
  | `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
  | `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
  | `margin-top` / `margin-bottom` | `margin-block-start` / `margin-block-end` |
  | `padding-top` / `padding-bottom` | `padding-block-start` / `padding-block-end` |
  | `border-top` / `border-bottom` | `border-block-start` / `border-block-end` |
  | `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
  | `max-width` / `min-width` | `max-inline-size` / `min-inline-size` |
  | `max-height` / `min-height` | `max-block-size` / `min-block-size` |
  | `width` / `height` (when directional) | `inline-size` / `block-size` |

- Pass translated strings into the `labels` prop for components that support it.

## Patterns

- Form fields and validation: When implementing form fields (text inputs, textareas, checkboxes, radio groups,
or selects), read the reference file before writing any form code:
`./references/forms.md`
