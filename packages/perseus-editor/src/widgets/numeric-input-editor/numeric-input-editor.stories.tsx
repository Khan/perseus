import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {integerProblem} from "../../__testdata__/numeric-input.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import NumericInputEditor, {numericInputEditorRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Numeric Input/Editor Demo",
    component: NumericInputEditor,
    decorators: [
        registerWidgetEditorDecorator([numericInputEditorRegistration]),
    ],
    tags: ["!dev"],
} satisfies Meta<typeof NumericInputEditor>;
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
            <EditorPageWithStorybookPreview question={integerProblem} />
        ),
    };
