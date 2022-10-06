// @flow
import * as React from "react";

import Choice from "../choice.jsx";

type StoryArgs = {|
    checked: boolean,
    rationale: React.Node,
    content: React.Node,
    correct: boolean,
    deselectEnabled: boolean,
    disabled: boolean,
    editMode: boolean,
    groupName: string,
    isLastChoice: boolean,
    pos: number,
    reviewMode: boolean,
    showRationale: boolean,
    showCorrectness: boolean,
    type: string,
    crossedOut: boolean,
    previouslyAnswered: boolean,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio/Choice",
    args: {
        checked: false,
        rationale: "This is a good rational",
        content: "This is a possible choice",
        correct: true,
        deselectEnabled: true,
        disabled: false,
        editMode: false,
        groupName: "The name of a group",
        isLastChoice: false,
        pos: 0,
        reviewMode: false,
        showRationale: false,
        showCorrectness: false,
        type: "some type",
        crossedOut: false,
        previouslyAnswered: false,
    },
}: Story);

export const Interactive = (args: StoryArgs): React.Node => {
    return <Choice {...args} />;
};
