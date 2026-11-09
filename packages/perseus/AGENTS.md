# Storybook

## Storybook MCP

When Storybook is running (`pnpm storybook`), `@storybook/addon-mcp` serves
the `storybook` tools. Call `get-storybook-story-instructions` once per
session before writing stories, and use the story preview tool to check your
changes.

If the task involves stories or UI changes and these tools aren't available,
tell the user before starting that work and offer to start Storybook in the
background; start it only after they say yes. The `storybook` server may
then need to be reconnected in your agent's MCP settings. If they decline,
read `packages/perseus/src/widgets/dropdown/__docs__/` instead of searching
for examples.

The dropdown stories show Perseus conventions (renderer setup, dependencies,
tags). When the MCP tools are available, their instructions win for
Storybook APIs.

## Perseus-specific Rules

- **Check for existing stories first.** New stories go in `__docs__/` directories.
  Some older stories are colocated directly but haven't been migrated yet — avoid
  duplicating what's already there.
- **Every new widget needs stories** covering each key visual state.
- **Add `!manifest` to non-component stories.** Documentation pages, visual
  regression tests (`*-regression.stories.tsx`), a11y docs, and dev utilities
  should include `"!manifest"` in their tags to keep them out of the component
  manifest. Actual widget/component stories should NOT have this tag.
