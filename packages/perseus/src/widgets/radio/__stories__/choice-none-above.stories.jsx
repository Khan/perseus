// @flow
import * as React from "react";

import ChoiceNoneAbove from "../choice-none-above.jsx";

type StoryArgs = {|
    // Eventually this?
    // ...React.ElementConfig<ChoiceNoneAbove>,
    className: string,
    content: React.Node,
    showContent?: boolean,
|};

type ChoiceNoneAboveStory = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio/None of the Above",
    args: {className: "", showContent: false, content: ""},
}: ChoiceNoneAboveStory);

export const Example = (args: StoryArgs): React.Node => {
    return <ChoiceNoneAbove {...args} />;
};
