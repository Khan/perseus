# Perseus Development Guide for AI Assistants

This document provides essential context for AI assistants working on the Perseus codebase. Detailed documentation for specific topics is available in `.claude/prompts/`.

## Project Overview

Perseus is Khan Academy's educational content rendering system that powers all exercises and articles. It's a TypeScript monorepo that extends Markdown with interactive widgets and beautiful math rendering.

**Core Components:**
- **Renderers**: Display content (ServerItemRenderer for exercises, ArticleRenderer for articles)
- **Widgets**: Interactive components (radio, numeric-input, interactive-graph, etc.)
- **State Management**: Centralized via UserInputManager with `handleUserInput` pattern
- **Math**: TeX expressions rendered via MathJax

## Prompt Library Reference

Comprehensive documentation is organized by topic in `.claude/prompts/`:

### Architecture & Organization
- **[codebase-map.md](.claude/prompts/codebase-map.md)** - Package structure, data flow, module boundaries
- **[file-organization.md](.claude/prompts/file-organization.md)** - Directory structure, naming conventions, imports

### Development Guides
- **[widget-development.md](.claude/prompts/widget-development.md)** - Creating and maintaining widgets
- **[component-best-practices.md](.claude/prompts/component-best-practices.md)** - React components, Wonder Blocks, accessibility
- **[testing-best-practices.md](.claude/prompts/testing-best-practices.md)** - Testing patterns and utilities
- **[math-and-content.md](.claude/prompts/math-and-content.md)** - Math rendering, content structure, MathJax

### Workflow & Process
- **[iteration-and-feedback.md](.claude/prompts/iteration-and-feedback.md)** - When to ask for help, debugging, deployment checklist

## Quick Start Commands

### Development
```bash
pnpm storybook             # Launch Storybook documentation
pnpm test                  # Run tests
pnpm build:types           # Build TypeScript types
pnpm build                 # Build all packages
```

### Code Quality
```bash
pnpm lint                  # Run ESLint
pnpm lint --fix            # Auto-fix linting issues
pnpm prettier . --check    # Check Prettier formatting
pnpm prettier . --write    # Auto-format code
pnpm tsc                   # Type-check all packages
```

### Testing
```bash
pnpm --filter perseus test                   # Test main perseus package
pnpm --filter perseus-editor test            # Test editor package
pnpm test packages/perseus/src/widgets/radio # Test specific widget
pnpm test -u                                 # Update snapshots
pnpm test --coverage                         # Run with coverage
```

## Key Architectural Decisions

### State Management Evolution
- **Legacy**: Widgets used `onChange` callbacks with local state
- **Current**: Transitioning to `handleUserInput` with centralized UserInputManager
- **Migration Status**: Radio widget bridging old/new patterns (LEMS-2994)
- **Example**: NumericInput fully modernized, use as reference

### Type System
- **Three-layer architecture**:
  1. `WidgetOptions` - Configuration from content creators
  2. `ValidationData` - Client-side validation (no answers)
  3. `Rubric` - Full scoring data (`ValidationData & WidgetOptions`)
- **Important**: Rubric never passed as prop to widgets, only used in scoring

### Import Rules
- Use package aliases: `@khanacademy/perseus`, etc.
- NO file extensions in imports
- NO cross-package relative imports
- Import order: builtin > external > internal > relative > types

## Before Submitting Code

### Pre-commit Checklist
1. `pnpm test` - All tests pass
2. `pnpm tsc` - No type errors
3. `pnpm lint --fix` - No linting issues
4. `pnpm prettier . --write` - Code formatted
5. `pnpm build` - Build succeeds
6. `pnpm storybook` - Components render correctly
7. Accessibility documented (for new widgets)
8. Mobile tested (if applicable)
9. Console clear of debug statements

### Common Issues to Check
- Console statements left in code
- Unused imports
- Missing displayName on components
- onChange used instead of handleUserInput
- Local state for user answers (should use UserInputManager)
- Unescaped backslashes in TeX strings

## Migration & Deprecation

### Deprecated Patterns
- `onChange` prop - Use `handleUserInput` instead (LEMS-3245, LEMS-3542)
- Local widget state for answers - Use UserInputManager
- Class components for new widgets - Use functional components

### In Transition
- Radio widget - Bridging old/new patterns
- Some widgets still using legacy patterns
- Gradual migration to centralized state

## Additional Resources

- **Storybook**: Interactive component documentation and testing
- **Perseus Architecture**: See `__docs__/introduction.mdx` for detailed overview
- **Widget Gallery**: Browse existing widgets in Storybook for patterns
- **Accessibility Guidelines**: Each widget should have `a11y.mdx` documentation
- **Khan Academy Design System**: Wonder Blocks components for consistent UI
- **Test Generators**: `@khanacademy/perseus-core/utils/generators`
- **Type Definitions**: `packages/perseus-core/src/data-schema.ts`

---

*This document provides an overview and quick reference. For detailed information on any topic, refer to the appropriate document in `.claude/prompts/`. For human developers, see the main README.md files in each package.*