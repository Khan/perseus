import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../server-item-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import {question1} from "./categorizer.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Categorizer",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that creates interactive, expandable term definitions within\
                    content, allowing users to click on terms to reveal their meanings\
                    without leaving the current context.",
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

export const AnswerlessCategorizer: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};
