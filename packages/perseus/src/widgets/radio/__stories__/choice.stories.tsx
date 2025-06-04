import * as React from "react";
import {action} from "storybook/actions";

import Choice from "../choice";

type StoryArgs = {
    checked: boolean;
    rationale: React.ReactNode;
    content: React.ReactNode;
    correct: boolean;
    disabled: boolean;
    pos: number;
    reviewMode: boolean;
    showRationale: boolean;
    showCorrectness: boolean;
    multipleSelect: boolean;
    previouslyAnswered: boolean;
    onChange: (newValues: {checked: boolean}) => void;
};

type Story = {
    title: string;
    args: StoryArgs;
};

const defaultProps = {
    checked: false,
    rationale: "This is a good rationale",
    content: "This is a possible choice",
    correct: true,
    disabled: false,
    pos: 0,
    reviewMode: false,
    showRationale: false,
    showCorrectness: false,
    multipleSelect: false,
    previouslyAnswered: false,
    onChange: action("changed"),
} as const;

export default {
    title: "Perseus/Widgets/Radio/Choice",
    args: defaultProps,
} as Story;

export const Interactive = (args: StoryArgs): React.ReactElement => {
    return <Choice {...args} />;
};

export const Checked = (args: StoryArgs): React.ReactElement => {
    const sharedProps = {
        ...defaultProps,
        checked: true,
        showCorrectness: true,
    } as const;
    const correctProps = {
        ...sharedProps,
        correct: true,
        content: "This choice is correct",
    } as const;
    const incorrectProps = {
        ...sharedProps,
        correct: false,
        content: "This choice is incorrect",
    } as const;
    return (
        <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>
    );
};

export const ReviewMode = (args: StoryArgs): React.ReactElement => {
    const sharedProps = {
        ...defaultProps,
        showCorrectness: true,
        reviewMode: true,
        multipleSelect: true,
    } as const;
    return (
        <>
            <Choice
                {...sharedProps}
                correct={true}
                checked={true}
                content="This choice was correct and checked"
            />
            <Choice
                {...sharedProps}
                correct={true}
                content="This choice was also correct and not checked"
            />
            <Choice
                {...sharedProps}
                correct={false}
                checked={true}
                content="This choice was incorrect and checked"
            />
            <Choice
                {...sharedProps}
                correct={false}
                content="This choice was also incorrect and not checked"
            />
        </>
    );
};

export const Rationale = (args: StoryArgs): React.ReactElement => {
    const sharedProps = {
        ...defaultProps,
        checked: true,
        showCorrectness: true,
        showRationale: true,
        reviewMode: true,
    } as const;
    const correctProps = {
        ...sharedProps,
        correct: true,
        content: "This choice is correct",
        rationale: "It was correct because of the way it is",
    } as const;
    const incorrectProps = {
        ...sharedProps,
        correct: false,
        content: "This choice is incorrect",
        rationale: "It was incorrect because of the way it is",
    } as const;
    return (
        <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>
    );
};
