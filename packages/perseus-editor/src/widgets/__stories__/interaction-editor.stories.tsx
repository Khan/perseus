import {ApiOptions} from "@khanacademy/perseus";
import {action} from "@storybook/addon-actions";
import * as React from "react";

import InteractionEditor from "../interaction-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Interaction Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <InteractionEditor
            onChange={action("onChange")}
            apiOptions={ApiOptions.defaults}
        />
    );
};
