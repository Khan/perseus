import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {question1, question2} from "../video.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Video",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that enables embedding educational videos within content for interactive learning.",
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
    args: {question: question2},
};
