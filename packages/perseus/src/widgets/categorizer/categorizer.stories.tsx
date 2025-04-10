import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {generateTestPerseusItem} from "../../util/test-utils";

import {question1} from "./categorizer.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Categorizer",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({
            question: question1,
        }),
    },
};

export const AnswerlessCategorizer: Story = {
    args: {
        item: generateTestPerseusItem({
            question: question1,
        }),
        startAnswerless: true,
    },
};
