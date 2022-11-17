// @flow
import {action} from "@storybook/addon-actions";
import * as React from "react";

import Choice from "../choice.jsx";

type StoryArgs = {|
    checked: boolean,
    rationale: React.Node,
    content: React.Node,
    correct: boolean,
    disabled: boolean,
    pos: number,
    reviewMode: boolean,
    showRationale: boolean,
    showCorrectness: boolean,
    multipleSelect: boolean,
    crossedOut: boolean,
    previouslyAnswered: boolean,
    onChange: (newValues: {checked: boolean, crossedOut: boolean}) => void,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

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
    crossedOut: false,
    previouslyAnswered: false,
    onChange: action("changed"),
};

export default ({
    title: "Perseus/Widgets/Radio/Choice",
    args: defaultProps,
}: Story);

export const Interactive = (args: StoryArgs): React.Node => {
    return <Choice {...args} />;
};

export const Checked = (args: StoryArgs): React.Node => {
    const sharedProps = {
        ...defaultProps,
        checked: true,
        showCorrectness: true,
    };
    const correctProps = {
        ...sharedProps,
        correct: true,
        content: "This choice is correct",
    };
    const incorrectProps = {
        ...sharedProps,
        correct: false,
        content: "This choice is incorrect",
    };
    return (
        <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>
    );
};

export const ReviewMode = (args: StoryArgs): React.Node => {
    const sharedProps = {
        ...defaultProps,
        showCorrectness: true,
        reviewMode: true,
        multipleSelect: true,
    };
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

export const Rationale = (args: StoryArgs): React.Node => {
    const sharedProps = {
        ...defaultProps,
        checked: true,
        showCorrectness: true,
        showRationale: true,
        reviewMode: true,
    };
    const correctProps = {
        ...sharedProps,
        correct: true,
        content: "This choice is correct",
        rationale: "It was correct because of the way it is",
    };
    const incorrectProps = {
        ...sharedProps,
        correct: false,
        content: "This choice is incorrect",
        rationale: "It was incorrect because of the way it is",
    };
    return (
        <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>
    );
};
