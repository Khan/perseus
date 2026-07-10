import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ApiOptions} from "../../../perseus-api";
import {phoneMargin} from "../../../styles/constants";
import GradedGroupAnswerBar from "../graded-group-answer-bar";

import type {ANSWER_BAR_STATES} from "../graded-group-answer-bar";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group/Visual Regression Tests/Answer Bar",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the mobile graded-group answer bar. The " +
                    "bar takes its state as a prop, so each state is rendered " +
                    "directly here — no scorable child widget and no play function " +
                    "are needed to reach 'incorrect' or 'correct'. The snapshot " +
                    "captures only the answer bar chrome: the 'try again' icon, " +
                    "the 'Correct!' star, and the Check button.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

// The answer bar uses negative horizontal margins so it can bleed to the edges
// of the graded-group's padded mobile container. This wrapper restores that
// padding so the bar lays out the way it does in context.
const InContext = ({
    state,
    onNextQuestion,
}: {
    state: ANSWER_BAR_STATES;
    onNextQuestion?: () => void;
}) => (
    <div style={{paddingLeft: phoneMargin, paddingRight: phoneMargin}}>
        <GradedGroupAnswerBar
            answerBarState={state}
            apiOptions={ApiOptions.defaults}
            onCheckAnswer={noop}
            onNextQuestion={onNextQuestion}
        />
    </div>
);

// Answerable: the Check button is enabled.
export const Active: Story = {
    render: () => <InContext state="ACTIVE" />,
};

// Initial state (or waiting for more input): the Check button is disabled.
export const Inactive: Story = {
    render: () => <InContext state="INACTIVE" />,
};

// After a wrong answer: the neutral "try again" icon and "Keep trying" message.
export const Incorrect: Story = {
    render: () => <InContext state="INCORRECT" />,
};

// After a correct answer, last group in the set: the success star, centered.
export const Correct: Story = {
    render: () => <InContext state="CORRECT" />,
};

// After a correct answer with more groups remaining: the "Next question"
// button appears, so the success message left-aligns instead of centering.
export const CorrectWithNextQuestion: Story = {
    render: () => <InContext state="CORRECT" onNextQuestion={noop} />,
};
