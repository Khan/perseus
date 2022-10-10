// @flow
import {action} from "@storybook/addon-actions";
import * as React from "react";

import ChoiceNoneAbove from "../choice-none-above.jsx";

type StoryArgs = {|
    content: React.Node,
    showContent?: boolean,
|};

type ChoiceNoneAboveStory = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio/Choice None of the Above",
    args: {showContent: false, content: "This is a possible choice"},
}: ChoiceNoneAboveStory);

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
};

export const Example = (args: StoryArgs): React.Node => {
    const combineProps = {...ChoiceDefaults, ...args};
    return <ChoiceNoneAbove {...combineProps} />;
};
