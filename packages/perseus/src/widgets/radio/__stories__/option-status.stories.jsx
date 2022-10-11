// @flow
import * as React from "react";

import OptionStatus from "../option-status.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Option Status",
}: Story);

export const CheckedCorrectPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={true}
            correct={true}
            previouslyAnswered={true}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const CheckedCorrectNotPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={true}
            correct={true}
            previouslyAnswered={false}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const CheckedNotCorrectPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={true}
            correct={false}
            previouslyAnswered={true}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const CheckedNotCorrectNotPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={true}
            correct={false}
            previouslyAnswered={false}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const NotCheckedCorrectPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={false}
            correct={true}
            previouslyAnswered={true}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const NotCheckedCorrectNotPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={false}
            correct={true}
            previouslyAnswered={false}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const NotCheckedNotCorrectPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={false}
            correct={false}
            previouslyAnswered={true}
            reviewMode={true}
            satStyling={false}
        />
    );
};

export const NotCheckedNotCorrectNotPreviouslyAnswered = (
    args: StoryArgs,
): React.Node => {
    return (
        <OptionStatus
            crossedOut={false}
            checked={false}
            correct={false}
            previouslyAnswered={false}
            reviewMode={true}
            satStyling={false}
        />
    );
};
