# Perseus Codebase Map

## Package Structure Overview

```
packages/
├── perseus/ (v74.0.2)          # Core rendering engine
│   ├── src/
│   │   ├── widgets/            # Interactive components
│   │   ├── components/         # Reusable UI components
│   │   ├── renderers/          # Content renderers
│   │   ├── util/               # Utility functions
│   │   └── __docs__/           # Storybook documentation
│   └── __testdata__/           # Test fixtures
│
├── perseus-editor/             # Content authoring tools
│   ├── src/
│   │   ├── components/         # Editor UI components
│   │   └── widgets/            # Widget editors
│
├── perseus-core/ (v23.0.0)     # Shared types and utilities
│   ├── src/
│   │   ├── data-schema.ts     # Core type definitions
│   │   ├── utils/
│   │   │   └── generators/    # Test data generators
│   │   └── types/             # Type exports
│
├── perseus-score/              # Server-side scoring
│   ├── src/
│   │   └── widgets/           # Widget-specific scoring
│
├── math-input/                 # Math keypad and input
│   ├── src/
│   │   ├── components/        # Math UI components
│   │   └── services/          # Math processing
│
└── perseus-linter/             # Content validation
    └── src/
        └── rules/             # Linting rules
```

## Key Entry Points

### Renderers & State Management
- `packages/perseus/src/server-item-renderer.tsx` - Main exercise renderer
- `packages/perseus/src/user-input-manager.ts` - Centralized state management
- `packages/perseus/src/renderer.tsx` - Base renderer component
- `packages/perseus/src/widget-container.tsx` - Widget boundary layer

### Widget System
- `packages/perseus/src/widgets.ts` - Widget registry
- Individual widgets in `packages/perseus/src/widgets/[name]/`
- Modern widgets use `handleUserInput()` callback pattern
- Legacy widgets being migrated from `onChange` pattern

### Type System
- `packages/perseus-core/src/data-schema.ts` - Core types
- `packages/perseus-core/src/types/` - Type exports
- Widget-specific types in each widget directory

## Modern Data Flow (Post-Migration)

1. **State Initialization**:
   - ServerItemRenderer → UserInputManager.getStartUserInput()

2. **User Interaction**:
   - Widget → handleUserInput() → UserInputManager → Re-render

3. **Props Distribution**:
   - UserInputManager.getWidgetProps() → WidgetContainer → Widget

4. **Scoring**:
   - UserInputManager state → Perseus Score → Validation result

## Important Migration Notes

- **onChange is DEPRECATED** (LEMS-3245, LEMS-3542)
- New widgets must use `handleUserInput()` pattern
- Radio widget currently bridges old/new patterns during migration
- NumericInput is fully modernized example

## Module Boundaries

- **perseus**: Public rendering API (React-based)
- **perseus-editor**: Editor-only functionality
- **perseus-core**: Shared types (no React dependencies)
- **perseus-score**: Server-side scoring (no React)
- **math-input**: Standalone math components

## Import Rules

- Use package aliases: `@khanacademy/perseus`, etc.
- NO file extensions in imports
- NO cross-package relative imports
- Import order: builtin > external > internal > relative > types