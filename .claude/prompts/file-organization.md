# File and Folder Organization

## Directory Naming Conventions

### Use Kebab-Case for Directories
```
✅ Good:
packages/perseus/src/widgets/numeric-input/
packages/perseus/src/widgets/interactive-graph/

❌ Bad:
packages/perseus/src/widgets/NumericInput/
packages/perseus/src/widgets/interactive_graph/
```

## Widget File Structure

Each widget should follow this structure:
```
widgets/widget-name/
├── index.ts                          # Public exports only
├── widget-name.tsx                   # Main component
├── widget-name.test.ts               # Component tests
├── widget-name.testdata.ts           # Test data using generators
├── types.ts                          # Widget-specific types (if complex)
├── utils.ts                          # Widget-specific utilities (if needed)
└── __docs__/
    ├── widget-name.stories.tsx       # Storybook stories
    ├── a11y.mdx                      # Accessibility documentation
    └── examples/                     # Example JSON fixtures (if needed)
```

## Component Organization

### Simple Components (single file)
```
components/
├── simple-component.tsx
├── simple-component.test.tsx
└── simple-component.stories.tsx
```

### Complex Components (folder structure)
```
components/complex-component/
├── index.ts                          # Public exports
├── complex-component.tsx             # Main component
├── complex-component.test.tsx        # Tests
├── sub-component.tsx                 # Private sub-components
├── utils.ts                          # Component-specific utils
└── types.ts                          # Component-specific types
```

## File Naming Rules

### TypeScript/JavaScript Files
```typescript
// Components - PascalCase file, named export
widget-name.tsx → export function WidgetName() {}

// Utilities - kebab-case file, named exports
math-utils.ts → export function calculateSum() {}

// Types - kebab-case file with .types.ts extension
validation.types.ts → export type ValidationResult = {}

// Test files - match source with .test.ts
widget-name.tsx → widget-name.test.ts

// Test data - match source with .testdata.ts
widget-name.tsx → widget-name.testdata.ts
```

### Index Files
```typescript
// index.ts should only re-export, no logic
export {default} from "./widget-name";
export type {WidgetNameProps} from "./types";

// Don't put implementation in index files
```

## Import Organization

### Import Order (enforced by ESLint)
```typescript
// 1. Node built-ins
import fs from "fs";
import path from "path";

// 2. External packages
import React from "react";
import {render} from "@testing-library/react";

// 3. Internal packages (Khan Academy)
import {View} from "@khanacademy/wonder-blocks-core";
import {PerseusScore} from "@khanacademy/perseus-core";

// 4. Relative imports
import {WidgetContainer} from "../widget-container";
import {calculateAnswer} from "./utils";

// 5. Type imports (always last)
import type {WidgetProps} from "@khanacademy/perseus-core";
import type {LocalType} from "./types";
```

## Test File Organization

### Test Data Files
```typescript
// widget-name.testdata.ts
import {widgetNameGenerator} from "@khanacademy/perseus-core";

// Group related test cases
export const basicQuestions = {
    simple: widgetNameGenerator.build({...}),
    withHint: widgetNameGenerator.build({...}),
    multipleChoice: widgetNameGenerator.build({...}),
};

export const edgeCases = {
    empty: widgetNameGenerator.build({...}),
    veryLong: widgetNameGenerator.build({...}),
};
```

### Test Structure
```typescript
// widget-name.test.ts
describe("WidgetName", () => {
    describe("rendering", () => {
        it("renders with default props", () => {});
        it("renders with custom props", () => {});
    });

    describe("user interaction", () => {
        it("handles input changes", () => {});
        it("validates input", () => {});
    });

    describe("scoring", () => {
        it("scores correct answer", () => {});
        it("scores incorrect answer", () => {});
    });
});
```

## Package Exports

### Main Package Exports (packages/perseus/src/index.ts)
```typescript
// Group exports by category
// Renderers
export {default as ServerItemRenderer} from "./server-item-renderer";
export {default as ArticleRenderer} from "./article-renderer";

// Widgets
export {widgets} from "./widgets";

// Types
export type {WidgetProps} from "./types";
```

### Package.json Exports
```json
{
    "exports": {
        ".": "./dist/index.js",
        "./styles": "./dist/styles.css"
    }
}
```

## Documentation Files

### Required Documentation
```
widget-name/
└── __docs__/
    ├── widget-name.stories.tsx    # Interactive examples
    ├── a11y.mdx                   # Accessibility guide
    └── README.mdx                  # Usage documentation (optional)
```

### Storybook Organization
```typescript
// __docs__/widget-name.stories.tsx
export default {
    title: "Perseus/Widgets/WidgetName",  // Hierarchical organization
    component: WidgetName,
};

// Stories in logical order
export const Default = {};
export const WithHint = {};
export const Mobile = {};
export const ErrorState = {};
```

## Asset Organization

### Static Assets
```
packages/perseus/src/
├── assets/
│   └── images/          # Shared images
├── widgets/
│   └── widget-name/
│       └── assets/      # Widget-specific assets
```

### Styles
```
packages/perseus/src/
├── styles/
│   ├── global.less      # Global styles
│   └── variables.less   # Shared variables
├── widgets/
│   └── widget-name/
│       └── widget-name.less  # Widget-specific styles
```

## Build Artifacts

### Git Ignored
```
# Never commit these
node_modules/
dist/
build/
*.tsbuildinfo
coverage/
.turbo/
```

### Generated Files
```typescript
// Mark generated files clearly
// Generated by: script-name.js
// DO NOT EDIT MANUALLY
```

## Migration Patterns

### Gradual Migration
```
widgets/old-widget/          # Legacy structure
├── old-widget.jsx           # To be migrated
├── old-widget-new.tsx       # New implementation
└── __migration__/           # Migration utilities
```

### Deprecation
```typescript
// Mark deprecated code clearly
/**
 * @deprecated Use NewWidget instead (LEMS-1234)
 * @removeBefore 2024-12-01
 */
export const OldWidget = () => {};
```

## Best Practices

1. **Keep files focused** - Single responsibility per file
2. **Co-locate related code** - Tests, stories, and component together
3. **Use index.ts for public API** - Hide internal implementation
4. **Consistent naming** - Follow conventions strictly
5. **Clean imports** - No circular dependencies
6. **Document complex structures** - Add README.md when needed