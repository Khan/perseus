import {
    generateTestPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {generateTableRenderer} from "./test-util";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Table",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

const tableItem: PerseusItem = generateTestPerseusItem({
    question: generateTableRenderer(),
});

export const AnswerfulTable: Story = {
    args: {
        item: tableItem,
    },
};

export const AnswerlessTable: Story = {
    args: {
        item: tableItem,
        startAnswerless: true,
    },
};
