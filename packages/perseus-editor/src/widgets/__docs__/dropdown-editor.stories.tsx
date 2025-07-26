import * as React from "react";
import {action} from "storybook/actions";

import {basicDropdown} from "../../../../perseus/src/widgets/dropdown/dropdown.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import DropdownEditor from "../dropdown-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Dropdown/Editor Demo",
    component: DropdownEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a dropdown widget that allow users to select an\
                    option from a predefined list.",
            },
        },
    },
} satisfies Meta<typeof DropdownEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};

export const Preview: StoryObj<typeof EditorPageWithStorybookPreview> = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={basicDropdown} />
    ),
};
