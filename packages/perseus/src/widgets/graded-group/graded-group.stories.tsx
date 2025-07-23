import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {
    groupedRadioRationaleQuestion,
    question1,
} from "./graded-group.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "A widget that combines multiple questions into a single group with shared feedback and grading,\
            allowing for complex problem-solving scenarios with multiple parts.",
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const WithRadioWidget: Story = {
    args: {
        item: generateTestPerseusItem({
            question: groupedRadioRationaleQuestion,
        }),
    },
};
