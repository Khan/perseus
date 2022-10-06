// @flow
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
        disabled: false,
        pos: 0,
        reviewMode: false,
        showRationale: false,
        showCorrectness: false,
        crossedOut: false,
        previouslyAnswered: false,
    },
}: Story);

export const Interactive = (args: StoryArgs): React.Node => {
    return <Choice {...args} />;
};
