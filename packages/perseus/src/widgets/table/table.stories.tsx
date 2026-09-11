import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";

import QuestionRendererForStories from "../__testutils__/question-renderer-for-stories";

import {generateTableRenderer} from "./test-util";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Table",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to input data into a table with customizable rows and columns.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

const tableQuestion = generateTableRenderer();

export const AnswerfulTable: Story = {
    args: {question: tableQuestion},
};

export const AnswerlessTable: Story = {
    args: {
        question: splitPerseusItem(
            generateTestPerseusItem({question: tableQuestion}),
        ).question,
    },
};
