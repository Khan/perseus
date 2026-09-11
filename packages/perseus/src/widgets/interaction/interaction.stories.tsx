import QuestionRendererForStories from "../__testutils__/question-renderer-for-stories";

import {
    question1,
    questionWithMovablePointMissingConstraints,
} from "./interaction.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Interaction",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that enables rich interactive experiences with customizable elements,\
                    allowing users to engage with content through direct manipulation.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

export const Question1: Story = {
    args: {question: question1},
};

export const Question2: Story = {
    args: {question: questionWithMovablePointMissingConstraints},
};
