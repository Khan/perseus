import * as React from "react";
import {action} from "storybook/actions";

import NumberLineEditor from "../number-line-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Number Line/Editor Demo",
    component: NumberLineEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a number line widget that allows users to mark\
            positions, intervals, and points on a number line.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumberLineEditor onChange={action("onChange")} />;
};
