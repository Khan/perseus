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
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a matcher widget that allows users to match items from two different sets.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <MatcherEditor onChange={action("onChange")} />;
};
