import * as React from "react";
import {action} from "storybook/actions";

import PythonProgramEditor from "../python-program-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Python Program/Editor Demo",
    component: PythonProgramEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a Python program widget that allows users to write, edit and execute Python code.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <PythonProgramEditor onChange={action("onChange")} />;
};
