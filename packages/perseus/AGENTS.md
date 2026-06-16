# Storybook MCP — AI-Assisted UI Development

A Storybook MCP server runs as part of the local dev server via `@storybook/addon-mcp`.
Before doing any widget, component, or UI work in this package, use the Storybook MCP tools
to ground your work in the actual codebase.

## Setup (first time)

Make sure Storybook is running:
```bash
pnpm storybook
```

## Available MCP Tools

| Tool                                | Purpose                                              |
| ----------------------------------- | ---------------------------------------------------- |
| `get-storybook-story-instructions`  | Get story authoring guidelines for this project      |
| `preview-stories`                   | Get live Storybook URLs to visually verify stories   |

## Workflow for UI Work

1. Call `get-storybook-story-instructions` once per session — the guidelines
   don't change between calls, so there's no need to re-fetch them.
2. Write or modify the component and its stories.
3. Call `preview-stories` after making changes to verify your work visually.
4. Prefer MCP tool calls over crawling raw source files — reading story
   conventions via MCP is cheaper than navigating through source directories.

## Perseus-specific Rules

- **Use widget generators for test data.** All widget test data must come from
  `packages/perseus-core/src/utils/generators` — never hand-roll it.
- **Check for existing stories first.** New stories go in `__docs__/` directories.
  Some older stories are colocated directly but haven't been migrated yet — avoid
  duplicating what's already there.
- **Every new widget needs stories** covering each key visual state.
- **Add `!manifest` to non-component stories.** Documentation pages, visual
  regression tests (`*-regression.stories.tsx`), a11y docs, and dev utilities
  should include `"!manifest"` in their tags to keep them out of the component
  manifest. Actual widget/component stories should NOT have this tag.
