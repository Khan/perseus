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
All components are TypeScript-friendly, use aphrodite for styling, and follow WAI-ARIA
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
| `wonder-blocks-core` | `View`,`addStyle` |
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
| `wonder-blocks-breadcrumbs` | `Breadcrumbs`, `BreadcrumbsItem` |
| `wonder-blocks-card` | `Card` |
| `wonder-blocks-cell` | `CompactCell`, `DetailCell` |
| `wonder-blocks-popover` | `Popover`, `PopoverContent`, `PopoverContentCore` |
| `wonder-blocks-progress-spinner` | `CircularSpinner` |
| `wonder-blocks-search-field` | `SearchField` |
| `wonder-blocks-switch` | `Switch` |
| `wonder-blocks-tabs` | `ResponsiveTabs`, `ResponsiveNavigationTabs` |
| `wonder-blocks-toolbar` | `Toolbar` |
| `wonder-blocks-tooltip` | `Tooltip`, `TooltipContent` |
| `wonder-blocks-theming` | Theme providers |
| `wonder-blocks-styles` | Global style helpers like `focusStyles` |

## Styling with aphrodite

WB uses aphrodite for scoped CSS. Never use inline style objects for complex styles —
define them with `StyleSheet.create` so they're type-safe and mergeable.

```tsx
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const MyComponent = () => (
    <View style={styles.container}>
        ...
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: sizing.size_160,
        backgroundColor: semanticColor.core.background.base.default,
    },
});
```

- Apply multiple styles with an array: `style={[styles.base, isActive && styles.active]}`.

- Avoid applying too many custom styles to a Wonder Blocks component. Layout related properties
are okay like `margin`, but prefer using props for choosing supported variants.
- If custom styling is necessary for a Wonder Blocks component, use the `style` or
`styles` prop depending on the component. Prompt the user to reach out to the Wonder
Blocks team if many styles need to be overridden. This may mean there is a limitation
with the component.

```tsx
import { StyleSheet } from "aphrodite";
import { sizing } from "@khanacademy/wonder-blocks-tokens";
import { BodyText } from "@khanacademy/wonder-blocks-typography";

const styles = StyleSheet.create({
    text: {
        margin: sizing.size_160,
    },
});

const Example = () => (
    <BodyText style={styles.text}>Hello world</BodyText>
);
```

## Design tokens

Always reach for tokens rather than hardcoded values. The two main namespaces:

**`semanticColor`** — the right choice for most UI work. Tokens like
`semanticColor.core.background.base.default`, `semanticColor.core.foreground.neutral.strong`,
`semanticColor.core.border.neutral.default`, `semanticColor.feedback.success.background`.
These automatically adapt to themes. Use these values with the appropriate CSS properties.

**`sizing`** — Use `sizing` tokens for spacing. These values use `rem` values so
they scale with the font size. 1rem = 10px

**`border`** — Always use border tokens instead of hardcoded pixel values.

- Radius: `border.radius.radius_040`, `border.radius.radius_full`, etc.
- Width: `border.width.thin`, `border.width.medium`, `border.width.thick`

```ts
// ✅ correct
border: `${border.width.thin} solid ${semanticColor.core.border.neutral.default}`,
borderRadius: border.radius.radius_040,

// ❌ avoid
border: `1px solid ${semanticColor.core.border.neutral.default}`,
borderRadius: 4,
```

**`boxShadow`** — `boxShadow.low`, `boxShadow.mid`, `boxShadow.high`.

**`font`** — Always use font tokens instead of hardcoded values for weight, size, and line-height.

- Weight: `font.body.weight.regular`, `font.body.weight.bold`
- Size: `font.body.size.medium`, `font.heading.size.large`, etc.
- Line height: `font.body.lineHeight.medium`, etc.

```ts
// ✅ correct
fontWeight: font.body.weight.bold,

// ❌ avoid
fontWeight: "700",
fontWeight: 700,
```

**`breakpoint`** — media query breakpoints for responsive layouts.

```tsx
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
const styles = StyleSheet.create({
    [breakpoint.mediaQuery.sm]: {
        flexDirection: "column",
    },
});
```

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

For bordered content sections (summaries, form panels, info boxes), use `Card` from `wonder-blocks-card` instead of recreating the pattern with a custom `View` + border + padding styles.

```tsx
import {Card} from "@khanacademy/wonder-blocks-card";

<Card>...</Card>
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
- For custom components, use the `focusStyles.focus` styles from `@khanacademy/wonder-blocks-styles` for `:focus-visible` styles.

## Motion

- For WB components that support animations, pass the user's reduced motion preference into the `animated` prop.

## Responsiveness

- UI should scale based on screen width and zoom level. Use `sizing` tokens (rem-based) for spacing that should scale correctly with browser zoom.
- Avoid fixed pixel widths on containers — prefer `maxInlineSize`, percentages, or flex-based sizing so content reflows at smaller screen widths.
- The interface should not be horizontally scrollable. Use `breakpoint.mediaQuery` tokens to adapt layouts at smaller screen sizes (e.g., switching from row to column). Tables are an exception and may scroll horizontally when their content requires it.

## Internationalization

- Always use logical CSS properties in `StyleSheet.create` to support RTL languages. This is enforced by ESLint — using physical properties will cause lint errors.

  | Physical (avoid) | Logical (use) |
  | --- | --- |
  | `marginLeft` / `marginRight` | `marginInlineStart` / `marginInlineEnd` |
  | `paddingLeft` / `paddingRight` | `paddingInlineStart` / `paddingInlineEnd` |
  | `marginTop` / `marginBottom` | `marginBlockStart` / `marginBlockEnd` |
  | `paddingTop` / `paddingBottom` | `paddingBlockStart` / `paddingBlockEnd` |
  | `borderTop` / `borderBottom` | `borderBlockStart` / `borderBlockEnd` |
  | `borderLeft` / `borderRight` | `borderInlineStart` / `borderInlineEnd` |
  | `maxWidth` / `minWidth` | `maxInlineSize` / `minInlineSize` |
  | `maxHeight` / `minHeight` | `maxBlockSize` / `minBlockSize` |
  | `width` / `height` (when directional) | `inlineSize` / `blockSize` |

- Pass translated strings into the `labels` prop for components that support it.

## Patterns

- Forms and error validation: When implementing form elements (text inputs, textareas, checkboxes, radio groups,
selects, or a submit action), read the reference file before writing any form code:
`./references/forms.md`
