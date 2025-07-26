import * as React from "react";
import {action} from "storybook/actions";

import {question1} from "../../../../perseus/src/widgets/explanation/explanation.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import ExplanationEditor from "../explanation-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
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
} satisfies Meta<typeof ExplanationEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};

export const Preview: StoryObj<typeof EditorPageWithStorybookPreview> = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question1} />
    ),
};
