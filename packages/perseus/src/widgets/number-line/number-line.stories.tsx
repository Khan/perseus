import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {generateTestPerseusItem} from "../../util/test-utils";

import {question1, question2} from "./number-line.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Number Line",
    component: ServerItemRendererWithDebugUI,
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
