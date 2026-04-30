# Perseus Development Guide for AI Assistants

This document provides essential information for AI assistants working on the Perseus codebase.

## Project Overview

Perseus is Khan Academy's educational content rendering system that powers all exercises and articles. It's a TypeScript
monorepo that extends Markdown with interactive widgets and beautiful math rendering.

**Core Architecture:**
- **Renderers**: Display content (ServerItemRenderer for exercises, ArticleRenderer for articles)
- **Widgets**: Interactive components (radio, numeric-input, interactive-graph, etc.)
- **Editors**: Authoring interfaces for content creators
- **Math**: TeX expressions rendered via MathJax

## Quick Start Commands

### Development
```bash
pnpm storybook             # Launch Storybook documentation
pnpm test                  # Run tests
```

### Code Quality
```bash
pnpm lint                  # Run ESLint
pnpm lint --fix            # Auto-fix linting issues
pnpm prettier . --check    # Check Prettier formatting
pnpm prettier . --write    # Auto-format code
pnpm tsc                   # Type-check all packages
pnpm knip                  # Find unused files, exports, and dependencies
```

### Testing Specific Packages
```bash
pnpm --filter perseus test                   # Test main perseus package
pnpm --filter perseus-editor test            # Test editor package
pnpm test packages/perseus/src/widgets/radio # Test specific widget
```

## Key Directories

```
packages/
├── perseus/             # Main package (renderers, widgets, components)
│   ├── src/__docs__/    # Main Storybook stories
│   ├── src/widgets/     # Widget implementations
│   └── src/components/  # Reusable components
├── perseus-editor/      # Editor UI components
├── math-input/          # Math keypad and input components
├── perseus-core/        # Shared types and utilities
├── perseus-linter/      # Content validation tools
└── perseus-score/       # Server-side scoring functions
```

## Common Development Patterns

### Creating a New Widget
1. **Create widget directory**: `packages/perseus/src/widgets/[widget-name]/`
2. **Implement widget files**:
   - `[widget-name].tsx` - Main component
   - `[widget-name].test.ts` - Tests
   - `index.ts` - Exports
   - `__docs__/[widget-name].stories.tsx` - Storybook story
   - `__docs__/a11y.mdx` - Accessibility documentation
3. **Register widget** in `packages/perseus/src/widgets.ts`
4. **If scorable, add scoring functions** in `packages/perseus-score/src/widgets/[widget-name]/`:
   - `score-[widget-name].ts` - Scoring logic
   - `score-[widget-name].test.ts` - Scoring tests
   - `validate-[widget-name].ts` - Input validation (optional)
   - `validate-[widget-name].test.ts` - Validation tests (optional)
5. **Register scoring** in `packages/perseus-score/src/widgets/widget-registry.ts`
6. **Add types** to `packages/perseus-core/src/data-schema.ts`

### Widget Implementation Pattern
```typescript
// Export interface following WidgetExports<T> pattern
export default {
    name: "widget-name",
    displayName: "Widget Display Name",
    widget: WidgetComponent,
    isLintable: true, // For use by the editor
} as WidgetExports<typeof WidgetComponent>;
```

### Focus Management
All widgets must implement proper focus management for accessibility.

## Package Dependencies

### Import Guidelines
- Use package aliases: `@khanacademy/perseus`, `@khanacademy/perseus-editor`
- NO file extensions in imports (`.ts`, `.tsx` banned by ESLint)
- NO cross-package relative imports
- Import order: builtin > external > internal > relative > types

### Example Correct Imports
```typescript
import React from "react";                           // external
import {ApiOptions} from "@khanacademy/perseus";     // internal package
import {WidgetContainer} from "../widget-container"; // relative

import type {WidgetProps} from "@khanacademy/perseus-core";
```

## Testing Guidelines

### Test Structure
1. Follow the AAA pattern: Arrange, Act, Assert
1.1 If Arrange and Act are one action, combine them to `//Arrange, Act`
2. Use widget generators to build test data and test data options.
   You can find generators for all widgets in packages/perseus-core/src/utils/generators.
   An example usage can be seen here: packages/perseus/src/widgets/expression/expression.testdata.ts.
3. Follow the test structure below:
```typescript
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {question1} from "../__testdata__/widget.testdata";
import WidgetComponent from "../widget-component";

describe("WidgetComponent", () => {
    it("renders correctly", () => {
        render(<WidgetComponent {...question1} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("calls onChange when button is clicked", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();

        render(<WidgetComponent {...question1} onChange={onChange} />);
        await user.click(screen.getByRole("button"));

        expect(onChange).toHaveBeenCalled();
    });
});
```

