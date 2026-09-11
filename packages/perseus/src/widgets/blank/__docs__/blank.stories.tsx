import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {
    basicBlankQuestion,
    subscriptQuestion,
    superscriptQuestion,
} from "../blank.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Blank",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A blank widget component used as a dropzone for Answer Tiles within Drag And Drop widgets",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

export const BasicBlankQuestion: Story = {
    args: {question: basicBlankQuestion},
};
export const SuperscriptQuestion: Story = {
    args: {question: superscriptQuestion},
};
export const SubscriptQuestion: Story = {
    args: {question: subscriptQuestion},
};
