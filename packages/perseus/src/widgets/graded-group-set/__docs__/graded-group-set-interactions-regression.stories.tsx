import {
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ArticleRendererWithDebugUI} from "../../../testing/article-renderer-with-debug-ui";
import {Indicators} from "../graded-group-set";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group Set widget that require " +
                    "user interactions. Each story renders on its own Chromatic page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Group content is plain text (no child widget): navigating between groups by
// clicking the indicator pips doesn't require a scorable widget. The pips'
// resting visuals are covered by the IndicatorPips story in the Initial State
// file, and answering → answer-bar-state transitions are covered by
// graded-group's unit tests plus the answer-bar regression story.
const twoGroupArticle = generateTestPerseusRenderer({
    content: "[[☃ graded-group-set 1]]",
    widgets: {
        "graded-group-set 1": generateGradedGroupSetWidget({
            options: {
                gradedGroups: [
                    generateGradedGroupOptions({
                        title: "Problem 1a",
                        content: "The first problem in the set.",
                    }),
                    generateGradedGroupOptions({
                        title: "Problem 1b",
                        content: "The second problem in the set.",
                    }),
                ],
            },
        }),
    },
});

export const IndicatorNavigation: Story = {
    render: () => <ArticleRendererWithDebugUI json={twoGroupArticle} />,
    play: async ({canvas, userEvent}) => {
        const secondIndicator = canvas.getByRole("button", {
            name: "Problem 1b",
        });
        await userEvent.click(secondIndicator);
    },
};

// Indicators only reads each group's `title`, so a few generated groups are all
// it needs to render the pips in isolation — no child widget required.
const makeGroups = (count: number) =>
    Array.from({length: count}, (_, i) =>
        generateGradedGroupOptions({title: `Problem ${i + 1}`}),
    );

// Tabbing to the first pip focuses it, which draws the hover/focus outline
// ring. Hover produces the same ring, so this one snapshot covers both.
export const IndicatorPipFocused: Story = {
    render: () => (
        <Indicators
            currentGroup={0}
            gradedGroups={makeGroups(5)}
            onChangeCurrentGroup={() => {}}
        />
    ),
    play: async ({userEvent}) => {
        await userEvent.tab();
    },
};
