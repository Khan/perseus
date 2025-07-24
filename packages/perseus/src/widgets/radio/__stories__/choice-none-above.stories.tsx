import * as React from "react";
import {action} from "storybook/actions";

import ChoiceNoneAbove from "../choice-none-above";

type StoryArgs = {
    content: React.ReactNode;
    showContent?: boolean;
};

type ChoiceNoneAboveStory = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Widgets/Radio/Widget Internal Components/Choice None of the Above",
    args: {showContent: false, content: "This is a possible choice"},
    tags: ["!dev"],
} as ChoiceNoneAboveStory;

const ChoiceDefaults = {
    checked: false,
    rationale: "This is a good rational",
    correct: true,
    disabled: false,
    pos: 0,
    reviewMode: false,
    showRationale: false,
    showCorrectness: false,
    multipleSelect: false,
    crossedOut: false,
    previouslyAnswered: false,
    apiOptions: {},
    onChange: action("changed"),
} as const;

export const Example = (args: StoryArgs): React.ReactElement => {
    const combineProps = {...ChoiceDefaults, ...args} as const;
    return <ChoiceNoneAbove {...combineProps} />;
};
