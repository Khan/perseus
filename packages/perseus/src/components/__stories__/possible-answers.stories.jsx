// @flow
import * as React from "react";

import PossibleAnswers from "../possible-answers.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Possible Answers",
}: Story);

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    return <PossibleAnswers />;
};

export const ThreeSampleAnswers = (args: StoryArgs): React.Node => {
    return <PossibleAnswers answers={["Answer 1", "Answer 2", "Answer 3"]} />;
};
