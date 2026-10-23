import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {paragraphFillInTheBlankQuestion} from "../fill-in-the-blank.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * Fill in the Blank asks learners to drag answer tiles from a choice bank
 * into blanks in a passage, or to place them through each tile's menu.
 */
const meta: Meta<typeof QuestionRendererForStories> = {
    title: "Widgets/Fill in the Blank/Widget Demo",
    component: QuestionRendererForStories,
    tags: ["!autodocs"],
    // TODO(LEMS-4396): clean up feature flag
    globals: {featureFlags: ["dnd-widget-fitb"]},
    render: (args) => <QuestionRendererForStories {...args} />,
    args: {
        question: paragraphFillInTheBlankQuestion,
    },
};

export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

/** A paragraph with four empty blanks. */
export const Paragraph: Story = {};

/** The same paragraph with every blank answered. */
export const ParagraphAnswered: Story = {
    args: {
        initialUserInput: {
            "fill-in-the-blank 1": {
                "blank 1": {selected: "bongo"},
                "blank 2": {selected: "tambourine"},
                "blank 3": {selected: "snare"},
                "blank 4": {selected: "bass"},
            },
        },
    },
};
