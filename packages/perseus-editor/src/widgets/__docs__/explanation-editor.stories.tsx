import * as React from "react";
import {action} from "storybook/actions";

import {question1} from "../../../../perseus/src/widgets/explanation/explanation.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import ExplanationEditor from "../explanation-editor";

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

export const Default = (): React.ReactElement => {
    return <ExplanationEditor onChange={action("onChange")} />;
};

export const Preview = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={question1} />
);
