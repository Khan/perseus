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

**File 1:** `[widget-name]-renderer-decorator.tsx`
- Decorators to use within the stories files so the widget can render
  within a question renderer.
- The `component` in the story meta should **always** be `getWidget("widget-name")`,
  never the renderer. The decorator handles wrapping.
- Choose the right renderer based on what the widget needs:

**Option A — `QuestionRendererForStories`** (most widgets)
Use when the widget does NOT need a "Check answer" button or server-side scoring.

```typescript
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

export const widgetNameRendererDecorator = (_, {args, parameters}) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ widgetName 1]]",
                widgets: {
                    "widgetName 1": generateWidgetNameWidget({
                        options: generateWidgetNameOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
```

**Option B — `ServerItemRendererWithDebugUI`** (widgets that need scoring/check)
Use when interactions stories need to click "Check answer" or verify graded states.
`ServerItemRendererWithDebugUI` provides the full item renderer with a check button.

```typescript
import {
    generateLabelImageOptions,
    generateLabelImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

export const widgetNameRendererDecorator = (_, {args, parameters}) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: parameters?.content ?? "[[☃ widgetName 1]]",
                    widgets: {
                        "widgetName 1": generateWidgetNameWidget({
                            options: generateWidgetNameOptions({
                                ...args,
                            }),
                        }),
                    },
                }),
            })}
        />
    );
};
```

**File 2:** `[widget-name]-initial-state-regression.stories.tsx`
- Non-interactive states (static snapshots)

## Template
```typescript
import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {widgetNameRendererDecorator} from "../../__testutils__/widgetName-renderer-decorator";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {Meta, StoryObj} from "@storybook/react-vite";

const WidgetNameWidget = getWidget("widget-name")!;

const meta: Meta<typeof WidgetNameWidget> = {
    title: "Widgets/[WidgetName]/Visual Regression Tests/Initial State",
    component: WidgetNameWidget,
    tags: ["!autodocs"],
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

type Story = StoryObj<typeof WidgetNameWidget>;

// If multiple stories share the same args, extract to a typed constant.
// satisfies validates against the options type while preserving the exact
// inferred type (avoids the | undefined widening that a type annotation adds).
const sharedArgs = {
    fieldOne: "value",
    fieldTwo: 42,
} satisfies Partial<PerseusWidgetNameWidgetOptions>;

// For unique per-story args, use satisfies inline on each args object.
export const DescriptiveStoryName: Story = {
    decorators: [widgetNameRendererDecorator],
    args: {
        fieldOne: "value",
        fieldTwo: 42,
    } satisfies Partial<PerseusWidgetNameWidgetOptions>,
};

// Stories referencing a shared typed constant don't need satisfies again.
export const AnotherStory: Story = {
    decorators: [widgetNameRendererDecorator],
    args: sharedArgs,
};

export const RightToLeft: Story = {
    decorators: [widgetNameRendererDecorator, rtlDecorator],
    args: sharedArgs,
}
```

**File 3:** `[widget-name]-interactions-regression.stories.tsx`
- States requiring user interactions (click, focus, hover)
  - Including secondary rendering of content after interaction. Review the widget to determine if this is applicable.
- Tag: `["!autodocs"]` — each story renders on its own page in Chromatic
- Uses Storybook `play` function

```typescript
import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {widgetNameRendererDecorator} from "../../__testutils__/widgetName-renderer-decorator";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {Meta} from "@storybook/react-vite";

const WidgetNameWidget = getWidget("widget-name")!;

const meta: Meta<typeof WidgetNameWidget> = {
    title: "Widgets/[WidgetName]/Visual Regression Tests/Interactions",
    component: WidgetNameWidget,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

const sharedArgs = {
    fieldOne: "value",
    fieldTwo: 42,
} satisfies Partial<PerseusWidgetNameWidgetOptions>;

export const ClickedState = {
    decorators: [widgetNameRendererDecorator],
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const trigger = canvas.getByRole("button", {name: "..."});
        await userEvent.click(trigger);
    },
};

export const RightToLeftClickedState = {
    decorators: [widgetNameRendererDecorator, rtlDecorator],
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const trigger = canvas.getByRole("button", {name: "..."});
        await userEvent.click(trigger);
    },
};
```

**Story args pattern:**
- Define widget options inline as `args` — do NOT import testdata from `__tests__/` files.
  Testdata files are for unit tests; stories should be self-contained.
- Use `satisfies Partial<PerseusWidgetNameWidgetOptions>` on every inline `args` object.
  This validates field names and types against the options schema while preserving the
  exact inferred type (avoids `| undefined` widening that a type annotation introduces).
- When multiple stories share identical args, extract to a typed constant above the stories
  and reference it. The constant uses `satisfies`; individual stories referencing it don't need it again.
- If a field requires a runtime value not in the schema type (e.g. `showCorrectness` on a marker),
  use `as any` on that specific value with a comment explaining why:
  ```typescript
  markers: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {answers: ["X"], label: "...", x: 0, y: 0, showCorrectness: "incorrect"} as any,
  ]
  ```

**Querying within play functions:**
- For WonderBlocks components that render into a React portal (e.g. `SingleSelect`, `MultiSelect` dropdowns), options appear in `document.body` outside the canvas. Query them with:
  ```typescript
  const option = document.body.getByRole("option", {name: "ChoiceText"});
  ```

**RTL stories:**
- Include RTL stories for text-heavy widgets where `direction: rtl` meaningfully changes the visual layout (e.g. definition, explanation, radio choices).
- **Skip RTL stories** for image-based widgets where elements are absolutely positioned on an image (e.g. label-image). The `direction` CSS property has no effect on absolute positioning, so the story would be visually identical and adds no regression value.

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
- `QuestionRendererForStories` decorator: `packages/perseus/src/widgets/__testutils__/image-renderer-decorator.tsx`
- `ServerItemRendererWithDebugUI` decorator: `packages/perseus/src/widgets/__testutils__/label-image-renderer-decorator.tsx`
- Initial state stories: `packages/perseus/src/widgets/label-image/__docs__/label-image-initial-state-regression.stories.tsx`
- Interactions stories: `packages/perseus/src/widgets/label-image/__docs__/label-image-interactions-regression.stories.tsx`