### Writing Tests
- use `it` for individual test cases and not `test`
- use `describe` to group related tests
- Test titles should describe the requirement or observable outcome, not the implementation.
  Prefer verbs like `returns`, `renders`, `disables`, `throws` over vague phrases like "should handle".
  A failing test title should tell you which requirement broke without reading the test body.
  ❌ `"should handle empty input"` → ✅ `"returns null when input is empty"`

## Common Issues & Solutions

### Math Rendering (TeX)
- Use `$...$` for inline math, `$$...$$` for display math
- For complex expressions, use `\dfrac` instead of `\frac`
- Test math rendering in different contexts (articles, exercises, hints)

### Widget State Management
- Use `useState` for local component state
- Props flow down from parent renderer
- Call `onChange` to notify parent of state changes
- Implement proper serialization for persistent state

### Mobile Considerations
- All widgets must work on mobile devices
- Support touch interactions
- Consider on-screen keypad for math inputs
- Test with different screen sizes using Storybook

### Performance Optimization
- Use `React.memo()` for expensive components
- Implement `useMemo()` for complex calculations
- Avoid unnecessary re-renders in widget hierarchies
- Profile performance with React DevTools

## Storybook MCP — AI-Assisted UI Development

A Storybook MCP server runs as part of the local dev server via `@storybook/addon-mcp`.
Before doing any widget, component, or UI work in this repo, use the Storybook MCP tools
to ground your work in the actual codebase.

### Setup (first time)
Make sure Storybook is running:
```bash
pnpm storybook
```
Then register the MCP server with Claude Code:
```bash
claude mcp add storybook-mcp --transport http http://localhost:6006/mcp --scope project
```

### Available MCP tools
| Tool                                | Purpose                                              |
| ----------------------------------- | ---------------------------------------------------- |
| `get-storybook-story-instructions`  | Get story authoring guidelines for this project      |
| `preview-stories`                   | Get live Storybook URLs to visually verify stories   |

### Workflow for UI work
1. Call `get-storybook-story-instructions` to get the latest story authoring guidelines
2. Write or modify the component and its stories
3. Call `preview-stories` to get the live Storybook URLs and visually verify each story state

### Perseus-specific rules
- **Never invent widget props.** Perseus widgets have a strict versioned data
  schema. Always verify against documented stories before using any prop.
- **Use widget generators for test data.** All widget test data must come from
  `packages/perseus-core/src/utils/generators` — never hand-roll it.
- **Check for existing stories first.** Stories live in `__docs__/` directories
  throughout the packages (widgets, components, editors, math-input) — avoid
  duplicating what's already there.
- **Every new component needs stories** covering each key visual state.
- **Add `!manifest` to non-component stories.** Documentation pages, visual
  regression tests (`*-regression.stories.tsx`), a11y docs, and dev utilities
  should include `"!manifest"` in their tags to keep them out of the component
  manifest. Actual widget/component stories should NOT have this tag.

## Debugging Tips

### Storybook Development
- Use Storybook for isolated component development
- Test different props combinations
- Verify accessibility with Storybook a11y addon
- Check mobile layouts with device frame addon

### Console Debugging
```typescript
// Temporary debugging (remove before commit)
console.log("Widget state:", this.state);
console.log("Props received:", this.props);
```

### Error Boundaries
- Widgets are wrapped in error boundaries
- Check browser console for widget-specific errors
- Implement graceful fallbacks for failed widgets

## Deployment Notes

### Before Submitting PR
1. Run full test suite: `pnpm test`
2. Check types: `pnpm build:types`
3. Lint and format: `pnpm lint --fix && pnpm prettier . --write`
4. Test in Storybook: `pnpm storybook`
5. Verify accessibility compliance

### Common Pre-commit Failures
- ESLint errors (unused imports, console statements)
- Prettier formatting (spacing, quotes, semicolons)
- TypeScript type errors
- Missing accessibility documentation
- Test failures

## Additional Resources

- **Storybook**: Interactive component documentation and testing
- **Perseus Architecture**: See `__docs__/introduction.mdx` for detailed overview
- **Widget Gallery**: Browse existing widgets in Storybook for patterns
- **Accessibility Guidelines**: Each widget should have `a11y.mdx` documentation
- **Khan Academy Design System**: Wonder Blocks components for consistent UI

---

*This document is maintained for AI assistants. For human developers, see the main README.md files in each package.*
