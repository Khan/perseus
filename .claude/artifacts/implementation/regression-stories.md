# Create regression stories (BEFORE color changes)

## Expected Progress Report Output
- List any files used for researching regression stories and the results of that research
- List any other research steps and the results
- List any test failures or other implementation issues that come up during this process, the research done, and the fix

## GATE CHECK
**Before creating any files**: Update the progress report with the research you've done so far (files examined, test data discovered, import paths
verified, interaction patterns identified).

## Actions to Take
- Before writing the stories, reason step-by-step about what the initial state regression stories should cover versus the interactions regression stories and how to cover the full range of functionality. Then write the stories.
    - If the data currently available for the widget does not work for the stories being created, add entries as needed to the data file for the stories being built.
    - For each color identified in the audit, trace which story renders that element in that state. If no story covers it, add one.
- Create two files in the widget's `__docs__/` directory. These establish a Chromatic baseline **before** any color changes.
  - When creating the stories, add a comment above each story describing what the story verifies
  - If the widget can display TeX, include as many stories as needed to capture TeX usage within the widget

**File 1:** `[widget-name]-initial-state-regression.stories.tsx`
- Non-interactive states (static snapshots)
- Tag: `["!dev"]` — renders all stories on one consolidated page in Chromatic

## Template
```typescript
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {descriptiveTestDataName} from "../[widget-name].testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/[WidgetName]/Visual Regression Tests/Initial State",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the [WidgetName] widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const DescriptiveStoryName: Story = {
    args: {
        item: generateTestPerseusItem({question: descriptiveTestDataName}),
    },
};
```

**File 2:** `[widget-name]-interactions-regression.stories.tsx`
- States requiring user interactions (click, focus, hover)
  - Including secondary rendering of content after interaction. Review the widget to determine if this is applicable.
- Tag: `["!autodocs"]` — each story renders on its own page in Chromatic
- Uses Storybook `play` function

```typescript
import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {descriptiveTestDataName} from "../[widget-name].testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/[WidgetName]/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

export const ClickedState = {
    args: {
        item: generateTestPerseusItem({question: descriptiveTestDataName}),
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", {name: "..."});
        await userEvent.click(trigger);
    },
};
```

**Querying within play functions:**
- Use `within(canvasElement)` (not the `canvas` play param) — this avoids `testing-library/prefer-screen-queries` lint errors without eslint-disable comments.
- For WonderBlocks components that render into a React portal (e.g. `SingleSelect`, `MultiSelect` dropdowns), options appear in `document.body` outside the canvas. Query them with:
  ```typescript
  const option = within(document.body).getByRole("option", {name: "ChoiceText"});
  ```

**Initial state vs interactions coverage:**
- If TeX/math content is only visible after a user interaction (e.g. opening a dropdown), it belongs in the **interactions** file, not initial state. A story that looks identical to `DefaultUnanswered` adds no regression value.

**`themeModes` is defined in** `.storybook/modes.ts`:
```typescript
export const themeModes = {
    default: {theme: "default"},
    thunderblocks: {theme: "thunderblocks"},
};
```

**Reference examples:**
- `packages/perseus/src/widgets/explanation/__docs__/explanation-initial-state-regression.stories.tsx`
- `packages/perseus/src/widgets/explanation/__docs__/explanation-interactions-regression.stories.tsx`
- `packages/perseus/src/widgets/definition/__docs__/definition-initial-state-regression.stories.tsx`
