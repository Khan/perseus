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
    title: "Widgets/Graded Group Set/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group Set widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Two-group set showing the title (fontSize: 12) and both indicator dots.
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

export const DefaultArticle: Story = {
    render: () => <ArticleRendererWithDebugUI json={twoGroupArticle} />,
};

export const MobileUnanswered: Story = {
    render: () => (
        <ArticleRendererWithDebugUI
            json={twoGroupArticle}
            apiOptions={{isMobile: true}}
        />
    ),
};
