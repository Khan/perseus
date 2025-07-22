import * as React from "react";
import {action} from "storybook/actions";

import NumericInputEditor from "../numeric-input-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Numeric Input/Editor Demo",
    component: NumericInputEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a numeric input widget that allows users to\
            enter numerical values with specific validation rules.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumericInputEditor onChange={action("onChange")} />;
};
