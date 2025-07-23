import * as React from "react";
import {action} from "storybook/actions";

import MatcherEditor from "../matcher-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Matcher/Editor Demo",
    component: MatcherEditor,
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a matcher widget that allows users to match items from two different sets.",
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <MatcherEditor onChange={action("onChange")} />;
};
