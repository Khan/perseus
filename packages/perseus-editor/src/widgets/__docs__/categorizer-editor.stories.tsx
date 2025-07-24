import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {action} from "storybook/actions";

import CategorizerEditor from "../categorizer-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Categorizer/Editor Demo",
    component: CategorizerEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a categorizer widget that allow users to sort items into categories.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <CategorizerEditor
            onChange={action("onChange")}
            apiOptions={ApiOptions.defaults}
        />
    );
};
