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
    tags: ["!autodocs"],
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
