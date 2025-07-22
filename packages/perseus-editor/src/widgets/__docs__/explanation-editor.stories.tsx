import * as React from "react";
import {action} from "storybook/actions";

import ExplanationEditor from "../explanation-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Explanation/Editor Demo",
    component: ExplanationEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding an explanation widget that provide supplementary information to users.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <ExplanationEditor onChange={action("onChange")} />;
};
