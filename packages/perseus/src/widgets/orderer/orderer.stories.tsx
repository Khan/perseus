import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {
    question1,
    question2,
    questionWithImages,
    questionWithManyCards,
} from "./orderer.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Orderer",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to arrange items in a specific order by dragging and dropping,\
                    enabling sequencing and sorting activities.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const QuestionWithImages: Story = {
    args: {
        item: generateTestPerseusItem({question: questionWithImages}),
    },
};

export const Answerless: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
        startAnswerless: true,
    },
};

export const ManyCardsHorizontalLayout: Story = {
    name: "Many Cards (LEMS-3424 Horizontal Layout Regression Test)",
    args: {
        item: generateTestPerseusItem({question: questionWithManyCards}),
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Tests horizontal layout with 10 cards to ensure they don't wrap to multiple rows. " +
                    "This is a visual regression test for the CSS reset removal bug that caused cards to wrap. " +
                    "All cards should remain in a single horizontal line with horizontal scrolling if needed.",
            },
        },
    },
};
