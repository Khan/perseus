import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../server-item-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import {question1} from "./matcher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Matcher",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to match items from two different columns,\
                    creating connections between related concepts or terms.",
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

export const Question1Answerless: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};
