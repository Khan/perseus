import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1, question2} from "./sorter.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Sorter",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to arrange items in a specific order by dragging and dropping.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const Question2: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};

export const AnswerlessQuestion1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
        startAnswerless: true,
    },
};
