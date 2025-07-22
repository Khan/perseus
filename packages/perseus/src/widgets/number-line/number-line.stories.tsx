import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {inequality, question1, question2} from "./number-line.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Number Line",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget that displays a number line for marking positions, points, and intervals,\
            allowing users to demonstrate number sense and mathematical operations.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const BasicQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const ShowTickController: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};

export const WithAnswerlessData: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
        startAnswerless: true,
    },
};

export const Inequality: Story = {
    args: {
        item: generateTestPerseusItem({question: inequality}),
    },
};
