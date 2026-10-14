import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../server-item-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import {
    groupedRadioRationaleQuestion,
    question1,
} from "./graded-group.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that combines multiple questions into a single group with shared feedback and grading,\
                    allowing for complex problem-solving scenarios with multiple parts.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const WithRadioWidget: Story = {
    args: {
        item: generateTestPerseusItem({
            question: groupedRadioRationaleQuestion,
        }),
    },
};
