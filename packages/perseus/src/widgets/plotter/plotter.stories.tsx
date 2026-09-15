import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../__testutils__/story-decorators";

import {dotPlotter, question1, simple} from "./plotter.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {plotterRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Plotter",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    decorators: [registerWidgetsDecorator([plotterRegistration])],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget for creating and displaying data visualizations such as line plots and scatter plots,\
                    allowing users to represent and interpret data graphically.",
            },
        },
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
    },
};

export const SimplePlotter: Story = {
    args: {
        item: generateTestPerseusItem({question: simple}),
    },
};

export const DotPlotter: Story = {
    args: {
        item: generateTestPerseusItem({question: dotPlotter}),
    },
};
