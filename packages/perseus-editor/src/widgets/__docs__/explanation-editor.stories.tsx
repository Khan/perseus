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
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding an explanation widget that provide supplementary information to users.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <ExplanationEditor onChange={action("onChange")} />;
};
