import {
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ApiOptions} from "../../../perseus-api";
import {phoneMargin} from "../../../styles/constants";
import {rtlDecorator} from "../../__testutils__/story-decorators";
import GradedGroupAnswerBar from "../graded-group-answer-bar";

import {gradedGroupRendererDecorator} from "./graded-group-renderer-decorator";

import type {ANSWER_BAR_STATES} from "../graded-group-answer-bar";
import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusGradedGroupWidgetOptions> = {
    title: "Widgets/Graded Group/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs = {
    title: "Check your understanding!",
    content:
        "Which of the following is a renewable energy source?\n\n[[☃ radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("Coal"),
                    generateRadioChoice("Natural gas"),
                    generateRadioChoice("Solar power", {correct: true}),
                    generateRadioChoice("Petroleum"),
                ],
            }),
        }),
    },
    hint: {
        content:
            "Solar power is renewable because sunlight is continuously available.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

export const DefaultDesktop: Story = {
    decorators: [gradedGroupRendererDecorator],
    args: sharedArgs,
};

export const MobileUnanswered: Story = {
    decorators: [gradedGroupRendererDecorator],
    args: sharedArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
};

export const RightToLeft: Story = {
    decorators: [gradedGroupRendererDecorator, rtlDecorator],
    args: sharedArgs,
};

const texArgs = {
    title: "Check your understanding!",
    content:
        "Which of the following values of $x$ satisfies $\\sqrt{64}=x$?\n\n[[☃ radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("$-8$"),
                    generateRadioChoice("$8$", {correct: true}),
                    generateRadioChoice("$64$"),
                    generateRadioChoice("No value of $x$ works"),
                ],
            }),
        }),
    },
    hint: {
        content: "$\\sqrt{64} = 8$ because $8^2 = 64$.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

export const DesktopWithTex: Story = {
    decorators: [gradedGroupRendererDecorator],
    args: texArgs,
};

const noop = () => {};

// The mobile answer bar takes its state as a prop, so each state is rendered
// directly — no scorable child widget or play function is needed to reach
// "incorrect" or "correct". These snapshots capture only the answer bar chrome:
// the "try again" icon, the "Correct!" star, and the Check button.
//
// The bar uses negative horizontal margins to bleed to the edges of the
// graded-group's padded mobile container, so this wrapper restores that padding
// to lay it out the way it appears in context.
const AnswerBarInContext = ({
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
export const AnswerBarActive: Story = {
    render: () => <AnswerBarInContext state="ACTIVE" />,
};

// Initial state (or waiting for more input): the Check button is disabled.
export const AnswerBarInactive: Story = {
    render: () => <AnswerBarInContext state="INACTIVE" />,
};

// After a wrong answer: the neutral "try again" icon and "Keep trying" message.
export const AnswerBarIncorrect: Story = {
    render: () => <AnswerBarInContext state="INCORRECT" />,
};

// After a correct answer, last group in the set: the success star, centered.
export const AnswerBarCorrect: Story = {
    render: () => <AnswerBarInContext state="CORRECT" />,
};

// After a correct answer with more groups remaining: the "Next question"
// button appears, so the success message left-aligns instead of centering.
export const AnswerBarCorrectWithNextQuestion: Story = {
    render: () => <AnswerBarInContext state="CORRECT" onNextQuestion={noop} />,
};
