import QuestionRendererForStories from "../__testutils__/question-renderer-for-stories";

import {question1} from "./python-program.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Python Program",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that enables users to write and execute Python code directly in the browser,\
                    supporting programming instruction and interactive coding exercises.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

export const Question1: Story = {
    args: {question: question1},
};
