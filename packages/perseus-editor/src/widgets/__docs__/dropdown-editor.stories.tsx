import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {question} from "../../__testdata__/dropdown.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import DropdownEditor from "../dropdown-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";
import "../../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Dropdown/Editor Demo",
    component: DropdownEditor,
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
