import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {integerProblem} from "../../__testdata__/numeric-input.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import NumericInputEditor from "../numeric-input-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Numeric Input/Editor Demo",
    component: NumericInputEditor,
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
