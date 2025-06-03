import {ApiOptions} from "@khanacademy/perseus";
import {action} from "storybook/actions";
import * as React from "react";

import PlotterEditor from "../plotter-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Plotter Editor",
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
