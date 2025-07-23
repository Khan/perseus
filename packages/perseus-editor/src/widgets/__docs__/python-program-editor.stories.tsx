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
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a Python program widget that allows users to write, edit and execute Python code.",
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <PythonProgramEditor onChange={action("onChange")} />;
};
