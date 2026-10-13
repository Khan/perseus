import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../server-item-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import {dotPlotter, question1, simple} from "./plotter.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Plotter",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
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

type Story = StoryObj<typeof WrappedServerItemRenderer>;

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
