import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1} from "./matrix.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Matrix",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget that allows users to create and interact with mathematical matrices,\
            supporting linear algebra operations and matrix manipulation.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const AnswerlessMatrix: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
        startAnswerless: true,
    },
};
