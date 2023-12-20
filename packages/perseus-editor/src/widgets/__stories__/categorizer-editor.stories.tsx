import {ApiOptions} from "@khanacademy/perseus";
import {action} from "@storybook/addon-actions";
import * as React from "react";

import CategorizerEditor from "../categorizer-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Categorizer Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <CategorizerEditor
            onChange={action("onChange")}
            apiOptions={ApiOptions.defaults}
        />
    );
};
