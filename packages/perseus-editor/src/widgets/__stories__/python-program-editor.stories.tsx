import {action} from "@storybook/addon-actions";
import * as React from "react";

import PythonProgramEditor from "../python-program-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Python Program Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <PythonProgramEditor onChange={action("onChange")} />;
};
