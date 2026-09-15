import QuestionRendererForStories from "../__testutils__/question-renderer-for-stories";

import {question1} from "./iframe.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/IFrame",
    component: QuestionRendererForStories,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that embeds external web content within exercises using iframes,\
                    allowing integration with third-party interactive elements.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

export const Question1: Story = {
    args: {question: question1},
};
