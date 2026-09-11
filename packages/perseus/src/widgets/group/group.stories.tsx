import QuestionRendererForStories from "../__testutils__/question-renderer-for-stories";

import {
    getFullGroupTestItem,
    getSplitGroupTestItem,
    question1,
} from "./group.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Group",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A container widget that allows for logical grouping of multiple widgets,\
                    enabling organized layout and shared context for related interactive elements.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

export const Question1: Story = {
    args: {question: question1},
};

export const Answerful: Story = {
    args: {question: getFullGroupTestItem().question},
};

export const Answerless: Story = {
    args: {question: getSplitGroupTestItem().question},
};
