import {
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ArticleRendererWithDebugUI} from "../../../testing/article-renderer-with-debug-ui";

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

const twoGroupArticle = generateTestPerseusRenderer({
    content: "[[☃ graded-group-set 1]]",
    widgets: {
        "graded-group-set 1": generateGradedGroupSetWidget({
            options: {
                gradedGroups: [
                    generateGradedGroupOptions({
                        title: "Problem 1a",
                        content: "$0.5 + 0.4 =$ [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": generateNumericInputWidget({
                                options: generateNumericInputOptions({
                                    answers: [
                                        generateNumericInputAnswer({
                                            value: 0.9,
                                        }),
                                    ],
                                }),
                            }),
                        },
                    }),
                    generateGradedGroupOptions({
                        title: "Problem 1b",
                        content: "$0.6 + 0.4 =$ [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": generateNumericInputWidget({
                                options: generateNumericInputOptions({
                                    answers: [
                                        generateNumericInputAnswer({value: 1}),
                                    ],
                                }),
                            }),
                        },
                    }),
                ],
            },
        }),
    },
});

// Clicking the second indicator dot navigates to the second group, showing
// "Problem 1b" in the title and the second indicator as active.
export const IndicatorNavigation: Story = {
    render: () => <ArticleRendererWithDebugUI json={twoGroupArticle} />,
    play: async ({canvas, userEvent}) => {
        const secondIndicator = canvas.getByRole("button", {
            name: "Problem 1b",
        });
        await userEvent.click(secondIndicator);
    },
};

// Desktop: answer the first group correctly. Captures the graded-group-set
// correct state: green check icon alongside a "Next question" button, which
// only appears when onNextQuestion is wired up by the parent set.
export const DesktopFirstGroupCorrectAnswer: Story = {
    render: () => <ArticleRendererWithDebugUI json={twoGroupArticle} />,
    play: async ({canvas, userEvent}) => {
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "0.9");
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

// Mobile: answer the first group correctly. The answer bar shows the CORRECT
// state with a "Next question" button (space-between layout), distinct from
// the standalone correct state which centers the star icon alone.
export const MobileFirstGroupCorrectAnswer: Story = {
    render: () => (
        <ArticleRendererWithDebugUI
            json={twoGroupArticle}
            apiOptions={{isMobile: true}}
        />
    ),
    play: async ({canvas, userEvent}) => {
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "0.9");
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};
