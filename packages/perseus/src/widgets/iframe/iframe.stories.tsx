import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1} from "./iframe.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/IFrame",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget that embeds external web content within exercises using iframes,\
            allowing integration with third-party interactive elements.",
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
