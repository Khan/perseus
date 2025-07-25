import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {action} from "storybook/actions";

import {question1} from "../../../../perseus/src/widgets/categorizer/categorizer.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
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

export const Preview = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={question1} />
);
