import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../server-item-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import {inequality, question1, tickCtrl} from "./number-line.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Number Line",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that displays a number line for marking positions, points, and intervals,\
                    allowing users to demonstrate number sense and mathematical operations.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

export const BasicQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const ShowTickController: Story = {
    args: {
        item: generateTestPerseusItem({question: tickCtrl}),
    },
};

export const WithAnswerlessData: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const Inequality: Story = {
    args: {
        item: generateTestPerseusItem({question: inequality}),
    },
};
