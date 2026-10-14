import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {
    ipsumExample,
    question1,
    question2,
    wideButton,
} from "../explanation.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Explanation",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that provides additional information or context through expandable sections,\
                    allowing users to access supplementary explanations when needed.",
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

export const Question2: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};

export const IpsumExample: Story = {
    args: {
        item: generateTestPerseusItem({question: ipsumExample}),
    },
};

export const WideButton: Story = {
    args: {
        item: generateTestPerseusItem({question: wideButton}),
    },
};
