import * as React from "react";

import {AnswerPill} from "../answer-pill";

import type {Meta} from "@storybook/react-vite";

const story: Meta<React.ComponentProps<typeof AnswerPill>> = {
    title: "Widgets/Label Image/Widget Internal Components/Answer Pill",
    component: AnswerPill,
    render: (args) => <AnswerPill {...args} />,
    argTypes: {
        showCorrectness: {
            options: ["not answered", "correct", "incorrect"],
            control: {
                type: "radio",
            },
        },
    },
    tags: ["autodocs", "!dev"],
    parameters: {
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};
export default story;

export const SingleAnswer = {
    args: {
        id: "1",
        selectedAnswers: ["Answer Pill"],
        markerRef: null,
        side: "top",
        onClick: () => {},
    },
};

export const MultipleAnswers = {
    args: {
        id: "1",
        selectedAnswers: ["Answer 1", "Answer 2"],
        markerRef: null,
        side: "top",
        onClick: () => {},
    },
};

export const Correct = {
    args: {
        id: "1",
        selectedAnswers: ["Right Answer"],
        showCorrectness: "correct",
        markerRef: null,
        side: "top",
        onClick: () => {},
    },
};

export const Incorrect = {
    args: {
        id: "1",
        selectedAnswers: ["Wrong Answer"],
        showCorrectness: "incorrect",
        markerRef: null,
        side: "top",
        onClick: () => {},
    },
};
