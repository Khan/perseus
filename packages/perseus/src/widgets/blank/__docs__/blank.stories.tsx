import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {basicBlankQuestion, subscriptQuestion} from "../blank.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Blank",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A blank widget component used as a dropzone for Answer Tiles within Drag And Drop widgets",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const BasicBlankQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: basicBlankQuestion}),
    },
};
export const SubscriptQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: subscriptQuestion}),
    },
};
