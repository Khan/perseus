import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1, question2, question3} from "./__tests__/passage.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Passage",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const SimpleQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const MultiPassageQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};

export const SingleNumberedPassage: Story = {
    args: {
        item: generateTestPerseusItem({question: question3}),
    },
};
