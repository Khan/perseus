import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {
    ipsumExample,
    question1,
    question2,
    wideButton,
} from "./explanation.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Widgets/Explanation",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {item: generateTestPerseusItem({question: question1})},
};

export const Question2: Story = {
    args: {item: generateTestPerseusItem({question: question2})},
};

export const IpsumExample: Story = {
    args: {item: generateTestPerseusItem({question: ipsumExample})},
};

export const WideButton: Story = {
    args: {item: generateTestPerseusItem({question: wideButton})},
};
