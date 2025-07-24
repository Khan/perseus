import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {action} from "storybook/actions";

import PlotterEditor from "../plotter-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Plotter/Editor Demo",
    component: PlotterEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a plotter widget that allows users to create and customize data visualizations.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <PlotterEditor
            onChange={action("onChange")}
            static={false}
            apiOptions={ApiOptions.defaults}
        />
    );
};
