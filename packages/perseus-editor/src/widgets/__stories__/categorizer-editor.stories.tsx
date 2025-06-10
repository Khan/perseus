import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {action} from "storybook/actions";

import CategorizerEditor from "../categorizer-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Categorizer Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <CategorizerEditor
            onChange={action("onChange")}
            apiOptions={ApiOptions.defaults}
        />
    );
};
