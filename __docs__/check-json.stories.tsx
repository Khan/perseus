import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../packages/perseus/src/testing/server-item-renderer-with-debug-ui";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Check JSON",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const CheckJson: Story = {
    name: "Check JSON",
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "Update JSON below to render a Perseus item.",
            }),
        }),
        // Load the debug accordion in the open state.
        expanded: true,
    },
};
