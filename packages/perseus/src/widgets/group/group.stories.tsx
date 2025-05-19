import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {getFullGroupTestItem, question1} from "./group.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Group",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const Answerful: Story = {
    args: {
        item: getFullGroupTestItem(),
    },
};

export const Answerless: Story = {
    args: {
        item: getFullGroupTestItem(),
        startAnswerless: true,
    },
};
