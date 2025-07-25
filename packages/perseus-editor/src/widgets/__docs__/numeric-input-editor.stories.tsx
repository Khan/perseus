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
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a numeric input widget that allows users to\
                    enter numerical values with specific validation rules.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumericInputEditor onChange={action("onChange")} />;
};
