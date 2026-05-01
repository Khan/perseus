# Using Storybook MCP in Perseus

## What is it?

`@storybook/addon-mcp` connects Claude Code (or other AI coding assistants) directly to your running Storybook instance. Instead of the AI guessing at component APIs and story patterns, it can query your actual Storybook for real documentation and generate live preview URLs to verify its work visually.

## What's already done

The addon is installed and configured in the repo — no code changes needed on your end.

## One-time setup (per developer)

### 1. Start Storybook

```bash
pnpm storybook
```

### 2. Register the MCP server with Claude Code

```bash
claude mcp add storybook-mcp --transport http http://localhost:6006/mcp --scope project
```

This only needs to be done once, and creates the file `.mcp.json`. It saves the connection to your local Claude Code project settings (not committed to git).

### 3. Verify it's connected

```bash
claude mcp list
```

You should see:

```
storybook-mcp: http://localhost:6006/mcp (HTTP) - Connected
```

## How it helps day-to-day

When writing or modifying UI components, Claude Code now has two tools it can use:

| Tool                               | What it does                                                       | When it's useful                                   |
| ---------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| `get-storybook-story-instructions` | Returns story authoring guidelines specific to our Storybook setup | Before creating or editing any `.stories.tsx` file  |
| `preview-stories`                  | Returns live Storybook URLs for specific stories                   | After making UI changes, to visually verify results |

### Example prompts that benefit from MCP

- "Create stories for the new widget I just built"
- "Add a story showing the error state for numeric-input"
- "Update the expression widget stories to cover the mobile keypad"
- "Show me what the radio widget looks like in its selected state"

## Important notes

- **Storybook must be running** on port 6006 for the MCP tools to work. If it's not running, Claude Code will still function normally — it just won't have access to the Storybook tools.
- **This is local only.** The MCP server registration is per-developer and doesn't affect CI, builds, or other developers.
- **It doesn't replace testing.** Continue using `pnpm test` for unit tests, Cypress for interaction tests, and the a11y addon for accessibility checks. The MCP tools help the AI write *better* code and stories — they don't run tests.

---

## Understanding how this works

### What is MCP?

MCP (Model Context Protocol) is a standard way for AI assistants to connect to external tools and data sources. Think of it like an API, but specifically designed for AI assistants to call. When Claude Code has an MCP connection to Storybook, it can ask Storybook questions about your components instead of relying only on reading source files.

### How the pieces connect

```
┌────────────────────────────────────────────────────────────────┐
│  Your Machine                                                  │
│                                                                │
│  ┌──────────┐    prompt     ┌─────────────┐                    │
│  │          │ ─────────────>│             │                    │
│  │Developer │    response   │ Claude Code │                    │
│  │          │ <─────────────│   (CLI)     │                    │
│  └──────────┘               └──────┬──────┘                    │
│       │                            │                           │
│       │                            │ MCP calls                 │
│       │ clicks                     │ (get-storybook-story-     │
│       │ preview                    │  instructions,            │
│       │ link                       │  preview-stories)         │
│       │                            │                           │
│       │                     ┌──────▼──────┐                    │
│       │                     │  Storybook  │                    │
│       │                     │ Dev Server  │                    │
│       │                     │ :6006       │                    │
│       │                     │             │                    │
│       │                     │ ┌─────────┐ │                    │
│       │                     │ │addon-mcp│ │                    │
│       │                     │ │ /mcp    │ │                    │
│       │                     │ └─────────┘ │                    │
│       │                     └──────┬──────┘                    │
│       │                            │                           │
│       │                            │ reads                     │
│       │                            │                           │
│       │                     ┌──────▼──────┐                    │
│       └────────────────────>│  Stories &  │                    │
│         views in browser    │ Components  │                    │
│                             │ (Perseus)   │                    │
│                             └─────────────┘                    │
└────────────────────────────────────────────────────────────────┘
```

**The flow:**
1. You give Claude Code a prompt (e.g., "Create stories for the dropdown widget")
2. Claude Code calls the MCP tools on the running Storybook server
3. Storybook returns story authoring guidelines and live preview URLs
4. Claude Code writes the code following those guidelines and shares the preview URL
5. You click the link to verify the result in your browser

### What happens without MCP vs. with MCP

**Without MCP**, when you ask Claude Code to write a story for a widget:
1. It reads your source files to understand the component
2. It guesses at story patterns based on its general Storybook knowledge
3. It might use outdated import paths (e.g., `@storybook/test` instead of `storybook/test`)
4. It might hand-write widget props instead of using our generators
5. You manually navigate to Storybook to check if the result looks right

**With MCP**, the same request goes like this:
1. Claude Code calls `get-storybook-story-instructions` to learn this project's specific conventions
2. It reads your source files to understand the component
3. It writes the story following the correct patterns, imports, and data conventions
4. It calls `preview-stories` and gives you a direct link like `http://localhost:6006/?path=/story/widgets-radio--default`
5. You click the link and immediately see the result

### The component manifest and `!manifest` tag

The addon builds a **component manifest** — a structured index of all your
components and their stories. This is what powers the MCP docs tools, letting
AI assistants discover what components exist and how they're used.

Not everything in Storybook is a component. Documentation pages, visual
regression tests, and dev utilities would pollute the manifest with entries
that aren't actual components. The `!manifest` tag excludes them.

**When to add `!manifest` to a story:**

| Story type | Example | Needs `!manifest`? |
| --- | --- | --- |
| Documentation/overview pages | Introduction, Getting Started, a11y docs | Yes |
| Visual regression test stories | `*-regression.stories.tsx` for Chromatic | Yes |
| Dev utilities | `preview.stories.tsx` | Yes |
| Actual widget/component stories | `dropdown.stories.tsx` | No |
| Internal sub-component stories | `choice-indicator.stories.tsx` | No |

**How to add it:**

In `.stories.tsx` files, add `"!manifest"` to the existing tags array:
```typescript
export default {
    title: "Widgets/Definition/Visual Regression Tests/Initial State",
    tags: ["!dev", "!manifest"],
    // ...
};
```

In `.mdx` files, add the `tags` prop to the `<Meta>` component:
```mdx
<Meta title="Widgets/Definition/Accessibility" tags={["!manifest"]} />
```

### Why does Perseus benefit from this?

Perseus has specific patterns that are easy to get wrong:
- **Widget generators** in `packages/perseus-core/src/utils/generators` should be used for test data — not hand-rolled props
- **New stories go in `__docs__/` directories** within each widget/component folder. Some older stories are colocated directly (e.g., `matrix/matrix.stories.tsx`) but haven't been migrated yet.
- **The widget data schema is versioned and strict** — inventing props that don't exist will cause type errors or runtime failures
- There are **~60+ existing story files** across widgets, editors, components, and math-input with established conventions

The MCP connection gives Claude Code direct access to these conventions so it follows them correctly on the first try, rather than requiring you to review and correct its output.

### What you don't need to change about how you work

- You still write and review code the same way
- You still run `pnpm test`, lint, and type-check before submitting PRs
- You still use Storybook in your browser for visual development
- The MCP addon is invisible if you're not using an AI assistant — it adds no overhead to Storybook's normal behavior

The only new step is the one-time `claude mcp add` command in the setup section above. After that, Claude Code uses the tools automatically when they're relevant.