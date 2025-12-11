import {
    generateDropdownWidget,
    generateDropdownOptions,
    type PerseusRenderer,
    generateTestPerseusRenderer,
    generateGradedGroupSetWidget,
    generateGradedGroupOptions,
} from "@khanacademy/perseus-core";

import {ArticleRendererWithDebugUI} from "../../../../../testing/article-renderer-with-debug-ui";

import {
    article1,
    groupSetRadioRationaleQuestion,
} from "./graded-group-set.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set",
    component: ArticleRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that organizes multiple graded groups into a sequential set,\
                    allowing users to progress through a series of related problems or exercises.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const Article1: Story = {
    args: {
        json: article1,
    },
};

export const GroupSetRadioQuestion: Story = {
    args: {
        json: groupSetRadioRationaleQuestion,
    },
};

const dropdownTest: PerseusRenderer = generateTestPerseusRenderer({
    content: `Test article with dropdown widget to check mobile answer bar behavior.

[[☃ graded-group-set 1]]

This tests if dropdown widgets trigger the mobile answer bar correctly.`,
    widgets: {
        "graded-group-set 1": generateGradedGroupSetWidget({
            options: {
                gradedGroups: [
                    generateGradedGroupOptions({
                        title: "Dropdown Test",
                        content: "What color is the sky?\n\n[[☃ dropdown 1]]",
                        widgets: {
                            "dropdown 1": generateDropdownWidget({
                                options: generateDropdownOptions({
                                    placeholder: "Choose an answer",
                                    choices: [
                                        {
                                            content: "Blue",
                                            correct: true,
                                        },
                                        {
                                            content: "Red",
                                            correct: false,
                                        },
                                        {
                                            content: "Green",
                                            correct: false,
                                        },
                                    ],
                                    static: false,
                                }),
                            }),
                        },
                        hint: generateTestPerseusRenderer({
                            content:
                                "Think about what you see when you look up on a clear day!",
                        }),
                        widgetEnabled: true,
                        immutableWidgets: false,
                    }),
                ],
            },
        }),
    },
});

export const DropdownTest: Story = {
    args: {
        title: "📋 Dropdown Test (Mobile Answer Bar)",
        json: dropdownTest,
    },
};
