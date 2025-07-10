import * as React from "react";
import {action} from "storybook/actions";

import {generateChoice} from "../__tests__/base-radio.testdata";
import BaseRadio from "../base-radio";

type StoryArgs = {
    multipleSelect: boolean;
    editMode: boolean;
    countChoices: boolean;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Widgets/Radio/Base Radio",
    args: {
        multipleSelect: false,
        editMode: false,
        countChoices: false,
    },
} as Story;

const defaultProps = {
    apiOptions: {},
    reviewMode: false,
    choices: [
        generateChoice({
            content: "Content 1",
        }),
        generateChoice({
            content: "Content 2",
        }),
        generateChoice({
            content: "Content 3",
            correct: true,
        }),
        generateChoice({
            isNoneOfTheAbove: true,
        }),
    ],
    deselectEnabled: false,
    editMode: false,
    labelWrap: false,
    countChoices: false,
    numCorrect: 1,
    multipleSelect: false,

    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains
    // an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    onChange: action("changed"),

    // Whether this widget was the most recently used widget in this
    // Renderer. Determines whether we'll auto-scroll the page upon
    // entering review mode.
    isLastUsedWidget: false,
} as const;

export const Interactive = (args: StoryArgs): React.ReactElement => {
    const overwrittenProps = {...defaultProps, ...args} as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const SingleSelectWithNothingSelected = (
    args: StoryArgs,
): React.ReactElement => {
    const overwrittenProps = {...defaultProps, multipleSelect: false} as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const MultipleSelectWithNothingSelected = (
    args: StoryArgs,
): React.ReactElement => {
    const overwrittenProps = {...defaultProps, multipleSelect: true} as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const MultipleSelectWithCountChoicesLabel = (
    args: StoryArgs,
): React.ReactElement => {
    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: true,
        numCorrect: 2,
        countChoices: true,
    } as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const SingleSelected = (args: StoryArgs): React.ReactElement => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => generateChoice({content: `Choice ${i + 1}`}));
    choices[1].checked = true;

    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: false,
        choices,
    } as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const MultipleSelected = (args: StoryArgs): React.ReactElement => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => generateChoice({content: `Choice ${i + 1}`}));
    choices[1].checked = true;
    choices[2].checked = true;

    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: true,
        choices,
    } as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const SingleKitchenSink = (args: StoryArgs): React.ReactElement => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => {
            const choice = generateChoice({
                content: `Choice ${i + 1}`,
                rationale: "This is a neat rationale",
                hasRationale: true,
                showRationale: true,
                correct: false,
                showCorrectness: true,
            });

            return choice;
        });
    choices[1].checked = true;
    choices[2].correct = true;

    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: false,
        choices,
    } as const;
    return <BaseRadio {...overwrittenProps} />;
};

export const MultipleKitchenSink = (args: StoryArgs): React.ReactElement => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => {
            const choice = generateChoice({
                content: `Choice ${i + 1}`,
                rationale: "This is a neat rationale",
                hasRationale: true,
                showRationale: true,
                correct: false,
                showCorrectness: true,
            });

            return choice;
        });
    choices[1].checked = true;
    choices[2].checked = true;
    choices[2].correct = true;
    choices[3].correct = true;

    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: true,
        numCorrect: 2,
        choices,
    } as const;
    return <BaseRadio {...overwrittenProps} />;
};
