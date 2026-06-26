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
