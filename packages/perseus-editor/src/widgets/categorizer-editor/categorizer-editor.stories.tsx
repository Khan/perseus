import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {question} from "../../__testdata__/categorizer.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import CategorizerEditor, {categorizerEditorRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Categorizer/Editor Demo",
    component: CategorizerEditor,
    decorators: [
        registerWidgetEditorDecorator([categorizerEditorRegistration]),
    ],
    tags: ["!dev"],
} satisfies Meta<typeof CategorizerEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        apiOptions: ApiOptions.defaults,
    },
};

export const WithinEditorPage: StoryObj<typeof EditorPageWithStorybookPreview> =
    {
        render: (): React.ReactElement => (
            <EditorPageWithStorybookPreview question={question} />
        ),
    };
