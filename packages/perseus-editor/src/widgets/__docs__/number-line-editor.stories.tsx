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
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a number line widget that allows users to mark\
                    positions, intervals, and points on a number line.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumberLineEditor onChange={action("onChange")} />;
};
