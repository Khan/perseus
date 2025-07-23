import * as React from "react";
import {action} from "storybook/actions";

import InputNumberEditor from "../input-number-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/InputNumber/Editor Demo",
    component: InputNumberEditor,
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding an input number widget that allows users to enter numerical values.",
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <InputNumberEditor onChange={action("onChange")} />;
};
