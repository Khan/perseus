// @flow
import * as React from "react";

import ChoiceIcon from "../choice-icon/choice-icon.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Choice Icon",
}: Story);

const defaultObject = {
    crossedOut: false,
    checked: false,
    correct: true,
    focused: false,
    hovered: false,
    pressed: false,
    multipleSelect: false,
    previouslyAnswered: false,
    product: "library",
    reviewMode: false,
    showCorrectness: false,
    transparentBackground: false,
};

// Note: the SAT icon is different from the general library
// icon displayed on KA. Therefore props like pressed,
// previouslyAnswered and focused do not apply here.
// That said, the props of the component still want them as they are
// currently defined, so we give them values anyway.
const satObject = {
    crossedOut: false,
    focused: false,
    hovered: false,
    pressed: false,
    checked: false,
    correct: true,
    multipleSelect: false,
    previouslyAnswered: false,
    product: "sat",
    reviewMode: false,
    showCorrectness: false,
    transparentBackground: false,
};

export const Position0Sat = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...satObject} pos={0} />;
};

export const Position1CrossedOutSat = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...satObject} pos={1} crossedOut={true} />;
};

export const Position2SelectedSat = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon {...satObject} pos={2} checked={true} crossedOut={false} />
    );
};

export const Position2SelectedReviewModeSat = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon
            {...satObject}
            pos={2}
            checked={true}
            crossedOut={false}
            reviewMode={true}
        />
    );
};

export const Position2SelectedReviewModeCrossedOutSat = (
    args: StoryArgs,
): React.Node => {
    return (
        <ChoiceIcon
            {...satObject}
            pos={2}
            checked={false}
            crossedOut={true}
            reviewMode={true}
        />
    );
};

export const Position0 = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...defaultObject} pos={0} reviewMode={false} />;
};

export const Position1 = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...defaultObject} pos={1} reviewMode={false} />;
};

export const Position2 = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...defaultObject} pos={2} reviewMode={false} />;
};

export const Checked = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon
            {...defaultObject}
            pos={0}
            checked={true}
            reviewMode={false}
        />
    );
};

export const Focused = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon
            {...defaultObject}
            focused={true}
            pos={0}
            checked={true}
            reviewMode={false}
        />
    );
};

export const ShowCorrectnessCorrect = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon
            {...defaultObject}
            pos={0}
            showCorrectness={true}
            checked={true}
            reviewMode={false}
        />
    );
};

export const ShowCorrectnessIncorrect = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon
            {...defaultObject}
            pos={0}
            correct={false}
            showCorrectness={true}
            reviewMode={false}
        />
    );
};

export const CrossedOut = (args: StoryArgs): React.Node => {
    return <ChoiceIcon {...defaultObject} pos={0} crossedOut={true} />;
};

export const CrossedOutPressed = (args: StoryArgs): React.Node => {
    return (
        <ChoiceIcon
            {...defaultObject}
            pos={0}
            crossedOut={true}
            pressed={true}
        />
    );
};
