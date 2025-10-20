import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {question} from "../../__testdata__/explanation.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ExplanationEditor from "../explanation-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Explanation/Editor Demo",
    component: ExplanationEditor,
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
