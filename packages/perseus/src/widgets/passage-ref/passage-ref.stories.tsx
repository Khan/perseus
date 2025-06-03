import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1, question2} from "./passage-ref.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Widgets/PassageRef",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const ShortPassage: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const LongPassage: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};
