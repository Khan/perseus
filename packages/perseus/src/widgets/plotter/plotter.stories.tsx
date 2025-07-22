import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {dotPlotter, question1, simple} from "./plotter.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Plotter",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget for creating and displaying data visualizations such as line plots and scatter plots,\
            allowing users to represent and interpret data graphically.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Basic: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const AnswerlessPlotter: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
        startAnswerless: true,
    },
};

export const SimplePlotter: Story = {
    args: {
        item: generateTestPerseusItem({question: simple}),
        startAnswerless: true,
    },
};

export const DotPlotter: Story = {
    args: {
        item: generateTestPerseusItem({question: dotPlotter}),
        startAnswerless: true,
    },
};
