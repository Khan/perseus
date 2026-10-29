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
├── keypad-context/      # Context linking the keypad and renderers
├── perseus-core/        # Shared types and utilities
├── perseus-linter/      # Content validation tools
├── perseus-score/       # Server-side scoring functions
├── perseus-utils/       # Miscellaneous shared utilities
├── pure-markdown/       # Perseus Markdown rules (math, widgets), no React
├── simple-markdown/     # Core Markdown parser
├── kmath/               # Numeric math utilities
└── kas/                 # Computer algebra system for comparing expressions
data/questions/          # Sample Perseus content
utils/                   # Repo scripts (changed-files, lint, publishing)
```

## Testing Guidelines

### Test Structure
1. Model new widget tests on
   `packages/perseus/src/widgets/dropdown/dropdown.test.ts` and its
   `dropdown.testdata.ts`.
2. Follow the AAA pattern with `// Arrange`, `// Act` and `// Assert`
   comments. When Arrange and Act are one step, use `// Arrange, Act`.
3. Build test data with the generators in
   `packages/perseus-core/src/utils/generators`. Pass values the test depends
   on (used in assertions or the logic under test) explicitly instead of
   relying on shared defaults or testdata the test doesn't control.
4. Render widget tests with `renderQuestion` from
   `packages/perseus/src/widgets/__testutils__/render-question.tsx`. It takes
   a `PerseusRenderer` (`item.question`), provides test dependencies and
   registers widgets; override a dependency with its `dependencies` option.
   Read user input with `renderer.getUserInputMap()`. Item-level tests
   (`ServerItemRenderer`) use `renderQuestion` from
   `packages/perseus/src/__tests__/test-utils.tsx` instead.

### Writing Tests
- Test titles should describe the requirement or observable outcome, not the implementation.
  Prefer verbs like `returns`, `renders`, `disables`, `throws` over vague phrases like "should handle".
  A failing test title should tell you which requirement broke without reading the test body.
  ❌ `"should handle empty input"` → ✅ `"returns null when input is empty"`
- Only mock dependencies (`jest.spyOn(Dependencies, "getDependencies")` /
  `jest.spyOn(Dependencies, "useDependencies")`) when the code under test
  actually reads them. Widget tests rarely need to, because `renderQuestion`
  already provides them.
- Test Perseus's behavior, not the libraries it wraps (e.g. Wonder Blocks
  components). One assertion that a wrapped component did its job is enough.

## Accessibility

For any UI work, apply the `accessibility` skill (`.agents/skills/accessibility/`).

## Commit Messages

Focus on what changed and why — write for someone reading git log in 5 years.
- Describe the behavior change, not the implementation steps
- Explain the motivation (the "why")
- Note anything surprising or non-obvious
- Omit information already visible in the diff or PR description

## Deployment Notes

### Before Submitting PR
1. Run tests: `pnpm tesc`
2. Check types: `pnpm tsc`
3. Lint and format: `pnpm fixc`
4. For UI changes, offer to start Storybook (`pnpm storybook`) so the user can
   check them; start it only after they approve.
5. Verify accessibility compliance

CI runs more checks than the steps above (see `.github/workflows/node-ci.yml`).
When CI fails, run only the failing step's command locally.

### Changesets
CI's `changeset` job (`.github/workflows/node-ci.yml`) fails a PR that changes
package code without a changeset. Write it by hand as
`.changeset/<three-random-words>.md` (e.g. `quiet-maples-drift.md`):

```markdown
---
"@khanacademy/perseus": patch
---

One-line description of the change
```

When no production code ships, leave the frontmatter empty (`---` / `---`).
