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
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a plotter widget that allows users to create and customize data visualizations.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
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
