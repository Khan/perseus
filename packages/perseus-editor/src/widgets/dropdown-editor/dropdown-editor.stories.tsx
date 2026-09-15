import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {question} from "../../__testdata__/dropdown.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import DropdownEditor, {dropdownEditorRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Dropdown/Editor Demo",
    component: DropdownEditor,
    decorators: [registerWidgetEditorDecorator([dropdownEditorRegistration])],
    tags: ["!dev"],
} satisfies Meta<typeof DropdownEditor>;
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
