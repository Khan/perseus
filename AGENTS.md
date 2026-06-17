# Perseus Development Guide

Perseus is Khan Academy's educational content rendering system that powers all exercises and articles. It's a TypeScript monorepo that extends Markdown with interactive widgets and beautiful math rendering.

**Core Architecture:**
- **Renderers**: Display content (ServerItemRenderer for exercises, ArticleRenderer for articles)
- **Widgets**: Interactive components (radio, numeric-input, interactive-graph, etc.)
- **Editors**: Authoring interfaces for content creators
- **Scoring**: Server-side answer checking (perseus-score)
- **Validation**: Input validation before scoring (perseus-score)
- **Data Schema**: Typed content definitions (perseus-core/src/data-schema.ts)
- **Parsers**: Content parsing utilities (perseus-core)
- **Editor Linters**: Content validation rules (perseus-linter)

## Quick Start Commands

### Development
```bash
pnpm storybook             # Launch Storybook documentation
pnpm tesc                  # Run tests for changed files
```

### Code Quality
```bash
pnpm fixc                  # Run linter and autofix formatting
pnpm tsc                   # Type-check all packages
pnpm knip                  # Find unused files, exports, and dependencies
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
   Values that are important to the test — used in assertions or the specific logic being tested —
   should be explicitly passed as params to the generator, not left as shared defaults.
   Test assertions shouldn't be coupled to setup they don't control.
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

## Deployment Notes

### Before Submitting PR
1. Run tests: `pnpm tesc`
2. Check types: `pnpm tsc`
3. Lint and format: `pnpm fixc`
4. Test in Storybook: `pnpm storybook`
5. Verify accessibility compliance
