import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {integerProblem} from "../../__testdata__/numeric-input.testdata";

import NumericInputEditor from "./numeric-input-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Numeric Input/Editor Demo",
    component: NumericInputEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof NumericInputEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={integerProblem} />
    ),
};
