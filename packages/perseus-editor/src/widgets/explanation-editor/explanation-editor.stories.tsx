import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {question} from "../../__testdata__/explanation.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import ExplanationEditor, {explanationEditorRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Explanation/Editor Demo",
    component: ExplanationEditor,
    decorators: [
        registerWidgetEditorDecorator([explanationEditorRegistration]),
    ],
    tags: ["!dev"],
} satisfies Meta<typeof ExplanationEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};

export const WithinEditorPage: StoryObj<typeof EditorPageWithStorybookPreview> =
    {
        render: (): React.ReactElement => (
            <EditorPageWithStorybookPreview question={question} />
        ),
    };
