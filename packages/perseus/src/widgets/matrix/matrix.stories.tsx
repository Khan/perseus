import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../server-item-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import {question1} from "./matrix.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Matrix",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to create and interact with mathematical matrices,\
                    supporting linear algebra operations and matrix manipulation.",
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

export const AnswerlessMatrix: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};
